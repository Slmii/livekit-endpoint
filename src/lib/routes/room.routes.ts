import express, { NextFunction, Request, Response } from 'express';

const roomRoutes = express.Router();

interface RoomName {
	roomName: string;
}

const getError = (error: unknown) => {
	const { response } = error as { response: { status: number; statusText: string } };

	return {
		status: response.status,
		error: response.statusText
	};
};

roomRoutes.get(
	'/participants/:roomName',
	async (req: Request<RoomName, any, any>, res: Response, _next: NextFunction) => {
		const roomService = req.roomService;

		try {
			const participants = await roomService.listParticipants(req.params.roomName);
			res.send(participants);
		} catch (err) {
			const { error, status } = getError(err);
			res.status(status).send({ msg: 'Failed to list participants', error });
		}
	}
);

roomRoutes.delete('/', async (req: Request<any, any, RoomName>, res: Response, _next: NextFunction) => {
	const roomService = req.roomService;

	try {
		await roomService.deleteRoom(req.body.roomName);
	} catch (err) {
		const { error, status } = getError(err);
		return res.status(status).send({ msg: 'Failed to delete room', error });
	}

	res.send({ success: true });
});

export { roomRoutes };
