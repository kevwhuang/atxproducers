import {
    configDefaults,
    defineConfig,
    type UserConfigExport,
} from 'vitest/config';

const vitest: UserConfigExport = defineConfig({
    test: {
        globals: true,
        watch: true,
        environment: 'jsdom',
        reporters: 'verbose',
        setupFiles: '',
        exclude: [...configDefaults.exclude],
        include: [...configDefaults.include],
    },
});

export default vitest;
