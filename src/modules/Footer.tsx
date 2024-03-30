import React from 'react';

import GitHubIcon from '@mui/icons-material/GitHub';
import InstagramIcon from '@mui/icons-material/Instagram';

import '../styles/modules/Footer.scss';

function Footer(): React.ReactElement {
    return (
        <footer className="footer">
            <p className="footer__copyright">© 2024 APA</p>
            <p className="footer__email">atxproducers@gmail.com</p>
            <div className="footer__socials">
                <a href="https://instagram.com/atxproducers"><InstagramIcon /></a>
                <a href="https://github.com/kevwhuang/atxproducers"><GitHubIcon /></a>
            </div>
        </footer>
    );
}

export default Footer;
