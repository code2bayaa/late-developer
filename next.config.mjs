/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/models',
          outputPath: 'static/models',
        },
      },
    });

    return config;
  },
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['localhost','brianwekesa.netlify.app','late-developer.netlify.app'],
  },
};
export default nextConfig;