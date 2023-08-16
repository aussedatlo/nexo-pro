// jest.config.js

require('dotenv').config();

module.exports = {
  rootDir: './',
  globals: {
    __DEV__: true,
    __PROD__: false,
  },
  testEnvironment: 'node',
  preset: 'ts-jest',
  verbose: true, // report individual test
  bail: false, // enable to stop test when an error occur,
  detectOpenHandles: false,
  moduleDirectories: ['node_modules', 'src', 'test'],
  testMatch:
    process.env.APIKEY && process.env.APISECRET
      ? ['**/tests/**/*.test.ts']
      : ['**/tests/regular/*.test.ts'],
  coveragePathIgnorePatterns: ['src/index.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  coverageThreshold: {
    // coverage strategy
    global: {
      branches: 80,
      functions: 80,
      lines: 50,
      statements: -10,
    },
  },
};
