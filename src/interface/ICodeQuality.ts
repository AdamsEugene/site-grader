export interface ISiteAuditData {
  HTML: {
    "Structure and semantics": number;
    Accessibility: number;
    "Best practices": number;
    Compatibility: number;
    "SEO optimization": number;
  };
  CSS: {
    "Code quality": number;
    Responsiveness: number;
    "Browser compatibility": number;
    Performance: number;
    "Modern practices": number;
  };
  JavaScript: {
    "Code quality": number;
    Performance: number;
    "Modern practices": number;
    "Error handling": number;
    "Integration with HTML/CSS": number;
  };
  Overall: {
    Organization: number;
    Documentation: number;
    Consistency: number;
    "Version control": number;
    "Best practices": number;
  };
  Total: number;
  Summary: {
    Strengths: string[];
    "Areas for Improvement": string[];
    Recommendations: {
      description: string;
      before: string;
      after: string;
    }[];
  };
}

export interface ISiteAuditResponse {
  uploaded_at: string;
  data: {
    site_audit: ISiteAuditData[];
  };
  url: string;
  id: string;
}
