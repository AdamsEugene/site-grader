import AppButton from "./AppButton";
import AppProgressBar from "./AppProgressBar";

interface AppNavbarProps {
  showBackButton?: boolean;
  showNextButton?: boolean;
  showExitButton?: boolean;
  loaderProgress?: number;
  onBackClick?: () => void;
  onNextClick?: () => void;
}

export default function AppNavbar({
  showBackButton,
  showNextButton,
  showExitButton,
  loaderProgress,
  onBackClick,
  onNextClick,
}: AppNavbarProps) {
  return (
    <div className="bg-white border-b">
      <div className="p-3 flex justify-center sm:justify-between md:justify-between items-center">
        {showBackButton && (
          <AppButton
            label="Back"
            className="hidden sm:block"
            onClick={onBackClick}
          />
        )}
        <h4 className="font-medium">AI Insights</h4>

        {(showNextButton || showExitButton) && (
          <AppButton
            label={showNextButton ? "Next" : showExitButton ? "Exit" : ""}
            className="hidden sm:block"
            onClick={onNextClick}
          />
        )}
      </div>

      {loaderProgress && <AppProgressBar progress={loaderProgress} />}
    </div>
  );
}
