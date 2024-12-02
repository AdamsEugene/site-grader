import { MdCheck, MdClose } from "react-icons/md";
import AppButton from "./AppButton";
import useFeedBack from "../hooks/useFeedBack";
// import useSiteAnalysis from "../hooks/useSiteAnalysis";
// import IMessageProp from "../interface/IMessageProp";
// import { IFeedBack } from "../interface/IFeedBack";

const Feedback = ({
  onFeedbackSelect,
  jobId,
}: {
  onFeedbackSelect?: (ans: "yes" | "no", isFeedbackSent?: boolean) => void;
  jobId?: string;
}) => {
  // const message: IMessageProp | null = null; // Replace with the appropriate message
  // // const { data } = useSiteAnalysis(message);
  const { errorMessage, sendFeedBack } = useFeedBack();
  const handleFeedbackSelect = async (ans: "yes" | "no") => {
    // Prepare the feedback payload
    const feedbackPayload = {
      id: jobId,
      helpful: ans === "yes",
    };

    try {
      // Send feedback
      await sendFeedBack(feedbackPayload);

      // Notify the parent about the selected option (if provided)
      onFeedbackSelect?.(ans, true);
    } catch (error) {
      console.error("Failed to send feedback:", error);
    }
  };
  return (
    <div className="mt-5 flex items-center gap-2 justify-around">
      <p className=" text-center">Was this helpful? </p>
      <div className="flex items-center gap-1">
        <AppButton
          label="No"
          onClick={() => handleFeedbackSelect("no")}
          leftIcon={<MdClose className="me-1 text-red-700 text-lg" />}
          className="py-1 !px-2"
        />{" "}
        <AppButton
          label="Yes"
          onClick={() => handleFeedbackSelect("yes")}
          leftIcon={<MdCheck className="me-1 text-green-700 text-lg" />}
          className="py-1 !px-2"
        />
      </div>
      {/* Display feedback response or error message */}
      {/* {responseMessage && (
        <p className="text-green-700 text-sm mt-2">
          Thank you for your feedback!
        </p>
      )} */}
      {errorMessage && (
        <p className="text-red-700 text-sm mt-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default Feedback;
