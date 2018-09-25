import { Injectable } from '@angular/core';

import {
	Address,
	BaseModel,
	Meeting,
	Phone,
	Option,
	Page,
	PagedData,
	Organization,
	State,
	Sport
} from './../../shared/models/index';
import {
	AuthService,
	MeetingService,
	StatesService,
	StripeService,
	UserService
} from './../../services/index';
import { combineLatest, Subject, Observable, of, BehaviorSubject } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import * as _ from 'lodash';
import * as moment from 'moment-timezone';

@Injectable()
export class MeetingsComponentService {
	public products: any[] = [];
	public plans: any[] = [];
	public productPlan: any[] = [];
	public lineItems: any[] = [];
	constructor(
		private stripeService: StripeService,
		protected statesService: StatesService,
		protected meetingService: MeetingService
	) {}

	public mapSportsAsOptions(sports: Sport[]): Option[] {
		return _(sports)
			.map((sport: Sport): Option => {
				return <Option>{
					label: sport.name,
					value: sport.id
				};
			})
			.value();
	}

	public getStatesProvinces() {
		return this.statesService.getStatesProvinces();
	}

	public getMeeting(id: string): Observable<any> {
		const meeting = value => value && value > 0;
		return this.meetingService.getMeeting(id).pipe(
			take(1),
			map((ameeting: Meeting) => {
				const model = this.convertMeetingToModel(ameeting);
				model.kids = meeting(model.kids_games);
				model.teens = meeting(model.teen_games);
				model.adults = meeting(model.adult_games);
				return model;
			})
		);
	}

	public deleteMeeting(meeting_id: string): Observable<any> {
		return this.meetingService.deleteMeeting(meeting_id);
	}

	public createMeeting(org_id: string, model: any): Observable<any> {
		return this.meetingService.createMeeting(org_id, model);
	}

	public updateMeetingAddress(model: any): Observable<any> {
		const address = model.address;

		return this.meetingService.updateMeeting(model).pipe(
			switchMap((meeting: Meeting): Observable<any> => {
				if (address) {
					return this.meetingService.updateAddress(model.id, address);
				}
				return of(true);
			})
		);
	}

	public getOrganizationMeetings(
		org_id: string,
		page: Page = null
	): Observable<any> {
		return this.meetingService.getOrganizationMeetings(org_id, page);
	}

	public getPreparedMeetingForPayment(meetingId: string): Observable<any> {
		this.lineItems = [];
		return combineLatest(
			this.getMeeting(meetingId),
			this.stripeService.getProducts()
		).pipe(
			map(([model, products]: [any, any]) => {
				this.products = _.filter(products.data, product => {
					return product.type === 'good';
				});
				return this.prepareForPayment(model, this.products);
			}),
			take(1)
		);
	}

	public convertMeetingToModel(model: Meeting): any {
		const timezone_id = model.timezone_id;
		const startTimeZoneDate = moment.tz(model.start_date, timezone_id);
		const endTimeZoneDate = moment.tz(model.end_date, timezone_id);

		const tempModel = _.cloneDeep(model);
		delete tempModel.address;
		delete tempModel.phone;
		tempModel.start_date = startTimeZoneDate.format('YYYY-MM-DD');
		tempModel.start_time = startTimeZoneDate.format('HH:mm:ss');

		tempModel.end_date = endTimeZoneDate.format('YYYY-MM-DD');
		tempModel.end_time = endTimeZoneDate.format('HH:mm:ss');

		const obj = {
			address_id: model.address.id
		};
		delete model.address.id;
		return Object.assign(obj, model.address, tempModel);
	}

	public convertModelToMeeting(model): Meeting {
		const startDateString: string = String(model.start_date);
		const startTimeString: string = String(model.start_time);

		const endDateString: string = String(model.end_date);
		const endTimeString: string = String(model.end_time);

		return <Meeting>{
			id: model.id,
			adult_games: model.adult_games,
			teen_games: model.teen_games,
			kids_games: model.kids_games,

			kids_game_price: model.kids_game_price,
			teen_game_price: model.teen_game_price,
			adult_game_price: model.adult_game_price,

			event_name: model.event_name,
			event_type: model.event_type,

			start_date: startDateString,
			start_time: startTimeString,

			end_date: endDateString,
			end_time: endTimeString,

			venue_name: model.venue_name,
			status: model.status,
			sport_id: model.sport_id,

			address: {
				id: model.address_id,
				line1: model.line1,
				line2: model.line2,
				city: model.city,
				state: model.state,
				zip: model.zip,
				country: model.country
			}
		};
	}

	public prepareForPayment(model: any, products: any[]): any {
		let lineItems: any[] = [];

		const addSku = (amount, sku) => {
			if (amount > 0) {
				lineItems.push({
					type: 'sku',
					parent: sku.id,
					quantity: amount
				});
			}
		};

		_.forEach(products, product => {
			const skus = product.skus;
			const data = _.head(skus.data);
			let value: string = product.name.split(/\s/)[0];

			switch (value.toLowerCase()) {
				case 'kids':
					model.kids_game_price = data.price || 0;
					addSku(model.kids_games, data);
					break;
				case 'teens':
					model.teen_game_price = data.price || 0;
					addSku(model.teen_games, data);
					break;
				case 'adults':
					model.adult_game_price = data.price || 0;
					addSku(model.adult_games, data);
					break;
			}
		});

		model = Object.assign(
			{},
			{
				kids_games_total: 0,
				teen_games_total: 0,
				adult_games_total: 0
			},
			model
		);

		model.kids_games_total = model.kids_game_price * model.kids_games;
		model.teen_games_total = model.teen_game_price * model.teen_games;
		model.adult_games_total = model.adult_game_price * model.adult_games;

		this.lineItems = _.cloneDeep(lineItems);
		model['total'] =
			model.kids_games_total +
			model.teen_games_total +
			model.adult_games_total;
		return model;
	}

