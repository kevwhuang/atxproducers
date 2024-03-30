import React from 'react';
import { Helmet } from 'react-helmet-async';

import Cards from '../modules/Cards';
import Filter from '../modules/Filter';

function Producers(): React.ReactElement {
    return (
        <main id="producers">
            <Filter />
            <Cards />
            <Helmet>
                <title>APA | Producers</title>
            </Helmet>
        </main>
    );
}

export default Producers;
