import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      // ts-jest specific configurations
      tsconfig: 'tsconfig.json'
    }],
  },
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/setup.ts']
};

export default config;
