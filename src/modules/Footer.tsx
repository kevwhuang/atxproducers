import React from 'react';
import { Icon } from '@iconify/react';

import '../styles/modules/Footer.scss';

function Footer(): React.ReactElement {
    return (
        <footer className="footer">
            <p className="footer__copyright">© 2024 APA</p>
            <p className="footer__email">atxproducers@gmail.com</p>
            <div className="footer__socials">
                <a href="https://meetup.com/austin-producer-alliance">
                    <Icon icon="simple-icons:meetup" />
                </a>
                <a href="https://austin-producer-alliance.eventbrite.com">
                    <Icon icon="simple-icons:eventbrite" />
                </a>
                <a href="https://github.com/kevwhuang">
                    <Icon icon="mdi:github" />
                </a>
            </div>
        </footer>
    );
}

export default Footer;
