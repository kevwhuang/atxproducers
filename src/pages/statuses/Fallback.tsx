import React from 'react';
import { Helmet } from 'react-helmet-async';

import '../../styles/statuses/Fallback.scss';

function Fallback(): React.ReactElement {
    return (
        <main id="fallback">
            <Helmet>
                <title>ATX PRODUCERS | FALLBACK</title>
            </Helmet>
        </main>
    );
}

export default Fallback;
