import { useEffect, useState } from "react";
import { FcDoughnutChart } from "react-icons/fc";

interface AppTitlebarProps {
  activePageNumber?: (number: number) => void;
  pages: PageDetailsProp[];
  currentPage?: PageDetailsProp;
}

export interface PageDetailsProp {
  pageNumber: number;
  title: string;
  description: string;
  rating: number;
<<<<<<< HEAD
<<<<<<< HEAD
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
=======
  recommendations?: { id: number; title: string; description: string }[];
>>>>>>> 4ecc786 (dashboard progress)
=======
  recommendations?: { id: number; title: string; description: string }[];
=======
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
>>>>>>> 6b582f9 (other pages added)
>>>>>>> 29d076a (other pages added)
}

export default function AppTitlebar({
  activePageNumber,
  pages,
  currentPage,
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
      <div className="hidden sm:flex font-bold space-x-4 border-b">
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
              <FcDoughnutChart size={30} className="ms-2" />
            </div>

            {activePage?.pageNumber === page.pageNumber && (
              <div className="h-[3px] w-full bg-emerald-700" />
            )}
          </div>
        ))}
      </div>

      <div className="py-6 border-b sm:border-0">
        <h1 className="text-2xl font-bold">{activePage?.title}</h1>
        <p>{activePage.description}</p>
      </div>
    </div>
  );
}
