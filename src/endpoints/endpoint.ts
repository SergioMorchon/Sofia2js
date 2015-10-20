interface Endpoint {
	send<Output>(message: Output): Promise<void>;
	close(): void;
}

module Endpoint {
	export interface Options {
		url: string;
		onMessage: <Input>(message: Input) => void;
		onError: (error: any) => void;
	}
}

export default Endpoint;