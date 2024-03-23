'use strict';

import axios from 'axios';

async function handler(_) {
    const res = await axios(`${process.env.NETLIFY_BASE}/producers`);
    return { body: JSON.stringify(res.data), statusCode: 200 };
}

export { handler };
