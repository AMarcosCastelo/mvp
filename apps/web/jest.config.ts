import type { Config } from 'jest';
import jestConfig from '../../jest.config';

const config: Config = {
  ...jestConfig,
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  testEnvironment: 'jsdom',
};

export default config;
