import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import CloudDownloadOutlinedIcon from '@mui/icons-material/CloudDownloadOutlined';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import '../styles/modules/Bash.scss';

function capitalize(str: string): string {
    if (str === 'one shot') return 'One Shot';
    if (str === 'midi') return 'MIDI';
    return str[0].toUpperCase() + str.slice(1);
}

function Bash(): React.ReactElement {
    const [resources, setResources] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getResources');
            for (const e of res.data) {
                e.preview = new URL(e.preview);
                e.download = new URL(e.download);
            }
            res.data.sort((a: Resource, b: Resource) => a.id - b.id);
            setResources(res.data);
        }());
    }, []);

    return (
        <section className="bash">
            {resources.map((e: Resource) => (
                <div className="bash__resource" key={uuid()}>
                    <p>{e.id}</p>
                    <p>{capitalize(e.type)}</p>
                    <p>{e.name}</p>
                    <p className={e.difficulty}>{capitalize(e.difficulty)}</p>
                    <a href={e.preview.href} target="_blank"><PlayCircleOutlineIcon /></a>
                    <a href={e.download.href} target="_blank"><CloudDownloadOutlinedIcon /></a>
                </div>
            ))}
        </section>
    );
}

export default Bash;
