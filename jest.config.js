module.exports = {
  transform: {
    "^.+\\.tsx?$": "ts-jest"
  },
  testMatch: ["<rootDir>/__tests__/**/*.test.ts"],
  collectCoverage: true,
  testEnvironment: "node",
  // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
};
