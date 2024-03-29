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
    if (!(e.target instanceof SVGElement)) return;
    if (e.target.classList.contains('marked')) e.target.classList.remove('marked');
    else e.target.classList.add('marked');
}

function Feedback(): React.ReactElement {
    const { data: submissions, loading, mutate } = useAxios({ endpoint: 'getSubmissions' });

    React.useEffect(() => {
        mutate([]);
    }, []);

    return (
        <section className="feedback">
            {!loading && submissions.map((e: Submission) => (
                <div className="feedback__submissions" key={uuid()}>
                    <p>{e.id}</p>
                    <p>{e.producer}</p>
                    <p>{e.title}</p>
                    <a href={e.stream.href} target="_blank"><PlayCircleOutlineIcon /></a>
                    {checkAuth() && <CheckCircleOutlineIcon onClick={handleClick} />}
                </div>
            ))}
        </section>
    );
}

export default Feedback;
