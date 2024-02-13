'use strict';

import { create } from 'zustand';

const initialize: State = {};

const useZustand = create<Actions & State>(set => ({
    ...initialize,
}));

export default useZustand;
