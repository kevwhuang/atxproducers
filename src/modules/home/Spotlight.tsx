import React from 'react';

import links from '../../assets/texts/links.json';

import '../../styles/modules/home/Spotlight.scss';

function Spotlight(): React.ReactElement {
    const [feature, setFeature]: FeatureType = React.useState({});

    React.useEffect(() => {
        (async function () {
            const res = await fetch('https://aephonics.onrender.com/atxproducers/v1/producers');
            const data = await res.json();
            let producer = data[0];

            for (const e of data) {
                if (e.spotlight > producer.spotlight) producer = e;
            }

            producer.stream ||= links.defaultStream;
            producer.stream = new URL(producer.stream);
            producer.photo ||= links.imageSpotlight;
            producer.photo = producer.photo.replaceAll('150', '1000');
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
