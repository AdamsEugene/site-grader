<<<<<<< HEAD
import { Link, LinkProps } from "react-router-dom";
import { forwardRef, ReactElement } from "react";
=======
import { AnchorHTMLAttributes, ReactElement } from "react";
>>>>>>> 4ecc786 (dashboard progress)

interface AppLinkButtonProps extends LinkProps {
  label?: string;
  className?: string;
  primary?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

<<<<<<< HEAD
const AppLinkButton = forwardRef<HTMLAnchorElement, AppLinkButtonProps>(
  ({ label, className = "", primary, rightIcon, leftIcon, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        className={`${
          primary
            ? "disabled:bg-emerald-700/50 border-0 bg-emerald-700 hover:bg-emerald-700/80 text-white"
            : "border border-gray-300 hover:bg-gray-100"
        } disabled:bg-green-200 disabled:text-gray-400 rounded-lg p-2 px-4 cursor-pointer text-sm disabled:cursor-default inline-flex relative items-center justify-center ${className}`}
        aria-label={label ? undefined : "Link button"}
        {...props}
      >
        {/* <div className="flex relative items-center justify-center"> */}
        {leftIcon}
        {label}
        {rightIcon}
        {/* </div> */}
      </Link>
    );
  }
);

export default AppLinkButton;
=======
export default function AppLinkButton({
  label,
  className = "",
  primary,
  rightIcon,
  leftIcon,
  ...props
}: AppLinkButtonProps) {
  return (
    <a
      className={`${
        primary
          ? "disabled:bg-emerald-700/50 border-0 bg-emerald-700 hover:bg-emerald-700/80 text-white"
          : "border border-gray-300 hover:bg-gray-100"
      } disabled:bg-green-200 disabled:text-gray-400 rounded-lg p-2 px-4 cursor-pointer text-sm disabled:cursor-default ${className}`}
      {...props}
    >
      <div className="flex relative items-center justify-center">
        {leftIcon}
        {label}
        {rightIcon}
      </div>
    </a>
  );
}
>>>>>>> 4ecc786 (dashboard progress)
