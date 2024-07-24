import express, { NextFunction, Request, Response } from 'express';
import { AccessToken } from 'livekit-server-sdk';

const tokenRoutes = express.Router();

interface Token {
	roomName: string;
	participantName: string;
}

tokenRoutes.get('/:roomName/:participantName', (req: Request<Token, any, any>, res: Response, _next: NextFunction) => {
	const accessToken = new AccessToken(process.env.LIVEKIT_API_KEY, process.env.LIVEKIT_API_SECRET, {
		identity: req.params.participantName,
		name: req.params.participantName,
		ttl: '30m'
	});

	accessToken.addGrant({
		room: req.params.roomName,
		roomJoin: true,
		// roomAdmin: true,
		canSubscribe: true,
		canPublish: true,
		canPublishData: true
	});

	const token = accessToken.toJwt();
	res.send({ token });
});

export { tokenRoutes };
