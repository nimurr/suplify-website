/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['https://sayed3040.sobhoy.com', "sheakh-bucket-express.s3.eu-north-1.amazonaws.com", "bucket-audio-book.s3.eu-central-1.amazonaws.com" , 'www.questhealth.com' , "content.app-sources.com" , "www.scripps.org" , "cdn.shopify.com" , "bhmpc.com" , "png.pngtree.com" ], // Add the domain(s) where your images are hosted
  },
  transpilePackages: ['antd', '@ant-design'],
};

export default nextConfig;