import React from 'react';
import { Link } from 'react-router-dom';

import '../../styles/modules/Navbar.scss';

function Navbar(): React.ReactElement {
    return (
        <nav className="navbar">
            <Link to="/">Home</Link>
            <Link to="feedback">Feedback</Link>
            <Link to="producers">Producers</Link>
            <Link to="admins">Admins</Link>
        </nav>
    );
}

export default Navbar;
