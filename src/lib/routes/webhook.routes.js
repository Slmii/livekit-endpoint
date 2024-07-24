import express from 'express';

const webhookRoutes = express.Router();

webhookRoutes.post('/', async (req, res, _next) => {
	try {
		const event = await req.receiver.receive(req.body, req.get('Authorization'));
		console.log('Received event', event.event);

		res.status(200).send('Received');
	} catch (error) {
		console.log('Error receiving webhook', error);
		res.status(500).send(error.message);
	}
});

export { webhookRoutes };
