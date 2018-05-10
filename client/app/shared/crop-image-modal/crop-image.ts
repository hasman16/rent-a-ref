export enum UploadState {
	Success,
	Close,
	Error,
	None
}

export interface CropImageState {
	uploadState: UploadState;
	message?: string;
	data?: any;
}
