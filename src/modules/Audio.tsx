import React from 'react';

import links from '../assets/links.json';

import '../styles/modules/Audio.scss';

function Audio(): React.ReactElement {
    return (
        <section className="audio">
            <iframe
                className="audio__spotify"
                src={links.spotify}
                allow="encrypted-media"
                loading="lazy"
            />
            <iframe
                className="audio__soundcloud"
                src={links.soundcloud}
                loading="lazy"
            />
        </section>
    );
}

export default Audio;
