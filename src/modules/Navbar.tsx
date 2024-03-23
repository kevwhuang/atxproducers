import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';

import '../styles/modules/Navbar.scss';

function Navbar(): React.ReactElement {
    return (
        <nav className="navbar">
            <img className="navbar__logo" src={logo} alt="Logo" />
            <div className="navbar__pages">
                <Link to="/">Home</Link>
                <Link to="producers">Producers</Link>
                <Link to="live">Live</Link>
            </div>
        </nav>
    );
}

export default Navbar;
