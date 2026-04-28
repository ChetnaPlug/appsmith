import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env.NODE_ENV': '"production"'
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: false,
    lib: false,
    rollupOptions: {
      input: {
        'datepicker-bundle': 'components/DatePicker.jsx',
        'fileupload-bundle': 'components/FileUpload.jsx',
        'loanbadge-bundle': 'components/LoanBadge.jsx'
      },
      output: {
        dir: 'dist',
        format: 'umd',
        entryFileNames: '[name].js',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        },
        exports: 'default'
      },
      external: ['react', 'react-dom']
    }
  }
});