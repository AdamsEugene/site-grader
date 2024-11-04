import AppButton from "./AppButton";
import AppLogoIcon from "./AppLogoIcon";

export default function AppNavbar2({
  onUrlCopy,
  urlCopied = false,
}: {
  onUrlCopy: () => void;
  urlCopied: boolean;
}) {
  return (
    <div className="bg-white">
      <div className="p-3 py-4 flex justify-start sm:justify-between md:justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="cursor-pointer flex">
            <AppLogoIcon size="small" className="rounded-sm me-1" />
            <p className="font-semibold">Heatmap Insights</p>
          </a>
        </div>

        <div className="hidden sm:block">
          <AppButton
            label={urlCopied ? "Copied" : "Copy URL to Clipboard"}
            onClick={onUrlCopy}
            className="border-1 border-emerald-700 text-emerald-700 font-semibold bg-transparent me-2 w-[200px]"
          />{" "}
          <a
            href="https://www.heatmap.com/pricing"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AppButton label="Join Heatmap" primary />
          </a>
        </div>
      </div>
    </div>
  );
}
