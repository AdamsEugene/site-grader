import { FcDoughnutChart } from "react-icons/fc";
import { MdChevronRight } from "react-icons/md";
import { Link } from "react-router-dom";
import { PageDetailsProp } from "./Dashboard/AppTitlebar";

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
      className={`p-2 bg-white sm:bg-emerald-700 sm:text-white text-gray-800 space-y-4 text-center rounded-lg w-full max-w-[250px] lg:max-w-[300px] ${className}`}
    >
      <p className="text-lg font-semibold">Your Site's Diagnostic</p>
      <Link to={"fb.com"} className="text-sm font-normal text-slate-200">
        https://thejellybee.com
      </Link>

      <div className="bg-transparent/10 h-32 rounded-lg w-full p-3">
        <p>Overall Score</p>
      </div>

      <div>
        {pages.map((page, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-y"
            onClick={() => onPageItemClick?.(page)}
          >
            <div className="flex items-center py-2">
              <FcDoughnutChart size={50} />

              <div className="ms-1">
                <p className="text-lg text-start m-0 font-bold">{page.title}</p>
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
  );
}
