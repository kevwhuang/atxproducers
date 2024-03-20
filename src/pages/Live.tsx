import React from 'react';
import { Helmet } from 'react-helmet';

import Bash from '../modules/Bash';
import Feedback from '../modules/Feedback';

function Live(): React.ReactElement {
    return (
        <main id="live">
            <Feedback />
            <Bash />
            <Helmet>
                <title>ATX PRODUCERS | LIVE</title>
            </Helmet>
        </main>
    );
}

export default Live;
