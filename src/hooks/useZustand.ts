'use strict';

import { create } from 'zustand';

const initialize: ZustandState = {
    module: 'submissions',
};

const useZustand = create<ZustandState & ZustandActions>(set => ({
    ...initialize,
    changeModule: module => set(() => ({ module })),
}));

export default useZustand;
