import { PageDetailsProp } from "../components/Dashboard/AppTitlebar";

export default [
  {
    pageNumber: 1,
    title: "User Experience",
    description: "Apply the recommendations to improve your site's usability.",
    rating: 45,
    recommendations: [
      {
        id: 1,
        title: "Change Button Text",
        description:
          "Change the button text from “Try Gummy Supplements” to “Explore Gummy Supplements”. This encourages users to learn more about the product without implying a free trial.",
      },
      {
        id: 2,
        title: "improve Price Larity",
        description:
          'Display the default price as "$22.99" alongside "$17.40 for a 5-month supply (Save 24%)". This builds trust with your customer about pricing transparency, while also incentivizing bulk purchases by highlighting the significant savings.',
      },
      {
        id: 3,
        title: "Add Date Posted",
        description:
          "Display the date when the customer reviews were posted. This ensures users that they are recent and reflective of the current product.",
      },
      {
        id: 4,
        title: "Change Button Text",
        description:
          "Change the button text from “Try Gummy Supplements” to “Explore Gummy Supplements”. This encourages users to learn more about the product without implying a free trial.",
      },
    ],
  },
  {
    pageNumber: 2,
    title: "Code Quality",
    description: "Apply the recommendations to improve your site's usability.",
    rating: 45,
    recommendations: [
      {
        id: 1,
        title: "Optimize loading of CSS and JavaScript files",
        description: [
          "The code includes multiple CSS and JavaScript files. Consider combining them to reduce the number of HTTP requests.",
          "Ensure that the script files are placed at the end of the <body> tag to allow the page to load faster.",
          "Minify CSS and JavaScript files to reduce their size and improve loading speed.",
        ],
        snippets: [
          {
            type: "original",
            language: "javascript",
            code: `<div key={index} className="mb-4">
            <p className="font-bold mb-2">{index + 1 + ". " + r.title}</p>
              {Array.isArray(r.description) ? (
                <ul className="list-disc ps-5 text-gray-800">
                  {r.description.map((d, index) => (
                    <li key={index}>{d}</li>
                  ))}
                </ul>
                ) : (
                  <p>Description: {r.description}</p>
                )}
          </div>`,
          },
          {
            type: "recommended",
            language: "javascript",
            code: `<div key={index} className="mb-4">
            <p className="font-bold mb-2">{index + 1 + ". " + r.title}</p>
              {Array.isArray(r.description) ? (
                <ul className="list-disc ps-5 text-gray-800">
                  {r.description.map((d, index) => (
                    <li key={index}>{d}</li>
                  ))}
                </ul>
                ) : (
                  <p>Description: {r.description}</p>
                )}
          </div>`,
          },
        ],
      },

      {
        id: 2,
        title: "Lazy-load images and video",
        description: [
          "The code contains several images and videos. Implement lazy-loading techniques to load them only when they are visible in the viewport.",
          'Use the "loading" attribute on <img> tags to defer loading of images until they are needed.',
          "For videos, consider using a placeholder image and load the video only when the user interacts with it.",
        ],
      },
    ],
  },
  {
    pageNumber: 3,
    title: "Site Speed",
    description: "Apply the recommendations to improve your site's usability.",
    rating: 45,
    recommendations: [
      {
        id: 1,
        title: "Maximize main-thread work",
        description:
          "Consider reducing the time spent parsing, compiling and executing JS. You may find delivering smaller JS payloads helps with this.",
      },
      {
        id: 2,
        title: "Eliminate render-blocking resources",
        description:
          "Resources are blocking the first paint of your page. Consider delivering critical JS/CSS inline and deferring all non-critical JS/styles.",
      },
      {
        id: 3,
        title: "Minify CSS",
        description: "Minifying CSS files can reduce network payload sizes.",
      },
      {
        id: 4,
        title: "Reduce unused CSS",
        description:
          "Reduce unused rules from stylesheets and defer CSS not used for above-the-fold content to decrease bytes consumed by network activity.",
      },
    ],
  },
] as PageDetailsProp[];
