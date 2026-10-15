import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "leonors.com", pathname: "/wp-content/**" },
      { protocol: "https", hostname: "d1yei2z3i6k35z.cloudfront.net", pathname: "/**" },
    ],
  },
  async redirects() {
    return [
      {
        // Same slug as the current Systeme.io page. Never change this.
        source: "/",
        destination: "/functionaldessertsprogram-main",
        permanent: true,
      },
    ];
  },
  async headers() {
    // Content Security Policy. 'unsafe-inline' for scripts is required by the
    // Next.js runtime, GTM and the Meta Pixel on a statically prerendered page
    // (no per-request nonce). The page renders no user-generated HTML.
    const csp = [
      "default-src 'self'",
      "base-uri 'self'",
      "object-src 'none'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      // 'unsafe-eval' only in development: React dev tools need it. Never in production.
      `script-src 'self' 'unsafe-inline'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://connect.facebook.net`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "font-src 'self' data:",
      "media-src 'self' blob:",
      "frame-src https://www.youtube-nocookie.com https://player.vimeo.com https://www.googletagmanager.com",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.facebook.com https://connect.facebook.net",
      "upgrade-insecure-requests",
    ].join("; ");

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: csp },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
      {
        source: "/api/(.*)",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
    ];
  },
};

export default nextConfig;
