import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.webp';

import '../styles/modules/Navbar.scss';

function Navbar(): React.ReactElement {
    return (
        <nav className="navbar">
            <img src={logo} alt="Logo" />
            <div className="navbar__pages">
                <Link to="/">Home</Link>
                <Link to="producers">Producers</Link>
                <Link to="live">Live</Link>
            </div>
        </nav>
    );
}

export default Navbar;
