import React from 'react';
import { Helmet } from 'react-helmet-async';

import Cards from '../modules/Cards';
import Filter from '../modules/Filter';

function Producers(): React.ReactElement {
    return (
        <main id="producers">
            <div style={{ height: '50px' }}></div>
            <Filter />
            <Cards />
            <Helmet>
                <title>ATX PRODUCERS | PRODUCERS</title>
            </Helmet>
        </main>
    );
}

export default Producers;
