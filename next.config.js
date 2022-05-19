const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
  env: {
    BASE_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3001"
        : "https://pw2022-v2-back-end.herokuapp.com",
  },
});
