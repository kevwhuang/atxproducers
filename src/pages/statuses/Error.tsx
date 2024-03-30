import React from 'react';
import { Helmet } from 'react-helmet-async';

import '../../styles/statuses/Error.scss';

function Error(): React.ReactElement {
    return (
        <main id="error">
            <h1>Error</h1>
            <Helmet>
                <title>APA | Error</title>
            </Helmet>
        </main>
    );
}

export default Error;
