import React from 'react';
import { Helmet } from 'react-helmet-async';

import Carousel from '../modules/Carousel';
import Introduction from '../modules/Introduction';
import Sponsors from '../modules/Sponsors';

function About(): React.ReactElement {
    return (
        <main id="about">
            <Sponsors />
            <Introduction />
            <Carousel />
            <Helmet>
                <title>APA | About</title>
            </Helmet>
        </main>
    );
}

export default About;
