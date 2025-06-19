export interface HobbyImage {
    id: string;
    src: string;
    alt: string;
    title: string;
    description: string;
    uploadedAt: string;
}

export interface HobbyImagesResponse {
    images: HobbyImage[];
    count: number;
    total: number;
    page: number;
    limit: number;
    hasMore: boolean;
}
