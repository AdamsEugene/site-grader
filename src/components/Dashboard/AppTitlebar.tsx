import { useState } from "react";
import { FcDoughnutChart } from "react-icons/fc";

interface AppTitlebarProps {
  activePageNumber?: (pageNumber: number) => void;
}

interface PageDetailsProp {
  id: number;
  title: string;
  description: string;
  rating: number;
}

const pages = [
  {
    id: 1,
    title: "User Experience",
    description: "Apply the recommendations to improve your site's usability.",
    rating: 45,
  },
  {
    id: 2,
    title: "Code Quality",
    description: "Apply the recommendations to improve your site's usability.",
    rating: 45,
  },
  {
    id: 3,
    title: "Site Speed",
    description: "Apply the recommendations to improve your site's usability.",
    rating: 45,
  },
];

export default function AppTitlebar({ activePageNumber }: AppTitlebarProps) {
  const [activePage, setActivePage] = useState<PageDetailsProp>(pages[0]);

  return (
    <div>
      <div className="flex font-bold space-x-4 border-b">
        {pages.map((page, index) => (
          <div
            key={index}
            className="font-bold cursor-pointer"
            onClick={() => {
              setActivePage(page);
              activePageNumber?.(page.id);
            }}
          >
            <div className="flex items-center pb-2">
              <span className="py-2 inline-block">{page.title}</span>{" "}
              <FcDoughnutChart size={30} className="ms-2" />
            </div>

            {activePage?.id === page.id && (
              <div className="h-[3px] w-full bg-emerald-700" />
            )}
          </div>
        ))}
      </div>

      <div className="py-6">
        <h1 className="text-2xl font-bold">{activePage?.title}</h1>
        <p>{activePage.description}</p>
      </div>
    </div>
  );
}
