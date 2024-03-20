import React from 'react';

import Cards from '../modules/Cards';
import Filter from '../modules/Filter';

function Producers(): React.ReactElement {
    return (
        <main id="producers">
            <Filter />
            <Cards />
        </main>
    );
}

export default Producers;
