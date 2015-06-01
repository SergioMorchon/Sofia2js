interface Envelopment<Body> {
	body: Body;
	direction: string;
	ontology?: string;
	messageType: string;
	sessionKey: string;
}

export default Envelopment;