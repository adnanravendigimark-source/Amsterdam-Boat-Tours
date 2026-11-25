/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    // sanitize-html loads htmlparser2, which is ESM-only. Keep it out of the
    // webpack bundle so Node (22.x, see package.json engines) loads it natively.
    serverComponentsExternalPackages: ["sanitize-html"],
    staleTimes: {
      dynamic: 0,
      static: 0,
    },
  },
  images: {
    // Only our own Vercel Blob stores. A wildcard host turned /_next/image into
    // an open proxy anyone could use to resize any image on our bill.
    remotePatterns: [{ protocol: "https", hostname: "*.public.blob.vercel-storage.com" }],
    // Next only serves WebP by default — AVIF is typically 20-30% smaller
    // than WebP for photographic tour/hero images, and next/image will
    // automatically fall back to WebP/original for browsers that don't
    // support AVIF. Free win on image payload with no visual change.
    formats: ["image/avif", "image/webp"],
  },
  // Basic hardening headers. The CSP covers framing, <base> and plugins only;
  // a script-src policy needs GA4 and Next's inline scripts tested first.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Never render inside another site's frame (clickjacking on /admin).
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Content-Security-Policy", value: "frame-ancestors 'none'; base-uri 'self'; object-src 'none'" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
