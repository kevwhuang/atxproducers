import React from 'react';
import axios from 'axios';

import '../styles/modules/Spotlight.scss';

function Spotlight(): React.ReactElement {
    const [feature, setFeature]: [Partial<Producer>, React.Dispatch<React.SetStateAction<Producer>>]
        = React.useState({});

    React.useEffect(() => {
        (async function () {
            const res = await axios('/.netlify/functions/getProducers');
            let producer, max = '';
            for (const e of res.data) {
                if (e.spotlight < max) continue;
                producer = e;
                max = e.spotlight;
            }
            producer.stream = new URL(producer.stream);
            producer.photo = new URL(producer.photo);
            setFeature(producer);
        }());
    }, []);

    return (
        <section className="spotlight">
            <p>Spotlight</p>
            <p>{feature.alias}</p>
            <p>{feature.name}</p>
            <p>{feature.bio}</p>
            <p>{feature.credits?.join(', ')}</p>
            <a href={feature.stream?.href} target="_blank">Listen</a>
            <img
                src={feature.photo?.href || import.meta.env.VITE_DEFAULT_PRODUCER_PHOTO}
                alt={feature.name}
            />
        </section>
    );
}

export default Spotlight;
