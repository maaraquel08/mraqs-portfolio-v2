/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["i.imgur.com"],
    },
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;
