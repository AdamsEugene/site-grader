import { FcDoughnutChart } from "react-icons/fc";
import CodeSnippet from "../../components/CodeSnippet";
import Collapsible from "../../components/Collapsible";
import { PageDetailsProp } from "../../components/Dashboard/AppTitlebar";
import Feedback from "../../components/Feedback";

interface SiteSpeedProps {
  pageData: PageDetailsProp;
}

export default function SiteSpeed({ pageData }: SiteSpeedProps) {
  return (
    <div className="">
      <div className="rounded-lg shadow border w-full flex flex-col font-semibold mb-7">
        <p className="p-4 border-b font-bold">
          Total Site Speed: <span className="text-red-700">7.7</span>
        </p>
        <div className="flex justify-between divide-x border-b">
          <div className="flex flex-col sm:flex-row p-4 sm:items-center justify-between w-full">
            <p className="w-1/2 grow">Largest Contentful Paint (LCP)</p>
            <FcDoughnutChart size={50} className="ms-2" />
          </div>
          <div className="flex flex-col sm:flex-row p-4 sm:items-center justify-between w-full">
            <p className="w-1/2 grow">First Contentful Paint (FCP)</p>
            <FcDoughnutChart size={50} className="ms-2" />
          </div>
        </div>
        <div className="flex justify-between divide-x">
          <div className="flex flex-col sm:flex-row p-4 sm:items-center justify-between w-full">
            <p className="w-1/2 grow">Largest Contentful Paint (LCP)</p>
            <FcDoughnutChart size={50} className="ms-2" />
          </div>
          <div className="flex flex-col sm:flex-row p-4 sm:items-center justify-between w-full">
            <p className="w-1/2 grow">First Contentful Paint (FCP)</p>
            <FcDoughnutChart size={50} className="ms-2" />
          </div>
        </div>
      </div>

      <div className="rounded-lg shadow border p-4 divide-y w-full">
        {pageData &&
          pageData.recommendations?.map((r, index) => (
            <div key={index} className="mb-4 text-gray-800">
              <p className="font-bold mb-2">{index + 1 + ". " + r.title}</p>
              {Array.isArray(r.description) ? (
                <ul className="list-disc ps-5">
                  {r.description.map((d, index) => (
                    <li key={index}>{d}</li>
                  ))}
                </ul>
              ) : (
                <p>{r.description}</p>
              )}

              {r.snippets &&
                r.snippets.map((snippet, index) => (
                  <div key={index} className="mt-5 rounded-lg overflow-hidden">
                    <Collapsible title={snippet.type + " code"}>
                      <CodeSnippet
                        language={snippet.language}
                        code={snippet.code}
                      />
                    </Collapsible>
                  </div>
                ))}
            </div>
          ))}
      </div>

      <Feedback onFeedbackSelect={(feedback) => console.log(feedback)} />
    </div>
  );
}
