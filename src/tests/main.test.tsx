import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import {
    describe,
    expect,
    test,
} from 'vitest';
import { render } from '@testing-library/react';

import Display from '../layouts/Display';

describe('Render', () => {
    describe('Layouts', () => {
        test('Display', () => {
            render(<MemoryRouter><Display /></MemoryRouter>);
            expect(document.body).toBeInTheDocument();
        });
    });
});
