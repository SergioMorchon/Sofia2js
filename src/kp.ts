/// <reference path="lib.es6.d.ts" />
/// <reference path="messages/type" />
/// <reference path="messages/message" />
/// <reference path="messages/request" />
/// <reference path="endpoint" />

import * as Message from "./messages/message";
import Direction = require("./messages/direction");
import Endpoint from "./endpoint";
import Request = require("./messages/request");
import Response = require("./messages/response");

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

	private onMessage(msg: Message.Envelopment<Response.ResponseBody<any>>) {
		if (msg.direction === Message.Direction.ERROR) {
			this.onError(msg);
		} else {
			if (msg.messageType === Message.Type.INDICATION) {

			} else {
				this.processResponse(msg);
			}
		}
	}

	private processResponse(msg: Message.Envelopment<Response.ResponseBody<any>>) {
		this.resolvers.splice(0, 1)[0](msg);
	}

	private queueResolver(resolver: Function) {
		this.resolvers.push(resolver);
	}

	join(logIn: Request.JoinTokenBody) {
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
			this.queueResolver((data: Response.JoinMessage) => {
				this.sessionKey = data.sessionKey;
				resolve();
			});
			this.endpoint.send<Request.JoinMessage>({
				direction: Message.Direction.REQUEST,
				body: logIn,
				messageType: Message.Type.JOIN,
				sessionKey: null
			});
		});
	}

	leave() {
		return new Promise<void>((resolve, reject) => {

			let msg: Request.LeaveMessage = {
				direction: Message.Direction.REQUEST,
				sessionKey: this.sessionKey,
				body: null,
				messageType: Message.Type.LEAVE
			};

			this.queueResolver(() => {
				this.endpoint.close();
				this.endpoint = null;
				resolve();
			});
			this.endpoint.send(msg);
		});
	}

	insert<Ontology>() {
		return this;
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