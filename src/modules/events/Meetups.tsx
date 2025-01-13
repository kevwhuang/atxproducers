import React from 'react';
import { v4 as uuid } from 'uuid';

import parseDatetime from '../../functions/parseDatetime';
import type { Meetup } from '../../types';

import links from '../../assets/texts/links.json';

import '../../styles/modules/events/Meetups.scss';

function Meetups({ period }: { period: string }): React.ReactElement {
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            const res = await fetch('https://aephonics.onrender.com/atxproducers/v1/meetups');
            let data = await res.json();

            for (const e of data) {
                e.date = new Date(e.date);
                e.page = new URL(e.page);
                e.image ||= links.imageMeetup;
                e.image = new URL(e.image);
            }

            data.sort((a: Meetup, b: Meetup) => (a.date < b.date ? -1 : 1));

            switch (period) {
                case 'past':
                    data = data.filter((e: Meetup) => e.date.valueOf() < Date.now());
                    break;
                case 'upcoming':
                    data = data.filter((e: Meetup) => e.date.valueOf() > Date.now());
                    data = data.filter((_: Meetup, i: number) => i <= 2);
                    break;
                default:
                    data = data.filter((e: Meetup) => e.date.valueOf() > Date.now());
                    data = data.filter((_: Meetup, i: number) => i >= 3);
            }

            setEvents(data);
        }());
    }, []);

    return (
        <section className="meetups">
            {events.map((e: Meetup) =>
                <article className="meetups__meetup" key={uuid()}>
                    <div style={{ backgroundImage: `url(${e.image.href})` }} />
                    <p>
                        {parseDatetime(e.date, e.duration)}
                        &nbsp; • &nbsp;
                        <a href={e.page.href}>RSVP</a>
                    </p>
                    <p>{e.location}&nbsp; • &nbsp;{e.address}</p>
                    <h4>{e.speaker}: {e.title}</h4>
                    <p>{e.description}</p>
                </article>
            )}
        </section>
    );
}

export default Meetups;
