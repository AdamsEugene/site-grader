import AppButton from "./AppButton";
import AppLogoIcon from "./AppLogoIcon";

export default function AppNavbar2({
  onUrlCopy,
  urlCoppied = false,
}: {
  onUrlCopy: () => void;
  urlCoppied: boolean;
}) {
  return (
    <div className="bg-white">
      <div className="p-3 py-4 flex justify-start sm:justify-between md:justify-between items-center">
        <div className="flex items-center">
          <AppLogoIcon size="small" className="rounded-sm me-1" />
          <p className="font-semibold">Heatmap Insights</p>
        </div>

        <div className="hidden sm:block">
          <AppButton
            label={urlCoppied ? "Copied" : "Copy URL"}
            onClick={onUrlCopy}
            className="border-1 border-emerald-700 text-emerald-700 font-semibold bg-transparent me-2"
          />
          <AppButton label="Join Heatmap" primary />
        </div>
      </div>
    </div>
  );
}
