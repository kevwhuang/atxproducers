import { Icon } from '@iconify/react';
import React from 'react';
import { v4 as uuid } from 'uuid';

import { type Submission } from '../../types';
import checkAuth from '../../functions/checkAuth';

import '../../styles/modules/live/Feedback.scss';

function Feedback(): React.ReactElement {
    function handleClick(e: React.MouseEvent): void {
        if (!(e.currentTarget instanceof SVGElement)) return;
        const classes = e.currentTarget.classList;
        if (classes.contains('marked')) classes.remove('marked');
        else (classes.add('marked'));
    }

    const [submissions, setSubmissions]: FeatureType = React.useState({});

    React.useEffect(() => {
        (async function () {
            const res = await fetch('https://aephonics.onrender.com/atxproducers/v1/submissions');
            const data = await res.json();
            setSubmissions(data);
        }());
    }, []);

    return (
        <section className="feedback">
            <table className="feedback__table">
                <thead>
                    {submissions?.length > 0 &&
                        <tr className={checkAuth() ? 'admin' : ''}>
                            <th />
                            <th>Producer</th>
                            <th>Title</th>
                        </tr>
                    }
                </thead>
                <tbody>
                    {submissions.map((e: Submission) => (
                        <tr key={uuid()}>
                            <td>{e.id}</td>
                            <td>{e.producer}</td>
                            <td>{e.title}</td>
                            <td>
                                <a href={e.stream.href}>
                                    <Icon icon="material-symbols:play-circle-outline" />
                                </a>
                            </td>
                            {checkAuth() &&
                                <td>
                                    <Icon
                                        icon="material-symbols:check-circle-outline"
                                        onClick={handleClick}
                                    />
                                </td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Feedback;
