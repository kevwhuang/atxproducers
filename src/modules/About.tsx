import React from 'react';

import texts from '../assets/texts.json';

import '../styles/modules/About.scss';

function About(): React.ReactElement {
    return (
        <section className="about">
            <h2>Who We Are</h2>
            <p>{texts.about}</p>
        </section>
    );
}

export default About;
