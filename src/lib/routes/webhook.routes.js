import express from 'express';

const webhookRoutes = express.Router();

webhookRoutes.post('/', async (req, res, _next) => {
	console.log('Received webhook', req.body, req.get('Authorization'));
	try {
		const event = await req.receiver.receive(req.body, req.get('Authorization'));
		console.log('Received event', event.event);
	} catch (error) {
		console.log('Error receiving webhook', error);
	}
});

export { webhookRoutes };
