import { Link } from "@tanstack/react-router";
import { Github, Moon, RefreshCw, Sun } from "lucide-react";
import { useBusyRouter } from "./hooks/use-busy-router.js";
import { useDarkMode } from "switch/theme/dark-mode-provider";
import { TooltipWrapper } from "switch/components/ui/tooltip";
import { BinaryIconToggle } from "switch/index";

const activeProps = {
  className: "underline font-medium",
};

export function Header() {
  const isLoading = useBusyRouter();
  const { mode, setDarkMode } = useDarkMode();
  const switchTooltip =
    mode === "dark" ? "Switch to light mode" : "Switch to dark mode";
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

      <TooltipWrapper content={switchTooltip}>
        <BinaryIconToggle
          variant="ghost"
          className="w-8"
          onIcon={<Moon />}
          offIcon={<Sun />}
          value={mode === "dark" ? "on" : "off"}
          onSwitch={(state: "off" | "on") => {
            setDarkMode(state === "on" ? "dark" : "light");
          }}
        />
      </TooltipWrapper>
    </div>
  );
}
