/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      esmExternals: "loose", // required to make Konva & react-konva work
    },
    webpack: (config) => {
      config.externals = [...config.externals, { canvas: "canvas" }];  // required to make Konva & react-konva work
      return config;
    },
    env: {
        USER: process.env.USER,
        PASS: process.env.PASS,
    },
}

module.exports = nextConfig
