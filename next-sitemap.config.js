/** @type {import('next-sitemap').IConfig} */

const excludedRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password',
  '/learn',
  '/learn/exams',
  '/learn/knowledge-base',
  '/learn/ai-assistant',
  '/learn/modules',
  '/learn/projects',
  '/learn/user-profile/personal-data',
  '/learn/user-profile/security-settings',
  '/mentor/students',
  '/mentor/modules',
];

const config = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: excludedRoutes,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: excludedRoutes,
        allow: '/',
      },
    ],
  },
  transform: async (_, path) => {
    const customSettings = {
      '/': { priority: 1.0, changefreq: 'weekly' },
      '/learn': { priority: 0.9, changefreq: 'daily' },
      '/mentor': { priority: 0.8, changefreq: 'daily' },
    };

    return {
      loc: path,
      changefreq: customSettings[path]?.changefreq || 'weekly',
      priority: customSettings[path]?.priority || 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};

module.exports = config;
