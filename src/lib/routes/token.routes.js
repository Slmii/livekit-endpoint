import express from 'express';
import { AccessToken } from 'livekit-server-sdk';

const tokenRoutes = express.Router();

tokenRoutes.get('/:roomName/:participantName', async (req, res, _next) => {
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

	const token = await accessToken.toJwt();
	res.send({ token });
});

export { tokenRoutes };
