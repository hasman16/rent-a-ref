"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/common/http");
var index_1 = require("./../../services/index");
require("rxjs/add/operator/map");
require("rxjs/add/operator/do");
require("rxjs/add/operator/take");
require("rxjs/add/operator/combineLatest");
require("rxjs/add/operator/switchMap");
var _ = require("lodash");
var EventsComponentService = /** @class */ (function () {
    function EventsComponentService(http, statesService, eventsService) {
        this.http = http;
        this.statesService = statesService;
        this.eventsService = eventsService;
    }
    EventsComponentService.prototype.mapSportsAsOptions = function (sports) {
        return _(sports)
            .map(function (sport) {
            return {
                label: sport.name,
                value: sport.id
            };
        })
            .value();
    };
    EventsComponentService.prototype.getStatesProvinces = function () {
        return this.statesService.getStatesProvinces();
    };
    EventsComponentService.prototype.getEvent = function (id) {
        var _this = this;
        var games = function (value) { return value && value > 0; };
        return this.eventsService
            .getGame(id)
            .take(1)
            .map(function (aGame) {
            var model = _this.convertGameToModel(aGame);
            model.kids = games(model.kids_games);
            model.teens = games(model.teen_games);
            model.adults = games(model.adult_games);
            return model;
        });
    };
    EventsComponentService.prototype.createEvent = function (org_id, model) {
        return this.eventsService.createGame(org_id, model);
    };
    EventsComponentService.prototype.getOrganizationGames = function (org_id) {
        return this.eventsService.getOrganizationGames(org_id);
    };
    EventsComponentService.prototype.payForEvent = function (gameId) {
        var _this = this;
        return this.getEvent(gameId)
            .combineLatest(this.eventsService.getPrices())
            .map(function (_a) {
            var model = _a[0], prices = _a[1];
            return _this.prepareForPayment(model, prices);
        })
            .take(1);
    };
    EventsComponentService.prototype.convertGameToModel = function (model) {
        var eventDate = _.trim(model.event_date).split('T')[0];
        var tempModel = _.cloneDeep(model);
        delete tempModel.address;
        delete tempModel.phone;
        tempModel.event_date = eventDate;
        return Object.assign({}, model.address, tempModel);
    };
    EventsComponentService.prototype.convertModelToGame = function (model) {
        var dateString = String(model.event_date);
        var eventDate = Number(new Date(dateString).getTime());
        return {
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
                line1: model.line1,
                line2: model.line2,
                city: model.city,
                state: model.state,
                zip: model.zip,
                country: model.country
            }
        };
    };
    EventsComponentService.prototype.prepareForPayment = function (model, prices) {
        prices.forEach(function (price) {
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
        model = Object.assign({}, {
            kids_games_total: 0,
            teen_games_total: 0,
            adult_games_total: 0
        }, model);
        model.kids_games_total = model.kids_game_price * model.kids_games;
        model.teen_games_total = model.teen_game_price * model.teen_games;
        model.adult_games_total = model.adult_game_price * model.adult_games;
        model['total'] =
            model.kids_games_total +
                model.teen_games_total +
                model.adult_games_total;
        return model;
    };
    EventsComponentService.prototype.generateForm = function (SPORTS, STATES) {
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
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'event_date',
                        templateOptions: {
                            label: 'Event Date',
                            type: 'date',
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
                        className: 'col-sm-12',
                        type: 'select',
                        key: 'sport_id',
                        templateOptions: {
                            label: 'Type of Sport',
                            required: true,
                            options: SPORTS
                        }
                    },
                    {
                        className: 'col-sm-12',
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
                template: '<hr class="space-hr" /><div><strong>Age Groups</strong></div>'
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
                template: '<hr class="space-hr" /><div><strong>Address</strong></div>'
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
    };
    EventsComponentService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.HttpClient,
            index_1.StatesService,
            index_1.EventsService])
    ], EventsComponentService);
    return EventsComponentService;
}());
exports.EventsComponentService = EventsComponentService;
//# sourceMappingURL=events-component.service.js.map