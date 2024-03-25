import React from 'react';

import '../styles/modules/Hero.scss';

function Hero(): React.ReactElement {
    const background = 'https://images.unsplash.com/photo-1594623930572-300a3011d9ae';

    return (
        <header className="hero" style={{ backgroundImage: `url(${background})` }}>
            <h1>Austin Producer Alliance</h1>
        </header>
    );
}

export default Hero;
