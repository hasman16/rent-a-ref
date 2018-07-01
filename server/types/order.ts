export interface OrderModel {
	id?: string;
	currency: string;
	items: Array<string>;
	email: string;
	amount?: string;
	shipping: {
		name: string;
		address: {
			line1: string;
			city: string;
			state: string;
			postal_code: string;
			country: string;
		};
	};
	metadata: {
		status: string;
	};
}
