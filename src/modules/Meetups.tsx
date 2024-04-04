import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import { parseDatetime } from '../utilities';

import links from '../assets/links.json';

import '../styles/modules/Meetups.scss';

function Meetups({ period }: { period: string }): React.ReactElement {
    const [events, setEvents] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getMeetups');
            for (const e of res.data) {
                e.date = new Date(e.date);
                e.page = new URL(e.page);
                e.image ||= links.defaultMeetup;
                e.image = new URL(e.image);
            }
            res.data.sort((a: Meetup, b: Meetup) => (a.date < b.date ? -1 : 1));
            switch (period) {
                case 'past':
                    res.data = res.data.filter((e: Meetup) => e.date.valueOf() < Date.now());
                    break;
                case 'upcoming':
                    res.data = res.data.filter((e: Meetup) => e.date.valueOf() > Date.now());
                    res.data = res.data.filter((_: Meetup, i: number) => i <= 2);
                    break;
                default:
                    res.data = res.data.filter((e: Meetup) => e.date.valueOf() > Date.now());
                    res.data = res.data.filter((_: Meetup, i: number) => i >= 3);
            }
            setEvents(res.data);
        }());
    }, []);

    return (
        <section className="meetups">
            {events.map((e: Meetup) => (
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
            ))}
        </section>
    );
}

export default Meetups;
