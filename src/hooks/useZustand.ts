import { create } from 'zustand';

const initialize: ZustandState = {
    module: 'submissions',
    producers: {
        services: {
            production: false,
            beatmaking: false,
            musician: false,
            singing: false,
            songwriting: false,
            recording: false,
            mixing: false,
            mastering: false,
            post: false,
            editing: false,
            synthesis: false,
            live: false,
            teaching: false,
        },
        workstations: {
            protools: false,
            ableton: false,
            flstudio: false,
            logic: false,
            garageband: false,
            reaper: false,
            reason: false,
            cubase: false,
            studioone: false,
        },
        genres: {
            electronic: false,
            dance: false,
            hiphop: false,
            rnb: false,
            pop: false,
            indie: false,
            rock: false,
        },
        instruments: {
            hardware: false,
            vocals: false,
            guitar: false,
            keys: false,
            drums: false,
            brass: false,
            strings: false,
            woodwinds: false,
        },
    },
    sort: {
        alias: false,
        name: false,
        prev: true,
    },
    events: {
        past: false,
        upcoming: true,
        future: false,
    },
};

const useZustand = create<ZustandActions & ZustandState>(set => ({
    changeModule: module => set(() => ({ module })),
    updateProducers: producers => set(() => ({ producers })),
    updateSort: sort => set(() => ({ sort })),
    updateEvents: events => set(() => ({ events })),
    ...initialize,
}));

export default useZustand;
