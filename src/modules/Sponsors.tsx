import React from 'react';

import capitalFactory from '../assets/sponsor_capital_factory.png';

import '../styles/modules/Sponsors.scss';

function Sponsors(): React.ReactElement {
    return (
        <section className="sponsors">
            <div
                className="sponsors__sponsor"
                style={{ backgroundImage: `url(${capitalFactory})` }}
            />
        </section>
    );
}

export default Sponsors;
