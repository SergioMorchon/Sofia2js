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