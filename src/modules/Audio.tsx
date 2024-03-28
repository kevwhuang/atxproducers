import React from 'react';

import '../styles/modules/Audio.scss';

const base = 'https://w.soundcloud.com/player/?url=';
const player = 'https%3A//api.soundcloud.com/playlists/1466044633&color=%23233044';

function Audio(): React.ReactElement {
    return (
        <section className="audio">
            <iframe
                className="audio__spotify"
                src="https://open.spotify.com/embed/playlist/2RrQr63ODIQQYbQyfpX5hG?theme=0"
                allow="encrypted-media"
                loading="lazy"
            >
            </iframe>
            <iframe
                className="audio__soundcloud"
                src={base + player}
                loading="lazy"
            >
            </iframe>
        </section>
    );
}

export default Audio;
