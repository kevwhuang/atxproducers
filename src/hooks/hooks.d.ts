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
