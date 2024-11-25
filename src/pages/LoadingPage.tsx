// import { useLocation } from "react-router-dom";
import AppNavbar from "../components/AppNavbar";
import AppProgressBar from "../components/AppProgressBar";
import siteIcon from "../assets/images/sitegrader_icon.png";
import { useEffect, useState } from "react";
import { IModalData } from "../components/AppModal";
import { useLocation } from "react-router-dom";
import OopsModal from "../components/OopsModal";
import useContact from "../hooks/useContact";
import AppModalAudit from "../components/AppModalAudit";
// import { IContact } from "../interface/IContact";

interface SiteDataProp {
  site_url: string;
  product_service: string;
  average_revenue: number;
  email?: string;
}

export default function LoadingPage({
  progress,
  error,
  // update,
  errorMessage,
  jobId,
  onModalDataSubmit,
}: {
  progress?: string;
  error?: { type: "progress" | "report" | "status"; message: string } | null;
  update?: string | null;
  siteData?: SiteDataProp;
  errorMessage?: string;
  jobId?: string;
  onModalDataSubmit?: () => void;
}) {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [oopsModalVisibility, setOopsModalVisibility] = useState(false);
  const { responseMessage, sendContactDetails } = useContact();

  useEffect(() => {
    if (responseMessage) console.log(responseMessage);
  }, [responseMessage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setModalVisibility(true);
    }, 20000); // 20 seconds

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (error?.type === "report" || error?.type === "status") {
      setModalVisibility(false);
      setOopsModalVisibility(true);
    }
  }, [error]);

  const location = useLocation();
  const handleModalSubmit = (values: IModalData) => {
    sendContactDetails({
      ...values,
      id: jobId || "",
      annual_revenue: location.state.average_revenue,
      products_services: location.state.product_service,
    });
    setModalVisibility(false);
    onModalDataSubmit?.();
  };

  const [progressStages, setProgressStages] = useState<string[]>([]);

  useEffect(() => {
    const stage = progress;
    if (stage) {
      setProgressStages((prevProgressStage) => {
        if (!prevProgressStage.includes(stage)) {
          return [...prevProgressStage, stage];
        }
        return prevProgressStage;
      });
    }
  }, [progress]);

  const progressPercentage = (progressStages.length / 10) * 100;

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar Section */}
      <AppNavbar />

      {/* Centered Progress Bar Section */}
      <div className="flex-grow flex justify-center items-center">
        <div className="flex flex-col items-center space-y-4 w-[90%] md:w-1/3 text-center">
          <img src={siteIcon} width={50} height={50} alt="" />
          {/* {error?.type === "progress" && !update && (
            <p className="text-red-500">{error.message}</p>
          )}
          {update && !error && <p className="text-emerald-500">{update}</p>} */}
          <AppProgressBar
            progress={progressPercentage}
            className="rounded-full overflow-hidden w-full bg-gray-300/50"
          />
        </div>
      </div>

      {/* Modals */}
      <OopsModal visible={oopsModalVisibility} message={errorMessage} />
      {/* <AppModal visible={modalVisibility} onSubmit={handleModalSubmit} /> */}
      <AppModalAudit visible={modalVisibility} onSubmit={handleModalSubmit} />
    </div>
  );
}
