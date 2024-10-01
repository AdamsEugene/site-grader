import { MdCheck, MdClose } from "react-icons/md";
import AppButton from "./AppButton";

const Feedback = ({
  onFeedbackSelect,
}: {
  onFeedbackSelect?: (ans: "yes" | "no") => void;
}) => (
  <p className="mt-5 text-center">
    Was this helpful?{" "}
    <AppButton
      label="No"
      onClick={() => onFeedbackSelect?.("no")}
      leftIcon={<MdClose className="me-1 text-red-700" />}
      className="p-1 px-2 mx-2"
    />{" "}
    <AppButton
      label="Yes"
      onClick={() => onFeedbackSelect?.("yes")}
      leftIcon={<MdCheck className="me-1 text-green-700" />}
      className="p-1 px-2 mx-2"
    />
  </p>
);

export default Feedback;
