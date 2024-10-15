export default interface IMessageProp {
  url?: string;
  id?: string;
  status?: string;
  timestamp?: string;
  process_stage?: string;
  ai_insight_s3_uri?: string;
  screenshot_s3_uri?: string;
  cnn_s3_uri?: string;
}
