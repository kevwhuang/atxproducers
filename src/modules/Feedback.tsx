import React from 'react';
import { v4 as uuid } from 'uuid';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

import useAxios from '../hooks/useAxios';

import '../styles/modules/Feedback.scss';

function checkAuth(): boolean {
    return localStorage.getItem('password') === import.meta.env['VITE_PASSWORD'];
}

function handleClick(e: React.MouseEvent): void {
    if (!(e.currentTarget instanceof SVGElement)) return;
    const classes = e.currentTarget.classList;
    if (classes.contains('marked')) classes.remove('marked');
    else (classes.add('marked'));
}

function Feedback(): React.ReactElement {
    const { data: submissions, loading, mutate } = useAxios({ endpoint: 'getSubmissions' });

    React.useEffect(() => {
        mutate([]);
    }, []);

    return (
        <section className="feedback">
            <table className="feedback__table">
                <thead>
                    <tr>
                        <th />
                        <th>Producer</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && submissions.map((e: Submission) => (
                        <tr key={uuid()}>
                            <td>{e.id}</td>
                            <td>{e.producer}</td>
                            <td>{e.title}</td>
                            <td><a href={e.stream.href} ><PlayCircleOutlineIcon /></a></td>
                            {checkAuth() &&
                                <td><CheckCircleOutlineIcon onClick={handleClick} /></td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </section>
    );
}

export default Feedback;
