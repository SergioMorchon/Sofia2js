class Endpoint<Input, Output> {
	
	socket: WebSocket;
	
	private onMessage: (message: Input) => void;
	private onError: (evt: Event) => void;

	constructor(options: Endpoint.Options<Input, Output>) {

		this.onMessage = options.onMessage;
		this.onError = options.onError;
		this.socket = new WebSocket(options.url);
		this.socket.onerror = evt => {
			this.onError(evt);
		};
		this.socket.onmessage = evt => {
			this.onMessage(JSON.parse(evt.data));
		};
	}
	
	send(message: Output) {
		this.socket.send(JSON.stringify(message));
	}

	close() {
		this.socket.close();
	}
}

module Endpoint {
	export interface Options<Input, Output> {
		url: string;
		onMessage: (message: Input) => void;
		onError: (evt: Event) => void;
	}
}

export default Endpoint;