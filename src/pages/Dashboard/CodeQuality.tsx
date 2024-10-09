import CodeSnippet from "../../components/CodeSnippet";
import Collapsible from "../../components/Collapsible";
import { PageDetailsProp } from "../../components/Dashboard/AppTitlebar";

interface CodeQualityProps {
  pageData: PageDetailsProp;
}

export default function CodeQuality({ pageData }: CodeQualityProps) {
  return (
    <div className="">
      {pageData &&
        pageData.recommendations?.map((r, rIndex) => (
          <div key={rIndex} className="mb-4">
            <p className="font-bold mb-2">{rIndex + 1 + ". " + r.title}</p>
            {Array.isArray(r.description) ? (
              <ul className="list-disc ps-5 text-gray-800">
                {r.description.map((d, dIndex) => (
                  <li key={dIndex}>{d}</li>
                ))}
              </ul>
            ) : (
              <p>Description: {r.description}</p>
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
  );
}
