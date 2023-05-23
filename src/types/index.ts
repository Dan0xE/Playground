import { IconType } from "react-icons";
export interface Repo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage: string;
  topics: string[];
  owner: {
    avatar_url: string;
  };
  external_url?: string;
  latestReleaseVersion?: string;
  latestReleaseDownloadUrl?: string;
}

export interface Projects {
  websites: Repo[];
  apps: Repo[];
  tools: Repo[];
}

export interface ButtonProps {
  Icon?: IconType;
  label: string;
  name?: string;
  to: string;
  type?: "app" | "website" | "tool";
  isInstalled?: boolean;
  isDownloadIcon?: boolean;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  type: "app" | "website" | "tool";
  Icon?: IconType;
  isInstalled?: boolean;
}

export interface FooterProps {
  appName: string;
  appVersion: string;
  hasUpdates: boolean;
}
