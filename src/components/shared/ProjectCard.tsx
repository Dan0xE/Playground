// components/ProjectCard.tsx
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { ProjectCardProps } from "../../types";

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  projectUrl,
  type,
  Icon,
  isInstalled,
}: ProjectCardProps) => {
  const [isDownloadIcon, setIsDownloadIcon] = useState<boolean>(
    type === "app" ? true : false
  );

  const [buttonText, setButtonText] = useState(
    type === "app" ? "Install" : type === "website" ? "Visit" : "View on GitHub"
  );

  useEffect(() => {
    const installedApps = JSON.parse(
      localStorage.getItem("installedApps") || "[]"
    );

    if (type === "app" && installedApps.includes(title)) {
      setButtonText("Open");
      setIsDownloadIcon(false);
    }
  }, [type, title]);

  return (
    <div className="project-card">
      <div className="transition-all project-card-wrapper project-card-stack">
        <div className="flex items-center mb-2">
          {/*@ts-ignore */}
          <Icon className="mr-2 text-vercel-gray-600" />
          <h2 className="text-lg font-bold text-vercel-gray-900">{title}</h2>
        </div>
        <p className="mb-4 text-vercel-gray-800">{description}</p>
        <Button
          isDownloadIcon={isDownloadIcon}
          label={buttonText}
          to={projectUrl}
          type={type}
          isInstalled={isInstalled}
          name={title}
        />
      </div>
    </div>
  );
};

export default ProjectCard;
