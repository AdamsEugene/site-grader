import React, { useMemo } from "react";
import { MdChevronRight } from "react-icons/md";
import DoughnutChart from "./Dashboard/DoughnutChart";
import ProgressBarChart from "./Dashboard/ProgressBarChart";
import MiniDoughnutChart from "./Dashboard/MiniDoughnutChart";
import GaussianDistributionChart from "./Dashboard/GaussianDistributionChart";
import useFetchIndustryValue from "../hooks/useFetchIndustryValue";

// Enhanced type definitions with more precise typing
interface IPageItem {
  title: string;
  pageNumber: number;
  recommendations?: string[];
}

interface AppSidebarProps {
  className?: string;
  pages: IPageItem[];
  onPageItemClick?: (page: IPageItem) => void;
  pageData?: { url?: string } | null;
  totalSiteSpeed?: number | null;
  totalCodeQuality?: number | null;
  totalInsightScore?: number | null;
}

// Memoized component for better performance
const AppSidebar: React.FC<AppSidebarProps> = React.memo(
  ({
    className,
    pages,
    onPageItemClick,
    totalCodeQuality = 0,
    totalInsightScore = 0,
    totalSiteSpeed = 0,
    pageData,
  }: AppSidebarProps) => {
    // Memoized overall percentage calculation
    const overallPercentage = useMemo(() => {
      const scores = [
        totalCodeQuality,
        totalInsightScore,
        totalSiteSpeed,
      ].filter((score) => score !== null);
      return scores.length > 0
        ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
        : 0;
    }, [totalCodeQuality, totalInsightScore, totalSiteSpeed]);

    // Memoized industry value hook
    const { perRevenueScore, homePageScore, homePageTotal, perRevenueTotal } =
      useFetchIndustryValue(pageData?.url, overallPercentage);

    // Centralized percentage retrieval function
    const getPagePercentage = (pageNumber: number): number => {
      switch (pageNumber) {
        case 1:
          return totalInsightScore ?? 0;
        case 2:
          return totalCodeQuality ?? 0;
        case 3:
          return totalSiteSpeed ?? 0;
        default:
          return 0;
      }
    };

    // Reusable benchmark component to reduce code duplication
    const BenchmarkSection: React.FC<{
      title: string;
      score: number | null;
      total: number | null;
      comparisonText: string;
    }> = ({ title, score, total, comparisonText }) => (
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-left px-4 pt-4">{title}</h4>
        <div className="grid grid-cols-3 gap-4 border-b border-gray-300 pb-4 p-4 items-center">
          <div className="border-r pr-4 border-gray-300">
            <p className="text-2xl font-bold mt-2">{score ?? "N/A"}%</p>
            <p className="text-sm text-gray-600">Average</p>
          </div>
          <div className=" text-sm text-gray-500 col-span-2">
            {comparisonText} {total ?? "N/A"}
          </div>
        </div>
      </div>
    );

    return (
      <div
        className={`h-full bg-white sm:bg-brandGreen sm:text-white text-gray-800 px-2 sm:rounded-lg w-full sm:max-w-[250px] lg:max-w-[320px] overflow-hidden ${className}`}
      >
        <div className="space-y-4 p-2 pb-40 text-center h-full w-full overflow-y-auto">
          <p className="text-lg font-semibold">Your Site's Diagnostic</p>
          <a
            href={pageData?.url}
            target="_blank"
            rel="noreferrer"
            aria-label="Visit website"
            className="text-sm font-normal sm:text-slate-200"
          >
            {pageData?.url || "No URL provided"}
          </a>
          <div className="sm:bg-[#08916F1A] rounded-lg w-full p-3">
            <p className="font-bold">Overall Score</p>
            <div className="p-2">
              <DoughnutChart percentage={overallPercentage} />
            </div>

            {/* Clickable progress bars for larger screens */}
            <div className="space-y-4 hidden sm:flex flex-col">
              {pages.map((page, index) => (
                <div
                  key={index}
                  onClick={() => onPageItemClick?.(page)}
                  className="cursor-pointer"
                >
                  <ProgressBarChart
                    label={page.title}
                    percentage={getPagePercentage(page.pageNumber)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="hidden sm:block overflow-hidden w-full rounded-lg">
            <div className="sm:bg-[#08916F1A] relative w-full flex flex-col sm:border-b-2 sm:border-brandGreen py-4 gap-y-4">
              <h2 className="pb-4 border-b border-brandGreen">
                Comparative Score
              </h2>
              <h4 className="text-white text-center text-[18px] font-semibold">
                HOMEPAGE
              </h4>
              <GaussianDistributionChart benchmarkValue={homePageScore ?? 0} />
              <p className="text-white text-center text-sm">
                Compared against {homePageTotal ?? "N/A"} Homepages
              </p>
            </div>

            <div className="sm:bg-[#08916F1A] relative w-full flex flex-col sm:border-b-2 sm:border-brandGreen py-4 gap-y-4">
              <h4 className="text-white text-center text-[18px] font-semibold">
                $500k-$1M revenue/year
              </h4>
              <GaussianDistributionChart
                benchmarkValue={perRevenueScore ?? 0}
              />
              <p className="text-white text-center text-sm">
                Compared against {perRevenueTotal ?? "N/A"} sites with $500k-$1M
                revenue per year
              </p>
            </div>
          </div>

          {/* Clickable items for smaller screens */}
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
                      percentage={getPagePercentage(page.pageNumber)}
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
          <div className="border border-gray-200 rounded-lg space-y-6 sm:hidden block">
            <BenchmarkSection
              title="Homepage"
              score={homePageScore}
              total={homePageTotal}
              comparisonText="Compared against"
            />
            <BenchmarkSection
              title="$500k-$1M revenue/year"
              score={perRevenueScore}
              total={perRevenueTotal}
              comparisonText="Compared against sites with $500k-$1M revenue per year"
            />
          </div>
        </div>
      </div>
    );
  }
);

// Add default props
AppSidebar.defaultProps = {
  pages: [],
  totalCodeQuality: 0,
  totalInsightScore: 0,
  totalSiteSpeed: 0,
};

export default AppSidebar;
