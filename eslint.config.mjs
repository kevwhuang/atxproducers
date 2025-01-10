import { eslint } from '@aephonics/config';

const ignores = [
    '',
];

const globals = [
    '',
];

const overrides = [
    {
        files: ['**/*.{ts,tsx}'],
        ignores: [...ignores],
        rules: {
            'no-undef': 0,
        },
    },
];

ignores.forEach(e => eslint[0].ignores.push(e));
globals.forEach(e => (eslint[0].languageOptions.globals[e] = true));
overrides.forEach(e => eslint.push(e));

export default eslint;
