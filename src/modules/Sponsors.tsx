import React from 'react';

import capital_factory from '../assets/images/sponsor_capital_factory.png';

import '../styles/modules/Sponsors.scss';

function Sponsors(): React.ReactElement {
    return (
        <section className="sponsors">
            <div
                className="sponsors__single"
                style={{ backgroundImage: `url(${capital_factory})` }}
            />
        </section>
    );
}

export default Sponsors;
