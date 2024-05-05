import React from 'react';
import { Icon } from '@iconify/react';
import { v4 as uuid } from 'uuid';

import useAxios from '../hooks/useAxios';
import { checkAuth } from '../utilities';
import type { Submission } from '../types/global';

import '../styles/modules/Feedback.scss';

function Feedback(): React.ReactElement {
    const { data: submissions, loading, mutate } = useAxios({ endpoint: 'getSubmissions' });

    function handleClick(e: React.MouseEvent): void {
        if (!(e.currentTarget instanceof SVGElement)) return;
        const classes = e.currentTarget.classList;
        if (classes.contains('marked')) classes.remove('marked');
        else (classes.add('marked'));
    }

    React.useEffect(() => {
        mutate([]);
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
                    {!loading && submissions.map((e: Submission) => (
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
