/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://sayed3040.sobhoy.com', "sheakh-bucket-express.s3.eu-north-1.amazonaws.com", "bucket-audio-book.s3.eu-central-1.amazonaws.com"], // Add the domain(s) where your images are hosted
  },
};

export default nextConfig;