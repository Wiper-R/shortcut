/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: { styledComponents: true },
  async redirects() {
    return [
      { source: "/dashboard", destination: "/dashboard/links", permanent: true },
    ];
  },
};

module.exports = nextConfig;
