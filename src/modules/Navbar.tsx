import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.webp';

import '../styles/modules/Navbar.scss';

function Navbar(): React.ReactElement {
    return (
        <nav className="navbar">
            <Link className="navbar__logo" to="/">
                <img src={logo} alt="Logo" />
            </Link>
            <div className="navbar__pages">
                <Link to="/">Home</Link>
                <Link to="about">About</Link>
                <Link to="producers">Producers</Link>
                <Link to="events">Events</Link>
                <Link to="live">Live</Link>
            </div>
        </nav>
    );
}

export default Navbar;
