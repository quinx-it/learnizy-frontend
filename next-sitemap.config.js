/** @type {import('next-sitemap').IConfig} */

const publicRoutes = ['/', '/login', '/register', '/forgot-password', '/reset-password'];
const staticUserRoutes = [
  '/learn',
  '/learn/exams',
  '/learn/knowledge-base',
  '/learn/ai-assistant',
  '/learn/modules',
  '/learn/projects',
  '/learn/user-profile/personal-data',
  '/learn/user-profile/security-settings',
];
const staticMentorRoutes = ['/mentor/students', '/mentor/modules'];

const config = {
  siteUrl: process.env.NEXT_PUBLIC_BASE_URL,
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: [...publicRoutes.filter((r) => r !== '/'), ...staticUserRoutes, ...staticMentorRoutes],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        disallow: [
          ...publicRoutes.filter((r) => r !== '/'),
          ...staticUserRoutes,
          ...staticMentorRoutes,
        ],
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

    if (customSettings[path]) {
      return {
        loc: path,
        changefreq: customSettings[path].changefreq,
        priority: customSettings[path].priority,
        lastmod: new Date().toISOString(),
      };
    }

    return {
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};

module.exports = config;
