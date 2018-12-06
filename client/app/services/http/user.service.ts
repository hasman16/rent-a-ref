import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Login, PagedData, Profile, User } from './../../shared/models/index';

import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {
	private user: User = <User>{};
	public userStream: Observable<User> = new BehaviorSubject(this.user);

	constructor(private http: HttpClient) {}

	register(user): Observable<any> {
		return this.http.post('/api/register', JSON.stringify(user));
	}

	login(credentials): Observable<Login> {
		return <Observable<Login>>(
			this.http.post('/api/login', JSON.stringify(credentials))
		);
	}

	pulse(): Observable<Login> {
		return <Observable<Login>>this.http.post('/api/pulse', {});
	}

	getUsers(queryParams: any = null): Observable<PagedData> {
		return <Observable<PagedData>>this.http.get(`/api/users`, {
			params: queryParams
		});
	}

	getUsersPeople(queryParams: any = null): Observable<PagedData> {
		return <Observable<PagedData>>this.http.get(`/api/users/people`, {
			params: queryParams
		});
	}

	getUser(user_id: any): Observable<User> {
		return <Observable<User>>this.http.get(`/api/users/${user_id}`);
	}

	resetpassword(credentials): Observable<any> {
		return this.http.post('/api/resetpassword', JSON.stringify(credentials));
	}

	forgotpassword(email): Observable<any> {
		return this.http.post('/api/forgotpassword', JSON.stringify(email));
	}

	changepassword(passwords, user_id): Observable<any> {
		return this.http.put(
			`/api/changepassword/${user_id}`,
			JSON.stringify(passwords)
		);
	}

	editUser(user): Observable<any> {
		return this.http.put(`/api/users/${user.id}`, JSON.stringify(user));
	}

	deleteUser(user_id: number): Observable<any> {
		return this.http.delete(`/api/users/${user_id}`);
	}

	getProfile(user_id: any): Observable<Profile> {
		return <Observable<Profile>>this.http.get(`/api/profile/${user_id}`);
	}

	getPerson(person_id: any): Observable<any> {
		return this.http.get(`/api/people/${person_id}`);
	}

	updatePerson(information, person_id): Observable<any> {
		return this.http.put(
			`/api/people/${person_id}`,
			JSON.stringify(information)
		);
	}

	//Zones
	createZone(information, user_id): Observable<any> {
		return this.http.post(
			`/api/users/${user_id}/location_preference`,
			JSON.stringify(information)
		);
	}

	updateZone(information, zone_id: any): Observable<any> {
		return this.http.put(
			`/api/location_preference/${zone_id}`,
			JSON.stringify(information)
		);
	}

	//Payments
	updatePayment(information, user): Observable<any> {
		return this.http.put(
			`/api/payment/${user.id}`,
			JSON.stringify(information)
		);
	}

	//addresses
	getUserAddresses(user_id: any): Observable<any> {
		return this.http.get(`/api/users/${user_id}/addresses`);
	}

	getUserAddress(user_id: any, address_id: any): Observable<any> {
		return this.http.get(`/api/users/${user_id}/addresses/${address_id}`);
	}

	createAddress(information, user_id): Observable<any> {
		return this.http.post(
			`/api/users/${user_id}/addresses`,
			JSON.stringify(information)
		);
	}

	updateAddress(information, user_id, address_id): Observable<any> {
		return this.http.put(
			`/api/users/${user_id}/addresses/${address_id}`,
			JSON.stringify(information)
		);
	}

	//Phones
	getUserPhones(user_id: any): Observable<any> {
		return this.http.get(`/api/users/${user_id}/phones`);
	}

	getUserPhone(user_id: any, phone_id: any): Observable<any> {
		return this.http.get(`/api/users/${user_id}/phones/${phone_id}`);
	}

	createPhone(information, user_id): Observable<any> {
		return this.http.post(
			`/api/users/${user_id}/phones`,
			JSON.stringify(information)
		);
	}

	updatePhone(information, user_id, phone_id): Observable<any> {
		return this.http.put(
			`/api/users/${user_id}/phones/${phone_id}`,
			JSON.stringify(information)
		);
	}
}
