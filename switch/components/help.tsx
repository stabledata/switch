import { SwitchInput } from "switch/types";

export const Help: React.FC<{ help: SwitchInput["help"] }> = ({ help }) => {
  const { text, linkText, linkUrl } = help ?? {};
  return (
    <div className="flex gap-x-1">
      {text ? <p className="text-sm mt-0">{text}</p> : null}
      {linkText ? (
        <a href={linkUrl} target="_blank" className="text-sm mt-0">
          {linkText}
        </a>
      ) : null}
    </div>
  );
};
