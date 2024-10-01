import { MdCheck, MdClose } from "react-icons/md";
import AppButton from "../../components/AppButton";
import AppNavbar2 from "../../components/AppNavbar2";
import AppSidebar from "../../components/AppSidebar";
import AppTitlebar from "../../components/Dashboard/AppTitlebar";
import { useState } from "react";

const recommendations = [
  {
    id: 1,
    title: "Change Button Text",
    description:
      "Change the button text from “Try Gummy Supplements” to “Explore Gummy Supplements”. This encourages users to learn more about the product without implying a free trial.",
  },
  {
    id: 2,
    title: "improve Price Larity",
    description:
      'Display the default price as "$22.99" alongside "$17.40 for a 5-month supply (Save 24%)". This builds trust with your customer about pricing transparency, while also incentivizing bulk purchases by highlighting the significant savings.',
  },
  {
    id: 3,
    title: "Add Date Posted",
    description:
      "Display the date when the customer reviews were posted. This ensures users that they are recent and reflective of the current product.",
  },
  {
    id: 4,
    title: "Change Button Text",
    description:
      "Change the button text from “Try Gummy Supplements” to “Explore Gummy Supplements”. This encourages users to learn more about the product without implying a free trial.",
  },
];

export default function Dashboard() {
  const [activePage, setActivePageNumber] = useState(1);

  return (
    <div className=" text-sm">
      <AppNavbar2 />

      <div className="px-4 flex">
        <AppSidebar />

        <div className="flex flex-col px-4">
          <AppTitlebar
            activePageNumber={(number) => setActivePageNumber(number)}
          />

          {/* Add a conditional rendering based on activePage */}
          <div className="flex w-full pt-5">
            {activePage === 1 && (
              <div className="me-3 w-1/2">This is content for page 1</div>
            )}
            {activePage === 2 && (
              <div className="me-3 w-1/2">This is content for page 2</div>
            )}

            <div className="flex flex-col w-1/2 pb-10">
              <div className="rounded-lg shadow divide-y">
                {recommendations.map((r, index) => (
                  <div key={index} className="flex flex-col p-3">
                    <div className="flex mb-2">
                      <p className="px-2 py-0.5 font-thin text-white bg-emerald-700 rounded-sm">
                        {index + 1}
                      </p>
                    </div>
                    <div>
                      <p className="font-bold">{r.title}</p>
                      <p className="font-normal">{r.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-5 text-center">
                Was this helpful?{" "}
                <AppButton
                  label="No"
                  left
                  Icon={<MdClose className="me-1 text-red-700" />}
                  className="p-1 px-2 mx-2"
                />{" "}
                <AppButton
                  label="Yes"
                  leftIcon={<MdCheck className="me-1 text-green-700" />}
                  className="p-1 px-2 mx-2"
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
