module.exports = {
    verbose: true,
    roots: ['<rootDir>/src'],
    collectCoverageFrom: [
        'src/**/*.{js,jsx,ts,tsx}'
    ],
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testMatch: [
        '<rootDir>/src/**/__tests__/**/*.{spec,test}.{js,jsx,ts,tsx}',
        '<rootDir>/src/**/*.{spec, test}.{js,jsx,ts,tsx}'
    ],
    testEnvironment: 'jsdom',
    preset: 'ts-jest',
    transform: {
        '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
        '\\.ts$': ['ts-jest'],
        '^.+\\.(js|jsx)$': 'babel-jest'
    },
    transformIgnorePatterns: ['^.+\\.module\\.(css|sass|scss)'],
    moduleFileExtensions: [
        'js',
        'ts',
        'tsx',
        'jsx',
        'node'
    ],
    resetMocks: true
}