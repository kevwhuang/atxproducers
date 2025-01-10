import React from 'react';

import Bash from '../modules/live/Bash';
import Feedback from '../modules/live/Feedback';
import Submit from '../modules/live/Submit';
import Toggle from '../modules/live/Toggle';

import useZustand from '../hooks/useZustand';

import '../styles/pages/Live.scss';

function Live(): React.ReactElement {
    scroll(0, 0);

    const module = useZustand(s => s.module);

    return (
        <main id="live">
            <title>Live | APA</title>
            <Toggle />
            {module === 'submissions' && <Submit />}
            {module === 'submissions' && <Feedback />}
            {module === 'resources' && <Bash />}
        </main>
    );
}

export default Live;
