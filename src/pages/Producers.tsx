import React from 'react';
import { Helmet } from 'react-helmet-async';

import Cards from '../modules/Cards';
import FilterProducers from '../modules/FilterProducers';

function Producers(): React.ReactElement {
    return (
        <main id="producers">
            <FilterProducers />
            <Cards />
            <Helmet>
                <title>APA | Producers</title>
            </Helmet>
        </main>
    );
}

export default Producers;
