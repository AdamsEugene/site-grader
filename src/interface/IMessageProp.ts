export default interface IMessageProp {
  id?: string;
  url?: string;
  email?: string | null;
  process_stage?: string;
  status?: string;
  timestamp?: string;
  notes?: string | null;
  ai_insight_s3_uri?: string;
  screenshot_s3_uri?: string;
  cnn_s3_uri?: string;
  site_speed_s3_uri?: string;
  site_audit_s3_uri?: string;
}
