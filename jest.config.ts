export default {
  preset: "ts-jest", // Use ts-jest for TypeScript support
  testEnvironment: "node", // Use Node.js environment
  testMatch: ["**/test/**/*.test.ts"], // Adjust to your test file location
  moduleFileExtensions: ["ts", "js"], // Supported file extensions
  verbose: true, // Display individual test results
};
