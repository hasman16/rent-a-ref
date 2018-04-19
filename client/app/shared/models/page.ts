export interface Page {
	limit?: number;
	offset?: number;
	total_pages?: number;
	total_elements?: number;
	sortby?: string;
	order?: string;
	search?: string;
}
