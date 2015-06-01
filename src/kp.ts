/// <reference path="lib.es6.d.ts" />
/// <reference path="messages/type" />
/// <reference path="messages/message" />
/// <reference path="messages/request" />
/// <reference path="endpoint" />

import Message = require("./messages/message");
import Direction = require("./messages/direction");
import Endpoint from "./endpoint";
import Requests = require("./messages/request");

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

	private onMessage(msg: Message.Envelopment<any>) {
		if (msg.direction === Message.Direction.ERROR) {
			this.onError(msg);
		} else {
			if (msg.messageType === Message.Type.INDICATION) {

			} else {
				this.processResponse(msg);
			}
		}
	}

	private processResponse(msg: Message.Envelopment<any>) {
		this.resolvers.splice(0, 1)[0](msg);
	}

	private queueResolver(resolver: Function) {
		this.resolvers.push(resolver);
	}

	join(logIn: Requests.JoinTokenBody) {
		
		this.endpoint = new Endpoint({
			url: this.url,
			onError: evt => {
				this.onError(evt);
			},
			onMessage: (msg: Message.Envelopment<any>) => {
				this.onMessage(msg);
			}
		});

		return new Promise<void>((resolve, reject) => {
			this.queueResolver((data: Message.Envelopment<any>) => {
				this.sessionKey = data.sessionKey;
				resolve();
			});
			this.endpoint.send<Requests.JoinMessage>({
				direction: Message.Direction.REQUEST,
				body: logIn,
				messageType: Message.Type.JOIN,
				sessionKey: null
			});
		});
	}

	leave() {

		return new Promise<void>((resolve, reject) => {

			let msg: Requests.LeaveMessage = {
				direction: Message.Direction.REQUEST,
				sessionKey: this.sessionKey,
				body: null,
				messageType: Message.Type.LEAVE
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