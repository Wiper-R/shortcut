/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [{
            protocol: "https",
            hostname: "api.faviconkit.com"
        }]
    }
};

module.exports = nextConfig;
