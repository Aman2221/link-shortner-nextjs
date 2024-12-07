import { nanoid } from "nanoid";
import { NextResponse } from "next/server";

// Simulated database storage (replace with Firebase, Supabase, or MongoDB in production)
const database = new Map<string, string>(); // Key: shortId, Value: longUrl

interface RequestBody {
    longUrl: string;
    customShortId?: string;
}

export async function POST(request: Request): Promise<NextResponse> {
    try {
        const { longUrl, customShortId }: RequestBody = await request.json();

        // Validate URL
        try {
            new URL(longUrl);
        } catch {
            return NextResponse.json({ message: "Invalid URL" }, { status: 400 });
        }

        // Use custom ID if provided, otherwise generate a new one
        const shortId = customShortId || nanoid(6);

        // Check if custom ID already exists
        if (customShortId && database.has(shortId)) {
            return NextResponse.json({ message: "Custom ID already in use" }, { status: 400 });
        }

        // Store in database
        database.set(shortId, longUrl);

        // Return the short URL
        const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${shortId}`;
        return NextResponse.json({ shortUrl }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}
