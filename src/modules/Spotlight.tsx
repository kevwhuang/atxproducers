import React from 'react';
import axios from 'axios';

import links from '../assets/links.json';

import '../styles/modules/Spotlight.scss';

function Spotlight(): React.ReactElement {
    const [feature, setFeature]: FeatureType = React.useState({});

    React.useEffect(() => {
        (async function () {
            const res = await axios('.netlify/functions/getProducers');
            let producer = res.data[0];
            for (const e of res.data) {
                if (e.spotlight > producer.spotlight) producer = e;
            }
            producer.stream ||= links.defaultStream;
            producer.stream = new URL(producer.stream);
            producer.photo ||= links.defaultProducer;
            producer.photo = new URL(producer.photo);
            setFeature(producer);
        }());
    }, []);

    return (
        <section className="spotlight">
            <h2 className="spotlight__header">Spotlight: {feature.alias}</h2>
            <p className="spotlight__bio">{feature.bio}</p>
            <div
                className="spotlight__photo"
                style={{ backgroundImage: `url(${feature.photo?.href})` }}
            />
            <a className="spotlight__stream" href={feature.stream?.href}>Listen</a>
        </section>
    );
}

export default Spotlight;
