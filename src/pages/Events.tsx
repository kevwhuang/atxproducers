import React from 'react';
import { Helmet } from 'react-helmet-async';

import Meetups from '../modules/Meetups';
import FilterEvents from '../modules/FilterEvents';

import useZustand from '../hooks/useZustand';

function Events(): React.ReactElement {
    const filter = useZustand(s => s.events);

    return (
        <main id="events">
            <FilterEvents />
            {filter.past && <Meetups period="past" />}
            {filter.upcoming && <Meetups period="upcoming" />}
            {filter.future && <Meetups period="future" />}
            <Helmet>
                <title>Events | APA</title>
            </Helmet>
        </main>
    );
}

export default Events;
