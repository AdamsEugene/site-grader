import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import DoughnutChart from "./Dashboard/DoughnutChart";
import ProgressBarChart from "./Dashboard/ProgressBarChart";
import MiniDoughnutChart from "./Dashboard/MiniDoughnutChart";
import { PageDetailsProp } from "./Dashboard/AppTitlebar";
// import { IPSIDataResponse } from "../interface/ISiteSpeed";
import IMessageProp from "../interface/IMessageProp";

interface AppSidebarProps {
  className?: string;
  pages: PageDetailsProp[];
  onPageItemClick?: (page: PageDetailsProp) => void;
  pageData?: IMessageProp | null;
  // pageInfo?: IMessageProp;
  totalSiteSpeed?: number | null | undefined;
  totalCodeQuality?: number | null | undefined;
  totalInsightScore?: number | null;
  // siteUrl: string;
}

export default function AppSidebar({
  className,
  pages,
  onPageItemClick,
  totalCodeQuality,
  totalInsightScore,
  totalSiteSpeed,
  pageData,
}: // siteUrl,
AppSidebarProps) {
  const overallPercentage =
    totalCodeQuality && totalInsightScore && totalSiteSpeed
      ? parseFloat(
          ((totalCodeQuality + totalInsightScore + totalSiteSpeed) / 3).toFixed(
            2
          )
        )
      : 0;
  console.log("site" + pageData?.url);
  return (
    <div
      className={`h-full bg-white sm:bg-brandGreen sm:text-white text-gray-800 px-2 sm:rounded-lg w-full sm:max-w-[250px] lg:max-w-[320px] overflow-hidden ${className}`}
    >
      <div className="space-y-4 p-2 pb-40 text-center h-full w-full overflow-y-auto">
        <p className="text-lg font-semibold">Your Site's Diagnostic</p>
        <Link to={"fb.com"} className="text-sm font-normal sm:text-slate-200">
          {pageData?.url}
        </Link>
        <div className="sm:bg-[#08916F1A] rounded-lg w-full p-3">
          <p className="font-bold">Overall Score</p>
          <div className="p-2">
            <DoughnutChart percentage={overallPercentage} />
          </div>

          <div className="space-y-4 hidden sm:flex flex-col">
            {pages.map((page, index) => (
              <ProgressBarChart
                key={index}
                label={page.title}
                percentage={
                  page.pageNumber === 1
                    ? totalInsightScore
                    : page.pageNumber === 2
                    ? totalCodeQuality
                    : page.pageNumber === 3
                    ? totalSiteSpeed
                    : 0
                }
              />
            ))}
          </div>
        </div>

        <div className="sm:hidden">
          {pages.map((page, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-y cursor-pointer"
              onClick={() => onPageItemClick?.(page)}
            >
              <div className="flex items-center py-2">
                <div className="h-10 w-10">
                  <MiniDoughnutChart
                    labelClassName="text-xs"
                    percentage={
                      page.pageNumber === 1
                        ? totalInsightScore
                        : page.pageNumber === 2
                        ? totalCodeQuality
                        : page.pageNumber === 3
                        ? totalSiteSpeed
                        : 0
                    }
                  />
                </div>

                <div className="ms-1">
                  <p className="text-lg text-start m-0 font-bold">
                    {page.title}
                  </p>
                  <p className="m-0">
                    {page.recommendations?.length || 0} recommendations
                  </p>
                </div>
              </div>
              <MdChevronRight size={30} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
