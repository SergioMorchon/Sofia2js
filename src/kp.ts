/// <reference path="lib.es6.d.ts" />
/// <reference path="messages" />
/// <reference path="endpoint" />

import Endpoint from "./endpoint";
import Messages = require("./messages");

class KP {
	name: string;
	endpoint: Endpoint<Messages.Message<any>, Messages.Message<any>>;
	private sessionKey: string;

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
		this.endpoint = new Endpoint<Messages.Message<any>, Messages.Message<any>>({
			url: options.endpoint.url,
			onError: evt => {
				this.onError(evt);
			},
			onMessage: msg => {
				this.onMessage(msg);
			}
		});
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

		return new Promise<void>((resolve, reject) => {

			let msg: Messages.JoinMessage = {
				direction: Messages.DirectionType.REQUEST,
				body: logIn,
				messageType: Messages.MessageType.JOIN,
				sessionKey: null
			};

			this.queueResolver((data: Messages.Message<any>) => {
				this.sessionKey = data.sessionKey;
				resolve();
			});
			this.endpoint.send(msg);
		});
	}

	leave() {

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