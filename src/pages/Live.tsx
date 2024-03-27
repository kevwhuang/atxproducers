import React from 'react';
import { Helmet } from 'react-helmet-async';

import Bash from '../modules/Bash';
import Feedback from '../modules/Feedback';
import Submit from '../modules/Submit';
import Toggle from '../modules/Toggle';

import useZustand from '../hooks/useZustand';

function Live(): React.ReactElement {
    const module = useZustand(s => s.module);

    return (
        <main id="live">
            <div style={{ height: '50px' }}></div>
            <Toggle />
            {module === 'submissions' && <Submit />}
            {module === 'submissions' && <Feedback />}
            {module === 'resources' && <Bash />}
            <Helmet>
                <title>APA | Live</title>
            </Helmet>
        </main>
    );
}

export default Live;
