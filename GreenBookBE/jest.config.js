/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    testMatch: ["<rootDir>/src/**/**/*.test.ts", "<rootDir>/src/**/*.test.tsx"],
    preset: "ts-jest",
    testEnvironment: "node",
    // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
};