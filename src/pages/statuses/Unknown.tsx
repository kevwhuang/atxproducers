import React from 'react';
import { Helmet } from 'react-helmet-async';

import '../../styles/statuses/Unknown.scss';

function Unknown(): React.ReactElement {
    return (
        <main id="unknown">
            <div style={{ height: '50px' }}></div>
            <h1>Unknown</h1>
            <Helmet>
                <title>ATX Producers | Unknown</title>
            </Helmet>
        </main>
    );
}

export default Unknown;
