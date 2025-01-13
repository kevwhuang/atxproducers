import { Icon, InlineIcon } from '@iconify/react';
import React from 'react';
import { v4 as uuid } from 'uuid';

import type { Producer } from '../../types';

import links from '../../assets/texts/links.json';
import useZustand from '../../hooks/useZustand';

import '../../styles/modules/producers/Cards.scss';

function Cards(): React.ReactElement {
    const [producers, setProducers] = React.useState([]);
    const [filter, sort] = useZustand(s => [s.producers, s.sort]);

    React.useEffect(() => {
        (async function () {
            const res = await fetch('https://aephonics.onrender.com/atxproducers/v1/producers');
            const data = await res.json();

            for (const e of data) {
                e.stream ||= links.defaultStream;
                e.stream = new URL(e.stream);
                e.photo ||= links.imageProducer;
                e.photo = new URL(e.photo);
                e.spotlight = new Date(e.spotlight);

                for (const social in e.socials) {
                    if (e.socials[social]) e.socials[social] = new URL(e.socials[social]);
                    else delete e.socials[social];
                }
            }

            data.sort((a: Producer, b: Producer) => (a.alias < b.alias ? -1 : 1));
            setProducers(data);
        }());
    }, []);

    React.useEffect(() => {
        if (sort.prev) {
            if (sort.alias) {
                producers.sort((a: Producer, b: Producer) => (a.alias < b.alias ? -1 : 1));
            } else {
                producers.sort((a: Producer, b: Producer) => (a.alias < b.alias ? 1 : -1));
            }
        } else {
            if (sort.name) {
                producers.sort((a: Producer, b: Producer) => (a.name < b.name ? -1 : 1));
            } else {
                producers.sort((a: Producer, b: Producer) => (a.name < b.name ? 1 : -1));
            }
        }

        setProducers(producers);
    }, [sort]);

    return (
        <section className="cards">
            {producers.map((e: Producer) => {
                const className = e.spotlight.valueOf()
                    ? 'cards__producer--photo glow' : 'cards__producer--photo';

                for (const group in filter) {
                    for (const tag in filter[group as keyof typeof filter]) {
                        if (filter[group as keyof typeof filter][tag] === false) continue;
                        const cur = e[group as keyof typeof e];
                        if (cur[tag as keyof typeof cur] === false) return null;
                    }
                }

                return (
                    <article className="cards__producer" key={uuid()}>
                        <div
                            className={className}
                            style={{ backgroundImage: `url(${e.photo.href})` }}
                        />
                        <div className="cards__producer--identity">
                            <h3 className={e.speaker ? 'speaker' : ''}>
                                {e.alias}
                                {e.admin && ' '}
                                {e.admin && <InlineIcon icon="material-symbols:verified-user" />}
                            </h3>
                            <p>{e.name}</p>
                        </div>
                        <div className="cards__producer--container">
                            <div className="cards__producer--container--info">
                                <p>{e.bio}</p>
                                {e.credits.length > 0 && <p>Credits: {e.credits.join(', ')}</p>}
                            </div>
                            {Object.values(e.services).includes(true) &&
                                <div className="cards__producer--container--group">
                                    <p>Services</p>
                                    <div>
                                        {e.services.production && <span>Production</span>}
                                        {e.services.beatmaking && <span>Beatmaking</span>}
                                        {e.services.musician && <span>Musician</span>}
                                        {e.services.singing && <span>Singing</span>}
                                        {e.services.songwriting && <span>Songwriting</span>}
                                        {e.services.recording && <span>Recording</span>}
                                        {e.services.mixing && <span>Mixing</span>}
                                        {e.services.mastering && <span>Mastering</span>}
                                        {e.services.post && <span>Post Production</span>}
                                        {e.services.editing && <span>Audio Editing</span>}
                                        {e.services.synthesis && <span>Synthesis</span>}
                                        {e.services.live && <span>Live Sound</span>}
                                        {e.services.teaching && <span>Teaching</span>}
                                    </div>
                                </div>
                            }
                            {Object.values(e.workstations).includes(true) &&
                                <div className="cards__producer--container--group">
                                    <p>Workstations</p>
                                    <div>
                                        {e.workstations.protools && <span>Pro Tools</span>}
                                        {e.workstations.ableton && <span>Ableton</span>}
                                        {e.workstations.flstudio && <span>FL Studio</span>}
                                        {e.workstations.logic && <span>Logic</span>}
                                        {e.workstations.garageband && <span>GarageBand</span>}
                                        {e.workstations.reaper && <span>Reaper</span>}
                                        {e.workstations.reason && <span>Reason</span>}
                                        {e.workstations.cubase && <span>Cubase</span>}
                                        {e.workstations.studioone && <span>Studio One</span>}
                                    </div>
                                </div>
                            }
                            {Object.values(e.genres).includes(true) &&
                                <div className="cards__producer--container--group">
                                    <p>Genres</p>
                                    <div>
                                        {e.genres.electronic && <span>Electronic</span>}
                                        {e.genres.dance && <span>Dance</span>}
                                        {e.genres.hiphop && <span>Hip Hop</span>}
                                        {e.genres.rnb && <span>R&B</span>}
                                        {e.genres.pop && <span>Pop</span>}
                                        {e.genres.indie && <span>Indie</span>}
                                        {e.genres.rock && <span>Rock</span>}
                                    </div>
                                </div>
                            }
                            {Object.values(e.instruments).includes(true) &&
                                <div className="cards__producer--container--group">
                                    <p>Instruments</p>
                                    <div>
                                        {e.instruments.hardware && <span>Hardware</span>}
                                        {e.instruments.vocals && <span>Vocals</span>}
                                        {e.instruments.guitar && <span>Guitar</span>}
                                        {e.instruments.keys && <span>Keys</span>}
                                        {e.instruments.drums && <span>Drums</span>}
                                        {e.instruments.brass && <span>Brass</span>}
                                        {e.instruments.strings && <span>Strings</span>}
                                        {e.instruments.woodwinds && <span>Woodwinds</span>}
                                    </div>
                                </div>
                            }
                        </div>

                        <div className="cards__producer--socials">
                            {e.socials.tree &&
                                <a href={e.socials.tree.href}>
                                    <Icon icon="simple-icons:linktree" />
                                </a>
                            }

                            {e.socials.website &&
                                <a href={e.socials.website.href}>
                                    <Icon icon="material-symbols:home" />
                                </a>
                            }

                            {e.socials.instagram &&
                                <a href={e.socials.instagram.href}>
                                    <Icon icon="mdi:instagram" />
                                </a>
                            }

                            {e.socials.tiktok &&
                                <a href={e.socials.tiktok.href}>
                                    <Icon icon="ic:baseline-tiktok" />
                                </a>
                            }

                            {e.socials.youtube &&
                                <a href={e.socials.youtube.href}>
                                    <Icon icon="mdi:youtube" />
                                </a>
                            }

                            {e.socials.spotify &&
                                <a href={e.socials.spotify.href}>
                                    <Icon icon="mdi:spotify" />
                                </a>
                            }

                            {e.socials.soundcloud &&
                                <a href={e.socials.soundcloud.href}>
                                    <Icon icon="mdi:soundcloud" />
                                </a>
                            }
                        </div>
                        <div className="cards__producer--stream">
                            <a href={e.stream.href}>Stream</a>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}

export default Cards;
