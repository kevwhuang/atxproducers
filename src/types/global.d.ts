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
        tree?: URL;
        website?: URL;
        instagram?: URL;
        tiktok?: URL;
        youtube?: URL;
        spotify?: URL;
        soundcloud?: URL;
    };
    services: {
        production: boolean;
        beatmaking: boolean;
        musician: boolean;
        singing: boolean;
        songwriting: boolean;
        recording: boolean;
        mixing: boolean;
        mastering: boolean;
        post: boolean;
        editing: boolean;
        synthesis: boolean;
        live: boolean;
        teaching: boolean;
    };
    workstations: {
        protools: boolean;
        ableton: boolean;
        flstudio: boolean;
        logic: boolean;
        garageband: boolean;
        reaper: boolean;
        reason: boolean;
        cubase: boolean;
        studioone: boolean;
    };
    genres: {
        electronic: boolean;
        dance: boolean;
        hiphop: boolean;
        rnb: boolean;
        pop: boolean;
        indie: boolean;
        rock: boolean;
    };
    instruments: {
        hardware: boolean;
        vocals: boolean;
        guitar: boolean;
        keys: boolean;
        drums: boolean;
        brass: boolean;
        strings: boolean;
        woodwinds: boolean;
    };
}

interface Resource {
    id: number;
    type: 'one shot' | 'loop' | 'patch' | 'midi';
    name: string;
    difficulty: 'easy' | 'medium' | 'hard';
    preview: URL;
    download: URL;
}

interface Submission {
    id: number;
    producer: string;
    title: string;
    stream: URL;
}
