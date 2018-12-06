import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import {
	Address,
	BaseModel,
	Meeting,
	PagedData,
	Phone
} from './../../shared/models/index';
import { AbstractService } from './abstract.service';

import { Observable } from 'rxjs';

import * as _ from 'lodash';

@Injectable()
export class MeetingService extends AbstractService {
	private address: Address;
	private phones: Phone;

	constructor(protected http: HttpClient) {
		super(http);
	}

	public getPrices(): Observable<any> {
		return this.http.get<any>(`/api/prices`);
	}

	public getAllMeetings(queryParams: any = null): Observable<PagedData> {
		return <Observable<PagedData>>this.http.get(`/api/meetings`, {
			params: queryParams
		});
	}

	public getMeeting(meeting_id: string): Observable<Meeting> {
		return this.http.get(`/api/meeting/${meeting_id}`);
	}

	public getOrganizationMeetings(
		organization_id: string,
		queryParams: any = null
	): Observable<PagedData> {
		const url = `/api/organization/${organization_id}/meetings`;
		return this.http.get<PagedData>(url, {
			params: queryParams
		});
	}

	public createMeeting(organization_id, meeting): Observable<Meeting> {
		const url = `/api/organization/${organization_id}/meetings`;
		return this.postData(url, meeting);
	}

	public updateMeeting(meeting): Observable<Meeting> {
		const url: string = `/api/meeting/${meeting.id}`;
		return this.putData(url, meeting);
	}

	public createAddress(
		meeting_id: string,
		address: Address
	): Observable<Meeting> {
		const url: string = `/api/meeting/${meeting_id}/addresses`;
		return this.postData(url, address);
	}

	public updateAddress(
		meeting_id: string,
		address: Address
	): Observable<Meeting> {
		const url: string = `/api/meeting/${meeting_id}/addresses/${address.id}`;
		return this.putData(url, address);
	}

	public createPhone(meeting_id: string, phone: Phone): Observable<Meeting> {
		const url: string = `/api/meeting/${meeting_id}/phones`;
		return this.postData(url, phone);
	}

	public updatePhone(meeting_id: string, phone: Phone): Observable<Meeting> {
		const url: string = `/api/meeting/${meeting_id}/phones/${phone.id}`;
		return this.putData(url, phone);
	}

	public deleteMeeting(meeting_id: string): Observable<any> {
		const url: string = `/api/meeting/${meeting_id}`;
		return <Observable<any>>this.http.delete(url);
	}
}
