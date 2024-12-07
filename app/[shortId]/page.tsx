import { Metadata } from "next";
import { notFound } from "next/navigation";

// Simulated database storage (replace with Firebase, Supabase, or MongoDB in production)
const database = new Map<string, string>();

interface PageProps {
  params: { shortId: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { shortId } = params;
  const longUrl = database.get(shortId);

  return {
    title: longUrl ? "Redirecting..." : "Not Found",
  };
}

export default function RedirectPage({ params }: PageProps) {
  const { shortId } = params;

  const longUrl = database.get(shortId);

  if (!longUrl) {
    notFound(); // Return 404 if the shortId is not found
  }

  if (typeof window !== "undefined") {
    window.location.href = longUrl;
  }

  return <p>Redirecting to {longUrl}...</p>;
}
