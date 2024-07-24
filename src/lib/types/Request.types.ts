import { RoomServiceClient } from 'livekit-server-sdk';

export interface IParamsDictionary {
	roomService: RoomServiceClient;
	[key: string]: string | RoomServiceClient;
}
