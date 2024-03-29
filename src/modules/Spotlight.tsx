import React from 'react';
import axios from 'axios';

import '../styles/modules/Spotlight.scss';

type MyFeature = [Partial<Producer>, React.Dispatch<React.SetStateAction<Producer>>];

function Spotlight(): React.ReactElement {
    const [feature, setFeature]: MyFeature = React.useState({});

    React.useEffect(() => {
        (async function () {
            const res = await axios('.netlify/functions/getProducers');
            let producer = res.data[0];
            for (const e of res.data) {
                if (e.spotlight > producer.spotlight) producer = e;
            }
            producer.stream = new URL(producer.stream);
            producer.photo = new URL(producer.photo);
            setFeature(producer);
        }());
    }, []);

    return (
        <section className="spotlight">
            <h2>Spotlight: {feature.alias}</h2>
            <p>{feature.bio}</p>
            <div style={{ backgroundImage: `url(${feature.photo?.href})` }}></div>
            <a href={feature.stream?.href} target="_blank">Listen</a>
        </section>
    );
}

export default Spotlight;
