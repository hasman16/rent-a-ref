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
var toast_component_1 = require("../../shared/toast/toast.component");
var index_1 = require("./../../services/index");
var events_component_service_1 = require("./../../organize/events/events-component.service");
var _ = require("lodash");
var ManageEventsComponent = /** @class */ (function () {
    function ManageEventsComponent(route, toast, eventsService, pagingService, eventsComponentService) {
        this.route = route;
        this.toast = toast;
        this.eventsService = eventsService;
        this.pagingService = pagingService;
        this.eventsComponentService = eventsComponentService;
        this.isLoading = true;
        this.allowEdit = false;
        this.columns = [
            { name: 'Event Name', prop: 'event_name' },
            { name: 'Event Date', prop: 'event_date' },
            { name: 'Venue', prop: 'venue_name' },
            { name: 'Status', prop: 'status' }
        ];
        this.games = [];
        this.isEditing = false;
        this.selected = [];
        this.selectedTab = 'editEvent';
        this.page = _.cloneDeep(this.pagingService.getDefaultPager());
    }
    ManageEventsComponent.prototype.ngOnInit = function () {
        var _a = this.route.snapshot.data.eventsData, gamesData = _a[0], sportsData = _a[1];
        this.sports = _(sportsData.rows)
            .map(function (sport) {
            return {
                label: sport.name,
                value: sport.id
            };
        })
            .value();
        this.states = this.eventsComponentService.getStatesProvinces();
        this.processPagedData(gamesData);
        this.isLoading = false;
    };
    ManageEventsComponent.prototype.canDeactivate = function () {
        if (!this.allowEdit) {
            return true;
        }
    };
    ManageEventsComponent.prototype.isSelectedTab = function (tab) {
        return this.selectedTab === tab;
    };
    ManageEventsComponent.prototype.switchToTab = function ($event, tab) {
        $event.preventDefault();
        this.selectedTab = tab;
    };
    ManageEventsComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected, this.selected);
        this.isEditing = true;
    };
    ManageEventsComponent.prototype.onActivate = function (event) {
        console.log('Activate Event', event);
    };
    ManageEventsComponent.prototype.onSort = function (sorting) {
        var page = this.pagingService.sortColumn(this.page, sorting);
        this.page = _.cloneDeep(page);
        this.getEvents(this.page);
    };
    ManageEventsComponent.prototype.setPage = function (paging) {
        this.page.offset = paging.offset;
        this.getEvents(this.page);
    };
    ManageEventsComponent.prototype.editEvent = function (game) {
        console.log('edit events:', game);
    };
    ManageEventsComponent.prototype.getEvents = function (params) {
        var _this = this;
        this.isLoading = true;
        this.eventsService
            .getAllGames(params)
            .subscribe(function (res) { return _this.callSuccess(res); }, function (err) { return _this.callFailure(err); });
    };
    ManageEventsComponent.prototype.updateEvents = function () { };
    ManageEventsComponent.prototype.deleteEvent = function (user) {
        console.log('delete:', user);
    };
    ManageEventsComponent.prototype.processPagedData = function (data) {
        var _a = this.pagingService.processPagedData(this.page, data), page = _a[0], newData = _a[1];
        console.log('page:', newData);
        this.page = page;
        this.games = newData;
    };
    ManageEventsComponent.prototype.callSuccess = function (data) {
        this.processPagedData(data);
        this.toast.setMessage('Events data retrieved', 'success');
        this.isLoading = false;
    };
    ManageEventsComponent.prototype.callFailure = function (err, message) {
        if (message === void 0) { message = 'An error occurred'; }
        if (err.error instanceof Error) {
            this.toast.setMessage(message, 'danger');
        }
        else {
            this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
        }
    };
    ManageEventsComponent = __decorate([
        core_1.Component({
            selector: 'rar-manage-events',
            templateUrl: './manage-events.component.html',
            styleUrls: ['./manage-events.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            toast_component_1.ToastComponent,
            index_1.EventsService,
            index_1.PagingService,
            events_component_service_1.EventsComponentService])
    ], ManageEventsComponent);
    return ManageEventsComponent;
}());
exports.ManageEventsComponent = ManageEventsComponent;
//# sourceMappingURL=manage-events.component.js.map