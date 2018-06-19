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
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var toast_component_1 = require("../../shared/toast/toast.component");
var index_1 = require("../../services/index");
var _ = require("lodash");
var ManageUsersComponent = /** @class */ (function () {
    function ManageUsersComponent(route, toast, userService, pagingService) {
        this.route = route;
        this.toast = toast;
        this.userService = userService;
        this.pagingService = pagingService;
        this.users = [];
        this.isLoading = true;
        this.allowEdit = false;
        this.currentUser = {};
        this.selected = [];
        this.columns = [
            { name: 'Email', prop: 'email' },
            { name: 'Organizer', prop: 'can_organize' },
            { name: 'Referee', prop: 'can_referee' },
            { name: 'Status', prop: 'status' }
        ];
        this.page = _.cloneDeep(this.pagingService.getDefaultPager());
    }
    ManageUsersComponent.prototype.ngOnInit = function () {
        var pagedData = this.route.snapshot.data.userData;
        this.processPagedData(pagedData);
        this.isLoading = false;
    };
    ManageUsersComponent.prototype.canDeactivate = function () {
        if (!this.allowEdit) {
            return true;
        }
    };
    ManageUsersComponent.prototype.getUsers = function (params) {
        var _this = this;
        this.isLoading = true;
        this.userService
            .getUsers(params)
            .subscribe(function (res) { return _this.callSuccess(res); }, function (err) { return _this.callFailure(err); });
    };
    ManageUsersComponent.prototype.onSort = function (sorting) {
        var page = this.pagingService.sortColumn(this.page, sorting);
        this.page = _.cloneDeep(page);
        this.getUsers(this.page);
    };
    ManageUsersComponent.prototype.setPage = function (paging) {
        this.page.offset = paging.offset;
        this.getUsers(this.page);
    };
    ManageUsersComponent.prototype.updateUser = function () {
        var _this = this;
        this.userService
            .getUsers(this.page)
            .subscribe(function (res) { return _this.callSuccess(res); }, function (err) { return _this.callFailure(err); });
    };
    ManageUsersComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.userService.deleteUser(user).subscribe(function (data) { return _this.toast.setMessage('user deleted successfully.', 'success'); }, function (err) { return _this.callFailure(err); }, function () {
            _this.page = _this.pagingService.getDefaultPager();
            _this.getUsers(_this.page);
        });
    };
    ManageUsersComponent.prototype.processPagedData = function (data) {
        var _a = this.pagingService.processPagedData(this.page, data), page = _a[0], newData = _a[1];
        this.page = page;
        this.users = newData;
    };
    ManageUsersComponent.prototype.callSuccess = function (data) {
        this.processPagedData(data);
        this.toast.setMessage('users data retrieved', 'success');
        this.isLoading = false;
    };
    ManageUsersComponent.prototype.callFailure = function (err, message) {
        if (message === void 0) { message = 'An error occurred'; }
        if (err.error instanceof Error) {
            this.toast.setMessage(message, 'danger');
        }
        else {
            this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
        }
        this.isLoading = false;
    };
    ManageUsersComponent.prototype.onSelect = function (_a) {
        var selected = _a.selected;
        console.log('Select Event', selected, this.selected);
    };
    ManageUsersComponent.prototype.onActivate = function (event) {
        console.log('Activate Event', event);
    };
    ManageUsersComponent = __decorate([
        core_1.Component({
            selector: 'rar-manage-users',
            templateUrl: './manage-users.component.html',
            styleUrls: ['./manage-users.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.ActivatedRoute,
            toast_component_1.ToastComponent,
            index_1.UserService,
            index_1.PagingService])
    ], ManageUsersComponent);
    return ManageUsersComponent;
}());
exports.ManageUsersComponent = ManageUsersComponent;
//# sourceMappingURL=manage-users.component.js.map