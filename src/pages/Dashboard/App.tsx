import { useState } from "react";
import AppButton from "../../components/AppButton";
import AppNavbar2 from "../../components/AppNavbar2";
import AppSidebar from "../../components/AppSidebar";
import AppTitlebar, { PageTitle } from "../../components/Dashboard/AppTitlebar";
// import screenshot from "../../assets/images/site-screenshot.png";
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

// const siteData = {
//   site_url: "https://thejellybee.com",
//   product_service: "Heatmap Provider",
//   average_revenue: 1900,
//   email: "support@heatmap.com",
// };

export default function Dashboard() {
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [activeSection, setActiveSection] = useState(1);

  const gradingUrl = "https://sitegrade.heatmapcore.com/api/validate";

  const location = useLocation();

  // console.log(location.state);

  const { message, error, update } = useFetchAndListen(
    gradingUrl,
    location.state
  );

  const { data } = useSiteAnalysis(message);
  console.log(data);
  if (!data)
    return (
      <LoadingPage
        progress={message?.process_stage}
        error={error}
        update={update}
        siteData={location.state}
      />
    );

  return (
    <div className="overflow-hidden h-screen pb-20">
      <AppNavbar2 />

      <div className="sm:hidden w-full p-4">
        <AppButton
          label="Your Site's Diagnostic"
          onClick={() => setActivePageNumber(0)}
          className="border-0 justify-between w-full px-0 font-semibold"
          leftIcon={<FaChevronLeft className="absolute left-4" />}
        />
      </div>

      <div className="h-full flex w-full px-3">
        <AppSidebar
          pages={pages}
          className={`${
            activePageNumber === 0 ? "sm:block" : "sm:block hidden"
          }`}
          onPageItemClick={(page) => setActivePageNumber(page?.pageNumber)}
        />

        <div
          className={`relative ${
            activePageNumber === 0 ? "hidden sm:flex" : ""
          } flex-col w-full overflow-hidden`}
        >
          {/* <AppModal visible={true} /> */}

          <div
            className={`${
              activePageNumber === 0 ? "hidden sm:block" : "sm:block"
            } `}
          >
            <AppTitlebar
              pages={pages}
              activePageNumber={(number) => setActivePageNumber(number)}
              currentPage={pages[activePageNumber - 1]}
            />
          </div>

          {/* {activePageNumber === 1 && ( */}
          <div className="h-full overflow-auto px-4 pb-40">
            <PageTitle
              title={pages[activePageNumber - 1]?.title}
              description={pages[activePageNumber - 1]?.description}
            />

            <div
              className={`${
                activePageNumber === 1 ? "md:hidden flex" : "hidden"
              } space-x-3 font-bold mt-3`}
            >
              <AppButton
                leftIcon={<PiStarFour className="me-2" />}
                label="Recommendations"
                className={`rounded-none border-0 w-full border-black ${
                  activeSection === 1 ? "border-b-2" : ""
                }`}
                onClick={() => setActiveSection(1)}
              />
              <AppButton
                leftIcon={<CiImageOn className="me-2" />}
                label="Screenshots"
                className={`rounded-none border-0 w-full border-black ${
                  activeSection === 2 ? "border-b-2" : ""
                }`}
                onClick={() => setActiveSection(2)}
              />
            </div>
            {/* )} */}

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
                      <div key={index} className="flex flex-col p-3">
                        <div className="flex mb-2">
                          <p className="px-2 py-0.5 font-thin text-white bg-emerald-700 rounded-sm">
                            {index + 1}
                          </p>
                        </div>
                        <div>
                          <p className="font-bold">{insight?.element_type}</p>
                          <p className="font-normal">
                            {insight.recommendation}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>

                <Feedback />
              </div>
            </div>

            <div
              className={`w-full py-5 flex-col ${
                activePageNumber === 2 ? "flex" : "hidden"
              }`}
            >
              <div className="rounded-lg shadow border p-4 divide-y w-full">
                <CodeQuality pageData={pages[activePageNumber - 1]} />
              </div>

              <Feedback
                onFeedbackSelect={(feedback) => console.log(feedback)}
              />
            </div>

            <div
              className={`w-full py-5 flex-col ${
                activePageNumber === 3 ? "flex" : "hidden"
              }`}
            >
              <SiteSpeed pageData={pages[activePageNumber - 1]} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
