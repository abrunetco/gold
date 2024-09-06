// An array of links for navigation bar
const navBarLinks = [
  { name: "خانه", url: "/", icon: "home" },
  { name: "گالری", url: "/gallery" },
  // { name: "پنل کاربری", url: "/users" },
  // { name: "Blog", url: "/blog" },
  { name: "تماس", url: "/contact" },
];

// An array of links for user's side bar
const usersSideBarLinks = [
  { name: "پیشخوان", url: "/users/", icon: "home" },
  { name: "پروفایل", url: "/users/profile", icon: "home" },
  { name: "خرید ها", url: "/users/history", icon: "home" },
];

// An array of links for footer
const footerLinks = [
  {
    section: "پاورقی",
    links: [
      { name: "راهنمای خرید", url: "/insights/support" },
      { name: "شرایط بازگرداندن کالا", url: "/insights/return" },
      { name: "پرسش و پاسخ", url: "/faq" },
      { name: "قوانین و مقرارت", url: "/insights/terms" },
      { name: "مقالات", url: "/blog" },
      { name: "اصالت کالا", url: "/insights/originality" },
    ],
  },
  {
    section: "صرافی",
    links: [
      { name: "درباره ما", url: "/about" },
      { name: "پیگیری سفارش", url: "/services" },
      { name: "حساب کاربری من", url: "/users" },
      { name: "دعوت به همکاری", url: "/services" },
      { name: "تماس با ما", url: "/services" },
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
  usersSideBarLinks,
};
