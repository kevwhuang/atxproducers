import React from 'react';
import { Helmet } from 'react-helmet';

import '../../styles/statuses/NotFound.scss';

function NotFound(): React.ReactElement {
    return (
        <main id="not-found">
            <Helmet>
                <title>ATX PRODUCERS | NOT FOUND</title>
            </Helmet>
        </main>
    );
}

export default NotFound;
