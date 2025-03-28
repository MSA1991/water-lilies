export const loader = () => {
  const content = `
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
    <loc>https://nymphaea.shop/</loc>
    <lastmod>2025-03-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    </url>
    </urlset>
    `;

  return new Response(content, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
