interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export default function AppNavProgressBar({
  progress,
  label,
  className,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`relative w-full bg-gray-300 ${className}`}>
      <div
        className="h-2 transition-all duration-300"
        style={{
          width: `${clampedProgress}%`,
          backgroundImage: "linear-gradient(to right, #00936F, #24C953)",
        }}
      ></div>
      {label && (
        <span className="absolute top-0 left-0 right-0 text-center text-white font-semibold">
          {label} {clampedProgress}%
        </span>
      )}
    </div>
  );
}
