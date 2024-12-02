import { useEffect, useRef, useState } from "react";
import AppButton from "../../components/AppButton";
import AppNavbar2 from "../../components/AppNavbar2";
import AppSidebar from "../../components/AppSidebar";
import AppTitlebar, { PageTitle } from "../../components/Dashboard/AppTitlebar";
import { PiStarFour } from "react-icons/pi";
import { CiImageOn } from "react-icons/ci";
import LoadingPage from "../LoadingPage";
import CodeQuality from "./CodeQuality";
import SiteSpeed from "./SiteSpeed";
import Feedback from "../../components/Feedback";
import { FaChevronLeft } from "react-icons/fa";
import pages from "../../lib/pageData";
import useSiteAnalysis from "../../hooks/useSiteAnalysis";
import useFetchAndListen from "../../hooks/useFetchAndListen";
import { useLocation } from "react-router-dom";
import AppModalAudit from "../../components/AppModalAudit";
import { IModalData } from "../../components/AppModal";
import useContact from "../../hooks/useContact";

export default function Dashboard() {
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [activeSection, setActiveSection] = useState(1);
  const [urlCopied, setUrlCopied] = useState(false);
  const [showToast, setShowToast] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);
  const location = useLocation();
  const { message, error, update } = useFetchAndListen();
  const { data, siteSpeedData, codeQualityData } = useSiteAnalysis(message);

  const [modalDataSubmitted, setModalDataSubmitted] = useState(false);

  // Simplify `pages` to only include necessary fields and transform recommendations
  const simplifiedPages = pages.map((page) => ({
    title: page.title,
    pageNumber: page.pageNumber,
    recommendations: page.recommendations?.map((rec) => rec.title), // Extract titles as strings
  }));

  const appendShareIdToUrl = (shareId: string) => {
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);

    if (!params.has("sid")) {
      params.set("sid", shareId);
      const newUrl = `${currentUrl.origin}${
        currentUrl.pathname
      }?${params.toString()}`;
      window.history.replaceState({}, "", newUrl);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      handleShowToast("URL copied to clipboard");
      setUrlCopied(true);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  useEffect(() => {
    if (message?.process_stage === "url_validation") {
      setErrorMessage(
        "You have entered a wrong url, kindly check and enter the right one. Thank you for using us"
      );
    }
    if (message?.blocked_by_site === 1) {
      setErrorMessage(
        "Your site is currently blocking our services from running. Kindly disable these restrictions and try again. Thank you for using us"
      );
    }
    if (message?.share_id) {
      appendShareIdToUrl(message.share_id);
    }
    if (message?.email_status === 1) {
      setModalDataSubmitted(true);
    }
  }, [message]);

  const screenshotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleScreenshot = (x: number, y: number) => {
    if (screenshotRef.current) {
      screenshotRef.current.scrollTo({ top: y, left: x, behavior: "smooth" });
    }
  };

  const { errormessage: contactDetailsError, sendContactDetails } =
    useContact();

  const handleModalSubmit = (values: IModalData) => {
    sendContactDetails({
      ...values,
      id: message?.id || "",
      annual_revenue: location.state.average_revenue,
      products_services: location.state.product_service,
    });
    setModalDataSubmitted(true);
  };

  const handleShowToast = (message: string) => {
    if (message) {
      setShowToast(message);
      setTimeout(() => {
        setShowToast("");
      }, 3000);
    }
  };

  useEffect(() => {
    console.log({ modalDataSubmitted });
  }, [modalDataSubmitted]);

  useEffect(() => {
    if (contactDetailsError) {
      console.log({ contactDetailsError });
    }
  }, [contactDetailsError]);

  if (!data) {
    return (
      <LoadingPage
        progress={message?.process_stage}
        error={error}
        update={update}
        siteData={location.state}
        jobId={message?.id || ""}
        errorMessage={errorMessage || undefined}
        onModalDataSubmit={() => setModalDataSubmitted(true)}
      />
    );
  }

  return (
    <div className="overflow-hidden h-screen pb-20">
      <AppNavbar2 onUrlCopy={copyToClipboard} urlCopied={urlCopied} />

      {/* <div className="sm:hidden w-full p-4">
        <AppButton
          label="Your Site's Diagnostic"
          onClick={() => setActivePageNumber(0)}
          className="border-0 justify-between w-full px-0 font-semibold"
          leftIcon={<FaChevronLeft className="absolute left-4" />}
        />
      </div> */}

      <AppModalAudit
        visible={!modalDataSubmitted}
        onSubmit={handleModalSubmit}
        message={{
          title: "Unlock your full audit",
          description:
            "Enter your details to access comprehensive insights and personalized recommendations to boost your site's performance.",
        }}
      />

      <div className="h-full flex w-full px-3">
        {showToast.length > 0 && (
          <div className="absolute right-4 z-10 bg-brandGreen text-sm rounded-md bottom-2 py-3 px-5 text-white">
            <div className="flex items-center justify-between">
              <span className="font-bold mr-12">{showToast}</span>
              <span className="cursor-pointer" onClick={() => setShowToast("")}>
                X
              </span>
            </div>
          </div>
        )}
        <AppSidebar
          pages={simplifiedPages}
          pageData={data}
          totalCodeQuality={codeQualityData?.data.site_audit.Total}
          totalInsightScore={parseInt(data.user_experience_score)}
          totalSiteSpeed={siteSpeedData?.data.psi_metrics.speedPercentage.value}
          className={`${
            activePageNumber === 0 ? "sm:block" : "sm:block hidden"
          }`}
          onPageItemClick={(page) =>
            page && setActivePageNumber(page.pageNumber)
          }
        />

        <div
          className={`relative ${
            activePageNumber === 0 ? "hidden sm:flex" : ""
          } flex-col w-full overflow-hidden`}
        >
          <div
            className={`${
              activePageNumber === 0 ? "hidden sm:block" : "sm:block"
            }`}
          >
            <AppTitlebar
              pages={pages}
              totalCodeQuality={codeQualityData?.data.site_audit.Total}
              totalInsightScore={parseInt(data.user_experience_score)}
              totalSiteSpeed={
                siteSpeedData?.data.psi_metrics.speedPercentage.value
              }
              activePageNumber={(number) => setActivePageNumber(number)}
              currentPage={pages[activePageNumber - 1]}
            />
          </div>

          <div
            className="h-full overflow-auto px-2 md:px-4 pb-20"
            ref={screenshotRef}
          >
            <div className="sm:hidden w-full p-4 relative">
              <AppButton
                label="Your Site's Diagnostic"
                onClick={() => setActivePageNumber(0)}
                className="border-0 justify-between w-full px-0 font-semibold"
                leftIcon={<FaChevronLeft className="absolute left-4" />}
              />
            </div>

            <PageTitle
              title={pages[activePageNumber - 1]?.title}
              description={pages[activePageNumber - 1]?.description}
            />

            <div
              className={`${
                activePageNumber === 1 ? "md:hidden flex" : "hidden"
              } space-x-3 font-medium mt-5`}
            >
              <AppButton
                leftIcon={<PiStarFour className="me-2" />}
                label="Recommendations"
                className={`rounded-none border-0 w-full border-black pl-1 ${
                  activeSection === 1 ? "border-b-2" : ""
                }`}
                onClick={() => setActiveSection(1)}
              />
              <AppButton
                leftIcon={<CiImageOn className="me-2" />}
                label="Screenshots"
                className={`rounded-none border-0 w-full border-black !mx-0 pl-1 pr-0 ${
                  activeSection === 2 ? "border-b-2" : ""
                }`}
                onClick={() => setActiveSection(2)}
              />
            </div>

            <div
              className={`w-full pt-5 ${
                activePageNumber === 1 ? "flex" : "hidden"
              }`}
            >
              <div
                className={`md:w-1/2 w-full md:me-3 ${
                  activeSection === 2 ? "" : "hidden md:block"
                }`}
              >
                <img src={message?.screenshot_s3_uri} className="m-auto" />
              </div>

              <div
                className={`flex-col md:w-1/2 pb-10 ${
                  activeSection === 1 ? "flex" : "hidden md:flex"
                }`}
              >
                <div className="rounded-lg shadow divide-y">
                  {data &&
                    data.insights.map((insight, index) => (
                      <div
                        onClick={
                          isDesktop
                            ? () =>
                                handleScreenshot(
                                  insight.coordinates.x,
                                  insight.coordinates.y
                                )
                            : undefined
                        }
                        key={index}
                        className="flex flex-col p-3 hover:bg-green-50 cursor-pointer"
                      >
                        <div className="flex items-center mb-2 pl-2.5 . md:pl-0 font-semibold">
                          <span className=" md:text-white md:bg-emerald-700 rounded-sm md:w-8 md:h-8 flex items-center justify-center cursor-pointer">
                            {insight.label}
                          </span>
                          <p className="md:hidden pl-2">
                            {insight?.element_type}
                          </p>
                        </div>
                        <div>
                          <p className="font-bold hidden md:block">
                            {insight?.element_type}
                          </p>
                          <p className="font-normal">
                            {insight.recommendation}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                <Feedback
                  jobId={data.id}
                  onFeedbackSelect={(_, isFeedbackSent) =>
                    isFeedbackSent
                      ? handleShowToast("Thank you for your feedback!")
                      : console.log(isFeedbackSent)
                  }
                />
              </div>
            </div>

            <div
              className={`w-full py-5 flex-col ${
                activePageNumber === 2 ? "flex" : "hidden"
              }`}
            >
              <CodeQuality pageData={codeQualityData} />
              <Feedback
                jobId={data.id}
                onFeedbackSelect={(feedback) => console.log(feedback)}
              />
            </div>

            <div
              className={`w-full py-5 flex-col ${
                activePageNumber === 3 ? "flex" : "hidden"
              }`}
            >
              <SiteSpeed pageData={siteSpeedData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
