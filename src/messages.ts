export module MessageType {
	export const JOIN = "JOIN";
	export const LEAVE = "LEAVE";
	export const QUERY = "QUERY";
	export const INSERT = "INSERT";
	export const UPDATE = "UPDATE";
	export const DELETE = "DELETE";
	export const SUBSCRIBE = "SUBSCRIBE";
	export const UNSUBSCRIBE = "UNSUBSCRIBE";
	export const INDICATION = "INDICATION";
}

export module DirectionType {
	export const REQUEST = "REQUEST";
	export const ERROR = "ERROR";
}

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

export interface Message<TBody> {
	body: TBody;
	direction: string;
	ontology?: string;
	messageType: string;
	sessionKey: string;
}

//#region Messages
export interface JoinMessage extends Message<JoinLogInBody | JoinTokenBody> {
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