import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'https://whatchat-xbg2.onrender.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
                secure: false
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@assets': resolve(__dirname, 'public/assets')
        }
    }
});