import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import '../styles/modules/Cards.scss';

function Cards(): React.ReactElement {
    const [producers, setProducers] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getProducers');
            for (const e of res.data) {
                e.stream = new URL(e.stream || import.meta.env.VITE_DEFAULT_PRODUCER_STREAM);
                e.photo = new URL(e.photo || import.meta.env.VITE_DEFAULT_PRODUCER_PHOTO);
                e.spotlight = new Date(e.spotlight);
                for (const social in e.socials) {
                    e.socials[social] = new URL(e.socials[social] || import.meta.env.VITE_DEFAULT_PRODUCER_SOCIAL);
                }
            }
            res.data.sort((a: Producer, b: Producer) => a.alias < b.alias ? -1 : 1);
            setProducers(res.data);
        }());
    }, []);

    function capitalize(str: string): string {
        return str[0].toUpperCase() + str.slice(1);
    }

    return (
        <section className="cards">
            {producers.map((e: Producer | any) => (
                <article className="cards__producer" key={uuid()}>
                    <p>{e.alias}</p>
                    <p>{e.name}</p>
                    <p>{e.bio}</p>
                    <p>{e.credits.join(', ')}</p>
                    <a href={e.stream.href} target="_blank">Listen</a>
                    <img src={e.photo.href} alt={e.name} />
                    {e.speaker && <p>Speaker</p>}
                    {e.admin && <p>Admin</p>}
                    {e.spotlight.valueOf() > 0 && <p>Spotlight</p>}
                    <p>Socials</p>
                    {Object.keys(e.socials).map(social => (
                        <a key={uuid()} href={e.socials[social].href} target="_blank">
                            {capitalize(social)}
                        </a>
                    ))}
                    <p>Services</p>
                    {Object.keys(e.services).filter(Boolean).map(service => (
                        <p key={uuid()}>{capitalize(service)}</p>
                    ))}
                    <p>Genres</p>
                    {Object.keys(e.genres).filter(Boolean).map(genre => (
                        <p key={uuid()}>{capitalize(genre)}</p>
                    ))}
                    <p>Workstations</p>
                    {Object.keys(e.workstations).filter(Boolean).map(workstation => (
                        <p key={uuid()}>{capitalize(workstation)}</p>
                    ))}
                    <p>Instruments</p>
                    {Object.keys(e.instruments).filter(Boolean).map(instrument => (
                        <p key={uuid()}>{capitalize(instrument)}</p>
                    ))}
                </article>
            ))}
        </section>
    );
}

export default Cards;
