/// <reference path="envelopment" />

import Envelopment from "./envelopment";

//#region Bodies
export interface JoinInstanceBody {
	instance: string;
}
export interface JoinLogInBody extends JoinInstanceBody {
	user: string;
	password: string;
}
export interface JoinTokenBody extends JoinInstanceBody {
	token: string;
}
interface JoinBody {
	
}
export interface LeaveBody {
}

export interface InsertBody<Ontology> {
	data: {
		[ontologyName: string]: Ontology;
	}
}
//#endregion

//#region Messages
export interface JoinMessage extends Envelopment<JoinLogInBody | JoinTokenBody> {
}

export interface LeaveMessage extends Envelopment<LeaveBody> {
}

export interface InsertMessage<Ontology> extends Envelopment<InsertBody<Ontology>> {
}
//#endregion

export enum QueryType {
	Join,
	Leave,
	Query,
	Insert,
	Update,
	Delete,
	Subscribe,
	Unsubscribe
}