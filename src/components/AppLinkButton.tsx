import { AnchorHTMLAttributes } from "react";

interface AppLinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  label?: string;
  className?: string;
  primary?: boolean;
}

export default function AppLinkButton({
  label,
  className = "",
  primary,
  ...props
}: AppLinkButtonProps) {
  return (
    <a
      className={`${
        primary
          ? "disabled:bg-emerald-700/50 border-0 bg-emerald-700 hover:bg-emerald-700/80 text-white"
          : "border border-gray-300 hover:bg-gray-100"
      } rounded-lg p-2 px-4 cursor-pointer text-sm disabled:cursor-default ${className}`}
      {...props}
    >
      {label}
    </a>
  );
}
