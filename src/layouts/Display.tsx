import React from 'react';
import { Outlet } from 'react-router-dom';

import Footer from '../components/modules/Footer';
import Navbar from '../components/modules/Navbar';

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
