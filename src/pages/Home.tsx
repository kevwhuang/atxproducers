import React from 'react';
import { Helmet } from 'react-helmet-async';

import Audio from '../modules/Audio';
import Hero from '../modules/Hero';
import Meetups from '../modules/Meetups';
import Spotlight from '../modules/Spotlight';
import Summary from '../modules/Summary';

function Home(): React.ReactElement {
    return (
        <main id="home">
            <Hero />
            <Summary />
            <Spotlight />
            <Meetups period="upcoming" />
            <Audio />
            <Helmet>
                <title>Home | APA</title>
            </Helmet>
        </main>
    );
}

export default Home;
