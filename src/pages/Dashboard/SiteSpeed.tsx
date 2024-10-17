// import { FcDoughnutChart } from "react-icons/fc";
// import CodeSnippet from "../../components/CodeSnippet";
// import Collapsible from "../../components/Collapsible";
// import { PageDetailsProp } from "../../components/Dashboard/AppTitlebar";
import Feedback from "../../components/Feedback";
import { IPSIDataResponse } from "../../interface/ISiteSpeed";
import slowSvg from "../../assets/images/avg1.svg";
import avgSvg from "../../assets/images/midhigh.svg";
import highSvg from "../../assets/images/high.svg";

interface SiteSpeedProps {
  pageData: IPSIDataResponse | null;
}

const SvgComponenent = ({
  speed,
  value,
}: {
  value: number;
  speed: "Slow" | "Average" | "Fast" | "Unknown" | undefined;
}) => (
  <div className="flex items-start md:items-center mt-2 md:mt-0">
    <div className="flex flex-col items-center relative">
      <img
        height={50}
        width={50}
        src={
          speed === "Slow"
            ? slowSvg
            : speed === "Average"
            ? avgSvg
            : speed === "Fast"
            ? highSvg
            : ""
        }
      />
      <p className="text-sm absolute bottom-0">{value}</p>
    </div>
  </div>
);

export default function SiteSpeed({ pageData }: SiteSpeedProps) {
  const lcpSpeed = pageData?.data.psi_metrics.largestContentfulPaint.speed;
  const lcpValue = pageData?.data.psi_metrics.largestContentfulPaint.value;

  const fcpSpeed = pageData?.data.psi_metrics.largestContentfulPaint.speed;
  const fcpValue = pageData?.data.psi_metrics.largestContentfulPaint.value;

  const clsSpeed = pageData?.data.psi_metrics.largestContentfulPaint.speed;
  const clsValue = pageData?.data.psi_metrics.largestContentfulPaint.value;

  const ttfbSpeed = pageData?.data.psi_metrics.largestContentfulPaint.speed;
  const ttfbValue = pageData?.data.psi_metrics.largestContentfulPaint.value;

  return (
    <div className="">
      <div className="rounded-lg shadow border w-full flex flex-col font-semibold mb-7">
        <p className="p-4 border-b font-bold">
          Total Site Speed: <span className="text-red-700">7.7</span>
        </p>
        <div className="flex justify-between divide-x border-b">
          <div className="flex flex-col sm:flex-row p-4 sm:items-center justify-between w-full">
            <p className="w-1/2 grow">Largest Contentful Paint (LCP)</p>
            {/* <FcDoughnutChart size={50} className="ms-2" /> */}
            <SvgComponenent
              speed={lcpSpeed}
              value={lcpValue ? lcpValue / 1000 : 0}
            />
          </div>
          <div className="flex flex-col sm:flex-row p-4 sm:items-center justify-between w-full">
            <p className="w-1/2 grow">First Contentful Paint (FCP)</p>
            {/* <FcDoughnutChart size={50} className="ms-2" /> */}
            <SvgComponenent
              speed={fcpSpeed}
              value={fcpValue ? fcpValue / 1000 : 0}
            />
          </div>
        </div>
        <div className="flex justify-between divide-x">
          <div className="flex flex-col sm:flex-row p-4 sm:items-center justify-between w-full">
            <p className="w-1/2 grow">Cumulative Layout Shift (CLS)</p>
            {/* <FcDoughnutChart size={50} className="ms-2" /> */}
            <SvgComponenent
              speed={clsSpeed}
              value={clsValue ? clsValue / 1000 : 0}
            />
          </div>
          <div className="flex flex-col sm:flex-row p-4 sm:items-center justify-between w-full">
            <p className="w-1/2 grow">Type to First Byte (TTFB)</p>
            {/* <FcDoughnutChart size={50} className="ms-2" /> */}
            <SvgComponenent
              speed={ttfbSpeed}
              value={ttfbValue ? ttfbValue / 1000 : 0}
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow border p-4 divide-y w-full">
        {pageData &&
          pageData.data.recommendations?.map((r, index) => (
            <div key={index} className="mb-4 text-gray-800">
              <p className="font-bold mb-2">{index + 1 + ". " + r.title}</p>
              {Array.isArray(r.recommendation) ? (
                <ul className="list-disc ps-5">
                  {r.recommendation.map((d, index) => (
                    <li key={index}>{d}</li>
                  ))}
                </ul>
              ) : (
                <p>{r.recommendation}</p>
              )}

              {/* {r.snippets &&
                r.snippets.map((snippet, index) => (
                  <div key={index} className="mt-5 rounded-lg overflow-hidden">
                    <Collapsible title={snippet.type + " code"}>
                      <CodeSnippet
                        language={snippet.language}
                        code={snippet.code}
                      />
                    </Collapsible>
                  </div>
                ))} */}
            </div>
          ))}
      </div>

      <Feedback onFeedbackSelect={(feedback) => console.log(feedback)} />
    </div>
  );
}
