import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const coreSource = fileURLToPath(new URL('./packages/core/src/index.ts', import.meta.url));
const tierExcludes = ['**/node_modules/**', '**/dist/**'];

export default defineConfig({
  test: {
    coverage: {
      include: ['packages/*/src/**'],
    },
    projects: [
      {
        resolve: { alias: { '@patch-steward/core': coreSource } },
        test: {
          name: 'unit',
          include: ['packages/*/src/**/*.test.ts'],
          exclude: [...tierExcludes, '**/*.fixture.test.ts', '**/*.container.test.ts', '**/*.live.test.ts'],
        },
      },
      {
        resolve: { alias: { '@patch-steward/core': coreSource } },
        test: {
          name: 'fixture',
          include: ['packages/*/src/**/*.fixture.test.ts'],
          exclude: tierExcludes,
        },
      },
    ],
  },
});
