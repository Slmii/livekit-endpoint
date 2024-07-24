import { RoomServiceClient, WebhookReceiver } from 'livekit-server-sdk';
import { Request } from 'express';

declare module 'express-serve-static-core' {
	interface Request {
		roomService: RoomServiceClient;
		receiver: WebhookReceiver;
		rawBody: string;
	}
}
