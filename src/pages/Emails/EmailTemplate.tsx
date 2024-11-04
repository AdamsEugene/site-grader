import EmailTemplate from "../../components/EmailTemplate";
import siteIcon from "../../assets/images/sitegrader_icon.png";

function EmailComponent() {
  // Define the props for EmailTemplate
  const emailProps = {
    title: "Your Report is Ready",
    subtitle:
      "Figma ipsum component variant main layer. Select connection scrolling outline list asset. Link content figma line bullet device stroke. Shadow background invite auto plugin bold move arrange.",
    button: "View Report",
    message: "Score Summary:",
    sections: [
      {
        heading: "Overall Score:",
        score: "64/100",
        content: [
          "Figma ipsum component variant main layer. Select connection scrolling outline list asset. Link content figma line bullet device stroke. Shadow background invite auto plugin bold move arrange.",
        ],
      },
      {
        heading: "User Experience",
        score: "64/100",
        content: [
          "Figma ipsum component variant main layer. Select connection scrolling outline list asset. Link content figma line bullet device stroke. Shadow background invite auto plugin bold move arrange.",
        ],
      },
      {
        heading: "Code Quality",
        score: "64/100",
        content: [
          "Figma ipsum component variant main layer. Select connection scrolling outline list asset. Link content figma line bullet device stroke. Shadow background invite auto plugin bold move arrange.",
        ],
      },
      {
        heading: "Site Speed",
        score: "64/100",
        content: [
          "Figma ipsum component variant main layer. Select connection scrolling outline list asset. Link content figma line bullet device stroke. Shadow background invite auto plugin bold move arrange.",
        ],
      },
    ],
    imageUrl: siteIcon, // Use imported siteIcon here
  };

  return (
    <div>
      <EmailTemplate
        title={emailProps.title}
        subtitle={emailProps.subtitle}
        button={emailProps.button}
        message={emailProps.message}
        sections={emailProps.sections}
        imageUrl={emailProps.imageUrl}
      />
    </div>
  );
}

export default EmailComponent;
