import React from 'react';
import { Link } from 'react-router-dom';

import { Divide as Hamburger } from 'hamburger-react';

import logo from '../assets/images/logo.png';

import '../styles/modules/Navbar.scss';

function Navbar(): React.ReactElement {
    const [open, setOpen] = React.useState(false);

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
            <div className="navbar__hamburger">
                <Hamburger
                    toggled={open}
                    rounded
                    label="Menu"
                    toggle={setOpen}
                />
            </div>
            {open &&
                <div className="navbar__pages--mobile">
                    <Link to="/">Home</Link>
                    <Link to="about">About</Link>
                    <Link to="producers">Producers</Link>
                    <Link to="events">Events</Link>
                    <Link to="live">Live</Link>
                </div>
            }
        </nav>
    );
}

export default Navbar;
