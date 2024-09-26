import AppButton from "./AppButton";
import AppProgressBar from "./AppProgressBar";

interface AppNavbarProps {
  showControls?: boolean;
  loaderProgress?: number;
  onBackClick?: () => void;
  onNextClick?: () => void;
}

export default function AppNavbar({
  showControls,
  loaderProgress,
  onBackClick,
  onNextClick,
}: AppNavbarProps) {
  return (
    <div className="bg-white border-b">
      <div className="p-3 flex justify-center sm:justify-between md:justify-between items-center">
        {showControls && (
          <AppButton
            label="Back"
            className="hidden sm:block"
            onClick={onBackClick}
          />
        )}
        <h4 className="font-medium">AI Insights</h4>
        {showControls && (
          <AppButton
            label="Next"
            className="hidden sm:block"
            onClick={onNextClick}
          />
        )}
      </div>

      {loaderProgress && <AppProgressBar progress={loaderProgress} />}
    </div>
  );
}
