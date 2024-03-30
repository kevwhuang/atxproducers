import React from 'react';

import links from '../assets/links.json';

import '../styles/modules/Hero.scss';

function Hero(): React.ReactElement {
    return (
        <header className="hero" style={{ backgroundImage: `url(${links.hero})` }}>
            <h1 className="hero__header" >Austin Producer Alliance</h1>
        </header>
    );
}

export default Hero;
