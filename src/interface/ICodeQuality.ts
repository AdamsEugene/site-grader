export interface ISiteAuditData {
  HTML: {
    StructureAndSemantics: number;
    Accessibility: number;
    BestPractices: number;
    Compatibility: number;
    SEOOptimization: number;
    Explanation: string;
    Improvement: string;
    CodeRecommendation: {
      OriginalCode: string;
      RecommendedCode: string;
      Explanation: string;
    }[];
    score: number;
  };
  CSS: {
    CodeQuality: number;
    Responsiveness: number;
    BrowserCompatibility: number;
    Performance: number;
    ModernPractices: number;
    Explanation: string;
    Improvement: string;
    CodeRecommendation: {
      OriginalCode: string;
      RecommendedCode: string;
      Explanation: string;
    }[];
    score: number;
  };
  JavaScript: {
    CodeQuality: number;
    Performance: number;
    ModernPractices: number;
    ErrorHandling: number;
    IntegrationWithHTMLCSS: number;
    Explanation: string;
    Improvement: string;
    CodeRecommendation: IRecommendation[];
    score: number;
  };
  Overall: {
    Organization: number;
    Documentation: number;
    Consistency: number;
    VersionControl: number;
    BestPractices: number;
    Explanation: string;
    Improvement: string;
    score: number;
  };
  Total: number;
  Summary: string;
}

export interface IRecommendation {
  OriginalCode: string;
  RecommendedCode: string;
  Explanation: string;
}

export interface ISiteAuditResponse {
  uploaded_at: string;
  data: {
    site_audit: ISiteAuditData;
  };
  url: string;
  id: string;
}
