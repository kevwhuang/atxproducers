import React from 'react';

import Cards from '../modules/producers/Cards';
import Filter from '../modules/producers/Filter';

import '../styles/pages/Producers.scss';

function Producers(): React.ReactElement {
    scroll(0, 0);

    return (
        <main id="producers">
            <title>Producers | APA</title>
            <Filter />
            <Cards />
        </main>
    );
}

export default Producers;
