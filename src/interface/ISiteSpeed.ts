export interface IPSI_Metrics {
  largestContentfulPaint: {
    speed: string;
    value: number;
  };
  totalBlockingTime: {
    speed: string;
    value: number;
  };
  timeToFirstByte: {
    speed: string;
    value: number;
  };
  firstContentfulPaint: {
    speed: string;
    value: number;
  };
  cumulativeLayoutShift: {
    speed: string;
    value: number;
  };
  timeToInteractive: {
    speed: string;
    value: number;
  };
  speedIndex: {
    speed: string;
    value: number;
  };
  speedPercentage: {
    value: number;
    speed: string;
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
