import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/credit-scoring-widget.ts'),
      name: 'CreditScoringWidget',
      fileName: 'credit-scoring-widget',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
  },
});
