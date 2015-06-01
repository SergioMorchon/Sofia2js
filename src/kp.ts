/// <reference path="lib.es6.d.ts" />
/// <reference path="messages" />
/// <reference path="endpoint" />

import Endpoint from "./endpoint";
import Messages = require("./messages");

class KP {
	name: string;
	endpoint: Endpoint;
	
	private sessionKey: string;
	private url: string;
	private resolvers = <Function[]>[];
	private errorCallback: (error) => void;
	
	private onError(error: any) {
		if (this.errorCallback) {
			this.errorCallback(error);
		}
	}

	constructor(options: KP.Options) {
		this.name = name;
		this.errorCallback = options.onError;
		this.url = options.endpoint.url;
	}

	private onMessage(msg: Messages.Message<any>) {
		if (msg.direction === Messages.DirectionType.ERROR) {
			this.onError(msg);
		} else {
			if (msg.messageType === Messages.MessageType.INDICATION) {

			} else {
				this.processResponse(msg);
			}
		}
	}

	private processResponse(msg: Messages.Message<any>) {
		this.resolvers.splice(0, 1)[0](msg);
	}

	private queueResolver(resolver: Function) {
		this.resolvers.push(resolver);
	}

	join(logIn: Messages.JoinTokenBody) {
		
		this.endpoint = new Endpoint({
			url: this.url,
			onError: evt => {
				this.onError(evt);
			},
			onMessage: (msg: Messages.Message<any>) => {
				this.onMessage(msg);
			}
		});

		return new Promise<void>((resolve, reject) => {
			this.queueResolver((data: Messages.Message<any>) => {
				this.sessionKey = data.sessionKey;
				resolve();
			});
			this.endpoint.send<Messages.JoinMessage>({
				direction: Messages.DirectionType.REQUEST,
				body: logIn,
				messageType: Messages.MessageType.JOIN,
				sessionKey: null
			});
		});
	}

	leave() {

		return new Promise<void>((resolve, reject) => {

			let msg: Messages.LeaveMessage = {
				direction: Messages.DirectionType.REQUEST,
				sessionKey: this.sessionKey,
				body: null,
				messageType: Messages.MessageType.LEAVE
			};

			this.queueResolver(resolve);
			this.endpoint.send(msg);
		});
	}

	insert<Ontology>() {
		return this;
	}

	dispose() {
		this.endpoint.close();
	}
}

module KP {
	export interface Options {
		name: string;
		onError: (error) => void;
		endpoint: {
			url: string;
		}
	}
}

export default KP;