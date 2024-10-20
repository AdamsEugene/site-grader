import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { PageDetailsProp } from "./Dashboard/AppTitlebar";
import GaussianDistributionChart from "./Dashboard/GaussianDistributionChart";
import DoughnutChart from "./Dashboard/DoughnutChart";
import ProgressBarChart from "./Dashboard/ProgressBarChart";

interface AppSidebarProps {
  className?: string;
  pages: PageDetailsProp[];
  onPageItemClick?: (page: PageDetailsProp) => void;
}

export default function AppSidebar({
  className,
  pages,
  onPageItemClick,
}: AppSidebarProps) {
  return (
    <div
      className={`h-full bg-white sm:bg-emerald-700 sm:text-white text-gray-800  sm:rounded-lg w-full sm:max-w-[250px] lg:max-w-[300px] overflow-hidden ${className}`}
    >
      <div className="space-y-4 p-2 pb-40 text-center h-full w-full overflow-y-auto">
        <p className="text-lg font-semibold">Your Site's Diagnostic</p>
        <Link to={"fb.com"} className="text-sm font-normal sm:text-slate-200">
          https://thejellybee.com
        </Link>
        <div className="sm:bg-transparent/10 rounded-lg w-full p-3">
          <p className="font-bold">Overall Score</p>
          <div className="p-10">
            <DoughnutChart percentage={65} />
          </div>

          <div className="space-y-4 hidden sm:flex flex-col">
            {pages.map((page, index) => (
              <ProgressBarChart
                key={index}
                label={page.title}
                percentage={page.rating}
              />
            ))}
          </div>
        </div>

        <div className="pt-5 hidden sm:block overflow-hidden">
          <div className="bg-transparent/10 relative rounded-lg w-full flex flex-col gap-y-6">
            <GaussianDistributionChart />
            <GaussianDistributionChart />
            <GaussianDistributionChart />
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
                  <DoughnutChart labelClassName="text-[12px]" />
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
