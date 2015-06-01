/// <reference path="message" />

import * as Message from "./message";

//#region Bodies
export interface JoinInstanceBody {
	
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
	data: Ontology;
}
//#endregion

//#region Messages
export interface JoinMessage extends Message.Envelopment<JoinLogInBody | JoinTokenBody> {
}

export interface LeaveMessage extends Message.Envelopment<LeaveBody> {
}

export interface InsertMessage<Ontology> extends Message.Envelopment<InsertBody<Ontology>> {
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