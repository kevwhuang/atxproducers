import { type ManifestOptions, type VitePWAOptions, VitePWA as vitePWA } from 'vite-plugin-pwa';
import autoprefixer from 'autoprefixer';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

const manifest: Partial<ManifestOptions> = {
    background_color: '#000000',
    description: 'Welcome to the home of Austin\'s best music producers.',
    display: 'standalone',
    icons: [
        {
            purpose: 'any',
            sizes: '192x192',
            src: '/icons/pwa-192x192.png/',
            type: 'image/png',
        }, {
            purpose: 'any',
            sizes: '512x512',
            src: '/icons/pwa-512x512.png/',
            type: 'image/png',
        }, {
            purpose: 'any maskable',
            sizes: '512x512',
            src: '/icons/pwa-512x512.png/',
            type: 'image/png',
        },
    ],
    name: 'Austin Producer Alliance',
    orientation: 'any',
    short_name: 'ATX Produers',
    theme_color: '#000000',
};

const pwa: Partial<VitePWAOptions> = {
    includeAssets: [
        'apple-touch-icon.png',
        'favicon.ico',
        'pwa-192x192.png',
        'pwa-512x512.png',
    ],
    manifest,
    registerType: 'autoUpdate',
};

const vite = defineConfig({
    appType: 'spa',
    build: {
        outDir: 'dist',
    },
    css: {
        postcss: {
            plugins: [autoprefixer],
        },
    },
    envPrefix: 'VITE_',
    plugins: [
        react(),
        vitePWA(pwa),
    ],
    publicDir: 'public',
    root: process.cwd(),
    server: {
        port: 3000,
    },
});

export default vite;
