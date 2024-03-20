'use strict';

import { create } from 'zustand';

const initialize: ZustandState = {};

const useZustand = create<ZustandState & ZustandActions>(() => ({
    ...initialize,
}));

export default useZustand;
