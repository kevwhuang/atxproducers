import { eslint } from '@aephonics/config';

const ignores = [
    '',
];

const globals = [
    'ZustandActions',
    'ZustandState',
];

const overrides = [
    {
        files: [''],
        rules: {},
    },
];

ignores.forEach(e => eslint[0].ignores.push(e));
globals.forEach(e => (eslint[0].languageOptions.globals[e] = true));
overrides.forEach(e => eslint.push(e));

export default eslint;
