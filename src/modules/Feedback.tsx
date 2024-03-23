import React from 'react';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import AdminControls from '../components/AdminControls';

import '../styles/modules/Feedback.scss';

function Feedback(): React.ReactElement {
    const [submissions, setSubmissions] = React.useState([]);

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getSubmissions');
            for (const e of res.data) {
                e.stream = new URL(e.stream);
            }
            res.data.sort((a: Submission, b: Submission) => a.id - b.id);
            setSubmissions(res.data);
        }());
    }, []);

    function checkAuth() {
        return localStorage.getItem('password') === import.meta.env.VITE_PASSWORD;
    }

    return (
        <section className="feedback">
            {checkAuth() && <AdminControls />}
            {submissions.map((e: Submission) => (
                <article className="feedback__submissions" key={uuid()}>
                    <p>{e.id}</p>
                    <p>{e.producer}</p>
                    <p>{e.title}</p>
                    <a href={e.stream.href} target="_blank">Stream</a>
                </article>
            ))}
        </section>
    );
}

export default Feedback;
