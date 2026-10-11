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

export default defineConfig({
  plugins: [react(), serveAssetsPlugin()],
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
