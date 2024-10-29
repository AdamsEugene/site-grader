import { ButtonHTMLAttributes, forwardRef, ReactElement } from "react";

interface AppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  className?: string;
  primary?: boolean;
  leftIcon?: ReactElement;
  rightIcon?: ReactElement;
}

const FormAppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  ({ label, className = "", primary, rightIcon, leftIcon, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`${
          primary
            ? "bg-white border-borderGreen text-white disabled:bg-emerald700/50 border-0"
            : "border border-borderGray"
        } disabled:bg-green200 disabled:text-gray400 rounded-lg p-2 px-4 cursor-pointer text-sm disabled:cursor-default ${className} 
        focus:bg-deepEmerald focus:border-deepEmerald focus:text-white active:bg-deepEmerald active:border-deepEmerald active:text-white`}
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

export default FormAppButton;
