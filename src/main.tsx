import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom/client';

import About from './pages/About';
import Display from './layouts/Display';
import Error from './pages/Error';
import Events from './pages/Events';
import Home from './pages/Home';
import Live from './pages/Live';
import Producers from './pages/Producers';
import Unknown from './pages/Unknown';

import './styles/rectify.scss';
import './styles/main.scss';
import './styles/media.scss';
import './styles/tablet.scss';
import './styles/mobile.scss';
import './styles/keyframes.scss';
import './styles/dev.scss';

const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<Display />} errorElement={<Error />} path="">
        <Route element={<About />} path="about" />
        <Route element={<Error />} path="error" />
        <Route element={<Events />} path="events" />
        <Route element={<Home />} index />
        <Route element={<Live />} path="live" />
        <Route element={<Producers />} path="producers" />
        <Route element={<Unknown />} path="*" />
    </Route>,
));

ReactDOM.createRoot(document.getElementById('main')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
