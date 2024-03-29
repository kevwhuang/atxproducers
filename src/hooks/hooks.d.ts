interface ZustandActions {
    changeModule: (module: string) => void;
    updateFilter: (filter: ZustandStateFilter) => void;
    updateSort: (sort: ZustandStateSort) => void;
}

interface ZustandState {
    filter: ZustandStateFilter;
    module: string;
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
