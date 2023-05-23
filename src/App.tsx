import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Projects from "./components/Projects";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import TitleBar from "./components/TitleBar";
import Navbar from "./components/NavBar";
import { getVersion, getName } from "@tauri-apps/api/app";
import SplashScreen from "./components/SplashScreen";
import { Repo } from "./types";
import Home from "./components/Home";

function App() {
  const [version, setVersion] = useState("0");
  const [appName, setAppName] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState("Loading data...");

  useEffect(() => {
    getVersion().then((res) => setVersion(res));
    getName().then((res) => setAppName(res));

    setLoadingMessage("Checking installed products...");
    invoke("check_app_installation_command").then((installedAppsArray) => {
      setLoadingMessage("Fetching repositories...");
      fetch("https://api.github.com/users/dan0xe/repos?per_page=100", {
        headers: {
          Authorization: `token ${import.meta.env.VITE_G_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((repositories: Repo[]) => {
          const appRepositories = repositories.filter((repo: Repo) =>
            repo.topics.includes("app")
          );

          const repoPromises = appRepositories.map((repo: Repo) => {
            const releasesUrl = `https://api.github.com/repos/dan0xe/${repo.name}/releases`;
            return fetch(releasesUrl, {
              headers: {
                Authorization: `token ${import.meta.env.VITE_G_TOKEN}`,
              },
            })
              .then((response) => response.json())
              .then((releases) => {
                if (!releases || releases.length === 0) {
                  throw new Error(`No releases found for ${repo.name}`);
                }
                const latestRelease = releases[0]; // Assuming we want the latest release
                const assetId = latestRelease.assets.find((asset: Repo) =>
                  asset.name.endsWith(".zip")
                ).id;

                if (!assetId) {
                  throw new Error(`No .zip asset found for ${repo.name}`);
                }

                return fetch(
                  `https://api.github.com/repos/dan0xe/${repo.name}/releases/assets/${assetId}`,
                  {
                    headers: {
                      Authorization: `token ${import.meta.env.VITE_G_TOKEN}`,
                    },
                  }
                )
                  .then((response) => response.json())
                  .then((asset) => {
                    return {
                      ...repo,
                      latestReleaseVersion: latestRelease.tag_name,
                      latestReleaseDownloadUrl: asset.browser_download_url,
                    };
                  });
              })
              .catch((error) => {
                console.error(
                  `Error fetching releases/assets for repo ${repo.name}: `,
                  error
                );
                return repo;
              });
          });

          Promise.all(repoPromises).then((appReposWithData) => {
            const mergedRepos = repositories.map((repo: Repo) => {
              const matchingAppRepo = appReposWithData.find(
                (appRepo: Repo) => appRepo.id === repo.id
              );
              return matchingAppRepo ? matchingAppRepo : repo;
            });

            const installedApps = appReposWithData.filter((appRepo) =>
              (installedAppsArray as string[])
                .toString()
                .toLowerCase()
                .includes(appRepo.name.toLowerCase())
            );

            localStorage.setItem(
              "installedApps",
              JSON.stringify(installedApps.map((app) => app.name))
            );

            localStorage.setItem("repositories", JSON.stringify(mergedRepos));
            setLoading(false);
          });
        })
        .catch((error) => {
          console.error("Error fetching repositories: ", error);
        });
    });
  }, []);

  if (loading) {
    return <SplashScreen message={loadingMessage} />;
  }

  return (
    <Router>
      <TitleBar />
      <Navbar />
      <div className="flex flex-col bg-vercel-gray-500 app-container">
        <main className="flex flex-grow">
          <div className="flex-grow">
            <Routes>
              <Route path="/projects/*" element={<Projects />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
        </main>

        <Footer appName={appName} appVersion={version} hasUpdates={false} />
      </div>
    </Router>
  );
}

export default App;
