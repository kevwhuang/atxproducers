import React from 'react';

import About from '../modules/About';
import Audio from '../modules/Audio';
import Events from '../modules/Events';
import Feature from '../modules/Feature';

function Home(): React.ReactElement {
    return (
        <main id="home">
            <Feature />
            <Events />
            <Audio />
            <About />
        </main>
    );
}

export default Home;
