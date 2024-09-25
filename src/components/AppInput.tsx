import { InputHTMLAttributes } from "react";

interface AppInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function AppInput({ className, ...props }: AppInputProps) {
  return (
    <input
      type="text"
      className={`border rounded-lg p-2 px-3 outline-none ${className}`}
      {...props}
    />
  );
}
