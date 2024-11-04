interface SiteUrlProps {
  siteUrl: string | null;
}

export default function SiteUrl({ siteUrl }: SiteUrlProps) {
  return (
    <div className="rounded-lg shadow border p-4 divide-y w-full">
      <p>{siteUrl || "No URL available"}</p>
    </div>
  );
}
