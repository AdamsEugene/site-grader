// import { useLocation } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import AppProgressBar from "../components/AppProgressBar";
import siteIcon from "../assets/images/sitegrader_icon.png";
import { useEffect, useState } from "react";
import AppModal, { IModalData } from "../components/AppModal";
import { useLocation } from "react-router-dom";
import OopsModal from "../components/OopsModal";

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
}: // siteData,
{
  progress?: string;
  error?: { type: "progress" | "report"; message: string } | null;
  update?: string | null;
  siteData?: SiteDataProp;
}) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [oopsModalVisibility, setOopsModalVisibility] = useState(false);
  const [newprogress, setNewProgress] = useState<number>(0); // New state to track progress

  // const location = useLocation();

  // Destructure the form data passed via state
  // const {
  //   site_url = "",
  //   product_service = "Default Product Service",
  //   average_revenue = 0,
  //   email = "",
  // } = siteData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisibility(true);
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (error?.type === "report") {
      setModalVisibility(false);
      setOopsModalVisibility(true);
    }
  }, [error]);

  const location = useLocation();
  const handleModalSubmit = (values: IModalData) => {
    console.log({
      ...values,
      id: values.business_email,
      annual_revenue: location.state.average_revenue,
      product_service: location.state.product_service,
    });
    setModalVisibility(false);
  };

  const getProgress = () => {
    let calculatedProgress = 0;

    switch (progress) {
      case "site_speed":
        calculatedProgress = (1 / 8) * 100;
        break;
      case "site_speed_report_generation":
        calculatedProgress = (2 / 8) * 100;
        break;
      case "loading_site":
        calculatedProgress = (3 / 8) * 100;
        break;
      case "ai_insight_analysis":
        calculatedProgress = (4 / 8) * 100;
        break;
      case "cnn_analysis":
        calculatedProgress = (5 / 8) * 100;
        break;
      case "site_audit":
        calculatedProgress = (6 / 8) * 100;
        break;
      case "screenshot_taken":
        calculatedProgress = (7 / 8) * 100;
        break;
      case "report_generation":
        calculatedProgress = (8 / 8) * 100;
        break;
      default:
        calculatedProgress *= 100;
        break;
    }

    return calculatedProgress;
  };

  // Map stages to progress percentages
  // const progressMapping = {
  //   loading_site: 20,
  //   ai_insight_analysis: 40,
  //   cnn_analysis: 60,
  //   screenshot_taken: 80,
  //   report_generation: 100,
  // };
  console.log("test" + progress);

  return (
    <div className="h-screen">
      <AppNavbar />
      <OopsModal visible={oopsModalVisibility} />
      <AppModal visible={modalVisibility} onSubmit={handleModalSubmit} />
      <div className="m-auto grow w-1/3 flex justify-center items-center py-32 space-y-4 text-center">
        <div className="flex flex-col items-center space-y-4 w-full">
          <img src={siteIcon} width={50} height={50} alt="" />
          {error?.type === "progress" && !update && (
            <p className="text-red-500">{error.message}</p>
          )}
          {update && !error && <p className="text-emerald-500">{update}</p>}
          <AppProgressBar
            progress={getProgress()}
            className="rounded-full overflow-hidden w-full bg-gray-300/50"
          />
          {/* <p className="font-semibold text-sm">Progress update:</p>
          <p>URL: {siteData?.site_url}</p> */}
        </div>
      </div>
    </div>
  );
}
