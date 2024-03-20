import React from 'react';
import { Helmet } from 'react-helmet';

import '../../styles/statuses/Error.scss';

function Error(): React.ReactElement {
    return (
        <main id="error">
            <Helmet>
                <title>ATX PRODUCERS | ERROR</title>
            </Helmet>
        </main>
    );
}

export default Error;
