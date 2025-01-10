import React from 'react';

import Carousel from '../modules/about/Carousel';
import Introduction from '../modules/about/Introduction';
import Sponsors from '../modules/about/Sponsors';

import '../styles/pages/About.scss';

function About(): React.ReactElement {
    scroll(0, 0);

    return (
        <main id="about">
            <title>About | APA</title>
            <Introduction />
            <Sponsors />
            <Carousel />
        </main>
    );
}

export default About;
