'use strict';

interface Meetup {
    id: number;
    date: Date;
    duration: number;
    title: string;
    speaker: string;
    description: string;
    location: string;
    address: string;
    image: URL;
}

interface Producer {
    alias: string;
    name: string;
    bio: string;
    credits: string[];
    photo: URL;
    stream: URL;
    speaker: boolean;
    admin: boolean;
    spotlight: Date;
    socials: {
        website: URL;
        tree: URL;
        instagram: URL;
        tiktok: URL;
        spotify: URL;
        soundcloud: URL;
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
    workstations: {
        ableton: boolean;
        fl: boolean;
        logic: boolean;
        reaper: boolean;
        reason: boolean;
        protools: boolean;
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
}

interface Resource {
    id: number;
    name: string;
    type: 'One Shot' | 'Loop' | 'Patch' | 'MIDI';
    difficulty: 'Easy' | 'Normal' | 'Hard';
    preview: URL;
    active: boolean;
}

interface Submission {
    id: number;
    producer: string;
    title: string;
    stream: URL;
    active: boolean;
}

interface ZustandActions {
}

interface ZustandState {
}
