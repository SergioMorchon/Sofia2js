/// <reference path="messages" />

import Messages = require("messages");

class KP {
	name: string;
	private sessionKey: string;
	
	constructor(options: KP.Options) {
		this.name = name;
	}
	
	join() {
		return this;
	}
	
	leave() {
		
	}
	
	insert<Ontology>() {
		return this;
	}
}

module KP {
	export interface Options {
		name: string;
	}
}

export default KP;