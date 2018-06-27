export enum AlertButtonState {
	Ok,
	Cancel
}

export interface AlertState {
	alertButtonState: AlertButtonState;
	message?: string;
	data?: any;
}
