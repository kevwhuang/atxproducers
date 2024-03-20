import React from 'react';

import Meetup from '../components/Meetup';

import '../styles/modules/Events.scss';

function Events(): React.ReactElement {
    return (
        <section className="events">
            <Meetup />
        </section>
    );
}

export default Events;
