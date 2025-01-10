import React from 'react';

import links from '../../assets/texts/links.json';

import '../../styles/modules/home/Audio.scss';

function Audio(): React.ReactElement {
    return (
        <section className="audio">
            <iframe
                allow="encrypted-media"
                className="audio__spotify"
                loading="lazy"
                src={links.embedSpotify}
            />
            <iframe
                className="audio__soundcloud"
                loading="lazy"
                src={links.embedSoundcloud}
            />
        </section>
    );
}

export default Audio;
