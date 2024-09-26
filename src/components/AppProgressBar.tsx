interface ProgressBarProps {
  progress: number;
  label?: string;
  className?: string;
}

export default function AppProgressBar({
  progress,
  label,
  className,
}: ProgressBarProps) {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={`relative w-full bg-transparent ${className}`}>
      <div
        className="bg-emerald-400 h-1 transition-all duration-300"
        style={{ width: `${clampedProgress}%` }}
      ></div>
      {label && (
        <span className="absolute top-0 left-0 right-0 text-center text-white font-semibold">
          {label} {clampedProgress}%
        </span>
      )}
    </div>
  );
}
