class Endpoint {
	
	socket: WebSocket;
	
	private onMessage: <Input>(message: Input) => void;
	private onError: (evt: Event) => void;
	
	private queuedMessages = <any[]>[];

	constructor(options: Endpoint.Options) {

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
		if (this.socket.readyState !== WebSocket.OPEN) {
			this.queuedMessages.push(message);
		} else {
			this.socket.send(JSON.stringify(message));
		}
	}

	close() {
		this.socket.close();
	}
}

module Endpoint {
	export interface Options {
		url: string;
		onMessage: <Input>(message: Input) => void;
		onError: (evt: Event) => void;
	}
}

export default Endpoint;