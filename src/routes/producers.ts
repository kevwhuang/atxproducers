import express from 'express';
import Producer from '../types/Producer';

const router = express.Router();

router.get('/producers', async (req, res) => {
    try {
        const alias = req.query.alias;
        const producer = await Producer.findOne({ alias: alias });
        if (!producer) {
            return res.status(404).send('Producer not found');
        }
        res.json(producer);
    } catch (error) {
        console.error('Error fetching producer data:', error);
        res.status(500).send('Error fetching producer data');
    }
});

export default router;
