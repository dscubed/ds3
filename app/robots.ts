import type { MetadataRoute } from 'next'

const baseURL = 'https://' + process.env.DOMAIN_URL || 'localhost:3000'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/',
      },
      {
        userAgent: [
          'Applebot',
          'Bingbot', 
          'Googlebot',
          'Slurp',
          'DuckDuckBot',
          'Baiduspider',
          'facebot',
          'facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)',
          'facebookexternalhit/1.1',
          'facebookcatalog/1.0',
          'Twitterbot',
        ],
        allow: ['/'],
        disallow: [
          '/admin',
          '/admin/',
          '/auth/',
          '/sponsors/logos/',
        ],
      }
    ],
    sitemap: baseURL + '/sitemap.xml',
  }
}