import express, { NextFunction, Request, Response } from 'express';

const webhookRoutes = express.Router();

webhookRoutes.post('/', async (req: Request<any, any, any>, res: Response, _next: NextFunction) => {
	try {
		const event = req.receiver.receive(req.body, req.get('Authorization'));
		console.log('Received event', event.event);
	} catch (error) {
		console.log('Error receiving webhook', error);
	}
});

export { webhookRoutes };
