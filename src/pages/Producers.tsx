import React, { useEffect, useState } from 'react';
import { Producer } from '../types/Producer';

function Producers(): React.ReactElement {
    const [producer, setProducer] = useState<Producer | null>(null);

    useEffect(() => {
        const fetchProducerData = async () => {
            try {
                // TODO: Add way to specify producer name
                const response = await fetch('http://localhost:5000/producers/J%20Dilla');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data: Producer = await response.json();
                console.log("Fetched producer data:", data);
                setProducer(data);
            } catch (error) {
                console.error('There was an error fetching the producer data:', error);
            }
        };

        fetchProducerData();
    }, []);

    if (!producer) {
        return <div>Loading...</div>;
    }

    return (
        <main id="producers">
            <p>{producer.name}</p>
            <p>{producer.alias}</p>
            <p>{producer.description}</p>
            <img src={producer.photo} alt={producer.name} />
            <p>Genres: {producer.genres.join(', ')}</p>
            <p>Workstations: {producer.workstations.join(', ')}</p>
            <p>Instruments: {producer.instruments.join(', ')}</p>
            <div>
                    <h3>Links:</h3>
                    <ul>
                        {producer.links && Object.entries(producer.links).map(([key, value]) => (
                            value ? <li key={key}><a href={value.toString()}>{key}</a></li> : null
                        ))}
                </ul>
            </div>
        </main>
    );
}

export default Producers;
