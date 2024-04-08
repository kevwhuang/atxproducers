import React from 'react';

import useZustand from '../hooks/useZustand';

import '../styles/modules/FilterEvents.scss';

function FilterEvents(): React.ReactElement {
    const [events, updateEvents] = useZustand(s => [s.events, s.updateEvents]);

    function handleClick(e: React.MouseEvent): void {
        if (!(e.target instanceof HTMLElement)) return;
        for (const key in events) {
            events[key as keyof typeof events] = false;
        }
        const key = e.target.innerText!.toLowerCase() as keyof typeof events;
        events[key] = true;
        updateEvents({ ...events });
    }

    return (
        <section className="filter-events">
            <button className={events.past ? 'active' : ''} onClick={handleClick}>
                Past
            </button>
            <button className={events.upcoming ? 'active' : ''} onClick={handleClick}>
                Upcoming
            </button>
            <button className={events.future ? 'active' : ''} onClick={handleClick}>
                Future
            </button>
        </section>
    );
}

export default FilterEvents;
