import { BsStars } from "react-icons/bs";

interface AppLogoIconProps {
  className?: string;
  size?: "small" | "medium" | "large";
}

export default function AppLogoIcon({
  className,
  size = "small",
}: AppLogoIconProps) {
  return (
    <div className={`bg-emerald-700 p-1 ${className}`}>
      <BsStars
        color="white"
        size={
          size === "small"
            ? 15
            : size === "medium"
            ? 26
            : size === "large"
            ? 30
            : ""
        }
      />
    </div>
  );
}
