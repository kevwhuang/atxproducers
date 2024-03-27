import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import ForestIcon from '@mui/icons-material/Forest';
import HomeIcon from '@mui/icons-material/Home';
import InstagramIcon from '@mui/icons-material/Instagram';
import MicIcon from '@mui/icons-material/Mic';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import VideocamIcon from '@mui/icons-material/Videocam';
import YouTubeIcon from '@mui/icons-material/YouTube';

import useZustand from '../hooks/useZustand';

import '../styles/modules/Cards.scss';

function Cards(): React.ReactElement {
    const [producers, setProducers] = React.useState([]);
    const [filter, sort] = useZustand(s => [s.filter, s.sort]);

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
            res.data.sort((a: Producer, b: Producer) => (a.alias < b.alias ? -1 : 1));
            setProducers(res.data);
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
                const spotlight = e.spotlight.valueOf() ? 'spotlight' : '';
                const speaker = e.speaker ? 'speaker' : '';
                const admin = e.admin ? 'admin' : '';
                for (const group in filter) {
                    for (const tag in filter[group as keyof typeof filter]) {
                        if (filter[group as keyof typeof filter][tag] === false) continue;
                        const cur = e[group as keyof typeof e];
                        if (cur[tag as keyof typeof cur] === false) return undefined;
                    }
                }
                return (
                    <article className="cards__producer" key={uuid()}>
                        <div
                            className={`cards__producer--photo ${spotlight}`}
                            style={{ backgroundImage: `url(${e.photo.href})` }}
                        >
                        </div>
                        <div className="cards__producer--identity">
                            <p className={`${speaker} ${admin}`}>{e.alias}</p>
                            <p>{e.name}</p>
                        </div>
                        <div className="cards__producer--container">
                            <div className="cards__producer--info">
                                <p>{e.bio}</p>
                                {e.credits.length ? <p>Credits: {e.credits.join(', ')}</p> : <></>}
                            </div>
                            <div className="cards__producer--group">
                                <p>Services</p>
                                <div>
                                    {e.services.production && <span>Production</span>}
                                    {e.services.beatmaking && <span>Beatmaking</span>}
                                    {e.services.songwriting && <span>Songwriting</span>}
                                    {e.services.singing && <span>Singing</span>}
                                    {e.services.musician && <span>Musician</span>}
                                    {e.services.recording && <span>Recording</span>}
                                    {e.services.mixing && <span>Mixing</span>}
                                    {e.services.mastering && <span>Mastering</span>}
                                    {e.services.post && <span>Post Production</span>}
                                    {e.services.synthesis && <span>Synthesis</span>}
                                    {e.services.editing && <span>Audio Editing</span>}
                                    {e.services.live && <span>Live Sound</span>}
                                </div>
                            </div>
                            <div className="cards__producer--group">
                                <p>Genres</p>
                                <div>
                                    {e.genres.electronic && <span>Electronic</span>}
                                    {e.genres.dance && <span>Dance</span>}
                                    {e.genres.hiphop && <span>Hip Hop</span>}
                                    {e.genres.rnb && <span>R&B</span>}
                                    {e.genres.pop && <span>Pop</span>}
                                    {e.genres.indie && <span>Indie</span>}
                                    {e.genres.rock && <span>Rock</span>}
                                    {e.genres.acoustic && <span>Acoustic</span>}
                                </div>
                            </div>
                            <div className="cards__producer--group">
                                <p>Instruments</p>
                                <div>
                                    {e.instruments.hardware && <span>Hardware</span>}
                                    {e.instruments.vocals && <span>Vocals</span>}
                                    {e.instruments.guitar && <span>Guitar</span>}
                                    {e.instruments.keys && <span>Keys</span>}
                                    {e.instruments.percussions && <span>Percussions</span>}
                                    {e.instruments.strings && <span>Strings</span>}
                                    {e.instruments.brass && <span>Brass</span>}
                                </div>
                            </div>
                            <div className="cards__producer--group">
                                <p>Workstations</p>
                                <div>
                                    {e.workstations.ableton && <span>Ableton</span>}
                                    {e.workstations.fl && <span>FL Studio</span>}
                                    {e.workstations.logic && <span>Logic</span>}
                                    {e.workstations.reaper && <span>Reaper</span>}
                                    {e.workstations.reason && <span>Reason</span>}
                                    {e.workstations.protools && <span>Pro Tools</span>}
                                </div>
                            </div>
                        </div>
                        <div className="cards__producer--socials">
                            {
                                e.socials.website
                                && <a href={e.socials.website.href} target="_blank">
                                    <HomeIcon />
                                </a>
                            } {
                                e.socials.tree
                                && <a href={e.socials.tree.href} target="_blank">
                                    <ForestIcon />
                                </a>
                            } {
                                e.socials.instagram
                                && <a href={e.socials.instagram.href} target="_blank">
                                    <InstagramIcon />
                                </a>
                            } {
                                e.socials.tiktok
                                && <a href={e.socials.tiktok.href} target="_blank">
                                    <VideocamIcon />
                                </a>
                            } {
                                e.socials.spotify
                                && <a href={e.socials.spotify.href} target="_blank">
                                    <MusicNoteIcon />
                                </a>
                            } {
                                e.socials.soundcloud
                                && <a href={e.socials.soundcloud.href} target="_blank">
                                    <MicIcon />
                                </a>
                            } {
                                e.socials.youtube
                                && <a href={e.socials.youtube.href} target="_blank">
                                    <YouTubeIcon />
                                </a>
                            }
                        </div>
                        <div className="cards__producer--stream">
                            <a href={e.stream.href} target="_blank">Stream</a>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}

export default Cards;
