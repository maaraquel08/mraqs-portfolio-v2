import fs from "fs";
import path from "path";
import { cache } from "react"; // Import Next.js cache

// Define path constant
const POSTS_PATH = path.join(process.cwd(), "app", "blog", "posts");

interface PostMetadata {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
}

export interface Post {
    metadata: PostMetadata;
    slug: string;
    content: string;
}

// Parses frontmatter and content from a file string
// Throws error if frontmatter is invalid or missing
function parseFrontmatter(
    fileContent: string,
    filePath: string
): { metadata: PostMetadata; content: string } {
    let frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    let match = frontmatterRegex.exec(fileContent);

    if (!match || !match[1]) {
        throw new Error(
            `Invalid or missing frontmatter in file: ${path.basename(filePath)}`
        );
    }

    const frontMatterBlock = match[1];
    const content = fileContent.replace(frontmatterRegex, "").trim();
    const frontMatterLines = frontMatterBlock.trim().split("\n");
    const metadata: Partial<PostMetadata> = {};

    frontMatterLines.forEach((line) => {
        const [key, ...valueArr] = line.split(": ");
        if (key && valueArr.length > 0) {
            const value = valueArr
                .join(": ")
                .trim()
                .replace(/^['"](.*)['"]$/, "$1");
            metadata[key.trim() as keyof PostMetadata] = value;
        }
    });

    // Basic validation for required fields (optional but recommended)
    if (!metadata.title || !metadata.publishedAt || !metadata.summary) {
        throw new Error(
            `Missing required metadata (title, publishedAt, summary) in file: ${path.basename(
                filePath
            )}`
        );
    }

    return { metadata: metadata as PostMetadata, content };
}

// Gets list of MDX files in a directory
// Throws error if directory reading fails
function getMDXFiles(dir: string): string[] {
    try {
        return fs
            .readdirSync(dir)
            .filter((file) => path.extname(file) === ".mdx");
    } catch (error: any) {
        // Throw a more informative error
        throw new Error(
            `Failed to read directory: ${dir}. ${error.message || error}`
        );
    }
}

// Reads and parses a single MDX file
// Throws error if file reading or parsing fails
function readMDXFile(filePath: string): {
    metadata: PostMetadata;
    content: string;
} {
    try {
        const rawContent = fs.readFileSync(filePath, "utf-8");
        return parseFrontmatter(rawContent, filePath); // Pass filePath for better error messages
    } catch (error: any) {
        // Re-throw error, potentially adding context
        throw new Error(
            `Failed to read or parse MDX file: ${path.basename(
                filePath
            )}. Reason: ${error.message || error}`,
            { cause: error }
        );
    }
}

// Cached function to get all blog posts
// Skips and warns about files that fail to process
export const getAllBlogPosts = cache((): Post[] => {
    console.log(`Reading posts from: ${POSTS_PATH}`);
    let mdxFiles: string[];
    try {
        mdxFiles = getMDXFiles(POSTS_PATH);
    } catch (error) {
        console.error("Error reading posts directory:", error);
        return []; // Return empty if we can't even read the directory
    }

    const postsData = mdxFiles.map((file) => {
        const filePath = path.join(POSTS_PATH, file);
        try {
            const { metadata, content } = readMDXFile(filePath);
            const slug = path.basename(file, path.extname(file));
            return { metadata, slug, content };
        } catch (error) {
            // Log a warning and skip this file
            console.warn(
                `Skipping post file due to error: ${file}. Error: ${
                    error instanceof Error ? error.message : error
                }`
            );
            return null; // Mark for filtering
        }
    });

    // Filter out any posts that failed to parse
    const validPosts = postsData.filter((post): post is Post => post !== null);
    console.log(
        `Successfully loaded ${validPosts.length} out of ${mdxFiles.length} post files.`
    );
    return validPosts;
});

// Function to get sorted posts (uses cached getAllBlogPosts)
export function getSortedBlogPosts(): Post[] {
    return getAllBlogPosts().sort(
        (a, b) =>
            new Date(b.metadata.publishedAt).getTime() -
            new Date(a.metadata.publishedAt).getTime()
    );
}

// Function to get a single post by slug (uses cached getAllBlogPosts)
export function getPostBySlug(slug: string): Post | undefined {
    return getAllBlogPosts().find((post) => post.slug === slug);
}

// Keep formatDate as is
export function formatDate(date: string, includeRelative = false) {
    let currentDate = new Date();
    let targetDate: Date; // Declare targetDate here

    // Ensure date string is in a format Date can parse reliably, ISO 8601 is good
    if (!date.includes("T") && !isNaN(Date.parse(date))) {
        // Handle simple date string like 'YYYY-MM-DD'
        targetDate = new Date(`${date}T00:00:00Z`); // Assume UTC if no time specified
    } else {
        targetDate = new Date(date);
    }

    // Check if targetDate is valid
    if (isNaN(targetDate.getTime())) {
        console.warn(`Invalid date format encountered: ${date}`);
        return "Invalid Date"; // Return a placeholder or throw an error
    }

    let yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    let monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    let daysAgo = currentDate.getDate() - targetDate.getDate();

    // Adjust monthsAgo and yearsAgo if the current date is earlier in the year/month
    if (daysAgo < 0) {
        monthsAgo -= 1;
        // No need to adjust daysAgo calculation further for relative string
    }
    if (monthsAgo < 0) {
        yearsAgo -= 1;
        monthsAgo += 12;
    }

    let formattedDate = "";

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
    } else {
        formattedDate = "Today";
    }

    let fullDate = targetDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "UTC", // Specify timezone if assuming UTC
    });

    if (!includeRelative) {
        return fullDate;
    }

    return `${fullDate} (${formattedDate})`;
}
