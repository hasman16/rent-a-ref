export enum PaymentState {
	PaymentSuccess,
	PaymentError
}

export interface Payment {
	paymentState: PaymentState;
	message?: string;
	data?: any;
}
