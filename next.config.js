/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        USER: process.env.USER,
        PASS: process.env.PASS,
      },
}

module.exports = nextConfig
