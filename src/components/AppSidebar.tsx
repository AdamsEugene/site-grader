import { Link } from "react-router-dom";

export default function AppSidebar() {
  return (
    <div className="p-2 bg-emerald-700 space-y-4 text-white text-center rounded-lg w-[250px]">
      <p className="text-lg font-semibold">Your Site's Diagnostic</p>
      <Link to={"fb.com"} className="text-sm font-normal text-slate-200">
        https://thejellybee.com
      </Link>

      <div className="bg-transparent/10 rounded-lg w-full p-3">
        <p>Overall Score</p>
      </div>
    </div>
  );
}
