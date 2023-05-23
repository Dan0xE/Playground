import { FooterProps } from "../types";

const Footer: React.FC<FooterProps> = ({ appName, appVersion, hasUpdates }) => {
  return (
    <footer className="fixed bottom-0 left-0 w-full px-8 py-1 text-sm text-center border-t border-gray-400 bg-vercel-black text-vercel-gray-200 Footer">
      <div className="flex justify-between">
        <div>
          <span>
            {appName}: {appVersion}
          </span>
        </div>
        <div>
          <span>
            {hasUpdates ? "Updates available" : "No updates available"}
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
