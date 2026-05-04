module.exports = {
  testEnvironment: "jsdom",
  collectCoverageFrom: ["src/app.js"],
  coverageDirectory: "coverage",
  testMatch: ["**/src/__tests__/**/*.test.js", "**/src/__tests__/**/*.test.jsx"]
};
