import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import '../styles/modules/Bash.scss';

function Bash(): React.ReactElement {
    const [resources, setResources] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getResources');
            for (const e of res.data) {
                e.preview = new URL(e.preview || import.meta.env.VITE_DEFAULT_RESOURCE_PREVIEW);
                e.download = new URL(e.download || import.meta.env.VITE_DEFAULT_RESOURCE_DOWNLOAD);
            }
            res.data.sort((a: Resource, b: Resource) => a.id - b.id);
            setResources(res.data);
        }());
    }, []);

    function capitalize(str: string): string {
        return str[0].toUpperCase() + str.slice(1);
    }

    return (
        <section className="bash">
            {resources.map((e: Resource) => (
                <article className="bash__resource" key={uuid()}>
                    <p>{e.id}</p>
                    <a href={e.preview.href} target="_blank">Preview</a>
                    <p>{e.name}</p>
                    <p>{capitalize(e.type)}</p>
                    <p>{capitalize(e.difficulty)}</p>
                    <a href={e.download.href} target="_blank">Download</a>
                </article>
            ))}
        </section>
    );
}

export default Bash;
