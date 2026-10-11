import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// Custom plugin to serve assets directory statically with proper headers and MIME types
function serveAssetsPlugin() {
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.webp': 'image/webp',
    '.cur': 'image/x-icon',
    '.mp4': 'video/mp4',
    '.glb': 'model/gltf-binary',
    '.gltf': 'model/gltf+json',
    '.json': 'application/json',
  };

  return {
    name: 'serve-assets',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const decodedUrl = decodeURIComponent(req.url.split('?')[0]);
        if (decodedUrl.startsWith('/assets/')) {
          const filePath = path.join(process.cwd(), decodedUrl);
          if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
            const stat = fs.statSync(filePath);
            const ext = path.extname(filePath).toLowerCase();
            const contentType = mimeTypes[ext] || 'application/octet-stream';
            res.setHeader('Content-Type', contentType);
            res.setHeader('Content-Length', stat.size);
            res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
            fs.createReadStream(filePath).pipe(res);
            return;
          }
        }
        next();
      });
    },
  };
}

// Build plugin to copy assets to dist/assets so all frames, models, and images exist in production
function copyAssetsPlugin() {
  return {
    name: 'copy-assets-to-dist',
    closeBundle() {
      const srcDir = path.resolve(__dirname, 'assets');
      const destDir = path.resolve(__dirname, 'dist/assets');
      if (fs.existsSync(srcDir)) {
        console.log('[build] Copying static assets to dist/assets...');
        fs.cpSync(srcDir, destDir, {
          recursive: true,
          filter: (src) => {
            const ext = path.extname(src).toLowerCase();
            return ext !== '.mp4' && ext !== '.zip'; // Skip unused raw mp4 and zip files to save bandwidth & build size
          },
        });
        console.log('[build] Static assets copied successfully!');
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), serveAssetsPlugin(), copyAssetsPlugin()],
  server: {
    port: 3000,
    open: false,
    host: true,
    watch: {
      ignored: [
        '**/assets/**',
        '**/node_modules/**',
        '**/*.zip',
        '**/*.mp4',
        '**/*.glb',
      ],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
