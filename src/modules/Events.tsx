import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import '../styles/modules/Events.scss';

function Events(): React.ReactElement {
    const [meetups, setMeetups] = React.useState([]);

    function parseTime(hour: number, minute: number): string {
        const post = hour <= 11 ? 'AM' : 'PM';
        if (hour >= 13) hour -= 12;
        return `${hour}:${minute.toString().padStart(2, '0')} ${post}`;
    }

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getMeetups');
            for (const e of res.data) {
                e.date = new Date(e.date);
                e.page = new URL(e.page);
                e.image = new URL(e.image || import.meta.env.VITE_DEFAULT_MEETUP_IMAGE);
            }
            res.data.sort((a: Meetup, b: Meetup) => a.date < b.date ? 1 : -1);
            setMeetups(res.data);
        }());
    }, []);

    return (
        <section className="events">
            {meetups.map((e: Meetup) => (
                <article className="events__meetup" key={uuid()}>
                    <p>{e.date.getFullYear()}-{e.date.getMonth() + 1}-{e.date.getDate()}</p>
                    <p>{parseTime(e.date.getHours(), e.date.getMinutes())}</p>
                    <p>{parseTime(e.date.getHours() + e.duration / 60, e.date.getMinutes())}</p>
                    <p>{e.location}</p>
                    <p>{e.address}</p>
                    <p>{e.speaker}</p>
                    <p>{e.title}</p>
                    <p>{e.description}</p>
                    <a href={e.page.href} target="_blank">RSVP</a>
                    <img src={e.image.href} alt={e.speaker} />
                </article>
            ))}
        </section>
    );
}

export default Events;
