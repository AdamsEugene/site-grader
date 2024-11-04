import { useState } from "react";
import axios from "axios";
import { IContact } from "../interface/IContact";

export default function useContact() {
  const [responseMessage, setResponseMessage] = useState();
  const [errormessage, setErrormessage] = useState("");

  const sendContactDetails = async (requestbody: IContact | undefined) => {
    try {
      const response = await axios.post(
        "https://sitegrade.heatmapcore.com/api/contacts",
        requestbody
      );
      if (response.data) {
        setResponseMessage(response.data);
      }
    } catch {
      setErrormessage("error");
    }
  };

  return {
    responseMessage,
    errormessage,
    sendContactDetails,
  };
}
