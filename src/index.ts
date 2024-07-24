import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { RoomServiceClient, WebhookReceiver } from 'livekit-server-sdk';
import { roomRoutes, tokenRoutes, webhookRoutes } from 'lib/routes';

dotenv.config();
const app: Express = express();

const API_KEY = process.env.LIVEKIT_API_KEY as string;
const API_SECRET = process.env.LIVEKIT_API_SECRET as string;

const receiver = new WebhookReceiver(API_KEY, API_SECRET);
const roomService = new RoomServiceClient(process.env.LIVEKIT_HOST as string, API_KEY, API_SECRET);
const port = process.env.PORT || 3000;

app.use(cors());
app.use('/webhook', express.raw({ type: 'application/webhook+json' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, _res, next) => {
	req.roomService = roomService;
	req.receiver = receiver;
	next();
});

app.use('/token', tokenRoutes);
app.use('/rooms', roomRoutes);
app.use('/webhook', webhookRoutes);

app.use('/test', (_req, res) => {
	res.status(200).json({ message: 'Success' });
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
