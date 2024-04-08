import React from 'react';

import links from '../assets/links.json';
import texts from '../assets/texts.json';

import '../styles/modules/Introduction.scss';

function Introduction(): React.ReactElement {
    return (
        <section className="introduction">
            <h2 className="introduction__header">Austin Producer Alliance</h2>
            <p className="introduction__content">{texts.summary}</p>
            <h2 className="introduction__header">Sponsors</h2>
            <div className="introduction__sponsors">
                <span>{texts.sponsorCapitalFactory}</span>
                &nbsp;
                <a href={links.capitalFactory}>click here</a>
                <span>.</span>
            </div>
        </section>
    );
}

export default Introduction;
