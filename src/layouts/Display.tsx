import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Outlet } from 'react-router-dom';

import Footer from '../modules/Footer';
import Navbar from '../modules/Navbar';

function Display(): React.ReactElement {
    return (
        <div id="display">
            <HelmetProvider>
                <Navbar />
                <Outlet />
                <Footer />
            </HelmetProvider>
        </div>
    );
}

export default Display;
