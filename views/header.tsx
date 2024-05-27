import { Link } from "@tanstack/react-router";
import { Github, Moon, RefreshCw, Sun } from "lucide-react";
import { useBusyRouter } from "./hooks/use-busy-router";
import { useDarkMode } from "switch/theme/dark-mode-provider";

const activeProps = {
  className: "underline",
};

export function Header() {
  const isLoading = useBusyRouter();
  const { mode, setDarkMode } = useDarkMode();
  return (
    <div className="header">
      <Link to="/" activeProps={activeProps} activeOptions={{ exact: true }}>
        Home
      </Link>

      <Link
        to="/story"
        activeProps={activeProps}
        activeOptions={{ exact: true }}
      >
        Story
      </Link>
      <Link
        to="/input"
        activeProps={activeProps}
        activeOptions={{ exact: true }}
      >
        Input
      </Link>
      <a href="https://github.com/stabledata/switch">
        <Github size={20} />
      </a>
      {isLoading ? (
        <RefreshCw size={20} className="absolute right-4 animate-spin" />
      ) : null}
      {mode === "dark" ? (
        <a href="#" onClick={() => setDarkMode("light")}>
          <Sun />
        </a>
      ) : (
        <a href="#" onClick={() => setDarkMode("dark")}>
          <Moon />
        </a>
      )}
    </div>
  );
}
