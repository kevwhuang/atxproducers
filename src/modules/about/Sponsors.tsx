import React from 'react';

import capitalFactory from '../../assets/images/capital_factory.png';

import '../../styles/modules/about/Sponsors.scss';

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
