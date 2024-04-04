import React from 'react';
import { Helmet } from 'react-helmet-async';

import Meetups from '../modules/Meetups';

function Events(): React.ReactElement {
    return (
        <main id="events">
            <Meetups period="past" />
            <Meetups period="upcoming" />
            <Meetups period="future" />
            <Helmet>
                <title>APA | Events</title>
            </Helmet >
        </main>
    );
}

export default Events;
