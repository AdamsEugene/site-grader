import { useRef, useState } from "react";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput";
import AppLinkButton from "../components/AppLinkButton";
import AppNavbar from "../components/AppNavbar";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleNextClick = () => {
    if (!url || !isValidURL(url)) {
      setError("Please enter a valid URL.");
      return;
    }

    // Pass URL to LoadingPage using navigate
    navigate("/form1", { state: { url } });
  };

  const isValidURL = (urlString: string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + //protocol
        "((([a-z0-9\\-]+\\.)+[a-z]{2,})|localhost|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ipv4
        "(\\:\\d+)?(\\/[-a-z0-9%_.~+]*)*" + // port and path
        "(\\?[;&a-z0-9%_.~+=-]*)?" + // query string
        "(\\#[-a-z0-9_]*)?$",
      "i"
    ); // fragment locator
    return !!urlPattern.test(urlString);
  };

  return (
    <div className="">
      <AppNavbar />

      <div className="bg-green-50 py-20">
        <div className="m-auto w-full max-w-md space-y-4 p-4 text-center">
          <h1 className="text-3xl font-bold">Boost Your Site's Performance.</h1>
          <p>
            Get AI-generated recommendations, benchmarked across 1,000+
            e-commerce sites, in just seconds.
          </p>
          <p className="text-gray-400">What's your homepage?</p>
          <AppInput
            placeholder="https://"
            ref={inputRef}
            onChange={(event) => setUrl(event.target.value)}
            className="w-full"
          />
          <br />
          {error && <p className="text-red-500">{error}</p>}{" "}
          {/* Error message */}
          <AppButton
            onClick={handleNextClick}
            primary
            label="Next"
            disabled={url.length < 1}
            className="w-full"
          />
          <div>
            <AppLinkButton primary label="Try For FREE" to="/" />
          </div>
        </div>
      </div>
    </div>
  );
}
