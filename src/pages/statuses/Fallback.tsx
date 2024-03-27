import React from 'react';
import { Helmet } from 'react-helmet-async';

import '../../styles/statuses/Fallback.scss';

function Fallback(): React.ReactElement {
    return (
        <main id="fallback">
            <div style={{ height: '50px' }}></div>
            <h1>FALLBACK</h1>
            <Helmet>
                <title>APA | Fallback</title>
            </Helmet>
        </main>
    );
}

export default Fallback;
