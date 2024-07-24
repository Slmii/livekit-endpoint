import express, { NextFunction, Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';

const webhookRoutes = express.Router();

webhookRoutes.post('/', async (req: Request<any, any, any>, res: Response, _next: NextFunction) => {
	try {
		const authToken = req.get('Authorization');
		if (!authToken) {
			return res.status(401).send({ msg: 'Unauthorized' });
		}

		const payload = jwtDecode(authToken);

		if (payload.exp) {
			const expiry = new Date(payload.exp * 1000);
			if (expiry < new Date()) {
				return res.status(401).send({ msg: 'Unauthorized' });
			}
		}

		const event = req.body.toString();
		console.log('Received event', event);
	} catch (error) {
		console.log('Error receiving webhook', error);
	}
});

export { webhookRoutes };
