import React from 'react';

import texts from '../assets/texts.json';

import '../styles/modules/Summary.scss';

function Summary(): React.ReactElement {
    return (
        <section className="summary">
            <h2 className="summary__header">Who We Are</h2>
            <p className="summary__content">{texts.summary}</p>
        </section>
    );
}

export default Summary;
