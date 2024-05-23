import React from 'react';
import { Helmet } from 'react-helmet-async';

import '../../styles/statuses/Fallback.scss';

function Fallback(): React.ReactElement {
    return (
        <main id="fallback">
            <h1>Fallback</h1>
            <Helmet>
                <title>Fallback | APA</title>
            </Helmet>
        </main>
    );
}

export default Fallback;
