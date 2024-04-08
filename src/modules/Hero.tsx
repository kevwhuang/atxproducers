import React from 'react';

import Particles, { initParticlesEngine } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { type ISourceOptions } from '@tsparticles/engine';

import links from '../assets/links.json';

import '../styles/modules/Hero.scss';

const options: ISourceOptions = {
    fullScreen: false,
    fpsLimit: 120,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push',
            },
            onHover: {
                enable: true,
                mode: 'repulse',
            },
        },
        modes: {
            push: {
                quantity: 2,
            },
            repulse: {
                distance: 100,
                duration: .5,
            },
        },
    },
    particles: {
        color: {
            value: '#f3f4f5',
        },
        links: {
            enable: true,
            distance: 100,
            opacity: .1,
            width: .5,
            color: '#f3f4f5',
        },
        move: {
            enable: true,
            random: true,
            speed: .5,
            direction: 'none',
        },
        number: {
            value: 50,
            density: {
                enable: true,
            },
        },
        opacity: {
            value: .1,
        },
        shape: {
            type: 'polygon',
        },
        size: {
            value: {
                min: 1,
                max: 4,
            },
        },
    },
};

function Hero(): React.ReactElement {
    const [init, setInit] = React.useState(false);

    React.useEffect(() => {
        initParticlesEngine(async engine => {
            await loadSlim(engine);
            setInit(true);
        });
    }, []);

    return (
        <header className="hero" style={{ backgroundImage: `url(${links.imageHero})` }}>
            {init &&
                <Particles
                    id="tsparticles"
                    className="hero__particles"
                    options={options}
                />
            }
            <h1 className="hero__header" >Austin Producer Alliance</h1>
        </header>
    );
}

export default Hero;
