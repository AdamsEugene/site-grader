import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import AppLinkButton from "../components/AppLinkButton";
import AppNavbar from "../components/AppNavbar";

export default function Home() {
  return (
    <div className="">
      <AppNavbar />

      <div className="bg-green-50 py-20">
        <div className="m-auto w-full max-w-md space-y-4 text-center">
          <h1 className="text-3xl font-bold">Boost Your Site's Performance</h1>

          <p>
            Get AI-generated recommendations, benchmarked across 1,000+
            e-commerce sites, in just seconds.
          </p>

          <p className="text-gray-400">What's your homepage?</p>

          <AppInput placeholder="https://" className="w-full" />
          <br />
          <AppButton primary label="Next" disabled className="w-full" />
          <div>
            <AppLinkButton primary label="Try For FREE" href="/form1" />
          </div>
        </div>
      </div>
    </div>
  );
}