	public generateForm(SPORTS: Option[], STATES: Option[]): any[] {
		return [
			{
				template: '<div><strong>Event Information</strong></div>'
			},
			{
				fieldGroupClassName: 'row',
				fieldGroup: [
					{
						className: 'col-sm-12',
						type: 'input',
						key: 'event_name',
						templateOptions: {
							label: 'Event Name',
							required: true,
							minLength: 5,
							pattern: /\w+[a-zA-Z0-9]/
						}
					}
				]
			},
			{
				template: '<hr class="space-hr" />'
			},
			{
				fieldGroupClassName: 'row',
				fieldGroup: [
					{
						className: 'col-sm-6',
						type: 'input',
						key: 'start_date',
						templateOptions: {
							label: 'Start Date',
							type: 'date',
							required: true
						}
					},
					{
						className: 'col-sm-6',
						type: 'input',
						key: 'start_time',
						templateOptions: {
							label: 'Start Time',
							type: 'time',
							required: true
						}
					}
				]
			},
			{
				template: '<hr class="space-hr" />'
			},
			{
				fieldGroupClassName: 'row',
				fieldGroup: [
					{
						className: 'col-sm-6',
						type: 'input',
						key: 'end_date',
						templateOptions: {
							label: 'End Date',
							type: 'date',
							required: true
						}
					},
					{
						className: 'col-sm-6',
						type: 'input',
						key: 'end_time',
						templateOptions: {
							label: 'End Time',
							type: 'time',
							required: true
						}
					}
				]
			},
			{
				template: '<hr class="space-hr" />'
			},
			{
				fieldGroupClassName: 'row',
				fieldGroup: [
					{
						className: 'col-sm-6',
						type: 'select',
						key: 'sport_id',
						templateOptions: {
							label: 'Type of Sport',
							required: true,
							options: SPORTS
						}
					},
					{
						className: 'col-sm-6',
						type: 'radio',
						key: 'event_type',
						templateOptions: {
							label: 'What type of event',
							required: true,
							options: [
								{ value: 'League', key: 'league' },
								{ value: 'Tournament', key: 'tournament' },
								{ value: 'One off event', key: 'oneoff' }
							]
						}
					}
				]
			},
			{
				template:
					'<hr class="space-hr" /><div><strong>Age Groups</strong></div>'
			},
			{
				fieldGroupClassName: 'row',
				fieldGroup: [
					{
						className: 'col-sm-4',
						type: 'checkbox',
						key: 'kids',
						templateOptions: {
							label: 'Kids 13 and Under',
							required: true
						}
					},
					{
						className: 'col-sm-4',
						type: 'checkbox',
						key: 'teens',
						templateOptions: {
							label: 'High School',
							required: true
						}
					},
					{
						className: 'col-sm-4',
						type: 'checkbox',
						key: 'adults',
						templateOptions: {
							label: 'Over 18',
							required: true
						}
					}
				]
			},
			{
				fieldGroupClassName: 'row',
				fieldGroup: [
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'kids_games',
						templateOptions: {
							label: 'Number games for Kids 13 and Under.',
							type: 'number',
							min: 1,
							max: 1000
						},
						expressionProperties: {
							'templateOptions.required': 'model.kids',
							'templateOptions.disabled': '!model.kids'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'teen_games',
						templateOptions: {
							label: 'Number of games for High Schooler.',
							type: 'number',
							min: 1,
							max: 1000,
							required: true
						},
						expressionProperties: {
							'templateOptions.required': 'model.teens',
							'templateOptions.disabled': '!model.teens'
						}
					},
					{
						className: 'col-sm-4',
						type: 'input',
						key: 'adult_games',
						templateOptions: {
							label: 'Number of games for Over 18s.',
							type: 'number',
							min: 1,
							max: 1000,
							required: true
						},
						expressionProperties: {
							'templateOptions.required': 'model.adults',
							'templateOptions.disabled': '!model.adults'
						}
					}
				]
			},
			{
				template:
					'<hr class="space-hr" /><div><strong>Address</strong></div>'
			},
			{
				fieldGroupClassName: 'row',
				fieldGroup: [
					{
						className: 'col-sm-12',
						type: 'input',
						key: 'venue_name',
						templateOptions: {
							label: 'Venue Name',
							required: true,
							minLength: 5,
							pattern: /\w+[a-zA-Z0-9]/
						}
					},
					{
						className: 'col-sm-3',
						type: 'input',
						key: 'line1',
						templateOptions: {
							label: 'Street 1',
							required: true
						}
					},
					{
						type: 'input',
						key: 'line2',
						className: 'col-sm-3',
						templateOptions: {
							type: 'text',
							label: 'Street 2'
						}
					},
					{
						type: 'input',
						key: 'city',
						className: 'col-sm-2',
						templateOptions: {
							label: 'City',
							required: true
						}
					},
					{
						type: 'select',
						key: 'state',
						className: 'col-sm-2',
						templateOptions: {
							label: 'State',
							options: STATES,
							required: true
						}
					},
					{
						type: 'input',
						key: 'zip',
						className: 'col-sm-2',
						templateOptions: {
							label: 'Zip',
							required: true,
							pattern: /\d{5}(\-\d{4})?/
						}
					}
				]
			}
		];
	}
}
