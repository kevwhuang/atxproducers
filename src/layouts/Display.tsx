import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../modules/Footer';
import Navbar from '../modules/Navbar';

function Display(): React.ReactElement {
    return (
        <div id="display">
            <Navbar />
            <Outlet />
            <Footer />
        </div>
    );
}

export default Display;
