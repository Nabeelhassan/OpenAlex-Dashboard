/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',  
                hostname: 'static.openalex.org',
            },
            {
                protocol: 'https',
                hostname: 'commons.wikimedia.org',
            },
            {
                protocol: 'https',
                hostname: 'upload.wikimedia.org',
            },
        ],
    },
};

module.exports = nextConfig;
