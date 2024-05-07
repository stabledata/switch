import { Link } from "@tanstack/react-router";
import { Github, RefreshCw } from "lucide-react";
import { useBusyRouter } from "./hooks/use-busy-router";

const activeProps = {
  className: "underline",
};

export function Header() {
  const isLoading = useBusyRouter();
  return (
    <div className="header">
      <Link to="/" activeProps={activeProps} activeOptions={{ exact: true }}>
        Home
      </Link>

      <a href="https://github.com/stabledata/switch">
        <Github size={20} />
      </a>
      {isLoading ? (
        <RefreshCw size={20} className="absolute right-4 animate-spin" />
      ) : null}
    </div>
  );
}
