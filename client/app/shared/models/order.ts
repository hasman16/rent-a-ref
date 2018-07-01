import { BaseModel } from './base';

export interface Order extends BaseModel {
	currency: string;
	items: Array<string>;
	email: string;
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
