/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'apicxotv.techplusmedia.com',
                pathname: '/uploads/**', // allow all images in /uploads
            },
        ],
        formats: ['image/avif', 'image/webp'],
    },

    experimental: {
        // keep this empty — do NOT add unknown keys like isrMemoryCacheSize
    },
};

module.exports = nextConfig;
