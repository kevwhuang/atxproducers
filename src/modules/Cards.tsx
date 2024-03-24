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
                e.stream ||= 'https://soundcloud.com/skrillex';
                e.stream = new URL(e.stream);
                e.photo ||= 'https://images.unsplash.com/photo-1535682215715-c5c6a5d28247';
                e.photo = new URL(e.photo);
                e.spotlight = new Date(e.spotlight);
                for (const social in e.socials) {
                    if (e.socials[social]) e.socials[social] = new URL(e.socials[social]);
                    else delete e.socials[social];
                }
            }
            res.data.sort((a: Producer, b: Producer) => a.alias < b.alias ? -1 : 1);
            setProducers(res.data);
        }());
    }, []);

    return (
        <section className="cards">
            {producers.map((e: Producer | any) => (
                <article className="cards__producer" key={uuid()}>
                    <div style={{ backgroundImage: `url(${e.photo.href})` }}></div>
                    <h3>
                        {e.alias}
                        &nbsp; • &nbsp;
                        {e.name}
                        &nbsp; • &nbsp;
                        <a href={e.stream.href} target="_blank">Listen</a>
                    </h3>
                    <p>{e.credits.join(', ').replaceAll(', ', '\u00A0 • \u00A0')}</p>
                    <p>
                        <a href={e.socials.website ?? ''} target="blank">Website</a>
                        {e.socials.website ? ' ✔ \u00A0' : ' ✘ \u00A0'}
                        <a href={e.socials.tree ?? ''} target="blank">Tree</a>
                        {e.socials.tree ? ' ✔ \u00A0' : ' ✘ \u00A0'}
                        <a href={e.socials.instagram ?? ''} target="blank">Instagram</a>
                        {e.socials.instagram ? ' ✔ \u00A0' : ' ✘ \u00A0'}
                        <a href={e.socials.tiktok ?? ''} target="blank">TikTok</a>
                        {e.socials.tiktok ? ' ✔ \u00A0' : ' ✘ \u00A0'}
                        <a href={e.socials.spotify ?? ''} target="blank">Spotify</a>
                        {e.socials.spotify ? ' ✔ \u00A0' : ' ✘ \u00A0'}
                        <a href={e.socials.soundcloud ?? ''} target="blank">SoundCloud</a>
                        {e.socials.soundcloud ? ' ✔ \u00A0' : ' ✘ \u00A0'}
                        <a href={e.socials.youtube ?? ''} target="blank">YouTube</a>
                        {e.socials.youtube ? ' ✔ \u00A0' : ' ✘ \u00A0'}
                    </p>
                    <p>
                        Production {e.services.production ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Beatmaking {e.services.beatmaking ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Songwriting {e.services.songwriting ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Singing {e.services.singing ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Musician {e.services.musician ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Recording {e.services.recording ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Mixing {e.services.mixing ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Mastering {e.services.mastering ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Post Production {e.services.post ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Synthesis {e.services.synthesis ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Audio Editing {e.services.editing ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Live Sound {e.services.live ? '✔' : '✘'}
                    </p>
                    <p>
                        Electronic {e.genres.electronic ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Dance {e.genres.dance ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Hip Hop {e.genres.hiphop ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        R&B {e.genres.rnb ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Pop {e.genres.pop ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Indie {e.genres.indie ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Rock {e.genres.rock ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Acoustic {e.genres.acoustic ? '✔' : '✘'}
                    </p>
                    <p>
                        Ableton {e.workstations.ableton ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        FL Studio {e.workstations.fl ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Logic {e.workstations.logic ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Reaper {e.workstations.reaper ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Reason {e.workstations.reason ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Pro Tools {e.workstations.protools ? '✔' : '✘'}
                    </p>
                    <p>
                        Hardware {e.instruments.hardware ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Vocals {e.instruments.vocals ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Guitar {e.instruments.guitar ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Keys {e.instruments.keys ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Percussions {e.instruments.percussions ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Strings {e.instruments.strings ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Brass {e.instruments.brass ? '✔' : '✘'}
                    </p>
                    <p>
                        Speaker {e.speaker ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Admin {e.admin ? '✔' : '✘'}
                        &nbsp;&nbsp;
                        Spotlight {e.spotlight.valueOf() > 0 ? '✔' : '✘'}
                    </p>
                    <p>{e.bio}</p>
                </article>
            ))}
        </section>
    );
}

export default Cards;
