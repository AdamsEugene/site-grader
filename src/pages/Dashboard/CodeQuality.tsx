import CodeSnippet from "../../components/CodeSnippet";
import Collapsible from "../../components/Collapsible";
// import { PageDetailsProp } from "../../components/Dashboard/AppTitlebar";
import {
  IRecommendation,
  ISiteAuditResponse,
} from "../../interface/ICodeQuality";

interface CodeQualityProps {
  pageData: ISiteAuditResponse | null;
}

const ObjCodeQuality = ({
  title,
  recommendationData,
}: {
  title: string;
  recommendationData: IRecommendation[] | undefined;
}) => (
  <div className="mb-10">
    <p className="mb-3 font-bold ps-2 uppercase">{title}</p>

    <div className="rounded-lg shadow border p-4 divide-y w-full">
      {recommendationData &&
        recommendationData?.map((r, rIndex) => (
          <div key={rIndex} className="mb-4 py-4">
            {/* <p className="font-bold mb-2">{rIndex + 1 + ". "}</p> */}
            {Array.isArray(r.Explanation) ? (
              <ul className="list-disc ps-5 text-gray-800">
                {r.Explanation.map((d, dIndex) => (
                  <li key={dIndex}>{d}</li>
                ))}
              </ul>
            ) : (
              <p>{r.Explanation}</p>
            )}

            {/* {r.snippets &&
        r.snippets.map((snippet, index) => ( */}
            <div className="mt-5 rounded-lg overflow-hidden">
              <Collapsible title={"Original Code"}>
                <CodeSnippet
                  // language={snippet.language}
                  code={r.OriginalCode}
                />
              </Collapsible>
            </div>
            <div className="mt-5 rounded-lg overflow-hidden">
              <Collapsible title={"Recommended Code"}>
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
  </div>
);

export default function CodeQuality({ pageData }: CodeQualityProps) {
  return (
    <div className="">
      <ObjCodeQuality
        title="html"
        recommendationData={pageData?.data.site_audit.HTML.CodeRecommendation}
      />
      <ObjCodeQuality
        title="css"
        recommendationData={pageData?.data.site_audit.CSS.CodeRecommendation}
      />
      <ObjCodeQuality
        title="javascript"
        recommendationData={
          pageData?.data.site_audit.JavaScript.CodeRecommendation
        }
      />

      <div className="rounded-lg shadow border p-4 divide-y w-full">
        <p>{pageData?.data.site_audit.Summary}</p>
      </div>
    </div>
  );
}
