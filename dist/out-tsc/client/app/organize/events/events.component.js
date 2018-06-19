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
var router_1 = require("@angular/router");
var events_component_service_1 = require("./events-component.service");
var toast_component_1 = require("./../../shared/toast/toast.component");
var _ = require("lodash");
var moment = require("moment");
require("rxjs/add/operator/combineLatest");
require("rxjs/add/operator/switchMap");
var ViewState;
(function (ViewState) {
    ViewState[ViewState["noEvents"] = 0] = "noEvents";
    ViewState[ViewState["listEvents"] = 1] = "listEvents";
    ViewState[ViewState["editEvent"] = 2] = "editEvent";
    ViewState[ViewState["payForEvent"] = 3] = "payForEvent";
})(ViewState || (ViewState = {}));
var EventsComponent = /** @class */ (function () {
    function EventsComponent(cd, toast, route, router, eventsComponentService) {
        var _this = this;
        this.cd = cd;
        this.toast = toast;
        this.route = route;
        this.router = router;
        this.eventsComponentService = eventsComponentService;
        this.model = {};
        this.prices = [];
        this.titles = [
            'Event Name',
            'Event Date',
            'Venue',
            'Status',
            '',
            ''
        ];
        this.games = [];
        this.isLoading = false;
        this.organization_id = '';
        this.buttonText = 'Create';
        this.viewState = ViewState.noEvents;
        this.route.params.subscribe(function (params) {
            _this.organization_id = params['organization_id'];
        });
    }
    Object.defineProperty(EventsComponent.prototype, "country", {
        set: function (aCountry) {
            this.countryName = aCountry || 'usa';
        },
        enumerable: true,
        configurable: true
    });
    EventsComponent.prototype.ngOnInit = function () {
        this.games = _.cloneDeep(this.route.snapshot.data.games);
        this.sports = this.eventsComponentService.mapSportsAsOptions(this.route.snapshot.data.sportsData.rows);
        this.states = this.eventsComponentService.getStatesProvinces();
        this.setEventsMode();
    };
    EventsComponent.prototype.formatDate = function (dateString) {
        return moment(dateString).format('LL');
    };
    EventsComponent.prototype.setEventsMode = function () {
        this.isLoading = false;
        if (_.isArray(this.games) && this.games.length > 0) {
            this.viewState = ViewState.listEvents;
        }
        else {
            this.viewState = ViewState.noEvents;
        }
    };
    EventsComponent.prototype.isViewState = function (value) {
        var result = false;
        switch (value) {
            case 'noEvents':
                result = this.viewState == ViewState.noEvents;
                break;
            case 'listEvents':
                result = this.viewState == ViewState.listEvents;
                break;
            case 'editEvent':
                result = this.viewState == ViewState.editEvent;
                break;
            case 'payingForEvent':
                result = this.viewState == ViewState.payForEvent;
                break;
            default:
                result = false;
                break;
        }
        return result;
    };
    EventsComponent.prototype.prepareModel = function (model) {
        return Object.assign({
            adults: false,
            teens: false,
            kids: false
        }, model);
    };
    EventsComponent.prototype.createNewEvent = function () {
        this.model = this.prepareModel({});
        this.buttonText = 'Create';
        this.viewState = ViewState.editEvent;
    };
    EventsComponent.prototype.payForEvent = function (game) {
        var _this = this;
        if (!this.isLoading) {
            this.isLoading = true;
            this.eventsComponentService
                .payForEvent(game.id)
                .take(1)
                .subscribe(function (model) {
                _this.model = _.cloneDeep(model);
                _this.viewState = ViewState.payForEvent;
            }, function (err) {
                _this.callFailure(err, 'Failed to retrieve Event.');
                _this.setEventsMode();
            }, function () {
                _this.isLoading = false;
                _this.cd.markForCheck();
            });
        }
    };
    EventsComponent.prototype.editEvents = function (game) {
        var _this = this;
        if (!this.isLoading) {
            this.isLoading = true;
            this.eventsComponentService
                .getEvent(game.id)
                .take(1)
                .subscribe(function (model) {
                console.log('got game:', game);
                _this.model = _.cloneDeep(model);
                _this.buttonText = 'Update';
                _this.viewState = ViewState.editEvent;
            }, function (err) {
                _this.callFailure(err, 'Failed to retrieve Event.');
                _this.setEventsMode();
            }, function () {
                _this.isLoading = false;
                _this.cd.markForCheck();
            });
        }
    };
    EventsComponent.prototype.getEvents = function () {
        var _this = this;
        this.isLoading = true;
        this.eventsComponentService
            .getOrganizationGames(this.organization_id)
            .take(1)
            .subscribe(function (games) {
            _this.games = _.cloneDeep(games);
        }, function (err) {
            return _this.callFailure(err, 'Failed to retrieve Events.');
        }, function () {
            _this.setEventsMode();
            _this.cd.markForCheck();
        });
    };
    EventsComponent.prototype.submitEvent = function (model) {
        var game = this.eventsComponentService.convertModelToGame(model);
        if (_.isNil(model.id) || !model.id) {
            this.submitNewEvent(game);
        }
        else {
            this.submitUpdateEvent(game);
            this.setEventsMode();
        }
    };
    EventsComponent.prototype.submitNewEvent = function (model) {
        var _this = this;
        this.isLoading = true;
        this.eventsComponentService
            .createEvent(this.organization_id, model)
            .subscribe(function (game) {
            _this.toast.setMessage('Event created.', 'info');
        }, function (err) {
            return _this.callFailure(err, 'Failed to create new event.');
        }, function () {
            _this.getEvents();
            _this.cd.markForCheck();
        });
    };
    EventsComponent.prototype.submitUpdateEvent = function (model) { };
    EventsComponent.prototype.callFailure = function (err, message) {
        if (message === void 0) { message = 'An error occurred'; }
        if (err.error instanceof Error) {
            this.toast.setMessage(message, 'danger');
        }
        else {
            this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
        }
    };
    EventsComponent.prototype.onCancel = function () {
        this.setEventsMode();
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], EventsComponent.prototype, "country", null);
    EventsComponent = __decorate([
        core_1.Component({
            selector: 'rar-events',
            templateUrl: './events.component.html',
            styleUrls: ['./events.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            toast_component_1.ToastComponent,
            router_1.ActivatedRoute,
            router_1.Router,
            events_component_service_1.EventsComponentService])
    ], EventsComponent);
    return EventsComponent;
}());
exports.EventsComponent = EventsComponent;
//# sourceMappingURL=events.component.js.map