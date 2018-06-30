import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
	Address,
	BaseModel,
	Game,
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
	EventsService,
	StatesService,
	UserService
} from './../../services/index';
import { Subject } from 'rxjs/Subject';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/combineLatest';
import 'rxjs/add/operator/switchMap';

import * as _ from 'lodash';
import * as moment from 'moment';

@Injectable()
export class EventsComponentService {
	constructor(
		private http: HttpClient,
		protected statesService: StatesService,
		protected eventsService: EventsService
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

	public getEvent(id: string): Observable<any> {
		const games = value => value && value > 0;
		return this.eventsService
			.getGame(id)
			.take(1)
			.map((aGame: Game) => {
				const model = this.convertGameToModel(aGame);
				model.kids = games(model.kids_games);
				model.teens = games(model.teen_games);
				model.adults = games(model.adult_games);
				return model;
			});
	}

	public createEvent(org_id: string, model: any): Observable<any> {
		return this.eventsService.createGame(org_id, model);
	}

	public updateGameAddress(model: any): Observable<any> {
		const address = model.address;

		return this.eventsService
			.updateGame(model)
			.switchMap((game: Game): Observable<any> => {
				if (address) {
					return this.eventsService.updateAddress(model.id, address);
				}
				return Observable.of(true);
			});
	}

	public getOrganizationGames(
		org_id: string,
		page: Page = null
	): Observable<any> {
		return this.eventsService.getOrganizationGames(org_id, page);
	}

	public getPreparedEventForPayment(gameId: string): Observable<[any, any]> {
		return this.getEvent(gameId)
			.combineLatest(this.eventsService.getPrices())
			.map(([model, prices]: [any, any]) => {
				return this.prepareForPayment(model, prices);
			})
			.take(1);
	}

	public convertGameToModel(model: Game): any {
		const eventDate: string = _.trim(model.event_date).split('T')[0];
		let tempModel = _.cloneDeep(model);
		delete tempModel.address;
		delete tempModel.phone;
		tempModel.event_date = eventDate;
		let obj = {
			address_id: model.address.id
		};
		delete model.address.id;
		return Object.assign(obj, model.address, tempModel);
	}

	public convertModelToGame(model): Game {
		const dateString: string = String(model.event_date);
		const eventDate: number = Number(new Date(dateString).getTime());

		return <Game>{
			id: model.id,
			adult_games: model.adult_games,
			teen_games: model.teen_games,
			kids_games: model.kids_games,

			kids_game_price: model.kids_game_price,
			teen_game_price: model.teen_game_price,
			adult_game_price: model.adult_game_price,

			event_name: model.event_name,
			event_type: model.event_type,
			event_date: eventDate,
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

	public prepareForPayment(model: any, prices: any): any {
		prices.forEach(price => {
			switch (price.description) {
				case 'kids':
					model.kids_game_price = price.price;
					break;
				case 'teens':
					model.teen_game_price = price.price;
					break;
				case 'adults':
					model.adult_game_price = price.price;
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
						className: 'col-sm-4',
						type: 'input',
						key: 'event_date',
						templateOptions: {
							label: 'Event Date',
							type: 'date',
							required: true
						}
					},
					{
						className: 'col-sm-4',
						type: 'select',
						key: 'sport_id',
						templateOptions: {
							label: 'Type of Sport',
							required: true,
							options: SPORTS
						}
					},
					{
						className: 'col-sm-4',
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
