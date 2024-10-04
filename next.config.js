/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "colorful-wolverine-465.convex.cloud",
				port: "",
				pathname: "/api/storage/**",
			},
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
				pathname: "/f/**",
			},
		],
	},
};

module.exports = nextConfig;
