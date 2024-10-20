import { useEffect, useState } from "react";
import MiniDoughnutChart from "./MiniDoughnutChart";

interface AppTitlebarProps {
  activePageNumber?: (number: number) => void;
  pages: PageDetailsProp[];
  currentPage?: PageDetailsProp;
  totalSiteSpeed?: number | null | undefined;
  totalCodeQuality?: number | null | undefined;
  totalInsightScore?: number | null;
}

export interface PageDetailsProp {
  pageNumber: number;
  title: string;
  description: string;
  rating: number;
  recommendations?: {
    id: number;
    title: string;
    description: string | string[];
    snippets?: {
      type: "original" | "recommended";
      language: string;
      code: string;
    }[];
  }[];
}

export const PageTitle = ({
  description,
  title,
}: {
  description: string;
  title: string;
}) => (
  <div className="py-6 border-b sm:border-0">
    <h1 className="text-2xl font-bold">{title}</h1>
    <p>{description}</p>
  </div>
);

export default function AppTitlebar({
  activePageNumber,
  pages,
  currentPage,
  totalCodeQuality,
  totalInsightScore,
  totalSiteSpeed,
}: AppTitlebarProps) {
  const [activePage, setActivePage] = useState<PageDetailsProp>(pages[0]);

  useEffect(() => {
    if (currentPage) {
      setActivePage(currentPage);
      activePageNumber?.(currentPage.pageNumber);
    }
  }, [currentPage, activePageNumber]);

  return (
    <div>
      <div className="hidden sm:flex font-bold px-4 space-x-4 border-b">
        {pages.map((page, index) => (
          <div
            key={index}
            className="font-bold cursor-pointer"
            onClick={() => {
              setActivePage(page);
              activePageNumber?.(page.pageNumber);
            }}
          >
            <div className="flex items-center pb-2">
              <span className="py-2 inline-block">{page.title}</span>{" "}
              <div className="h-10 w-10 ms-2">
                <MiniDoughnutChart
                  labelClassName="text-[12px]"
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
            </div>

            {activePage?.pageNumber === page.pageNumber && (
              <div className="h-[3px] w-full bg-emerald-700" />
            )}
          </div>
        ))}
      </div>

      {/* <PageTitle title={ac}/> */}
    </div>
  );
}
