// import { useLocation } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import AppProgressBar from "../components/AppProgressBar";
import siteIcon from "../assets/images/sitegrader_icon.png";
// import useFetchAndListen from "../hooks/useFetchAndListen";

interface SiteDataProp {
  site_url: string;
  product_service: string;
  average_revenue: number;
  email?: string;
}

export default function LoadingPage({
  progress,
  error,
  update,
  siteData,
}: {
  progress?: string;
  error?: string | null;
  update?: string | null;
  siteData: SiteDataProp;
}) {
  // const location = useLocation();

  // Destructure the form data passed via state
  const {
    site_url = "",
    product_service = "Default Product Service",
    average_revenue = 0,
    email = "",
  } = siteData;

  // useEffect(() => {
  //   console.log(location);
  // }, [location]);

  // const gradingUrl = "https://sitegrade.heatmapcore.com/api/validate";

  // const { message, error, update } = useFetchAndListen(gradingUrl, siteData);

  // useEffect(() => {
  //   // console.log("data received: ");
  //   if (message?.process_stage) {
  //     setProgress(message.process_stage);
  //   }
  // }, [message]);

  const getProgress = () => {
    let calculatedProgress = 0;

    switch (progress) {
      case "loading_site":
        calculatedProgress = (1 / 5) * 100;
        break;

      case "ai_insight_analysis":
        calculatedProgress = (2 / 5) * 100;
        break;

      case "cnn_analysis":
        calculatedProgress = (3 / 5) * 100;
        break;

      case "screenshot_taken":
        calculatedProgress = (4 / 5) * 100;
        break;

      case "report_generation":
        calculatedProgress = (5 / 5) * 100;
        break;

      default:
        calculatedProgress *= 100;
        break;
    }

    return calculatedProgress;
  };

  return (
    <div className="h-screen">
      <AppNavbar />
      <div className="m-auto grow w-1/3 flex justify-center items-center py-32 space-y-4 text-center">
        <div className="flex flex-col items-center space-y-4 w-full">
          <img src={siteIcon} width={50} height={50} alt="" />
          {error && !update && <p className="text-red-500">{error}</p>}
          {update && !error && <p className="text-emerald-500">{update}</p>}
          <AppProgressBar
            progress={getProgress()}
            className="rounded-full overflow-hidden w-full bg-gray-300/50"
          />
          <p className="font-semibold text-sm">Progress update:</p>
          <p>URL: {site_url}</p>
        </div>
      </div>
    </div>
  );
}
