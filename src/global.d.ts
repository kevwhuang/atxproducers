'use strict';

interface Meetup {
    date: Date;
    duration: number;
    location: string;
    address: string;
    speaker: string;
    title: string;
    description: string;
    page: URL;
    image: URL;
}

interface Producer {
    alias: string;
    name: string;
    bio: string;
    credits: string[];
    stream: URL;
    photo: URL;
    speaker: boolean;
    admin: boolean;
    spotlight: Date;
    socials: {
        website?: URL;
        tree?: URL;
        instagram?: URL;
        tiktok?: URL;
        spotify?: URL;
        soundcloud?: URL;
        youtube?: URL;
    };
    services: {
        production: boolean;
        beatmaking: boolean;
        songwriting: boolean;
        singing: boolean;
        musician: boolean;
        recording: boolean;
        mixing: boolean;
        mastering: boolean;
        post: boolean;
        synthesis: boolean;
        editing: boolean;
        live: boolean;
    };
    genres: {
        electronic: boolean;
        dance: boolean;
        hiphop: boolean;
        rnb: boolean;
        pop: boolean;
        indie: boolean;
        rock: boolean;
        acoustic: boolean;
    };
    instruments: {
        hardware: boolean;
        vocals: boolean;
        guitar: boolean;
        keys: boolean;
        percussions: boolean;
        strings: boolean;
        brass: boolean;
    };
    workstations: {
        ableton: boolean;
        fl: boolean;
        logic: boolean;
        reaper: boolean;
        reason: boolean;
        protools: boolean;
    };
}

interface PropsTag {
    group: string;
    label: string;
    tag: string;
}

interface Resource {
    id: number;
    preview: URL;
    name: string;
    type: 'one shot' | 'loop' | 'patch' | 'midi';
    difficulty: 'easy' | 'medium' | 'hard';
    download: URL;
}

interface Submission {
    id: number;
    producer: string;
    title: string;
    stream: URL;
}

interface ZustandActions {
    changeModule: (module: string) => void;
    updateFilter: (filter: ZustandStateFilter) => void;
    updateSort: (sort: ZustandStateSort) => void;
}

interface ZustandState {
    module: string;
    filter: ZustandStateFilter;
    sort: ZustandStateSort;
}

interface ZustandStateFilter {
    genres: { [key: string]: boolean };
    instruments: { [key: string]: boolean };
    services: { [key: string]: boolean };
    workstations: { [key: string]: boolean };
}

interface ZustandStateSort {
    alias: boolean;
    name: boolean;
    prev: boolean;
}
