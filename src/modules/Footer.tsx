import React from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

import '../styles/modules/Footer.scss';

function Footer(): React.ReactElement {
    return (
        <footer className="footer">
            <p>© 2024 ATX Producers</p>
            <p>atxproducers@gmail.com</p>
            <div className="footer__socials">
                <a href="https://instagram.com/atxproducers" target="_blank">
                    <InstagramIcon />
                </a>
                <a href="https://github.com/kevwhuang/atxproducers" target="_blank">
                    <GitHubIcon />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
