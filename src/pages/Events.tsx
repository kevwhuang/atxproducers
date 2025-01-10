import React from 'react';

import Filter from '../modules/events/Filter';
import Meetups from '../modules/events/Meetups';

import useZustand from '../hooks/useZustand';

import '../styles/pages/Events.scss';

function Events(): React.ReactElement {
    scroll(0, 0);

    const filter = useZustand(s => s.events);

    return (
        <main id="events">
            <title>Events | APA</title>
            <Filter />
            {filter.past && <Meetups period="past" />}
            {filter.upcoming && <Meetups period="upcoming" />}
            {filter.future && <Meetups period="future" />}
        </main>
    );
}

export default Events;
