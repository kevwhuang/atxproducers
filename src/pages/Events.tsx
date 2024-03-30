import React from 'react';
import { Helmet } from 'react-helmet-async';

import Future from '../modules/Future';
import Past from '../modules/Past';

function Events(): React.ReactElement {
    return (
        <main id="events">
            <Future />
            <Past />
            <Helmet>
                <title>APA | Events</title>
            </Helmet >
        </main>
    );
}

export default Events;
