import React from 'react';

import text from '../assets/text.json';

import '../styles/modules/About.scss';

function About(): React.ReactElement {
    return (
        <section className="about">
            <h2>Who We Are</h2>
            <p>{text.about}</p>
        </section>
    );
}

export default About;
