'use strict';

import axios from 'axios';

async function handler(e) {
    const res = await axios.post(`${process.env.NETLIFY_BASE}/submissions`, { source: e.body });
    return { body: JSON.stringify(res.data), statusCode: 200 };
}

export { handler };
