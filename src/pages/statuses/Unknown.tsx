import React from 'react';
import { Helmet } from 'react-helmet-async';

import '../../styles/statuses/Unknown.scss';

function Unknown(): React.ReactElement {
    return (
        <main id="unknown">
            <h1>Unknown</h1>
            <Helmet>
                <title>Unknown | APA</title>
            </Helmet>
        </main>
    );
}

export default Unknown;
