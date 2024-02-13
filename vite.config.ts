import autoprefixer from 'autoprefixer';
import react from '@vitejs/plugin-react-swc';
import {
    ManifestOptions,
    VitePWA,
} from 'vite-plugin-pwa';
import {
    UserConfigExport,
    defineConfig,
} from 'vite';

const assets: string[] = [
    'apple-touch-icon.png',
    'favicon.ico',
    'pwa-512x512.png',
];

const manifest: Partial<ManifestOptions> = {
    background_color: '#1b2635',
    description: '',
    dir: 'ltr',
    display: 'standalone',
    lang: 'en',
    name: 'vite',
    orientation: 'any',
    scope: '/',
    short_name: 'vite',
    start_url: '/',
    theme_color: '#1b2635',
    categories: [],
    icons: [
        {
            purpose: 'any',
            sizes: '192x192',
            src: '/icons/pwa-192x192.png',
            type: 'image/png',
        }, {
            purpose: 'any',
            sizes: '512x512',
            src: '/icons/pwa-512x512.png',
            type: 'image/png',
        }, {
            purpose: 'any maskable',
            sizes: '512x512',
            src: '/icons/pwa-512x512.png',
            type: 'image/png',
        },
    ],
    screenshots: [],
};

const vite: UserConfigExport = defineConfig({
    appType: 'spa',
    base: '/',
    envDir: '.',
    envPrefix: 'VITE_',
    logLevel: 'info',
    publicDir: 'public',
    root: process.cwd(),
    plugins: [
        VitePWA({
            manifest,
            registerType: 'autoUpdate',
            includeAssets: assets,
        }),
        react(),
    ],
    build: {
        manifest: true,
        outDir: 'dist',
        sourcemap: 'hidden',
    },
    css: {
        postcss: {
            plugins: [
                autoprefixer,
            ],
        },
    },
    preview: {
        port: 3001,
    },
    server: {
        port: 3000,
    },
});

export default vite;
