import { notFound } from "next/navigation";
import { Metadata } from "next";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/index";

interface PageProps {
  params: { shortId: string }; // Explicitly define the params type
}

// Generate metadata dynamically based on the shortId
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { shortId } = params;
  const docRef = doc(db, "urls", shortId);
  const docSnap = await getDoc(docRef);

  return {
    title: docSnap.exists() ? "Redirecting..." : "Not Found",
  };
}

export default async function RedirectPage({ params }: PageProps) {
  const { shortId } = params;

  // Fetch the corresponding long URL from Firestore
  const docRef = doc(db, "urls", shortId);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    notFound(); // Redirect to a 404 page if the shortId is not found
  }

  const longUrl = docSnap.data()?.longUrl;

  if (typeof window !== "undefined" && longUrl) {
    window.location.href = longUrl; // Redirect to the long URL
  }

  return (
    <div>
      <p>Redirecting to {longUrl}...</p>
    </div>
  );
}
