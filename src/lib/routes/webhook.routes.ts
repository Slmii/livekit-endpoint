import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { WebhookEvent } from 'livekit-server-sdk';

const webhookRoutes = express.Router();

webhookRoutes.post('/', async (req: Request<any, any, any>, res: Response, _next: NextFunction) => {
	try {
		const authToken = req.get('Authorization');

		if (!authToken) {
			return res.status(401).send('Unauthorized');
		}

		jwt.verify(authToken, process.env.LIVEKIT_API_SECRET as string);

		const event = JSON.parse(req.body.toString()) as WebhookEvent;

		// const event = req.receiver.receive(req.body, req.get('Authorization'));
		console.log('Received event', event.event);
	} catch (error) {
		console.log('Error receiving webhook', error);
	}
});

export { webhookRoutes };
