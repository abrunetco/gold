// An array of links for navigation bar
const navBarLinks = [
  { name: "خانه", url: "/" },
  { name: "محصولات", url: "/products" },
  { name: "خدمات", url: "/services" },
  // { name: "Blog", url: "/blog" },
  { name: "تماس", url: "/contact" },
];
// An array of links for footer
const footerLinks = [
  // {
  //   section: "Ecosystem",
  //   links: [
  //     { name: "Documentation", url: "/welcome-to-docs/" },
  //     { name: "Tools & Equipment", url: "/products" },
  //     { name: "Construction Services", url: "/services" },
  //   ],
  // },
  {
    section: "صرافی",
    links: [
      { name: "درباره ما", url: "#" },
      // { name: "Blog", url: "/blog" },
      // { name: "Customers", url: "#" },
    ],
  },
];
// An object of links for social icons
const socialLinks = {
  facebook: "https://www.facebook.com/",
  x: "https://twitter.com/",
  // github: "https://github.com/mearashadowfax/ScrewFast",
  // google: "https://www.google.com/",
  // slack: "https://slack.com/",
};

export default {
  navBarLinks,
  footerLinks,
  socialLinks,
};
