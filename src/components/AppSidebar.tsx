import { Link } from "react-router-dom";
import { MdChevronRight } from "react-icons/md";
import DoughnutChart from "./Dashboard/DoughnutChart";
import ProgressBarChart from "./Dashboard/ProgressBarChart";
import MiniDoughnutChart from "./Dashboard/MiniDoughnutChart";
import GaussianDistributionChart from "./Dashboard/GaussianDistributionChart";
import useFetchIndustryValue from "../hooks/useFetchIndustryValue";

interface PageDetailsProp {
  title: string;
  pageNumber: number;
  recommendations?: string[] | undefined;
}

interface IMessageProp {
  url?: string;
}

interface AppSidebarProps {
  className?: string;
  pages?: PageDetailsProp[];
  onPageItemClick?: (page: PageDetailsProp) => void;
  pageData?: IMessageProp | null;
  totalSiteSpeed?: number | null | undefined;
  totalCodeQuality?: number | null | undefined;
  totalInsightScore?: number | null;
}

export default function AppSidebar({
  className,
  pages,
  onPageItemClick,
  totalCodeQuality,
  totalInsightScore,
  totalSiteSpeed,
  pageData,
}: AppSidebarProps) {
  const overallPercentage =
    totalCodeQuality && totalInsightScore && totalSiteSpeed
      ? Math.round((totalCodeQuality + totalInsightScore + totalSiteSpeed) / 3)
      : 0;

  // Use custom hook to fetch industry and category values
  const { industryValue, categoryValue } = useFetchIndustryValue(
    pageData?.url,
    overallPercentage
  );

  return (
    <div
      className={`h-full bg-white sm:bg-brandGreen sm:text-white text-gray-800 px-2 sm:rounded-lg w-full sm:max-w-[250px] lg:max-w-[320px] overflow-hidden ${className}`}
    >
      <div className="space-y-4 p-2 pb-40 text-center h-full w-full overflow-y-auto">
        <p className="text-lg font-semibold">Your Site's Diagnostic</p>
        <Link to={"#"} className="text-sm font-normal sm:text-slate-200">
          {pageData?.url}
        </Link>
        <div className="sm:bg-[#08916F1A] rounded-lg w-full p-3">
          <p className="font-bold">Overall Score</p>
          <div className="p-2">
            <DoughnutChart percentage={overallPercentage} />
          </div>

          {/* Clickable progress bars for larger screens */}
          <div className="space-y-4 hidden sm:flex flex-col">
            {pages &&
              pages.map((page, index) => (
                <div
                  key={index}
                  onClick={() => onPageItemClick?.(page)}
                  className="cursor-pointer"
                >
                  <ProgressBarChart
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
                </div>
              ))}
          </div>
        </div>

        <div className="pt-2 m-0 hidden  overflow-hidden w-full">
          <div className="bg-transparent/10 relative rounded-lg w-full flex flex-col gap-y-6">
            <h4 className="text-white text-center text-sm font-semibold">
              HOMEPAGE
            </h4>
            {/* Gaussian distribution chart for industry value */}
            <GaussianDistributionChart benchmarkValue={industryValue} />
            {/* Text below the first Gaussian chart */}
            <p className="text-white text-center text-sm">
              Compared against 438 Homepages
            </p>
          </div>
        </div>
        <div className="pt-2 hidden  overflow-hidden w-full">
          <div className="bg-transparent/10 relative rounded-lg w-full flex flex-col gap-y-6">
            {/* Gaussian distribution chart for category value */}
            <GaussianDistributionChart benchmarkValue={categoryValue} />
          </div>
        </div>

        {/* Clickable items for smaller screens */}
        <div className="sm:hidden">
          {pages &&
            pages.map((page, index) => (
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
