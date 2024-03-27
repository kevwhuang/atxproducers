'use strict';

import axios from 'axios';

async function handler(e) {
    try {
        const res = await axios.post(`${process.env.NETLIFY_BASE}/submissions`, { source: e.body });
        if (res.data !== e.body) throw Error;
        return { body: JSON.stringify(res.data), statusCode: 200 };
    } catch {
        return { body: '[]', statusCode: 200 };
    }
}

export { handler };
