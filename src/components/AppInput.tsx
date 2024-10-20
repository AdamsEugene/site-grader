import { forwardRef, InputHTMLAttributes } from "react";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  labelClassName?: string;
}

const AppInput = forwardRef<HTMLInputElement, AppInputProps>(
  ({ className, label, labelClassName, ...props }, ref) => {
    return (
      <div>
        {label && (
          <label htmlFor="" className={`block mb-2 ${labelClassName}`}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          type="text"
          className={`border rounded-lg text-gray-700 p-2 px-3 outline-none ${className}`}
          {...props}
        />
      </div>
    );
  }
);

export default AppInput;
