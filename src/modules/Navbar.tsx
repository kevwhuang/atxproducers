import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/modules/Navbar.scss';

function Navbar(): React.ReactElement {
    return (
        <nav className="navbar">
            <p>ATX PRODUCERS</p>
            <div className="navbar__pages">
                <Link to="/">Home</Link>
                <Link to="producers">Producers</Link>
                <Link to="live">Live</Link>
            </div>
        </nav>
    );
}

export default Navbar;
