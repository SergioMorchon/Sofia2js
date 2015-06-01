/// <reference path="type" />
/// <reference path="direction" />

import Type from "./type";
import Direction from "./direction";

interface Envelopment<TBody> {
	body: TBody;
	direction: string;
	ontology?: string;
	messageType: string;
	sessionKey: string;
}

export { Type, Direction, Envelopment }