import { list } from "@vercel/blob";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");

        // List ALL blobs in the 'Hobbies' folder (no limit to get everything)
        const { blobs } = await list({
            prefix: "Hobbies/",
        });

        // Filter for image files and format the response
        const hobbyImages = blobs
            .filter((blob) => {
                const extension = blob.pathname.toLowerCase().split(".").pop();
                return ["jpg", "jpeg", "png", "webp", "gif"].includes(
                    extension || ""
                );
            })
            .map((blob, index) => ({
                id: blob.pathname,
                src: blob.url,
                alt: `Hobby image ${index + 1}`,
                title: extractTitleFromFilename(blob.pathname),
                description: "One of my favorite hobbies",
                uploadedAt: blob.uploadedAt,
            }))
            .sort(
                (a, b) =>
                    new Date(b.uploadedAt).getTime() -
                    new Date(a.uploadedAt).getTime()
            ); // Sort by newest first

        // Implement pagination on the sorted results
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedImages = hobbyImages.slice(startIndex, endIndex);
        const totalImages = hobbyImages.length;
        const hasMorePages = endIndex < totalImages;

        return NextResponse.json({
            images: paginatedImages,
            count: paginatedImages.length,
            total: totalImages,
            page,
            limit,
            hasMore: hasMorePages,
        });
    } catch (error) {
        console.error("Error fetching hobby images:", error);
        return NextResponse.json(
            { error: "Failed to fetch hobby images" },
            { status: 500 }
        );
    }
}

// Helper function to extract a readable title from filename
function extractTitleFromFilename(pathname: string): string {
    const filename = pathname.split("/").pop() || "";
    const nameWithoutExtension = filename.split(".")[0];

    // Convert filename to readable title
    // Remove common prefixes like 'DSC', 'IMG', etc.
    let title = nameWithoutExtension
        .replace(/^(DSC|IMG|Photo|Image)[\d\-_]*/i, "")
        .replace(/[\-_]/g, " ")
        .trim();

    // If title is empty or just numbers, use a generic title
    if (!title || /^\d+$/.test(title)) {
        title = "Hobby Moment";
    }

    // Capitalize first letter of each word
    title = title.replace(/\b\w/g, (l) => l.toUpperCase());

    return title || "Hobby Moment";
}
