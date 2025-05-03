/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            // لوکال هاست برای توسعه
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '5000',
                pathname: '/uploads/**',
            },
            // دامنه پروداکشن (مثلاً yourdomain.com)
            {
                protocol: 'https',
                hostname: 'api.amjadec.com', // ← دامنه واقعی خودتو بذار
                pathname: '/uploads/**',
            },
        ],
    },
}

export default nextConfig
