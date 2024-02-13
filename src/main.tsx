import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    Navigate,
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import { SWRConfig } from 'swr';

import Display from './layouts/Display';

import Home from './pages/Home';

import Error from './pages/statuses/Error';
import Fallback from './pages/statuses/Fallback';
import NotFound from './pages/statuses/NotFound';

import './styles/rectify.scss';
import './styles/root.scss';
import './styles/main.scss';
import './styles/utilities.scss';
import './styles/keyframes.scss';
import './styles/media/media.scss';

if (navigator.userAgent.search(/Macintosh|Windows NT/) === -1) {
    import('./styles/media/mobile.scss');
}

interface Config { }

const config: Config = {};

const router: any = createBrowserRouter(createRoutesFromElements(
    <Route path="" element={<Display />} errorElement={<Error />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="home" element={<Navigate to="/" replace={true} />} />
    </Route>
));

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <SWRConfig value={config}>
            <RouterProvider router={router} fallbackElement={<Fallback />} />
        </SWRConfig>
    </React.StrictMode>
);
