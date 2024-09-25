import { BsStars } from "react-icons/bs";
import AppNavbar from "../components/AppNavbar";
import AppProgressBar from "../components/AppProgressBar";

export default function LoadingPage() {
  return (
    <div className="h-screen">
      <AppNavbar />

      <div className="m-auto grow w-52 flex justify-center items-center py-32 space-y-4 text-center">
        <div className="flex flex-col items-center space-y-4 w-full">
          <div className="flex">
            <div className="bg-emerald-700 p-2">
              <BsStars color="white" size={25} />
            </div>
          </div>
          <AppProgressBar
            progress={90}
            className="rounded-full overflow-hidden w-full bg-gray-300/50"
          />
          <p className="font-semibold text-sm">CRO Hack: [Enter CRO Hack]...</p>
        </div>
      </div>
    </div>
  );
}
