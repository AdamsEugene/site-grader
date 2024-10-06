import { useState } from "react";
import AppButton from "../components/AppButton";
import AppNavbar from "../components/AppNavbar";
import AppFooter from "../components/AppFooter";
import { useNavigate, useLocation } from "react-router-dom";

const steps = [
  {
    id: 1,
    question: "What kinds of products and services do you offer on your site?",
    options: [
      "Arts and crafts",
      "Baby and kids",
      "Books, music, and video",
      "Business equipment and supplies",
      "Clothing",
      "Electronics",
      "Food and drink",
      "Hardware and automotive",
      "Health and beauty",
      "Home and decor",
    ],
  },
  {
    id: 2,
    question: "What is the average annual revenue generated by this site?",
    options: [
      "$0 - $50",
      "$50 - $100",
      "$100 - $500",
      "$500 - $1M",
      "$1M - $5M",
      "$5M - $10M",
      "$10M+",
    ],
  },
];

export default function Form1() {
  const [activeStep, setActiveStep] = useState(1);
  const [selectedOffers, setSelectedOffers] = useState<string[]>([]);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOfferClick = (offer: string) => {
    if (selectedOffers?.includes(offer)) {
      setSelectedOffers(selectedOffers.filter((o) => o !== offer));
      return;
    }

    setSelectedOffers((prevSelectedOffers) => [
      ...(prevSelectedOffers ?? []),
      offer,
    ]);

    // Automatically go to the next step
    handleNextClick();
  };

  const handleNextClick = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    } else {
      const averageRevenue = "Example Revenue";
      const email = "example@example.com";

      console.log("Navigating to LoadingPage with:", {
        url: location.state?.url,
        product_service: selectedOffers,
        average_revenue: averageRevenue,
        email: email,
      });
      // navigate to loadingPage when all steps are completed
      navigate("/loadingPage", {
        state: {
          url: location.state?.url, // Retaining the url from previous page
          product_service: selectedOffers,
          average_service: " ",
          email: "",
        },
      });
    }
  };

  const handleBackClick = () => {
    setActiveStep(activeStep > 1 ? activeStep - 1 : 1);
  };

  return (
    <div className="relative flex flex-col h-screen overflow-hidden">
      <AppNavbar
        showControls
        onNextClick={handleNextClick}
        onBackClick={handleBackClick}
        loaderProgress={(activeStep / steps.length) * 100}
      />

      <div className="overflow-auto">
        <div className="px-3 mx-auto grow py-10 w-full max-w-sm space-y-4">
          <p className="text-sm text-gray-400">
            {activeStep} of {steps.length}
          </p>
          <p>{steps[activeStep - 1].question}</p>

          <div className="space-y-2">
            {steps[activeStep - 1].options.map((offer, index) => (
              <AppButton
                key={index}
                label={offer}
                className="w-full text-left"
                primary={selectedOffers?.includes(offer)}
                onClick={() => handleOfferClick(offer)}
              />
            ))}
          </div>
        </div>
      </div>

      <AppFooter />
      <div className="px-3 sm:hidden mx-auto grow-1 py-3 w-full max-w-sm space-y-4">
        <AppButton
          label="Exit"
          className="border-0 text-emerald-700 disabled:text-gray-400 bg-gray-200 w-full"
          onClick={handleNextClick}
        />
        <AppButton
          onClick={handleBackClick}
          label="Back"
          className="border-0 w-full text-emerald-700"
        />
      </div>
    </div>
  );
}
