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
            ? "bg-[#08916F] border-[#08916F] text-white disabled:bg-emerald-700/50 border-0"
            : "border border-[#08916F]"
        } disabled:bg-green-200 disabled:text-gray-400 rounded-lg py-2 px-4 cursor-pointer text-sm disabled:cursor-default ${className}`}
        {...props}
      >
        <div className="flex items-center justify-center text-[16px] ">
          {leftIcon}
          {label}
          {rightIcon}
        </div>
      </button>
    );
  }
);

export default AppButton;
