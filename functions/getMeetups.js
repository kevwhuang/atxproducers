'use strict';

import axios from 'axios';

async function handler(event) {
    if (event.httpMethod !== 'GET') return { statusCode: 400 };
    const res = await axios(`${process.env.NETLIFY_BASE}/meetups`);
    return { body: JSON.stringify(res.data), statusCode: 200 };
}

export { handler };
