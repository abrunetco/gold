import ogImageSrc from "@images/social.png";

export const SITE = {
  title: "صرافی جروقی",
  tagline: "خرید و فروش شمش و طلای آب شده",
  description:
    "صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی ",
  description_short:
    "صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی صرافی جروقی ",
  url: "https://g-gold.com",
  author: "Emil Gulamov",
};

export const SEO = {
  title: SITE.title,
  description: SITE.description,
  structuredData: {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: "en-US",
    "@id": SITE.url,
    url: SITE.url,
    name: SITE.title,
    description: SITE.description,
    isPartOf: {
      "@type": "WebSite",
      url: SITE.url,
      name: SITE.title,
      description: SITE.description,
    },
  },
};

export const OG = {
  locale: "en_US",
  type: "website",
  url: SITE.url,
  title: `${SITE.title}: ${SITE.tagline}`,
  description: SITE.description,
  image: ogImageSrc,
};
