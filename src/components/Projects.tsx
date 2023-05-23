import { useEffect, useState } from "react";
import { Repo as Repository, Projects as ProjectsType } from "../types";
import { Route, Routes } from "react-router-dom";
import ProjectCard from "./shared/ProjectCard";
import { FiExternalLink } from "react-icons/fi";
import { MdInstallDesktop } from "react-icons/md";
import { FaGithub } from "react-icons/fa";
import { Scrollbar } from "react-scrollbars-custom";
import ScreenSize from "../hooks/screenSize";
import Header from "./Header";
import SplashScreen from "./SplashScreen";

function Projects() {
  const [projects, setProjects] = useState<ProjectsType>({
    websites: [],
    apps: [],
    tools: [],
  });
  const [loading, setLoading] = useState(true); // state for loading
  const [loadingMessage, setLoadingMessage] = useState("Loading data..."); // state for loading message
  const { width, height } = ScreenSize();

  useEffect(() => {
    setLoading(true);
    setLoadingMessage("parsing data...");
    const data = JSON.parse(localStorage.getItem("repositories") || "[]");

    let websites: Repository[] = [];
    let apps: Repository[] = [];
    let tools: Repository[] = [];

    data.forEach((repo: Repository) => {
      if (repo.topics.includes("website")) {
        websites.push(repo);
      } else if (repo.topics.includes("app")) {
        apps.push(repo);
      } else if (repo.topics.includes("tool")) {
        tools.push(repo);
      }
    });

    setProjects({ websites, apps, tools });
    setLoading(false);
  }, []);

  if (loading) {
    return <SplashScreen message={loadingMessage} />; // show splash screen when loading
  }

  return (
    // <Scrollbar style={{ width: `${width}`, height: `${height}` }}>
    <Scrollbar style={{ width: width, height: height - 120 }}>
      <Routes>
        <Route
          path="websites"
          element={
            <>
              <Header title="Websites"></Header>
              <div className="flex flex-wrap justify-center gap-8">
                {projects.websites.map((project) => (
                  <div className="w-1/2" key={project.id}>
                    <ProjectCard
                      title={project.name}
                      description={project.description || "No description"}
                      imageUrl={project.owner.avatar_url}
                      projectUrl={project.homepage}
                      type="website"
                      Icon={FiExternalLink}
                    />
                  </div>
                ))}
              </div>
            </>
          }
        />
        <Route
          path="apps"
          element={
            <>
              <Header title="Apps" />
              <div className="flex flex-wrap justify-center gap-8">
                {projects.apps.map((project) => {
                  const installedApps = JSON.parse(
                    localStorage
                      .getItem("installedApps")
                      ?.toLocaleLowerCase() || "[]"
                  );
                  const isInstalled = installedApps.includes(
                    project.name.toLowerCase()
                  );

                  return (
                    <div className="w-1/2" key={project.id}>
                      <ProjectCard
                        title={project.name} 
                        description={project.description || "No description"}
                        imageUrl={project.owner.avatar_url}
                        projectUrl={project.latestReleaseDownloadUrl!}
                        type="app"
                        Icon={MdInstallDesktop}
                        isInstalled={isInstalled}
                      />
                    </div>
                  );
                })}
              </div>
            </>
          }
        />
        <Route
          path="tools"
          element={
            <>
              <Header title="Tools" />
              <div className="flex flex-wrap justify-center gap-8">
                {projects.tools.map((project) => (
                  <div className="w-1/2" key={project.id}>
                    <ProjectCard
                      title={project.name}
                      description={project.description || "No description"}
                      imageUrl={project.owner.avatar_url}
                      projectUrl={project.html_url}
                      type="tool"
                      Icon={FaGithub}
                    />
                  </div>
                ))}
              </div>
            </>
          }
        />
      </Routes>
    </Scrollbar>
  );
}

export default Projects;
