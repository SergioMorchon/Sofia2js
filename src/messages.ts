//#region Bodies
export interface JoinBody {
	instance: string;
	user: string;
	password: string;
}
export interface LeaveBody {
}

export interface InsertBody<TData> {
	data: TData;
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

export interface InsertMessage<TData> extends Message<InsertBody<TData>> {
}
//#endregion