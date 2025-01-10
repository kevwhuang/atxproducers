import { Outlet } from 'react-router-dom';
import React from 'react';

import Footer from '../modules/Footer';
import Navbar from '../modules/Navbar';

function Display(): React.ReactElement {
    return (
        <>
            <Navbar />
            <Outlet />
            <Footer />
        </>
    );
}

export default Display;
