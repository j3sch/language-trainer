// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require("next-translate-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = nextTranslate(nextConfig);
