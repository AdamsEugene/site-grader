import { useState } from "react";
import axios from "axios";
import { IFeedBack } from "../interface/IFeedBack";

export default function useFeedBack() {
  const [responseMessage, setResponseMessage] = useState();
  const [errorMessage, setErrorMessage] = useState("");

  const sendFeedBack = async (requestBody: IFeedBack | undefined) => {
    try {
      const response = await axios.post(
        "https://sitegrade.heatmapcore.com/api/reports/feedback",
        requestBody
      );
      if (response.data) {
        setResponseMessage(response.data);
      }
    } catch {
      setErrorMessage("error");
    }
  };
  return {
    responseMessage,
    errorMessage,
    sendFeedBack,
  };
}
