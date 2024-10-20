import AppButton from "./AppButton";
import AppLogoIcon from "./AppLogoIcon";

export default function AppNavbar2() {
  return (
    <div className="bg-white">
      <div className="p-3 py-4 flex justify-start sm:justify-between md:justify-between items-center">
        <div className="flex items-center">
          <AppLogoIcon size="small" className="rounded-sm me-1" />
          <p className="font-semibold">Heatmap Insights</p>
        </div>

        <div className="hidden sm:block">
          <AppButton label="Share" className="border-0 bg-gray-200 me-2" />
          <AppButton label="Join Heatmap" primary />
        </div>
      </div>
    </div>
  );
}
