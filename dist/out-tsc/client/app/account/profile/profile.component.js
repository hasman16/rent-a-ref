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
var index_1 = require("../../services/index");
var index_2 = require("./../../shared/crop-image-modal/index");
var _ = require("lodash");
var moment = require("moment");
// End
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(cd, route, router, auth, profileService, userService, cropImageModalService) {
        this.cd = cd;
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.profileService = profileService;
        this.userService = userService;
        this.cropImageModalService = cropImageModalService;
        this.subscriptions = [];
        this.data = {};
        this.user = {};
        this.person = {};
        this.dummyAddress = {};
        this.dummyPhone = {};
        this.available = {};
        this.isLoading = true;
        this.allowEdit = false;
        this.middlenameFlag = false;
        this.abort = false;
        //protected divPassword: boolean = false;
        this.editBio = false;
        this.editPassword = false;
        this.editPhone = false;
        this.currentPhone = 0;
        this.editAddress = false;
        this.currentAddress = 0;
        this.birthday = '';
        this.defaultImage = 'assets/images/avatar2.png';
        this.addresses = [];
        this.phones = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.getProfile();
        this.subscriptions.push(this.cropImageModalService.cropImageSubject$.subscribe(function (cropImageState) {
            if (cropImageState.uploadState === index_2.UploadState.Success) {
                _this.getProfile();
            }
            _this.cd.markForCheck();
        }));
    };
    ProfileComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    ProfileComponent.prototype.openModal = function () {
        var user = this.user;
        this.destination = "/api/upload_image/" + user.id;
        this.cropImageModalService.show();
    };
    ProfileComponent.prototype.closeModal = function ($event) {
        console.log('close modal');
        this.cropImageModalService.hide();
    };
    ProfileComponent.prototype.canDeactivate = function () {
        if (!this.allowEdit) {
            return true;
        }
    };
    ProfileComponent.prototype.getImageAddress = function () {
        var url = _.get(this.data, 'images[0].location', '');
        return url;
    };
    ProfileComponent.prototype.getProfile = function () {
        var _this = this;
        var currentUser = this.auth.getCurrentUser();
        this.isLoading = true;
        this.profileService.getProfile(currentUser.id).subscribe(function (profile) {
            _this.data = profile;
            _this.user = {
                id: String(profile.id),
                email: profile.email,
                authorization: String(profile.authorization),
                firstname: profile.person.firstname,
                lastname: profile.person.lastname,
                role: '',
                person_id: String(profile.person.id),
                can_referee: profile.can_referee,
                can_organize: profile.can_organize,
                status: profile.status
            };
            _this.person = profile.person;
            _this.addresses = _.sortBy(profile.addresses, 'id');
            _this.phones = _.sortBy(profile.phones, 'id');
            _this.birthday = moment(profile.person.dob).format('LL');
            if (JSON.stringify(profile.person.middlenames) !== 'null') {
                _this.middlenameFlag = true;
            }
            _this.isLoading = false;
            _this.cd.markForCheck();
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile', _this.auth.loggedIn);
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile', _this.auth.loggedIn);
            }
            _this.isLoading = false;
            if (!_this.auth.loggedIn) {
                _this.abort = true;
                _this.auth.logout();
            }
            _this.cd.markForCheck();
        });
    };
    ProfileComponent.prototype.clearEdits = function () {
        this.editBio = false;
        this.editPassword = false;
        this.editAddress = false;
        this.editPhone = false;
        this.isLoading = false;
    };
    ProfileComponent.prototype.setEditAddress = function (id, value) {
        if (id === void 0) { id = 0; }
        if (value === void 0) { value = false; }
        this.clearEdits();
        this.currentAddress = id;
        this.editAddress = value;
    };
    ProfileComponent.prototype.setEditBio = function (value) {
        if (value === void 0) { value = false; }
        this.clearEdits();
        this.editBio = value;
    };
    ProfileComponent.prototype.setEditPassword = function (value) {
        if (value === void 0) { value = false; }
        this.clearEdits();
        this.editPassword = value;
    };
    ProfileComponent.prototype.setEditPhone = function (id, value) {
        if (id === void 0) { id = 0; }
        if (value === void 0) { value = false; }
        this.clearEdits();
        this.currentPhone = id;
        this.editPhone = value;
    };
    ProfileComponent.prototype.onAddressSubmit = function (res) {
        this.onFormSave(res);
    };
    ProfileComponent.prototype.onBioSubmit = function (res) {
        this.onFormSave(res);
    };
    ProfileComponent.prototype.onPasswordSubmit = function (res) {
        this.onFormSave(res);
    };
    ProfileComponent.prototype.onPhoneSubmit = function (res) {
        this.onFormSave(res);
    };
    ProfileComponent.prototype.onFormSave = function (res) {
        if (res.action === 'show_overlay') {
            this.isLoading = true;
        }
        else if (res.action === 'save_success') {
            this.onFormCancel(false);
            this.getProfile();
        }
        else if (res.action === 'save_failure') {
            this.isLoading = false;
        }
        else {
            this.onFormCancel(false);
        }
        this.cd.markForCheck();
    };
    ProfileComponent.prototype.onFormCancel = function (value) {
        this.clearEdits();
    };
    ProfileComponent = __decorate([
        core_1.Component({
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            router_1.ActivatedRoute,
            router_1.Router,
            index_1.AuthService,
            index_1.ProfileService,
            index_1.UserService,
            index_2.CropImageModalService])
    ], ProfileComponent);
    return ProfileComponent;
}());
exports.ProfileComponent = ProfileComponent;
//# sourceMappingURL=profile.component.js.map