import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  esbuild: {
    jsx: 'transform',
  },
});
