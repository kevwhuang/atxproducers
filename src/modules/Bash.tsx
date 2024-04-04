import React from 'react';
import axios from 'axios';
import { Icon } from '@iconify/react';
import { v4 as uuid } from 'uuid';

import { capitalizeResource } from '../utilities';

import links from '../assets/links.json';

import '../styles/modules/Bash.scss';

function Bash(): React.ReactElement {
    const [resources, setResources] = React.useState([]);

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
                                <a href={e.preview.href}>
                                    <Icon icon="material-symbols:play-circle-outline" />
                                </a>
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
        </section>
    );
}

export default Bash;
