/// <reference path="lib.es6.d.ts" />
/// <reference path="messages/type" />
/// <reference path="messages/message" />
/// <reference path="messages/request" />
/// <reference path="endpoints/web-socket" />

import * as Message from "./messages/message";
import Direction = require("./messages/direction");
import WSEndpoint from "./endpoints/web-socket";
import Request = require("./messages/request");
import Response = require("./messages/response");
import EndpointUrls from "./endpoints/endpoint-urls";

class KP {
	name: string;
	ontology: string;
	instance: string;
	endpoint: WSEndpoint;

	private sessionKey: string;
	private endpointUrls: EndpointUrls;
	private resolvers = <Function[]>[];
	private errorCallback: (error) => void;

	private onError(error: any) {
		if (this.errorCallback) {
			this.errorCallback(error);
		}
	}

	constructor(options: KP.Options) {
		this.name = options.name;
		this.errorCallback = options.onError;
		this.endpointUrls = options.endpoints;
		this.ontology = options.ontology;
		this.instance = options.instance;
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

	join(token: string) {
		this.endpoint = new WSEndpoint({
			url: this.endpointUrls[WSEndpoint.ENDPOINT_TYPE],
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
				body: {
					instance: `${this.name}:${this.instance}`,
					token: token
				},
				messageType: Message.Type.JOIN,
				sessionKey: null
			});
		});
	}

	leave() {
		return new Promise<void>((resolve, reject) => {
			this.queueResolver(() => {
				this.endpoint.close();
				this.endpoint = null;
				resolve();
			});
			this.endpoint.send<Request.LeaveMessage>({
				direction: Message.Direction.REQUEST,
				sessionKey: this.sessionKey,
				body: null,
				messageType: Message.Type.LEAVE
			});
		});
	}

	insert<Ontology>(data: Ontology) {
		return new Promise<void>((resolve, reject) => {
			this.queueResolver((response: Response.InsertMessage) => {
				this.endpoint.close();
				this.endpoint = null;
				resolve();
			});
			this.endpoint.send<Request.InsertMessage<Ontology>>({
				direction: Message.Direction.REQUEST,
				sessionKey: this.sessionKey,
				body: {
					data: {
						[this.ontology]: data
					}
				},
				ontology: this.ontology,
				messageType: Message.Type.INSERT
			});
		});
	}
}

module KP {
	
	export interface Options {
		name: string;
		ontology: string;
		instance: string;
		onError?: (error) => void;
		endpoints: EndpointUrls;
	}
}

export default KP;