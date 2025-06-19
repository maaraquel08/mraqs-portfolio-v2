/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
            "i.imgur.com",
            "qlvb7icylt05jsqd.public.blob.vercel-storage.com",
        ],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
