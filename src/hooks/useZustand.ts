'use strict';

import { create } from 'zustand';

const initialize: ZustandState = {
    module: 'submissions',
    filter: {
        genres: {
            acoustic: false,
            dance: false,
            electronic: false,
            hiphop: false,
            indie: false,
            pop: false,
            rnb: false,
            rock: false,
        },
        instruments: {
            brass: false,
            guitar: false,
            hardware: false,
            keys: false,
            percussions: false,
            strings: false,
            vocals: false,
        },
        services: {
            beatmaking: false,
            editing: false,
            live: false,
            mastering: false,
            mixing: false,
            musician: false,
            post: false,
            production: false,
            recording: false,
            singing: false,
            songwriting: false,
            synthesis: false,
        },
        workstations: {
            ableton: false,
            fl: false,
            logic: false,
            protools: false,
            reaper: false,
            reason: false,
        },
    },
    sort: {
        alias: false,
        name: false,
        prev: true,
    },
};

const useZustand = create<ZustandActions & ZustandState>(set => ({
    changeModule: module => set(() => ({ module })),
    updateFilter: filter => set(() => ({ filter })),
    updateSort: sort => set(() => ({ sort })),
    ...initialize,
}));

export default useZustand;
