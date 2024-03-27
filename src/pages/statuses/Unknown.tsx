import React from 'react';
import { Helmet } from 'react-helmet-async';

import '../../styles/statuses/Unknown.scss';

function Unknown(): React.ReactElement {
    return (
        <main id="unknown">
            <div style={{ height: '50px' }}></div>
            <h1>UNKNOWN</h1>
            <Helmet>
                <title>APA | Unknown</title>
            </Helmet>
        </main>
    );
}

export default Unknown;
