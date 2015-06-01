/// <reference path="message" />
import * as Message from "./message";

export interface ResponseBody<Data> {
	data: Data;
	error?: string;
	errorCode?: any;
	ok: boolean;
}

export interface JoinMessage extends Message.Envelopment<ResponseBody<string>> {
}

export interface LeaveMessage extends Message.Envelopment<ResponseBody<void>> {
}