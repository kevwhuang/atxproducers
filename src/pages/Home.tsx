import React from 'react';
import { Helmet } from 'react-helmet-async';

import Audio from '../modules/Audio';
import Events from '../modules/Events';
import Hero from '../modules/Hero';
import Spotlight from '../modules/Spotlight';
import Summary from '../modules/Summary';

function Home(): React.ReactElement {
    return (
        <main id="home">
            <Hero />
            <Summary />
            <Spotlight />
            <Events />
            <Audio />
            <Helmet>
                <title>APA | Home</title>
            </Helmet>
        </main>
    );
}

export default Home;
