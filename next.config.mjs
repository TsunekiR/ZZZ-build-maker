/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'act-webstatic.hoyoverse.com',
            port: '',
            pathname: '/**',
            search: '',
          },
          {
            protocol: 'https',
            hostname: 'upload-os-bbs.hoyolab.com',
            port: '',
            pathname: '/**',
            search: '',
          },
        ],
      },
};

export default nextConfig;
