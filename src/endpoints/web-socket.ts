/// <reference path="endpoint" />

import Endpoint from "./endpoint";

class WSEndpoint implements Endpoint {
	
	socket: WebSocket;
	
	private onMessage: <Input>(message: Input) => void;
	private onError: (evt: Event) => void;
	
	private queuedMessages = <any[]>[];

	constructor(options: WSEndpoint.Options) {
		this.onMessage = options.onMessage;
		this.onError = options.onError;
		this.socket = new WebSocket(options.url);
		this.socket.onerror = evt => {
			this.onError(evt);
		};
		this.socket.onmessage = evt => {
			this.onMessage(JSON.parse(evt.data));
		};
		this.socket.onopen = () => {
			for (let message of this.queuedMessages) {
				this.send(message);
			}
		};
	}
	
	send<Output>(message: Output) {
		return new Promise<void>(resolve => {
			if (this.socket.readyState !== WebSocket.OPEN) {
				this.queuedMessages.push(message);
			} else {
				this.socket.send(JSON.stringify(message));
			}
			resolve();
		});
	}

	close() {
		this.socket.close();
	}
}

module WSEndpoint {
	
	export const IS_SUPPORTED = typeof WebSocket !== "undefined";
	
	export const ENDPOINT_TYPE = "ws";
	
	export interface Options extends Endpoint.Options {
	}
}

export default WSEndpoint;