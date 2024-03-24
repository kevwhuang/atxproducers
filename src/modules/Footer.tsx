import React from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

import '../styles/modules/Footer.scss';

function Footer(): React.ReactElement {
    return (
        <footer className="footer">
            <span>© 2024 ATX Producers</span>
            <span>atxproducers@gmail.com</span>
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
