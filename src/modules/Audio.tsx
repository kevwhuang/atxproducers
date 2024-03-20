import React from 'react';

import Spotify from '../components/Spotify';

import '../styles/modules/Audio.scss';

function Audio(): React.ReactElement {
    return (
        <section className="audio">
            <Spotify />
        </section>
    );
}

export default Audio;
