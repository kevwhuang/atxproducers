import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import links from '../assets/links.json';

import '../styles/modules/Bash.scss';

function capitalize(str: string): string {
    switch (str) {
        case 'one shot': return 'One Shot';
        case 'midi': return 'MIDI';
        default: return str[0]!.toUpperCase() + str.slice(1);
    }
}

function Bash(): React.ReactElement {
    const [resources, setResources] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getResources');
            for (const e of res.data) {
                e.preview ||= links.defaultStream;
                e.preview = new URL(e.preview);
                e.download || -links.defaultDownload;
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
                    <tr>
                        <th />
                        <th>Type</th>
                        <th>Name</th>
                        <th>Difficulty</th>
                    </tr>
                </thead>
                <tbody>
                    {resources.map((e: Resource) => (
                        <tr key={uuid()}>
                            <td>{e.id}</td>
                            <td>{capitalize(e.type)}</td>
                            <td>{e.name}</td>
                            <td className={e.difficulty}>{capitalize(e.difficulty)}</td>
                            <td><a href={e.preview.href} ><PlayCircleOutlineIcon /></a></td>
                            <td><a href={e.download.href} ><CloudDownloadOutlinedIcon /></a></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Bash;
