import React from "react";
import siteIcon from "../assets/images/sitegrader_icon.png";
import orangeHills from "../assets/images/orangeHills.png";

interface EmailTemplateProps {
  title: string;
  subtitle: string;
  button: string;
  message: string;
  sections: { heading: string; score: string; content: string[] }[];
  imageUrl?: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  title,
  subtitle,
  button,
  message,
  sections,
  imageUrl = siteIcon,
}) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "20px auto",
        backgroundColor: "#FFFFFF",
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        position: "relative",
      }}
    >
      {/* Header Section */}
      <div
        style={{
          backgroundColor: "#004225",
          color: "#FFFFFF",
          textAlign: "center",
          padding: "16px",
          borderRadius: "32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "16px",
          }}
        >
          <img
            src={imageUrl}
            alt="Heatmap Insights"
            style={{ width: "32px", height: "32px", borderRadius: "4px" }}
          />
          <h4 style={{ fontWeight: 600, marginLeft: "8px" }}>
            Heatmap Insights
          </h4>
        </div>

        <h1
          style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "8px" }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "16px",
            color: "rgba(255, 255, 255, 0.6)",
            marginBottom: "30px",
          }}
        >
          {subtitle}
        </p>

        <a
          href="#"
          style={{
            display: "inline-block",
            color: "#004225",
            fontWeight: 600,
            backgroundColor: "#90EE90",
            padding: "8px 16px",
            borderRadius: "4px",
            textDecoration: "none",
            marginTop: "16px",
            marginBottom: "24px",
          }}
        >
          {button}
        </a>

        {/* Orange Hills Image */}
        <img
          src={orangeHills}
          alt="Orange Hills"
          style={{
            position: "absolute",
            bottom: 0,
            left: isMobile ? "-50px" : "0",
            width: isMobile ? "160px" : "auto",
          }}
        />
      </div>

      {/* Message */}
      <div
        style={{ padding: "32px", backgroundColor: "#FFFFFF", width: "100%" }}
      >
        <h2 style={{ fontSize: "24px", fontWeight: 600, marginBottom: "16px" }}>
          {message}
        </h2>
        {/* Content Sections */}
        {sections.map((section, index) => (
          <div
            key={index}
            style={{
              marginTop: "24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0px",
            }}
          >
            <h3 style={{ fontSize: "16px", fontWeight: 600 }}>
              {section.heading}
            </h3>
            <span style={{ textAlign: "left", fontSize: "14px" }}>
              {section.score}
            </span>
            <ul
              style={{
                gridColumn: "span 2",
                listStylePosition: "inside",
                marginTop: "12px",
                color: "#4a4a4a",
              }}
            >
              {section.content.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Footer Button */}
      <div style={{ textAlign: "left", padding: "16px" }}>
        <a
          href="#"
          style={{
            display: "inline-block",
            color: "#123B24",
            fontWeight: 600,
            backgroundColor: "#90EE90",
            padding: "8px 16px",
            borderRadius: "4px",
            textDecoration: "none",
          }}
        >
          {button}
        </a>
      </div>
    </div>
  );
};

export default EmailTemplate;
