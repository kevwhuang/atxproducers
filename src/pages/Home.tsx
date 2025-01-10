import React from 'react';

import Audio from '../modules/home/Audio';
import Hero from '../modules/home/Hero';
import Meetups from '../modules/events/Meetups';
import Spotlight from '../modules/home/Spotlight';
import Summary from '../modules/home/Summary';

import '../styles/pages/Home.scss';

function Home(): React.ReactElement {
    scroll(0, 0);

    return (
        <main id="home">
            <title>Home | APA</title>
            <Hero />
            <Summary />
            <Spotlight />
            <Meetups period="upcoming" />
            <Audio />
        </main>
    );
}

export default Home;
