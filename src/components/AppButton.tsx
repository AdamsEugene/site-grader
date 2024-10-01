import { ButtonHTMLAttributes, forwardRef, ReactElement } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
  primary?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ label, className = "", primary, rightIcon, leftIcon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${
          primary
            ? "disabled:bg-emerald-700/50 border-0 bg-emerald-700 hover:bg-emerald-700/80 text-white"
            : "border border-gray-300 hover:bg-gray-100"
        } disabled:bg-green-200 disabled:text-gray-400 rounded-lg p-2 px-4 cursor-pointer text-sm disabled:cursor-default ${className}`}
        {...props}
      >
        <div className="flex items-center justify-center">
          {leftIcon}
          {label}
          {rightIcon}
        </div>
      </button>
    );
  }
);

export default AppButton;
