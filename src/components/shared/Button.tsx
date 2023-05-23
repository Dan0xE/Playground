import { Link } from "react-router-dom";
import { ButtonProps } from "../../types/index";
import urlHandler from "../../utils/urlHandler";
import { FaDownload, FaExternalLinkAlt } from "react-icons/fa";
import openApp from "../../utils/openApp";
import handleInstall from "../../utils/handleInstall";

function Button({
  Icon,
  label,
  to,
  type,
  isDownloadIcon,
  isInstalled,
  name,
}: ButtonProps) {
  function handleApp() {
    if (type === "app" && isInstalled) {
      return openApp(name!);
    }
    return handleInstall(to);
  }
  return (
    <>
      {!type ? (
        <Link
          to={to}
          className="transition duration-75 ease-linear border-b nav-button hover:border-b-vercel-white border-b-transparent"
        >
          {Icon && <Icon className="mr-2" />}
          {label}
        </Link>
      ) : (
        <button
          className="inline-flex items-center px-2 py-1 text-sm font-medium transition duration-150 ease-in-out border rounded text-vercel-black bg-vercel-white hover:text-vercel-white hover:border-white hover:bg-transparent"
          onClick={() => (type !== "app" ? urlHandler(to) : handleApp())}
        >
          {isDownloadIcon ? (
            <FaDownload className="mr-2" />
          ) : (
            <FaExternalLinkAlt className="mr-2" />
          )}{" "}
          {Icon && <Icon className="mr-2" />}
          {label}
        </button>
      )}
    </>
  );
}

export default Button;
