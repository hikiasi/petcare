import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack: (config) => {
    // Исключаем supabase functions из сборки
    config.resolve.alias = {
      ...config.resolve.alias,
    };

    config.module.rules.push({
      test: /supabase\/functions/,
      loader: 'ignore-loader'
    });

    return config;
  },

  // Исключаем supabase functions из TypeScript проверки
  typescript: {
    ignoreBuildErrors: false,
  },

  // Исключаем файлы из сборки
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

export default nextConfig;
