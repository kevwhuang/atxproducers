import React from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { v4 as uuid } from 'uuid';

import { capitalizeResource } from '../utilities';
import { type Resource } from '../types/global.d';

import links from '../assets/links.json';

import '../styles/modules/Bash.scss';

function Bash(): React.ReactElement {
    const audio = React.useRef<HTMLAudioElement>(null);
    const source = React.useRef<HTMLSourceElement>(null);
    const [resources, setResources] = React.useState([]);

    function handleClick(e: React.MouseEvent): void {
        if (!(audio.current instanceof HTMLAudioElement)) return;
        if (!(source.current instanceof HTMLSourceElement)) return;
        source.current.src = e.currentTarget.getAttribute('data-preview') as string;
        audio.current.load();
        audio.current.play();
    }

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getResources');
            for (const e of res.data) {
                e.preview ||= links.defaultStream;
                e.preview = new URL(e.preview);
                e.download ||= links.defaultDownload;
                e.download = new URL(e.download);
            }
            res.data.sort((a: Resource, b: Resource) => a.id - b.id);
            setResources(res.data);
        }());
    }, []);

    return (
        <section className="bash">
            <table className="bash__table">
                <thead>
                    {resources?.length > 0 &&
                        <tr>
                            <th />
                            <th>Type</th>
                            <th>Name</th>
                            <th>Difficulty</th>
                        </tr>
                    }
                </thead>
                <tbody>
                    {resources.map((e: Resource) => (
                        <tr key={uuid()}>
                            <td>{e.id}</td>
                            <td>{capitalizeResource(e.type)}</td>
                            <td>{e.name}</td>
                            <td className={e.difficulty}>{capitalizeResource(e.difficulty)}</td>
                            <td>
                                <Icon
                                    icon="material-symbols:play-circle-outline"
                                    data-preview={e.preview.href}
                                    onClick={handleClick}
                                />
                            </td>
                            <td>
                                <a href={e.download.href}>
                                    <Icon icon="material-symbols:cloud-download-outline" />
                                </a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <audio className="bash__audio" ref={audio}>
                <source type="audio/wav" ref={source} />
            </audio>
        </section>
    );
}

export default Bash;
