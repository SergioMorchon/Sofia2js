export module MessageType {
	export const JOIN = "JOIN";
	export const LEAVE = "LEAVE";
	export const QUERY = "QUERY";
	export const INSERT = "INSERT";
	export const UPDATE = "UPDATE";
	export const Delete = "DELETE";
	export const Subscribe = "SUBSCRIBE";
	export const Unsubscribe = "UNSUBSCRIBE";
	export const Indication = "INDICATION";
}

//#region Bodies
export interface JoinBody {
	instance: string;
	user: string;
	password: string;
}
export interface LeaveBody {
}

export interface InsertBody<Ontology> {
	data: Ontology;
}
//#endregion

export interface Message<TBody> {
	body: TBody;
	direction: string;
	ontology: string;
	messageType: string;
	sessionKey: string;
}

//#region Messages
export interface JoinMessage extends Message<JoinBody> {
}

export interface LeaveMessage extends Message<LeaveBody> {
}

export interface InsertMessage<Ontology> extends Message<InsertBody<Ontology>> {
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