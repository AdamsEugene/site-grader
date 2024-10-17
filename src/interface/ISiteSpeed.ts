export interface IPSI_Metrics {
  largestContentfulPaint: {
    speed: "Slow" | "Average" | "Fast" | "Unknown";
    value: number;
  };
  totalBlockingTime: {
    speed: "Slow" | "Average" | "Fast" | "Unknown";
    value: number;
  };
  timeToFirstByte: {
    speed: "Slow" | "Average" | "Fast" | "Unknown";
    value: number;
  };
  firstContentfulPaint: {
    speed: "Slow" | "Average" | "Fast" | "Unknown";
    value: number;
  };
  cumulativeLayoutShift: {
    speed: "Slow" | "Average" | "Fast" | "Unknown";
    value: number;
  };
  timeToInteractive: {
    speed: "Slow" | "Average" | "Fast" | "Unknown";
    value: number;
  };
  speedIndex: {
    speed: "Slow" | "Average" | "Fast" | "Unknown";
    value: number;
  };
  speedPercentage: {
    value: number;
    speed: "Slow" | "Average" | "Fast" | "Unknown";
  };
}

export interface IRecommendation {
  title: string;
  recommendation: string;
  category: string;
}

export interface IPSIDataResponse {
  uploaded_at: string;
  data: {
    psi_metrics: IPSI_Metrics;
    recommendations: IRecommendation[];
  };
  url: string;
  id: string;
}
