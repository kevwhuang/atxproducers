import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import '../styles/modules/Events.scss';

function parseDatetime(date: Date, duration: number): string {
    const month = date.toLocaleString('en-us', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    const start = parseTime(date.getHours(), date.getMinutes());
    const end = parseTime(date.getHours() + (duration / 60), date.getMinutes());
    return `${month} ${day}, ${year}\u00A0 • \u00A0${start} \u2015 ${end}`;
}

function parseTime(hour: number, minute: number): string {
    const post = hour <= 11 ? 'AM' : 'PM';
    if (hour >= 13) hour -= 12;
    return `${hour}:${minute.toString().padStart(2, '0')} ${post}`;
}

function Events(): React.ReactElement {
    const [meetups, setMeetups] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getMeetups');
            for (const e of res.data) {
                e.date = new Date(e.date);
                e.page = new URL(e.page);
                e.image ||= 'https://images.unsplash.com/photo-1616714109948-c74fe5029a4d?w=300';
                e.image = new URL(e.image);
            }
            res.data = res.data.filter((e: Meetup) => e.date.valueOf() > Date.now());
            res.data.sort((a: Meetup, b: Meetup) => (a.date < b.date ? -1 : 1));
            setMeetups(res.data);
        }());
    }, []);

    return (
        <section className="events">
            {meetups.map((e: Meetup) => (
                <article className="events__meetup" key={uuid()}>
                    <div style={{ backgroundImage: `url(${e.image.href})` }}></div>
                    <p>
                        {parseDatetime(e.date, e.duration)}
                        &nbsp; • &nbsp;
                        <a href={e.page.href} target="_blank">RSVP</a>
                    </p>
                    <p>{e.location}&nbsp; • &nbsp;{e.address}</p>
                    <h4>{e.speaker}: {e.title}</h4>
                    <p>{e.description}</p>
                </article>
            ))}
        </section>
    );
}

export default Events;
