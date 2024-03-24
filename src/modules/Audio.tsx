import React from 'react';

import '../styles/modules/Audio.scss';

function Audio(): React.ReactElement {
    return (
        <section className="audio">
            <iframe
                className="audio__spotify"
                src="https://open.spotify.com/embed/playlist/2RrQr63ODIQQYbQyfpX5hG?utm_source=generator&theme=0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
            >
            </iframe>
        </section>
    );
}

export default Audio;
