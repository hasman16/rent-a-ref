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
var index_1 = require("../services/index");
var toast_component_1 = require("../shared/toast/toast.component");
var AdminComponent = /** @class */ (function () {
    function AdminComponent(auth, toast, profileService, router, userService) {
        this.auth = auth;
        this.toast = toast;
        this.profileService = profileService;
        this.router = router;
        this.userService = userService;
        this.data = {};
        this.user = {};
        this.users = [];
        this.person = {};
        this.addresses = [];
        this.phones = [];
        this.available = {};
        this.middlenameFlag = false;
        this.isLoading = true;
        this.allowEdit = false;
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.getProfile();
        this.isLoading = false;
    };
    AdminComponent.prototype.canDeactivate = function () {
        if (!this.allowEdit) {
            return true;
        }
    };
    AdminComponent.prototype.getProfile = function () {
        var _this = this;
        var currentUser = this.auth.getCurrentUser();
        this.profileService.getProfile(currentUser.id).subscribe(function (res) {
            _this.data = res;
            _this.user = res;
            _this.person = res.person;
            _this.addresses = res.addresses;
            _this.phones = res.phones;
            if (JSON.stringify(res.person.middlenames) !== 'null') {
                _this.middlenameFlag = true;
            }
        }, function (err) {
            _this.callFailure(err);
            _this.isLoading = false;
        });
    };
    AdminComponent.prototype.onOfficials = function () {
        this.router.navigate(['admin/officials']);
    };
    AdminComponent.prototype.onAssigning = function () {
        this.router.navigate(['admin/games']);
    };
    AdminComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (res) { return _this.callSuccess(res); }, function (err) {
            _this.callFailure(err);
        });
    };
    AdminComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.userService
            .deleteUser(user)
            .subscribe(function (data) { return _this.toast.setMessage('user deleted successfully.', 'success'); }, function (error) { return console.log(error); }, function () { return _this.getUsers(); });
    };
    AdminComponent.prototype.callSuccess = function (res) {
        this.toast.setMessage(res.message, 'success');
        this.users = res;
        this.isLoading = false;
        console.log('this.users: ', this.users);
    };
    AdminComponent.prototype.callFailure = function (err, message) {
        if (message === void 0) { message = 'An error occurred'; }
        if (err.error instanceof Error) {
            this.toast.setMessage(message, 'danger');
        }
        else {
            this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
        }
    };
    AdminComponent = __decorate([
        core_1.Component({
            selector: 'rar-admin',
            templateUrl: './admin.component.html',
            styleUrls: ['./admin.component.scss']
        }),
        __metadata("design:paramtypes", [index_1.AuthService,
            toast_component_1.ToastComponent,
            index_1.ProfileService,
            router_1.Router,
            index_1.UserService])
    ], AdminComponent);
    return AdminComponent;
}());
exports.AdminComponent = AdminComponent;
//# sourceMappingURL=admin.component.js.map