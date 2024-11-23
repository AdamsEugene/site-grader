import { MdCheck, MdClose } from "react-icons/md";
import AppButton from "./AppButton";

const Feedback = ({
  onFeedbackSelect,
}: {
  onFeedbackSelect?: (ans: "yes" | "no") => void;
}) => (
  <div className="mt-5 flex items-center gap-2 justify-around">
    <p className=" text-center">Was this helpful? </p>
    <div className="flex items-center gap-1">
      <AppButton
        label="No"
        onClick={() => onFeedbackSelect?.("no")}
        leftIcon={<MdClose className="me-1 text-red-700 text-lg" />}
        className="py-1 !px-2"
      />{" "}
      <AppButton
        label="Yes"
        onClick={() => onFeedbackSelect?.("yes")}
        leftIcon={<MdCheck className="me-1 text-green-700 text-lg" />}
        className="py-1 !px-2"
      />
    </div>
  </div>
);

export default Feedback;
