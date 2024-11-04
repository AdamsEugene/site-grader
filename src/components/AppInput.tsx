import { forwardRef, InputHTMLAttributes } from "react";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  labelClassName?: string;
  placeholder?: string;
  error?: string;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  (
    {
      className,
      label,
      labelClassName,
      placeholder = "Enter",
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div>
        {label && (
          <label htmlFor="" className={`block mb-2 text-sm ${labelClassName}`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="text"
          className={`border rounded-lg text-gray-700 p-1 px-3 outline-none placeholder:text-[#5C6670] ${className}`}
          placeholder={placeholder}
          {...props}
        />
        <span className="text-errorRed text-sm">{error}</span>
      </div>
    );
  }
);

export default AppInput;
