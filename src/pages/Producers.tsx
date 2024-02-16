import React from 'react';
import { Producer } from '../types/Producer';

// Dummy producer record for testing...
// TODO: remove when API and tests are ready.
const jDilla: Producer = {
    admin: false,
    featured: true,
    speaker: false,
    alias: "J Dilla",
    description: "James Dewitt Yancey, better known by his stage names J Dilla and Jay Dee, was an American record producer and rapper who emerged from the mid-1990s underground hip-hop scene in Detroit, Michigan. J Dilla's beats were known for their off-kilter drum patterns, innovative sampling, and soulful vibe. He has influenced a wide range of artists and producers in the hip-hop and neo-soul genres.",
    name: "James Dewitt Yancey",
    photo: "https://upload.wikimedia.org/wikipedia/en/e/ed/J_Dilla_James_Yancy.jpg",
    genres: ["Hip Hop", "Neo-Soul"],
    instruments: ["MPC", "Synthesizer", "Turntables"],
    links: {
      spotify: "https://open.spotify.com/artist/JDilla",
      instagram: "https://www.instagram.com/officialjdilla/",
      soundcloud: "https://soundcloud.com/jdilla",
    },
    workstations: ["Akai MPC"],
  };
  

function Producers(): React.ReactElement {
    return (
        <main id="producers">
            <p>{jDilla.name}</p>
            <p>{jDilla.alias}</p>
            <p>{jDilla.description}</p>
            <img src={jDilla.photo} alt={jDilla.name} />
            <p>Genres: {jDilla.genres.join(', ')}</p>
            <p>Workstations: {jDilla.workstations.join(', ')}</p>
            <p>Instruments: {jDilla.instruments.join(', ')}</p>
            <div>
                <h3>Links:</h3>
                <ul>
                  {Object.entries(jDilla.links).map(([key, value]) => (
                    value ? <li key={key}><a href={value}>{key}</a></li> : null
                  ))}
              </ul>
            </div>
        </main>
    );
}

export default Producers;
