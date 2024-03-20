import React from 'react';

import Bash from '../modules/Bash';
import Feedback from '../modules/Feedback';

function Live(): React.ReactElement {
    return (
        <main id="live">
            <Feedback />
            <Bash />
        </main>
    );
}

export default Live;
