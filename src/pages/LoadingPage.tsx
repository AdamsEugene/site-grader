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
  siteData,
}: {
  progress?: string;
  error?: string | null;
  update?: string | null;
  siteData: SiteDataProp;
}) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [oopsModalVisibility, setOopsModalVisibility] = useState(false);
  const [catchError, setCatchError] = useState(false);
  // const location = useLocation();

  // Destructure the form data passed via state
  const {
    site_url = "",
    // product_service = "Default Product Service",
    // average_revenue = 0,
    // email = "",
  } = siteData;

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisibility(true);
      setCatchError(true);
    }, 30000); // 30 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (catchError) {
      setOopsModalVisibility(true);
    }
  }, [error, catchError]);

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
      case "loading_site":
        calculatedProgress = (1 / 5) * 100;
        console.log(progress.loading_site);
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
      <OopsModal visible={oopsModalVisibility} />
      <AppModal visible={modalVisibility} onSubmit={handleModalSubmit} />
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
