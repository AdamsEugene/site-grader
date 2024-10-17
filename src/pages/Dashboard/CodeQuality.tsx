import CodeSnippet from "../../components/CodeSnippet";
import Collapsible from "../../components/Collapsible";
// import { PageDetailsProp } from "../../components/Dashboard/AppTitlebar";
import { ISiteAuditResponse } from "../../interface/ICodeQuality";

interface CodeQualityProps {
  pageData: ISiteAuditResponse | null;
}

export default function CodeQuality({ pageData }: CodeQualityProps) {
  return (
    <div className="">
      {pageData &&
        pageData.data.site_audit.HTML.CodeRecommendation?.map((r, rIndex) => (
          <div key={rIndex} className="mb-4">
            <p className="font-bold mb-2">{rIndex + 1 + ". "}</p>
            {Array.isArray(r.Explanation) ? (
              <ul className="list-disc ps-5 text-gray-800">
                {r.Explanation.map((d, dIndex) => (
                  <li key={dIndex}>{d}</li>
                ))}
              </ul>
            ) : (
              <p>Description: {r.Explanation}</p>
            )}

            {/* {r.snippets &&
              r.snippets.map((snippet, index) => ( */}
            <div className="mt-5 rounded-lg overflow-hidden">
              <Collapsible title={" code"}>
                <CodeSnippet
                  // language={snippet.language}
                  code={r.OriginalCode}
                />
              </Collapsible>
            </div>
            <div className="mt-5 rounded-lg overflow-hidden">
              <Collapsible title={" code"}>
                <CodeSnippet
                  // language={snippet.language}
                  code={r.RecommendedCode}
                />
              </Collapsible>
            </div>
            {/* ))} */}
          </div>
        ))}
    </div>
  );
}
