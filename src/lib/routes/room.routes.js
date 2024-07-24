import express from 'express';

const roomRoutes = express.Router();

const getError = error => {
	return {
		status: 404,
		error: error.message
	};
};

roomRoutes.get('/participants/:roomName', async (req, res, _next) => {
	const roomService = req.roomService;

	try {
		const participants = await roomService.listParticipants(req.params.roomName);
		res.send(participants);
	} catch (err) {
		const { error, status } = getError(err);
		res.status(status).send({ msg: 'Failed to list participants', error });
	}
});

roomRoutes.get('/', async (req, res, _next) => {
	const roomService = req.roomService;

	try {
		const rooms = await roomService.listRooms();
		res.send(rooms);
	} catch (err) {
		const { error, status } = getError(err);
		res.status(status).send({ msg: 'Failed to list rooms', error });
	}
});

roomRoutes.post('/', async (req, res, _next) => {
	const roomService = req.roomService;

	try {
		const room = await roomService.createRoom({
			name: req.body.data.roomName,
			emptyTimeout: 1
		});

		res.send({ room });
	} catch (err) {
		const { error, status } = getError(err);
		res.status(status).send({ msg: 'Failed to create room', error });
	}
});

roomRoutes.delete('/', async (req, res, _next) => {
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
