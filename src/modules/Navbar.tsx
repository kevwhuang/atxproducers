import React from 'react';
import { Link } from 'react-router-dom';

import { Divide as Hamburger } from 'hamburger-react';

import logo from '../assets/logo.png';

import '../styles/modules/Navbar.scss';

function Navbar(): React.ReactElement {
    const [open, setOpen] = React.useState(false);

    return (
        <nav className="navbar">
            <Link
                className="navbar__logo"
                to="/"
                onClick={() => setOpen(false)}
            >
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
                    <Link to="/" onClick={() => setOpen(false)}>Home</Link>
                    <Link to="about" onClick={() => setOpen(false)}>About</Link>
                    <Link to="producers" onClick={() => setOpen(false)}>Producers</Link>
                    <Link to="events" onClick={() => setOpen(false)}>Events</Link>
                    <Link to="live" onClick={() => setOpen(false)}>Live</Link>
                </div>
            }
        </nav>
    );
}

export default Navbar;
