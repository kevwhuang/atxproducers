interface ZustandActions {
    changeModule: (module: string) => void;
    updateProducers: (filter: ZustandStateProducers) => void;
    updateSort: (sort: ZustandStateSort) => void;
    updateEvents: (events: ZustandStateEvents) => void;
}

interface ZustandState {
    module: string;
    producers: ZustandStateProducers;
    sort: ZustandStateSort;
    events: ZustandStateEvents;
}

interface ZustandStateEvents {
    past: boolean;
    upcoming: boolean;
    future: boolean;
}

interface ZustandStateProducers {
    services: { [key: string]: boolean };
    workstations: { [key: string]: boolean };
    genres: { [key: string]: boolean };
    instruments: { [key: string]: boolean };
}

interface ZustandStateSort {
    alias: boolean;
    name: boolean;
    prev: boolean;
}
