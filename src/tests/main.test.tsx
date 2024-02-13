import '@testing-library/jest-dom';
import {
    describe,
    expect,
    test,
} from 'vitest';
import {
    render,
    screen,
} from '@testing-library/react';

import Display from '../layouts/Display';

import Home from '../pages/Home';

import Error from '../pages/statuses/Error';
import Fallback from '../pages/statuses/Fallback';
import NotFound from '../pages/statuses/NotFound';

describe('Render', () => {
    screen.debug();

    describe('Layouts', () => {
        test('Display', () => {
            render(<Display />);
            expect(document.body).toBeInTheDocument();
        });
    });

    describe('Pages', () => {
        test('Home', () => {
            render(<Home />);
            expect(document.body).toBeInTheDocument();
        });
    });

    describe('Statuses', () => {
        test('Error', () => {
            render(<Error />);
            expect(document.body).toBeInTheDocument();
        });

        test('Fallback', () => {
            render(<Fallback />);
            expect(document.body).toBeInTheDocument();
        });

        test('NotFound', () => {
            render(<NotFound />);
            expect(document.body).toBeInTheDocument();
        });
    });
});
