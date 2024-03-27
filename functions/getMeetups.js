'use strict';

import axios from 'axios';

async function handler(_) {
    try {
        const res = await axios(`${process.env.NETLIFY_BASE}/meetups`);
        if (typeof res.data === 'string') throw Error;
        return { body: JSON.stringify(res.data), statusCode: 200 };
    } catch {
        return { body: '[]', statusCode: 200 };
    }
}

export { handler };
