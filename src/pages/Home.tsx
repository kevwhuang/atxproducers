import React from 'react';
import { Helmet } from 'react-helmet';

import About from '../modules/About';
import Audio from '../modules/Audio';
import Events from '../modules/Events';
import Spotlight from '../modules/Spotlight';

function Home(): React.ReactElement {
    return (
        <main id="home">
            <Spotlight />
            <Events />
            <Audio />
            <About />
            <Helmet>
                <title>ATX PRODUCERS | HOME</title>
            </Helmet>
        </main>
    );
}

export default Home;
