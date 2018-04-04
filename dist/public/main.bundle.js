webpackJsonp(["main"],{

/***/ "./client/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./client/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./client/app/about/about.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n\t<div class=\"col-12\">\n\t\t<div class=\"card\">\n\t\t  <h4 class=\"elegantshd bigFont\">About Us</h4>\n\t\t  <div class=\"card-block\">\n\t\t    <blockquote>\n\t\t      <p>Rent-A-Ref is an ever growing Community of Sports Professionals that connects Leagues, Tournaments and Referees that help service one another.</p>\n\t\t    </blockquote>\n\t\t  </div>\n\t\t</div>\n\t</div>\n</div>\n"

/***/ }),

/***/ "./client/app/about/about.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/about/about.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = /** @class */ (function () {
    function AboutComponent() {
    }
    AboutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: "app-about",
            template: __webpack_require__("./client/app/about/about.component.html"),
            styles: [__webpack_require__("./client/app/about/about.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], AboutComponent);
    return AboutComponent;
}());



/***/ }),

/***/ "./client/app/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n\n    <app-loading [condition]=\"isLoading\"></app-loading>\n    <app-toast [message]=\"toast.message\"></app-toast>\n\n    <div class=\"card\" *ngIf=\"!isLoading\">\n      <h4 class=\"card-header\">Account settings</h4>\n      <div class=\"card-block\">\n        <button type=\"button\" class=\"btn btn-primary btn-sm\" disabled>User ID: #{{auth.currentUser.id}}  :  {{person.firstname}} {{person.lastname}}</button>\n        <div class=\"list-group\">\n          <!-->can_organize\":\"active\",\"can_referee\":\"active\",\"status\":\"active\"-->\n          <span class=\"list-group-item active\">\n            <button type=\"button\" class=\"btn btn-success btn-sm\" disabled>Can Organize: {{user.can_organize}}</button>\n          <button type=\"button\" class=\"btn btn-warning btn-sm\" disabled>Can Referee: {{user.can_referee}}</button> <button type=\"button\"\n            class=\"btn btn-danger btn-sm\" disabled>Status: {{user.status}}</button>\n          <span *ngIf=\"user.can_referee == 'active'\">\n            Available to referee: <select class=\"selectpicker\" name=\"available\" [(ngModel)]=\"user.available\">\n            <option value=\"yes\">Yes</option>\n            <option value=\"no\">No</option>\n          </select>\n          </span>\n          </span>\n        </div>\n      </div>\n\n      <div class=\"list-group\" *ngIf=\"user.can_organize == 'no'\">\n        <label>In order to organize events, you need to <button type=\"button\" class=\"btn btn-sm btn-success\" (click)=\"onActivate()\">Activate </button> the Organizer account</label>\n      </div>\n      <div class=\"list-group\" *ngIf=\"user.can_referee == 'no'\">\n        <label>Do you want to be a referee? please click <button type=\"button\" class=\"btn btn-sm btn-warning\" (click)=\"onRefereeActivate()\">Activate </button> to activate your referee account</label>\n      </div>\n      <div class=\"list-group\" *ngIf=\"user.can_organize == 'active'\">\n        <label>Please click <button type=\"button\" class=\"btn btn-sm btn btn-success\" (click)=\"onOrganize()\">Organize </button> to <strong>organize or request referee(s)</strong> to your event(s)</label>\n      </div>\n      <h4 class=\"card-header elegantshd bigFont\">Announcements</h4>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/account/account.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/account/account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("./client/app/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AccountComponent = /** @class */ (function () {
    function AccountComponent(auth, toast, userService) {
        this.auth = auth;
        this.toast = toast;
        this.userService = userService;
        this.user = {};
        this.person = {};
        this.isLoading = true;
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    AccountComponent.prototype.getProfile = function () {
        var _this = this;
        this.userService.getProfile(this.auth.currentUser.id).subscribe(function (res) {
            _this.user = {
                id: String(res.id),
                email: res.email,
                authorization: String(res.authorization),
                firstname: res.person.firstname,
                lastname: res.person.lastname,
                role: '',
                person_id: String(res.person.id),
                can_referee: res.can_referee,
                can_organize: res.can_organize,
                status: res.status
            };
            _this.person = res.person;
            _this.isLoading = false;
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile');
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile');
            }
            // this.isLoading = false;
            if (!_this.auth.loggedIn) {
                // this.abort = true;
                _this.auth.logout();
            }
        });
    };
    AccountComponent.prototype.onActivate = function () {
        // Activate the account as Organizer
    };
    AccountComponent.prototype.onOrganize = function () {
        // events or request referee(s) as Organizer
    };
    AccountComponent.prototype.onRefereeActivate = function () {
        // Become a refereee
    };
    AccountComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-account',
            template: __webpack_require__("./client/app/account/account.component.html"),
            styles: [__webpack_require__("./client/app/account/account.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["e" /* UserService */]])
    ], AccountComponent);
    return AccountComponent;
}());



/***/ }),

/***/ "./client/app/account/profile/deactivated/deactivated.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <h4 class=\"card-header elegantshd bigFont\">Account deactivated</h4>\n      <div class=\"card-block\">\n        <button type=\"button\" class=\"btn btn-primary\" disabled>User ID: #{{user.id}}  :  {{person.firstname}} {{person.lastname}}</button>\n        <div class=\"list-group\">\n          <!-->can_organize\":\"active\",\"can_referee\":\"active\",\"status\":\"active\"-->\n          <span class=\"list-group-item active\">\n            <button type=\"button\" class=\"btn btn-success\" disabled>Can Organize: {{user.can_organize}}</button>\n          <button type=\"button\" class=\"btn btn-warning\" disabled>Can Referee: {{user.can_referee}}</button> <button type=\"button\"\n            class=\"btn btn-danger\" disabled>Status: {{user.status}}</button>\n          </span>\n        </div>\n        <div class=\"card\">\n          <div class=\"card-block numberbg\">\n            <p>Sorry, your account has been deactivated.</p>\n            <p>Please <span class=\"profile-text\">contact us</span> today and someone will get in touch with you to resolve the issue</p>\n            <br><br>\n            <p>Thank you!</p>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/account/profile/deactivated/deactivated.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/account/profile/deactivated/deactivated.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DeactivatedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var DeactivatedComponent = /** @class */ (function () {
    function DeactivatedComponent(auth, userService) {
        this.auth = auth;
        this.userService = userService;
        this.user = {};
        this.person = {};
    }
    DeactivatedComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    DeactivatedComponent.prototype.getProfile = function () {
        var _this = this;
        this.userService.getProfile(this.auth.currentUser.id).subscribe(function (res) {
            _this.user = {
                id: String(res.id),
                email: res.email,
                authorization: String(res.authorization),
                firstname: res.person.firstname,
                lastname: res.person.lastname,
                role: '',
                person_id: String(res.person.id),
                can_referee: res.can_referee,
                can_organize: res.can_organize,
                status: res.status
            };
            _this.person = res.person;
        }, function (err) {
            if (err.error instanceof Error) {
                console.log('A client-side or network error occurred for the Profile');
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile');
            }
            if (!_this.auth.loggedIn) {
                _this.auth.logout();
            }
        });
    };
    DeactivatedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-deactivated',
            template: __webpack_require__("./client/app/account/profile/deactivated/deactivated.component.html"),
            styles: [__webpack_require__("./client/app/account/profile/deactivated/deactivated.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* UserService */]])
    ], DeactivatedComponent);
    return DeactivatedComponent;
}());



/***/ }),

/***/ "./client/app/account/profile/edit-profile/edit-profile.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n\n<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n\n      <h4 class=\"card-header elegantshd bigFont\">{{message}}</h4>\n\n      <app-toast [message]=\"toast.message\"></app-toast>\n\n      <div class=\"card-block\" *ngIf=\"divPasswordFlag\">\n        <div class=\"card-block\">\n          <password-form [password]=\"password\" (savePassword)=\"onPasswordSubmit($event)\"></password-form>\n        </div>\n      </div>\n\n      <!--Bio info-->\n      <div class=\"card-block\" *ngIf=\"divBioFlag\">\n        <div class=\"card-block\">\n          <bio-form [person]=\"person\" (saveBio)=\"onBioSubmit($event)\"></bio-form>\n        </div>\n      </div>\n\n      <!--Phones-->\n      <div class=\"card-block\" *ngIf=\"divPhoneFlag\">\n        <phone-form [phone]=\"phone\" (savePhone)=\"onPhoneSubmit($event)\"></phone-form>\n      </div>\n\n      <!--Address-->\n      <div class=\"card-block\" *ngIf=\"divAddressFlag\">\n        <div class=\"card-block\">\n            <address-form [address]=\"address\" [states]=\"states\" (saveAddress)=\"onAddressSubmit($event)\"></address-form>\n        </div>\n      </div>\n\n      <!--Available venue-->\n      <div class=\"card-block\" *ngIf=\"divZoneFlag\">\n        <div class=\"card-block\">\n            <zone-form zone=\"zone\"></zone-form>\n        </div>\n      </div>\n\n      <!--Payment-->\n      <div class=\"card-block\" *ngIf=\"divPaymentFlag\">\n        <div class=\"card-block\">\n          <div class=\"card card-outline-success\">\n            <div class=\"card-block numberbg\">\n\n              <form [formGroup]=\"passwordForm\" (ngSubmit)=\"onPaymentSubmit()\" *ngIf=\"showDivPayment else showDivPaymentmsg\">\n                <p>Please update your payment preference. </p>\n                <div class=\"profile-div\">\n                  <div class=\"form-group\">\n                    <label class=\"custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0\">\n                      <input type=\"checkbox\" class=\"custom-control-input\" [value]=\"paypalFlag\" [(ngModel)]=\"paypalFlag\" >\n                      <span class=\"custom-control-indicator\"></span>\n                      <span class=\"custom-control-description\">Paypal </span>\n                      <input class=\"form-control\" formControlName=\"paypalinfo\">\n                    </label>\n                  </div>\n\n                  <div class=\"form-group\">\n                    <label class=\"custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0\">\n                      <input type=\"checkbox\" class=\"custom-control-input\" [value]=\"checkFlag\" [(ngModel)]=\"checkFlag\" >\n                      <span class=\"custom-control-indicator\"></span>\n                      <span class=\"custom-control-description\">Check </span>\n                    </label>\n                  </div>\n\n                  <div class=\"form-group\">\n                    <label class=\"custom-control custom-checkbox mb-2 mr-sm-2 mb-sm-0\">\n                      <input type=\"checkbox\" class=\"custom-control-input\" [value]=\"ccFlag\" [(ngModel)]=\"ccFlag\" >\n                      <span class=\"custom-control-indicator\"></span>\n                      <span class=\"custom-control-description\">Credit Card </span>\n                      <input class=\"form-control\" formControlName=\"ccinfo\">\n                    </label>\n                  </div>\n\n                </div>\n\n                <div>\n                  <button type=\"submit\" class=\"btn btn-primary btn-sm\" [disabled]=\"passwordForm.invalid\">\n                    <i class=\"fa fa-save\"></i>Save\n                  </button>\n                  <button class=\"btn btn-outline-secondary btn-sm\" type=\"button\" (click)=\"onCancel()\">\n                <i class=\"fa fa-ban\"></i>Cancel\n                </button>\n                </div>\n              </form>\n  \n              <ng-template #showDivPaymentmsg>\n                <blockquote>\n                  <p>Your payment preference was successfully updated.</p>\n                </blockquote>\n              </ng-template>\n\n            </div>\n          </div>\n        </div>\n      </div>\n\n      <!--End-->\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/account/profile/edit-profile/edit-profile.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/account/profile/edit-profile/edit-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_index__ = __webpack_require__("./client/app/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var EditProfileComponent = /** @class */ (function () {
    function EditProfileComponent(formBuilder, auth, toast, profileService, userService, route, router, statesService) {
        this.formBuilder = formBuilder;
        this.auth = auth;
        this.toast = toast;
        this.profileService = profileService;
        this.userService = userService;
        this.route = route;
        this.router = router;
        this.statesService = statesService;
        this.messages = {
            password: 'Change Your Password',
            bio: 'Update Your Information',
            phone: 'Update Your Phones',
            address: 'Update Your Address',
            zone: 'Update Your Available Zone',
            payment: 'Update Your Payment'
        };
        this.password = '';
        this.message = '';
        this.divPasswordFlag = false;
        this.divBioFlag = false;
        this.divPhoneFlag = false;
        this.divAddressFlag = false;
        this.divZoneFlag = false;
        this.divPaymentFlag = false;
        this.paypalFlag = false;
        this.checkFlag = false;
        this.ccFlag = false;
        this.paypal = '';
        this.user = {};
        this.addresses = [];
        this.phones = [];
        this.areas = [];
        this.isLoading = true;
        this.abort = false;
        this.showDivreset = false;
        this.showDivbio = false;
        this.showDivPhone = false;
        this.showDivAddress = false;
        this.showDivZone = false;
        this.showDivPayment = false;
        this.email = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email
        ]);
        this.paypalinfo = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].nullValidator
        ]);
        this.check = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].nullValidator]);
        this.ccinfo = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].nullValidator]);
        this.subscribeToParams(route);
    }
    EditProfileComponent.prototype.subscribeToParams = function (route) {
        var _this = this;
        this.paymentForm = this.formBuilder.group({
            paypalFlag: this.paypalFlag,
            paypalinfo: this.paypalinfo,
            checkFlag: this.checkFlag,
            ccFlag: this.ccFlag,
            ccinfo: this.ccinfo
        });
        route.queryParams.subscribe(function (data) {
            _this.resetDivs();
            _this.user = _this.profileService.getData();
            var action = '';
            if (data['divPassword'] === 'password') {
                action = 'password';
                _this.divPasswordFlag = true;
                _this.showDivreset = true;
            }
            else if (data['divBio'] === 'bio') {
                action = 'bio';
                _this.person = _this.profileService.getPerson();
                _this.divBioFlag = true;
                _this.showDivbio = true;
            }
            else if (data['divPhone'] !== undefined) {
                action = 'phone';
                _this.createPhoneForm(data);
            }
            else if (data['divAddress'] !== undefined) {
                action = 'address';
                _this.createAddressForm(data);
            }
            else if (data['divZone'] !== undefined) {
                action = 'zone';
                _this.createZoneForm(data);
            }
            else if (data['divPayment'] === 'payment') {
                action = 'payment';
                _this.divPaymentFlag = true;
                _this.showDivPayment = true;
            }
            _this.message = _this.messages[action];
        });
    };
    EditProfileComponent.prototype.createAddressForm = function (data) {
        this.addresses = this.profileService.getAddresses();
        var addressId = Number(data['divAddress']);
        var address = this.addresses.find(function (address) {
            return Number(address.id) === addressId;
        });
        this.address = address;
        this.divAddressFlag = true;
        this.showDivAddress = true;
    };
    EditProfileComponent.prototype.createPhoneForm = function (data) {
        this.phones = this.profileService.getPhones();
        var phoneId = Number(data['divPhone']);
        var phone = this.phones.find(function (phone) {
            return Number(phone.id) === phoneId;
        });
        this.phone = phone;
        this.divPhoneFlag = true;
        this.showDivPhone = true;
    };
    EditProfileComponent.prototype.createZoneForm = function (data) {
        this.areas = this.profileService.getAreas();
        var areaId = Number(data['divAddress']);
        var area = this.areas.find(function (area) {
            return Number(area.id) === areaId;
        });
        this.area = area;
        this.divZoneFlag = true;
        this.showDivZone = true;
    };
    EditProfileComponent.prototype.ngOnInit = function () {
        this.states = this.statesService.getStates();
    };
    EditProfileComponent.prototype.save = function (user) {
        var _this = this;
        this.userService
            .editUser(user)
            .subscribe(function (res) { return _this.toast.setMessage('account settings saved!', 'success'); }, function (error) { return console.log(error); });
    };
    EditProfileComponent.prototype.onCancel = function () {
        this.resetDivs();
    };
    EditProfileComponent.prototype.resetDivs = function () {
        this.divBioFlag = false;
        this.showDivbio = false;
        this.divPasswordFlag = false;
        this.showDivreset = false;
        this.divPhoneFlag = false;
        this.showDivPhone = false;
        this.divAddressFlag = false;
        this.showDivAddress = false;
        this.divZoneFlag = false;
        this.showDivZone = false;
        this.divPaymentFlag = false;
        this.showDivPayment = false;
    };
    EditProfileComponent.prototype.callSuccess = function (res) {
        this.toast.setMessage(res.message, 'success');
        this.onCancel();
    };
    EditProfileComponent.prototype.callFailure = function (err, message) {
        if (message === void 0) { message = 'This email address does not exists'; }
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            this.toast.setMessage(message, 'danger');
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
        }
        this.resetDivs();
    };
    EditProfileComponent.prototype.onPasswordSubmit = function (newPassword) {
        var _this = this;
        this.userService.changepassword(newPassword, this.user.id).subscribe(function (res) { return _this.callSuccess(res); }, function (err) {
            _this.callFailure(err);
            _this.divPasswordFlag = true;
            _this.showDivreset = true;
        });
    };
    EditProfileComponent.prototype.onBioSubmit = function (bio) {
        var _this = this;
        bio.dob = Number(bio.dob.epoc) * 1000;
        this.userService.updatePerson(bio, this.person.id).subscribe(function (res) { return _this.callSuccess(res); }, function (err) {
            _this.callFailure(err);
            _this.divBioFlag = true;
            _this.showDivbio = true;
        });
    };
    EditProfileComponent.prototype.onAddressSubmit = function (newAddress) {
        if (Number(this.address.id) === 0) {
            this.createAddress(newAddress);
        }
        else {
            this.updateAddress(newAddress);
        }
    };
    EditProfileComponent.prototype.createAddress = function (newAddress) {
        var _this = this;
        this.userService.createAddress(newAddress, this.user.id).subscribe(function (res) { return _this.callSuccess(res); }, function (err) {
            _this.callFailure(err);
            _this.divAddressFlag = true;
            _this.showDivAddress = true;
        });
    };
    EditProfileComponent.prototype.updateAddress = function (newAddress) {
        var _this = this;
        this.userService
            .updateAddress(newAddress, this.user.id, this.address.id)
            .subscribe(function (res) { return _this.callSuccess(res); }, function (err) {
            _this.callFailure(err);
            _this.divAddressFlag = true;
            _this.showDivAddress = true;
        });
    };
    EditProfileComponent.prototype.onPhoneSubmit = function (newPhone) {
        if (Number(this.phone.id) === 0) {
            this.createPhone(newPhone);
        }
        else {
            this.updatePhone(newPhone);
        }
    };
    EditProfileComponent.prototype.createPhone = function (newPhone) {
        var _this = this;
        this.userService.createPhone(newPhone, this.user.id).subscribe(function (res) { return _this.callSuccess(res); }, function (err) {
            _this.callFailure(err);
            _this.divPhoneFlag = true;
            _this.showDivPhone = true;
        });
    };
    EditProfileComponent.prototype.updatePhone = function (newPhone) {
        var _this = this;
        this.userService
            .updatePhone(newPhone, this.user.id, this.phone.id)
            .subscribe(function (res) { return _this.callSuccess(res); }, function (err) {
            _this.callFailure(err);
            _this.divPhoneFlag = true;
            _this.showDivPhone = true;
        });
    };
    EditProfileComponent.prototype.onZoneSubmit = function (newZone) {
        var _this = this;
        this.userService
            .updateZone(newZone, this.user.id)
            .subscribe(this.callSuccess, function (err) {
            _this.callFailure(err);
            _this.divZoneFlag = true;
            _this.showDivZone = true;
        });
    };
    EditProfileComponent.prototype.onPaymentSubmit = function () {
        var _this = this;
        this.userService
            .updatePayment(this.paymentForm.value, this.user)
            .subscribe(this.callSuccess, function (err) {
            _this.callFailure(err);
            _this.divPaymentFlag = true;
            _this.showDivPayment = true;
        });
    };
    EditProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-edit-profile',
            template: __webpack_require__("./client/app/account/profile/edit-profile/edit-profile.component.html"),
            styles: [__webpack_require__("./client/app/account/profile/edit-profile/edit-profile.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["c" /* ProfileService */],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["e" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["d" /* StatesService */]])
    ], EditProfileComponent);
    return EditProfileComponent;
}());



/***/ }),

/***/ "./client/app/account/profile/passwordreset/passwordreset.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <h4 class=\"card-header elegantshd bigFont\">Reset Your Password</h4>\n      <div class=\"card-block\">\n        <div class=\"card\">\n          <div class=\"card-block numberbg\">\n\n            <form [formGroup]=\"emailForm\" (ngSubmit)=\"onSubmit()\"  *ngIf=\"!hideShowDiv else showDiv\" >\n              <p>Please provided your username below to reset your password. </p>\n\n                <div class=\"input-group\" [ngClass]=\"setClassEmail()\">\n                <span class=\"input-group-addon\"><i class=\"fa fa-envelope\"></i></span>\n                <input class=\"form-control\" type=\"email\" name=\"email\" formControlName=\"email\" placeholder=\"Email\" autofocus>\n              </div>\n            <br>\n              <p><button type=\"submit\" class=\"btn btn-primary btn-sm\" [disabled]=\"!emailForm.valid\"> <i class=\"fa fa-paper-plane\"></i>Submit</button>\n              <button class=\"btn btn-outline-secondary btn-sm\" type=\"button\" (click)=\"onCancel()\"><i class=\"fa fa-ban\"></i>Cancel</button>\n              </p>\n\n              <p>or if you've forgotten your username, <span class=\"profile-text\">contact us</span> and someone would get in touch with you.</p>\n\n            </form>\n            <ng-template #showDiv>\n              <blockquote>\n                <p>An email has been sent to you {{divMessage}}</p>\n                <p>Please check your email and then copy the passcode to reset your password.</p>\n                <p> <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"onReset()\"><i class=\"fa fa-key\"></i>Reset Password</button></p>\n              </blockquote>\n            </ng-template>\n  \n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/account/profile/passwordreset/passwordreset.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/account/profile/passwordreset/passwordreset.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordresetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PasswordresetComponent = /** @class */ (function () {
    function PasswordresetComponent(formBuilder, router, toast, userService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.toast = toast;
        this.userService = userService;
        this.divMessage = '';
        this.hideShowDiv = false;
        this.email = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email
        ]);
    }
    PasswordresetComponent.prototype.ngOnInit = function () {
        this.emailForm = this.formBuilder.group({
            email: this.email
        });
    };
    PasswordresetComponent.prototype.onCancel = function () {
        this.router.navigate(['/login']);
    };
    PasswordresetComponent.prototype.onLogin = function () {
        this.router.navigate(['/login']);
    };
    PasswordresetComponent.prototype.onReset = function () {
        this.router.navigate(['/reset']);
    };
    PasswordresetComponent.prototype.onSubmit = function () {
        var _this = this;
        this.userService.forgotpassword(this.emailForm.value).subscribe(function (res) {
            _this.toast.setMessage(res.message, 'success');
            _this.divMessage = res.message;
            _this.hideShowDiv = true;
            _this.router.navigate(['/login']);
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                _this.toast.setMessage('This email address does not exists', 'danger');
                _this.hideShowDiv = false;
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                _this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
                _this.hideShowDiv = false;
            }
        });
    };
    PasswordresetComponent.prototype.setClassEmail = function () {
        return { 'has-danger': !this.email.pristine && !this.email.valid };
    };
    PasswordresetComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-passwordreset',
            template: __webpack_require__("./client/app/account/profile/passwordreset/passwordreset.component.html"),
            styles: [__webpack_require__("./client/app/account/profile/passwordreset/passwordreset.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_3__services_index__["e" /* UserService */]])
    ], PasswordresetComponent);
    return PasswordresetComponent;
}());



/***/ }),

/***/ "./client/app/account/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <h4 class=\"card-header elegantshd bigFont\">User's Profile</h4>\n\n      <div class=\"card-block card-outline-primary\">\n\n        <div class=\"list-group\" style=\"margin-top: 2em;\">\n          <span class=\"list-group-item\">\n            <span class=\"btn btn-sm btn-primary disabled\">User ID:&nbsp;&nbsp;{{user.id}}</span>\n            <span class=\"btn btn-sm btn-success disabled\">Can Organize::&nbsp;&nbsp;{{user.can_organize}}</span>\n            <span class=\"btn btn-sm btn-warning disabled\">Can Referee::&nbsp;&nbsp;{{user.can_referee}}</span>\n            <span class=\"btn btn-sm btn-danger disabled\">Status::&nbsp;&nbsp;{{user.status}}</span>\n          </span>\n        </div>\n\n        <div class=\"col-8 profiles\">\n          <div class=\"card\">\n            <div *ngIf=\"!editBio\" class=\"fadeInForm\">\n              <div>\n                <strong>Personal details</strong>\n              </div>\n\n              <div>\n                <label class=\"profileLabel\">Firstname:</label>\n                <span class=\"profileItem\">{{person.firstname}}</span>\n              </div>\n              <ng-container *ngIf=\"middlenameFlag\">\n                <div>\n                  <label class=\"profileLabel\">Middlename: </label>\n                  <span class=\"profileItem\">{{person.middlenames}}</span>\n                </div>\n              </ng-container>\n\n              <div>\n                <label class=\"profileLabel\">Lastname:</label>\n                <span class=\"profileItem\">{{person.lastname}}</span>\n              </div>\n\n              <div>\n                <label class=\"profileLabel\">Gender:</label>\n                <span class=\"profileItem\">{{person.gender}}</span>\n              </div>\n\n              <div>\n                <label class=\"profileLabel\">D.O.B:</label>\n                <span class=\"profileItem\">{{birthday}}</span>\n              </div>\n\n              <button class=\"btn btn-primary btn-sm buttonSize\" (click)=\"setEditBio(true)\" title=\"Edit personal details.\">EDIT</button>\n            </div>\n            <bio-form *ngIf=\"editBio\" [person]=\"person\" (saveBio)=\"onBioSubmit($event)\" (cancelForm)=\"onFormCancel($event)\"></bio-form>\n          </div>\n\n          <div class=\"card\">\n            <div *ngIf=\"!editPassword\">\n              <div>\n                <strong>Credentials</strong>\n              </div>\n              <div>\n                <label class=\"profileLabel\">Email: </label>\n                <span class=\"profileItem\">{{user.email}}</span>\n              </div>\n              <div>\n                <label class=\"profileLabel\">Password: </label>\n                <span class=\"profileItem\">***********</span>\n              </div>\n\n              <button class=\"btn btn-primary btn-sm buttonSize\" (click)=\"setEditPassword(true)\" title=\"Change password credentials.\">CHANGE</button>\n\n            </div>\n            <password-form *ngIf=\"editPassword\" [user]=\"user\" (savePassword)=\"onPasswordSubmit($event)\" (cancelForm)=\"onFormCancel($event)\"></password-form>\n          </div>\n\n          <div class=\"card\">\n            <div>\n              <strong>Phone</strong>\n            </div>\n\n            <ng-container *ngIf=\"!editPhone && phones.length === 0\">\n              <div class=\"list-group\" *ngIf=\"addresses.length === 0\">\n                <span class=\"list-group-item\">\n                    <strong>There are no phones set up for you.</strong>\n                  </span>\n              </div>\n            </ng-container>\n            <phone-form *ngIf=\"editPhone && currentPhone === 0\" [phoneService]=\"profileService\" [phone]=\"dummyPhone\" (savePhone)=\"onPhoneSubmit($event)\" (cancelForm)=\"onFormCancel($event)\"></phone-form>\n\n            <ng-container *ngIf=\"phones.length > 0\">\n              <div class=\"list-group\" *ngFor=\"let phone of phones\">\n                <div *ngIf=\"!editPhone\">\n                  <button class=\"btn btn-primary btn-sm buttonSize\" title=\"Edit phone.\" (click)=\"setEditPhone(phone.id,true)\">EDIT</button>\n                  <span class=\"list-group-item\">\n                      <label class=\"profileLabel\">{{phone.description}} Phone:</label>\n                      <span class=\"profileItem\">{{phone.number}}</span>\n                  </span>\n                </div>\n                <phone-form *ngIf=\"editPhone && currentPhone === phone.id\" [phoneService]=\"profileService\" [phone]=\"phone\" (savePhone)=\"onPhoneSubmit($event)\" (cancelForm)=\"onFormCancel($event)\"></phone-form>\n              </div>\n            </ng-container>\n\n            <button *ngIf=\"!editPhone && phones.length < 3\" class=\"btn btn-primary btn-sm buttonSize\" title=\"Add new phone.\" (click)=\"setEditPhone(0,true)\">ADD</button>\n\n          </div>\n\n          <div class=\"card\">\n            <div>\n              <strong>Address</strong>\n            </div>\n\n            <ng-container *ngIf=\"!editAddress && addresses.length === 0\">\n              <div class=\"list-group\" *ngIf=\"!editAddress\">\n                <span class=\"list-group-item\">\n                    <strong> There are no addresses set up for you.</strong>\n                  </span>\n              </div>\n            </ng-container>\n            <address-form *ngIf=\"editAddress && currentAddress === 0\" [addressService]=\"profileService\" [address]=\"dummyAddress\" [country]=\"usa\" (saveAddress)=\"onAddressSubmit($event)\" (cancelForm)=\"onFormCancel($event)\"></address-form>\n\n            <ng-container *ngIf=\"addresses.length > 0\">\n              <div class=\"list-group\" *ngFor=\"let address of addresses\">\n                <div *ngIf=\"!editAddress\">\n                  <button class=\"btn btn-primary btn-sm buttonSize\" title=\"Edit address.\" (click)=\"setEditAddress(address.id,true)\">EDIT</button>\n                  <div>\n                    <label class=\"profileLabel\">Address Line 1:</label>\n                    <span class=\"profileItem\">{{address.line1}}</span>\n                  </div>\n                  <div>\n                    <label class=\"profileLabel\">Address Line 2:</label>\n                    <span class=\"profileItem\">{{address.line2}}</span>\n                  </div>\n                  <div>\n                    <label class=\"profileLabel\">City:</label>\n                    <span class=\"profileItem\">{{address.city}}</span>\n                  </div>\n                  <div>\n                    <label class=\"profileLabel\">State: </label>\n                    <span class=\"profileItem\">{{address.state}}</span>\n                  </div>\n                  <div>\n                    <label class=\"profileLabel\">ZIP code:</label>\n                    <span class=\"profileItem\">{{address.zip}}</span>\n                  </div>\n                </div>\n                <address-form [addressService]=\"profileService\" [address]=\"address\" *ngIf=\"editAddress && currentAddress === address.id\" [country]=\"usa\" (saveAddress)=\"onAddressSubmit($event)\" (cancelForm)=\"onFormCancel($event)\"></address-form>\n              </div>\n            </ng-container>\n\n            <button *ngIf=\"!editAddress && addresses.length < 4\" class=\"btn btn-primary btn-sm buttonSize\" title=\"Add new address.\" (click)=\"setEditAddress(0,true)\">ADD</button>\n          </div>\n\n        </div>\n\n      </div>\n    </div>\n\n    <div class=\"overlay\" *ngIf=\"isLoading\">\n      <i class=\"fa fa-circle-o-notch fa-spin fa-3x\" style=\"top:50%; right:50%\"></i>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/account/profile/profile.component.scss":
/***/ (function(module, exports) {

module.exports = ".list-group {\n  margin-bottom: 2em; }\n\n/*\n.profiles {\n\tmax-width: 43.75rem;\n\tmargin:auto auto;\n}\n*/\n\n.profiles .card:nth-child(1) {\n  z-index: 10; }\n\n.profile-div {\n  margin-left: 1em; }\n\n.profile-text {\n  font-size: 1.125rem;\n  color: blue; }\n\n.profile-text2 {\n  color: red;\n  text-indent: 3.125rem;\n  font-weight: bolder;\n  background-color: #fff; }\n\ndiv.card {\n  padding: 2em; }\n\n.card-block .card {\n  margin: 1em; }\n\n.profileLabel {\n  text-align: right;\n  width: 28%;\n  margin: auto 1%; }\n\n.profileItem {\n  display: inline-block;\n  width: 67%;\n  margin: auto 1%; }\n\n.overlay {\n  position: absolute;\n  top: 0;\n  left: 0;\n  opacity: 0.7;\n  width: 100%;\n  height: 100%;\n  background: #fff; }\n\n/*margin: auto 4px auto 0;*/\n"

/***/ }),

/***/ "./client/app/account/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment__ = __webpack_require__("./node_modules/moment/moment.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





// End
var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(route, router, auth, profileService, userService) {
        this.route = route;
        this.router = router;
        this.auth = auth;
        this.profileService = profileService;
        this.userService = userService;
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
        this.addresses = [];
        this.phones = [];
    }
    ProfileComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    ProfileComponent.prototype.canDeactivate = function () {
        if (!this.allowEdit) {
            return true;
        }
    };
    ProfileComponent.prototype.getProfile = function () {
        var _this = this;
        this.isLoading = true;
        this.profileService.getProfile(this.auth.currentUser.id).subscribe(function (profile) {
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
            _this.addresses = __WEBPACK_IMPORTED_MODULE_3_lodash__["sortBy"](profile.addresses, 'id');
            _this.phones = __WEBPACK_IMPORTED_MODULE_3_lodash__["sortBy"](profile.phones, 'id');
            _this.birthday = __WEBPACK_IMPORTED_MODULE_4_moment__(profile.person.dob).format('LL');
            if (JSON.stringify(profile.person.middlenames) !== 'null') {
                _this.middlenameFlag = true;
            }
            _this.isLoading = false;
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
    };
    ProfileComponent.prototype.onFormCancel = function (value) {
        this.clearEdits();
    };
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-profile',
            template: __webpack_require__("./client/app/account/profile/profile.component.html"),
            styles: [__webpack_require__("./client/app/account/profile/profile.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* ProfileService */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["e" /* UserService */]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./client/app/account/profile/reset/reset.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <h4 class=\"card-header elegantshd bigFont\">Reset Your Password</h4>\n      <div class=\"card-block\">\n        <div class=\"card\">\n          <div class=\"card-block numberbg\">\n\n                <form [formGroup]=\"passwordForm\" (ngSubmit)=\"onResetSubmit()\" *ngIf=\"showDivreset else showDivresetmsg\">\n                  <p>Please fill up the fields below to reset your password. </p>\n                  <div class=\"input-group\" [ngClass]=\"setClassEmail1()\">\n                    <span class=\"input-group-addon\"><i class=\"fa fa-envelope\"></i></span>\n                    <input class=\"form-control\" type=\"email\" name=\"email\" formControlName=\"email\" placeholder=\"Email\" autofocus>\n                  </div>\n                  <div class=\"input-group\" [ngClass]=\"setClassPasscode()\">\n                    <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n                    <input class=\"form-control\" type=\"password\" name=\"passcode\" [(ngModel)]=\"passcode\" formControlName=\"passcode\" placeholder=\"Passcode\">\n                  </div>\n                  <div class=\"input-group\" [ngClass]=\"setClassPassword1()\">\n                    <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n                    <input class=\"form-control\" type=\"password\" name=\"password1\" formControlName=\"password1\" placeholder=\"New password\">\n                  </div>\n                  <div class=\"input-group\" [ngClass]=\"setClassPassword2()\">\n                    <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n                    <input class=\"form-control\" type=\"password\" name=\"password2\" formControlName=\"password2\" placeholder=\"Repeat new password\">\n                  </div>\n                  <br>\n                  <p><button type=\"submit\" class=\"btn btn-primary btn-sm\" [disabled]=\"!passwordForm.valid\"> <i class=\"fa fa-paper-plane\"></i>Submit</button>\n                    <button class=\"btn btn-outline-secondary btn-sm\" type=\"button\" (click)=\"onCancel()\"><i class=\"fa fa-ban\"></i>Cancel</button>\n                  </p>\n\n                  <p>If you are still having some issues resetting your password, please, <span class=\"profile-text\">contact us</span>                  and someone would get in touch with you.</p>\n\n                </form>\n              \n            <ng-template #showDivresetmsg>\n              <blockquote cite=\"\">\n                <p>Your password was successfully rest.</p>\n                <p>Please click this button to login\n                  <button class=\"btn btn-primary btn-sm\" type=\"button\" (click)=\"onLogin()\"><i class=\"fa fa-sign-in\"></i>Login</button></p>\n              </blockquote>\n            </ng-template>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/account/profile/reset/reset.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/account/profile/reset/reset.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetComponent = /** @class */ (function () {
    function ResetComponent(formBuilder, router, toast, userService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.toast = toast;
        this.userService = userService;
        this.showDivreset = true;
        this.email = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].email
        ]);
        this.passcode = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)
        ]);
        this.password1 = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)
        ]);
        this.password2 = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)
        ]);
    }
    ResetComponent.prototype.ngOnInit = function () {
        this.passwordForm = this.formBuilder.group({
            email: this.email,
            passcode: this.passcode,
            password1: this.password1,
            password2: this.password2
        });
    };
    ResetComponent.prototype.onCancel = function () {
        this.router.navigate(['/login']);
    };
    ResetComponent.prototype.onLogin = function () {
        this.router.navigate(['/login']);
    };
    ResetComponent.prototype.onReset = function () {
        this.router.navigate(['/reset']);
    };
    ResetComponent.prototype.onResetSubmit = function () {
        var _this = this;
        this.userService.resetpassword(this.passwordForm.value).subscribe(function (res) {
            _this.toast.setMessage(res.message, 'success');
            // this.hideShowDiv = true;
            _this.showDivreset = false;
            _this.router.navigate(['/login']);
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                _this.toast.setMessage('This email address does not exists', 'danger');
                _this.showDivreset = true;
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
                _this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
                // this.toast.setMessage('Backend returned code: ' + err.status + ' Error Status: ' + err.statusText, 'danger');
                _this.showDivreset = true;
            }
        }
        // error => console.log('An Error Occurred: ' + error),
        // () => this.toast.setMessage('email already exists', 'danger')
        // error => this.toast.setMessage('email already exists', 'danger')
        );
    };
    ResetComponent.prototype.setClassEmail1 = function () {
        return { 'has-danger': !this.email.pristine && !this.email.valid };
    };
    ResetComponent.prototype.setClassPasscode = function () {
        return { 'has-danger': !this.passcode.pristine && !this.passcode.valid };
    };
    ResetComponent.prototype.setClassPassword1 = function () {
        return { 'has-danger': !this.password1.pristine && !this.password1.valid };
    };
    ResetComponent.prototype.setClassPassword2 = function () {
        return { 'has-danger': !this.password2.pristine && !this.password2.valid };
    };
    ResetComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-reset',
            template: __webpack_require__("./client/app/account/profile/reset/reset.component.html"),
            styles: [__webpack_require__("./client/app/account/profile/reset/reset.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_3__services_index__["e" /* UserService */]])
    ], ResetComponent);
    return ResetComponent;
}());



/***/ }),

/***/ "./client/app/account/profile/standby/standby.component.html":
/***/ (function(module, exports) {

module.exports = "\n<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <h4 class=\"card-header elegantshd bigFont\">Activation in progress...</h4>\n      <div class=\"card-block\">\n          <button type=\"button\" class=\"btn btn-primary\" disabled>User ID: #{{user.id}}  :  {{person.firstname}} {{person.lastname}}</button>\n          <div class=\"list-group\">\n            <!-->can_organize\":\"active\",\"can_referee\":\"active\",\"status\":\"active\"-->\n            <span class=\"list-group-item active\">\n            <button type=\"button\" class=\"btn btn-success\" disabled>Can Organize: {{user.can_organize}}</button>\n          <button type=\"button\" class=\"btn btn-warning\" disabled>Can Referee: {{user.can_referee}}</button> <button type=\"button\"\n            class=\"btn btn-danger\" disabled>Status: {{user.status}}</button>\n          </span>\n          </div>\n        <div class=\"card\">\n          <div class=\"card-block numberbg\">\n            <p class=\"title=\">Thank you for registrating with us.</p>\n            <p>Your account is still under review and you will be contacted as soon as it made <strong>ACTIVE</strong></p>\n\n            <br><br>\n\n            <p>Get in touch with the administration by<span class=\"profile-text\"> Contacting us</span> today.</p>\n  \n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/account/profile/standby/standby.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/account/profile/standby/standby.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StandbyComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__("./client/app/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StandbyComponent = /** @class */ (function () {
    function StandbyComponent(auth, userService) {
        this.auth = auth;
        this.userService = userService;
        this.user = {};
        this.person = {};
    }
    StandbyComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    StandbyComponent.prototype.getProfile = function () {
        var _this = this;
        this.userService.getProfile(this.auth.currentUser.id).subscribe(function (res) {
            _this.user = {
                id: String(res.id),
                email: res.email,
                authorization: String(res.authorization),
                firstname: res.person.firstname,
                lastname: res.person.lastname,
                role: '',
                person_id: String(res.person.id),
                can_referee: res.can_referee,
                can_organize: res.can_organize,
                status: res.status
            };
            _this.person = res.person;
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile');
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile');
            }
            // this.isLoading = false;
            if (!_this.auth.loggedIn) {
                // this.abort = true;
                _this.auth.logout();
            }
        });
    };
    StandbyComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-standby',
            template: __webpack_require__("./client/app/account/profile/standby/standby.component.html"),
            styles: [__webpack_require__("./client/app/account/profile/standby/standby.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__services_index__["e" /* UserService */]])
    ], StandbyComponent);
    return StandbyComponent;
}());



/***/ }),

/***/ "./client/app/account/profile/suspended/suspended.component.html":
/***/ (function(module, exports) {

module.exports = "\n\n<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <h4 class=\"card-header elegantshd bigFont\">Account suspended</h4>\n      <div class=\"card-block\">\n        <button type=\"button\" class=\"btn btn-primary\" disabled>User ID: #{{user.id}}  :  {{person.firstname}} {{person.lastname}}</button>\n        <div class=\"list-group\">\n          <!-->can_organize\":\"active\",\"can_referee\":\"active\",\"status\":\"active\"-->\n          <span class=\"list-group-item active\">\n            <button type=\"button\" class=\"btn btn-success\" disabled>Can Organize: {{user.can_organize}}</button>\n          <button type=\"button\" class=\"btn btn-warning\" disabled>Can Referee: {{user.can_referee}}</button> <button type=\"button\"\n            class=\"btn btn-danger\" disabled>Status: {{user.status}}</button>\n          </span>\n        </div>\n        <div class=\"card\">\n          <div class=\"card-block numberbg\">\n            <form name=\"resetForm\" (ngSubmit)=\"onSubmit()\">\n              <p>Your account has been suspended due to multiple failed login attempts</p>\n              <p>Please, click this link to <button type=\"submit\" class=\"btn btn-primary\">Reset your password</button></p>\n              <p>or <span class=\"profile-text\">contact us</span> and someone would get in touch with you.</p>\n            </form>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/account/profile/suspended/suspended.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/account/profile/suspended/suspended.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuspendedComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var SuspendedComponent = /** @class */ (function () {
    function SuspendedComponent(auth, router, userService) {
        this.auth = auth;
        this.router = router;
        this.userService = userService;
        this.user = {};
        this.person = {};
    }
    SuspendedComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    SuspendedComponent.prototype.onSubmit = function () {
        this.router.navigate(['passwordreset']);
    };
    SuspendedComponent.prototype.getProfile = function () {
        var _this = this;
        this.userService.getProfile(this.auth.currentUser.id).subscribe(function (res) {
            _this.user = {
                id: String(res.id),
                email: res.email,
                authorization: String(res.authorization),
                firstname: res.person.firstname,
                lastname: res.person.lastname,
                role: '',
                person_id: String(res.person.id),
                can_referee: res.can_referee,
                can_organize: res.can_organize,
                status: res.status
            };
            _this.person = res.person;
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile');
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile');
            }
            // this.isLoading = false;
            if (!_this.auth.loggedIn) {
                // this.abort = true;
                _this.auth.logout();
            }
        });
    };
    SuspendedComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-suspended',
            template: __webpack_require__("./client/app/account/profile/suspended/suspended.component.html"),
            styles: [__webpack_require__("./client/app/account/profile/suspended/suspended.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__services_user_service__["a" /* UserService */]])
    ], SuspendedComponent);
    return SuspendedComponent;
}());



/***/ }),

/***/ "./client/app/account/schedule/schedule.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <h4 class=\"elegantshd bigFont\">Schedule</h4>\n      <div class=\"card-block\">\n        <blockquote>\n          <p>Sorry, we currently have no schedule at the moment.</p>\n        </blockquote>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/account/schedule/schedule.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/account/schedule/schedule.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ScheduleComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ScheduleComponent = /** @class */ (function () {
    function ScheduleComponent() {
    }
    ScheduleComponent.prototype.ngOnInit = function () { };
    ScheduleComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-schedule',
            template: __webpack_require__("./client/app/account/schedule/schedule.component.html"),
            styles: [__webpack_require__("./client/app/account/schedule/schedule.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], ScheduleComponent);
    return ScheduleComponent;
}());



/***/ }),

/***/ "./client/app/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row admin\">\n  <div class=\"col-4\">\n    <app-leftmenu></app-leftmenu>\n  </div>\n  <div class=\"col-8\">\n    <div class=\"main-wrapper\">\n      <app-loading [condition]=\"isLoading\"></app-loading>\n\n      <app-toast [message]=\"toast.message\"></app-toast>\n      <div class=\"card col-sm-12\">\n        <div class=\"card\" *ngIf=\"!isLoading\">\n          <h4 class=\"card-header\">Administrators Console</h4>\n          <div class=\"card-block\">\n            <button type=\"button\" class=\"btn btn-primary btn-sm\" disabled><strong>User ID: #{{user.id}}  :  {{person.firstname}} {{person.lastname}}</strong></button>\n            <div class=\"list-group\">\n              <span class=\"list-group-item active\">\n                <button type=\"button\" class=\"btn btn-success btn-sm\" (click)=\"onOfficials()\" ><strong>Officials</strong></button>\n                <button type=\"button\" class=\"btn btn-warning btn-sm\" (click)=\"onAssigning()\"><strong>Games</strong></button>\n              </span>\n            </div>\n          </div>\n        </div>\n      </div>\n      <router-outlet></router-outlet>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/admin/admin.component.scss":
/***/ (function(module, exports) {

module.exports = ".admin {\n  background-color: #4F4F6B; }\n"

/***/ }),

/***/ "./client/app/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




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
        this.profileService.getProfile(this.auth.currentUser.id).subscribe(function (res) {
            _this.data = res;
            _this.user = res;
            _this.person = res.person;
            _this.addresses = res.addresses;
            _this.phones = res.phones;
            if (JSON.stringify(res.person.middlenames) !== 'null') {
                _this.middlenameFlag = true;
            }
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile', _this.auth.loggedIn);
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile', _this.auth.loggedIn);
            }
            _this.isLoading = false;
        });
    };
    AdminComponent.prototype.onOfficials = function () {
        this.router.navigate(['/officials']);
    };
    AdminComponent.prototype.onAssigning = function () {
        this.router.navigate(['/games']);
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
        // this.onCancel();
    };
    AdminComponent.prototype.callFailure = function (err, message) {
        if (message === void 0) { message = 'An error occurred'; }
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            this.toast.setMessage(message, 'danger');
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
        }
    };
    AdminComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rar-admin',
            template: __webpack_require__("./client/app/admin/admin.component.html"),
            styles: [__webpack_require__("./client/app/admin/admin.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["c" /* ProfileService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["e" /* UserService */]])
    ], AdminComponent);
    return AdminComponent;
}());



/***/ }),

/***/ "./client/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"windowWidth > 599\" id=\"master-wrapper\"></div>\n<div class=\"container\">\n \n\t<app-header></app-header>\n\n\t<router-outlet></router-outlet>\n\n\t<app-footer *ngIf=\"windowWidth > 599  else tabletFooter\"></app-footer>\n\n\t<ng-template #tabletFooter>\n\t    <app-footer-tablet></app-footer-tablet>\n\t</ng-template>\n</div>\n"

/***/ }),

/***/ "./client/app/app.component.scss":
/***/ (function(module, exports) {

module.exports = "html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dd, dl, dt, li, ol, ul, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {\n  font: normal 16px/18.66px \"Arial\", Helvetica, sans-serif;\n  margin: 0;\n  padding: 0; }\n\n.container {\n  margin-left: 1.25em;\n  margin-right: 1.25em;\n  max-width: 95%;\n  padding-left: 1.25em;\n  padding-right: 1.25em; }\n\n.wrapper {\n  -webkit-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.75);\n          box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.75);\n  background: white;\n  margin: 0 auto;\n  padding: 0;\n  width: 62.5rem; }\n\n.navigatorwidget {\n  float: left;\n  height: auto;\n  list-style-type: none;\n  margin-bottom: 5px;\n  position: relative;\n  width: 13.625em; }\n\n.navigatorwidget ul.news-navigator li a:link, .navigatorwidget ul.news-navigator li a:visited {\n    background: none; }\n\n.navigatorwidget ul.post-navigator li a:link, .navigatorwidget ul.post-navigator li a:visited {\n    background: none; }\n\n.navigatorwidget li ul li a, .navigatorwidget li a:visited ul li a, .navigatorwidget li li a:link, .navigatorwidget li li a:visited {\n    border-bottom: 0;\n    color: black;\n    font-weight: normal;\n    padding: 3px 12px;\n    text-decoration: underline; }\n\n.navigatorwidget li ul li a:hover, .navigatorwidget li a:visited ul li a:hover {\n    color: #faa21b;\n    text-decoration: underline; }\n\n.navigatorwidget li {\n    color: black;\n    list-style-type: none;\n    text-transform: uppercase;\n    font-size: 0.75rem; }\n\n.navigatorwidget li a {\n      display: block;\n      padding: 0.1875rem;\n      text-decoration: none; }\n\n.navigatorwidget li a:link, .navigatorwidget li a:visited, .navigatorwidget li a.open {\n      padding: 0.3125em 1.25em; }\n\n.navigatorwidget li ul {\n      display: none;\n      overflow: hidden;\n      padding: 0 0 0.625em 1.25em; }\n\n.navigatorwidget li ul li {\n        font-size: 12px;\n        text-transform: none; }\n\n* html .navigatorwidget {\n  height: 30em; }\n\n* html .navigatorwidget a, * html .navigatorwidget li {\n    height: 1%; }\n\n.productnavigator.navigatorwidget ul {\n  overflow: hidden;\n  padding: 0 0 0.625em 1.25em; }\n\n.productnavigator.navigatorwidget li {\n  text-transform: none; }\n\n.productnavigator.navigatorwidget li a:link, .productnavigator.navigatorwidget li a:visited {\n    border-bottom: 0 none;\n    color: black;\n    font-weight: normal;\n    padding: 0.1875em 0.75em;\n    text-decoration: underline; }\n\n.productnavigator.navigatorwidget li a.selected {\n    color: #F3980D; }\n\n.productnavigator.navigatorwidget li a:hover {\n    color: #faa21b; }\n\n.ui-tabs {\n  margin-bottom: 15px;\n  padding: 0;\n  zoom: 1; }\n\n.ui-tabs .ui-tabs-nav {\n    border-top-left-radius: 7px;\n    border-top-right-radius: 7px;\n    background: #faa21b;\n    background: -webkit-gradient(linear, left top, left bottom, from(#fccc83), to(#faa21b));\n    background: linear-gradient(#fccc83, #faa21b);\n    border: 0;\n    float: left;\n    height: 39px;\n    list-style: none;\n    margin: 0;\n    padding: 1px 10px 0;\n    position: relative;\n    width: 710px; }\n\n.ui-tabs .ui-tabs-nav li {\n      border-bottom-width: 0 !important;\n      float: left;\n      font-size: 14px;\n      font-weight: bold;\n      margin-right: 15px;\n      padding: 0;\n      position: relative; }\n\n.ui-tabs .ui-tabs-nav li a {\n        color: black;\n        float: left;\n        height: 39px;\n        line-height: 39px;\n        outline: none;\n        padding: 0 15px;\n        text-decoration: none;\n        text-decoration: none; }\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-selected {\n      border: 1px solid #faa21b;\n      border-bottom: 0; }\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a {\n      border-top-left-radius: 5px;\n      border-top-right-radius: 5px;\n      background: white;\n      cursor: text;\n      height: 38px;\n      line-height: 37px; }\n\n.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a {\n  cursor: pointer; }\n\n.ui-tabs .ui-tabs-panel {\n  background: none;\n  border-width: 0;\n  display: block;\n  margin-bottom: 15px; }\n\n.ui-tabs .ui-tabs-panel .tab-content {\n    border: 1px solid #bbb;\n    border-top: 0;\n    clear: both;\n    float: left;\n    margin-bottom: 15px;\n    padding: 10px;\n    width: 44.25em; }\n\n.ui-tabs .ui-tabs-hide {\n  display: none !important; }\n\n.tab-content .details {\n  float: left;\n  padding-top: 10px;\n  width: 100%; }\n\n.tab-content .details p span {\n    font-style: italic; }\n\n.tab-content .detailstop {\n  *display: inline;\n  *zoom: 1;\n  display: inline-block;\n  float: left;\n  padding-top: 10px;\n  width: 300px; }\n\n.tab-content .image {\n  *display: inline;\n  *zoom: 1;\n  display: inline-block;\n  float: left;\n  width: 375px; }\n\n.tab-content .image img {\n    border: 1px solid #bbb; }\n\n.tab-content table {\n  border: 0;\n  border-collapse: collapse;\n  border-spacing: 0;\n  font-size: 12px;\n  width: 100%; }\n\n.tab-content table th {\n    color: black;\n    font-weight: normal;\n    padding: 8px;\n    text-align: left;\n    text-transform: uppercase; }\n\n.tab-content table td {\n    padding: 8px;\n    text-align: left; }\n\n.tab-content table td em.available {\n      color: #7db730; }\n\n.tab-content table tr:nth-child(odd) td {\n    background: #f1f1f1; }\n\n#deck {\n  clear: both;\n  width: 100%;\n  z-index: -1; }\n\n#deck .three-column-first, #deck .three-column-second, #deck .three-column-third {\n    *display: inline;\n    *zoom: 1;\n    display: inline-block;\n    padding: 20px 20px 10px;\n    vertical-align: top; }\n\n#deck .three-column-first, #deck #deck .three-column-second {\n    height: 180px;\n    width: 278px; }\n\n#deck .three-column-third {\n    width: 285px; }\n\n#deck .wrapper {\n  background: #4d4d4d;\n  background: -webkit-gradient(linear, left top, left bottom, from(#575757), to(#3a3a3a));\n  background: linear-gradient(#575757, #3a3a3a);\n  border-bottom: 3px solid #111;\n  clear: both; }\n\n#deck h4 {\n  background: none;\n  color: #999999;\n  font-size: 12px;\n  line-height: 14px;\n  margin-bottom: 15px;\n  padding: 0;\n  text-transform: uppercase; }\n\n#deck p {\n  color: white;\n  font-size: 11px; }\n\n#deck p span {\n    display: block; }\n\n#deck a {\n  color: white; }\n\n#deck a.arrow {\n    display: block; }\n\n#deck a:hover {\n    color: #faa21b; }\n\n#deck .column {\n  float: left;\n  width: 50%; }\n\n#deck ul {\n  float: left;\n  list-style-type: none;\n  margin-bottom: 15px;\n  width: 100%; }\n\n#deck ul li {\n    float: left;\n    font-size: 11px;\n    margin-bottom: 6px;\n    width: 100%; }\n\n#deck ul li a {\n      color: white;\n      padding-left: 12px; }\n\n.clearfix {\n  clear: both;\n  font-size: 0;\n  height: 0;\n  line-height: 0;\n  width: 100%; }\n\n#footer {\n  clear: both;\n  float: left;\n  height: 200px;\n  width: 100%; }\n\n#footer .wrapper {\n    -webkit-box-shadow: none;\n            box-shadow: none;\n    background: transparent;\n    box-shadow: none;\n    padding: 25px 0; }\n\n#footer p {\n    font-size: 11px; }\n\n#footer p img {\n      margin: 0 25px; }\n\n#facebox {\n  left: 0;\n  position: absolute;\n  text-align: left;\n  top: 0;\n  z-index: 100; }\n\n#facebox .popup {\n    position: relative; }\n\n#facebox .content {\n    background: #eee;\n    display: table;\n    padding: 15px;\n    width: 500px; }\n\n#facebox .content .featured {\n      padding: 0 0 0 0.75em; }\n\n#facebox .content .postitem {\n      padding: 10px; }\n\n#facebox .content .postitemcell {\n      padding: 0 0 0 0.625em; }\n\n#facebox input.btn {\n    margin-bottom: 15px; }\n\n#facebox .close {\n    position: absolute;\n    right: -8px;\n    top: -8px; }\n\n#facebox .loading {\n    text-align: center; }\n\n#facebox .image {\n    text-align: center; }\n\n#facebox img {\n    border: 0;\n    margin: 0; }\n\n#facebox .gallery {\n    background: white;\n    width: 25em; }\n\n#facebox .gallery .content {\n      background: white; }\n\n#facebox .contain {\n    padding: 15px; }\n\n#facebox form {\n  color: #666;\n  font-size: 12px;\n  font-weight: bold;\n  margin-bottom: 33px; }\n\n#facebox form div {\n    clear: both;\n    padding: 10px 0; }\n\n#facebox form label {\n    float: left;\n    padding-top: 9px;\n    width: 12.5em; }\n\n#facebox form input, #facebox form select, #facebox form textarea, #facebox form .capcha {\n    background: white;\n    border: 1px solid #ccc;\n    color: #111;\n    float: left;\n    font-size: 12px;\n    line-height: 13px;\n    margin: 0;\n    padding: 8px;\n    width: 15.625em; }\n\n#facebox form .capcha {\n    width: 160px; }\n\n#facebox form input.date {\n    width: 200px; }\n\n#facebox form div.dates {\n    float: none; }\n\n#facebox form div.dates input {\n      width: 85px; }\n\n#facebox form div.checkbox, #facebox form div.radio {\n    padding: 0.625em 0; }\n\n#facebox form div.checkbox input, #facebox form div.radio input {\n    border: 0;\n    margin-right: 5px;\n    padding: 0;\n    width: auto; }\n\n#facebox_overlay {\n  position: fixed;\n  height: 100%;\n  width: 100%;\n  left: 0;\n  top: 0; }\n\n.facebox_hide {\n  z-index: -100; }\n\n.facebox_overlayBG {\n  background: black;\n  z-index: 99; }\n\n.error {\n  color: #ff0000;\n  font-size: 8pt;\n  margin-bottom: 5px;\n  padding: 1px; }\n\n#ProductHeader {\n  clear: both;\n  display: block; }\n\n#productHeaderImages {\n  float: left;\n  width: 735px; }\n\n#productHeaderInfo {\n  background: #1f1f1f;\n  display: block;\n  float: left;\n  height: 484px;\n  position: relative;\n  width: 265px; }\n\n#productHeaderInfo .content {\n    padding: 10px;\n    padding-top: 15px; }\n\n#productHeaderInfo h1 {\n    color: white;\n    font-family: arial;\n    font-size: 20px;\n    forn-weight: bold;\n    line-height: 1;\n    margin-bottom: 5px;\n    overflow: hidden;\n    width: 243px; }\n\n#productHeaderInfo h4 {\n    background: transparent;\n    color: #5c5c5c;\n    font-size: 12px;\n    line-height: 16px;\n    margin: 0px;\n    padding: 0px;\n    padding-left: 5px; }\n\n#productHeaderInfo a {\n    color: #5c5c5c;\n    font-size: 11px;\n    line-height: 16px;\n    text-decoration: underline; }\n\n#productHeaderInfo a:hover {\n      color: #fAA21B; }\n\n.productHeaderDisplay {\n  color: #5c5c5c;\n  font-size: 12px; }\n\ndl.margins {\n  font-weight: bold;\n  overflow: hidden;\n  width: 15.625em; }\n\n.margins dt {\n  clear: left;\n  color: #5c5c5c;\n  float: left;\n  font-size: 12px;\n  padding: 2px 5px 2px 0; }\n\n.margins dd {\n  clear: right;\n  color: white;\n  float: left;\n  font-size: 12px;\n  padding: 2px 0;\n  padding-left: 5px; }\n\ndl.largmargins {\n  font-weight: bold;\n  margin-bottom: 2px;\n  overflow: hidden;\n  padding: 5px 0 8px 0;\n  width: 15.625em; }\n\n.largmargins dt {\n  clear: left;\n  color: #5c5c5c;\n  float: left;\n  font-size: 12px;\n  padding: 2px 5px 2px 0; }\n\n.largmargins dd {\n  clear: right;\n  color: white;\n  float: left;\n  font-size: 12px;\n  padding: 2px 0;\n  padding-left: 5px; }\n\ndl.smallmargins {\n  font-weight: bold;\n  overflow: hidden;\n  width: 15.625em; }\n\n.smallmargins dt {\n  clear: left;\n  color: #5c5c5c;\n  float: left;\n  font-size: 11px;\n  font-weight: bold;\n  padding: 3px 2px 1px 0; }\n\n.smallmargins dd {\n  clear: right;\n  color: white;\n  font-size: 11px;\n  font-weight: bold;\n  padding: 3px 0px 1px 0;\n  padding-left: 5px; }\n\ndl.nomargins {\n  font-weight: bold;\n  padding: 0 6px 0 0;\n  width: 15.625em; }\n\ndl.nomargins.toppadding {\n  padding: 10px 6px 0 0; }\n\n.nomargins dt {\n  clear: left;\n  color: #5c5c5c;\n  float: left;\n  font-size: 11px;\n  font-weight: bold;\n  padding: 0 6px 0 0; }\n\n.nomargins dd {\n  clear: right;\n  color: white;\n  font-size: 11px;\n  font-weight: bold;\n  padding: 0;\n  padding-left: 5px; }\n\n.newsbox {\n  *display: inline;\n  *zoom: 1;\n  border: 1px solid #BBBBBB;\n  display: inline-block;\n  margin-bottom: 10px;\n  padding: 10px;\n  width: 956px; }\n\n.newsbox a, .newsbox .two-column-box a, .newsbox .three-column-box a {\n    color: black;\n    font-size: 11px;\n    line-height: 16px;\n    text-decoration: underline; }\n\n.newsbox a:hover, .newsbox .two-column-box a:hover {\n    color: #F3980D; }\n\n.enquireBtn, #productHeaderInfo a#enquireBtn, #facebox a#enquireBtn, #content a#enquireBtn, div#enquireBtn a.enquire-link {\n  border-radius: 7px;\n  background: #faa21b;\n  background: -webkit-gradient(linear, left top, left bottom, from(#fccc83), to(#faa21b));\n  background: linear-gradient(#fccc83, #faa21b);\n  border: 0;\n  bottom: 8px;\n  color: black;\n  cursor: pointer;\n  font-size: 16px;\n  outline: none;\n  padding: 10px 25px;\n  position: absolute;\n  right: 10px;\n  text-decoration: none;\n  width: auto; }\n\n.enquireBtn, #content a#enquireBtn, div#enquireBtn a.enquire-link {\n  float: right;\n  position: relative; }\n\n.enquireBtn, #productHeaderInfo a#enquireBtn:hover, #facebox a#enquireBtn:hover, #content a#enquireBtn:hover {\n  background: -webkit-gradient(linear, left top, left bottom, from(#faa21b), to(#fccc83));\n  background: linear-gradient(#faa21b, #fccc83); }\n\n.newsbox .img {\n  padding-right: 15px; }\n\n.clearpadding {\n  margin-left: -5px; }\n\n.hidden {\n  display: none; }\n\n.two-column-box h6 a {\n  color: #f3980d;\n  font-size: 12px;\n  line-height: 16px;\n  text-decoration: none; }\n\n.two-column-box h6 a:hover {\n    color: #f3980d;\n    text-decoration: underline; }\n\n.tooltip {\n  background: url(\"/assets/images/rar.png\");\n  color: #fff;\n  display: none;\n  font-size: 11px;\n  height: 163px;\n  padding: 40px 30px 10px 30px;\n  width: 310px; }\n\n.tooltip .label {\n    color: yellow;\n    width: 35px; }\n\n.tooltip a {\n    color: #ad4;\n    font-size: 11px;\n    font-weight: bold; }\n\n#footer-left-container-left {\n  float: left;\n  width: 78px; }\n\n#footer-left-container-right {\n  float: left;\n  font-size: 9px;\n  width: 900px; }\n\n#menu-footer-left {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n\n#menu-footer-left li {\n    border-right: 1px solid #5c5c5c;\n    display: block;\n    float: left;\n    padding: 0px 6px 0px 6px; }\n\n#menu-footer-left li.lastitem {\n      border-right: 0px; }\n\n#menu-footer-left li a {\n      color: black;\n      font-size: 11px;\n      line-height: 16px;\n      text-decoration: underline; }\n\n.navcontent {\n  background: #1f1f1f;\n  display: none;\n  position: absolute;\n  z-index: 5; }\n\n#header1Image {\n  position: relative;\n  z-index: 1; }\n\n#navcontentContainer {\n  position: absolute;\n  width: 1000px;\n  z-index: 10; }\n\n#navcontentContainer h1 em {\n  color: #999999; }\n\n#navcontentContainer h1 a {\n  color: #fff; }\n\n#navcontent1 {\n  height: 481px;\n  width: 1000px; }\n\n#navcontent2 {\n  height: 481px;\n  position: absolute;\n  right: 0px;\n  width: 350px; }\n\n.navcontentbox1 {\n  border-right: 1px solid #4c4c4c;\n  float: left;\n  height: 450px;\n  padding: 15px;\n  width: 190px; }\n\n.navcontentbox2 {\n  border-right: 1px solid #4c4c4c;\n  display: none;\n  float: left;\n  height: 450px;\n  padding: 15px;\n  width: 140px; }\n\n.navcontentbox3 {\n  border-right: 1px solid #4c4c4c;\n  display: none;\n  float: left;\n  height: 450px;\n  padding: 15px;\n  width: 295px; }\n\n.navcontentbox4 {\n  display: none;\n  float: left;\n  height: 450px;\n  padding: 22px;\n  width: 225px; }\n\n.navcontentbox5 {\n  display: block;\n  float: left;\n  height: 450px;\n  padding: 15px;\n  width: 225px; }\n\n.tours-year li, .tours-duration li, .tours-country li {\n  color: black;\n  font-size: 12px;\n  list-style-type: none;\n  padding-left: 10px;\n  padding-top: 10px; }\n\n.tours-year li a, .tours-year li a:visited, .tours-duration li a, .tours-country li a:visited, .tours-country li a, .tours-country li a:visited {\n  border-bottom: 0 none;\n  color: white;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-year li a:hover, .tours-duration li a:hover, .tours-country li a:hover {\n  color: #FAA21b;\n  text-decoration: underline; }\n\n.navcontentbox2 ul li {\n  color: black;\n  font-size: 12px;\n  list-style-type: none;\n  padding-left: 10px;\n  padding-top: 10px; }\n\n.navcontentbox2 ul li a {\n  border-bottom: 0 none;\n  color: white;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.durationwidget ul li a {\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.navcontentbox2 ul li a:hover {\n  color: #FAA21b; }\n\n#duration-navigator ul li a {\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-list li, #menu-charter-tours li {\n  color: black;\n  font-size: 12px;\n  list-style-type: none;\n  padding-top: 5px; }\n\n.tours-list li a, .tours-list li a:visited, #menu-charter-tours li a, #menu-charter-tours li a:visited {\n  border-bottom: 0 none;\n  color: white;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-list li a:hover, #menu-charter-tours li a:hover {\n  color: #FAA21b;\n  text-decoration: underline; }\n\np.wprice {\n  color: white;\n  font-size: 11px;\n  font-style: normal;\n  margin-bottom: 0; }\n\np.wmore {\n  color: white;\n  font-size: 11px;\n  font-style: normal;\n  margin: 0; }\n\n.wdetails {\n  color: white;\n  height: 255px;\n  overflow: hidden; }\n\n.wdetails a {\n  color: #F3980D;\n  text-decoration: underline; }\n\np.wactivity {\n  color: white;\n  font-size: 11px;\n  font-style: normal; }\n\n#content ul.breadcrumb {\n  clear: both;\n  color: #5c5c5c;\n  font-size: 12px;\n  list-style: none;\n  padding-bottom: 5px; }\n\n#content ul.breadcrumb li {\n    display: inline; }\n\n#content ul.breadcrumb li a {\n      color: #000;\n      text-decoration: underline; }\n\n#content ul.breadcrumb li a:hover {\n        color: #F3980D; }\n\n#content ul.breadcrumb li a.selected {\n        color: #F3980D; }\n\n.jcarousel {\n  height: 157px;\n  margin-bottom: 0px;\n  margin-left: 0px;\n  margin-top: 244px;\n  overflow: hidden;\n  padding-bottom: 0px;\n  padding-left: 0px;\n  padding-top: 310px;\n  position: relative;\n  width: 100%; }\n\n.jcarousel ul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  width: 20000em; }\n\n.jcarousel li {\n  float: left; }\n\nul.jcarousel-control {\n  margin-left: 800px;\n  margin-top: 220px;\n  padding-top: 200px;\n  position: absolute;\n  width: 15.625em;\n  z-index: 1; }\n\nul.jcarousel-control li {\n  *display: inline;\n  *zoom: 1;\n  background-image: url(\"/assets/images/rar.png\");\n  display: inline-block;\n  height: 17px;\n  width: 17px; }\n\n#banner a, #banner a:hover {\n  color: white;\n  text-decoration: none; }\n\n#banner .banner-content {\n  background: black;\n  height: 65px;\n  margin-top: -5px; }\n\n#banner .banner-content p {\n  color: white;\n  margin: 0;\n  padding-left: 40px; }\n\n#banner .banner-content p.banner-title {\n  font: bold 25px Arial,Helvetica,sans-serif;\n  padding-left: 20px;\n  padding-top: 10px; }\n\n#banner .banner-content p.banner-title img {\n  padding-bottom: 5px;\n  padding-right: 10px; }\n\n.loadImage {\n  display: block;\n  height: 32px;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 193px;\n  width: 32px; }\n\n#product-navigation {\n  width: 100%; }\n\n#product-navigation .wrapper {\n    height: 6px;\n    padding: 0px;\n    width: 100%; }\n\n#product-navigation #menu-product-navigation {\n    display: table;\n    width: 100%; }\n\n#product-navigation #menu-product-navigation #accommodatedtour, #product-navigation #menu-product-navigation #campingtour, #product-navigation #menu-product-navigation #accommodation, #product-navigation #menu-product-navigation #chartertour {\n      width: 258px; }\n\n.browseListings h2 {\n  font-weight: bold;\n  margin-bottom: 10px; }\n\n#date-details {\n  float: left;\n  margin: 10px 0; }\n\n#facebox-loading {\n  text-align: center; }\n\n#facebox .form-container {\n  padding-bottom: 50px; }\n\n#facebox a#enquireBtn {\n  bottom: 20px;\n  right: 45px; }\n\n#twitter {\n  margin-top: 5px; }\n\n#twitter h4 {\n  background: none; }\n\n#content a#request-brochure {\n  border: medium none;\n  cursor: pointer;\n  display: block;\n  height: 92px;\n  margin: 0 0 10px;\n  text-decoration: none;\n  width: 240px; }\n\n.nomadNews .featuredblog h3 {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  margin-bottom: 15px;\n  text-transform: uppercase; }\n\n.nomadNews .featuredblog h3 em {\n    color: #111;\n    display: block;\n    font: bold 25px/27px \"Arial\", Helvetica, sans-serif;\n    letter-spacing: -0.04em;\n    text-transform: none; }\n\n.sliderContent .navigatorwidget {\n  margin-bottom: 15px;\n  position: relative;\n  width: 190px; }\n\n.sliderContent .navigatorwidget ul.product-detailed-navigator li {\n    color: black;\n    font-size: 12px;\n    list-style-type: none;\n    padding-left: 5px;\n    padding-top: 10px; }\n\n.sliderContent .navigatorwidget ul.product-detailed-navigator li a, .sliderContent .navigatorwidget ul.product-detailed-navigator li a:visited, .sliderContent .navigatorwidget ul.product-detailed-navigator li a:link {\n      border-bottom: 0 none;\n      color: white;\n      font-weight: normal;\n      padding: 3px 12px;\n      text-decoration: underline;\n      text-transform: capitalize;\n      white-space: nowrap; }\n\n.imagegallerywidget h3 {\n  display: none; }\n\n.imagegallerywidget div.image {\n  background: none repeat scroll 0 0 white;\n  float: left;\n  margin: 5px 6px 6px 5px;\n  overflow: hidden;\n  position: relative; }\n\n.imagegallerywidget img {\n  float: left;\n  padding: 0; }\n\n.imagegallerywidget div.image label {\n  background: #faa21b;\n  color: black;\n  display: block;\n  opacity: 0.9;\n  float: left;\n  font-size: 11px;\n  height: 100px;\n  line-height: 14px;\n  opacity: 0.9;\n  padding: 10px 10px 0;\n  position: relative;\n  text-transform: uppercase;\n  width: 100%; }\n\n#social-share-links div {\n  *display: inline;\n  *zoom: 1;\n  display: inline-block;\n  width: 100px; }\n\n#page-not-found {\n  text-align: center; }\n\n#page-not-found img {\n  padding: 25px 0; }\n\n#page-not-found h1 {\n  padding: 0 0 10px; }\n\n#page-not-found h1 em {\n  letter-spacing: 0.01px; }\n\n#page-not-found .submit-container {\n  float: none; }\n\n#page-not-found .submit-container a.btn {\n  color: #fff;\n  text-decoration: none; }\n\n#page-not-found .form-container {\n  *display: inline;\n  *zoom: 1;\n  display: inline-block;\n  float: none;\n  padding: 20px 0 0; }\n\n#page-not-found .form-container .formfield-container {\n  float: none;\n  height: 40px;\n  width: 400px; }\n\n#page-not-found .form-container .formfield-container label {\n  text-align: left;\n  width: 100px; }\n\n#unsubscribe .form-container {\n  *display: inline;\n  *zoom: 1;\n  display: inline-block;\n  float: none;\n  width: 100%; }\n\n#unsubscribe .form-container .formfield-container {\n  float: none; }\n\n#unsubscribe .form-container .formfield-container label {\n  width: 100px; }\n\n#unsubscribe .submit-container {\n  float: left;\n  padding: 0 10px; }\n\n#unsubscribe .submit-container a.btn {\n  color: white;\n  margin: 0;\n  text-decoration: none; }\n\n.newsletter.box {\n  border: none;\n  height: 220px;\n  width: 220px !important; }\n\n.newsletter.box input {\n  border: 1px solid #FAA21B; }\n\n#profiles {\n  clear: both;\n  color: black;\n  height: 100%;\n  margin: 0 0px 0 0px;\n  padding: 0;\n  text-decoration: none;\n  width: 100% !important; }\n\n.profiles.box {\n  background: #E5E5FF;\n  border: none;\n  clear: both;\n  float: right;\n  height: 100%;\n  margin: 0 0px 0 5px;\n  padding-top: 9px;\n  width: 100% !important; }\n\n#menuFull {\n  clear: both;\n  margin: 0px;\n  padding: 0px 0px 30px;\n  width: 100%; }\n\n#subscribecontainer img.newsletter-icon {\n  display: inline-block; }\n\n#subscribecontainer h3 {\n  color: white;\n  display: inline-block;\n  width: 75%; }\n\n#browse-button {\n  display: inline-block;\n  margin-top: 20px;\n  vertical-align: top;\n  width: 130px; }\n\n#subscribe-button {\n  display: inline-block;\n  height: 34px;\n  margin-left: 5px;\n  margin-top: 5px;\n  width: 76px; }\n\n#subscribecontainer a:hover, #subscribecontainer a:active {\n  color: white; }\n\n#frmsubscribe input.error {\n  outline: 2px solid #FF0000; }\n\n#frmsubscribe label.error {\n  display: none !important; }\n\n#slider-wrapper div.jqans-wrapper.default {\n  background: none repeat scroll 0 0 white !important;\n  background: white !important;\n  border-left: 1px solid #DBE1E6;\n  border-right: 1px solid #DBE1E6;\n  border-top: 1px solid #DBE1E6;\n  color: inherit; }\n\n#slider-wrapper div.jqans-wrapper.default a {\n    color: #363636 !important; }\n\n#slider-wrapper div.jqans-wrapper.default img {\n    margin: 0;\n    max-width: 100%;\n    padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 {\n    font-size: 138% !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited {\n      background: none repeat scroll 0 0 transparent;\n      border: medium none;\n      color: #16387C !important;\n      text-decoration: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong {\n  color: black;\n  font-weight: bold;\n  text-transform: uppercase; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content p {\n  color: #333333 !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories {\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li {\n    background-color: #FCFCFD;\n    background-image: -webkit-gradient(linear, left top, left bottom, color-stop(top, center), color-stop(#E8EDF0), to(#FCFCFD));\n    background-image: linear-gradient(center top, #E8EDF0, #FCFCFD);\n    border-top-color: #A8B4BF; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected {\n      background-color: #59728B;\n      background-image: -webkit-gradient(linear, left top, left bottom, color-stop(top, center), color-stop(#59728B), to(#2D4458));\n      background-image: linear-gradient(center top, #59728B, #2D4458);\n      border-top-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img {\n        border: 1px solid black; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 {\n        color: white !important;\n        font-size: 12px !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected div {\n        border-bottom: 10px solid #59728B;\n        border-left: 10px solid transparent;\n        border-right: 10px solid transparent; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img {\n      background-color: white;\n      border: 1px solid #C5CED7;\n      margin: 8px 0 0;\n      padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 {\n      background: none repeat scroll 0 0 transparent !important;\n      color: #59728B !important;\n      font-size: 12px !important;\n      font-weight: normal;\n      line-height: 14px !important;\n      margin: 0;\n      padding: 0;\n      text-shadow: none;\n      text-transform: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul, #slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li {\n  background: none repeat scroll 0 0 transparent !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination {\n  background-color: #F9FAFA;\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a {\n  border-right-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span {\n  border-right-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span {\n  border-left-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default #control-play {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default #pause-left, #slider-wrapper div.jqans-wrapper.default #pause-right {\n  background: none repeat scroll 0 0 #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default a {\n  color: #363636 !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong {\n  color: #000;\n  font-weight: bold;\n  text-transform: uppercase; }\n\n#slider-wrapper div.jqans-wrapper.default img {\n  margin: 0;\n  max-width: 100%;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 {\n  font-size: 138% !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited {\n  background: transparent;\n  border: none;\n  color: #16387C !important;\n  text-decoration: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content p {\n  color: #333 !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories {\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li {\n  background-color: #FCFCFD;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(top, center), color-stop(#E8EDF0), to(#FCFCFD));\n  background-image: linear-gradient(center top, #E8EDF0, #FCFCFD);\n  border-top-color: #A8B4BF; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected {\n  background-color: #59728B;\n  background-image: -webkit-gradient(linear, left top, left bottom, color-stop(top, center), color-stop(#59728B), to(#2D4458));\n  background-image: linear-gradient(center top, #59728B, #2D4458);\n  border-top-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img {\n  background-color: white;\n  border: 1px solid #C5CED7;\n  margin: 8px 0 0 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img {\n  border: 1px solid #000; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 {\n  background: transparent !important;\n  background-color: transparent !important;\n  background-image: none !important;\n  color: #59728B !important;\n  font-size: 12px !important;\n  font-weight: normal;\n  line-height: 14px !important;\n  margin: 0;\n  padding: 0;\n  text-shadow: none;\n  text-transform: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 {\n  color: white !important;\n  font-size: 12px !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div {\n  border-bottom: 10px solid #59728B;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul, #slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li {\n  background: transparent !important;\n  background-color: transparent !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination {\n  background-color: #F9FAFA;\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a {\n  border-right-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span {\n  border-right-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span {\n  border-left-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default #control-play {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default #pause-left, #slider-wrapper div.jqans-wrapper.default #pause-right {\n  background: #59728B; }\n\n#master-wrapper {\n  background: url(\"/assets/images/refereebg1.jpg\") repeat fixed center center black;\n  height: 100%;\n  position: fixed;\n  width: 100%;\n  z-index: -1; }\n\n.nfMain {\n  border-style: solid;\n  border-color: #00AD00;\n  -o-border-image: none;\n     border-image: none;\n  border-width: 0 0 0 2px;\n  clear: both;\n  display: block;\n  margin: 0;\n  padding: 0;\n  position: relative;\n  width: 980px; }\n\n.nfMain .nfLink {\n  border-color: #00AD00;\n  border-style: solid;\n  border-width: 0 2px 2px 0;\n  color: black;\n  font-family: Arial;\n  font-size: 0.9em;\n  padding: 9px 30px 5px;\n  text-decoration: none; }\n\n.nfPure .nfItem:hover > .nfLink, .nfPure .nfItem:hover > * > .nfLink {\n  text-decoration: underline; }\n\n.nfPure .nfLink:hover, .nfMain .nfJSHover {\n  color: white;\n  text-decoration: underline; }\n\n.nfMain, .nfSubC, .nfSubS {\n  list-style: none;\n  margin: 0px;\n  padding: 0px; }\n\n.nfMain {\n  position: relative;\n  z-index: 1; }\n\n.nfMain .nfSubC {\n  position: absolute;\n  visibility: hidden; }\n\n.nfMain .nfItem, .nfMain .nfLink {\n  display: block;\n  list-style: none;\n  margin: 0px;\n  position: relative;\n  white-space: nowrap; }\n\n.nfMain:after {\n  clear: both;\n  content: \".\";\n  display: block;\n  height: 0px;\n  overflow: hidden; }\n\n.nfPure .nfItem:hover, .nfPure .nfItem:hover > .nfSubC {\n  visibility: inherit;\n  z-index: 1101; }\n\n.nfPure .nfLink:focus {\n  z-index: 1102; }\n\n.nfMain .nfJSActiveItem {\n  z-index: 1101; }\n\n.nfMain .nfJSShowSub {\n  visibility: inherit;\n  z-index: 1101; }\n\n.nfMain .nfItem div.nfLink {\n  cursor: default; }\n\n.nfMain .nfItem {\n  float: left; }\n\n.nfMain .nfItem .nfItem {\n  float: none; }\n\n.nfMain .nfItem .nfSubC {\n  left: 0px;\n  top: 100%;\n  width: auto; }\n\n.nfMain .nfSubC .nfItem .nfSubC {\n  left: 100%;\n  top: 0px;\n  width: auto; }\n\n.nfMain {\n  background-color: #55556a;\n  background-image: url(\"/assets/images/refereebg.jpg\");\n  padding: 0px 0px 0px 20px; }\n\n.nfMain .nfLink {\n  border-color: #333;\n  border-style: solid;\n  border-width: 1px 0px 1px 1px;\n  color: white;\n  font-family: Arial;\n  font-size: 14px;\n  padding: 6px 40px 6px 20px;\n  text-decoration: none; }\n\n.nfMain .nfParent .nfLink {\n  background-position: 92% 52%;\n  background-repeat: no-repeat; }\n\n.nfMain .nfParent .nfSubS .nfLink {\n  background-image: none; }\n\n.nfPure .nfItem:hover > .nfLink, .nfPure .nfItem:hover > * > .nfLink {\n  text-decoration: underline; }\n\n.nfPure .nfLink:hover, .nfMain .nfJSHover {\n  text-decoration: underline; }\n\n.nfMain .nfItem .nfJSActive {\n  background-color: #e5ebf7;\n  border-bottom-color: #e5ebf7;\n  color: #425fa7;\n  text-decoration: underline; }\n\n.nfPure .nfLink:focus, .nfMain .nfItem .nfJSFocus {\n  text-decoration: underline; }\n\n.nfMain .nfSubS {\n  background-color: #e5ebf7;\n  padding: 20px; }\n\n.nfMain .nfSubS {\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  background-color: #e5ebf7;\n  border: solid 1px #333;\n  border-width: 0px 1px 1px 1px;\n  height: auto; }\n\n.nfMain .nfSubS .nfSubC {\n  margin: -1px 0px 0px 0px; }\n\n.nfMain .nfSubS .nfSubS {\n  border-width: 1px; }\n\n.nfMain .nfSubS .nfSubS {\n  border-bottom-left-radius: 10px;\n  border-bottom-right-radius: 10px;\n  border-top-right-radius: 10px; }\n\n.nfMain .nfSubS .nfLink {\n  border-color: #999;\n  border-style: solid;\n  border-width: 0px 0px 1px 0px;\n  color: #55556a;\n  font-size: 13px;\n  padding: 6px 40px 6px 5px; }\n\n.nfMain .nfSubS .nfParent .nfSubS .nfLink {\n  background-image: none; }\n\n.nfMain .nfSubS .nfItem:last-child .nfLink {\n  border-width: 0px; }\n\n.nfMain .nfSubS .nfItem .nfJSActive {\n  background-color: #ccd0e3;\n  color: #425fa7;\n  text-decoration: underline; }\n\n.nfPure .nfSubS .nfLink:focus, .nfMain .nfSubS .nfItem .nfJSFocus {\n  color: #03f; }\n\n.custTitle {\n  color: #55556a;\n  font-size: 1em;\n  font-weight: bold;\n  margin: 20px 0px 5px 0px; }\n\n.custTitleBoxed {\n  border-radius: 4px;\n  background-color: white;\n  border-color: #979cb6;\n  border-style: solid;\n  border-width: 1px;\n  color: #55556a;\n  font-size: .9em;\n  margin: 20px 0px 5px 0px;\n  padding: 8px; }\n\n.custTitleTop {\n  margin: 5px 0px 5px 0px; }\n\n.custMegaSub {\n  width: 760px; }\n\n.custMegaItem {\n  font-size: .9em; }\n\n.megaContentRight {\n  left: 290px;\n  position: relative;\n  width: 190px; }\n\n.megaContentMiddle {\n  left: 170px;\n  position: absolute;\n  width: 140px; }\n\n.megaContentLeft {\n  position: absolute;\n  width: 240px; }\n\n.megaContentMiddle ul, .megaContentLeft ul, .megaContentRight ul {\n  list-style-type: circle;\n  margin: 10px 0px 0px 24px;\n  padding: 0px; }\n\n.megaTopTitle {\n  border-radius: 4px;\n  background-color: white;\n  border-color: #979cb6;\n  border-style: solid;\n  border-width: 1px;\n  color: #55556a;\n  font-size: 1em;\n  margin-bottom: 10px;\n  padding: 8px;\n  white-space: normal;\n  width: 440px; }\n\n.megaTitle {\n  color: #55556a;\n  white-space: normal; }\n\n#content .whitebg {\n  background: red;\n  clear: both; }\n\n#master-wrapper {\n  background: url(\"/assets/images/refereebg.jpg\") repeat fixed center center transparent;\n  opacity: 0.987679; }\n"

/***/ }),

/***/ "./client/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = /** @class */ (function () {
    function AppComponent(auth, ngZone) {
        this.auth = auth;
        this.ngZone = ngZone;
        this.windowWidth = window.innerWidth;
        var destination_anim_bgs = [
            'assets/images/refereebg.jpg',
            'assets/images/refereebg1.jpg',
            'assets/images/refereebg2.jpg',
            'assets/images/refereebg3.jpg',
            'assets/images/refereebg4.jpg',
            'assets/images/refereebg5.jpg',
            'assets/images/refereebg6.jpg',
            'assets/images/refereebg7.jpg',
            'assets/images/refereebg8.jpg',
            'assets/images/refereebg9.png',
            'assets/images/refereebg10.jpg',
            'assets/images/refereebg11.jpg',
            'assets/images/refereebg12.jpg'
        ];
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            var imgArr = destination_anim_bgs;
            /* preload images */
            var preloadArr = imgArr.map(function (image) {
                var img = new Image();
                img.src = image;
                return img;
            });
            var currImg = 0;
            var totalImages = preloadArr.length;
            /* image rotator */
            function changeImg() {
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#master-wrapper')
                    .animate({ opacity: 0 }, 200, function () {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(this).css('background', 'url(' +
                        preloadArr[currImg++ % totalImages].src +
                        ') fixed center');
                })
                    .animate({ opacity: 1 }, 200);
            }
        });
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            moduleId: module.i,
            selector: 'app-root',
            template: __webpack_require__("./client/app/app.component.html"),
            styles: [__webpack_require__("./client/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./client/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_token_interceptor__ = __webpack_require__("./client/app/providers/token.interceptor.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/animations.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_recaptcha__ = __webpack_require__("./node_modules/ng-recaptcha/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ng_recaptcha___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_ng_recaptcha__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ngx_formly_core__ = __webpack_require__("./node_modules/@ngx-formly/core/@ngx-formly/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ngx_formly_material__ = __webpack_require__("./node_modules/@ngx-formly/material/@ngx-formly/material.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__swimlane_ngx_datatable__ = __webpack_require__("./node_modules/@swimlane/ngx-datatable/release/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__swimlane_ngx_datatable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9__swimlane_ngx_datatable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__routing_module__ = __webpack_require__("./client/app/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__shared_shared_module__ = __webpack_require__("./client/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__shared_formly_repeat_section_repeat_section_type__ = __webpack_require__("./client/app/shared/formly/repeat-section/repeat-section.type.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__shared_formly_horizontal_types_index__ = __webpack_require__("./client/app/shared/formly/horizontal-types/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__agm_core__ = __webpack_require__("./node_modules/@agm/core/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__googlemap_google_map_component__ = __webpack_require__("./client/app/googlemap/google-map.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__services_auth_guard_admin_service__ = __webpack_require__("./client/app/services/auth-guard-admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__services_auth_guard_login_service__ = __webpack_require__("./client/app/services/auth-guard-login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20_ngx_cookie_service__ = __webpack_require__("./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__services_profile_service__ = __webpack_require__("./client/app/services/profile.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__services_states_service__ = __webpack_require__("./client/app/services/states.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__services_token_service__ = __webpack_require__("./client/app/services/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__services_organize_service__ = __webpack_require__("./client/app/services/organize.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_primeng_components_accordion_accordion__ = __webpack_require__("./node_modules/primeng/components/accordion/accordion.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26_primeng_components_accordion_accordion___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_26_primeng_components_accordion_accordion__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_primeng_components_panel_panel__ = __webpack_require__("./node_modules/primeng/components/panel/panel.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27_primeng_components_panel_panel___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_27_primeng_components_panel_panel__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_primeng_components_button_button__ = __webpack_require__("./node_modules/primeng/components/button/button.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28_primeng_components_button_button___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_28_primeng_components_button_button__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_primeng_components_radiobutton_radiobutton__ = __webpack_require__("./node_modules/primeng/components/radiobutton/radiobutton.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29_primeng_components_radiobutton_radiobutton___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_29_primeng_components_radiobutton_radiobutton__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_primeng_card__ = __webpack_require__("./node_modules/primeng/card.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30_primeng_card___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_30_primeng_card__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__about_about_component__ = __webpack_require__("./client/app/about/about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__account_account_component__ = __webpack_require__("./client/app/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__shared_forms_address_form_address_form_component__ = __webpack_require__("./client/app/shared/forms/address-form/address-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__shared_forms_address_form_horizontal_address_form_horizontal_address_form_component__ = __webpack_require__("./client/app/shared/forms/address-form/horizontal-address-form/horizontal-address-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__shared_forms_organization_form_organization_form_component__ = __webpack_require__("./client/app/shared/forms/organization-form/organization-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__admin_admin_component__ = __webpack_require__("./client/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__app_component__ = __webpack_require__("./client/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__shared_forms_bio_form_bio_form_component__ = __webpack_require__("./client/app/shared/forms/bio-form/bio-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__group_blog_blog_component__ = __webpack_require__("./client/app/group/blog/blog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__group_careers_careers_component__ = __webpack_require__("./client/app/group/careers/careers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__carousel_carousel_component__ = __webpack_require__("./client/app/carousel/carousel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__carousel_carousel_item_carousel_item_component__ = __webpack_require__("./client/app/carousel/carousel-item/carousel-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__group_contactus_contactus_component__ = __webpack_require__("./client/app/group/contactus/contactus.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__account_profile_edit_profile_edit_profile_component__ = __webpack_require__("./client/app/account/profile/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__organize_events_events_component__ = __webpack_require__("./client/app/organize/events/events.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__group_faq_faq_component__ = __webpack_require__("./client/app/group/faq/faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__footer_footer_component__ = __webpack_require__("./client/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_48__footer_footer_tablet_footer_tablet_component__ = __webpack_require__("./client/app/footer/footer-tablet/footer-tablet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_49__header_header_component__ = __webpack_require__("./client/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_50__home_home_component__ = __webpack_require__("./client/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_51__home_how_it_works_how_it_works_component__ = __webpack_require__("./client/app/home/how-it-works/how-it-works.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_52__login_login_component__ = __webpack_require__("./client/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_53__logout_logout_component__ = __webpack_require__("./client/app/logout/logout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_54__not_found_not_found_component__ = __webpack_require__("./client/app/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_55__organize_organize_component__ = __webpack_require__("./client/app/organize/organize.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_56__group_partners_partners_component__ = __webpack_require__("./client/app/group/partners/partners.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_57__shared_forms_password_form_password_form_component__ = __webpack_require__("./client/app/shared/forms/password-form/password-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_58__shared_forms_phone_form_phone_form_component__ = __webpack_require__("./client/app/shared/forms/phone-form/phone-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_59__home_pricing_pricing_component__ = __webpack_require__("./client/app/home/pricing/pricing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_60__account_profile_profile_component__ = __webpack_require__("./client/app/account/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_61__referee_referee_component__ = __webpack_require__("./client/app/referee/referee.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_62__register_register_component__ = __webpack_require__("./client/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_63__account_profile_reset_reset_component__ = __webpack_require__("./client/app/account/profile/reset/reset.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_64__resetpassword_resetpassword_component__ = __webpack_require__("./client/app/resetpassword/resetpassword.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_65__shared_formly_base_form_base_form_component__ = __webpack_require__("./client/app/shared/formly/base-form/base-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_66__account_schedule_schedule_component__ = __webpack_require__("./client/app/account/schedule/schedule.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_67__organize_stripe_stripe_component__ = __webpack_require__("./client/app/organize/stripe/stripe.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_68__group_terms_and_conditions_terms_and_conditions_component__ = __webpack_require__("./client/app/group/terms-and-conditions/terms-and-conditions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_69__shared_forms_zone_form_zone_form_component__ = __webpack_require__("./client/app/shared/forms/zone-form/zone-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_70__games_games_component__ = __webpack_require__("./client/app/games/games.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_71__shared_dropdown_directive__ = __webpack_require__("./client/app/shared/dropdown.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_72__services_can_deactivate_guard_service__ = __webpack_require__("./client/app/services/can-deactivate-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_73_mydatepicker__ = __webpack_require__("./node_modules/mydatepicker/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_74__leftmenu_leftmenu_component__ = __webpack_require__("./client/app/leftmenu/leftmenu.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_75__barchart_barchart_component__ = __webpack_require__("./client/app/barchart/barchart.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





/* Modules */














/* Services */














/* Components */








































/* Misc. */



// rich grid


var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_37__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_31__about_about_component__["a" /* AboutComponent */],
                __WEBPACK_IMPORTED_MODULE_32__account_account_component__["a" /* AccountComponent */],
                __WEBPACK_IMPORTED_MODULE_33__shared_forms_address_form_address_form_component__["a" /* AddressFormComponent */],
                __WEBPACK_IMPORTED_MODULE_34__shared_forms_address_form_horizontal_address_form_horizontal_address_form_component__["a" /* HorizontalAddressFormComponent */],
                __WEBPACK_IMPORTED_MODULE_35__shared_forms_organization_form_organization_form_component__["a" /* OrganizationFormComponent */],
                __WEBPACK_IMPORTED_MODULE_36__admin_admin_component__["a" /* AdminComponent */],
                __WEBPACK_IMPORTED_MODULE_38__shared_forms_bio_form_bio_form_component__["a" /* BioFormComponent */],
                __WEBPACK_IMPORTED_MODULE_39__group_blog_blog_component__["a" /* BlogComponent */],
                __WEBPACK_IMPORTED_MODULE_40__group_careers_careers_component__["a" /* CareersComponent */],
                __WEBPACK_IMPORTED_MODULE_41__carousel_carousel_component__["a" /* CarouselComponent */],
                __WEBPACK_IMPORTED_MODULE_42__carousel_carousel_item_carousel_item_component__["a" /* CarouselItemComponent */],
                __WEBPACK_IMPORTED_MODULE_43__group_contactus_contactus_component__["a" /* ContactUsComponent */],
                __WEBPACK_IMPORTED_MODULE_71__shared_dropdown_directive__["a" /* DropdownDirective */],
                __WEBPACK_IMPORTED_MODULE_44__account_profile_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_45__organize_events_events_component__["a" /* EventsComponent */],
                __WEBPACK_IMPORTED_MODULE_46__group_faq_faq_component__["a" /* FaqComponent */],
                __WEBPACK_IMPORTED_MODULE_14__shared_formly_horizontal_types_index__["c" /* FormlyHorizontalWrapper */],
                __WEBPACK_IMPORTED_MODULE_14__shared_formly_horizontal_types_index__["a" /* FormlyHorizontalRadioWrapper */],
                __WEBPACK_IMPORTED_MODULE_14__shared_formly_horizontal_types_index__["b" /* FormlyHorizontalTextAreaWrapper */],
                __WEBPACK_IMPORTED_MODULE_47__footer_footer_component__["a" /* FooterComponent */],
                __WEBPACK_IMPORTED_MODULE_48__footer_footer_tablet_footer_tablet_component__["a" /* FooterTabletComponent */],
                __WEBPACK_IMPORTED_MODULE_16__googlemap_google_map_component__["a" /* GoogleMapComponent */],
                __WEBPACK_IMPORTED_MODULE_49__header_header_component__["a" /* HeaderComponent */],
                __WEBPACK_IMPORTED_MODULE_50__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_51__home_how_it_works_how_it_works_component__["a" /* HowItWorksComponent */],
                __WEBPACK_IMPORTED_MODULE_52__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_53__logout_logout_component__["a" /* LogoutComponent */],
                __WEBPACK_IMPORTED_MODULE_54__not_found_not_found_component__["a" /* NotFoundComponent */],
                __WEBPACK_IMPORTED_MODULE_55__organize_organize_component__["a" /* OrganizeComponent */],
                __WEBPACK_IMPORTED_MODULE_56__group_partners_partners_component__["a" /* PartnersComponent */],
                __WEBPACK_IMPORTED_MODULE_57__shared_forms_password_form_password_form_component__["a" /* PasswordFormComponent */],
                __WEBPACK_IMPORTED_MODULE_58__shared_forms_phone_form_phone_form_component__["a" /* PhoneFormComponent */],
                __WEBPACK_IMPORTED_MODULE_59__home_pricing_pricing_component__["a" /* PricingComponent */],
                __WEBPACK_IMPORTED_MODULE_60__account_profile_profile_component__["a" /* ProfileComponent */],
                __WEBPACK_IMPORTED_MODULE_61__referee_referee_component__["a" /* RefereeComponent */],
                __WEBPACK_IMPORTED_MODULE_70__games_games_component__["a" /* GamesComponent */],
                __WEBPACK_IMPORTED_MODULE_62__register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_13__shared_formly_repeat_section_repeat_section_type__["a" /* RepeatTypeComponent */],
                __WEBPACK_IMPORTED_MODULE_63__account_profile_reset_reset_component__["a" /* ResetComponent */],
                __WEBPACK_IMPORTED_MODULE_64__resetpassword_resetpassword_component__["a" /* ResetPasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_65__shared_formly_base_form_base_form_component__["a" /* BaseFormComponent */],
                __WEBPACK_IMPORTED_MODULE_66__account_schedule_schedule_component__["a" /* ScheduleComponent */],
                __WEBPACK_IMPORTED_MODULE_67__organize_stripe_stripe_component__["a" /* StripeComponent */],
                __WEBPACK_IMPORTED_MODULE_68__group_terms_and_conditions_terms_and_conditions_component__["a" /* TermsAndConditionsComponent */],
                __WEBPACK_IMPORTED_MODULE_69__shared_forms_zone_form_zone_form_component__["a" /* ZoneFormComponent */],
                __WEBPACK_IMPORTED_MODULE_74__leftmenu_leftmenu_component__["a" /* LeftmenuComponent */],
                __WEBPACK_IMPORTED_MODULE_75__barchart_barchart_component__["a" /* BarchartComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_15__agm_core__["a" /* AgmCoreModule */].forRoot({
                    apiKey: 'AIzaSyCIYjs8M-co1PL-iDZVP8rIiHIxAN-RYaI'
                }),
                __WEBPACK_IMPORTED_MODULE_9__swimlane_ngx_datatable__["NgxDatatableModule"],
                __WEBPACK_IMPORTED_MODULE_10__routing_module__["a" /* RoutingModule */],
                __WEBPACK_IMPORTED_MODULE_11__shared_shared_module__["a" /* SharedModule */],
                __WEBPACK_IMPORTED_MODULE_5__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_6__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_26_primeng_components_accordion_accordion__["AccordionModule"],
                __WEBPACK_IMPORTED_MODULE_27_primeng_components_panel_panel__["PanelModule"],
                __WEBPACK_IMPORTED_MODULE_28_primeng_components_button_button__["ButtonModule"],
                __WEBPACK_IMPORTED_MODULE_29_primeng_components_radiobutton_radiobutton__["RadioButtonModule"],
                __WEBPACK_IMPORTED_MODULE_30_primeng_card__["CardModule"],
                __WEBPACK_IMPORTED_MODULE_4_ng_recaptcha__["RecaptchaModule"].forRoot(),
                //FormlyBootstrapModule,
                __WEBPACK_IMPORTED_MODULE_8__ngx_formly_material__["a" /* FormlyMaterialModule */],
                __WEBPACK_IMPORTED_MODULE_7__ngx_formly_core__["d" /* FormlyModule */].forRoot({
                    wrappers: [
                        {
                            name: 'horizontalWrapper',
                            component: __WEBPACK_IMPORTED_MODULE_14__shared_formly_horizontal_types_index__["c" /* FormlyHorizontalWrapper */]
                        },
                        {
                            name: 'horizontalRadioWrapper',
                            component: __WEBPACK_IMPORTED_MODULE_14__shared_formly_horizontal_types_index__["a" /* FormlyHorizontalRadioWrapper */]
                        },
                        {
                            name: 'horizontalTextareaWrapper',
                            component: __WEBPACK_IMPORTED_MODULE_14__shared_formly_horizontal_types_index__["b" /* FormlyHorizontalTextAreaWrapper */]
                        }
                    ],
                    types: [
                        {
                            name: 'horizontalInput',
                            extends: 'input',
                            wrappers: ['fieldset', 'horizontalWrapper']
                        },
                        {
                            name: 'horizontalRadio',
                            extends: 'radio',
                            wrappers: ['fieldset', 'horizontalRadioWrapper']
                        },
                        {
                            name: 'horizontalTextarea',
                            extends: 'textarea',
                            wrappers: ['fieldset', 'horizontalTextareaWrapper']
                        },
                        { name: 'repeat', component: __WEBPACK_IMPORTED_MODULE_13__shared_formly_repeat_section_repeat_section_type__["a" /* RepeatTypeComponent */] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_73_mydatepicker__["MyDatePickerModule"],
                __WEBPACK_IMPORTED_MODULE_12__angular_common__["CommonModule"]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_19__services_auth_service__["a" /* AuthService */],
                __WEBPACK_IMPORTED_MODULE_18__services_auth_guard_login_service__["a" /* AuthGuardLogin */],
                __WEBPACK_IMPORTED_MODULE_17__services_auth_guard_admin_service__["a" /* AuthGuardAdmin */],
                __WEBPACK_IMPORTED_MODULE_23__services_token_service__["a" /* TokenService */],
                __WEBPACK_IMPORTED_MODULE_21__services_profile_service__["a" /* ProfileService */],
                __WEBPACK_IMPORTED_MODULE_22__services_states_service__["a" /* StatesService */],
                __WEBPACK_IMPORTED_MODULE_24__services_user_service__["a" /* UserService */],
                __WEBPACK_IMPORTED_MODULE_25__services_organize_service__["a" /* OrganizeService */],
                __WEBPACK_IMPORTED_MODULE_20_ngx_cookie_service__["a" /* CookieService */],
                __WEBPACK_IMPORTED_MODULE_72__services_can_deactivate_guard_service__["a" /* CanDeactivateGuardService */],
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HTTP_INTERCEPTORS */],
                    useClass: __WEBPACK_IMPORTED_MODULE_2__providers_token_interceptor__["a" /* TokenInterceptor */],
                    multi: true
                }
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]],
            // Add bootstrap
            bootstrap: [__WEBPACK_IMPORTED_MODULE_37__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./client/app/barchart/barchart.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"d3-barchart\" #barchart></div>"

/***/ }),

/***/ "./client/app/barchart/barchart.component.scss":
/***/ (function(module, exports) {

module.exports = ".d3-barchart {\n  width: 45%;\n  height: 170px;\n  padding-top: -10px;\n  margin-top: -10px; }\n\n.d3-barchart .axis path,\n.d3-barchart .axis line {\n  stroke: #999; }\n\n.d3-barchart .axis text {\n  fill: #999; }\n"

/***/ }),

/***/ "./client/app/barchart/barchart.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BarchartComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__("./node_modules/d3/index.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BarchartComponent = /** @class */ (function () {
    function BarchartComponent() {
        this.margin = { top: 20, bottom: 20, left: 40, right: 20 };
    }
    BarchartComponent.prototype.ngOnInit = function () {
        this.createChart();
        if (this.data) {
            this.updateChart();
        }
    };
    BarchartComponent.prototype.ngOnChanges = function () {
        if (this.chart) {
            this.updateChart();
        }
    };
    BarchartComponent.prototype.createChart = function () {
        var element = this.chartContainer.nativeElement;
        this.width = element.offsetWidth - this.margin.left - this.margin.right;
        this.height = element.offsetHeight - this.margin.top - this.margin.bottom;
        // viewbox is use to make svg responsive
        // preserveAspectRatio attribute IE needs a little more guidance
        var svg = __WEBPACK_IMPORTED_MODULE_1_d3__["f" /* select */](element)
            .append('svg')
            .attr('viewBox', '-30 -20 430 330')
            .attr('preserveAspectRatio', 'xMidYMin slice');
        // chart plot area
        this.chart = svg
            .append('g')
            .attr('class', 'bars')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")");
        // define X & Y domains
        var xDomain = this.data.map(function (d) { return d[0]; });
        var yDomain = [0, __WEBPACK_IMPORTED_MODULE_1_d3__["c" /* max */](this.data, function (d) { return d[1]; })];
        // create scales
        this.xScale = __WEBPACK_IMPORTED_MODULE_1_d3__["d" /* scaleBand */]()
            .padding(0.1)
            .domain(xDomain)
            .rangeRound([0, this.width]);
        this.yScale = __WEBPACK_IMPORTED_MODULE_1_d3__["e" /* scaleLinear */]()
            .domain(yDomain)
            .range([this.height, 0]);
        // bar colors
        this.colors = __WEBPACK_IMPORTED_MODULE_1_d3__["e" /* scaleLinear */]()
            .domain([0, this.data.length])
            .range(['red', 'blue']);
        // x & y axis
        this.xAxis = svg
            .append('g')
            .attr('class', 'axis axis-x')
            .attr('transform', "translate(" + this.margin.left + ", " + (this.margin.top + this.height) + ")")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["a" /* axisBottom */](this.xScale));
        this.yAxis = svg
            .append('g')
            .attr('class', 'axis axis-y')
            .attr('transform', "translate(" + this.margin.left + ", " + this.margin.top + ")")
            .call(__WEBPACK_IMPORTED_MODULE_1_d3__["b" /* axisLeft */](this.yScale).ticks(6));
    };
    BarchartComponent.prototype.updateChart = function () {
        var _this = this;
        // update scales & axis
        this.xScale.domain(this.data.map(function (d) { return d[0]; }));
        this.yScale.domain([0, __WEBPACK_IMPORTED_MODULE_1_d3__["c" /* max */](this.data, function (d) { return d[1]; })]);
        this.colors.domain([0, this.data.length]);
        this.xAxis.transition().call(__WEBPACK_IMPORTED_MODULE_1_d3__["a" /* axisBottom */](this.xScale));
        this.yAxis.transition().call(__WEBPACK_IMPORTED_MODULE_1_d3__["b" /* axisLeft */](this.yScale).ticks(6));
        var update = this.chart.selectAll('.bar').data(this.data);
        // remove exiting bars
        update.exit().remove();
        // update existing bars
        this.chart
            .selectAll('.bar')
            .transition()
            .attr('x', function (d) { return _this.xScale(d[0]); })
            .attr('y', function (d) { return _this.yScale(d[1]); })
            .attr('width', function (d) { return _this.xScale.bandwidth(); })
            .attr('height', function (d) { return _this.height - _this.yScale(d[1]); })
            .style('fill', function (d, i) { return _this.colors(i); });
        // add new bars
        update
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('x', function (d) { return _this.xScale(d[0]); })
            .attr('y', function (d) { return _this.yScale(0); })
            .attr('width', this.xScale.bandwidth())
            .attr('height', 0)
            .style('fill', function (d, i) { return _this.colors(i); })
            .transition()
            .delay(function (d, i) { return i * 10; })
            .attr('y', function (d) { return _this.yScale(d[1]); })
            .attr('height', function (d) { return _this.height - _this.yScale(d[1]); });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('barchart'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], BarchartComponent.prototype, "chartContainer", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], BarchartComponent.prototype, "data", void 0);
    BarchartComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-barchart',
            template: __webpack_require__("./client/app/barchart/barchart.component.html"),
            styles: [__webpack_require__("./client/app/barchart/barchart.component.scss")],
            encapsulation: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewEncapsulation"].None
        }),
        __metadata("design:paramtypes", [])
    ], BarchartComponent);
    return BarchartComponent;
}());



/***/ }),

/***/ "./client/app/carousel/carousel-item/carousel-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"carousel-item text-center\" [hidden]=\"!isActive\">\n  <!--<div class=\"carousel-item text-center\" >-->\n  <ng-content></ng-content>\n</div>"

/***/ }),

/***/ "./client/app/carousel/carousel-item/carousel-item.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/carousel/carousel-item/carousel-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselItemComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CarouselItemComponent = /** @class */ (function () {
    function CarouselItemComponent() {
    }
    CarouselItemComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-carousel-item',
            template: __webpack_require__("./client/app/carousel/carousel-item/carousel-item.component.html"),
            styles: [__webpack_require__("./client/app/carousel/carousel-item/carousel-item.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CarouselItemComponent);
    return CarouselItemComponent;
}());



/***/ }),

/***/ "./client/app/carousel/carousel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"carousel slide\">\n  <div class=\"carousel-inner\" role=\"listbox\">\n    <ng-content></ng-content>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/carousel/carousel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__carousel_item_carousel_item_component__ = __webpack_require__("./client/app/carousel/carousel-item/carousel-item.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CarouselComponent = /** @class */ (function () {
    function CarouselComponent() {
        this.delay = 0;
    }
    CarouselComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.activeItem = 0;
        var arrItems = this.items.toArray();
        var TOTAL_ITEMS = arrItems.length;
        setInterval(function () {
            arrItems.forEach(function (c, i) { return c.isActive = (i === _this.activeItem); });
            _this.activeItem = (_this.activeItem++) % TOTAL_ITEMS;
        }, this.delay);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], CarouselComponent.prototype, "delay", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__carousel_item_carousel_item_component__["a" /* CarouselItemComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"])
    ], CarouselComponent.prototype, "items", void 0);
    CarouselComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-carousel',
            template: __webpack_require__("./client/app/carousel/carousel.component.html")
        })
    ], CarouselComponent);
    return CarouselComponent;
}());



/***/ }),

/***/ "./client/app/footer/footer-tablet/footer-tablet.component.html":
/***/ (function(module, exports) {

module.exports = "<!--footer start from here-->\n\n<footer>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-4 col-sm-6 footerleft \">\n        <div class=\"logofooter\"> <img src=\"assets/images/reficon1.png\" class=\"img-fluid img-responsive\" width=auto alt=\"Rent A Ref\"><img src=\"assets/images/reftext.gif\"\n            class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=50% max-width=100% height=auto display=\"block\"></div>      \n\n      </div>\n      <div class=\"col-md-2 col-sm-6 paddingtop-bottom\">       \n        <ul class=\"footer-ul\">          \n          <li><a routerLink=\"/privacy-policy\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-file-text-o\"></i><span class=\"general-links\"> Privacy Policy</span>\n        </a></li>\n          <li><a routerLink=\"/terms-and-conditions\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-eye\"></i><span class=\"general-links\"> Terms & Conditions</span>\n        </a></li>         \n        </ul>\n      </div>     \n      <div class=\"col-md-3 col-sm-6 paddingtop-bottom\">       \n      </div>\n      <div class=\"social-icons img-responsive\">\n        <ul class=\"nomargin\">\n          <a href=\"https://www.facebook.com/rentaref\"><i class=\"fa fa-facebook-square fa-3x social-fb\" id=\"social\"></i></a>\n          <a href=\"https://twitter.com/rentaref\"><i class=\"fa fa-twitter-square fa-3x social-tw\" id=\"social\"></i></a>\n          <a href=\"https://www.instagram.com/rentaref/\"><i class=\"fa fa-instagram fa-3x social-gp\" id=\"social\"></i></a>\n          <br>\n          <a href=\"https://www.linkedin.com/company-beta/6407927/\"><i class=\"fa fa-linkedin-square fa-3x social-gp\" id=\"social\"></i></a>\n          <a href=\"mailto:info@rentaref.com\"><i class=\"fa fa-envelope-square fa-3x social-em\" id=\"social\"></i></a>\n\n        </ul>\n      </div>\n    </div>\n  </div>\n</footer>\n<!--footer start from here-->\n\n<div class=\"copyright\">\n  <div class=\"container\">\n    <div class=\"col-md-6\">\n      <p>&copy; 2017 - Powered by <a href=\"www.hasmandesign.com\"> Hasman Design L.L.C &reg;</a></p>\n    </div>\n    <div class=\"col-md-6\">\n      <ul class=\"bottom_ul\">\n        \n        <li><a routerLink=\"/about\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-book\"></i><span class=\"general-links\"> About Us</span>\n        </a></li>\n        \n        <li><a routerLink=\"/faq\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-question-circle-o\"></i><span class=\"general-links\"> Faq's</span>\n        </a></li>\n        <li><a routerLink=\"/contact\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-envelope-o\"></i><span class=\"general-links\"> Contact Us</span>\n        </a></li>\n        \n      </ul>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/footer/footer-tablet/footer-tablet.component.scss":
/***/ (function(module, exports) {

module.exports = "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700,300);\nfooter {\n  background-color: #0c1a1e;\n  min-height: 350px;\n  font-family: 'Open Sans', sans-serif; }\n.footerleft {\n  margin-top: 50px;\n  padding: 0 36px; }\n.logofooter {\n  margin-bottom: 10px;\n  font-size: 25px;\n  color: #fff;\n  font-weight: 700; }\n.footerleft p {\n  color: #fff;\n  font-size: 12px !important;\n  font-family: 'Open Sans', sans-serif;\n  margin-bottom: 15px; }\n.footerleft p i {\n  width: 20px;\n  color: #999; }\n.paddingtop-bottom {\n  margin-top: 50px; }\n.footer-ul {\n  list-style-type: none;\n  padding-left: 0px;\n  margin-left: 2px; }\n.footer-ul li {\n  line-height: 29px;\n  font-size: 12px; }\n.footer-ul li a {\n  color: #a0a3a4;\n  -webkit-transition: color 0.2s linear 0s, background 0.2s linear 0s;\n  transition: color 0.2s linear 0s, background 0.2s linear 0s; }\n.footer-ul i {\n  margin-right: 10px; }\n.footer-ul li a:hover {\n  -webkit-transition: color 0.2s linear 0s, background 0.2s linear 0s;\n  transition: color 0.2s linear 0s, background 0.2s linear 0s;\n  color: #ff670f; }\n.social:hover {\n  -webkit-transform: scale(1.1);\n  -moz-transform: scale(1.1);\n  -o-transform: scale(1.1); }\n.icon-ul {\n  list-style-type: none !important;\n  margin: 0px;\n  padding: 0px; }\n.icon-ul li {\n  line-height: 75px;\n  width: 100%;\n  float: left; }\n.icon {\n  float: left;\n  margin-right: 5px; }\n.copyright {\n  min-height: 40px;\n  background-color: #000000; }\n.copyright p {\n  text-align: left;\n  color: #FFF;\n  padding: 10px 0;\n  margin-bottom: 0px; }\n.heading7 {\n  font-size: 21px;\n  font-weight: 700;\n  color: #d9d6d6;\n  margin-bottom: 22px; }\n.post p {\n  font-size: 12px;\n  color: #FFF;\n  line-height: 20px; }\n.post p span {\n  display: block;\n  color: #8f8f8f; }\n.bottom_ul {\n  list-style-type: none;\n  float: right;\n  margin-bottom: 0px; }\n.bottom_ul li {\n  float: left;\n  line-height: 40px; }\n.bottom_ul li:after {\n  content: \"/\";\n  color: #FFF;\n  margin-right: 8px;\n  margin-left: 8px; }\n.bottom_ul li a {\n  color: #FFF;\n  font-size: 12px; }\n.general-links {\n  color: #ffffff;\n  cursor: pointer; }\n.blue-footer {\n  color: blue;\n  font-weight: bolder;\n  font-size: 14px; }\n"

/***/ }),

/***/ "./client/app/footer/footer-tablet/footer-tablet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterTabletComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterTabletComponent = /** @class */ (function () {
    function FooterTabletComponent() {
    }
    FooterTabletComponent.prototype.ngOnInit = function () {
    };
    FooterTabletComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer-tablet',
            template: __webpack_require__("./client/app/footer/footer-tablet/footer-tablet.component.html"),
            styles: [__webpack_require__("./client/app/footer/footer-tablet/footer-tablet.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterTabletComponent);
    return FooterTabletComponent;
}());



/***/ }),

/***/ "./client/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<!--footer start from here-->\n\n<footer>\n  <div class=\"row\">\n    <div class=\"col-sm-3 footerleft \">\n      <pre> <em *ngIf=\"dt\">{{ getDate() | date:'fullDate'}}</em></pre>\n      <span style=\"display: none;\">\n        <button type=\"button\" class=\"btn btn-sm btn-info \" (click)=\"today()\">Today</button>\n      </span>\n      <div class=\"logofooter\">\n        <img src=\"assets/images/reficon1.png\" class=\"img-fluid img-responsive\" width=auto alt=\"Rent A Ref\"><img src=\"assets/images/reftext.gif\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=50% max-width=100% height=auto display=\"block\">\n      </div>\n      <p>Your most trusted gateway to modern sports management. <b>1 STOP</b> to events organization and Referee or Umpires assignment </p>\n      <p><i class=\"fa fa-envelope\"></i> E-mail : info@rentaref.com</p>\n    </div>\n    <div class=\"col-sm-3 paddingtop-bottom\">\n      <h6 class=\"heading7\">GENERAL LINKS</h6>\n      <ul class=\"footer-ul\">\n        <li>\n          <a routerLink=\"/career\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n            <i class=\"fa fa-briefcase\"></i>\n            <span class=\"general-links\"> Career</span>\n          </a>\n        </li>\n        <li data-toggle=\"modal\" data-target=\"#ordine\" (click)=\"privacy = true\">\n              <!--<a routerLink=\"/privacy-policy\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">-->\n          <i class=\"fa fa-file-text-o\"></i><span class=\"general-links\"> Privacy Policy</span>\n        </li>\n        <li data-toggle=\"modal\" data-target=\"#ordine\" (click)=\"selectLoad = true; privacy = false\">\n            <!--<a routerLink=\"/terms-and-conditions\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">-->\n          <i class=\"fa fa-eye\"></i>\n          <span class=\"general-links\"> Terms & Conditions( Referee )</span>\n        </li>\n        <li data-toggle=\"modal\" data-target=\"#ordine\" (click)=\"selectLoad = false; privacy = false\">\n          <i class=\"fa fa-eye\"></i>\n          <span class=\"general-links\"> Terms & Conditions( Organizer )</span>\n        </li>\n        <li>\n          <a routerLink=\"/faq\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n            <i class=\"fa fa-question-circle-o\"></i><span class=\"general-links\"> Frequently Ask Questions</span>\n          </a>\n        </li>\n      </ul>\n    </div>\n    <div class=\"col-sm-3 paddingtop-bottom\">\n      <h6 class=\"heading7\">LATEST POST</h6>\n      <div class=\"post\">\n        <p>facebook crack the movie advertisment code:what it means for you <span>August 3,2015</span></p>\n        <p>facebook crack the movie advertisment code:what it means for you <span>August 3,2015</span></p>\n        <p>facebook crack the movie advertisment code:what it means for you <span>August 3,2015</span></p>\n      </div>\n    </div>\n    <div class=\"col-sm-3 paddingtop-bottom\">\n    </div>\n    <div class=\"social-icons img-responsive\">\n      <ul class=\"nomargin\">\n        <a href=\"https://www.facebook.com/rentaref\"><i class=\"fa fa-facebook-square fa-3x social-fb\" id=\"social\"></i></a>\n        <a href=\"https://twitter.com/rentaref\"><i class=\"fa fa-twitter-square fa-3x social-tw\" id=\"social\"></i></a>\n        <a href=\"https://www.instagram.com/rentaref/\"><i class=\"fa fa-instagram fa-3x social-gp\" id=\"social\"></i></a>\n        <a href=\"https://www.linkedin.com/company-beta/6407927/\"><i class=\"fa fa-linkedin-square fa-3x social-gp\" id=\"social\"></i></a>\n        <a href=\"mailto:info@rentaref.com\"><i class=\"fa fa-envelope-square fa-3x social-em\" id=\"social\"></i></a>\n      </ul>\n    </div>\n  </div>\n\n</footer>\n<!--footer start from here-->\n\n<div class=\"copyright\">\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-6\">\n        <p>&copy; 2017 - Powered by <a href=\"http://www.hasmandesign.com\" target=\"_blank\"> Hasman Design L.L.C &reg;</a></p>\n      </div>\n      <div class=\"col-md-6\">\n        <ul class=\"bottom_ul\">\n          <li>\n            <a routerLink=\"/about\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n              <i class=\"fa fa-book\"></i><span class=\"general-links\"> About Us</span>\n            </a>\n          </li>\n          <li>\n            <a routerLink=\"/blog\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n              <i class=\"fa fa-rss-square\"></i><span class=\"general-links\"> Blog</span>\n            </a>\n          </li>\n          <li>\n            <a routerLink=\"/contact\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n              <i class=\"fa fa-envelope-o\"></i><span class=\"general-links\"> Contact Us</span>\n            </a>\n          </li>\n          <li>\n            <a routerLink=\"/sitemap\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n              <i class=\"fa fa-sitemap\"></i><span class=\"general-links\"> Site Map</span>\n            </a>\n          </li>\n        </ul>\n      </div>\n    </div>\n  </div>\n</div>\n\n<!-- Modal start Terms & Conditions Referee-->\n<div id=\"ordine\" class=\"modal fade\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"ordineLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header\" *ngIf=\"!privacy\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n        <button></button><h4 class=\"modal-title\">Rend-A-Ref Terms and Conditions</h4>\n      </div>\n      <div class=\"modal-header\" *ngIf=\"privacy\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n        <button></button>\n        <h4 class=\"modal-title\">Rend-A-Ref Privacy Policy</h4>\n      </div>\n      <div class=\"modal-body\" *ngIf=\"!privacy\">\n        <div class=\"embed-responsive embed-responsive-16by9\" *ngIf=\"selectLoad\">\n          <iframe class=\"embed-responsive-item\" src=\"/assets/src/terms-conditions.txt\" allowfullscreen></iframe>\n        </div>\n        <div class=\"embed-responsive embed-responsive-16by9\" *ngIf=\"!selectLoad\">\n          <iframe class=\"embed-responsive-item\" src=\"/assets/src/terms-condition-organizer.txt\" allowfullscreen></iframe>\n        </div>\n        <p><span class=\"blue-footer\">Thank you</span></p>\n      </div>\n      <!--Privacy start-->\n      <div class=\"modal-body\" *ngIf=\"privacy\">\n        <div class=\"embed-responsive embed-responsive-16by9\">\n          <iframe class=\"embed-responsive-item\" src=\"/assets/src/privacy.txt\" allowfullscreen></iframe>\n        </div>\n\n        <p><span class=\"blue-footer\">Thank you</span></p>\n      </div>\n      <!--Privacy end-->\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div>\n\n  </div>\n</div>\n<!--Modal end-->\n\n<!-- Modal start Terms & Conditions Organizer-->\n<div id=\"ordineOrganizer\" class=\"modal fade\" tabindex=\"-2\" role=\"dialog\" aria-labelledby=\"ordineLabel\" aria-hidden=\"true\">\n  <div class=\"modal-dialog\">\n\n    <!-- Modal content-->\n    <div class=\"modal-content\">\n      <div class=\"modal-header\">\n        <button type=\"button\" class=\"close\" data-dismiss=\"modal\">×</button>\n        <h4 class=\"modal-title\">Rend-A-Ref Terms and Conditions</h4>\n      </div>\n      <div class=\"modal-body\">\n        <div class=\"embed-responsive embed-responsive-16by9\">\n          <iframe class=\"embed-responsive-item\" src=\"/assets/src/terms-conditions.txt\" allowfullscreen></iframe>\n        </div>\n        <p><span class=\"blue-footer\">Thank you</span></p>\n      </div>\n      <div class=\"modal-footer\">\n        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close</button>\n      </div>\n    </div>\n\n  </div>\n</div>\n<!--Modal end-->\n"

/***/ }),

/***/ "./client/app/footer/footer.component.scss":
/***/ (function(module, exports) {

module.exports = "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700,300);\nfooter {\n  background-color: #0c1a1e;\n  min-height: 21.875em;\n  font-family: 'Open Sans', sans-serif; }\n.footerleft {\n  margin-top: 50px;\n  padding: 0 2.25em; }\n.logofooter {\n  margin-bottom: 0.625em;\n  font-size: 1.5625em;\n  color: white;\n  font-weight: 700; }\n.footerleft p {\n  color: white;\n  font-size: 0.75em !important;\n  font-family: 'Open Sans', sans-serif;\n  margin-bottom: 0.9375em; }\n.footerleft p i {\n  width: 1.25em;\n  color: #999; }\n.paddingtop-bottom {\n  margin-top: 3.125em; }\n.footer-ul {\n  list-style-type: none;\n  padding-left: 0;\n  margin-left: 0.125em; }\n.footer-ul li {\n  line-height: 1.8125em;\n  font-size: 0.75em; }\n.footer-ul li a {\n  color: #a0a3a4;\n  -webkit-transition: color 0.2s linear 0s, background 0.2s linear 0s;\n  transition: color 0.2s linear 0s, background 0.2s linear 0s; }\n.footer-ul i {\n  margin-right: 10px; }\n.footer-ul li a:hover {\n  -webkit-transition: color 0.2s linear 0s, background 0.2s linear 0s;\n  transition: color 0.2s linear 0s, background 0.2s linear 0s;\n  color: #ff670f; }\n.social:hover {\n  -webkit-transform: scale(1.1);\n  -moz-transform: scale(1.1);\n  -o-transform: scale(1.1); }\n.icon-ul {\n  list-style-type: none !important;\n  margin: 0;\n  padding: 0; }\n.icon-ul li {\n  line-height: 4.6875em;\n  width: 100%;\n  float: left; }\n.icon {\n  float: left;\n  margin-right: 0.3125em; }\n.copyright {\n  min-height: 2.5em;\n  background-color: #000000; }\n.copyright p {\n  text-align: left;\n  color: #FFF;\n  padding: 0.625em 0;\n  margin-bottom: 0; }\n.heading7 {\n  font-size: 1.3125em;\n  font-weight: 700;\n  color: #d9d6d6;\n  margin-bottom: 1.375em; }\n.post p {\n  font-size: 0.75em;\n  color: white;\n  line-height: 1.25em; }\n.post p span {\n  display: block;\n  color: #8f8f8f; }\n.bottom_ul {\n  list-style-type: none;\n  float: right;\n  margin-bottom: 0; }\n.bottom_ul li {\n  float: left;\n  line-height: 2.5em; }\n/*.bottom_ul li:after{ content:\"/\"; color:#FFF; margin-right:0.5em; margin-left: 0.5em;}*/\n.bottom_ul li a {\n  color: white;\n  font-size: 0.75em; }\n@media (max-width: 768px) {\n  .btn-responsive {\n    padding: 0.125em 0.25em;\n    font-size: 80%;\n    line-height: 1;\n    border-radius: 3px; } }\n@media (min-width: 769px) and (max-width: 992px) {\n  .btn-responsive {\n    padding: 0.25em 0.5625em;\n    font-size: 90%;\n    line-height: 1.2; } }\n.general-links {\n  color: white;\n  cursor: pointer; }\n.blue-footer {\n  color: blue;\n  font-weight: bolder;\n  font-size: 0.875em; }\n.row_padding {\n  margin-left: -20%;\n  padding-left: -20%;\n  margin-right: -20%;\n  padding-right: -20%; }\n"

/***/ }),

/***/ "./client/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    function FooterComponent() {
        this.dt = new Date();
        this.selectLoad = true;
        this.privacy = false;
    }
    FooterComponent.prototype.ngOnInit = function () { };
    FooterComponent.prototype.getDate = function () {
        return (this.dt && this.dt.getTime()) || new Date().getTime();
    };
    FooterComponent.prototype.today = function () {
        this.dt = new Date();
    };
    FooterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__("./client/app/footer/footer.component.html"),
            styles: [__webpack_require__("./client/app/footer/footer.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./client/app/games/games.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row game\">\n  <div class=\"col-4\">\n    <app-leftmenu></app-leftmenu>\n  </div>\n  <div class=\"col-8\">\n    <app-loading [condition]=\"isLoading\"></app-loading>\n\n    <app-toast [message]=\"toast.message\"></app-toast>\n    <div class=\"card\" *ngIf=\"!isLoading\">\n      <h4>Game Assignment</h4>\n\n      <form [formGroup]=\"form\" (ngSubmit)=\"submit(userModel)\">\n        <formly-form [model]=\"userModel\" [fields]=\"userFields\">\n          <button type=\"submit\" class=\"btn btn-default\">Submit</button>\n        </formly-form>\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/games/games.component.scss":
/***/ (function(module, exports) {

module.exports = ".game {\n  background-color: #4F4F6B; }\n"

/***/ }),

/***/ "./client/app/games/games.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_index__ = __webpack_require__("./client/app/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var GamesComponent = /** @class */ (function () {
    function GamesComponent(auth, toast, profileService, router, userService) {
        this.auth = auth;
        this.toast = toast;
        this.profileService = profileService;
        this.router = router;
        this.userService = userService;
        this.isLoading = true;
        this.allowEdit = false;
        this.form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({});
        this.userModel = { email: 'email@gmail.com' };
        this.userFields = [
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email address',
                    placeholder: 'Enter email',
                    required: true
                }
            }
        ];
    }
    GamesComponent.prototype.ngOnInit = function () {
        this.isLoading = false;
    };
    GamesComponent.prototype.canDeactivate = function () {
        if (!this.allowEdit) {
            return true;
        }
    };
    GamesComponent.prototype.submit = function (user) {
        console.log(user);
    };
    GamesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-games',
            template: __webpack_require__("./client/app/games/games.component.html"),
            styles: [__webpack_require__("./client/app/games/games.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["c" /* ProfileService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["e" /* UserService */]])
    ], GamesComponent);
    return GamesComponent;
}());



/***/ }),

/***/ "./client/app/googlemap/google-map.component.html":
/***/ (function(module, exports) {

module.exports = "<agm-map [latitude]=\"DALLAS.lat\" [longitude]=\"DALLAS.lng\">\n  <agm-marker [latitude]=\"DALLAS.lat\" [longitude]=\"DALLAS.lng\"></agm-marker>\n</agm-map>"

/***/ }),

/***/ "./client/app/googlemap/google-map.component.scss":
/***/ (function(module, exports) {

module.exports = "agm-map {\n  height: 300px; }\n"

/***/ }),

/***/ "./client/app/googlemap/google-map.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GoogleMapComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//https://sergeome.com/blog/2017/07/02/angular4-and-google-maps-native-javascript-api/

var GoogleMapComponent = /** @class */ (function () {
    function GoogleMapComponent() {
        this.DALLAS = { lat: 32.7767, lng: -96.7970 };
    }
    GoogleMapComponent.prototype.ngOnInit = function () {
        var map;
        var marker;
        var DALLAS = { lat: 32.7767, lng: -96.7970 };
        /*
                map = new google.maps.Map(document.getElementById('map'), {
                    center: DALLAS,
                    zoom: 7
                });
        
                marker = new google.maps.Marker({
                    position: DALLAS,
                    map: map,
                    title: 'Hello World!'
                });
                */
    };
    GoogleMapComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rar-google-map',
            template: __webpack_require__("./client/app/googlemap/google-map.component.html"),
            styles: [__webpack_require__("./client/app/googlemap/google-map.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], GoogleMapComponent);
    return GoogleMapComponent;
}());



/***/ }),

/***/ "./client/app/group/blog/blog.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card col-sm-12\">\n  <div class=\"card\">\n    <h4 class=\"elegantshd bigFont\">Blog</h4>\n    <div class=\"card-block\">\n      <blockquote>\n        <p>Read on ...</p>\n      </blockquote>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/group/blog/blog.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/group/blog/blog.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BlogComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var BlogComponent = /** @class */ (function () {
    function BlogComponent() {
    }
    BlogComponent.prototype.ngOnInit = function () { };
    BlogComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-blog',
            template: __webpack_require__("./client/app/group/blog/blog.component.html"),
            styles: [__webpack_require__("./client/app/group/blog/blog.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BlogComponent);
    return BlogComponent;
}());



/***/ }),

/***/ "./client/app/group/careers/careers.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card col-sm-12\">\n  <div class=\"card\">\n    <h4 class=\"elegantshd bigFont\">Work with Us</h4>\n    <div class=\"card-block\">\n      <blockquote>\n        <p>Sorry, we currently have no opening at the moment.</p>\n      </blockquote>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/group/careers/careers.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/group/careers/careers.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CareersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CareersComponent = /** @class */ (function () {
    function CareersComponent() {
    }
    CareersComponent.prototype.ngOnInit = function () { };
    CareersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-careers',
            template: __webpack_require__("./client/app/group/careers/careers.component.html"),
            styles: [__webpack_require__("./client/app/group/careers/careers.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], CareersComponent);
    return CareersComponent;
}());



/***/ }),

/***/ "./client/app/group/contactus/contactus.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <app-toast [message]=\"toast.message\"></app-toast>\n\n    <div class=\"card\">\n      <div class=\"card form-size\">\n        <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(model)\">\n          <formly-form [model]=\"model\" [fields]=\"fields\" [options]=\"options\" [form]=\"form\">\n            <button type=\"submit\" class=\"btn btn-primary btn-sm\"  [disabled]=\"form.invalid\"><i class=\"fa fa-paper-plane-o\"></i>&nbsp;Send</button>\n          </formly-form> \n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/group/contactus/contactus.component.scss":
/***/ (function(module, exports) {

module.exports = ":host /deep/ textarea {\n  min-height: 10em;\n  max-height: 10em;\n  resize: none; }\n"

/***/ }),

/***/ "./client/app/group/contactus/contactus.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ContactUsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_take__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/take.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ContactUsComponent = /** @class */ (function () {
    function ContactUsComponent(toast) {
        this.toast = toast;
        this.form = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({});
        this.model = {};
        this.options = {};
    }
    ContactUsComponent.prototype.ngOnInit = function () {
        this.fields = [
            {
                key: 'fullname',
                type: 'input',
                templateOptions: {
                    placeholder: 'Fullname',
                    label: 'Fullname',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    placeholder: 'Email Address',
                    label: 'Email',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'subject',
                type: 'input',
                templateOptions: {
                    placeholder: 'Subject',
                    label: 'Subject',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'comment',
                type: 'textarea',
                templateOptions: {
                    type: 'textarea',
                    placeholder: 'Comment',
                    label: 'Comment',
                    required: true,
                    minLength: 5
                }
            }
        ];
    };
    ContactUsComponent.prototype.onsubmit = function (model) { };
    ContactUsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-contactus',
            template: __webpack_require__("./client/app/group/contactus/contactus.component.html"),
            styles: [__webpack_require__("./client/app/group/contactus/contactus.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__shared_toast_toast_component__["a" /* ToastComponent */]])
    ], ContactUsComponent);
    return ContactUsComponent;
}());



/***/ }),

/***/ "./client/app/group/faq/faq.component.html":
/***/ (function(module, exports) {

module.exports = "<!DOCTYPE html>\n<html>\n\n  <head>\n    <meta charset=\"UTF-8\">\n    <title>Slider Animation</title>\n    <link href=\"https://fonts.googleapis.com/css?family=Montserrat\" rel=\"stylesheet\">\n    <link rel=\"stylesheet\" href=\"https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css\">\n\n\n    <link rel=\"stylesheet\" href=\"/assets/css/newsstyle.scss\">\n\n\n  </head>\n\n  <body>\n    <div class=\"com\">\n      <div class=\"com__content\">\n        <section class=\"com__section com__section--text\">\n          <h1 class=\"animate slideInLeft \">Communication Design</h1>\n          <p class=\"animate slideInLeft delay-3\">Communication design is a mixed discipline between design and information-development which is concerned with how\n            media intermission such as printed, crafted, electronic media or presentations communicate with people.</p>\n        </section>\n        <section class=\"com__section com__section--text com__section--text-img\">\n          <div class=\"com__section-half\">\n            <h1 class=\"animate slideInLeft\">Communication Design</h1>\n            <p class=\"animate slideInLeft delay-2\">Communication design is a mixed discipline between design and information-development which is concerned with\n              how media intermission such as printed, crafted, electronic media or presentations communicate with people.</p>\n          </div>\n          <div class=\"com__section-half\">\n            <img class=\"animate slideInRight delay-3\" src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/45226/ettrics-logo.svg\" alt=\"\"\n            />\n          </div>\n        </section>\n        <section class=\"com__section com__section--text centered\">\n          <h1 class=\"animate scaleIn\">Communication Design</h1>\n          <img class=\"animate scaleIn delay-3\" src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/45226/ettrics-logo.svg\" alt=\"\" />\n        </section>\n        <section class=\"com__section com__section--text\">\n          <h1 class=\"animate slideInLeft \">Communication Design</h1>\n          <p class=\"animate slideInLeft delay-3\">Communication design is a mixed discipline between design and information-development which is concerned with how\n            media intermission such as printed, crafted, electronic media or presentations communicate with people.</p>\n        </section>\n        <section class=\"com__section com__section--text com__section--text-img\">\n          <div class=\"com__section-half\">\n            <h1 class=\"animate slideInLeft\">Communication Design</h1>\n            <p class=\"animate slideInLeft delay-2\">Communication design is a mixed discipline between design and information-development which is concerned with\n              how media intermission such as printed, crafted, electronic media or presentations communicate with people.</p>\n          </div>\n          <div class=\"com__section-half\">\n            <img class=\"animate slideInRight delay-3\" src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/45226/ettrics-logo.svg\" alt=\"\"\n            />\n          </div>\n        </section>\n        <section class=\"com__section com__section--text centered\">\n          <h1 class=\"animate scaleIn\">Communication Design</h1>\n          <img class=\"animate scaleIn delay-3\" src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/45226/ettrics-logo.svg\" alt=\"\" />\n        </section>\n        <section class=\"com__section com__section--text\">\n          <h1 class=\"animate slideInLeft \">Communication Design</h1>\n          <p class=\"animate slideInLeft delay-3\">Communication design is a mixed discipline between design and information-development which is concerned with how\n            media intermission such as printed, crafted, electronic media or presentations communicate with people.</p>\n        </section>\n      </div>\n      <nav class=\"com__nav\">\n        <ul class=\"com__nav-list\">\n          <li class=\"com__nav-item\">\n            <a href=\"\" class=\"com__nav-link\">\n\t\t\t\t\t<span class=\"blue-line animate scaleInLeft delay-2\"></span>\n\t\t\t\t\t<span class=\"white-line animate scaleInLeft delay-4\"></span>\n\t\t\t\t\t<span class=\"white-line animate scaleInLeft delay-5\"></span>\n\t\t\t\t</a>\n          </li>\n          <li class=\"com__nav-item\">\n            <a href=\"\" class=\"com__nav-link flex-row\">\n              <div class=\"com__section-half\">\n                <span class=\"blue-line animate scaleInLeft delay-3\"></span>\n                <span class=\"white-line animate scaleInLeft delay-4\"></span>\n              </div>\n              <div class=\"com__section-half\">\n                <span class=\"white-circle animate slideInRight delay-5\"></span>\n              </div>\n            </a>\n          </li>\n          <li class=\"com__nav-item\">\n            <a href=\"\" class=\"com__nav-link centered\">\n\t\t\t\t\t<span class=\"blue-line animate scaleIn delay-3\"></span>\n\t\t\t\t\t<span class=\"white-circle animate scaleIn delay-5\"></span>\n\t\t\t\t</a>\n          </li>\n          <li class=\"com__nav-item\">\n            <a href=\"\" class=\"com__nav-link\">\n\t\t\t\t\t<span class=\"blue-line animate scaleInLeft delay-2\"></span>\n\t\t\t\t\t<span class=\"white-line animate scaleInLeft delay-4\"></span>\n\t\t\t\t\t<span class=\"white-line animate scaleInLeft delay-5\"></span>\n\t\t\t\t</a>\n          </li>\n          <li class=\"com__nav-item\">\n            <a href=\"\" class=\"com__nav-link flex-row\">\n              <div class=\"com__section-half\">\n                <span class=\"blue-line animate scaleInLeft delay-3\"></span>\n                <span class=\"white-line animate scaleInLeft delay-4\"></span>\n              </div>\n              <div class=\"com__section-half\">\n                <span class=\"white-circle animate slideInRight delay-5\"></span>\n              </div>\n            </a>\n          </li>\n          <li class=\"com__nav-item\">\n            <a href=\"\" class=\"com__nav-link centered\">\n\t\t\t\t\t<span class=\"blue-line animate scaleIn delay-3\"></span>\n\t\t\t\t\t<span class=\"white-circle animate scaleIn delay-5\"></span>\n\t\t\t\t</a>\n          </li>\n          <li class=\"com__nav-item\">\n            <a href=\"\" class=\"com__nav-link\">\n\t\t\t\t\t<span class=\"blue-line animate scaleInLeft delay-2\"></span>\n\t\t\t\t\t<span class=\"white-line animate scaleInLeft delay-4\"></span>\n\t\t\t\t\t<span class=\"white-line animate scaleInLeft delay-5\"></span>\n\t\t\t\t</a>\n          </li>\n        </ul>\n      </nav>\n    </div>\n\n    <a href=\"http://ettrics.com/code/material-design-slider-animation/\" class=\"logo\" target=\"_blank\">\n <img class=\"logo\" src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/45226/ettrics-logo.svg\" alt=\"\" /> \n</a>\n    <script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>\n\n    <script src=\"/assets/js/index.js\"></script>\n\n  </body>\n\n</html>"

/***/ }),

/***/ "./client/app/group/faq/faq.component.scss":
/***/ (function(module, exports) {

module.exports = "* {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n\nbody {\n  font-family: 'Montserrat';\n  -webkit-font-smoothing: antialiased;\n  line-height: 1.5; }\n\n.com {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: stretch;\n      -ms-flex-align: stretch;\n          align-items: stretch;\n  height: 100vh;\n  overflow: hidden; }\n\n.com__content {\n    position: relative;\n    -webkit-box-flex: 8;\n        -ms-flex: 8;\n            flex: 8;\n    background: #404855;\n    padding: 10vh 10vw; }\n\n.com__section {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: column wrap;\n            flex-flow: column wrap;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    height: 100vh;\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    padding: 0 10%;\n    opacity: 0;\n    visibility: hidden;\n    -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }\n\n.com__section.active {\n      opacity: 1;\n      visibility: visible; }\n\n.com__section-half {\n      -webkit-box-flex: 1;\n          -ms-flex: 1;\n              flex: 1;\n      height: 100vh;\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: vertical;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: column wrap;\n              flex-flow: column wrap;\n      -webkit-box-pack: center;\n          -ms-flex-pack: center;\n              justify-content: center; }\n\n.com__section--text h1 {\n      margin-bottom: 3vh;\n      font-size: 48px;\n      font-weight: 300;\n      color: #22E2ED; }\n\n.com__section--text p {\n      margin: 0;\n      color: rgba(255, 255, 255, 0.9);\n      max-width: 600px;\n      font-size: 20px; }\n\n.com__section--text img {\n      max-width: 250px;\n      margin: 0 auto; }\n\n.com__section--text.centered {\n      text-align: center; }\n\n.com__section--text-img {\n      display: -webkit-box;\n      display: -ms-flexbox;\n      display: flex;\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: row wrap;\n              flex-flow: row wrap; }\n\n.com__nav {\n    width: 90px; }\n\n.com__nav-list {\n    margin: 0;\n    padding: 0;\n    list-style-type: none;\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: column wrap;\n            flex-flow: column wrap;\n    height: 100vh;\n    overflow: visible; }\n\n.com__nav-item {\n    -webkit-box-flex: 1;\n        -ms-flex: 1;\n            flex: 1;\n    position: relative;\n    overflow: visible;\n    border-bottom: 7px solid #1BAFB9;\n    background: #22E2ED;\n    -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }\n\n.com__nav-item.active {\n      background: #20232a; }\n\n.com__nav-item:last-child {\n      border-bottom: none; }\n\n.com__nav-item:hover {\n      -webkit-box-flex: 2;\n          -ms-flex: 2;\n              flex: 2; }\n\n.com__nav-item:hover .com__nav-link {\n        -webkit-transform: scaleX(1);\n                transform: scaleX(1); }\n\n.com__nav-item:hover .blue-line,\n      .com__nav-item:hover .white-line,\n      .com__nav-item:hover .white-circle {\n        -webkit-transform: none;\n                transform: none;\n        opacity: 1; }\n\n.com__nav-link {\n    display: -webkit-box;\n    display: -ms-flexbox;\n    display: flex;\n    -webkit-box-orient: vertical;\n    -webkit-box-direction: normal;\n        -ms-flex-flow: column wrap;\n            flex-flow: column wrap;\n    -webkit-box-pack: center;\n        -ms-flex-pack: center;\n            justify-content: center;\n    padding: 0 20%;\n    position: absolute;\n    width: 280%;\n    height: 100%;\n    left: calc(-280% + 90px);\n    background: rgba(32, 35, 42, 0.75);\n    -webkit-transform: scaleX(0);\n            transform: scaleX(0);\n    -webkit-transform-origin: right center;\n            transform-origin: right center;\n    -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }\n\n.com__nav-link.flex-row {\n      -webkit-box-orient: horizontal;\n      -webkit-box-direction: normal;\n          -ms-flex-flow: row wrap;\n              flex-flow: row wrap; }\n\n.com__nav-link.centered {\n      -webkit-box-align: center;\n          -ms-flex-align: center;\n              align-items: center; }\n\n.com__nav-link .com__section-half {\n      height: auto; }\n\n.com__nav-link .com__section-half:nth-child(2) {\n        -webkit-box-align: center;\n            -ms-flex-align: center;\n                align-items: center; }\n\n.blue-line {\n  display: block;\n  width: 80%;\n  height: 14px;\n  background: #22E2ED;\n  margin-bottom: 12px; }\n\n.white-line {\n  display: block;\n  width: 60%;\n  height: 5px;\n  background: rgba(255, 255, 255, 0.9);\n  margin-bottom: 7px; }\n\n.white-line:nth-of-type(3) {\n    width: 50%; }\n\n.white-circle {\n  display: block;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.9); }\n\n/* animation classes */\n\n.animate {\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }\n\n.slideInLeft {\n  -webkit-transform: translate3d(-100%, 0, 0);\n          transform: translate3d(-100%, 0, 0);\n  opacity: 0; }\n\n.slideInRight {\n  -webkit-transform: translate3d(100%, 0, 0);\n          transform: translate3d(100%, 0, 0);\n  opacity: 0; }\n\n.scaleIn {\n  -webkit-transform: scale(0);\n          transform: scale(0); }\n\n.scaleInLeft {\n  -webkit-transform: scaleX(0);\n          transform: scaleX(0);\n  -webkit-transform-origin: left center;\n          transform-origin: left center; }\n\n.delay-1 {\n  -webkit-transition-delay: 0.05s;\n          transition-delay: 0.05s; }\n\n.delay-2 {\n  -webkit-transition-delay: 0.1s;\n          transition-delay: 0.1s; }\n\n.delay-3 {\n  -webkit-transition-delay: 0.15s;\n          transition-delay: 0.15s; }\n\n.delay-4 {\n  -webkit-transition-delay: 0.2s;\n          transition-delay: 0.2s; }\n\n.delay-5 {\n  -webkit-transition-delay: 0.25s;\n          transition-delay: 0.25s; }\n\n.logo {\n  position: fixed;\n  bottom: 3vh;\n  left: 3vw;\n  z-index: 2; }\n\n.logo img {\n    width: 45px;\n    -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n    -webkit-transform: rotate(0);\n            transform: rotate(0); }\n\n.logo img:hover {\n      -webkit-transform: rotate(180deg) scale(1.1);\n              transform: rotate(180deg) scale(1.1); }\n"

/***/ }),

/***/ "./client/app/group/faq/faq.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FaqComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FaqComponent = /** @class */ (function () {
    function FaqComponent() {
    }
    FaqComponent.prototype.ngOnInit = function () { };
    FaqComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-faq',
            template: __webpack_require__("./client/app/group/faq/faq.component.html"),
            styles: [__webpack_require__("./client/app/group/faq/faq.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], FaqComponent);
    return FaqComponent;
}());



/***/ }),

/***/ "./client/app/group/partners/partners.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container bg-faded col-sm-12\" style=\"opacity: .9;filter: alpha(opacity=90);\">\n\t<!--<div class=\"row card\">-->\n\t\t<div class=\"row\">\n      <h4 class=\"elegantshd bigFont\">Who Uses Rent-A-Ref</h4>\n      <div class=\"col-sm-12\"><span style=\"text-align:center\">\n<h4> In addition to our On-Demand Service</h4>\n<h4>We provide referees for the following companies</h4></span></div>\n<hr>\n    <!--<div class=\"row\">\n    <div class=\"block\">\n\n        <a href=\"https://www.xbootstrap.com/\"><i class=\"hoverbtn effect-5 sub-a\">Hover Over</i></a>\n    </div>\n    <div class=\"block\">\n\n        <i class=\"hoverbtn effect-6\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n\n        <i class=\"hoverbtn effect-7 sub-a\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n\n        <i class=\"hoverbtn effect-7 sub-b\">Hover Over</i>\n    </div>\n</div>-->\n\n\n\n<div class=\"row\">\n    <!--<div class=\"block\">\n\n        <i class=\"hoverbtn effect-8\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n\n        <i class=\"hoverbtn effect-9 sub-a\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n\n        <i class=\"hoverbtn effect-9 sub-b\">Hover Over</i>\n    </div>-->\n    <div class=\"block\">\n        <a href=\"http://www.zogsports.com/\" target=\"_blank\"><i class=\"hoverbtn effect-1 sub-a quoteImage\"><img src=\"/assets/images/zogsport.png\" class=\"img-fluid img-responsive\" width=40%>\n        </i></a>\n    </div>\n    <div class=\"block\">\n        <a href=\"https://www.adidas.com/\" target=\"_blank\"><i class=\"hoverbtn effect-4 sub-b\"><span style=\"padding-left:20px; margin-left:20px;\"><img src=\"/assets/images/adidas.png\" class=\"img-fluid img-responsive\" width=99%></span></i></a>\n    </div>\n    <div class=\"block\">\n        <a href=\"https://lasportsnet.com/\" target=\"_blank\"><i class=\"hoverbtn effect-1 sub-aa quoteImage\"><img src=\"/assets/images/LSNLogo.gif\" class=\"img-fluid img-responsive\" width=99%>\n        </i></a>\n    </div>\n    <div class=\"block\">\n        <a href=\"http://socal-sts.weebly.com/\" target=\"_blank\"><i class=\"hoverbtn effect-4 sub-b\"><span style=\"padding-left:20px; margin-left:20px;\"><img src=\"/assets/images/sts.png\" class=\"img-fluid img-responsive\" width=99%></span></i></a>\n    </div>\n</div>\n\n\n<div class=\"row\">\n    <div class=\"block\">\n        <a href=\"#\" target=\"_blank\"><i class=\"hoverbtn effect-4 sub-b\"><span style=\"padding-left:20px; margin-left:20px;\"><img src=\"/assets/images/orange.png\" class=\"img-fluid img-responsive\" width=99%></span></i></a>\n    </div>\n</div>\n<!--\n    <div class=\"block\">\n        <i class=\"hoverbtn effect-1 sub-a\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n        <i class=\"hoverbtn effect-1 sub-b\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n        <i class=\"hoverbtn effect-2 sub-a\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n        <i class=\"hoverbtn effect-2 sub-b\">Hover Over</i>\n    </div>-->\n</div>\n\n<!--\n<div class=\"row\">\n    <div class=\"block\">\n        <i class=\"hoverbtn effect-3 sub-a\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n        <i class=\"hoverbtn effect-3 sub-b\">Hover Over</i>\n    </div>\n    <div class=\"block\">\n\n        <i class=\"hoverbtn effect-4 sub-a\" style=\"margin-right:10px;\">Hover Over</i>\n    </div>\n    \n</div>-->\n</div>"

/***/ }),

/***/ "./client/app/group/partners/partners.component.scss":
/***/ (function(module, exports) {

module.exports = "body {\n  background: #292929;\n  padding-left: 30px; }\n\n.row {\n  float: left;\n  width: 100%; }\n\n.row .block {\n  float: left;\n  width: 25%;\n  height: 150px; }\n\n.hoverbtn {\n  display: inline-block;\n  font-size: 18px;\n  font-weight: 400;\n  line-height: 90px;\n  cursor: pointer;\n  margin: 20px;\n  width: 100%;\n  font-family: \"Roboto\";\n  height: 90px;\n  text-align: center;\n  position: relative;\n  text-decoration: none;\n  z-index: 1;\n  color: white; }\n\n.hoverbtn.small {\n  font-size: 20px;\n  line-height: 45px;\n  width: 100%;\n  height: 45px;\n  margin: 7px; }\n\n.hoverbtn.mini {\n  font-size: 15px;\n  line-height: 32px;\n  width: 100%;\n  height: 30px;\n  margin: 7px; }\n\n.hoverbtn.auto-width {\n  width: auto;\n  height: auto;\n  padding: 15px; }\n\n.hoverbtn:after {\n  pointer-events: none;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  content: '';\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box; }\n\n.hoverbtn:before {\n  speak: none;\n  font-size: 48px;\n  line-height: 90px;\n  font-style: normal;\n  font-weight: normal;\n  font-variant: normal;\n  text-transform: none;\n  display: block;\n  -webkit-font-smoothing: antialiased; }\n\n/* Effect 1 */\n\n.hoverbtn.effect-1 {\n  background: #3796ff;\n  -webkit-transition: background 0.2s, color 0.2s;\n  transition: background 0.2s, color 0.2s; }\n\n.hoverbtn.effect-1:after {\n  top: -7px;\n  left: -7px;\n  padding: 7px;\n  -webkit-box-shadow: 0 0 0 4px #000;\n          box-shadow: 0 0 0 4px #000;\n  -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: transform 0.2s, opacity 0.2s;\n  transition: transform 0.2s, opacity 0.2s, -webkit-transform 0.2s;\n  -webkit-transform: scale(0.8);\n          transform: scale(0.8);\n  opacity: 0; }\n\n/* Effect 1a */\n\n.hoverbtn.effect-1.sub-a:hover {\n  background: #ff6419;\n  color: #41ab6b; }\n\n.hoverbtn.effect-1.sub-aa:hover {\n  background: lightgray;\n  color: #41ab6b; }\n\n.hoverbtn.effect-1.sub-a:hover i {\n  color: #41ab6b; }\n\n.hoverbtn.effect-1.sub-aa:hover i {\n  color: #41ab6b; }\n\n.hoverbtn.effect-1.sub-a:hover:after {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  opacity: 1; }\n\n.hoverbtn.effect-1.sub-aa:hover:after {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  opacity: 1; }\n\n/* Effect 1b */\n\n.hoverbtn.effect-1.sub-b:hover {\n  background: white;\n  color: #41ab6b; }\n\n.hoverbtn.effect-1.sub-b:hover i {\n  color: #41ab6b; }\n\n.hoverbtn.effect-1.sub-b:after {\n  -webkit-transform: scale(1.2);\n          transform: scale(1.2); }\n\n.hoverbtn.effect-1.sub-b:hover:after {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  opacity: 1; }\n\n/* Effect 2 */\n\n.hoverbtn.effect-2 {\n  color: #eea303;\n  -webkit-box-shadow: 0 0 0 3px white;\n          box-shadow: 0 0 0 3px white;\n  -webkit-transition: color 0.3s;\n  transition: color 0.3s; }\n\n.hoverbtn.effect-2:after {\n  top: -2px;\n  left: -2px;\n  padding: 2px;\n  z-index: -1;\n  background: white;\n  -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: transform 0.2s, opacity 0.2s;\n  transition: transform 0.2s, opacity 0.2s, -webkit-transform 0.2s; }\n\n/* Effect 2a */\n\n.hoverbtn.effect-2.sub-a:hover, .hoverbtn.effect-2.sub-a:hover i {\n  color: #eea303; }\n\n.hoverbtn.effect-2.sub-a:hover:after {\n  -webkit-transform: scale(0.85);\n          transform: scale(0.85); }\n\n/* Effect 2b */\n\n.hoverbtn.effect-2.sub-b:hover:after {\n  -webkit-transform: scale(0);\n          transform: scale(0);\n  opacity: 0;\n  -webkit-transition: opacity 0.2s, -webkit-transform 0.4s;\n  transition: opacity 0.2s, -webkit-transform 0.4s;\n  transition: transform 0.4s, opacity 0.2s;\n  transition: transform 0.4s, opacity 0.2s, -webkit-transform 0.4s; }\n\n.hoverbtn.effect-2.sub-b:hover, .hoverbtn.effect-2.sub-b:hover i {\n  color: #fff; }\n\n/* Effect 3 */\n\n.hoverbtn.effect-3 {\n  -webkit-box-shadow: 0 0 0 4px white;\n          box-shadow: 0 0 0 4px white;\n  -webkit-transition: color 0.3s;\n  transition: color 0.3s; }\n\n.hoverbtn.effect-3:after {\n  top: -2px;\n  left: -2px;\n  padding: 2px;\n  z-index: -1;\n  background: white;\n  -webkit-transition: opacity 0.3s, -webkit-transform 0.2s;\n  transition: opacity 0.3s, -webkit-transform 0.2s;\n  transition: transform 0.2s, opacity 0.3s;\n  transition: transform 0.2s, opacity 0.3s, -webkit-transform 0.2s; }\n\n/* Effect 3a */\n\n.hoverbtn.effect-3.sub-a, .hoverbtn.effect-3.sub-a i {\n  color: #f06060; }\n\n.hoverbtn.effect-3.sub-a:hover, .hoverbtn.effect-3.sub-a:hover i {\n  color: #fff; }\n\n.hoverbtn.effect-3.sub-a:hover:after {\n  -webkit-transform: scale(1.3);\n          transform: scale(1.3);\n  opacity: 0; }\n\n/* Effect 3b */\n\n.hoverbtn.effect-3.sub-b, .hoverbtn.effect-3.sub-b i {\n  color: #fff; }\n\n.hoverbtn.effect-3.sub-b:hover, .hoverbtn.effect-3.sub-b:hover i {\n  color: #f06060; }\n\n.hoverbtn.effect-3.sub-b:after {\n  -webkit-transform: scale(1.3);\n          transform: scale(1.3);\n  opacity: 0; }\n\n.hoverbtn.effect-3.sub-b:hover:after {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  opacity: 1; }\n\n/* Effect 4 */\n\n.hoverbtn.effect-4 {\n  width: 92px;\n  height: 92px;\n  -webkit-box-shadow: 0 0 0 4px white;\n          box-shadow: 0 0 0 4px white; }\n\n.hoverbtn.effect-4.small {\n  width: 45px;\n  height: 45px; }\n\n.hoverbtn.effect-4.mini {\n  width: 30px;\n  height: 30px; }\n\n.hoverbtn.effect-4.sub-a {\n  -webkit-transition: -webkit-box-shadow 0.2s;\n  transition: -webkit-box-shadow 0.2s;\n  transition: box-shadow 0.2s;\n  transition: box-shadow 0.2s, -webkit-box-shadow 0.2s; }\n\n.hoverbtn.effect-4:before {\n  line-height: 92px; }\n\n.hoverbtn.effect-4:after {\n  top: -4px;\n  left: -4px;\n  padding-left: 30px;\n  margin-left: 30px;\n  z-index: 10;\n  border: 4px dashed #8B0000; }\n\n.hoverbtn.effect-4:hover {\n  -webkit-box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);\n          box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);\n  color: #fff; }\n\n.hoverbtn.effect-4:hover i {\n  color: #fff; }\n\n/* Effect 4b */\n\n.hoverbtn.effect-4.sub-b:hover {\n  -webkit-transition: -webkit-box-shadow 0.2s;\n  transition: -webkit-box-shadow 0.2s;\n  transition: box-shadow 0.2s;\n  transition: box-shadow 0.2s, -webkit-box-shadow 0.2s; }\n\n.hoverbtn.effect-4.sub-b:hover:after {\n  -webkit-animation: spinAround 9s linear infinite;\n          animation: spinAround 9s linear infinite; }\n\n@-webkit-keyframes spinAround {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n@keyframes spinAround {\n  from {\n    -webkit-transform: rotate(0deg);\n            transform: rotate(0deg); }\n  to {\n    -webkit-transform: rotate(360deg);\n            transform: rotate(360deg); } }\n\n/* Effect 5 */\n\n.hoverbtn.effect-5 {\n  -webkit-box-shadow: 0 0 0 4px white;\n          box-shadow: 0 0 0 4px white;\n  overflow: hidden;\n  -webkit-transition: background 0.3s, color 0.3s, -webkit-box-shadow 0.3s;\n  transition: background 0.3s, color 0.3s, -webkit-box-shadow 0.3s;\n  transition: background 0.3s, color 0.3s, box-shadow 0.3s;\n  transition: background 0.3s, color 0.3s, box-shadow 0.3s, -webkit-box-shadow 0.3s; }\n\n.hoverbtn.effect-5:after {\n  display: none; }\n\n.hoverbtn.effect-5:hover {\n  background: white;\n  color: #702fa8;\n  -webkit-box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.3);\n          box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.3); }\n\n.hoverbtn.effect-5:hover i {\n  color: #702fa8; }\n\n.hoverbtn.effect-5.sub-a:hover:before {\n  -webkit-animation: toRightFromLeft 0.3s forwards;\n          animation: toRightFromLeft 0.3s forwards; }\n\n@-webkit-keyframes toRightFromLeft {\n  49% {\n    -webkit-transform: translate(100%);\n            transform: translate(100%); }\n  50% {\n    opacity: 0;\n    -webkit-transform: translate(-100%);\n            transform: translate(-100%); }\n  51% {\n    opacity: 1; } }\n\n@keyframes toRightFromLeft {\n  49% {\n    -webkit-transform: translate(100%);\n            transform: translate(100%); }\n  50% {\n    opacity: 0;\n    -webkit-transform: translate(-100%);\n            transform: translate(-100%); }\n  51% {\n    opacity: 1; } }\n\n.hoverbtn.effect-5.sub-b:hover:before {\n  -webkit-animation: toLeftFromRight 0.3s forwards;\n          animation: toLeftFromRight 0.3s forwards; }\n\n@-webkit-keyframes toLeftFromRight {\n  49% {\n    -webkit-transform: translate(-100%);\n            transform: translate(-100%); }\n  50% {\n    opacity: 0;\n    -webkit-transform: translate(100%);\n            transform: translate(100%); }\n  51% {\n    opacity: 1; } }\n\n@keyframes toLeftFromRight {\n  49% {\n    -webkit-transform: translate(-100%);\n            transform: translate(-100%); }\n  50% {\n    opacity: 0;\n    -webkit-transform: translate(100%);\n            transform: translate(100%); }\n  51% {\n    opacity: 1; } }\n\n.hoverbtn.effect-5.sub-c:hover:before {\n  -webkit-animation: toTopFromBottom 0.3s forwards;\n          animation: toTopFromBottom 0.3s forwards; }\n\n@-webkit-keyframes toTopFromBottom {\n  49% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  50% {\n    opacity: 0;\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%); }\n  51% {\n    opacity: 1; } }\n\n@keyframes toTopFromBottom {\n  49% {\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  50% {\n    opacity: 0;\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%); }\n  51% {\n    opacity: 1; } }\n\n.hoverbtn.effect-5.sub-d:hover:before {\n  -webkit-animation: toBottomFromTop 0.3s forwards;\n          animation: toBottomFromTop 0.3s forwards; }\n\n@-webkit-keyframes toBottomFromTop {\n  49% {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%); }\n  50% {\n    opacity: 0;\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  51% {\n    opacity: 1; } }\n\n@keyframes toBottomFromTop {\n  49% {\n    -webkit-transform: translateY(100%);\n            transform: translateY(100%); }\n  50% {\n    opacity: 0;\n    -webkit-transform: translateY(-100%);\n            transform: translateY(-100%); }\n  51% {\n    opacity: 1; } }\n\n/* Effect 6 */\n\n.hoverbtn.effect-6 {\n  -webkit-box-shadow: 0 0 0 4px white;\n          box-shadow: 0 0 0 4px white;\n  -webkit-transition: background 0.2s, color 0.2s;\n  transition: background 0.2s, color 0.2s; }\n\n.hoverbtn.effect-6:hover {\n  background: white;\n  color: #64bb5d; }\n\n.hoverbtn.effect-6:hover i {\n  color: #64bb5d; }\n\n.hoverbtn.effect-6:hover:before {\n  -webkit-animation: spinAround 2s linear infinite;\n          animation: spinAround 2s linear infinite; }\n\n/* Effect 7 */\n\n.hoverbtn.effect-7 {\n  -webkit-box-shadow: 0 0 0 4px white;\n          box-shadow: 0 0 0 4px white;\n  -webkit-transition: background 0.2s, color 0.2s;\n  transition: background 0.2s, color 0.2s; }\n\n.hoverbtn.effect-7:hover, .hoverbtn.effect-7:hover i {\n  color: #fff; }\n\n.hoverbtn.effect-7:after {\n  top: -8px;\n  left: -8px;\n  padding: 8px;\n  z-index: -1;\n  opacity: 0; }\n\n/* Effect 7a */\n\n.hoverbtn.effect-7.sub-a:after {\n  -webkit-box-shadow: 0 0 0 white;\n          box-shadow: 0 0 0 white;\n  -webkit-transition: opacity 0.2s, -webkit-box-shadow 0.2s;\n  transition: opacity 0.2s, -webkit-box-shadow 0.2s;\n  transition: opacity 0.2s, box-shadow 0.2s;\n  transition: opacity 0.2s, box-shadow 0.2s, -webkit-box-shadow 0.2s; }\n\n.hoverbtn.effect-7.sub-a:hover:after {\n  opacity: 1;\n  -webkit-box-shadow: 3px 3px 0 white;\n          box-shadow: 3px 3px 0 white; }\n\n.hoverbtn.effect-7.sub-a:before {\n  -webkit-transform: scale(0.8);\n          transform: scale(0.8);\n  opacity: 0.7;\n  -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: transform 0.2s, opacity 0.2s;\n  transition: transform 0.2s, opacity 0.2s, -webkit-transform 0.2s; }\n\n.hoverbtn.effect-7.sub-a:hover:before {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  opacity: 1; }\n\n/* Effect 7b */\n\n.hoverbtn.effect-7.sub-b:after {\n  -webkit-box-shadow: 3px 3px white;\n          box-shadow: 3px 3px white;\n  -webkit-transform: rotate(-90deg);\n          transform: rotate(-90deg);\n  -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: opacity 0.2s, transform 0.2s;\n  transition: opacity 0.2s, transform 0.2s, -webkit-transform 0.2s; }\n\n.hoverbtn.effect-7.sub-b:hover:after {\n  opacity: 1;\n  -webkit-transform: rotate(0deg);\n          transform: rotate(0deg); }\n\n.hoverbtn.effect-7.sub-b:before {\n  -webkit-transform: scale(0.8);\n          transform: scale(0.8);\n  opacity: 0.7;\n  -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: transform 0.2s, opacity 0.2s;\n  transition: transform 0.2s, opacity 0.2s, -webkit-transform 0.2s; }\n\n.hoverbtn.effect-7.sub-b:hover:before {\n  -webkit-transform: scale(1);\n          transform: scale(1);\n  opacity: 1; }\n\n/* Effect 8 */\n\n.hoverbtn.effect-8 {\n  background: rgba(255, 255, 255, 0.1);\n  -webkit-transition: background 0.2s, -webkit-transform ease-out 0.1s;\n  transition: background 0.2s, -webkit-transform ease-out 0.1s;\n  transition: transform ease-out 0.1s, background 0.2s;\n  transition: transform ease-out 0.1s, background 0.2s, -webkit-transform ease-out 0.1s; }\n\n.hoverbtn.effect-8:after {\n  top: 0;\n  left: 0;\n  padding: 0;\n  z-index: -1;\n  -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);\n          box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1);\n  opacity: 0;\n  -webkit-transform: scale(0.9);\n          transform: scale(0.9); }\n\n.hoverbtn.effect-8:hover {\n  background: rgba(255, 255, 255, 0.05);\n  -webkit-transform: scale(0.93);\n          transform: scale(0.93);\n  color: #fff; }\n\n.hoverbtn.effect-8:hover i {\n  color: #fff; }\n\n.hoverbtn.effect-8:hover:after {\n  -webkit-animation: sonarEffect 1.3s ease-out 75ms;\n          animation: sonarEffect 1.3s ease-out 75ms; }\n\n@-webkit-keyframes sonarEffect {\n  0% {\n    opacity: 0.3; }\n  40% {\n    opacity: 0.5;\n    -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 10px 10px #3851bc, 0 0 0 10px rgba(255, 255, 255, 0.5);\n            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 10px 10px #3851bc, 0 0 0 10px rgba(255, 255, 255, 0.5); }\n  100% {\n    -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 10px 10px #3851bc, 0 0 0 10px rgba(255, 255, 255, 0.5);\n            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 10px 10px #3851bc, 0 0 0 10px rgba(255, 255, 255, 0.5);\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n    opacity: 0; } }\n\n@keyframes sonarEffect {\n  0% {\n    opacity: 0.3; }\n  40% {\n    opacity: 0.5;\n    -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 10px 10px #3851bc, 0 0 0 10px rgba(255, 255, 255, 0.5);\n            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 10px 10px #3851bc, 0 0 0 10px rgba(255, 255, 255, 0.5); }\n  100% {\n    -webkit-box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 10px 10px #3851bc, 0 0 0 10px rgba(255, 255, 255, 0.5);\n            box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.1), 0 0 10px 10px #3851bc, 0 0 0 10px rgba(255, 255, 255, 0.5);\n    -webkit-transform: scale(1.5);\n            transform: scale(1.5);\n    opacity: 0; } }\n\n/* Effect 9 */\n\n.hoverbtn.effect-9 {\n  -webkit-transition: -webkit-box-shadow 0.2s;\n  transition: -webkit-box-shadow 0.2s;\n  transition: box-shadow 0.2s;\n  transition: box-shadow 0.2s, -webkit-box-shadow 0.2s; }\n\n.hoverbtn.effect-9:after {\n  top: 0;\n  left: 0;\n  padding: 0;\n  -webkit-box-shadow: 0 0 0 3px white;\n          box-shadow: 0 0 0 3px white;\n  -webkit-transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: opacity 0.2s, -webkit-transform 0.2s;\n  transition: transform 0.2s, opacity 0.2s;\n  transition: transform 0.2s, opacity 0.2s, -webkit-transform 0.2s; }\n\n/* Effect 9a */\n\n.hoverbtn.effect-9.sub-a:hover:after {\n  -webkit-transform: scale(0.85);\n          transform: scale(0.85);\n  opacity: 0.5; }\n\n.hoverbtn.effect-9.sub-a:hover {\n  -webkit-box-shadow: 0 0 0 10px white;\n          box-shadow: 0 0 0 10px white;\n  color: white; }\n\n.hoverbtn.effect-9.sub-a:hover i {\n  color: white; }\n\n/* Effect 9b */\n\n.hoverbtn.effect-9.sub-b:hover:after {\n  -webkit-transform: scale(0.85);\n          transform: scale(0.85); }\n\n.hoverbtn.effect-9.sub-b:hover {\n  -webkit-box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.4);\n          box-shadow: 0 0 0 10px rgba(255, 255, 255, 0.4);\n  color: white; }\n\n.hoverbtn.effect-9.sub-b:hover i {\n  color: white; }\n\n.quoteImage {\n  border-radius: 20px;\n  background: rgba(255, 255, 255, 0.1); }\n"

/***/ }),

/***/ "./client/app/group/partners/partners.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartnersComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PartnersComponent = /** @class */ (function () {
    function PartnersComponent() {
    }
    PartnersComponent.prototype.ngOnInit = function () { };
    PartnersComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-partners',
            template: __webpack_require__("./client/app/group/partners/partners.component.html"),
            styles: [__webpack_require__("./client/app/group/partners/partners.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PartnersComponent);
    return PartnersComponent;
}());



/***/ }),

/***/ "./client/app/group/terms-and-conditions/terms-and-conditions.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  terms-and-conditions works!\n</p>\n"

/***/ }),

/***/ "./client/app/group/terms-and-conditions/terms-and-conditions.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/group/terms-and-conditions/terms-and-conditions.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TermsAndConditionsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var TermsAndConditionsComponent = /** @class */ (function () {
    function TermsAndConditionsComponent() {
    }
    TermsAndConditionsComponent.prototype.ngOnInit = function () { };
    TermsAndConditionsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-terms-and-conditions',
            template: __webpack_require__("./client/app/group/terms-and-conditions/terms-and-conditions.component.html"),
            styles: [__webpack_require__("./client/app/group/terms-and-conditions/terms-and-conditions.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], TermsAndConditionsComponent);
    return TermsAndConditionsComponent;
}());



/***/ }),

/***/ "./client/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-md-12\">\n    <nav class=\"navbar navbar-expand navbar-dark bg-primary\">\n\n      <a routerLink=\"/\" class=\"nav-item nav-link navbar-brand\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact:true}\"> \n        <img src=\"assets/images/reficon1.png\" class=\"img-fluid img-responsive img_reposition\" alt=\"Rent A Ref\">\n      </a>\n      <button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbarSupportedContent\" aria-controls=\"navbarSupportedContent\" aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n        <span class=\"navbar-toggler-icon\"></span>\n      </button>\n      <div class=\"collapse navbar-collapse\" id=\"navbarSupportedContent\">\n        <ul class=\"navbar-nav mr-auto\">\n          <li class=\"nav-item\">\n            <a routerLink=\"/\" class=\"nav-item nav-link\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact:true}\">\n              Home\n            </a>      \n          </li>\n          <li class=\"nav-item\">\n            <a routerLink=\"/how-it-works\" class=\"nav-item nav-link\" routerLinkActive=\"active\">\n              How It Works\n            </a>   \n          </li>\n          <li class=\"nav-item\">\n            <a [routerLink]=\"['/organizer', auth.currentUser.id ]\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn\"\n            [routerLinkActiveOptions]=\"{exact: true}\">\n              <span *ngIf=\"auth.currentUser.can_organize == 'active'\">Organize</span>\n            </a>    \n          </li>\n          <li class=\"nav-item\">\n            <a [routerLink]=\"['/account', auth.currentUser.id, 'schedule' ]\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn\"\n              [routerLinkActiveOptions]=\"{exact: true}\">\n                <span *ngIf=\"auth.currentUser.can_referee == 'active'\">Schedule</span>\n              </a> \n          </li>\n          <li class=\"nav-item\">\n            <a [routerLink]=\"['/account/profile', auth.currentUser.id]\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn\"\n              [routerLinkActiveOptions]=\"{exact: true}\">\n                Profile\n              </a>  \n          </li>\n          <li class=\"nav-item\">\n            <a [routerLink]=\"['/account', auth.currentUser.id]\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn\"\n              [routerLinkActiveOptions]=\"{exact: true}\">\n                Account ({{auth.currentUser.email}})\n              </a> \n          </li>\n          <li class=\"nav-item\">\n            <a [routerLink]=\"['/account/admin', auth.currentUser.id]\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn && auth.isAdmin\"\n              [routerLinkActiveOptions]=\"{exact: true}\">\n              Admin\n            </a>\n          </li>\n          <li class=\"nav-item\">\n            <a routerLink=\"/logout\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn\">\n              Logout\n            </a>\n          </li>   \n          <li class=\"nav-item\">\n            <a routerLink=\"/login\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"!auth.loggedIn\">\n              Login\n            </a>\n          </li> \n          <li class=\"nav-item\">\n            <a routerLink=\"/register\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"!auth.loggedIn\">\n              Register\n            </a> \n          </li>  \n        </ul>\n      </div>\n    </nav>    \n  </div>\n</div>"

/***/ }),

/***/ "./client/app/header/header.component.scss":
/***/ (function(module, exports) {

module.exports = ".img_reposition {\n  margin-top: -20px;\n  padding-top: -20px; }\n"

/***/ }),

/***/ "./client/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = /** @class */ (function () {
    // This featureSelected would be use in the app.component.html
    function HeaderComponent(auth) {
        this.auth = auth;
        this.featureSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    HeaderComponent.prototype.ngOnInit = function () {
        // Check if session valid
        if (!this.auth.loggedIn) {
            this.auth.logout();
        }
    };
    HeaderComponent.prototype.onSelect = function (feature) {
        this.featureSelected.emit(feature);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], HeaderComponent.prototype, "featureSelected", void 0);
    HeaderComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-header',
            template: __webpack_require__("./client/app/header/header.component.html"),
            styles: [__webpack_require__("./client/app/header/header.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./client/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<!--Carousel start-->\n<!--<div class=\"card\">-->\n<div class=\"bg-faded\" style=\"opacity: .98;filter: alpha(opacity=98); background: #fff\">\n  <div class=\"row\">\n    <div class=\"col-xs-12\">\n      <div id=\"header-carousel\" data-ride=\"carousel\">\n        <!-- Carousel Slides / Quotes -->\n        <div class=\"carousel-inner carousel-inner-header\">\n\n          <!-- Quote 1 -->\n          <div class=\"carousel-item active\" style=\"position: relative\">\n\n            <span style=\"text-align: left;\"> <img class=\"img-fluid img-responsive\" src=\"./assets/carousel/carousel.png\" style=\"width: 80%;height:100px;\"></span>\n            <h1 class=\"title-widget\">LARGEST NETWORK OF QUALIFIED REFEREES AND UMPIRES</h1>\n            <div class=\"row\">\n              <div class=\"col-sm-12 form-group\">\n                <label for=\"name\" class=\"text-white font-weight-bold bg-primary text-white\">The future of modern sports management is now. Rent-A-Ref offers a unique platform to organizers and officials.</label>\n              </div>\n            </div>\n\n          </div>\n          <!-- Quote 2 -->\n          <div class=\"carousel-item\">\n            <span style=\"text-align: center\"><img class=\"img-fluid img-responsive\" src=\"./assets/carousel/carousel.gif\" style=\"width: 60%;\"></span>\n\n            <h1 class=\"title-widget\"><span style=\"color: darkmagenta\">Resources and commitment</span></h1>\n\n            <div class=\"row\">\n              <div class=\"col-sm-12 form-group\">\n                <label for=\"name\" class=\"text-white font-weight-bold bg-primary text-white\">We are committed to helping you find the right tool to organize your events and the right officials suited for the purpose</label>\n              </div>\n            </div>\n          </div>\n          <!-- Quote 3 -->\n          <div class=\"carousel-item\">\n            <span style=\"text-align: center\">\n                                                <img class=\"img-fluid img-responsive\" src=\"./assets/images/hockey-blue-background.jpg\" style=\"width: 70%;\"></span>\n\n            <h1 class=\"title-widget\"><span style=\"color: darkblue;-moz-text-size-adjust: 26px;size: 26px\">Find a Referee or an Umpire with Just a Few Clicks</span></h1>\n\n            <div class=\"row\">\n              <div class=\"col-sm-12 form-group\">\n                <label for=\"name\" class=\"text-white font-weight-bold bg-primary text-white\" style=\"color: darkblue;-moz-text-size-adjust: 20px;size: 20px\">Each Referee is vetted to make sure they match the skill level of Your Game.</label>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n  <!--</div>-->\n  <!-- Carousel end-->\n  <div class=\"bg-faded\">\n    <div class=\"row\">\n      <div class=\"col-xs-12\">\n        <div class=\"row\">\n          <div class=\"col-sm-2 bg-faded\">\n            <span style=\"text-align: left\"><img src=\"assets/images/umpire.jpg\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=70% max-width=100%></span>\n            <p> <a routerLink=\"/referee\" class=\"nav-item nav-link\" routerLinkActive=\"active\"><button class=\"btn btn-primary btn-responsive\" type=\"button\">Request a Referee</button></a></p>\n          </div>\n\n          <div class=\"col-sm-8 text-justify\">\n            <h1 class=\"title-widget\">Are you looking for some officials (Soccer referees, umpires etc...) for your event?</h1>\n            <hr>\n            <label for=\"refereeNeeded\">Rent-A-Ref offers centralized platform where you can find officials who are:</label>\n            <!--Start-->\n            <hr>\n\n            <div class=\"card-deck\">\n              <div class=\"card\">\n                <div class=\"card-block\">\n                  <h4 class=\"title-widget title-widget-text\">Certified</h4>\n                  <p class=\"card-text\"><span style=\"text-align: center;display: block; margin: auto;\"><img src=\"assets/images/certified.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=80% max-width=100%></span></p>\n                </div>\n              </div>\n              <div class=\"card\">\n                <div class=\"card-block\">\n                  <h4 class=\"title-widget title-widget-text\">Reliable</h4>\n                  <p class=\"card-text\"><span style=\"text-align: center;display: block; margin: auto;\"><img src=\"assets/images/reliable.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=80% max-width=100%></span></p>\n                </div>\n              </div>\n              <div class=\"card\">\n                <div class=\"card-block\">\n                  <h4 class=\"title-widget title-widget-text\">Affordable</h4>\n                  <p class=\"card-text\"><span style=\"text-align: center;display: block; margin: auto;\"><img src=\"assets/images/savemoney.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=80% max-width=100%></span></p>\n                </div>\n              </div>\n            </div>\n\n            <!--End-->\n          </div>\n\n          <div class=\"col-sm-2 bg-faded\">\n            <span style=\"text-align: right\"><img src=\"assets/images/red_ref.jpg\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=70% max-width=100% align=\"right\"> </span>\n            <p> <a routerLink=\"/register\" class=\"nav-item nav-link\" routerLinkActive=\"active\"><button class=\"btn btn-primary btn-responsive\" type=\"button\">Join us as a Referee</button></a></p>\n          </div>\n        </div>\n\n        <!--Start-->\n\n        <hr>\n        <div class=\"row\">\n          <div class=\"col-lg-12 text-xs-center\">\n            <h1 class=\"content-header elegantshd bigFont\">Find Games Near You</h1>\n\n            <div class=\"card-deck\">\n              <div class=\"card\">\n                <div class=\"card-block\" style=\"padding-top: 20px;line-height: 70%;\">\n\n                  <p><span style=\"text-align: center;display: block; margin: auto;font-size:22px;font-weight: bolder;line-height: 1.5;\"><strong>Are you currently a Referee?</strong> Have you thought about becoming a Referee? Then you've come to the right place!</span></p>\n                  <p><img src=\"assets/images/field.jpg\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=80% max-width=100%></p>\n                  <p class=\"card-text\"><span style=\"text-align: center;display: block; margin: auto;font-size:22px;color: red;font-weight: bolder;line-height: 1.5;\"><strong>Rent-A-Ref</strong> partners with leagues, teams and sports enthusiasts to provide a consistent schedule of games.</span></p>\n                </div>\n              </div>\n              <div class=\"card\">\n                <div class=\"card-block\">\n                  <div class=\"row\">\n                    <div class=\"col-3 col-sm-3\">\n                      <img src=\"assets/images/globe.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=80% max-width=100%>\n                    </div>\n                    <div class=\"col-8 col-sm-8\" style=\"padding-top: 20px;line-height: 70%;\">\n                      <h1>Convenient Locations!</h1><br> Get notified when games are near you.\n                    </div>\n                  </div>\n\n                  <div class=\"row\">\n                    <div class=\"col-3 col-sm-3\">\n                      <img src=\"assets/images/calendar.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=80% max-width=100%>\n                    </div>\n                    <div class=\"col-8 col-sm-8\" style=\"padding-top: 20px;line-height: 70%;\">\n                      <h1>Consistent Schedule!</h1><br> More games = Consistent Schedule.\n                    </div>\n                  </div>\n\n                  <div class=\"row\">\n                    <div class=\"col-3 col-sm-3\">\n                      <img src=\"assets/images/cup.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=80% max-width=100%>\n                    </div>\n                    <div class=\"col-8 col-sm-8\" style=\"padding-top: 20px;line-height: 70%;\">\n                      <h1>Work with City Leagues!</h1><br> Referees can Officiate for City Leagues.\n                    </div>\n                  </div>\n\n                </div>\n              </div>\n\n            </div>\n          </div>\n        </div>\n        <!--End-->\n        <!--Start-->\n        <hr>\n        <div class=\"row\">\n          <div class=\"col-lg-12 text-xs-center\">\n            <h1 class=\"content-header elegantshd bigFont\">Multi-Sport platform</h1>\n\n            <div class=\"form-group\">\n              <div class=\"col-md-3\"><label class=\"btn btn-primary\"><img src=\"assets/images/Running.png\" alt=\"...\" class=\"img-thumbnail img-check\"><input type=\"checkbox\" name=\"chk1\" id=\"item4\" value=\"val1\" class=\"hidden\" autocomplete=\"off\"></label></div>\n              <div class=\"col-md-3\"><label class=\"btn btn-primary\"><img src=\"assets/images/Basketball.png\" alt=\"...\" class=\"img-thumbnail img-check\"><input type=\"checkbox\" name=\"chk2\" id=\"item4\" value=\"val2\" class=\"hidden\" autocomplete=\"off\"></label></div>\n              <div class=\"col-md-3\"><label class=\"btn btn-primary\"><img src=\"assets/images/football.png\" alt=\"...\" class=\"img-thumbnail img-check\"><input type=\"checkbox\" name=\"chk3\" id=\"item4\" value=\"val3\" class=\"hidden\" autocomplete=\"off\"></label></div>\n              <div class=\"col-md-3\"><label class=\"btn btn-primary\"><img src=\"assets/images/Soccer.png\" alt=\"...\" class=\"img-thumbnail img-check\"><input type=\"checkbox\" name=\"chk4\" id=\"item4\" value=\"val4\" class=\"hidden\" autocomplete=\"off\"></label></div>\n            </div>\n          </div>\n        </div>\n\n        <!--End-->\n        <!--Start News-->\n        <hr>\n        <h4 class=\"elegantshd bigFont\">Statistics</h4>\n        <div class='row' style=\"padding: 10px; margin: 10px\">\n          <div class='col-md-offset-2 col-md-12'>\n            <div class=\"col-sm-12\">\n              <div class=\"main-wrapper\">\n                <div class=\"card card-block bg-inverse frameHeight\">\n                  <h4>Games in progress / Request</h4>\n                  <div class=\"col-sm-8\">\n                    <app-barchart *ngIf=\"chartData\" [data]=\"chartData\"></app-barchart>\n                  </div>\n                  <div class=\"col-sm-4 text-white\">\n                    <span>\n                      <ul>\n                          <li>0 --> Games request</li>\n                          <li>1 --> Games currently assigned</li>\n                          <li>2 --> Games in progress</li>\n                          <li>3 --> Referees Available</li>\n                          <li>4 --> Interest from Organizers and Referees</li>\n                        </ul>\n                    </span>\n                  </div>\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        <hr>\n\n        <h4 class=\"elegantshd bigFont\">In the News</h4>\n        <div class='row' style=\"padding: 10px; margin: 10px\">\n          <div class='col-md-offset-2 col-md-12'>\n            <div class=\"carousel slide\" data-ride=\"carousel\" id=\"news-carousel\">\n              <!-- Bottom Carousel Indicators -->\n              <ol class=\"carousel-indicators\">\n                <li data-target=\"#news-carousel\" data-slide-to=\"0\" class=\"active\"></li>\n                <li data-target=\"#news-carousel\" data-slide-to=\"1\"></li>\n                <!--<li data-target=\"#news-carousel\" data-slide-to=\"2\"></li>-->\n\n              </ol>\n\n              <!-- Carousel Slides / news -->\n              <div class=\"carousel-inner\">\n\n                <!-- news 1 -->\n                <div class=\"carousel-item active\">\n                  <blockquote>\n                    <div class=\"row\">\n                      <div class=\"col-sm-12 text-center\">\n                        <img class=\"img-responsive\" src=\"/assets/images/pay.png\" style=\"width: 10%\"><img class=\"img-responsive\" src=\"/assets/images/st-logo-smaller.gif\" style=\"width: 10%\">\n                        <p><img class=\"img-responsive\" src=\"/assets/images/st-header.png\"></p>\n\n                      </div>\n                      <div class=\"col-sm-12 \">\n                        <h6><strong>Rent-A-Ref </strong>is a platform that connects leagues, teams, coaches and sports enthusiasts with referees for their sports events.\n                                                                                        We believe that everyone deserves\n                                                                                        a fair game, & strongly believe that\n                                                                                        Referees available through the Rent-A-Ref\n                                                                                        platform will provide you a piece\n                                                                                        of mind. Request, pay, sit back,\n                                                                                        and let Rent-A-Ref take care of the\n                                                                                        Referees for your sports event.\n                                                                                        </h6><a href=\"https://www.sporttechie.com/sporttechie-startup-profile-series-rent-ref/\" target=\"_blank\"><button class=\"btn btn-responsive btn-danger\">Read More...</button></a>\n\n                      </div>\n                    </div>\n                  </blockquote>\n                </div>\n                <!-- news 2 -->\n\n                <div class=\"carousel-item\" style=\"padding: 10px; margin: 10px\">\n                  <blockquote>\n                    <div class=\"row\">\n                      <div class=\"col-sm-12 text-center\">\n                        <img class=\"img-responsive\" src=\"/assets/images/pymnts.png\" style=\"width: 20%\">\n                        <p><img class=\"img-responsive\" src=\"/assets/images/py-header.png\"></p>\n\n                      </div>\n                      <div class=\"col-sm-12 \">\n                        <h6>Since founding, the business has worked with\n                                                                                        more than 15 leagues on a consistent\n                                                                                        and daily basis, as well as worked\n                                                                                        to fill refs for more than 100 tournaments\n                                                                                        that were each “one-offs.” Radchuk\n                                                                                        said the database of referees includes\n                                                                                        more than 500, which is not only\n                                                                                        growing but helpful to compete against\n                                                                                        referee associations: “They’re basically\n                                                                                        armies of referees that concentrate\n                                                                                        on one single sport rather than many,\n                                                                                        which we offer.”\n                                                                                </h6><a href=\"http://www.pymnts.com/uber-of-x/2016/uber-of-x-rent-a-ref-sports-officials-for-any-game-or-tournament/\" target=\"_blank\"><button class=\"btn btn-responsive btn-danger\">Read More...</button></a>\n\n                      </div>\n                    </div>\n                  </blockquote>\n                </div>\n                <!--end news 2-->\n                <!-- news 3 -->\n              </div>\n\n              <!-- Carousel Buttons Next/Prev -->\n\n              <a data-slide=\"prev\" href=\"#news-carousel\" class=\"carousel-control-prev\"><i class=\"fa fa-chevron-left\"></i></a>\n              <a data-slide=\"next\" href=\"#news-carousel\" class=\"carousel-control-next\"><i class=\"fa fa-chevron-right\"></i></a>\n            </div>\n          </div>\n        </div>\n\n        <!--End news-->\n        <!--Start Quotes-->\n        <hr>\n        <h4 class=\"elegantshd bigFont\">What's Being Said</h4>\n        <div class='row'>\n          <div class='col-md-offset-2 col-md-12'>\n            <div class=\"carousel slide\" data-ride=\"carousel\" id=\"quote-carousel\">\n              <!-- Bottom Carousel Indicators -->\n              <ol class=\"carousel-indicators\">\n                <li data-target=\"#quote-carousel\" data-slide-to=\"0\" class=\"active\"></li>\n                <li data-target=\"#quote-carousel\" data-slide-to=\"1\"></li>\n                <li data-target=\"#quote-carousel\" data-slide-to=\"2\"></li>\n                <li data-target=\"#quote-carousel\" data-slide-to=\"3\"></li>\n              </ol>\n\n              <!-- Carousel Slides / Quotes -->\n              <div class=\"carousel-inner\">\n\n                <!-- Quote 1 -->\n                <div class=\"carousel-item active\">\n                  <blockquote>\n                    <div class=\"row\">\n                      <div class=\"col-sm-3 text-center\">\n                        <img class=\"img-circle quotePic\" src=\"/assets/images/quote2.jpg\" style=\"width: 100px;height:100px;\">\n                        <!--<img class=\"img-circle\" src=\"https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg\" style=\"width: 100px;height:100px;\">-->\n                      </div>\n                      <div class=\"col-sm-9 \">\n                        <h6 class=\"quoteFont\">We are proud to have Rent-A-Ref as\n                                                                                                the exclusive officiating\n                                                                                                provider for all of the Wooter\n                                                                                                leagues. Great Service, Great\n                                                                                                Price, Great Refs. Thank\n                                                                                                you!\n                                                                                        </h6>\n                        <div class=\"quoteAuthor text-center\"> <span style=\"color: #FFF;font-size:24px;font-weight:bolder\"><cite>- David -</cite></span>\n                          <br>\n                          <span style=\"color: blue;font-size:16px;font-weight:bolder\"><a src=\"https://wooter.co/\">COO, Wooter</a></span>\n                        </div>\n                      </div>\n                    </div>\n                  </blockquote>\n                </div>\n                <!-- Quote 2 -->\n                <div class=\"carousel-item\">\n                  <blockquote>\n                    <div class=\"row\">\n                      <div class=\"col-sm-3 text-center\">\n                        <img class=\"img-circle quotePic\" src=\"/assets/images/quote1.jpg\" style=\"width: 100px;height:100px;\">\n                        <!--<img class=\"img-circle\" src=\"https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg\" style=\"width: 100px;height:100px;\">-->\n                      </div>\n                      <div class=\"col-sm-9 \">\n                        <h6 class=\"quoteFont\">Rent-A-Ref allows me to do what I\n                                                                                                love when I want to. Not\n                                                                                                only am I notified when there\n                                                                                                are games near by, but they\n                                                                                                also take care of the payment\n                                                                                                and deposit it into my bank\n                                                                                                account, so I don't have\n                                                                                                to ask each team to pay.</h6>\n                        <div class=\"quoteAuthor text-center\"> <span style=\"color: #FFF;font-size:24px;font-weight:bolder\">- Carlon -</span>\n                          <br>\n                          <span style=\"color: blue;font-size:16px;font-weight:bolder\">Sports Official</span>\n                        </div>\n                      </div>\n                    </div>\n                  </blockquote>\n                </div>\n                <!-- Quote 3 -->\n                <div class=\"carousel-item\">\n                  <blockquote>\n                    <div class=\"row\">\n                      <div class=\"col-sm-3 text-center\">\n                        <img class=\"img-circle quotePic\" src=\"/assets/images/quote.jpg\" style=\"width: 100px;height:100px;\">\n                        <!--<img class=\"img-circle\" src=\"https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg\" style=\"width: 100px;height:100px;\">-->\n                      </div>\n                      <div class=\"col-sm-9 \">\n                        <h6 class=\"quoteFont\">LASportsNet partnered with Rent-A-Ref\n                                                                                                to begin scheduling our expanding\n                                                                                                soccer and basketball programs.\n                                                                                                With a vast network of experienced\n                                                                                                and trained referees, we've\n                                                                                                been able to keep up with\n                                                                                                the growth of our leagues\n                                                                                                thanks to Rent-A-Ref.</h6>\n                        <div class=\"quoteAuthor text-center\"> <span style=\"color: #FFF;font-size:24px;font-weight:bolder\">- Anthony -</span>\n                          <br>\n                          <span style=\"color: blue;font-size:16px;font-weight:bolder\"><a src=\"https://lasportsnet.com/\" >CMO, LASportsNet</a></span>\n                        </div>\n                      </div>\n                    </div>\n                  </blockquote>\n                </div>\n                <!-- Quote 4 -->\n                <div class=\"carousel-item\">\n                  <blockquote>\n                    <div class=\"row\">\n                      <div class=\"col-sm-3 text-center\">\n                        <img class=\"img-circle quotePic\" src=\"/assets/images/ndoung.jpeg\" style=\"width: 100px;height:100px;\">\n                        <!--<img class=\"img-circle\" src=\"https://s3.amazonaws.com/uifaces/faces/twitter/kolage/128.jpg\" style=\"width: 100px;height:100px;\">-->\n                      </div>\n                      <div class=\"col-sm-9 \">\n                        <h6>As a soccer referee, we need a platform\n                                                                                                that is easily manageable\n                                                                                                and user-friendly. Rent-A-Ref\n                                                                                                offers us the right tools\n                                                                                                so we can focus on officiating\n                                                                                                and stay on top of ever changing\n                                                                                                schedule. </h6>\n                        <div class=\"quoteAuthor text-center\"> <span style=\"color: #FFF;font-size:24px;font-weight:bolder\">- Ndoung -</span>\n                          <br>\n                          <span style=\"color: blue;font-size:16px;font-weight:bolder\"><a src=\"http://www.hasmandesign.com\">Fullstack Engineer, Solera</a></span>\n                        </div>\n                      </div>\n                    </div>\n                  </blockquote>\n                </div>\n\n\n              </div>\n\n              <!-- Carousel Buttons Next/Prev -->\n\n              <a data-slide=\"prev\" href=\"#quote-carousel\" class=\"carousel-control-prev\"><i class=\"fa fa-chevron-left\"></i></a>\n              <a data-slide=\"next\" href=\"#quote-carousel\" class=\"carousel-control-next\"><i class=\"fa fa-chevron-right\"></i></a>\n\n            </div>\n          </div>\n        </div>\n        <!--End quotes-->\n\n      </div>\n    </div>\n  </div>\n"

/***/ }),

/***/ "./client/app/home/home.component.scss":
/***/ (function(module, exports) {

module.exports = "@media (max-width: 768px) {\n  .btn-responsive {\n    padding: 2px 4px;\n    font-size: 90%;\n    line-height: 1;\n    border-radius: 3px; } }\n\n@media (min-width: 769px) and (max-width: 992px) {\n  .btn-responsive {\n    padding: 4px 9px;\n    font-size: 90%;\n    line-height: 1.2; } }\n\n.frameHeight {\n  height: 250px; }\n\n.main-wrapper {\n  padding: 20px; }\n\n.wrapper {\n  width: 60%;\n  margin: 60px auto; }\n\na,\nabbr,\nacronym,\naddress,\napplet,\nbig,\nblockquote,\nbody,\ncaption,\ncite,\ncode,\ndd,\ndel,\ndfn,\ndiv,\ndl,\ndt,\nem,\nfieldset,\nfont,\nform,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nhtml,\niframe,\nimg,\nins,\nkbd,\nlabel,\nlegend,\nli,\nobject,\nol,\np,\npre,\nq,\ns,\nsamp,\nsmall,\nspan,\nstrike,\nstrong,\nsub,\nsup,\ntable,\ntbody,\ntd,\ntfoot,\nth,\nthead,\ntr,\ntt,\nul,\nvar {\n  font-family: \"Arial\", Helvetica, sans-serif;\n  margin: 0;\n  padding: 0; }\n\nbody {\n  background: url(\"/assets/images/refereebg.jpg\") 0 0 repeat-x;\n  color: #5c5c5c; }\n\n.wrapper {\n  background: white;\n  width: 1000px;\n  margin: 0 auto;\n  padding: 0;\n  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.75);\n  box-shadow: 0 0 15px rgba(0, 0, 0, 0.75); }\n\n/* FONT STYLES */\n\na {\n  color: black;\n  text-decoration: underline; }\n\na:active,\na:hover {\n  color: #faa21b; }\n\na.white {\n  color: #ffffff;\n  text-decoration: underline; }\n\na.white:hover {\n  color: #faa21b; }\n\nh1, h1 em {\n  color: #111;\n  font: bold 25px/27px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em; }\n\nh1 em {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: uppercase;\n  margin-bottom: 15px; }\n\n#products h1 {\n  padding: 0 0 10px; }\n\nh2 {\n  font: normal 12px/16px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  color: #111;\n  margin-bottom: 15px; }\n\nh3 {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  margin-bottom: 15px; }\n\nh3 em {\n  color: #111;\n  font: bold 25px/27px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em; }\n\nh4 {\n  font: normal 12px/16px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  color: #111;\n  padding: 10px;\n  -moz-border-radius-topright: 7px;\n  -khtml-border-radius-topright: 7px;\n  -webkit-border-top-right-radius: 7px;\n  -moz-border-radius-topleft: 7px;\n  -khtml-border-radius-topleft: 7px;\n  -webkit-border-top-left-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\nh5 {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  margin-bottom: 10px; }\n\nh7 {\n  font: bold 12px/16px \"Arial\", Helvetica, sans-serif; }\n\nh6 a {\n  color: #f3980d;\n  text-decoration: none; }\n\nh6 a:hover {\n  color: #f3980d;\n  text-decoration: underline; }\n\np {\n  font-size: 12px;\n  line-height: 16px;\n  margin-bottom: 15px; }\n\nem {\n  font-style: normal;\n  font-weight: bold; }\n\nh6, h8 {\n  color: #111;\n  font-weight: normal;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em;\n  text-align: justify; }\n\nh6 {\n  font-size: 26px; }\n\nh8 {\n  margin: 0;\n  padding-top: 5px;\n  font-size: 17px; }\n\n/* HEADER ELEMENTS */\n\n#header1 {\n  height: 5px;\n  position: relative;\n  z-index: 3; }\n\n#header1 .wrapper {\n  background: #313131 url(\"/assets/images/rar.png\") bottom right no-repeat;\n  height: 155px;\n  position: relative;\n  z-index: 3; }\n\n#header1 h3 {\n  color: #999999; }\n\n#header1 a {\n  color: #CC6600;\n  cursor: hand; }\n\n#header1 a:hover {\n  color: red;\n  cursor: pointer; }\n\n#header1 #logo {\n  float: left;\n  width: 325px;\n  height: 155px; }\n\n#header1 #logo a {\n  display: block;\n  width: 262px;\n  height: 131px;\n  margin: 12px 0 0 30px;\n  background: url(\"/assets/images/rar.png\") 0 0 no-repeat;\n  color: white;\n  line-height: 2.5em;\n  font-size: 4.0em;\n  text-indent: -9999px; }\n\n#header1 #topnav1 {\n  float: right;\n  height: 28px;\n  width: 675px;\n  padding: 2px 0 0; }\n\n#header1 #topnav1 ul#flags {\n  float: left;\n  list-style-type: none;\n  padding-right: 2px; }\n\n#header1 #topnav1 ul#flags li {\n  float: left;\n  width: 16px;\n  height: 11px;\n  list-style-type: none;\n  font-size: 11px;\n  line-height: 12px;\n  text-indent: -9999px;\n  margin-right: 3px; }\n\n#header1 #topnav1 ul#flags li a {\n  color: #faa21b;\n  padding: 0;\n  float: left;\n  width: 16px;\n  height: 11px; }\n\n#header1 #topnav1 ul#menu-top-navigation {\n  float: right;\n  list-style-type: none;\n  padding-right: 2px;\n  vertical-align: top; }\n\n#header1 #topnav1 ul#menu-top-navigation li {\n  float: left;\n  list-style-type: none;\n  font-size: 11px;\n  line-height: 12px; }\n\n#header1 #topnav1 ul#menu-top-navigation li a {\n  padding: 0 6px;\n  border-right: 1px solid #838383; }\n\n#header1 #topnav1 ul#menu-top-navigation li:last-child a {\n  border-right: 0; }\n\n#header1 #search {\n  float: left;\n  padding-top: 50px; }\n\n#header1 #search input {\n  float: left;\n  font: normal 12px/20px \"Arial\", Helvetica, sans-serif;\n  border: 1px solid #838383;\n  background: #313131;\n  margin: 0 8px 0 0;\n  padding: 10px;\n  height: 20px;\n  width: 250px;\n  color: #999999; }\n\n#header1 #search input:focus {\n  color: white; }\n\n#header1 #liveChat {\n  float: right;\n  width: 240px;\n  padding-top: 25px; }\n\n#liveChat h3 em {\n  color: white; }\n\n#liveChat p {\n  font-size: 11px; }\n\n#liveChat a {\n  color: #FAA21B;\n  cursor: pointer; }\n\n#header1 #liveChat {\n  float: right;\n  width: 240px;\n  padding-top: 25px; }\n\n#tabs #liveChat {\n  width: 544px;\n  background-color: #1f1f1f;\n  float: left;\n  padding: 10px;\n  height: 85px; }\n\n#content #tabs #enquireBtn {\n  float: left;\n  width: 144px;\n  background-color: #1f1f1f;\n  padding: 31px 0;\n  height: 43px; }\n\n/* MAIN NAVIGATION */\n\n#mainNav {\n  width: 100%;\n  height: 55px;\n  background: #faa21b;\n  position: relative;\n  z-index: 3; }\n\n#mainNav ul li {\n  /*float: left;*/\n  height: 55px;\n  font: bold 20px/52px \"Arial\", Helvetica, sans-serif;\n  list-style-type: none;\n  display: table-cell; }\n\n#mainNav ul li a {\n  color: #111;\n  text-decoration: none;\n  height: 55px;\n  padding-left: 15px;\n  padding-right: 15px;\n  letter-spacing: -0.04em;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fcbe60, #faa21b);\n  border-right: 1px solid #c88620;\n  border-left: 1px solid #fccf88;\n  display: block; }\n\n#mainNav ul li a span.navdown,\n#mainNav ul li a span.navselected {\n  background: url(\"/assets/images/rar.png\") no-repeat scroll right center transparent;\n  display: block; }\n\n#mainNav ul li a:hover,\n#mainNav ul li a.mainNav_selected {\n  background: #1f1f1f;\n  color: #ffffff;\n  border-right: 1px solid #1f1f1f;\n  border-left: 1px solid #1f1f1f; }\n\n#mainNav ul li a:hover span {\n  background: url(\"/assets/images/rar.png\") no-repeat scroll right center transparent; }\n\n#mainNav ul li a.mainNav_selected {\n  background: url(\"/assets/images/rar.png\") #1f1f1f no-repeat scroll right center transparent; }\n\n/* CONTENT COLUMNS */\n\n#content {\n  width: 100%; }\n\n#content .wrapper {\n  padding: 0;\n  width: 980px; }\n\n#content .one-column {\n  float: left;\n  width: 980px; }\n\n#content .full-column-first {\n  padding-bottom: 0;\n  margin-bottom: 0;\n  vertical-align: top;\n  width: 100%;\n  background: white;\n  position: relative;\n  clear: both;\n  height: 100%; }\n\n#content .full {\n  padding: 0;\n  margin: 0;\n  vertical-align: top;\n  width: 980px;\n  background: white;\n  clear: both;\n  height: 100%; }\n\n#content .two-column-first {\n  padding-bottom: 0;\n  margin-bottom: 0;\n  vertical-align: top;\n  width: 730px;\n  position: relative;\n  clear: both; }\n\n#content .featured {\n  margin-top: 0;\n  padding-top: 20px 12px 0 12px;\n  font: italic 11px/16px \"Arial\", Helvetica, sans-serif; }\n\n#content .featured1 {\n  margin-top: 0;\n  padding-top: 90px;\n  font: normal 11px/16px \"Arial\", Helvetica, sans-serif; }\n\n#content .featured_hotel {\n  margin-top: 0;\n  padding-top: 9px;\n  font: normal 13px/16px \"Arial\", Helvetica, sans-serif; }\n\n#content .box1 {\n  border: 1px solid #bbb;\n  float: left;\n  margin-bottom: 10px; }\n\n#content .two-column-wide, #content .two-column-second,\n#content .three-column-first, #content .three-column-second,\n#content .three-column-third {\n  display: inline-block;\n  width: 708px;\n  *display: inline;\n  *zoom: 1; }\n\n#content .two-column-second {\n  vertical-align: top;\n  width: 300px; }\n\n#content .three-column-first {\n  margin-right: 10px;\n  vertical-align: top;\n  width: 240px; }\n\n#content .three-column-second {\n  vertical-align: top;\n  width: 480px; }\n\n#content .three-column-third {\n  width: 240px; }\n\n/* BOX ELEMENTS */\n\n.box,\n.box2,\n.box3,\n.box4,\n.box5 {\n  border: 1px solid #bbb;\n  margin-top: 0;\n  padding-top: 30px;\n  float: left;\n  background: white;\n  clear: both; }\n\n.box {\n  margin-bottom: 10px;\n  width: 750px;\n  text-indent: 50px; }\n\n.box2 {\n  margin-bottom: 10px;\n  width: 200px;\n  text-indent: 5px; }\n\n.box3,\n.box4,\n.box5 {\n  margin: 0 5px 5px;\n  padding-top: 60px; }\n\n.box3 {\n  width: 960px;\n  text-indent: 10px;\n  display: inline-block; }\n\n.box4 {\n  width: 750px;\n  text-indent: 50px; }\n\n.box5 {\n  padding-top: 6px;\n  width: 960px;\n  text-indent: 10px;\n  display: inline-block; }\n\n.three-column-box,\n.two-column-box {\n  border: 1px solid #bbb;\n  padding: 10px;\n  float: left;\n  margin-bottom: 10px;\n  width: 708px; }\n\n.three-column-box {\n  width: 455px; }\n\n.newsbox ul,\n.tab-content ul,\n.two-column-box ul {\n  margin: 0;\n  list-style-type: disc;\n  list-style-position: inside;\n  color: #cccccc; }\n\n.newsbox ul li,\n.tab-content ul li,\n.two-column-box ul li {\n  color: #5c5c5c;\n  font-size: 12px;\n  line-height: 16px; }\n\n.newsbox img,\n.two-column-box img {\n  padding-left: 8px;\n  padding-right: 8px; }\n\n#content .three-column-first .box,\n#content .three-column-third .box,\n#content .two-column-second .box {\n  width: 218px; }\n\n.noMargin {\n  margin: 0; }\n\n/* listings */\n\n.staffBlog {\n  width: 338px; }\n\n.nomadNews {\n  width: 338px;\n  float: right; }\n\n.listing ul {\n  list-style-type: none; }\n\n.listing ul li {\n  list-style-type: none;\n  float: left;\n  margin-bottom: 15px; }\n\n.listing ul li:last-child {\n  margin-bottom: 0; }\n\n.listing .image {\n  float: left;\n  width: 90px; }\n\n.listing .details {\n  float: right;\n  width: 245px; }\n\n.listing p {\n  margin-bottom: 6px;\n  font: normal 11px/16px \"Arial\", Helvetica, sans-serif; }\n\np.posted {\n  font-style: normal;\n  font-size: 11px; }\n\np.posted em {\n  color: black;\n  font-style: normal;\n  font-weight: normal; }\n\n.details h6 {\n  margin-bottom: 6px; }\n\np.price {\n  color: black;\n  font-style: normal;\n  font-size: 11px; }\n\n.listing .details p.posted,\n.listing .details p.price {\n  margin-bottom: 6px; }\n\n.details p.more span {\n  float: right;\n  font-weight: bold;\n  padding-right: 8px; }\n\n#content .three-column-second .listing .details {\n  float: right;\n  width: 368px; }\n\n/* featured items (carousel) */\n\n.featured .image img {\n  margin-bottom: 10px; }\n\n.featured p {\n  margin-bottom: 6px;\n  font: italic 11px/16px \"Arial\", Helvetica, sans-serif; }\n\n.featured .short_description {\n  margin-bottom: 6px;\n  font: italic 11px/16px \"Arial\", Helvetica, sans-serif;\n  overflow: hidden;\n  height: 50px; }\n\n/* product listings*/\n\n#content .three-column-second .listing li.product .image {\n  width: 236px; }\n\n#content .three-column-second .listing li.product .details {\n  float: right;\n  width: 222px; }\n\n#content .three-column-second .listing li.product .details p {\n  margin-bottom: 6px;\n  font: italic 11px/16px \"Arial\", Helvetica, sans-serif; }\n\n#content .three-column-second .listing li.product .details p.more,\n#content .three-column-second .listing li.product .details p.price {\n  font-style: normal; }\n\n/* PHOTOCOMP  */\n\n.photoComp {\n  background: #eee; }\n\n.photoComp ul {\n  list-style-type: none;\n  float: left;\n  margin-bottom: 10px; }\n\n.photoComp ul li {\n  list-style-type: none;\n  float: left;\n  margin: 0 1.5px 3px; }\n\n.photoComp ul li img {\n  float: left; }\n\n/* NEWSLETTERS */\n\n#newsletter .listing.box {\n  float: none;\n  padding: 0; }\n\n#newsletter .listing.box h1 {\n  padding: 10px; }\n\n#newsletter .listing.box h1 em {\n  margin-bottom: 0; }\n\n#newsletter .listing .details {\n  background: none repeat scroll 0 0 #F5F5F5;\n  float: none;\n  margin: 0;\n  width: auto; }\n\n#newsletter .listing .details h6,\n#newsletter .listing .details p {\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n#newsletter .listing .details h6 {\n  margin-bottom: 0;\n  padding: 15px 10px;\n  width: 85%; }\n\n/* CAR HIRE */\n\ndl#cars dt {\n  width: 250px;\n  float: left;\n  clear: both; }\n\ndl#cars dd {\n  width: 400px;\n  float: right;\n  padding-bottom: 20px; }\n\ndl#cars dd p {\n  margin-bottom: 10px; }\n\ndl#cars dd p span {\n  padding: 0 4px;\n  color: #5c5c5c; }\n\ndl#cars dt a {\n  width: 240px;\n  height: 150px;\n  float: left; }\n\ndl#cars table,\ntable.thin-border {\n  width: 97%;\n  font-size: 11px;\n  margin: 0 0 10px;\n  border: 1px solid #ddd;\n  border-right: 0;\n  border-bottom: 0;\n  border-spacing: 0;\n  border-collapse: collapse; }\n\ndl#cars table td,\ntable.thin-border td {\n  text-align: left;\n  padding: 5px;\n  border: 1px solid #ddd;\n  border-left: 0;\n  border-top: 0; }\n\n/* QUICKLINKS BUTTONS */\n\n#quickLinks {\n  margin-bottom: 0; }\n\n#quickLinks img {\n  margin-bottom: 6px; }\n\n/* PAGINATION margin-bottom: 15px;;*/\n\n.pagination {\n  clear: both;\n  background: black;\n  height: 25px;\n  padding: 5px 10px 0;\n  text-align: right;\n  display: block; }\n\n.pagination ul {\n  list-style-type: none;\n  float: left;\n  width: 100%;\n  text-align: center;\n  margin: 0; }\n\n.pagination ul li {\n  list-style-type: none;\n  font-size: 14px;\n  margin: 0;\n  display: inline;\n  text-align: center; }\n\n.pagination ul li a {\n  color: white;\n  text-decoration: none;\n  font-weight: bold;\n  display: inline; }\n\n.pagination ul li a:hover {\n  color: #faa21b; }\n\n.pagination ul li.index a {\n  padding: 2px; }\n\n.pagination ul li.index a.selected {\n  color: #faa21b; }\n\n.pagination ul li.start {\n  display: none; }\n\n.pagination ul li.previous {\n  float: left;\n  margin-top: 2px; }\n\n.pagination ul li.previous a {\n  padding-left: 15px; }\n\n.pagination ul li.next {\n  float: right;\n  margin-top: 2px; }\n\n.pagination ul li.end {\n  display: none; }\n\n.pagination ul li.next a {\n  padding-right: 15px; }\n\n/* BUTTONS & LINKS */\n\n#content input.btn,\n#facebox input.btn,\na.btn {\n  font-size: 11px;\n  color: white;\n  padding: 10px 15px;\n  margin: 0;\n  width: auto;\n  cursor: pointer;\n  float: right;\n  -moz-border-radius: 5px;\n  -khtml-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  background: black;\n  text-decoration: none;\n  border: 0;\n  outline: none;\n  margin-top: 3px; }\n\n#content input.btn:hover,\n#facebox input.btn:hover,\na.btn:hover {\n  background: #faa21b;\n  color: white; }\n\n#header1 #search input.largeBtn,\na.largeBtn {\n  font-size: 16px;\n  color: black;\n  outline: none;\n  width: auto;\n  cursor: pointer;\n  padding: 10px 15px;\n  height: 42px;\n  -moz-border-radius: 7px;\n  -khtml-border-radius: 7px;\n  -webkit-border-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\n#header1 #search input.largeBtn:hover,\na.largeBtn:hover {\n  background: -moz-linear-gradient(#faa21b, #fccc83); }\n\na.arrow {\n  padding-left: 12px; }\n\n.moreLink {\n  float: right;\n  padding-top: 5px; }\n\n.moreLink a.btn {\n  float: left; }\n\np.more {\n  color: black;\n  font-style: normal;\n  font-size: 11px;\n  margin: 0; }\n\np.moredetails {\n  color: black;\n  font-style: normal;\n  font-size: 11px;\n  margin: 0;\n  bottom: 0;\n  width: 100%;\n  vertical-align: bottom;\n  position: absolute; }\n\n.details p.moredetails span {\n  float: right;\n  font-weight: bold;\n  padding-right: 8px; }\n\n.infiniteCarousel .container1 ul li .details {\n  display: block;\n  height: 130px;\n  position: relative; }\n\n/* LISTS */\n\nul.arrows {\n  padding: 0 0 15px 10px;\n  list-style-type: none;\n  list-style-position: inside;\n  list-style-type: none; }\n\nul.arrows li {\n  font-size: 12px;\n  text-transform: none; }\n\nul.arrows li a {\n  display: block;\n  font-weight: normal;\n  border-bottom: 0;\n  text-decoration: underline;\n  padding: 3px 12px; }\n\nul.bullets {\n  padding: 0;\n  margin: 0 25px 15px; }\n\nul.bullets li {\n  font-size: 12px;\n  margin: 0 0 6px; }\n\n/* FORM ELEMENTS */\n\n.rdpwidget input, .rdpwidget select {\n  background: white;\n  border: 1px solid #bbb;\n  padding: 8px;\n  color: #5c5c5c;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  margin: 0 0 5px;\n  width: 91%; }\n\n.rdpwidget select {\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  width: 99%; }\n\n.rdpwidget form a {\n  font-size: 11px; }\n\ndiv.form-container {\n  float: left; }\n\n.rdpform .formfield-container {\n  float: left; }\n\n.rdpform .formfield-container label {\n  font-size: 12px;\n  float: left;\n  font-weight: bold;\n  padding-top: 9px;\n  width: 350px; }\n\n.rdpform .formfield-container label.error {\n  float: left;\n  padding-left: 5px;\n  width: 150px; }\n\n.rdpform .formfield-container input,\n.rdpform .formfield-container select,\n.rdpform .formfield-container textarea {\n  float: left;\n  background: white;\n  border: 1px solid #bbb;\n  padding: 8px;\n  color: #5c5c5c;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  margin: 0 0 5px;\n  width: 282px; }\n\n.rdpform .formfield-container select {\n  width: 300px; }\n\n.rdpform .formfield-container .checkbox {\n  margin-top: 5px;\n  width: 10px; }\n\n/* FEATURED CAROUSEL */\n\n.infiniteCarousel {\n  width: 708px;\n  height: 285px;\n  position: relative;\n  float: right; }\n\n.infiniteCarousel .container {\n  width: 708px;\n  height: 285px;\n  overflow: auto;\n  position: absolute;\n  top: 0; }\n\n.infiniteCarousel .container1 ul {\n  width: 9999px;\n  height: 285px;\n  list-style-image: none;\n  list-style-position: outside;\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  top: 0; }\n\n.infiniteCarousel .container1 ul li {\n  display: block;\n  float: left;\n  height: 285px;\n  width: 226px;\n  padding: 0 10px 0 0;\n  margin: 0;\n  background: none; }\n\n.infiniteCarousel .arrow {\n  display: block;\n  height: 28px;\n  width: 28px;\n  background: url(\"/assets/images/rar.png\") 0 0 no-repeat;\n  text-indent: -9999px;\n  position: absolute;\n  top: 42%;\n  cursor: pointer;\n  padding: 0; }\n\n.infiniteCarousel .forward {\n  background-position: -28px 0;\n  right: -14px; }\n\n.infiniteCarousel .back {\n  background-position: 0 0;\n  left: -14px; }\n\n.infiniteCarousel .forward:hover {\n  background-position: -28px -28px; }\n\n.infiniteCarousel .back:hover {\n  background-position: 0 -28px; }\n\n/* ACCORDION */\n\n.navigatorwidget {\n  list-style-type: none;\n  float: left;\n  position: relative;\n  width: 218px;\n  height: auto;\n  margin-bottom: 5px; }\n\n.navigatorwidget li {\n  list-style-type: none;\n  color: black;\n  text-transform: uppercase; }\n\n.navigatorwidget li {\n  font-size: 12px; }\n\n.navigatorwidget li a {\n  display: block;\n  padding: 3px;\n  text-decoration: none; }\n\n.navigatorwidget li a:link,\n.navigatorwidget li a:visited {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget li a.open {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget ul.news-navigator li a:link,\n.navigatorwidget ul.news-navigator li a:visited,\n.navigatorwidget ul.post-navigator li a:link,\n.navigatorwidget ul.post-navigator li a:visited {\n  background: none; }\n\n.navigatorwidget li a.open {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget li ul {\n  overflow: hidden;\n  display: none;\n  padding: 0 0 10px 20px; }\n\n.navigatorwidget li ul li {\n  font-size: 12px;\n  text-transform: none; }\n\n.navigatorwidget li a:visited ul li a,\n.navigatorwidget li li a:link,\n.navigatorwidget li li a:visited,\n.navigatorwidget li ul li a {\n  font-weight: normal;\n  border-bottom: 0;\n  text-decoration: underline;\n  padding: 3px 12px;\n  color: black; }\n\n.navigatorwidget li a:visited ul li a:hover,\n.navigatorwidget li ul li a:hover {\n  text-decoration: underline;\n  color: #faa21b; }\n\n* html .navigatorwidget {\n  height: 30em; }\n\n* html .navigatorwidget a,\n* html .navigatorwidget li {\n  height: 1%; }\n\n.productnavigator.navigatorwidget ul {\n  overflow: hidden;\n  padding: 0 0 10px 20px; }\n\n.productnavigator.navigatorwidget li {\n  text-transform: none; }\n\n.navigatorwidget li a:visited,\n.productnavigator.navigatorwidget li a:link {\n  border-bottom: 0 none;\n  color: black;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.productnavigator.navigatorwidget li a.selected {\n  color: #F3980D; }\n\n.productnavigator.navigatorwidget li a:hover {\n  color: #faa21b; }\n\n.ui-tabs {\n  padding: 0;\n  zoom: 1;\n  margin-bottom: 15px; }\n\n.ui-tabs .ui-tabs-nav {\n  height: 39px;\n  width: 710px;\n  float: left;\n  margin: 0;\n  padding: 1px 10px 0;\n  list-style: none;\n  position: relative;\n  -moz-border-radius-topright: 7px;\n  -khtml-border-radius-topright: 7px;\n  -webkit-border-top-right-radius: 7px;\n  -moz-border-radius-topleft: 7px;\n  -khtml-border-radius-topleft: 7px;\n  -webkit-border-top-left-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\n.ui-tabs .ui-tabs-nav li {\n  position: relative;\n  float: left;\n  border-bottom-width: 0 !important;\n  padding: 0;\n  font-size: 14px;\n  font-weight: bold;\n  margin-right: 15px; }\n\n.ui-tabs .ui-tabs-nav li a {\n  float: left;\n  height: 39px;\n  line-height: 39px;\n  text-decoration: none;\n  padding: 0 15px;\n  color: black;\n  text-decoration: none;\n  outline: none; }\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-selected {\n  background: white;\n  border: 1px solid #faa21b;\n  border-bottom: 0;\n  height: 38px;\n  line-height: 37px;\n  -moz-border-radius-topright: 5px;\n  -khtml-border-radius-topright: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -khtml-border-radius-topleft: 5px;\n  -webkit-border-top-left-radius: 5px; }\n\n.ui-tabs .ui-tabs-nav li.ui-state-disabled a,\n.ui-tabs .ui-tabs-nav li.ui-state-processing a,\n.ui-tabs .ui-tabs-nav li.ui-tabs-selected a {\n  height: 38px;\n  line-height: 37px;\n  background: white;\n  cursor: text;\n  -moz-border-radius-topright: 5px;\n  -khtml-border-radius-topright: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -khtml-border-radius-topleft: 5px;\n  -webkit-border-top-left-radius: 5px; }\n\n.ui-tabs .ui-tabs-nav li a,\n.ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a {\n  cursor: pointer; }\n\n.ui-tabs .ui-tabs-panel {\n  display: block;\n  border-width: 0;\n  background: none;\n  margin-bottom: 15px; }\n\n.ui-tabs .ui-tabs-hide {\n  display: none !important; }\n\n.ui-tabs .ui-tabs-panel .tab-content {\n  margin-bottom: 15px;\n  clear: both;\n  border: 1px solid #bbb;\n  border-top: 0;\n  padding: 10px;\n  float: left;\n  width: 708px; }\n\n.tab-content .image img {\n  border: 1px solid #bbb; }\n\n.tab-content .image {\n  float: left;\n  width: 375px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.tab-content .details {\n  float: left;\n  width: 100%;\n  padding-top: 10px; }\n\n.tab-content .detailstop {\n  float: left;\n  padding-top: 10px;\n  width: 300px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.tab-content .details p span {\n  font-style: italic; }\n\n/* tabs tables */\n\n.tab-content table {\n  font-size: 12px;\n  width: 100%;\n  border: 0;\n  border-spacing: 0;\n  border-collapse: collapse; }\n\n.tab-content table th {\n  text-align: left;\n  font-weight: normal;\n  color: black;\n  text-transform: uppercase;\n  padding: 8px; }\n\n.tab-content table td {\n  text-align: left;\n  padding: 8px; }\n\n.tab-content table td em.available {\n  color: #7db730; }\n\n.tab-content table tr:nth-child(odd) td {\n  background: #f1f1f1; }\n\n/* FOOTER */\n\n#deck {\n  width: 100%;\n  clear: both;\n  z-index: -1; }\n\n#deck .wrapper {\n  clear: both;\n  border-bottom: 3px solid #111;\n  background: #4d4d4d;\n  background: -moz-linear-gradient(#575757, #3a3a3a); }\n\n#deck h4 {\n  background: none;\n  padding: 0;\n  color: #999999;\n  font: 12px/14px \"Arial\",Helvetica,sans-serif;\n  margin-bottom: 15px;\n  text-transform: uppercase; }\n\n#deck .three-column-first,\n#deck .three-column-second,\n#deck .three-column-third {\n  display: inline-block;\n  vertical-align: top;\n  width: 278px;\n  padding: 20px 20px 10px;\n  height: 180px;\n  *display: inline;\n  *zoom: 1; }\n\n#deck .three-column-third {\n  width: 285px; }\n\n#deck p {\n  color: white;\n  font-size: 11px; }\n\n#deck p span, #deck a.arrow {\n  display: block; }\n\n#deck a {\n  color: white; }\n\n#deck a:hover {\n  color: #faa21b; }\n\n#deck .column {\n  float: left;\n  width: 50%; }\n\n#deck ul {\n  list-style-type: none;\n  margin-bottom: 15px;\n  float: left;\n  width: 100%; }\n\n#deck ul li {\n  font-size: 11px;\n  margin-bottom: 6px;\n  float: left;\n  width: 100%; }\n\n#deck ul li a {\n  color: white;\n  padding-left: 12px; }\n\n.clearfix {\n  clear: both;\n  width: 100%;\n  height: 0;\n  font-size: 0;\n  line-height: 0; }\n\n/* FOOTER-LINKS-LOGOS */\n\n#footer {\n  width: 100%;\n  clear: both;\n  float: left;\n  height: 200px; }\n\n#footer .wrapper {\n  background: transparent;\n  padding: 25px 0;\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n\n#footer p {\n  font-size: 11px; }\n\n#footer p img {\n  margin: 0 25px; }\n\n/* FACEBOX POPUP */\n\n#facebox {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 100;\n  text-align: left; }\n\n#facebox .popup {\n  position: relative; }\n\n#facebox .content {\n  display: table;\n  width: 500px;\n  padding: 15px;\n  background: #eee; }\n\n#facebox .close {\n  position: absolute;\n  top: -8px;\n  right: -8px; }\n\n#facebox .loading {\n  text-align: center; }\n\n#facebox .image {\n  text-align: center; }\n\n#facebox img {\n  border: 0;\n  margin: 0; }\n\n#facebox_overlay {\n  position: fixed;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%; }\n\n.facebox_hide {\n  z-index: -100; }\n\n.facebox_overlayBG {\n  background: black;\n  z-index: 99; }\n\n#facebox .gallery {\n  width: 400px;\n  background: white; }\n\n#facebox .gallery .content {\n  background: white; }\n\n#facebox .contain {\n  padding: 15px; }\n\n/* FORM STYLES */\n\n#facebox form {\n  font-size: 12px;\n  font-weight: bold;\n  color: #666;\n  margin-bottom: 33px; }\n\n#facebox form div {\n  padding: 10px 0;\n  clear: both; }\n\n#facebox form label {\n  width: 200px;\n  float: left;\n  font-weight: bold;\n  padding-top: 9px; }\n\n#facebox form .capcha,\n#facebox form input,\n#facebox form select,\n#facebox form textarea {\n  float: left;\n  border: 1px solid #ccc;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  background: white;\n  margin: 0;\n  padding: 8px;\n  width: 250px;\n  color: #111; }\n\n#facebox form input.date {\n  width: 200px; }\n\n#facebox form .capcha {\n  width: 160px; }\n\n#facebox form div.dates {\n  float: none; }\n\n#facebox form div.dates input {\n  width: 85px; }\n\n#facebox form div.checkbox,\n#facebox form div.radio {\n  padding: 10px 0; }\n\n#facebox form div.checkbox input,\n#facebox form div.radio input {\n  width: auto;\n  padding: 0;\n  border: 0;\n  margin-right: 5px; }\n\n#facebox input.btn {\n  margin-bottom: 15px; }\n\n#facebox .content .featured {\n  padding: 0 0 0 12px; }\n\n#facebox .content .postitem {\n  padding: 10px; }\n\n#facebox .content .postitemcell {\n  padding: 0 0 0 10px; }\n\n.error {\n  font-size: 8pt;\n  color: #ff0000;\n  padding: 1px;\n  margin-bottom: 5px; }\n\n#ProductHeader {\n  display: block;\n  clear: both; }\n\n#productHeaderImages {\n  width: 735px;\n  float: left; }\n\n#productHeaderInfo {\n  background: #1f1f1f;\n  width: 265px;\n  height: 484px;\n  float: left;\n  display: block;\n  position: relative; }\n\n#productHeaderInfo .content {\n  padding: 15px 10px 10px; }\n\n#productHeaderInfo h1 {\n  font-family: arial;\n  forn-weight: bold;\n  color: #ffffff;\n  font-size: 20px;\n  margin-bottom: 5px;\n  line-height: 1;\n  overflow: hidden;\n  width: 243px; }\n\n.productHeaderDisplay {\n  color: #5c5c5c;\n  font-size: 12px; }\n\n#productHeaderInfo h4 {\n  padding: 0;\n  margin: 0;\n  font: 12px/16px \"Arial\",Helvetica,sans-serif;\n  background: transparent;\n  color: #5c5c5c; }\n\ndl.margins {\n  font-weight: bold;\n  width: 250px;\n  overflow: hidden; }\n\n.margins dt,\n.largmargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 12px;\n  padding: 2px 5px 2px 0;\n  clear: left; }\n\n.margins dd,\n.largmargins dd {\n  padding-left: 5px;\n  float: left;\n  font-size: 12px;\n  color: #ffffff;\n  padding: 2px 0;\n  clear: right; }\n\ndl.largmargins {\n  margin-bottom: 2px;\n  padding: 5px 0 8px;\n  font-weight: bold;\n  width: 250px;\n  overflow: hidden; }\n\ndl.smallmargins {\n  width: 250px;\n  overflow: hidden;\n  font-weight: bold; }\n\n.smallmargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 11px;\n  padding: 3px 2px 1px 0;\n  font-weight: bold;\n  clear: left; }\n\n.smallmargins dd {\n  padding-left: 5px;\n  font-size: 11px;\n  color: #ffffff;\n  padding: 3px 0 1px;\n  font-weight: bold;\n  clear: right; }\n\ndl.nomargins {\n  padding: 0 6px 0 0;\n  width: 250px;\n  font-weight: bold; }\n\ndl.nomargins.toppadding {\n  padding: 10px 6px 0 0; }\n\n.nomargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 11px;\n  padding: 0 6px 0 0;\n  font-weight: bold;\n  clear: left; }\n\n.nomargins dd {\n  padding-left: 5px;\n  font-size: 11px;\n  color: #ffffff;\n  padding: 0;\n  font-weight: bold;\n  clear: right; }\n\n.newsbox {\n  border: 1px solid #BBBBBB;\n  margin-bottom: 10px;\n  padding: 10px;\n  width: 956px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.newsbox a,\n.two-column-box a,\n.three-column-box a,\n#productHeaderInfo a {\n  color: black;\n  text-decoration: underline;\n  font: 11px/16px \"Arial\",Helvetica,sans-serif; }\n\n.newsbox a:hover,\n.two-column-box a:hover {\n  color: #F3980D; }\n\n#productHeaderInfo a {\n  color: #5c5c5c; }\n\n#productHeaderInfo a:hover {\n  color: #fAA21B; }\n\n#content a#enquireBtn,\n#facebox a#enquireBtn,\n#productHeaderInfo a#enquireBtn,\n.enquireBtn,\ndiv#enquireBtn a.enquire-link {\n  position: absolute;\n  right: 10px;\n  bottom: 8px;\n  font-size: 16px;\n  color: black;\n  outline: none;\n  width: auto;\n  cursor: pointer;\n  text-decoration: none;\n  padding: 10px 25px;\n  -moz-border-radius: 7px;\n  -khtml-border-radius: 7px;\n  -webkit-border-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\n#content a#enquireBtn,\n.enquireBtn,\ndiv#enquireBtn a.enquire-link {\n  position: relative;\n  float: right; }\n\n#content a#enquireBtn:hover,\n#facebox a#enquireBtn:hover,\n#productHeaderInfo a#enquireBtn:hover,\n.enquireBtn {\n  background: -moz-linear-gradient(#faa21b, #fccc83); }\n\n.newsbox .img {\n  padding-right: 15px; }\n\n.clearpadding {\n  margin-left: -5px; }\n\n.hidden {\n  display: none; }\n\n.two-column-box h6 a {\n  font: bold 12px/16px \"Arial\", Helvetica, sans-serif;\n  color: #f3980d;\n  text-decoration: none; }\n\n.two-column-box h6 a:hover {\n  color: #f3980d;\n  text-decoration: underline; }\n\n.tooltip {\n  display: none;\n  background: url(\"/assets/images/rar.png\");\n  height: 163px;\n  padding: 40px 30px 10px;\n  width: 310px;\n  font-size: 11px;\n  color: #fff; }\n\n/* a .label element inside tooltip */\n\n.tooltip .label {\n  color: yellow;\n  width: 35px; }\n\n.tooltip a {\n  color: #ad4;\n  font-size: 11px;\n  font-weight: bold; }\n\n#footer-left-container-left {\n  float: left;\n  width: 78px; }\n\n#footer-left-container-right {\n  float: left;\n  font-size: 9px;\n  width: 900px; }\n\n#menu-footer-left {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n\n#menu-footer-left li {\n  display: block;\n  padding: 0 6px;\n  border-right: 1px solid #5c5c5c;\n  float: left; }\n\n#menu-footer-left li.lastitem {\n  border-right: 0; }\n\n#menu-footer-left li a {\n  color: black;\n  text-decoration: underline;\n  font-size: 11px;\n  line-height: 16px; }\n\n.navcontent {\n  background: #1f1f1f;\n  z-index: 5;\n  position: absolute;\n  display: none; }\n\n#header1Image {\n  z-index: 1;\n  position: relative; }\n\n#navcontentContainer {\n  width: 1000px;\n  position: absolute;\n  z-index: 10; }\n\n#navcontentContainer h1 em {\n  color: #999999; }\n\n#navcontentContainer h1 a {\n  color: #fff; }\n\n#navcontent1 {\n  width: 1000px;\n  height: 481px; }\n\n#navcontent2 {\n  width: 350px;\n  height: 481px;\n  position: absolute;\n  right: 0; }\n\n/*.sliderContent{clear:both;}*/\n\n.navcontentbox1,\n.navcontentbox2,\n.navcontentbox3 {\n  height: 450px;\n  width: 190px;\n  float: left;\n  padding: 15px;\n  border-right: 1px solid #4c4c4c; }\n\n.navcontentbox2 {\n  width: 140px;\n  display: none; }\n\n.navcontentbox3 {\n  width: 295px;\n  display: none; }\n\n.navcontentbox4,\n.navcontentbox5 {\n  height: 450px;\n  width: 225px;\n  float: left;\n  padding: 22px;\n  display: none; }\n\n.navcontentbox5 {\n  padding: 15px;\n  display: block; }\n\n.tours-country li,\n.tours-duration li,\n.tours-year li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 10px;\n  padding-left: 10px; }\n\n.tours-country li a,\n.tours-country li a:visited,\n.tours-country li a:visited,\n.tours-duration li a,\n.tours-year li a,\n.tours-year li a:visited {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-country li a:hover,\n.tours-duration li a:hover,\n.tours-year li a:hover {\n  color: #FAA21b;\n  text-decoration: underline; }\n\n.navcontentbox2 ul li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 10px;\n  padding-left: 10px; }\n\n.navcontentbox2 ul li a {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.durationwidget ul li a {\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.navcontentbox2 ul li a:hover {\n  color: #FAA21b; }\n\n#duration-navigator ul li a {\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n#menu-charter-tours li,\n.tours-list li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 5px; }\n\n#menu-charter-tours li a,\n#menu-charter-tours li a:visited,\n.tours-list li a,\n.tours-list li a:visited {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n#menu-charter-tours li a:hover,\n.tours-list li a:hover {\n  color: #FAA21b;\n  text-decoration: underline; }\n\np.wprice {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal;\n  margin-bottom: 0; }\n\np.wmore {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal;\n  margin: 0; }\n\n.wdetails {\n  color: #ffffff;\n  height: 255px;\n  overflow: hidden; }\n\n.wdetails a {\n  color: #F3980D;\n  text-decoration: underline; }\n\np.wactivity {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal; }\n\n#content ul.breadcrumb {\n  clear: both;\n  color: #5c5c5c;\n  font-size: 12px;\n  list-style: none;\n  padding-bottom: 5px; }\n\n#content ul.breadcrumb li {\n  display: inline; }\n\n#content ul.breadcrumb li a {\n  color: #000;\n  text-decoration: underline; }\n\n#content ul.breadcrumb li a:hover {\n  color: #F3980D; }\n\n#content ul.breadcrumb li a.selected {\n  color: #F3980D; }\n\n.jcarousel {\n  position: relative;\n  overflow: hidden;\n  height: 157px;\n  margin-left: 0;\n  padding-left: 0;\n  width: 100%;\n  margin-top: 244px;\n  padding-top: 310px;\n  margin-bottom: 0;\n  padding-bottom: 0; }\n\n.jcarousel ul {\n  width: 20000em;\n  position: absolute;\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.jcarousel li {\n  float: left; }\n\nul.jcarousel-control {\n  margin-left: 800px;\n  width: 250px;\n  position: absolute;\n  margin-top: 220px;\n  padding-top: 200px;\n  z-index: 1; }\n\nul.jcarousel-control li {\n  background-image: url(\"/assets/images/rar.png\");\n  display: inline-block;\n  height: 17px;\n  width: 17px;\n  *display: inline;\n  *zoom: 1; }\n\n#banner a,\n#banner a:hover {\n  color: #FFFFFF;\n  text-decoration: none; }\n\n#banner .banner-content {\n  height: 65px;\n  background: #000000;\n  margin-top: -5px; }\n\n#banner .banner-content p {\n  margin: 0;\n  padding-left: 40px;\n  color: #FFFFFF; }\n\n#banner .banner-content p.banner-title {\n  font: bold 25px Arial,Helvetica,sans-serif;\n  padding-left: 20px;\n  padding-top: 10px; }\n\n#banner .banner-content p.banner-title img {\n  padding-bottom: 5px;\n  padding-right: 10px; }\n\n.loadImage {\n  width: 32px;\n  height: 32px;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 193px; }\n\n#product-navigation {\n  width: 100%; }\n\n#product-navigation .wrapper {\n  padding: 0;\n  width: 100%;\n  height: 6px; }\n\n#product-navigation #menu-product-navigation {\n  display: table;\n  width: 100%; }\n\n#product-navigation #menu-product-navigation #accommodatedtour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #campingtour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #daytour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #accommodation {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #chartertour {\n  width: 258px; }\n\n.browseListings h2 {\n  font-weight: bold;\n  margin-bottom: 10px; }\n\n#date-details {\n  float: left;\n  margin: 10px 0; }\n\n#facebox-loading {\n  text-align: center; }\n\n#facebox .form-container {\n  padding-bottom: 50px; }\n\n#facebox a#enquireBtn {\n  bottom: 20px;\n  right: 45px; }\n\n#twitter {\n  margin-top: 5px; }\n\n#twitter h4 {\n  background: none; }\n\n#content a#request-brochure {\n  border: medium none;\n  height: 92px;\n  width: 240px;\n  cursor: pointer;\n  margin: 0 0 10px;\n  display: block;\n  text-decoration: none; }\n\n.nomadNews .featuredblog h3 {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  margin-bottom: 15px; }\n\n.nomadNews .featuredblog h3 em {\n  color: #111;\n  font: bold 25px/27px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em; }\n\n.sliderContent .navigatorwidget {\n  margin-bottom: 15px;\n  position: relative;\n  width: 190px; }\n\n.sliderContent .navigatorwidget ul.product-detailed-navigator li {\n  color: black;\n  font-size: 12px;\n  list-style-type: none;\n  padding-left: 5px;\n  padding-top: 10px; }\n\n.sliderContent .navigatorwidget ul.product-detailed-navigator li a,\n.sliderContent .navigatorwidget ul.product-detailed-navigator li a:link,\n.sliderContent .navigatorwidget ul.product-detailed-navigator li a:visited {\n  white-space: nowrap;\n  border-bottom: 0 none;\n  color: #FFFFFF;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline;\n  text-transform: capitalize; }\n\n.imagegallerywidget h3 {\n  display: none; }\n\n.imagegallerywidget div.image {\n  background: none repeat scroll 0 0 #FFFFFF;\n  float: left;\n  margin: 5px 6px 6px 5px;\n  overflow: hidden;\n  position: relative; }\n\n.imagegallerywidget img {\n  float: left;\n  padding: 0; }\n\n.imagegallerywidget div.image label {\n  color: black;\n  font-size: 11px;\n  line-height: 14px;\n  padding: 10px 10px 0;\n  text-transform: uppercase;\n  display: block;\n  position: relative;\n  float: left;\n  background: #faa21b;\n  height: 100px;\n  width: 100%;\n  opacity: 0.9;\n  filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity = 90)\" \"\\a   -MS-filter:  \" progid:DXImageTransform.Microsoft.Alpha(Opacity=90) \"\"; }\n\n#social-share-links div {\n  display: inline-block;\n  width: 100px;\n  *display: inline;\n  *zoom: 1; }\n\n#page-not-found {\n  text-align: center; }\n\n#page-not-found img {\n  padding: 25px 0; }\n\n#page-not-found h1 {\n  padding: 0 0 10px; }\n\n#page-not-found h1 em {\n  letter-spacing: 0.01px; }\n\n#page-not-found .submit-container {\n  float: none; }\n\n#page-not-found .submit-container a.btn {\n  color: #fff;\n  text-decoration: none; }\n\n#page-not-found .form-container {\n  display: inline-block;\n  float: none;\n  padding: 20px 0 0;\n  *display: inline;\n  *zoom: 1; }\n\n#page-not-found .form-container .formfield-container {\n  float: none;\n  height: 40px;\n  width: 400px; }\n\n#page-not-found .form-container .formfield-container label {\n  width: 100px;\n  text-align: left; }\n\n#unsubscribe .form-container {\n  display: inline-block;\n  float: none;\n  width: 100%;\n  *display: inline;\n  *zoom: 1; }\n\n#unsubscribe .form-container .formfield-container {\n  float: none; }\n\n#unsubscribe .form-container .formfield-container label {\n  width: 100px; }\n\n#unsubscribe .submit-container {\n  float: left;\n  padding: 0 10px; }\n\n#unsubscribe .submit-container a.btn {\n  color: #fff;\n  text-decoration: none;\n  margin: 0; }\n\n.newsletter.box {\n  border: none;\n  height: 220px;\n  width: 220px !important; }\n\n.newsletter.box input {\n  border: 1px solid #FAA21B; }\n\n#profiles {\n  color: #000000;\n  text-decoration: none;\n  margin: 0;\n  padding: 0;\n  clear: both;\n  height: 100%;\n  width: 100% !important; }\n\n.profiles.box {\n  background: #E5E5FF;\n  border: none;\n  float: right;\n  width: 100% !important;\n  margin: 0 0 0 5px;\n  padding-top: 9px;\n  clear: both;\n  height: 100%; }\n\n#menuFull {\n  width: 100%;\n  clear: both;\n  padding: 0 0 30px;\n  margin: 0; }\n\n#subscribecontainer img.newsletter-icon {\n  display: inline-block; }\n\n#subscribecontainer h3 {\n  color: #ffffff;\n  display: inline-block;\n  width: 75%; }\n\n#browse-button {\n  display: inline-block;\n  margin-top: 20px;\n  vertical-align: top;\n  width: 130px; }\n\n#subscribe-button {\n  display: inline-block;\n  height: 34px;\n  margin-left: 5px;\n  margin-top: 5px;\n  width: 76px; }\n\n#subscribecontainer a:active,\n#subscribecontainer a:hover {\n  color: #fff; }\n\n#frmsubscribe input.error {\n  outline: 2px solid #FF0000; }\n\n#frmsubscribe label.error {\n  display: none !important; }\n\n/*-- Camtour --*/\n\n#slider-wrapper div.jqans-wrapper.default a {\n  color: #363636 !important; }\n\n#slider-wrapper div.jqans-wrapper.default {\n  background: none repeat scroll 0 0 #FFFFFF !important;\n  border-left: 1px solid #DBE1E6;\n  border-right: 1px solid #DBE1E6;\n  border-top: 1px solid #DBE1E6;\n  color: inherit; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong {\n  color: #000000;\n  font-weight: bold;\n  text-transform: uppercase; }\n\n#slider-wrapper div.jqans-wrapper.default img {\n  margin: 0;\n  max-width: 100%;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 {\n  font-size: 138% !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a,\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active,\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover,\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited {\n  background: none repeat scroll 0 0 transparent;\n  border: medium none;\n  color: #16387C !important;\n  text-decoration: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content p {\n  color: #333333 !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories {\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li {\n  background-color: #FCFCFD;\n  background-image: -moz-linear-gradient(center top, #E8EDF0, #FCFCFD);\n  border-top-color: #A8B4BF; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected {\n  background-color: #59728B;\n  background-image: -moz-linear-gradient(center top, #59728B, #2D4458);\n  border-top-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img {\n  background-color: #FFFFFF;\n  border: 1px solid #C5CED7;\n  margin: 8px 0 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img {\n  border: 1px solid #000000; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 {\n  background: none repeat scroll 0 0 transparent !important;\n  color: #59728B !important;\n  font-size: 12px !important;\n  font-weight: normal;\n  line-height: 14px !important;\n  margin: 0;\n  padding: 0;\n  text-shadow: none;\n  text-transform: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 {\n  color: #FFFFFF !important;\n  font-size: 12px !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div {\n  border-bottom: 10px solid #59728B;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li,\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul {\n  background: none repeat scroll 0 0 transparent !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination {\n  background-color: #F9FAFA;\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a {\n  border-right-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span {\n  border-right-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span {\n  border-left-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default #control-play {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default #pause-left,\n#slider-wrapper div.jqans-wrapper.default #pause-right {\n  background: none repeat scroll 0 0 #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default a {\n  color: #363636 !important; }\n\n#slider-wrapper div.jqans-wrapper.default {\n  border-left: 1px solid #DBE1E6;\n  border-right: 1px solid #DBE1E6;\n  border-top: 1px solid #DBE1E6;\n  background: #FFF !important;\n  color: inherit; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong {\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #000; }\n\n#slider-wrapper div.jqans-wrapper.default img {\n  max-width: 100%;\n  margin: 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 {\n  font-size: 138% !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a,\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active,\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover,\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited {\n  color: #16387C !important;\n  text-decoration: none;\n  background: transparent;\n  border: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content p {\n  color: #333 !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories {\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li {\n  background-color: #FCFCFD;\n  background-image: -moz-linear-gradient(center top, #E8EDF0, #FCFCFD);\n  border-top-color: #A8B4BF; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected {\n  background-color: #59728B;\n  background-image: -moz-linear-gradient(center top, #59728B, #2D4458);\n  border-top-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img {\n  border: 1px solid #C5CED7;\n  background-color: #fff;\n  margin: 8px 0 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img {\n  border: 1px solid #000; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 {\n  font-size: 12px !important;\n  color: #59728B !important;\n  line-height: 14px !important;\n  text-transform: none;\n  background: transparent !important;\n  background-color: transparent !important;\n  background-image: none !important;\n  margin: 0;\n  padding: 0;\n  text-shadow: none;\n  font-weight: normal; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 {\n  font-size: 12px !important;\n  color: #FFF !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div {\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid #59728B;\n  border-left: 10px solid transparent; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li,\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul {\n  background-color: transparent !important;\n  background: transparent !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination {\n  border-bottom-color: #DBE1E6;\n  background-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a {\n  border-right-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span {\n  border-right-color: #F9FAFA;\n  /* it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color*/ }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span {\n  border-left-color: #F9FAFA;\n  /* it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color*/ }\n\n#slider-wrapper div.jqans-wrapper.default #control-play {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default #pause-left,\n#slider-wrapper div.jqans-wrapper.default #pause-right {\n  background: #59728B; }\n\n/* Master */\n\n#master-wrapper {\n  background: url(\"/assets/images/refereebg1.jpg\") repeat fixed center center #000000;\n  height: 100%;\n  position: fixed;\n  width: 100%;\n  z-index: -1; }\n\n/* Menu start*/\n\n.nfMain {\n  -moz-border-bottom-colors: none;\n  -moz-border-left-colors: none;\n  -moz-border-right-colors: none;\n  -moz-border-top-colors: none;\n  border-color: #00AD00;\n  -o-border-image: none;\n     border-image: none;\n  border-style: solid;\n  border-width: 0 0 0 2px;\n  width: 980px;\n  clear: both;\n  padding: 0;\n  margin: 0;\n  position: relative;\n  display: block; }\n\n.nfMain .nfLink {\n  border-color: #00AD00;\n  border-style: solid;\n  border-width: 0 2px 2px 0;\n  color: #000000;\n  font-family: Arial;\n  font-size: 0.9em;\n  padding: 9px 30px 5px;\n  text-decoration: none; }\n\n.nfPure .nfItem:hover > * > .nfLink,\n.nfPure .nfItem:hover > .nfLink {\n  text-decoration: underline; }\n\n.nfMain .nfJSHover,\n.nfPure .nfLink:hover {\n  color: #FFFFFF;\n  text-decoration: underline; }\n\n.nfMain,\n.nfSubC,\n.nfSubS {\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.nfMain {\n  position: relative;\n  z-index: 1; }\n\n.nfMain .nfSubC {\n  visibility: hidden;\n  position: absolute; }\n\n.nfMain .nfItem,\n.nfMain .nfLink {\n  list-style: none;\n  position: relative;\n  display: block;\n  white-space: nowrap;\n  margin: 0; }\n\n.nfMain:after {\n  content: \".\";\n  display: block;\n  height: 0;\n  clear: both;\n  overflow: hidden; }\n\n.nfPure .nfItem:hover,\n.nfPure .nfItem:hover > .nfSubC {\n  z-index: 1101;\n  visibility: inherit; }\n\n.nfPure .nfLink:focus {\n  z-index: 1102; }\n\n.nfMain .nfJSActiveItem {\n  z-index: 1101; }\n\n.nfMain .nfJSShowSub {\n  z-index: 1101;\n  visibility: inherit; }\n\n.nfMain .nfItem div.nfLink {\n  cursor: default; }\n\n.nfMain .nfItem {\n  float: left; }\n\n.nfMain .nfItem .nfItem {\n  float: none; }\n\n.nfMain .nfItem .nfSubC {\n  top: 100%;\n  left: 0;\n  width: auto; }\n\n.nfMain .nfSubC .nfItem .nfSubC {\n  top: 0;\n  left: 100%;\n  width: auto; }\n\n/*~~~~~~~~~~~~~~~~ Menu Styles (global - all menus) ~~~~~~~~~~~~~~~~*/\n\n/******[Main Menu]******/\n\n/*Main Menu Container*/\n\n.nfMain {\n  background-color: #55556a;\n  background-image: url(\"/assets/images/refereebg.jpg\");\n  padding: 0 0 0 20px; }\n\n/*Item Links*/\n\n.nfMain .nfLink {\n  border-style: solid;\n  border-width: 1px 0 1px 1px;\n  border-color: #333;\n  padding: 6px 40px 6px 20px;\n  font-family: Arial;\n  font-size: 14px;\n  color: #fff;\n  text-decoration: none; }\n\n/*Item Links - Parent*/\n\n.nfMain .nfParent .nfLink {\n  background-position: 92% 52%;\n  background-repeat: no-repeat; }\n\n.nfMain .nfParent .nfSubS .nfLink {\n  background-image: none; }\n\n/*Item Links - Hover (duplicate styles below!)*/\n\n.nfPure .nfItem:hover > * > .nfLink,\n.nfPure .nfItem:hover > .nfLink {\n  text-decoration: underline; }\n\n.nfMain .nfJSHover,\n.nfPure .nfLink:hover {\n  text-decoration: underline; }\n\n/*Item Links - Active*/\n\n.nfMain .nfItem .nfJSActive {\n  border-bottom-color: #e5ebf7;\n  background-color: #e5ebf7;\n  color: #425fa7;\n  text-decoration: underline; }\n\n/*Item Links - Focus*/\n\n.nfMain .nfItem .nfJSFocus,\n.nfPure .nfLink:focus {\n  text-decoration: underline; }\n\n/*Item Links - Breadcrumbs*/\n\n/******[Sub Menus]******/\n\n/*Sub Menu Styles*/\n\n.nfMain .nfSubS {\n  background-color: #e5ebf7;\n  padding: 20px; }\n\n.nfMain .nfSubS {\n  height: auto;\n  border: solid 1px #333;\n  border-width: 0 1px 1px 1px;\n  background-color: #e5ebf7;\n  -moz-border-radius-bottomLeft: 10px;\n  -moz-border-radius-bottomRight: 10px;\n  -webkit-border-bottom-right-radius: 10px;\n  -webkit-border-bottom-left-radius: 10px; }\n\n/*Sub Menu Position Offsets - Level 2*/\n\n.nfMain .nfSubS .nfSubC {\n  margin: -1px 0 0; }\n\n/*Sub Menu Styles - Level 2*/\n\n.nfMain .nfSubS .nfSubS {\n  border-width: 1px; }\n\n.nfMain .nfSubS .nfSubS {\n  -moz-border-radius-topRight: 10px;\n  -moz-border-radius-bottomLeft: 10px;\n  -moz-border-radius-bottomRight: 10px;\n  -webkit-border-bottom-right-radius: 10px;\n  -webkit-border-bottom-left-radius: 10px;\n  -webkit-border-top-right-radius: 10px; }\n\n/*Item Links*/\n\n.nfMain .nfSubS .nfLink {\n  border-style: solid;\n  border-width: 0 0 1px 0;\n  border-color: #999;\n  padding: 6px 40px 6px 5px;\n  font-size: 13px;\n  color: #55556a; }\n\n/*Item Links - Parent*/\n\n.nfMain .nfSubS .nfParent .nfSubS .nfLink {\n  background-image: none; }\n\n/*Item Links - Last Child (ignored by IE8 & down)*/\n\n.nfMain .nfSubS .nfItem:last-child .nfLink {\n  border-width: 0; }\n\n/*Item Links - Hover (duplicate styles below!)*/\n\n/*Item Links - Active*/\n\n.nfMain .nfSubS .nfItem .nfJSActive {\n  background-color: #ccd0e3;\n  color: #425fa7;\n  text-decoration: underline; }\n\n/*Item Links - Focus*/\n\n.nfMain .nfSubS .nfItem .nfJSFocus,\n.nfPure .nfSubS .nfLink:focus {\n  color: #03f; }\n\n/*Item Links - Breadcrumbs*/\n\n/******[Custom Example Menu Styles]******/\n\n.custTitle {\n  font-size: 1em;\n  margin: 20px 0 5px;\n  color: #55556a;\n  font-weight: bold; }\n\n.custTitleBoxed {\n  font-size: 0.9em;\n  margin: 20px 0 5px;\n  color: #55556a;\n  padding: 8px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #fff;\n  border-color: #979cb6;\n  -moz-border-radius: 4px;\n  -webkit-border-radius: 4px; }\n\n.custTitleTop {\n  margin: 5px 0; }\n\n.custMegaSub {\n  width: 760px; }\n\n.custMegaItem {\n  font-size: 0.9em; }\n\n.megaContentRight {\n  position: relative;\n  width: 190px;\n  left: 290px; }\n\n.megaContentMiddle {\n  position: absolute;\n  width: 140px;\n  left: 170px; }\n\n.megaContentLeft {\n  position: absolute;\n  width: 240px; }\n\n.megaContentLeft ul,\n.megaContentMiddle ul,\n.megaContentRight ul {\n  list-style-type: circle;\n  margin: 10px 0 0 24px;\n  padding: 0; }\n\n.megaTopTitle {\n  width: 440px;\n  font-size: 1em;\n  color: #55556a;\n  white-space: normal;\n  margin-bottom: 10px;\n  padding: 8px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #fff;\n  border-color: #979cb6;\n  -moz-border-radius: 4px;\n  -webkit-border-radius: 4px; }\n\n.megaTitle {\n  color: #55556a;\n  white-space: normal; }\n\n/*End menu */\n\n#content .whitebg {\n  background: red;\n  clear: both; }\n\n@media screen and (min-width: 1024px) {\n  #d1 {\n    height: 240px; } }\n\n@media screen and (max-width: 800px) {\n  #d1 {\n    height: 150px; } }\n\n@media screen and (max-width: 600px) {\n  #d1 {\n    height: 100px; } }\n\n#quote-carousel {\n  padding: 0 10px 30px;\n  margin-top: 30px; }\n\n#header-carousel {\n  padding: 0;\n  margin-top: 0; }\n\n/* Control buttons  */\n\n#quote-carousel .carousel-control {\n  background: none;\n  color: #222;\n  font-size: 2.3em;\n  text-shadow: none;\n  margin-top: 30px; }\n\n/* Previous button  */\n\n#quote-carousel .carousel-control.left {\n  left: -12px; }\n\n/* Next button  */\n\n#quote-carousel .carousel-control.right {\n  right: -12px !important; }\n\n/* Changes the position of the indicators */\n\n#quote-carousel .carousel-indicators {\n  right: 50%;\n  top: auto;\n  bottom: 0;\n  margin-right: -19px; }\n\n/* Changes the color of the indicators */\n\n#quote-carousel .carousel-indicators li {\n  background: #c0c0c0; }\n\n#quote-carousel .carousel-indicators .active {\n  background: #333333; }\n\n#quote-carousel img {\n  width: 250px;\n  height: 100px; }\n\n/* End carousel */\n\n.item blockquote {\n  border-left: none;\n  margin: 0; }\n\n.item blockquote img {\n  margin-bottom: 10px; }\n\n.item blockquote p:before {\n  content: \"\\f10d\";\n  font-family: 'Fontawesome';\n  float: left;\n  margin-right: 10px; }\n\n/**\n  MEDIA QUERIES\n*/\n\n/* Small devices (tablets, 768px and up) */\n\n@media (min-width: 768px) {\n  #quote-carousel {\n    margin-bottom: 0;\n    padding: 0 40px 30px; } }\n\n/* Small devices (tablets, up to 768px) */\n\n@media (max-width: 768px) {\n  /* Make the indicators larger for easier clicking with fingers/thumb on mobile */\n  #quote-carousel .carousel-indicators {\n    bottom: -20px !important; }\n  #quote-carousel .carousel-indicators li {\n    display: inline-block;\n    margin: 0 5px;\n    width: 15px;\n    height: 15px; }\n  #quote-carousel .carousel-indicators li.active {\n    margin: 0 5px;\n    width: 20px;\n    height: 20px; } }\n\n.elegantshd {\n  color: #131313;\n  background-color: #e7e5e4;\n  letter-spacing: 0.15em;\n  text-shadow: 1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2; }\n\n.bigFont {\n  font-family: \"Avant Garde\", Avantgarde, \"Century Gothic\", CenturyGothic, \"AppleGothic\", sans-serif;\n  font-size: 40px;\n  padding: 3%;\n  text-align: center;\n  text-transform: uppercase;\n  text-rendering: optimizeLegibility;\n  font-weight: bolder; }\n\n.quoteAuthor {\n  width: 25%;\n  color: #111;\n  text-decoration: none;\n  /*float: left;*/\n  bottom: 10px;\n  padding-left: 15px;\n  padding-right: 15px;\n  letter-spacing: -0.04em;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fcbe60, #faa21b);\n  border-right: 1px solid #c88620;\n  border-left: 1px solid #fccf88;\n  display: block; }\n\n.quotePic {\n  -moz-border-radius-topright: 20px;\n  -moz-border-radius-bottomright: 20px;\n  -webkit-border-top-right-radius: 20px;\n  -khtml-border-radius-topleft: 20px;\n  -webkit-border-top-left-radius: 20px;\n  -webkit-border-bottom-right-radius: 20px;\n  -khtml-border-radius-bottom-left: 20px;\n  -webkit-border-bottom-left-radius: 20px; }\n\n.gradient-text {\n  position: relative;\n  text-shadow: 0.15em 0.15em 0.35em #888;\n  padding: 0.5em; }\n\n.gradient-text::after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    bottom: 0;\n    right: 0;\n    background: radial-gradient(circle at 70% 3%, #aa048b, #bb9801);\n    mix-blend-mode: screen; }\n\nbody {\n  font-size: 4vmax;\n  text-align: center;\n  background: #fff;\n  color: #000; }\n\nblockquote {\n  margin: 0; }\n\n.quoteFont {\n  font-family: sans-serif;\n  letter-spacing: -.1ch;\n  margin: 0;\n  line-height: 1.5;\n  size: 18px; }\n\np {\n  font-family: sans-serif;\n  font-size: 1ch;\n  opacity: 0.35; }\n\n* {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box; }\n\nbody {\n  font-family: 'Montserrat';\n  -webkit-font-smoothing: antialiased;\n  line-height: 1.5; }\n\n.com {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch;\n  height: 100vh;\n  overflow: hidden; }\n\n.com__content {\n  position: relative;\n  -webkit-box-flex: 8;\n  -ms-flex: 8;\n  flex: 8;\n  background: #404855;\n  padding: 10vh 10vw; }\n\n.com__section {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column wrap;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-flow: column wrap;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  height: 100vh;\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  padding: 0 10%;\n  opacity: 0;\n  visibility: hidden;\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }\n\n.com__section.active {\n  opacity: 1;\n  visibility: visible; }\n\n.com__section-half {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  height: 100vh;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column wrap;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-flow: column wrap;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center; }\n\n.com__section--text h1 {\n  margin-bottom: 3vh;\n  font-size: 48px;\n  font-weight: 300;\n  color: #22E2ED; }\n\n.com__section--text p {\n  margin: 0;\n  color: rgba(255, 255, 255, 0.9);\n  max-width: 600px;\n  font-size: 20px; }\n\n.com__section--text img {\n  max-width: 250px;\n  margin: 0 auto; }\n\n.com__section--text.centered {\n  text-align: center; }\n\n.com__section--text-img {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: row wrap;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-flow: row wrap; }\n\n.com__nav {\n  width: 90px; }\n\n.com__nav-list {\n  margin: 0;\n  padding: 0;\n  list-style-type: none;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column wrap;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-flow: column wrap;\n  height: 100vh;\n  overflow: visible; }\n\n.com__nav-item {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  position: relative;\n  overflow: visible;\n  border-bottom: 7px solid #1BAFB9;\n  background: #22E2ED;\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }\n\n.com__nav-item.active {\n  background: #20232a; }\n\n.com__nav-item:last-child {\n  border-bottom: none; }\n\n.com__nav-item:hover {\n  -webkit-box-flex: 2;\n  -ms-flex: 2;\n  flex: 2; }\n\n.com__nav-item:hover .com__nav-link {\n  -webkit-transform: scaleX(1);\n  transform: scaleX(1); }\n\n.com__nav-item:hover .blue-line,\n.com__nav-item:hover .white-circle,\n.com__nav-item:hover .white-line {\n  -webkit-transform: none;\n  transform: none;\n  opacity: 1; }\n\n.com__nav-link {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-flow: column wrap;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-flow: column wrap;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  padding: 0 20%;\n  position: absolute;\n  width: 280%;\n  height: 100%;\n  left: calc(-280% + 90px);\n  background: rgba(32, 35, 42, 0.75);\n  -webkit-transform: scaleX(0);\n  transform: scaleX(0);\n  -webkit-transform-origin: right center;\n  transform-origin: right center;\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }\n\n.com__nav-link.flex-row {\n  -ms-flex-flow: row wrap;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-flow: row wrap; }\n\n.com__nav-link.centered {\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.com__nav-link .com__section-half {\n  height: auto; }\n\n.com__nav-link .com__section-half:nth-child(2) {\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.blue-line {\n  display: block;\n  width: 80%;\n  height: 14px;\n  background: #22E2ED;\n  margin-bottom: 12px; }\n\n.white-line {\n  display: block;\n  width: 60%;\n  height: 5px;\n  background: rgba(255, 255, 255, 0.9);\n  margin-bottom: 7px; }\n\n.white-line:nth-of-type(3) {\n  width: 50%; }\n\n.white-circle {\n  display: block;\n  width: 30px;\n  height: 30px;\n  border-radius: 50%;\n  background: rgba(255, 255, 255, 0.9); }\n\n/* animation classes */\n\n.animate {\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1); }\n\n.slideInLeft {\n  -webkit-transform: translate3d(-100%, 0, 0);\n  transform: translate3d(-100%, 0, 0);\n  opacity: 0; }\n\n.slideInRight {\n  -webkit-transform: translate3d(100%, 0, 0);\n  transform: translate3d(100%, 0, 0);\n  opacity: 0; }\n\n.scaleIn {\n  -webkit-transform: scale(0);\n  transform: scale(0); }\n\n.scaleInLeft {\n  -webkit-transform: scaleX(0);\n  transform: scaleX(0);\n  -webkit-transform-origin: left center;\n  transform-origin: left center; }\n\n.delay-1 {\n  -webkit-transition-delay: 0.05s;\n  transition-delay: 0.05s; }\n\n.delay-2 {\n  -webkit-transition-delay: 0.1s;\n  transition-delay: 0.1s; }\n\n.delay-3 {\n  -webkit-transition-delay: 0.15s;\n  transition-delay: 0.15s; }\n\n.delay-4 {\n  -webkit-transition-delay: 0.2s;\n  transition-delay: 0.2s; }\n\n.delay-5 {\n  -webkit-transition-delay: 0.25s;\n  transition-delay: 0.25s; }\n\n.logo {\n  position: fixed;\n  bottom: 3vh;\n  left: 3vw;\n  z-index: 2; }\n\n.logo img {\n  width: 45px;\n  -webkit-transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);\n  -webkit-transform: rotate(0);\n  transform: rotate(0); }\n\n.logo img:hover {\n  -webkit-transform: rotate(180deg) scale(1.1);\n  transform: rotate(180deg) scale(1.1); }\n\n.carousel-inner-div {\n  background-color: #42f4f1;\n  text-align: center;\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n  height: 240px; }\n\n.carousel-inner-header {\n  background-color: #42f4f1;\n  text-align: center;\n  opacity: 0.9;\n  filter: alpha(opacity=90);\n  overflow: auto;\n  top: 0;\n  margin: 0;\n  padding: 0; }\n\n.title-widget-text {\n  text-align: center;\n  font-weight: bolder;\n  size: 18px; }\n\n#header-carousel {\n  padding: 0 10px 30px;\n  margin-top: 30px; }\n\n/* Control buttons  */\n\n#header-carousel .carousel-control {\n  background: none;\n  color: #222;\n  font-size: 2.3em;\n  text-shadow: none;\n  margin-top: 30px; }\n\n/* Previous button  */\n\n#header-carousel .carousel-control.left {\n  left: -12px; }\n\n/* Next button  */\n\n#header-carousel .carousel-control.right {\n  right: -12px !important; }\n\n/* Changes the position of the indicators */\n\n#header-carousel .carousel-indicators {\n  right: 50%;\n  top: auto;\n  bottom: 0;\n  margin-right: -19px; }\n\n/* Changes the color of the indicators */\n\n#header-carousel .carousel-indicators li {\n  background: #c0c0c0; }\n\n#header-carousel .carousel-indicators .active {\n  background: #333333; }\n\n#header-carousel img {\n  width: 250px;\n  height: 100px; }\n\n/* End carousel */\n\n.item blockquote {\n  border-left: none;\n  margin: 0; }\n\n.item blockquote img {\n  margin-bottom: 10px; }\n\n.item blockquote p:before {\n  content: \"\\f10d\";\n  font-family: 'Fontawesome';\n  float: left;\n  margin-right: 10px; }\n\n/**\n  MEDIA QUERIES\n*/\n\n/* Small devices (tablets, 768px and up) */\n\n@media (min-width: 768px) {\n  #header-carousel {\n    margin-bottom: 0;\n    padding: 0 40px 30px; } }\n\n/* Small devices (tablets, up to 768px) */\n\n@media (max-width: 768px) {\n  /* Make the indicators larger for easier clicking with fingers/thumb on mobile */\n  #header-carousel .carousel-indicators {\n    bottom: -20px !important; }\n  #header-carousel .carousel-indicators li {\n    display: inline-block;\n    margin: 0 5px;\n    width: 15px;\n    height: 15px; }\n  #header-carousel .carousel-indicators li.active {\n    margin: 0 5px;\n    width: 20px;\n    height: 20px; } }\n"

/***/ }),

/***/ "./client/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-home',
            template: __webpack_require__("./client/app/home/home.component.html"),
            styles: [__webpack_require__("./client/app/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./client/app/home/how-it-works/how-it-works.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <h4 class=\"elegantshd bigFont\">How It Works</h4>\n  <div class=\"card-block\">\n    <div class=\"bg-faded how-it-works-opacity\">\n      <div class=\"row\">\n        <div class=\"col-xs-12\">\n          <div class=\"row\">\n\n\n            <div class=\"col-sm-12 text-justify\">\n\n              <!--Start-->\n              <hr>\n\n              <div class=\"card-deck\">\n                <div class=\"card\">\n                  <div class=\"card-block\">\n                    <p class=\"card-text\"><span><img src=\"assets/images/calendar.png\" class=\"img-fluid img-responsive\"  width=\"80%\" max-width=\"100%\"></span></p>\n                    <p class=\"list-group-item-text\">\n                      Fill out an Online Form and we'll match you up with a Referee that fits best for your League, Tournament or Event.\n                    </p>\n                  </div>\n                </div>\n                <div class=\"card\">\n                  <div class=\"card-block numberbg\">\n                    <p class=\"rediconbg\"></p>\n                    <p class=\"onebg\"></p>\n                    <p class=\"greeniconbg\"></p>\n                    <!--<p class=\"card-text\" style=\"text-align:center\"><span >\n                                                                        <img src=\"assets/images/redicon.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"10%\" max-width=\"20%\">\n\n\n                                                               <img src=\"assets/images/1.gif\" class=\"img-fluid img-responsive \" alt=\"Responsive image\" width=\"10%\" max-width=\"20%\">\n\n                                                                <img src=\"assets/images/greenicon.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"10%\" max-width=\"20%\">\n\n                                                                </span></p>-->\n                  </div>\n                </div>\n                <div class=\"card\">\n                  <div class=\"card-block\">\n\n                    <p class=\"card-text\"><span><img src=\"assets/images/listcheck.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"80%\" max-width=\"100%\"></span></p>\n                    <p class=\"list-group-item-text\">\n                      Fill out the Registration Form and take a Sports Quiz to test knowledge of the Sports you're interested in Officiating.\n                    </p>\n\n                  </div>\n                </div>\n              </div>\n\n              <!--End-->\n              <!--Start-->\n              <hr>\n\n              <div class=\"card-deck\">\n                <div class=\"card\">\n                  <div class=\"card-block\">\n                    <p class=\"card-text\"><span><img src=\"assets/images/bluecheck.png\" class=\"img-fluid img-responsive\"  width=\"80%\" max-width=\"100%\"></span></p>\n                    <p class=\"list-group-item-text\">\n                      Once your Event is confirmed by <strong>RAR</strong>, we'll send an introduction email to you and the Official.\n                    </p>\n                  </div>\n                </div>\n                <div class=\"card\">\n                  <div class=\"card-block numberbg\">\n                    <p class=\"avatarbg\"></p>\n                    <p class=\"twobg\"></p>\n                    <p class=\"avatar1bg\"></p>\n                    <!--\n\n                                                                <p class=\"card-text\"><span><img src=\"assets/images/avatar.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"15%\" max-width=\"40%\">\n\n                                                               <img src=\"assets/images/2.gif\" class=\"img-fluid img-responsive \" alt=\"Responsive image\" width=\"10%\" max-width=\"20%\">\n\n                                                                        <img src=\"assets/images/avatar1.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"15%\" max-width=\"40%\">\n\n                                                                        </span>\n                                                                </p>-->\n                  </div>\n                </div>\n                <div class=\"card\">\n                  <div class=\"card-block\">\n\n                    <p class=\"card-text\"><span><img src=\"assets/images/monitoricon.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"80%\" max-width=\"100%\"></span></p>\n                    <p class=\"list-group-item-text\">\n                      <strong>Rent-A-Ref</strong> will send you a notification once a League, Tournament or an Event is in need of your services.\n                    </p>\n\n                  </div>\n                </div>\n              </div>\n\n              <!--End-->\n              <!--Start-->\n              <hr>\n\n              <div class=\"card-deck\">\n                <div class=\"card\">\n                  <div class=\"card-block\">\n                    <p class=\"card-text\"><span><img src=\"assets/images/holdcard.png\" class=\"img-fluid img-responsive\"  width=\"60%\" max-width=\"100%\"></span></p>\n                    <p class=\"list-group-item-text\">\n                      Pay the Referee, and you're ready to enjoy your event. <strong>RAR</strong> takes care of the rest so you can sit back, watch or play!\n                    </p>\n                  </div>\n                </div>\n                <div class=\"card\">\n                  <div class=\"card-block numberbg\">\n                    <p class=\"ccbg\"></p>\n                    <p class=\"threebg\"></p>\n                    <p class=\"cc1bg\"></p>\n                    <!--\n\n                                                                <p class=\"card-text\"><span><img src=\"assets/images/cc1.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"35%\" max-width=\"80%\">\n\n                                                               <img src=\"assets/images/3.gif\" class=\"img-fluid img-responsive \" alt=\"Responsive image\" width=\"10%\" max-width=\"20%\">\n\n                                                                        <img src=\"assets/images/cc.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"35%\" max-width=\"80%\">\n\n                                                                        </span>\n                                                                </p>-->\n                  </div>\n                </div>\n                <div class=\"card\">\n                  <div class=\"card-block\">\n\n                    <p class=\"card-text\"><span><img src=\"assets/images/savemoney.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=\"70%\" max-width=\"100%\"></span></p>\n                    <p class=\"list-group-item-text\">\n                      Once the event is complete, you will receive your payment via one of our many electronic payment options.\n                    </p>\n\n                  </div>\n                </div>\n              </div>\n\n              <!--End-->\n              <!--Start-->\n              <hr>\n              <h4 class=\"elegantshd bigFont\">We're Here to Help</h4>\n              <label>Questions about Rent-A-Ref? Click the blue button to contact us!</label>\n              <div class=\"row\">\n                <div class=\"col-md-4 col-md-offset-4\">\n                  <div class=\"material-button-anim\">\n                    <ul class=\"list-inline\" id=\"options\">\n                      <li class=\"option\">\n                        <button class=\"material-button option1\" type=\"button\">\n                <span class=\"fa fa-phone\" aria-hidden=\"true\"></span>\n              </button>\n                      </li>\n                      <li class=\"option\">\n                        <button class=\"material-button option2\" type=\"button\">\n                <span class=\"fa fa-envelope-o\" aria-hidden=\"true\"></span>\n              </button>\n                      </li>\n                      <li class=\"option\">\n                        <button class=\"material-button option3\" type=\"button\">\n                <span class=\"fa fa-pencil\" aria-hidden=\"true\"></span>\n              </button>\n                      </li>\n                    </ul>\n                    <button class=\"material-button material-button-toggle\" type=\"button\">\n            <span class=\"fa fa-plus\" aria-hidden=\"true\"></span>\n          </button>\n                  </div>\n                </div>\n              </div>\n\n              <!--End-->\n            </div>\n\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/home/how-it-works/how-it-works.component.scss":
/***/ (function(module, exports) {

module.exports = ".numberbg {\n  background: url(\"/assets/images/circular.png\") 0 0 no-repeat;\n  background-size: 50%;\n  background-position: center;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  margin: auto;\n  /*this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.rediconbg {\n  background: url(\"/assets/images/redicon.png\") 0 0 no-repeat;\n  background-size: 12%;\n  background-position: top;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: 50px;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.onebg {\n  background: url(\"/assets/images/1.gif\") 0 0 no-repeat;\n  background-size: 10%;\n  background-position: center;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.greeniconbg {\n  background: url(\"/assets/images/greenicon.png\") 0 0 no-repeat;\n  background-size: 12%;\n  background-position: bottom;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: -50px;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.avatarbg {\n  background: url(\"/assets/images/avatar1.png\") 0 0 no-repeat;\n  background-size: 12%;\n  background-position: top;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: 50px;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.twobg {\n  background: url(\"/assets/images/2.gif\") 0 0 no-repeat;\n  background-size: 10%;\n  background-position: center;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.avatar1bg {\n  background: url(\"/assets/images/avatar1.png\") 0 0 no-repeat;\n  background-size: 12%;\n  background-position: bottom;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: -50px;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.ccbg {\n  background: url(\"/assets/images/cc.png\") 0 0 no-repeat;\n  background-size: 20%;\n  background-position: top;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: 50px;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.threebg {\n  background: url(\"/assets/images/3.gif\") 0 0 no-repeat;\n  background-size: 10%;\n  background-position: center;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.cc1bg {\n  background: url(\"/assets/images/cc1.png\") 0 0 no-repeat;\n  background-size: 20%;\n  background-position: bottom;\n  position: absolute;\n  /*it can be fixed too*/\n  left: 0;\n  right: 0;\n  top: -50px;\n  bottom: 0;\n  /*margin:auto;\n\n        this to solve \"the content will not be cut when the window is smaller than the content\": */\n  max-width: 100%;\n  max-height: 100%;\n  overflow: auto; }\n\n.elegantshd {\n  color: #131313;\n  background-color: #e7e5e4;\n  letter-spacing: .15em;\n  text-shadow: 1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2; }\n\n.bigFont {\n  font-family: \"Avant Garde\", Avantgarde, \"Century Gothic\", CenturyGothic, \"AppleGothic\", sans-serif;\n  font-size: 40px;\n  padding: 3%;\n  text-align: center;\n  text-transform: uppercase;\n  text-rendering: optimizeLegibility;\n  font-weight: bolder; }\n\n.card-text span {\n  text-align: center;\n  display: block;\n  margin: auto; }\n\n.how-it-works-opacity {\n  opacity: .8;\n  filter: alpha(opacity=80); }\n"

/***/ }),

/***/ "./client/app/home/how-it-works/how-it-works.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HowItWorksComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jquery__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HowItWorksComponent = /** @class */ (function () {
    function HowItWorksComponent() {
        __WEBPACK_IMPORTED_MODULE_1_jquery__(document).ready(function () {
            //alert('testing');
        });
    }
    HowItWorksComponent.prototype.ngOnInit = function () { };
    HowItWorksComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-how-it-works',
            template: __webpack_require__("./client/app/home/how-it-works/how-it-works.component.html"),
            styles: [__webpack_require__("./client/app/home/how-it-works/how-it-works.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HowItWorksComponent);
    return HowItWorksComponent;
}());



/***/ }),

/***/ "./client/app/home/pricing/pricing.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row breadcrumb col-sm-12 \">\n  <table class=\"table table-responsive text-sm-center\">\n    <thead>\n      <tr class=\"breadcrumb\">\n        <th><span class=\"font-weight-bold breadcrumb-item text-md-center bg-success text-white\"><p>U17 to U19</p><p>90 minutes</p></span></th>\n        <th><span class=\"font-weight-bold breadcrumb-item active text-md-center bg-success text-white\"><p>Per Team for 3 Referees</p><p>$81</p></span></th>\n        <th><span class=\"font-weight-bold breadcrumb-item text-md-center bg-success text-white\"><p>R-$66</p><p>AR-$48</p></span></th>\n        <th><span class=\"font-weight-bold breadcrumb-item text-md-center bg-success text-white\"><p>Per Team for 2 Referees</p><p>$65</p></span></th>\n        <th><span class=\"font-weight-bold breadcrumb-item text-md-center bg-success text-white\"><p>R-$78</p><p>AR-$52</p></span></th>\n        <th><span class=\"font-weight-bold breadcrumb-item text-md-center bg-success text-white\"><p>1 Referee</p><p>R-48</p></span></th>\n      </tr>\n    </thead>\n    <tbody>\n      <tr class=\"breadcrumb\">\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-info text-white\"><p>U15 to U16</p><p>80 minutes</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item active text-md-center bg-info text-white\"><p>Per Team for 3 Referees</p><p>$72</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-info text-white\"><p>R-$56</p><p>AR-$43</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-info text-white\"><p>Per Team for 2 Referees</p><p>$58</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-info text-white\"><p>R-$70</p><p>AR-$46</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-info text-white\"><p>1 Referee</p><p>R-45</p></span></td>\n      </tr>\n\n      <tr class=\"breadcrumb\">\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-warning text-white\"><p>U13 to U14</p><p>70 minutes</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item active text-md-center bg-warning  text-white\"><p>Per Team for 3 Referees</p><p>$63</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-warning  text-white\"><p>R-$50</p><p>AR-$38</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-warning text-white\"><p>Per Team for 2 Referees</p><p>$50</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-warning text-white\"><p>R-$60</p><p>AR-$40</p></span></td>\n        <td><span class=\"font-weight-bold breadcrumb-item text-md-center bg-warning text-white\"><p>1 Referee</p><p>R-40</p></span></td>\n      </tr>\n\n    </tbody>\n  </table>\n  <div class=\"breadcrumb col-sm-12\">\n\n    <label>Soccer for short sided games/Basketball/Volleyball/Flag Football/Softball/Rugby/ = Minimum $30 per Referee per hour for one-time\n          events or tournaments.</label><br>\n\n  </div>\n  <div class=\"breadcrumb col-sm-12\">\n    <label>We should be able to change the pricing on our end in case a league receives a discount or can only afford lower than $30.\n              A lot of leagues are $25 per hour for one sport, but $30 per hour on another sport.</label>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./client/app/home/pricing/pricing.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/home/pricing/pricing.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PricingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PricingComponent = /** @class */ (function () {
    function PricingComponent() {
    }
    PricingComponent.prototype.ngOnInit = function () { };
    PricingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-pricing',
            template: __webpack_require__("./client/app/home/pricing/pricing.component.html"),
            styles: [__webpack_require__("./client/app/home/pricing/pricing.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], PricingComponent);
    return PricingComponent;
}());



/***/ }),

/***/ "./client/app/leftmenu/leftmenu.component.html":
/***/ (function(module, exports) {

module.exports = "<nav class=\"hidden-xs-down bg-inverse sidebar\">\n  <div id=\"sidebarDefault\">\n    <ul class=\"nav nav-pills flex-column\">\n      <li class=\"nav-item\">\n        <a [routerLink]=\"['/games']\" class=\"nav-item nav-link\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n          <i class=\"fa fa-trophy\"></i> Games\n        </a>\n      </li>\n      <li class=\"nav-item\">\n        <a [routerLink]=\"['/referee']\" class=\"nav-item nav-link\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact: true}\">\n          <i class=\"fa fa-users\"></i> Officials\n        </a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" appSidebarToggler [routerLink]=\"['/dashboard']\"><i class=\"fa fa-dashboard\"></i>\n           <span>Dashboard</span>\n        </a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" [routerLink]=\"['/api/reports']\"><i class=\"fa fa-film\"></i>\n           <span class=\"hidden-sm-down\">Reports</span>\n        </a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" href=\"#\"><i class=\"fa fa-book\"></i>Analytics</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" [routerLink]=\"['/fileupload']\">\n          <i class=\"fa fa-list\"></i>File Upload</a>\n      </li>\n    </ul>\n  </div>\n</nav>"

/***/ }),

/***/ "./client/app/leftmenu/leftmenu.component.scss":
/***/ (function(module, exports) {

module.exports = ".sidebar {\n  /*position: relative;*/\n  top: 0px;\n  bottom: 0;\n  left: 0;\n  z-index: 1000;\n  padding: 0px;\n  overflow-x: hidden;\n  overflow-y: auto;\n  /* Scrollable contents if viewport is shorter than content. */\n  border-right: 1px solid #eee;\n  width: 100%; }\n\n/* Sidebar navigation */\n\n.sidebar {\n  padding-left: 0;\n  padding-right: 0; }\n\n.sidebar .nav {\n  margin-bottom: 20px; }\n\n.sidebar .nav-item {\n  width: 100%; }\n\n.sidebar .nav-item + .nav-item {\n  margin-left: 0; }\n\n.sidebar .nav-link {\n  border-radius: 0;\n  color: whitesmoke; }\n"

/***/ }),

/***/ "./client/app/leftmenu/leftmenu.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LeftmenuComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LeftmenuComponent = /** @class */ (function () {
    function LeftmenuComponent() {
    }
    LeftmenuComponent.prototype.ngOnInit = function () { };
    LeftmenuComponent.prototype.toggleMenu = function () {
        console.log('toggle called!');
    };
    LeftmenuComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-leftmenu',
            template: __webpack_require__("./client/app/leftmenu/leftmenu.component.html"),
            styles: [__webpack_require__("./client/app/leftmenu/leftmenu.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], LeftmenuComponent);
    return LeftmenuComponent;
}());



/***/ }),

/***/ "./client/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <app-toast [message]=\"toast.message\"></app-toast>\n\n    <div class=\"card\">\n      <div class=\"card form-size\">\n        <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(model)\">\n          <formly-form [model]=\"model\" [fields]=\"fields\" [options]=\"options\" [form]=\"form\">\n            <button type=\"submit\" class=\"btn btn-primary btn-sm\" [disabled]=\"form.invalid\">Login</button>\n            <button class=\"btn btn-link btn-sm\" type=\"button\" (click)=\"forgot()\">Forgot Password</button>\n          </formly-form>\n        </form>\n      </div>\n    </div>\n    <rar-google-map></rar-google-map>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/login/login.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__ = __webpack_require__("./node_modules/ngx-cookie-service/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_take__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/take.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoginComponent = /** @class */ (function () {
    function LoginComponent(auth, router, toast, cookieService) {
        this.auth = auth;
        this.router = router;
        this.toast = toast;
        this.cookieService = cookieService;
        this.cookieValue = 'UNKNOWN';
        this.cookieCheck = false;
        this.checkboxFlag = false;
        this.form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({});
        this.model = {};
        this.options = {};
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.auth.loggedIn) {
            this.router.navigate(['/']);
        }
        this.checkboxFlag =
            this.cookieService.get('checkboxFlag') === 'true' ? true : false;
        if (this.checkboxFlag) {
            this.cookieValue = this.cookieService.get('email');
        }
        this.fields = [
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'email',
                    placeholder: 'Email Address',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'password',
                    placeholder: 'Password',
                    required: true,
                    minLength: 5
                }
            }
        ];
    };
    LoginComponent.prototype.forgot = function () {
        this.router.navigate(['passwordreset']);
    };
    LoginComponent.prototype.routeOrganizer = function (canOrganize, userStatus, userId) {
        var path = '';
        // Check if the user is a referee/organizer and if his/she has not yet completed the profile form, then redirect him/her to the form
        // Organizer
        switch (canOrganize + ' ' + userStatus) {
            case 'pending standby':
                path = 'account/profile/' + userId;
                break;
            case 'yes active':
                path = 'account/' + userId;
                break;
            case 'yes locked':
                path = 'account/suspended/' + userId;
                break;
            case 'no banned':
                path = 'account/deactivated/' + userId;
                break;
        }
        return path;
    };
    LoginComponent.prototype.routeUser = function (canReferee, userStatus, userId) {
        var path = '';
        // Referee
        switch (canReferee + ' ' + userStatus) {
            case 'pending active':
                path = 'account/profile/' + userId;
                break;
            case 'pending in_progress':
                path = 'account/standby/' + userId;
                break;
            case 'yes active':
                path = 'account/' + userId;
                break;
            case 'yes locked':
                path = 'account/suspended/' + userId;
                break;
            case 'no banned':
                path = 'account/deactivated/' + userId;
                break;
            default:
                path = 'account/' + userId;
                break;
        }
        return path;
    };
    LoginComponent.prototype.onSubmit = function (data) {
        var _this = this;
        this.auth
            .login(data)
            .take(1)
            .subscribe(function (login) {
            var user = login.user;
            var userId = user.id;
            var userStatus = user.status;
            var path1 = _this.routeOrganizer(user.can_organize, userStatus, userId);
            var path2 = _this.routeUser(user.can_referee, userStatus, userId);
            if (_this.checkboxFlag) {
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 365 * 5);
                _this.cookieService.set('email', user.email);
                _this.cookieService.set('checkboxFlag', 'true');
            }
            else {
                // Delete cookie entry
                _this.cookieService.set('checkboxFlag', 'false');
                _this.cookieCheck = _this.cookieService.check('email');
                _this.cookieService.delete('email');
            }
            if (path1.length > 0) {
                _this.router.navigate([path1]);
            }
            else if (path2.length > 0) {
                _this.router.navigate([path2]);
            }
        }, function (err) {
            if (err.error instanceof Error) {
                _this.toast.setMessage('invalid email or password! ', 'danger');
            }
            else {
                _this.toast.setMessage('invalid email or password! ', 'danger');
            }
        });
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-login',
            template: __webpack_require__("./client/app/login/login.component.html"),
            styles: [__webpack_require__("./client/app/login/login.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_3_ngx_cookie_service__["a" /* CookieService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./client/app/logout/logout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogoutComponent = /** @class */ (function () {
    function LogoutComponent(auth) {
        this.auth = auth;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        this.auth.logout();
    };
    LogoutComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-logout',
            template: './logout.component.html',
            styles: ['']
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]])
    ], LogoutComponent);
    return LogoutComponent;
}());



/***/ }),

/***/ "./client/app/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <h4 class=\"card-header\">404 Not Found</h4>\n      <div class=\"card-block\">\n        <p>The page you requested was not found.</p>\n        <p>Go to <a routerLink=\"/\">Homepage</a>.</p>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/not-found/not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = /** @class */ (function () {
    function NotFoundComponent() {
    }
    NotFoundComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-not-found',
            template: __webpack_require__("./client/app/not-found/not-found.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], NotFoundComponent);
    return NotFoundComponent;
}());



/***/ }),

/***/ "./client/app/organize/events/events.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n\n    <div class=\"card horizontal-and-vertical-centering \" *ngIf=\"!isEditing && (!games || games.length === 0)\">\n      <div class=\"form-size\">\n        <strong class=\"etched-text\">You have no <i>Events</i>.</strong>\n        <p>You need to create at least one event. Once the event you can create and assign <i>games</i> to the event.\n          <br />Although creating games is optional, it allows more fine grained control of each event. Note a game can have the same address or a different address from avenue.</p>\n        <button class=\"btn btn-primary btn-sm\" (click)=\"goNewEvent({})\" title=\"Click to create new event\">New Event</button>\n      </div>\n    </div>\n\n    <div class=\"card\" *ngIf=\"isEditing\">\n      <app-toast [message]=\"toast.message\"></app-toast>\n\n      <div class=\"card form-size\">\n        <form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(model)\">\n          <formly-form [model]=\"model\" [fields]=\"fields\">\n          <button type=\"submit\" class=\"btn btn-primary btn-sm\" [disabled]=\"form.valid\">Create Event</button>\n          <span class=\"spacer\">&nbsp;</span>\n          <button type=\"submit\" class=\"btn btn-danger btn-sm\" title=\"Cancel\" (click)=\"onCancel($event)\">Cancel</button>\n          </formly-form>\n        </form>\n      </div>\n\n    </div>\n\n    <div class=\"card\" *ngIf=\"!isEditing && games?.length > 0\">\n      <div class=\"form-size\">\n        <table class=\"table table-bordered table-hover\">\n          <tr>\n            <th *ngFor=\"let title of titles\" scope=\"col\">\n              {{title}}\n            </th>\n          </tr>\n\n          <tr *ngFor=\"let game of games\" (click)=\"editEvents(game.id);\" class=\"org-table-item \">\n            <td>\n              {{game.id}}\n            </td>\n            <td>\n              {{game.name}}\n            </td>\n            <td>\n              <button class=\"btn btn-primary btn-sm\" (click)=\"editEvent(game.id)\" title=\"Click to edit this event\">Edit</button>\n            </td>\n            <td>\n              <button class=\"btn btn-danger btn-sm\" (click)=\"goDeleteEvent(game.id)\" title=\"Click to delete event\">Delete</button>\n            </td>\n          </tr>\n        </table>\n        <hr />\n        <button class=\"btn btn-primary btn-sm new-org-button\" (click)=\"goNewEvent({})\" title=\"Click to create new event\">New Event</button>\n      </div>\n    </div>\n\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/organize/events/events.component.scss":
/***/ (function(module, exports) {

module.exports = ".etched-text {\n  text-shadow: 0 2px white;\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #b8bec5; }\n\n:host /deep/ .card .form-size {\n  max-width: 70%;\n  min-width: 70%;\n  margin: auto; }\n"

/***/ }),

/***/ "./client/app/organize/events/events.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EventsComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_combineLatest__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








var EventsComponent = /** @class */ (function () {
    function EventsComponent(auth, toast, route, router, statesService, organizeService) {
        this.auth = auth;
        this.toast = toast;
        this.route = route;
        this.router = router;
        this.statesService = statesService;
        this.organizeService = organizeService;
        this.form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({});
        this.model = {};
        this.currentModel = {};
        this.options = {};
        this.games = [];
        this.isLoading = false;
        this.isEditing = false;
    }
    Object.defineProperty(EventsComponent.prototype, "country", {
        set: function (aCountry) {
            this.countryName = aCountry || 'usa';
        },
        enumerable: true,
        configurable: true
    });
    EventsComponent.prototype.ngOnInit = function () {
        this.sports = __WEBPACK_IMPORTED_MODULE_5_lodash__(this.route.snapshot.data.sports)
            .map(function (sport) {
            return {
                label: sport.name,
                value: sport.id
            };
        })
            .value();
        this.states = this.statesService.getStatesProvinces();
        this.generateForm();
    };
    EventsComponent.prototype.generateForm = function () {
        var SPORTS = __WEBPACK_IMPORTED_MODULE_5_lodash__["cloneDeep"](this.sports);
        var STATES = __WEBPACK_IMPORTED_MODULE_5_lodash__["cloneDeep"](this.states);
        this.fields = [
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'name',
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
                        key: 'eventDate',
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
                        key: 'sport',
                        templateOptions: {
                            label: 'Type of Sport',
                            required: true,
                            options: SPORTS
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'radio',
                        key: 'eventType',
                        templateOptions: {
                            label: 'What type of event',
                            required: true,
                            options: [
                                { value: 'League', key: 'league' },
                                { value: 'Tournament', key: 'tournament' },
                                { value: 'One off event', key: 'oneoff' }
                            ]
                        }
                    },
                    {
                        template: '<hr class="space-hr" /><div><strong>Age Groups</strong></div>'
                    },
                    {
                        className: 'col-sm-12',
                        type: 'checkbox',
                        key: 'kids',
                        templateOptions: {
                            label: 'Kids 13 and Under',
                            required: true
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'kidsReferees',
                        templateOptions: {
                            label: 'Number of Referees for Kids 13 and Under',
                            type: 'number',
                            min: 1,
                            max: 1000,
                            required: true
                        },
                        hideExpression: '!model.kids'
                    },
                    {
                        className: 'col-sm-12',
                        type: 'checkbox',
                        key: 'teens',
                        templateOptions: {
                            label: 'High School',
                            required: true
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'teensReferees',
                        templateOptions: {
                            label: 'Number of Referees for High Schoolers',
                            type: 'number',
                            min: 1,
                            max: 1000,
                            required: true
                        },
                        hideExpression: '!model.teens'
                    },
                    {
                        className: 'col-sm-12',
                        type: 'checkbox',
                        key: 'adults',
                        templateOptions: {
                            label: 'Over 18',
                            required: true
                        }
                    },
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'teensReferees',
                        templateOptions: {
                            label: 'Number of Referees for Over 18s',
                            type: 'number',
                            min: 1,
                            max: 1000,
                            required: true
                        },
                        hideExpression: '!model.adults'
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
                        key: 'venue',
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
    EventsComponent.prototype.setOrganizeMode = function () { };
    EventsComponent.prototype.goNewEvent = function () {
        this.isEditing = true;
    };
    EventsComponent.prototype.editEvents = function () { };
    EventsComponent.prototype.onSubmit = function (model) {
        console.log('Model:', model);
    };
    EventsComponent.prototype.onCancel = function () { };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], EventsComponent.prototype, "country", null);
    EventsComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rar-events',
            template: __webpack_require__("./client/app/organize/events/events.component.html"),
            styles: [__webpack_require__("./client/app/organize/events/events.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_3__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["d" /* StatesService */],
            __WEBPACK_IMPORTED_MODULE_4__services_index__["b" /* OrganizeService */]])
    ], EventsComponent);
    return EventsComponent;
}());



/***/ }),

/***/ "./client/app/organize/organize.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n\n      <app-toast [message]=\"toast.message\"></app-toast>\n      <h1 class=\"etched-text\" [innerHtml]=\"heading\"></h1>\n      <br />\n      <div class=\"card form-size\" *ngIf=\"isEditing\">\n\n        <organization-form (ngSubmit)=\"submitOrganization($event)\" (ngCancel)=\"setOrganizeMode($event)\" [model]=\"currentModel\"></organization-form>\n      </div>\n\n      <div class=\"card horizontal-and-vertical-centering \" *ngIf=\"!isEditing && (!organizations || organizations.length === 0)\">\n        <div class=\"form-size\">\n          <p>You need to create at least one organization. Then you can create and assign <i>events</i> to an organization.\n            <br />An event is the tornament and venue to which you assign games. Note a game can have the same address or a different address from avenue</p>\n          <button class=\"btn btn-primary btn-sm\" (click)=\"goNewOrganization({})\" title=\"Click to create new organization\">New Organization</button>\n        </div>\n      </div>\n\n      <div class=\"\" *ngIf=\"!isEditing && organizations?.length > 0\">\n        <div class=\"form-size\">\n          <br />\n          <table class=\"table table-bordered table-hover\">\n            <thead class=\"thead-light\">\n              <tr>\n                <th *ngFor=\"let title of titles\" scope=\"col\">\n                  {{title}}\n                </th>\n              </tr>\n            </thead>\n            <tbody>\n              <tr *ngFor=\"let organization of organizations\"  class=\"org-table-item \">\n                <td (click)=\"editEvents(organization.id);\" >\n                  {{organization.id}}\n                </td>\n                <td (click)=\"editEvents(organization.id);\" >\n                  {{organization.name}}\n                </td>\n                <td>\n                  <button class=\"btn btn-primary btn-sm\" (click)=\"editOrganization(organization.id)\" title=\"Click to edit this organization\">Edit</button>\n                </td>\n                <td>\n                  <button class=\"btn btn-danger btn-sm\" (click)=\"goNewOrganization()\" title=\"Click to delete organization\">Delete</button>\n                </td>\n              </tr>\n            </tbody>\n          </table>\n          <br />\n          <button class=\"btn btn-primary btn-sm new-org-button\" (click)=\"goNewOrganization()\" title=\"Click to create new organization\">New Organization</button>\n        </div>\n      </div>\n\n    </div>\n\n    <div class=\"card\">\n      Card:4242 4242 4242 4242 <br />\n      Date: 01/20<br />\n      CVC: 289<br />\n      Zip: 92888<br />\n      <rar-stripe></rar-stripe>\n    </div>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/organize/organize.component.scss":
/***/ (function(module, exports) {

module.exports = ":host /deep/ .index-column,\n:host /deep/ .index-column-header {\n  text-align: right; }\n\n:host /deep/ .data-table .data-table-row.selected {\n  background-color: #E4EDF9; }\n\n:host /deep/ .card .form-size {\n  max-width: 70%;\n  min-width: 70%;\n  margin: auto; }\n\n.horizontal-and-vertical-centering {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-pack: center;\n      -ms-flex-pack: center;\n          justify-content: center;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center; }\n\n.etched-text {\n  text-shadow: 0 2px white;\n  font-size: 1.5rem;\n  font-weight: bold;\n  color: #b8bec5; }\n\n.org-table-item {\n  cursor: pointer; }\n\n.new-org-button {\n  max-width: 15em;\n  padding: 1em auto; }\n"

/***/ }),

/***/ "./client/app/organize/organize.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganizeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_combineLatest__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/combineLatest.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_operator_switchMap__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/switchMap.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OrganizeComponent = /** @class */ (function () {
    function OrganizeComponent(auth, toast, route, router, statesService, organizeService) {
        this.auth = auth;
        this.toast = toast;
        this.route = route;
        this.router = router;
        this.statesService = statesService;
        this.organizeService = organizeService;
        this.currentModel = {};
        this.titles = ['Id', 'Organization Name', '', ''];
        this.heading = 'You have no <i>organizations</i>.';
        this.organizations = [];
        this.isLoading = false;
        this.isEditing = false;
    }
    Object.defineProperty(OrganizeComponent.prototype, "country", {
        set: function (aCountry) {
            this.countryName = aCountry || 'usa';
        },
        enumerable: true,
        configurable: true
    });
    OrganizeComponent.prototype.ngOnInit = function () {
        var organizations = this.route.snapshot.data
            .organizations;
        this.organizations = __WEBPACK_IMPORTED_MODULE_4_lodash__["isArray"](organizations) ? organizations : [];
        this.setOrganizeMode();
    };
    OrganizeComponent.prototype.setOrganizeMode = function () {
        this.currentModel = {};
        this.isEditing = false;
        this.setHeadingTitle();
    };
    OrganizeComponent.prototype.setEditMode = function (model) {
        this.currentModel = __WEBPACK_IMPORTED_MODULE_4_lodash__["cloneDeep"](model);
        this.isEditing = true;
        this.setHeadingTitle();
    };
    OrganizeComponent.prototype.modelHasId = function (model) {
        return __WEBPACK_IMPORTED_MODULE_4_lodash__["has"](model, 'id') && Number(model.id) > 0;
    };
    OrganizeComponent.prototype.getSubmitText = function (hasId) {
        return hasId ? 'Edit Organization' : 'Create Organization';
    };
    OrganizeComponent.prototype.setHeadingTitle = function () {
        if (this.isEditing) {
            var hasId = this.modelHasId(this.currentModel);
            this.heading = this.getSubmitText(hasId);
        }
        else {
            if (this.organizations.length > 0) {
                this.heading = 'Available Organizations';
            }
            else {
                this.heading = 'You have no <i>organizations</i>.';
            }
        }
    };
    OrganizeComponent.prototype.goNewOrganization = function () {
        this.setEditMode({});
    };
    OrganizeComponent.prototype.editOrganization = function (orgId) {
        var _this = this;
        var currentModel = __WEBPACK_IMPORTED_MODULE_4_lodash__["find"](this.organizations, function (organization) { return organization.id == orgId; });
        if (currentModel) {
            this.organizeService
                .getOrgAddresses(orgId)
                .combineLatest(this.organizeService.getOrgPhones(orgId))
                .take(1)
                .map(function (_a) {
                var addresses = _a[0], phones = _a[1];
                return [__WEBPACK_IMPORTED_MODULE_4_lodash__["head"](addresses), __WEBPACK_IMPORTED_MODULE_4_lodash__["head"](phones)];
            })
                .map(function (_a) {
                var addresses = _a[0], phones = _a[1];
                return [addresses['addresses'], phones['phones']];
            })
                .subscribe(function (_a) {
                var addresses = _a[0], phones = _a[1];
                currentModel = __WEBPACK_IMPORTED_MODULE_4_lodash__["cloneDeep"](currentModel);
                currentModel = Object.assign({}, currentModel, {
                    addresses: addresses,
                    phones: phones
                });
                _this.setEditMode(currentModel);
            });
        }
    };
    OrganizeComponent.prototype.editEvents = function (org_id) {
        this.router.navigate(['/organizer/events/' + org_id]);
    };
    OrganizeComponent.prototype.getOrganizations = function (user_id) {
        var _this = this;
        user_id = user_id || this.auth.currentUser.id;
        this.organizeService.getUserOrganization(user_id).subscribe(function (profile) {
            _this.organizations = profile.organizations;
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile', _this.auth.loggedIn);
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile', _this.auth.loggedIn);
            }
        }, function () {
            _this.setOrganizeMode();
            _this.isLoading = false;
            if (_this.organizations.length === 0) {
                _this.setOrganizeMode();
            }
        });
    };
    OrganizeComponent.prototype.submitOrganization = function (model) {
        if (__WEBPACK_IMPORTED_MODULE_4_lodash__["isNil"](model.id) || !model.id) {
            this.submitNewOrganization(model);
        }
        else {
            this.submitUpdateOrganization(model);
            this.setOrganizeMode();
        }
    };
    OrganizeComponent.prototype.submitNewOrganization = function (model) {
        var _this = this;
        this.isLoading = true;
        this.organizeService
            .createOrganization({
            name: model.name
        })
            .switchMap(function (organization) {
            var org_id = organization.id;
            return _this.organizeService
                .bulkCreateAddresses(model.addresses, org_id)
                .combineLatest(_this.organizeService.bulkCreatePhones(model.phones, org_id));
        })
            .subscribe(function (_a) {
            var addresses = _a[0], phones = _a[1];
            console.log('it worked');
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile', _this.auth.loggedIn);
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile', _this.auth.loggedIn);
            }
        }, function () {
            _this.getOrganizations();
        });
    };
    OrganizeComponent.prototype.updatedPhones = function (newPhones, oldPhones) {
        return this.updatedItems(newPhones, oldPhones);
    };
    OrganizeComponent.prototype.updatedAddresses = function (newAddresses, oldAddresses) {
        return this.updatedItems(newAddresses, oldAddresses);
    };
    OrganizeComponent.prototype.updatedItems = function (newItems, oldItems) {
        return __WEBPACK_IMPORTED_MODULE_4_lodash__(newItems)
            .filter(function (newItem) {
            var item = __WEBPACK_IMPORTED_MODULE_4_lodash__["find"](oldItems, function (oldItem) { return oldItem.id === newItem.id; });
            return item ? true : false;
        })
            .filter(function (item) { return !__WEBPACK_IMPORTED_MODULE_4_lodash__["isNil"](item.id); })
            .value();
    };
    OrganizeComponent.prototype.deletedPhones = function (newPhones, oldPhones) {
        return this.deleteItems(newPhones, oldPhones);
    };
    OrganizeComponent.prototype.deletedAddresses = function (newAddresses, oldAddresses) {
        return this.deleteItems(newAddresses, oldAddresses);
    };
    OrganizeComponent.prototype.deleteItems = function (newItems, oldItems) {
        return __WEBPACK_IMPORTED_MODULE_4_lodash__(newItems)
            .filter(function (newItem) {
            return !__WEBPACK_IMPORTED_MODULE_4_lodash__["some"](oldItems, function (oldItem) {
                return oldItem.id === newItem.id;
            });
        })
            .filter(function (item) { return !__WEBPACK_IMPORTED_MODULE_4_lodash__["isNil"](item.id); })
            .value();
    };
    OrganizeComponent.prototype.submitUpdateOrganization = function (model) {
        var _this = this;
        var newPhones = __WEBPACK_IMPORTED_MODULE_4_lodash__["filter"](model.phones, function (phone) {
            return __WEBPACK_IMPORTED_MODULE_4_lodash__["isNil"](phone.id);
        });
        var newAddresses = __WEBPACK_IMPORTED_MODULE_4_lodash__["filter"](model.addresses, function (address) { return __WEBPACK_IMPORTED_MODULE_4_lodash__["isNil"](address.id); });
        var deletedPhones = this.deletedPhones(model.phones, this.currentModel.phones);
        var deletedAddresses = this.deletedAddresses(model.addresses, this.currentModel.addresses);
        var updatedPhones = this.updatedPhones(model.phones, this.currentModel.phones);
        var updatedAddresses = this.updatedAddresses(model.addresses, this.currentModel.addresses);
        var org_id = model.id;
        this.isLoading = true;
        this.organizeService
            .updateOrganization({
            name: model.name
        }, org_id)
            .switchMap(function (organization) {
            return _this.organizeService
                .bulkCreateAddresses(newAddresses, org_id)
                .combineLatest(_this.organizeService.bulkCreatePhones(newPhones, org_id));
        })
            .switchMap(function (_a) {
            var addresses = _a[0], phones = _a[1];
            return _this.organizeService
                .bulkUpdateAddresses(updatedAddresses, org_id)
                .combineLatest(_this.organizeService.bulkUpdatePhones(updatedPhones, org_id));
        })
            .subscribe(function (_a) {
            var addresses = _a[0], phones = _a[1];
            console.log('submitUpdateOrganization worked');
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                console.log('A client-side or network error occurred for the Profile', _this.auth.loggedIn);
            }
            else {
                console.log('The backend returned an unsuccessful response code for the profile', _this.auth.loggedIn);
            }
        }, function () {
            _this.getOrganizations();
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], OrganizeComponent.prototype, "country", null);
    OrganizeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rar-organize',
            template: __webpack_require__("./client/app/organize/organize.component.html"),
            styles: [__webpack_require__("./client/app/organize/organize.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_3__services_index__["d" /* StatesService */],
            __WEBPACK_IMPORTED_MODULE_3__services_index__["b" /* OrganizeService */]])
    ], OrganizeComponent);
    return OrganizeComponent;
}());



/***/ }),

/***/ "./client/app/organize/stripe/stripe.component.html":
/***/ (function(module, exports) {

module.exports = "<form #checkout=\"ngForm\" (ngSubmit)=\"onSubmit(checkout)\" class=\"checkout\">\n  <div class=\"form-row\">\n    <label for=\"card-info\">Stripe Payment</label>\n    <div id=\"card-info\" #cardInfo></div>\n\n    <div id=\"card-errors\" role=\"alert\" *ngIf=\"error\">{{ error }}</div>\n  </div>\n\n  <button type=\"submit\">Pay $7.77</button>\n</form>"

/***/ }),

/***/ "./client/app/organize/stripe/stripe.component.scss":
/***/ (function(module, exports) {

module.exports = "form.checkout {\n  max-width: 500px;\n  margin: 2rem auto;\n  text-align: center;\n  border: 2px solid #eee;\n  border-radius: 8px;\n  padding: 1rem 2rem;\n  background: white;\n  font-family: monospace;\n  color: #525252;\n  font-size: 1.1rem; }\n\nform.checkout button {\n  padding: 0.5rem 1rem;\n  color: white;\n  background: coral;\n  border: none;\n  border-radius: 4px;\n  margin-top: 1rem; }\n\nform.checkout button:active {\n  background: #a54c2b; }\n\n.StripeElement {\n  margin: 1rem 0 1rem;\n  background-color: white;\n  padding: 8px 12px;\n  border-radius: 4px;\n  border: 1px solid transparent;\n  -webkit-box-shadow: 0 1px 3px 0 #e6ebf1;\n          box-shadow: 0 1px 3px 0 #e6ebf1;\n  -webkit-transition: box-shadow 150ms ease;\n  -webkit-transition: -webkit-box-shadow 150ms ease;\n  transition: -webkit-box-shadow 150ms ease;\n  transition: box-shadow 150ms ease;\n  transition: box-shadow 150ms ease, -webkit-box-shadow 150ms ease; }\n\n.StripeElement--focus {\n  -webkit-box-shadow: 0 1px 3px 0 #cfd7df;\n          box-shadow: 0 1px 3px 0 #cfd7df; }\n\n.StripeElement--invalid {\n  border-color: #fa755a; }\n\n.StripeElement--webkit-autofill {\n  background-color: #fefde5 !important; }\n\n#card-info {\n  min-width: 100%; }\n\nlabel {\n  width: 100%; }\n"

/***/ }),

/***/ "./client/app/organize/stripe/stripe.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StripeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var StripeComponent = /** @class */ (function () {
    function StripeComponent(cd, organizeService) {
        this.cd = cd;
        this.organizeService = organizeService;
        this.cardHandler = this.onChange.bind(this);
    }
    StripeComponent.prototype.ngAfterViewInit = function () {
        this.card = elements.create('card');
        this.card.mount(this.cardInfo.nativeElement);
        this.card.addEventListener('change', this.cardHandler);
    };
    StripeComponent.prototype.ngOnDestroy = function () {
        this.card.removeEventListener('change', this.cardHandler);
        this.card.destroy();
    };
    StripeComponent.prototype.onChange = function (_a) {
        var error = _a.error;
        if (error) {
            this.error = error.message;
        }
        else {
            this.error = null;
        }
        this.cd.detectChanges();
    };
    StripeComponent.prototype.onSubmit = function (form) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                stripe
                    .createToken(this.card, {
                    country: 'US',
                    currency: 'usd'
                })
                    .then(function (result) {
                    if (!__WEBPACK_IMPORTED_MODULE_2_lodash__["has"](result, 'error')) {
                        console.log('result:', result);
                        _this.makeStripePayment(result.token);
                    }
                    else {
                        console.log('failed payment');
                    }
                })
                    .catch(function (err) {
                    console.log('error processing card 1:', err);
                    _this.errorOut(err);
                });
                return [2 /*return*/];
            });
        });
    };
    StripeComponent.prototype.makeStripePayment = function (token) {
        var _this = this;
        return this.organizeService.makeStripePayment(1, token).subscribe(function (success) {
            console.log('success:', success);
        }, function (err) {
            console.log('error processing card2:', err);
            _this.errorOut(err);
        });
    };
    StripeComponent.prototype.errorOut = function (err) {
        if (__WEBPACK_IMPORTED_MODULE_2_lodash__["has"](err, 'error.message.message')) {
            this.error = err.error.message.message;
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('cardInfo'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ElementRef"])
    ], StripeComponent.prototype, "cardInfo", void 0);
    StripeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'rar-stripe',
            template: __webpack_require__("./client/app/organize/stripe/stripe.component.html"),
            styles: [__webpack_require__("./client/app/organize/stripe/stripe.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["ChangeDetectorRef"],
            __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* OrganizeService */]])
    ], StripeComponent);
    return StripeComponent;
}());



/***/ }),

/***/ "./client/app/providers/Organizations.resolver.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganizationsResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("./node_modules/rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_of__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/of.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_observable_empty__ = __webpack_require__("./node_modules/rxjs/_esm5/add/observable/empty.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var OrganizationsResolver = /** @class */ (function () {
    function OrganizationsResolver(auth, organizeService) {
        this.auth = auth;
        this.organizeService = organizeService;
    }
    OrganizationsResolver.prototype.resolve = function (route) {
        var user_id = route.paramMap.get('id') || this.auth.currentUser.id;
        return this.organizeService
            .getUserOrganization(user_id)
            .catch(function () {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].empty();
        })
            .map(function (profile) {
            return profile.organizations;
        });
    };
    OrganizationsResolver = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* OrganizeService */]])
    ], OrganizationsResolver);
    return OrganizationsResolver;
}());



/***/ }),

/***/ "./client/app/providers/sports.resolver.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SportsResolver; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__("./client/app/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var SportsResolver = /** @class */ (function () {
    function SportsResolver(organizeService) {
        this.organizeService = organizeService;
    }
    SportsResolver.prototype.resolve = function () {
        return this.organizeService.getSports();
    };
    SportsResolver = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_index__["b" /* OrganizeService */]])
    ], SportsResolver);
    return SportsResolver;
}());



/***/ }),

/***/ "./client/app/providers/token.interceptor.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenInterceptor; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_token_service__ = __webpack_require__("./client/app/services/token.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//https://medium.com/@ryanchenkie_40935/angular-authentication-using-the-http-client-and-http-interceptors-2f9d1540eb8


var TokenInterceptor = /** @class */ (function () {
    function TokenInterceptor(tokenService) {
        this.tokenService = tokenService;
    }
    TokenInterceptor.prototype.intercept = function (request, next) {
        var newRequest = request.clone({
            headers: this.tokenService.getHeaders()
        });
        return next.handle(newRequest);
    };
    TokenInterceptor = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_token_service__["a" /* TokenService */]])
    ], TokenInterceptor);
    return TokenInterceptor;
}());



/***/ }),

/***/ "./client/app/referee/referee.component.html":
/***/ (function(module, exports) {

module.exports = "<div style=\"background-color: #4F4F6B\">\n  <div class=\"row\">\n    <div class=\"col-sm-3\">\n      <app-leftmenu></app-leftmenu>\n    </div>\n    <div class=\"col-sm-9\">\n      <div class=\"main-wrapper\">\n        <app-loading [condition]=\"isLoading\"></app-loading>\n\n        <app-toast [message]=\"toast.message\"></app-toast>\n        <div class=\"card col-sm-12\">\n          <div class=\"card\" *ngIf=\"!isLoading\">\n            <!--<div class=\"card\">-->\n            <h4 class=\"card-header\">Registered users ({{users.length}})</h4>\n            <div class=\"card-block\">\n              <table class=\"table table-bordered table-striped\">\n                <thead class=\"thead-default\">\n                  <tr>\n                    <th>Username</th>\n                    <th>Email</th>\n                    <th>Role</th>\n                    <th>Actions</th>\n                  </tr>\n                </thead>\n                <tbody *ngIf=\"users.length === 0\">\n                  <tr>\n                    <td colspan=\"4\">There are no registered users.</td>\n                  </tr>\n                </tbody>\n                <tbody>\n                  <tr *ngFor=\"let user of users\">\n                    <td>{{user.username}}</td>\n                    <td>{{user.email}}</td>\n                    <td>{{user.role}}</td>\n                    <td>\n                      <button class=\"btn btn-sm btn-danger\" (click)=\"deleteUser(user)\" [disabled]=\"auth.currentUser.id === user._id\">\n                      <i class=\"fa fa-trash\"></i>\n                    </button>\n                    </td>\n                  </tr>\n                </tbody>\n              </table>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/referee/referee.component.scss":
/***/ (function(module, exports) {

module.exports = ".elegantshd {\n  color: #131313;\n  background-color: #e7e5e4;\n  letter-spacing: .15em;\n  text-shadow: 1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2; }\n\n.bigFont {\n  font-family: \"Avant Garde\", Avantgarde, \"Century Gothic\", CenturyGothic, \"AppleGothic\", sans-serif;\n  font-size: 40px;\n  padding: 3%;\n  text-align: center;\n  text-transform: uppercase;\n  text-rendering: optimizeLegibility;\n  font-weight: bolder; }\n"

/***/ }),

/***/ "./client/app/referee/referee.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RefereeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("./client/app/services/index.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RefereeComponent = /** @class */ (function () {
    function RefereeComponent(auth, toast, userService) {
        this.auth = auth;
        this.toast = toast;
        this.userService = userService;
        this.users = [];
        this.isLoading = true;
        this.allowEdit = false;
    }
    RefereeComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    RefereeComponent.prototype.canDeactivate = function () {
        if (!this.allowEdit) {
            return true;
        }
    };
    RefereeComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (res) { return _this.callSuccess(res); }, function (err) {
            _this.callFailure(err);
        });
    };
    RefereeComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.userService
            .deleteUser(user)
            .subscribe(function (data) { return _this.toast.setMessage('user deleted successfully.', 'success'); }, function (error) { return console.log(error); }, function () { return _this.getUsers(); });
    };
    RefereeComponent.prototype.callSuccess = function (res) {
        this.toast.setMessage(res.message, 'success');
        this.users = res;
        this.isLoading = false;
        console.log('this.users: ', this.users);
    };
    RefereeComponent.prototype.callFailure = function (err, message) {
        if (message === void 0) { message = 'An error occurred'; }
        if (err.error instanceof Error) {
            // A client-side or network error occurred. Handle it accordingly.
            this.toast.setMessage(message, 'danger');
        }
        else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
        }
        console.log('Error: ' + err.error + ' Status: ' + err.statusText);
    };
    RefereeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-referee',
            template: __webpack_require__("./client/app/referee/referee.component.html"),
            styles: [__webpack_require__("./client/app/referee/referee.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__services_index__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["e" /* UserService */]])
    ], RefereeComponent);
    return RefereeComponent;
}());



/***/ }),

/***/ "./client/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"row\">\n  <div class=\"col-12\">\n    <div class=\"card\">\n      <div class=\"card form-size\">\n        <form [formGroup]=\"form\" (ngSubmit)=\"register(model)\">\n          <formly-form [model]=\"model\" [fields]=\"fields\" [options]=\"options\" [form]=\"form\">\n            <button type=\"submit\" class=\"btn btn-primary btn-sm\" [disabled]=\"form.invalid\">Register</button>\n            <br /><br />\n            <re-captcha\n              (resolved)=\"resolvedRecaptcha($event)\"\n              type=\"image\"\n              siteKey=\"6Ldk6k0UAAAAAOGEPK-6NLb8Vc_kjsTIvb3lm_eb\"\n            ></re-captcha>\n          </formly-form>\n\n        </form>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/register/register.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






//https://www.npmjs.com/package/ng-recaptcha
var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(router, toast, userService) {
        this.router = router;
        this.toast = toast;
        this.userService = userService;
        this.form = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormGroup"]({});
        this.model = {};
        this.options = {};
    }
    RegisterComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.fields = [
            {
                key: 'firstname',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Firstname',
                    placeholder: 'Firstname',
                    required: true
                }
            },
            {
                key: 'lastname',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Lastname',
                    placeholder: 'Lastname',
                    required: true
                }
            },
            {
                key: 'email',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Email address',
                    placeholder: 'Enter email',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'repeatemail',
                type: 'input',
                templateOptions: {
                    type: 'email',
                    label: 'Repeat email address',
                    placeholder: 'Re-enter email',
                    required: true
                },
                validators: {
                    fieldMatch: {
                        expression: function (control) { return control.value === _this.model.email; },
                        message: 'Email address Not Matching'
                    }
                },
                expressionProperties: {
                    'templateOptions.disabled': function () { return !_this.form.get('email').valid; }
                }
            },
            {
                key: 'password',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'Password',
                    placeholder: 'Enter password',
                    required: true,
                    minLength: 5
                }
            },
            {
                key: 'repeatpassword',
                type: 'input',
                templateOptions: {
                    type: 'password',
                    label: 'Repeat password',
                    placeholder: 'Repeat password',
                    required: true
                },
                validators: {
                    fieldMatch: {
                        expression: function (control) { return control.value === _this.model.password; },
                        message: 'Password Not Matching'
                    }
                },
                expressionProperties: {
                    'templateOptions.disabled': function () { return !_this.form.get('password').valid; }
                }
            },
            {
                key: 'phone',
                type: 'input',
                templateOptions: {
                    type: 'text',
                    label: 'Phone number',
                    placeholder: 'Phone number',
                    required: true
                }
            }
        ];
    };
    RegisterComponent.prototype.resolvedRecaptcha = function (captchaResponse) {
        console.log("Resolved captcha with response " + captchaResponse + ":");
        this.captchaResponse = captchaResponse;
    };
    RegisterComponent.prototype.register = function (user) {
        var _this = this;
        if (__WEBPACK_IMPORTED_MODULE_5_lodash__["isNil"](this.captchaResponse) || this.captchaResponse.length === 0) {
            this.toast.setMessage('Recaptcha is required.', 'danger');
            return;
        }
        if (user.email !== user.repeatemail) {
            this.toast.setMessage('Emails do not match', 'danger');
            return;
        }
        else if (user.password !== user.repeatpassword) {
            this.toast.setMessage('Passwords do not match', 'danger');
            return;
        }
        user.captcha = this.captchaResponse;
        this.userService.register(user).subscribe(function (res) {
            _this.toast.setMessage(res.message, 'success');
            _this.router.navigate(['/login']);
        }, function (err) {
            if (err.error instanceof Error) {
                // A client-side or network error occurred. Handle it accordingly.
                _this.toast.setMessage('This email address already exists', 'danger');
            }
            else {
                // The backend returned an unsuccessful response code.
                // The response body may contain clues as to what went wrong,
            }
        });
    };
    RegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            moduleId: module.i,
            selector: 'app-register',
            template: __webpack_require__("./client/app/register/register.component.html"),
            styles: [__webpack_require__("./client/app/register/register.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./client/app/resetpassword/resetpassword.component.html":
/***/ (function(module, exports) {

module.exports = "<app-toast [message]=\"toast.message\"></app-toast>\n<div class=\"card col-sm-12\">\n<div class=\"card\">\n  <h4 class=\"card-header elegantshd bigFont\">Reset Password</h4>\n  <div class=\"card-block\">\n    <form [formGroup]=\"resetPasswordForm\" (ngSubmit)=\"resetPassword()\">\n\n      <div class=\"input-group\" [ngClass]=\"setClassPassword1()\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n        <input class=\"form-control\" type=\"password\" [value]=\"password1\" name=\"password1\" formControlName=\"password1\" placeholder=\"Password\">\n      </div>\n      \n\n      <div class=\"input-group\" [ngClass]=\"setClassPassword2()\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n        <input class=\"form-control\" type=\"password\" [value]=\"password2\" name=\"password2\" formControlName=\"password2\" placeholder=\"Repeat password\">\n      </div>\n      \n       <input type=\"hidden\" [value]=\"passcode\" name=\"passcode\" formControlName=\"passcode\">\n\n      <button class=\"btn btn-primary btn-sm\" type=\"submit\" [disabled]=\"!resetPasswordForm.valid\"><i class=\"fa fa-sign-in\"></i>Reset Password</button>\n\n    </form>\n    \n  </div>\n</div>\n</div>"

/***/ }),

/***/ "./client/app/resetpassword/resetpassword.component.scss":
/***/ (function(module, exports) {

module.exports = ".input-group {\n  margin-bottom: 8px; }\n"

/***/ }),

/***/ "./client/app/resetpassword/resetpassword.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ResetPasswordComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ResetPasswordComponent = /** @class */ (function () {
    function ResetPasswordComponent(route, auth, formBuilder, router, toast) {
        this.route = route;
        this.auth = auth;
        this.formBuilder = formBuilder;
        this.router = router;
        this.toast = toast;
        this.password1 = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)
        ]);
        this.password2 = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('', [
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["Validators"].minLength(6)
        ]);
        this.passcode = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('');
    }
    ResetPasswordComponent.prototype.ngOnInit = function () {
        var hasPasscode;
        var passcodeParam;
        if (this.auth.loggedIn) {
            this.router.navigate(['/']);
        }
        this.route.params.subscribe(function (params) {
            passcodeParam = params['passcode'];
        });
        hasPasscode = passcodeParam != undefined;
        if (hasPasscode) {
            this.passcode = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"](String(passcodeParam));
        }
        else {
            this.passcode = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormControl"]('');
        }
        this.resetPasswordForm = this.formBuilder.group({
            password1: this.password1,
            password2: this.password2,
            passcode: this.passcode
        });
    };
    ResetPasswordComponent.prototype.setClassPassword1 = function () {
        return { 'has-danger': !this.password1.pristine && !this.password1.valid };
    };
    ResetPasswordComponent.prototype.setClassPassword2 = function () {
        return { 'has-danger': !this.password2.pristine && !this.password2.valid };
    };
    ResetPasswordComponent.prototype.resetPassword = function () {
        var _this = this;
        this.auth.resetpassword(this.resetPasswordForm.value).subscribe(function (res) {
            var user = res.user;
        }, function (error) {
            _this.toast.setMessage('Failed to reset password!', 'danger');
        });
    };
    ResetPasswordComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-reset-password',
            template: __webpack_require__("./client/app/resetpassword/resetpassword.component.html"),
            styles: [__webpack_require__("./client/app/resetpassword/resetpassword.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */],
            __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */]])
    ], ResetPasswordComponent);
    return ResetPasswordComponent;
}());



/***/ }),

/***/ "./client/app/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_guard_login_service__ = __webpack_require__("./client/app/services/auth-guard-login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_guard_admin_service__ = __webpack_require__("./client/app/services/auth-guard-admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__about_about_component__ = __webpack_require__("./client/app/about/about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__account_account_component__ = __webpack_require__("./client/app/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__admin_admin_component__ = __webpack_require__("./client/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__group_blog_blog_component__ = __webpack_require__("./client/app/group/blog/blog.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__group_careers_careers_component__ = __webpack_require__("./client/app/group/careers/careers.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__group_contactus_contactus_component__ = __webpack_require__("./client/app/group/contactus/contactus.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__account_profile_deactivated_deactivated_component__ = __webpack_require__("./client/app/account/profile/deactivated/deactivated.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__account_profile_edit_profile_edit_profile_component__ = __webpack_require__("./client/app/account/profile/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__organize_events_events_component__ = __webpack_require__("./client/app/organize/events/events.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__group_faq_faq_component__ = __webpack_require__("./client/app/group/faq/faq.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_home_component__ = __webpack_require__("./client/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__home_how_it_works_how_it_works_component__ = __webpack_require__("./client/app/home/how-it-works/how-it-works.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__login_login_component__ = __webpack_require__("./client/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__logout_logout_component__ = __webpack_require__("./client/app/logout/logout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__not_found_not_found_component__ = __webpack_require__("./client/app/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__group_partners_partners_component__ = __webpack_require__("./client/app/group/partners/partners.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__account_profile_passwordreset_passwordreset_component__ = __webpack_require__("./client/app/account/profile/passwordreset/passwordreset.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__home_pricing_pricing_component__ = __webpack_require__("./client/app/home/pricing/pricing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__account_profile_profile_component__ = __webpack_require__("./client/app/account/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__referee_referee_component__ = __webpack_require__("./client/app/referee/referee.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__register_register_component__ = __webpack_require__("./client/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__resetpassword_resetpassword_component__ = __webpack_require__("./client/app/resetpassword/resetpassword.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__account_profile_standby_standby_component__ = __webpack_require__("./client/app/account/profile/standby/standby.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__account_profile_suspended_suspended_component__ = __webpack_require__("./client/app/account/profile/suspended/suspended.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__group_terms_and_conditions_terms_and_conditions_component__ = __webpack_require__("./client/app/group/terms-and-conditions/terms-and-conditions.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__account_profile_reset_reset_component__ = __webpack_require__("./client/app/account/profile/reset/reset.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__services_can_deactivate_guard_service__ = __webpack_require__("./client/app/services/can-deactivate-guard.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__account_schedule_schedule_component__ = __webpack_require__("./client/app/account/schedule/schedule.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__organize_organize_component__ = __webpack_require__("./client/app/organize/organize.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__games_games_component__ = __webpack_require__("./client/app/games/games.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__providers_Organizations_resolver__ = __webpack_require__("./client/app/providers/Organizations.resolver.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__providers_sports_resolver__ = __webpack_require__("./client/app/providers/sports.resolver.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




































var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_14__home_home_component__["a" /* HomeComponent */] },
    { path: 'how-it-works', component: __WEBPACK_IMPORTED_MODULE_15__home_how_it_works_how_it_works_component__["a" /* HowItWorksComponent */] },
    { path: 'referee', component: __WEBPACK_IMPORTED_MODULE_23__referee_referee_component__["a" /* RefereeComponent */] },
    { path: 'career', component: __WEBPACK_IMPORTED_MODULE_8__group_careers_careers_component__["a" /* CareersComponent */] },
    { path: 'faq', component: __WEBPACK_IMPORTED_MODULE_13__group_faq_faq_component__["a" /* FaqComponent */] },
    { path: 'blog', component: __WEBPACK_IMPORTED_MODULE_7__group_blog_blog_component__["a" /* BlogComponent */] },
    { path: 'contact', component: __WEBPACK_IMPORTED_MODULE_9__group_contactus_contactus_component__["a" /* ContactUsComponent */] },
    { path: 'pricing', component: __WEBPACK_IMPORTED_MODULE_21__home_pricing_pricing_component__["a" /* PricingComponent */] },
    { path: 'partners', component: __WEBPACK_IMPORTED_MODULE_19__group_partners_partners_component__["a" /* PartnersComponent */] },
    { path: 'terms-and-conditions', component: __WEBPACK_IMPORTED_MODULE_28__group_terms_and_conditions_terms_and_conditions_component__["a" /* TermsAndConditionsComponent */] },
    { path: 'about', component: __WEBPACK_IMPORTED_MODULE_4__about_about_component__["a" /* AboutComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_24__register_register_component__["a" /* RegisterComponent */] },
    { path: 'resetpassword', component: __WEBPACK_IMPORTED_MODULE_25__resetpassword_resetpassword_component__["a" /* ResetPasswordComponent */] },
    { path: 'resetpassword/:passcode', component: __WEBPACK_IMPORTED_MODULE_25__resetpassword_resetpassword_component__["a" /* ResetPasswordComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_16__login_login_component__["a" /* LoginComponent */] },
    { path: 'logout', component: __WEBPACK_IMPORTED_MODULE_17__logout_logout_component__["a" /* LogoutComponent */] },
    { path: 'passwordreset', component: __WEBPACK_IMPORTED_MODULE_20__account_profile_passwordreset_passwordreset_component__["a" /* PasswordresetComponent */] },
    { path: 'reset', component: __WEBPACK_IMPORTED_MODULE_29__account_profile_reset_reset_component__["a" /* ResetComponent */] },
    {
        path: 'account/:id',
        component: __WEBPACK_IMPORTED_MODULE_5__account_account_component__["a" /* AccountComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_auth_guard_login_service__["a" /* AuthGuardLogin */]]
    },
    {
        path: 'account/:id/schedule',
        component: __WEBPACK_IMPORTED_MODULE_31__account_schedule_schedule_component__["a" /* ScheduleComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_auth_guard_login_service__["a" /* AuthGuardLogin */]]
    },
    {
        path: 'organizer/:id',
        component: __WEBPACK_IMPORTED_MODULE_32__organize_organize_component__["a" /* OrganizeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_auth_guard_login_service__["a" /* AuthGuardLogin */]],
        resolve: {
            organizations: __WEBPACK_IMPORTED_MODULE_34__providers_Organizations_resolver__["a" /* OrganizationsResolver */],
            sports: __WEBPACK_IMPORTED_MODULE_35__providers_sports_resolver__["a" /* SportsResolver */]
        }
    },
    {
        path: 'organizer/events/:id',
        component: __WEBPACK_IMPORTED_MODULE_12__organize_events_events_component__["a" /* EventsComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_2__services_auth_guard_login_service__["a" /* AuthGuardLogin */]],
        resolve: {
            sports: __WEBPACK_IMPORTED_MODULE_35__providers_sports_resolver__["a" /* SportsResolver */]
        }
    },
    {
        path: 'account/profile/:id',
        component: __WEBPACK_IMPORTED_MODULE_22__account_profile_profile_component__["a" /* ProfileComponent */],
        canDeactivate: [__WEBPACK_IMPORTED_MODULE_30__services_can_deactivate_guard_service__["a" /* CanDeactivateGuardService */]],
        children: [{ path: 'edit-profile', component: __WEBPACK_IMPORTED_MODULE_11__account_profile_edit_profile_edit_profile_component__["a" /* EditProfileComponent */] }]
    },
    { path: 'account/standby/:id', component: __WEBPACK_IMPORTED_MODULE_26__account_profile_standby_standby_component__["a" /* StandbyComponent */] },
    { path: 'account/suspended/:id', component: __WEBPACK_IMPORTED_MODULE_27__account_profile_suspended_suspended_component__["a" /* SuspendedComponent */] },
    { path: 'account/deactivated/:id', component: __WEBPACK_IMPORTED_MODULE_10__account_profile_deactivated_deactivated_component__["a" /* DeactivatedComponent */] },
    {
        path: 'account/admin/:id',
        component: __WEBPACK_IMPORTED_MODULE_6__admin_admin_component__["a" /* AdminComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_3__services_auth_guard_admin_service__["a" /* AuthGuardAdmin */]],
        canDeactivate: [__WEBPACK_IMPORTED_MODULE_30__services_can_deactivate_guard_service__["a" /* CanDeactivateGuardService */]]
    },
    { path: 'officials', component: __WEBPACK_IMPORTED_MODULE_23__referee_referee_component__["a" /* RefereeComponent */] },
    { path: 'games', component: __WEBPACK_IMPORTED_MODULE_33__games_games_component__["a" /* GamesComponent */] },
    { path: 'notfound', component: __WEBPACK_IMPORTED_MODULE_18__not_found_not_found_component__["a" /* NotFoundComponent */] },
    { path: '**', redirectTo: '/notfound' }
];
var RoutingModule = /** @class */ (function () {
    function RoutingModule() {
    }
    RoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */].forRoot(routes, { enableTracing: true } // For debugging purposes only
                )
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_34__providers_Organizations_resolver__["a" /* OrganizationsResolver */], __WEBPACK_IMPORTED_MODULE_35__providers_sports_resolver__["a" /* SportsResolver */]],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* RouterModule */]]
        })
    ], RoutingModule);
    return RoutingModule;
}());



/***/ }),

/***/ "./client/app/services/auth-guard-admin.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardAdmin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardAdmin = /** @class */ (function () {
    function AuthGuardAdmin(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardAdmin.prototype.canActivate = function () {
        return this.auth.isAdmin;
    };
    AuthGuardAdmin = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AuthGuardAdmin);
    return AuthGuardAdmin;
}());



/***/ }),

/***/ "./client/app/services/auth-guard-login.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardLogin; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardLogin = /** @class */ (function () {
    function AuthGuardLogin(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardLogin.prototype.canActivate = function () {
        return this.auth.loggedIn;
    };
    AuthGuardLogin = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */], __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AuthGuardLogin);
    return AuthGuardLogin;
}());



/***/ }),

/***/ "./client/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__token_service__ = __webpack_require__("./client/app/services/token.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__user_service__ = __webpack_require__("./client/app/services/user.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = /** @class */ (function () {
    function AuthService(userService, tokenService, router) {
        this.userService = userService;
        this.tokenService = tokenService;
        this.router = router;
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = {};
        var user = localStorage.getItem('user');
        if (user) {
            this.setCurrentUser(JSON.parse(user));
        }
    }
    AuthService.prototype.resetState = function () {
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = {};
    };
    AuthService.prototype.login = function (emailAndPassword) {
        var _this = this;
        return this.userService
            .login(emailAndPassword)
            .take(1)
            .map(function (login) {
            var newUser = login.user;
            _this.setCurrentUser({
                user: newUser,
                token: login.token
            });
            // Organizer
            switch (newUser.can_organize + ' ' + newUser.status) {
                case 'pending standby':
                    // The organizer has not yet completed the profile
                    // this.router.navigate(['user/' + res.user.id + '/edit-profile']);
                    break;
                case 'yes active':
                    // The organizer is active and ready to go
                    // this.router.navigate(['user/' + res.user.id + '/account']);
                    break;
                case 'yes locked':
                    // The Organizer account is suspended due to failed login attempts
                    // Kill his session
                    _this.resetState();
                    break;
                case 'no banned':
                    // The Organizer account is disabled by the admin
                    // Kill his session
                    _this.resetState();
                    break;
            }
            // Referee
            switch (newUser.can_referee + ' ' + newUser.status) {
                case 'pending active':
                    // The referee account has been activated by the admin. Now he needs to complete his profile
                    // this.router.navigate(['user/' + res.user.id + '/edit-profile']);
                    break;
                case 'pending in_progress':
                    // The referee account has not yet been activated by the admin. Still in Standby
                    // Kill his session
                    _this.resetState();
                    break;
                case 'yes active':
                    // The referee is active and ready to go
                    // this.router.navigate(['user/' + res.user.id + '/account']);
                    break;
                case 'yes locked':
                    // The referee account is suspended due to failed login attempts
                    // Kill his session
                    _this.resetState();
                    break;
                case 'no banned':
                    // The referee account is disabled by the admin
                    // Kill his session
                    _this.resetState();
                    break;
            }
            return login;
        }, function (error) { return console.log('Error MSG: ', error); });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
        this.resetState();
        this.setCurrentUser(null);
        this.router.navigate(['/']);
    };
    AuthService.prototype.resetpassword = function (payload) {
        return this.userService
            .resetpassword(payload)
            .take(1)
            .map(function (res) { return res.json(); });
    };
    AuthService.prototype.setCurrentUser = function (setter) {
        this.resetState();
        this.tokenService.setOptions(null);
        localStorage.removeItem('user');
        if (setter) {
            var newUser = setter.user;
            var authorization = newUser.authorization;
            this.loggedIn = true;
            this.currentUser = newUser;
            // ============================
            this.currentUser.email = setter.user.email;
            this.currentUser.id = setter.user.id;
            this.currentUser.firstname = setter.user.firstname;
            this.currentUser.lastname = setter.user.lastname;
            if (setter.user.can_organize === 'yes') {
                this.currentUser.role = 'Organizer';
            }
            if (setter.user.can_referee === 'yes') {
                this.currentUser.role = 'Referee';
            }
            // ============================
            this.isAdmin = authorization === 1 || authorization === 2;
            this.tokenService.setOptions(setter.token);
            localStorage.setItem('user', JSON.stringify(setter));
        }
    };
    AuthService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__user_service__["a" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_2__token_service__["a" /* TokenService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]])
    ], AuthService);
    return AuthService;
}());



/***/ }),

/***/ "./client/app/services/can-deactivate-guard.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CanDeactivateGuardService; });
var CanDeactivateGuardService = /** @class */ (function () {
    function CanDeactivateGuardService() {
    }
    CanDeactivateGuardService.prototype.canDeactivate = function (component, currentRoute, currentState, nextState) {
        return component.canDeactivate();
    };
    return CanDeactivateGuardService;
}());



/***/ }),

/***/ "./client/app/services/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__auth_guard_admin_service__ = __webpack_require__("./client/app/services/auth-guard-admin.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__auth_guard_login_service__ = __webpack_require__("./client/app/services/auth-guard-login.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__auth_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__can_deactivate_guard_service__ = __webpack_require__("./client/app/services/can-deactivate-guard.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__organize_service__ = __webpack_require__("./client/app/services/organize.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_4__organize_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__profile_service__ = __webpack_require__("./client/app/services/profile.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_5__profile_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__states_service__ = __webpack_require__("./client/app/services/states.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_6__states_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__token_service__ = __webpack_require__("./client/app/services/token.service.ts");
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_8__user_service__["a"]; });











/***/ }),

/***/ "./client/app/services/organize.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganizeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_do__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/do.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_take__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/take.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var OrganizeService = /** @class */ (function () {
    function OrganizeService(http) {
        this.http = http;
        this.addresses = [];
        this.phones = [];
        this.sports = [];
    }
    OrganizeService.prototype.getData = function () {
        return __WEBPACK_IMPORTED_MODULE_6_lodash__["cloneDeep"](this.data);
    };
    OrganizeService.prototype.getAddresses = function () {
        return __WEBPACK_IMPORTED_MODULE_6_lodash__["cloneDeep"](this.addresses);
    };
    OrganizeService.prototype.getPhones = function () {
        return __WEBPACK_IMPORTED_MODULE_6_lodash__["cloneDeep"](this.phones);
    };
    OrganizeService.prototype.getSports = function () {
        var _this = this;
        var ob;
        if (!__WEBPACK_IMPORTED_MODULE_6_lodash__["isArray"](this.sports) || this.sports.length === 0) {
            ob = this.http
                .get("/api/sports")
                .do(function (sports) { return (_this.sports = __WEBPACK_IMPORTED_MODULE_6_lodash__["cloneDeep"](sports)); });
        }
        else {
            var bs = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](null);
            bs.next(__WEBPACK_IMPORTED_MODULE_6_lodash__["cloneDeep"](this.sports));
            ob = bs;
        }
        return ob.take(1);
    };
    // addresses
    OrganizeService.prototype.getOrgAddresses = function (Organization_id) {
        return this.http.get("/api/organizations/" + Organization_id + "/addresses");
    };
    OrganizeService.prototype.getOrgAddress = function (org_id, add_id) {
        return this.http.get("/api/organizations/" + org_id + "/addresses/" + add_id);
    };
    // Phones
    OrganizeService.prototype.getOrgPhones = function (Organization_id) {
        return this.http.get("/api/organizations/" + Organization_id + "/phones");
    };
    OrganizeService.prototype.getOrgPhone = function (org_id, phone_id) {
        return this.http.get("/api/organizations/" + org_id + "/phones/" + phone_id);
    };
    // Create an Organization
    OrganizeService.prototype.createOrganization = function (information) {
        return this.http.post("/api/organizations", JSON.stringify(information));
    };
    OrganizeService.prototype.updateOrganization = function (information, Organization_id) {
        return this.http.put("/api/organizations/" + Organization_id, JSON.stringify(information));
    };
    OrganizeService.prototype.getAllOrganizations = function () {
        return this.http.get("/api/organizations");
    };
    OrganizeService.prototype.getOrganization = function (organization_id) {
        return this.http.get("/api/organizations/" + organization_id);
    };
    OrganizeService.prototype.getUserOrganization = function (user_id) {
        return this.http.get("/api/users/" + user_id + "/organizations");
    };
    OrganizeService.prototype.createAddress = function (newAddress, org_id) {
        return this.http.post("/api/organizations/" + org_id + "/addresses", JSON.stringify(newAddress));
    };
    OrganizeService.prototype.updateAddress = function (information, org_id, add_id) {
        return this.http.put("/api/organizations/" + org_id + "/addresses/" + add_id, JSON.stringify(information));
    };
    OrganizeService.prototype.updateAddresses = function (information, org_id) {
        return this.http.put("/api/organizations/" + org_id + "/addresses", JSON.stringify(information));
    };
    OrganizeService.prototype.createPhone = function (newPhone, org_id) {
        return this.http.post("/api/organizations/" + org_id + "/phones", JSON.stringify(newPhone));
    };
    OrganizeService.prototype.updatePhone = function (newPhone, org_id) {
        return this.http.post("/api/organizations/" + org_id + "/phones", JSON.stringify(newPhone));
    };
    //----------------------------------------------------------------------------------------------------
    OrganizeService.prototype.bulkCreate = function (_a) {
        var url = _a[0], model = _a[1], indexName = _a[2];
        return this.http.post(url, JSON.stringify(model)).map(function (res) {
            return res[indexName];
        });
    };
    OrganizeService.prototype.bulkUpdate = function (_a) {
        var url = _a[0], model = _a[1], indexName = _a[2];
        return this.http.put(url, JSON.stringify(model)).map(function (res) {
            return res[indexName];
        });
    };
    OrganizeService.prototype.bulkAddress = function (addresses, org_id) {
        var model = { addresses: addresses };
        var url = "/api/organizations/" + org_id + "/addresses/bulk";
        return [url, model, 'addresses'];
    };
    OrganizeService.prototype.bulkCreateAddresses = function (addresses, org_id) {
        return this.bulkCreate(this.bulkAddress(addresses, org_id));
    };
    OrganizeService.prototype.bulkUpdateAddresses = function (addresses, org_id) {
        return this.bulkUpdate(this.bulkAddress(addresses, org_id));
    };
    OrganizeService.prototype.bulkPhone = function (phones, org_id) {
        var model = { phones: phones };
        var url = "/api/organizations/" + org_id + "/phones/bulk";
        return [url, model, 'phones'];
    };
    OrganizeService.prototype.bulkCreatePhones = function (phones, org_id) {
        return this.bulkCreate(this.bulkPhone(phones, org_id));
    };
    OrganizeService.prototype.bulkUpdatePhones = function (phones, org_id) {
        return this.bulkUpdate(this.bulkPhone(phones, org_id));
    };
    OrganizeService.prototype.makeStripePayment = function (org_id, payload) {
        return this.http.post("/api/make_payment/" + org_id, JSON.stringify(payload));
    };
    OrganizeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], OrganizeService);
    return OrganizeService;
}());



/***/ }),

/***/ "./client/app/services/profile.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var ProfileService = /** @class */ (function () {
    function ProfileService(userService) {
        this.userService = userService;
        this.addresses = [];
        this.phones = [];
        this.areas = [];
    }
    ProfileService.prototype.getData = function () {
        return __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"](this.data);
    };
    ProfileService.prototype.getPerson = function () {
        return __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"](this.person);
    };
    ProfileService.prototype.getAddresses = function () {
        return __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"](this.addresses);
    };
    ProfileService.prototype.getAreas = function () {
        return __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"](this.areas);
    };
    ProfileService.prototype.getPhones = function () {
        return __WEBPACK_IMPORTED_MODULE_2_lodash__["cloneDeep"](this.phones);
    };
    ProfileService.prototype.getProfile = function (user_id) {
        var _this = this;
        return this.userService.getProfile(user_id).map(function (res) {
            _this.data = res;
            _this.person = res.person;
            _this.addresses = res.addresses;
            _this.phones = res.phones;
            _this.areas = res.areas;
            return res;
        });
    };
    ProfileService.prototype.createAddress = function (newAddress) {
        return this.userService.createAddress(newAddress, this.data.id);
    };
    ProfileService.prototype.updateAddress = function (newAddress) {
        return this.userService.updateAddress(newAddress, this.data.id, newAddress.id);
    };
    ProfileService.prototype.createPhone = function (newPhone) {
        return this.userService.createPhone(newPhone, this.data.id);
    };
    ProfileService.prototype.updatePhone = function (newPhone) {
        return this.userService.updatePhone(newPhone, this.data.id, newPhone.id);
    };
    ProfileService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__user_service__["a" /* UserService */]])
    ], ProfileService);
    return ProfileService;
}());



/***/ }),

/***/ "./client/app/services/states.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StatesService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var StatesService = /** @class */ (function () {
    function StatesService() {
        this.states = [
            { name: 'Alabama', abbreviation: 'AL' },
            { name: 'Alaska', abbreviation: 'AK' },
            { name: 'American Samoa', abbreviation: 'AS' },
            { name: 'Arizona', abbreviation: 'AZ' },
            { name: 'Arkansas', abbreviation: 'AR' },
            { name: 'California', abbreviation: 'CA' },
            { name: 'Colorado', abbreviation: 'CO' },
            { name: 'Connecticut', abbreviation: 'CT' },
            { name: 'Delaware', abbreviation: 'DE' },
            { name: 'District Of Columbia', abbreviation: 'DC' },
            { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
            { name: 'Florida', abbreviation: 'FL' },
            { name: 'Georgia', abbreviation: 'GA' },
            { name: 'Guam', abbreviation: 'GU' },
            { name: 'Hawaii', abbreviation: 'HI' },
            { name: 'Idaho', abbreviation: 'ID' },
            { name: 'Illinois', abbreviation: 'IL' },
            { name: 'Indiana', abbreviation: 'IN' },
            { name: 'Iowa', abbreviation: 'IA' },
            { name: 'Kansas', abbreviation: 'KS' },
            { name: 'Kentucky', abbreviation: 'KY' },
            { name: 'Louisiana', abbreviation: 'LA' },
            { name: 'Maine', abbreviation: 'ME' },
            { name: 'Marshall Islands', abbreviation: 'MH' },
            { name: 'Maryland', abbreviation: 'MD' },
            { name: 'Massachusetts', abbreviation: 'MA' },
            { name: 'Michigan', abbreviation: 'MI' },
            { name: 'Minnesota', abbreviation: 'MN' },
            { name: 'Mississippi', abbreviation: 'MS' },
            { name: 'Missouri', abbreviation: 'MO' },
            { name: 'Montana', abbreviation: 'MT' },
            { name: 'Nebraska', abbreviation: 'NE' },
            { name: 'Nevada', abbreviation: 'NV' },
            { name: 'New Hampshire', abbreviation: 'NH' },
            { name: 'New Jersey', abbreviation: 'NJ' },
            { name: 'New Mexico', abbreviation: 'NM' },
            { name: 'New York', abbreviation: 'NY' },
            { name: 'North Carolina', abbreviation: 'NC' },
            { name: 'North Dakota', abbreviation: 'ND' },
            { name: 'Northern Mariana Islands', abbreviation: 'MP' },
            { name: 'Ohio', abbreviation: 'OH' },
            { name: 'Oklahoma', abbreviation: 'OK' },
            { name: 'Oregon', abbreviation: 'OR' },
            { name: 'Palau', abbreviation: 'PW' },
            { name: 'Pennsylvania', abbreviation: 'PA' },
            { name: 'Puerto Rico', abbreviation: 'PR' },
            { name: 'Rhode Island', abbreviation: 'RI' },
            { name: 'South Carolina', abbreviation: 'SC' },
            { name: 'South Dakota', abbreviation: 'SD' },
            { name: 'Tennessee', abbreviation: 'TN' },
            { name: 'Texas', abbreviation: 'TX' },
            { name: 'Utah', abbreviation: 'UT' },
            { name: 'Vermont', abbreviation: 'VT' },
            { name: 'Virgin Islands', abbreviation: 'VI' },
            { name: 'Virginia', abbreviation: 'VA' },
            { name: 'Washington', abbreviation: 'WA' },
            { name: 'West Virginia', abbreviation: 'WV' },
            { name: 'Wisconsin', abbreviation: 'WI' },
            { name: 'Wyoming', abbreviation: 'WY' }
        ];
        this.countries = [
            { countryCode: 'AD', countryName: 'Andorra' },
            { countryCode: 'AE', countryName: 'United Arab Emirates' },
            { countryCode: 'AF', countryName: 'Afghanistan' },
            { countryCode: 'AG', countryName: 'Antigua and Barbuda' },
            { countryCode: 'AI', countryName: 'Anguilla' },
            { countryCode: 'AL', countryName: 'Albania' },
            { countryCode: 'AM', countryName: 'Armenia' },
            { countryCode: 'AO', countryName: 'Angola' },
            { countryCode: 'AQ', countryName: 'Antarctica' },
            { countryCode: 'AR', countryName: 'Argentina' },
            { countryCode: 'AS', countryName: 'American Samoa' },
            { countryCode: 'AT', countryName: 'Austria' },
            { countryCode: 'AU', countryName: 'Australia' },
            { countryCode: 'AW', countryName: 'Aruba' },
            { countryCode: 'AX', countryName: '\xC5land' },
            { countryCode: 'AZ', countryName: 'Azerbaijan' },
            { countryCode: 'BA', countryName: 'Bosnia and Herzegovina' },
            { countryCode: 'BB', countryName: 'Barbados' },
            { countryCode: 'BD', countryName: 'Bangladesh' },
            { countryCode: 'BE', countryName: 'Belgium' },
            { countryCode: 'BF', countryName: 'Burkina Faso' },
            { countryCode: 'BG', countryName: 'Bulgaria' },
            { countryCode: 'BH', countryName: 'Bahrain' },
            { countryCode: 'BI', countryName: 'Burundi' },
            { countryCode: 'BJ', countryName: 'Benin' },
            { countryCode: 'BL', countryName: 'Saint Barth\xE9lemy' },
            { countryCode: 'BM', countryName: 'Bermuda' },
            { countryCode: 'BN', countryName: 'Brunei' },
            { countryCode: 'BO', countryName: 'Bolivia' },
            { countryCode: 'BQ', countryName: 'Bonaire' },
            { countryCode: 'BR', countryName: 'Brazil' },
            { countryCode: 'BS', countryName: 'Bahamas' },
            { countryCode: 'BT', countryName: 'Bhutan' },
            { countryCode: 'BV', countryName: 'Bouvet Island' },
            { countryCode: 'BW', countryName: 'Botswana' },
            { countryCode: 'BY', countryName: 'Belarus' },
            { countryCode: 'BZ', countryName: 'Belize' },
            { countryCode: 'CA', countryName: 'Canada' },
            { countryCode: 'CC', countryName: 'Cocos [Keeling] Islands' },
            { countryCode: 'CD', countryName: 'Democratic Republic of the Congo' },
            { countryCode: 'CF', countryName: 'Central African Republic' },
            { countryCode: 'CG', countryName: 'Republic of the Congo' },
            { countryCode: 'CH', countryName: 'Switzerland' },
            { countryCode: 'CI', countryName: 'Ivory Coast' },
            { countryCode: 'CK', countryName: 'Cook Islands' },
            { countryCode: 'CL', countryName: 'Chile' },
            { countryCode: 'CM', countryName: 'Cameroon' },
            { countryCode: 'CN', countryName: 'China' },
            { countryCode: 'CO', countryName: 'Colombia' },
            { countryCode: 'CR', countryName: 'Costa Rica' },
            { countryCode: 'CU', countryName: 'Cuba' },
            { countryCode: 'CV', countryName: 'Cape Verde' },
            { countryCode: 'CW', countryName: 'Curacao' },
            { countryCode: 'CX', countryName: 'Christmas Island' },
            { countryCode: 'CY', countryName: 'Cyprus' },
            { countryCode: 'CZ', countryName: 'Czechia' },
            { countryCode: 'DE', countryName: 'Germany' },
            { countryCode: 'DJ', countryName: 'Djibouti' },
            { countryCode: 'DK', countryName: 'Denmark' },
            { countryCode: 'DM', countryName: 'Dominica' },
            { countryCode: 'DO', countryName: 'Dominican Republic' },
            { countryCode: 'DZ', countryName: 'Algeria' },
            { countryCode: 'EC', countryName: 'Ecuador' },
            { countryCode: 'EE', countryName: 'Estonia' },
            { countryCode: 'EG', countryName: 'Egypt' },
            { countryCode: 'EH', countryName: 'Western Sahara' },
            { countryCode: 'ER', countryName: 'Eritrea' },
            { countryCode: 'ES', countryName: 'Spain' },
            { countryCode: 'ET', countryName: 'Ethiopia' },
            { countryCode: 'FI', countryName: 'Finland' },
            { countryCode: 'FJ', countryName: 'Fiji' },
            { countryCode: 'FK', countryName: 'Falkland Islands' },
            { countryCode: 'FM', countryName: 'Micronesia' },
            { countryCode: 'FO', countryName: 'Faroe Islands' },
            { countryCode: 'FR', countryName: 'France' },
            { countryCode: 'GA', countryName: 'Gabon' },
            { countryCode: 'UK', countryName: 'United Kingdom' },
            { countryCode: 'GD', countryName: 'Grenada' },
            { countryCode: 'GE', countryName: 'Georgia' },
            { countryCode: 'GF', countryName: 'French Guiana' },
            { countryCode: 'GG', countryName: 'Guernsey' },
            { countryCode: 'GH', countryName: 'Ghana' },
            { countryCode: 'GI', countryName: 'Gibraltar' },
            { countryCode: 'GL', countryName: 'Greenland' },
            { countryCode: 'GM', countryName: 'Gambia' },
            { countryCode: 'GN', countryName: 'Guinea' },
            { countryCode: 'GP', countryName: 'Guadeloupe' },
            { countryCode: 'GQ', countryName: 'Equatorial Guinea' },
            { countryCode: 'GR', countryName: 'Greece' },
            { countryCode: 'GT', countryName: 'Guatemala' },
            { countryCode: 'GU', countryName: 'Guam' },
            { countryCode: 'GW', countryName: 'Guinea-Bissau' },
            { countryCode: 'GY', countryName: 'Guyana' },
            { countryCode: 'HK', countryName: 'Hong Kong' },
            { countryCode: 'HM', countryName: 'Heard Island and McDonald Islands' },
            { countryCode: 'HN', countryName: 'Honduras' },
            { countryCode: 'HR', countryName: 'Croatia' },
            { countryCode: 'HT', countryName: 'Haiti' },
            { countryCode: 'HU', countryName: 'Hungary' },
            { countryCode: 'ID', countryName: 'Indonesia' },
            { countryCode: 'IE', countryName: 'Ireland' },
            { countryCode: 'IL', countryName: 'Israel' },
            { countryCode: 'IM', countryName: 'Isle of Man' },
            { countryCode: 'IN', countryName: 'India' },
            { countryCode: 'IQ', countryName: 'Iraq' },
            { countryCode: 'IR', countryName: 'Iran' },
            { countryCode: 'IS', countryName: 'Iceland' },
            { countryCode: 'IT', countryName: 'Italy' },
            { countryCode: 'JE', countryName: 'Jersey' },
            { countryCode: 'JM', countryName: 'Jamaica' },
            { countryCode: 'JO', countryName: 'Jordan' },
            { countryCode: 'JP', countryName: 'Japan' },
            { countryCode: 'KE', countryName: 'Kenya' },
            { countryCode: 'KG', countryName: 'Kyrgyzstan' },
            { countryCode: 'KH', countryName: 'Cambodia' },
            { countryCode: 'KI', countryName: 'Kiribati' },
            { countryCode: 'KM', countryName: 'Comoros' },
            { countryCode: 'KN', countryName: 'Saint Kitts and Nevis' },
            { countryCode: 'KP', countryName: 'North Korea' },
            { countryCode: 'KR', countryName: 'South Korea' },
            { countryCode: 'KW', countryName: 'Kuwait' },
            { countryCode: 'KY', countryName: 'Cayman Islands' },
            { countryCode: 'KZ', countryName: 'Kazakhstan' },
            { countryCode: 'LA', countryName: 'Laos' },
            { countryCode: 'LB', countryName: 'Lebanon' },
            { countryCode: 'LC', countryName: 'Saint Lucia' },
            { countryCode: 'LI', countryName: 'Liechtenstein' },
            { countryCode: 'LK', countryName: 'Sri Lanka' },
            { countryCode: 'LR', countryName: 'Liberia' },
            { countryCode: 'LS', countryName: 'Lesotho' },
            { countryCode: 'LT', countryName: 'Lithuania' },
            { countryCode: 'LU', countryName: 'Luxembourg' },
            { countryCode: 'LV', countryName: 'Latvia' },
            { countryCode: 'LY', countryName: 'Libya' },
            { countryCode: 'MA', countryName: 'Morocco' },
            { countryCode: 'MC', countryName: 'Monaco' },
            { countryCode: 'MD', countryName: 'Moldova' },
            { countryCode: 'ME', countryName: 'Montenegro' },
            { countryCode: 'MF', countryName: 'Saint Martin' },
            { countryCode: 'MG', countryName: 'Madagascar' },
            { countryCode: 'MH', countryName: 'Marshall Islands' },
            { countryCode: 'MK', countryName: 'Macedonia' },
            { countryCode: 'ML', countryName: 'Mali' },
            { countryCode: 'MM', countryName: 'Myanmar [Burma]' },
            { countryCode: 'MN', countryName: 'Mongolia' },
            { countryCode: 'MO', countryName: 'Macao' },
            { countryCode: 'MP', countryName: 'Northern Mariana Islands' },
            { countryCode: 'MQ', countryName: 'Martinique' },
            { countryCode: 'MR', countryName: 'Mauritania' },
            { countryCode: 'MS', countryName: 'Montserrat' },
            { countryCode: 'MT', countryName: 'Malta' },
            { countryCode: 'MU', countryName: 'Mauritius' },
            { countryCode: 'MV', countryName: 'Maldives' },
            { countryCode: 'MW', countryName: 'Malawi' },
            { countryCode: 'MX', countryName: 'Mexico' },
            { countryCode: 'MY', countryName: 'Malaysia' },
            { countryCode: 'MZ', countryName: 'Mozambique' },
            { countryCode: 'NA', countryName: 'Namibia' },
            { countryCode: 'NC', countryName: 'New Caledonia' },
            { countryCode: 'NE', countryName: 'Niger' },
            { countryCode: 'NF', countryName: 'Norfolk Island' },
            { countryCode: 'NG', countryName: 'Nigeria' },
            { countryCode: 'NI', countryName: 'Nicaragua' },
            { countryCode: 'NL', countryName: 'Netherlands' },
            { countryCode: 'NO', countryName: 'Norway' },
            { countryCode: 'NP', countryName: 'Nepal' },
            { countryCode: 'NR', countryName: 'Nauru' },
            { countryCode: 'NU', countryName: 'Niue' },
            { countryCode: 'NZ', countryName: 'New Zealand' },
            { countryCode: 'OM', countryName: 'Oman' },
            { countryCode: 'PA', countryName: 'Panama' },
            { countryCode: 'PE', countryName: 'Peru' },
            { countryCode: 'PF', countryName: 'French Polynesia' },
            { countryCode: 'PG', countryName: 'Papua New Guinea' },
            { countryCode: 'PH', countryName: 'Philippines' },
            { countryCode: 'PK', countryName: 'Pakistan' },
            { countryCode: 'PL', countryName: 'Poland' },
            { countryCode: 'PM', countryName: 'Saint Pierre and Miquelon' },
            { countryCode: 'PN', countryName: 'Pitcairn Islands' },
            { countryCode: 'PR', countryName: 'Puerto Rico' },
            { countryCode: 'PS', countryName: 'Palestine' },
            { countryCode: 'PT', countryName: 'Portugal' },
            { countryCode: 'PW', countryName: 'Palau' },
            { countryCode: 'PY', countryName: 'Paraguay' },
            { countryCode: 'QA', countryName: 'Qatar' },
            { countryCode: 'RE', countryName: 'R\xE9union' },
            { countryCode: 'RO', countryName: 'Romania' },
            { countryCode: 'RS', countryName: 'Serbia' },
            { countryCode: 'RU', countryName: 'Russia' },
            { countryCode: 'RW', countryName: 'Rwanda' },
            { countryCode: 'SA', countryName: 'Saudi Arabia' },
            { countryCode: 'SB', countryName: 'Solomon Islands' },
            { countryCode: 'SC', countryName: 'Seychelles' },
            { countryCode: 'SD', countryName: 'Sudan' },
            { countryCode: 'SE', countryName: 'Sweden' },
            { countryCode: 'SG', countryName: 'Singapore' },
            { countryCode: 'SH', countryName: 'Saint Helena' },
            { countryCode: 'SI', countryName: 'Slovenia' },
            { countryCode: 'SK', countryName: 'Slovakia' },
            { countryCode: 'SL', countryName: 'Sierra Leone' },
            { countryCode: 'SM', countryName: 'San Marino' },
            { countryCode: 'SN', countryName: 'Senegal' },
            { countryCode: 'SO', countryName: 'Somalia' },
            { countryCode: 'SR', countryName: 'Suriname' },
            { countryCode: 'SS', countryName: 'South Sudan' },
            { countryCode: 'ST', countryName: 'S\xE3o Tom\xE9 and Pr\xEDncipe' },
            { countryCode: 'SV', countryName: 'El Salvador' },
            { countryCode: 'SX', countryName: 'Sint Maarten' },
            { countryCode: 'SY', countryName: 'Syria' },
            { countryCode: 'SZ', countryName: 'Swaziland' },
            { countryCode: 'TC', countryName: 'Turks and Caicos Islands' },
            { countryCode: 'TD', countryName: 'Chad' },
            { countryCode: 'TG', countryName: 'Togo' },
            { countryCode: 'TH', countryName: 'Thailand' },
            { countryCode: 'TJ', countryName: 'Tajikistan' },
            { countryCode: 'TK', countryName: 'Tokelau' },
            { countryCode: 'TL', countryName: 'East Timor' },
            { countryCode: 'TM', countryName: 'Turkmenistan' },
            { countryCode: 'TN', countryName: 'Tunisia' },
            { countryCode: 'TO', countryName: 'Tonga' },
            { countryCode: 'TR', countryName: 'Turkey' },
            { countryCode: 'TT', countryName: 'Trinidad and Tobago' },
            { countryCode: 'TV', countryName: 'Tuvalu' },
            { countryCode: 'TW', countryName: 'Taiwan' },
            { countryCode: 'TZ', countryName: 'Tanzania' },
            { countryCode: 'UA', countryName: 'Ukraine' },
            { countryCode: 'UG', countryName: 'Uganda' },
            { countryCode: 'US', countryName: 'United States' },
            { countryCode: 'UY', countryName: 'Uruguay' },
            { countryCode: 'UZ', countryName: 'Uzbekistan' },
            { countryCode: 'VA', countryName: 'Vatican City' },
            { countryCode: 'VC', countryName: 'Saint Vincent and the Grenadines' },
            { countryCode: 'VE', countryName: 'Venezuela' },
            { countryCode: 'VG', countryName: 'British Virgin Islands' },
            { countryCode: 'VI', countryName: 'U.S. Virgin Islands' },
            { countryCode: 'VN', countryName: 'Vietnam' },
            { countryCode: 'VU', countryName: 'Vanuatu' },
            { countryCode: 'WF', countryName: 'Wallis and Futuna' },
            { countryCode: 'WS', countryName: 'Samoa' },
            { countryCode: 'XK', countryName: 'Kosovo' },
            { countryCode: 'YE', countryName: 'Yemen' },
            { countryCode: 'YT', countryName: 'Mayotte' },
            { countryCode: 'ZA', countryName: 'South Africa' },
            { countryCode: 'ZM', countryName: 'Zambia' },
            { countryCode: 'ZW', countryName: 'Zimbabwe' }
        ];
    }
    StatesService.prototype.getStates = function () {
        return this.states;
    };
    StatesService.prototype.getStatesAsOptions = function () {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__(__WEBPACK_IMPORTED_MODULE_1_lodash__["cloneDeep"](this.getStates()))
            .map(function (state) {
            return {
                label: state.name,
                value: state.abbreviation
            };
        })
            .value();
    };
    StatesService.prototype.getCountries = function () {
        return __WEBPACK_IMPORTED_MODULE_1_lodash__(this.countries)
            .orderBy('countryName')
            .cloneDeep()
            .value();
    };
    StatesService.prototype.getStatesProvinces = function (country) {
        if (country === void 0) { country = 'usa'; }
        var data = [];
        country = __WEBPACK_IMPORTED_MODULE_1_lodash__["toLower"](__WEBPACK_IMPORTED_MODULE_1_lodash__["trim"](country));
        if (country === 'us' ||
            country === 'usa' ||
            country === 'america' ||
            /^united\s+states/.test(country)) {
            data = __WEBPACK_IMPORTED_MODULE_1_lodash__["cloneDeep"](this.getStatesAsOptions());
        }
        else if (country === 'canada') {
            data = __WEBPACK_IMPORTED_MODULE_1_lodash__["cloneDeep"](this.getStatesAsOptions());
        }
        return data;
    };
    StatesService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], StatesService);
    return StatesService;
}());



/***/ }),

/***/ "./client/app/services/token.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TokenService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TokenService = /** @class */ (function () {
    function TokenService() {
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]({
            'Content-Type': 'application/json',
            charset: 'UTF-8'
        });
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: this.headers });
    }
    TokenService.prototype.getOptions = function () {
        return this.options;
    };
    TokenService.prototype.getHeaders = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["d" /* HttpHeaders */]()
            .set('Content-Type', 'application/json')
            .append('charset', 'UTF-8');
        if (this.token) {
            headers = headers.append('Authorization', 'Bearer ' + this.token);
        }
        return headers;
    };
    TokenService.prototype.getToken = function () {
        return this.token;
    };
    TokenService.prototype.setOptions = function (token) {
        this.token = token;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('charset', 'UTF-8');
        if (token) {
            this.headers.append('Authorization', 'Bearer ' + token);
        }
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: this.headers });
    };
    TokenService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [])
    ], TokenService);
    return TokenService;
}());



/***/ }),

/***/ "./client/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/map.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var UserService = /** @class */ (function () {
    function UserService(http) {
        this.http = http;
        this.user = {};
        this.userStream = new __WEBPACK_IMPORTED_MODULE_2_rxjs_BehaviorSubject__["BehaviorSubject"](this.user);
    }
    UserService.prototype.register = function (user) {
        return this.http.post('/api/register', JSON.stringify(user));
    };
    UserService.prototype.login = function (credentials) {
        return this.http.post('/api/login', JSON.stringify(credentials));
    };
    UserService.prototype.getUsers = function () {
        return this.http.get("/api/users");
    };
    UserService.prototype.getUser = function (user_id) {
        return this.http.get("/api/users/" + user_id);
    };
    UserService.prototype.resetpassword = function (credentials) {
        return this.http.post('/api/resetpassword', JSON.stringify(credentials));
    };
    UserService.prototype.forgotpassword = function (email) {
        return this.http.post('/api/forgotpassword', JSON.stringify(email));
    };
    UserService.prototype.changepassword = function (passwords, user_id) {
        return this.http.put("/api/changepassword/" + user_id, JSON.stringify(passwords));
    };
    UserService.prototype.editUser = function (user) {
        return this.http.put("/api/users/" + user.id, JSON.stringify(user));
    };
    UserService.prototype.deleteUser = function (user_id) {
        return this.http.delete("/api/users/" + user_id);
    };
    UserService.prototype.getProfile = function (user_id) {
        return this.http.get("/api/profile/" + user_id);
    };
    UserService.prototype.getPerson = function (person_id) {
        return this.http.get("/api/people/" + person_id);
    };
    UserService.prototype.updatePerson = function (information, person_id) {
        return this.http.put("/api/people/" + person_id, JSON.stringify(information));
    };
    //Zones
    UserService.prototype.createZone = function (information, user_id) {
        return this.http.post("/api/users/" + user_id + "/location_preference", JSON.stringify(information));
    };
    UserService.prototype.updateZone = function (information, zone_id) {
        return this.http.put("/api/location_preference/" + zone_id, JSON.stringify(information));
    };
    //Payments
    UserService.prototype.updatePayment = function (information, user) {
        return this.http.put("/api/payment/" + user.id, JSON.stringify(information));
    };
    //addresses
    UserService.prototype.getUserAddresses = function (user_id) {
        return this.http.get("/api/users/" + user_id + "/addresses");
    };
    UserService.prototype.getUserAddress = function (user_id, address_id) {
        return this.http.get("/api/users/" + user_id + "/addresses/" + address_id);
    };
    UserService.prototype.createAddress = function (information, user_id) {
        return this.http.post("/api/users/" + user_id + "/addresses", JSON.stringify(information));
    };
    UserService.prototype.updateAddress = function (information, user_id, address_id) {
        return this.http.put("/api/users/" + user_id + "/addresses/" + address_id, JSON.stringify(information));
    };
    //Phones
    UserService.prototype.getUserPhones = function (user_id) {
        return this.http.get("/api/users/" + user_id + "/phones");
    };
    UserService.prototype.getUserPhone = function (user_id, phone_id) {
        return this.http.get("/api/users/" + user_id + "/phones/" + phone_id);
    };
    UserService.prototype.createPhone = function (information, user_id) {
        return this.http.post("/api/users/" + user_id + "/phones", JSON.stringify(information));
    };
    UserService.prototype.updatePhone = function (information, user_id, phone_id) {
        return this.http.put("/api/users/" + user_id + "/phones/" + phone_id, JSON.stringify(information));
    };
    UserService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["b" /* HttpClient */]])
    ], UserService);
    return UserService;
}());



/***/ }),

/***/ "./client/app/shared/compareFields.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compareFields;
function compareFields(fieldName1, fieldName2) {
    return function (c) {
        var field1 = c.get(fieldName1);
        var field2 = c.get(fieldName2);
        if (field1.value !== field2.value) {
            return { compareFields: true };
        }
        return null;
    };
}


/***/ }),

/***/ "./client/app/shared/dropdown.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownDirective; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import { NgModule } from '@angular/core';
var DropdownDirective = /** @class */ (function () {
    function DropdownDirective() {
        // We use the HostBinding to attach the css element class.open
        // The HostListener listen to the CLICK even so the class.open can be applied to the html object
        // class.open allows the dropdown to open up and reveal its content
        this.isOpen = false;
    }
    DropdownDirective.prototype.toggleOpen = function () {
        this.isOpen = !this.isOpen;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.open'),
        __metadata("design:type", Object)
    ], DropdownDirective.prototype, "isOpen", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], DropdownDirective.prototype, "toggleOpen", null);
    DropdownDirective = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
            selector: '[appDropdown]'
        })
        // This appDropdown would be consumed by the recipe-detail.component.html and header.component.html.
        ,
        __metadata("design:paramtypes", [])
    ], DropdownDirective);
    return DropdownDirective;
}());



/***/ }),

/***/ "./client/app/shared/formly/base-form/base-form.component.html":
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"form\" (ngSubmit)=\"onSubmit(model)\">\n  <formly-form [model]=\"model\" [fields]=\"fields\" [options]=\"options\" [form]=\"form\">\n    <ng-content></ng-content>\n  </formly-form>\n</form>"

/***/ }),

/***/ "./client/app/shared/formly/base-form/base-form.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/shared/formly/base-form/base-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BaseFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var BaseFormComponent = /** @class */ (function () {
    function BaseFormComponent() {
        this.submitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.form = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({});
        this.model = {};
        this.options = {};
    }
    Object.defineProperty(BaseFormComponent.prototype, "Model", {
        set: function (model) {
            this.model = model;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormComponent.prototype, "Fields", {
        set: function (fields) {
            this.fields = fields;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseFormComponent.prototype, "Options", {
        set: function (options) {
            this.options = options;
        },
        enumerable: true,
        configurable: true
    });
    BaseFormComponent.prototype.ngOnInit = function () { };
    BaseFormComponent.prototype.onSubmit = function (model) {
        this.submitter.emit(model);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('model'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BaseFormComponent.prototype, "Model", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('fields'),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], BaseFormComponent.prototype, "Fields", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('options'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BaseFormComponent.prototype, "Options", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('ngSubmit'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], BaseFormComponent.prototype, "submitter", void 0);
    BaseFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'base-form',
            template: __webpack_require__("./client/app/shared/formly/base-form/base-form.component.html"),
            styles: [__webpack_require__("./client/app/shared/formly/base-form/base-form.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], BaseFormComponent);
    return BaseFormComponent;
}());



/***/ }),

/***/ "./client/app/shared/formly/horizontal-types/horizontal-radio-wrapper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormlyHorizontalRadioWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_formly_core__ = __webpack_require__("./node_modules/@ngx-formly/core/@ngx-formly/core.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormlyHorizontalRadioWrapper = /** @class */ (function (_super) {
    __extends(FormlyHorizontalRadioWrapper, _super);
    function FormlyHorizontalRadioWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fieldComponent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"])
    ], FormlyHorizontalRadioWrapper.prototype, "fieldComponent", void 0);
    FormlyHorizontalRadioWrapper = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'formly-horizontal-radio-type',
            template: __webpack_require__("./client/app/shared/formly/horizontal-types/horizontal-type.html")
        })
    ], FormlyHorizontalRadioWrapper);
    return FormlyHorizontalRadioWrapper;
}(__WEBPACK_IMPORTED_MODULE_1__ngx_formly_core__["b" /* FieldWrapper */]));



/***/ }),

/***/ "./client/app/shared/formly/horizontal-types/horizontal-textarea-wrapper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormlyHorizontalTextAreaWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_formly_core__ = __webpack_require__("./node_modules/@ngx-formly/core/@ngx-formly/core.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormlyHorizontalTextAreaWrapper = /** @class */ (function (_super) {
    __extends(FormlyHorizontalTextAreaWrapper, _super);
    function FormlyHorizontalTextAreaWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fieldComponent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"])
    ], FormlyHorizontalTextAreaWrapper.prototype, "fieldComponent", void 0);
    FormlyHorizontalTextAreaWrapper = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'formly-horizontal-textarea-type',
            template: __webpack_require__("./client/app/shared/formly/horizontal-types/horizontal-type.html")
        })
    ], FormlyHorizontalTextAreaWrapper);
    return FormlyHorizontalTextAreaWrapper;
}(__WEBPACK_IMPORTED_MODULE_1__ngx_formly_core__["b" /* FieldWrapper */]));



/***/ }),

/***/ "./client/app/shared/formly/horizontal-types/horizontal-type.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"row\" style=\"text-align:right;\">\n  <label attr.for=\"{{key}}\" class=\"col-4 form-control-label\" style=\"padding-top: 6px;\">{{ to.label }}</label>\n  <div class=\"col\">\n    <ng-template #fieldComponent></ng-template>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/shared/formly/horizontal-types/horizontal-wrapper.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormlyHorizontalWrapper; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ngx_formly_core__ = __webpack_require__("./node_modules/@ngx-formly/core/@ngx-formly/core.es5.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var FormlyHorizontalWrapper = /** @class */ (function (_super) {
    __extends(FormlyHorizontalWrapper, _super);
    function FormlyHorizontalWrapper() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])('fieldComponent', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"] }),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewContainerRef"])
    ], FormlyHorizontalWrapper.prototype, "fieldComponent", void 0);
    FormlyHorizontalWrapper = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'formly-horizontal-input-type',
            template: __webpack_require__("./client/app/shared/formly/horizontal-types/horizontal-type.html")
        })
    ], FormlyHorizontalWrapper);
    return FormlyHorizontalWrapper;
}(__WEBPACK_IMPORTED_MODULE_1__ngx_formly_core__["b" /* FieldWrapper */]));



/***/ }),

/***/ "./client/app/shared/formly/horizontal-types/index.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__horizontal_wrapper__ = __webpack_require__("./client/app/shared/formly/horizontal-types/horizontal-wrapper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__horizontal_wrapper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__horizontal_radio_wrapper__ = __webpack_require__("./client/app/shared/formly/horizontal-types/horizontal-radio-wrapper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__horizontal_radio_wrapper__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__horizontal_textarea_wrapper__ = __webpack_require__("./client/app/shared/formly/horizontal-types/horizontal-textarea-wrapper.ts");
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__horizontal_textarea_wrapper__["a"]; });





/***/ }),

/***/ "./client/app/shared/formly/repeat-section/repeat-section.type.html":
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let control of formControl.controls; let i = index;\" class=\"card\">\n\t<span *ngIf=\"i!=0\" (click)=\"remove(i)\" class=\"close close-thik\" title=\"delete\"></span>\n  <formly-form\n    [model]=\"model[i]\"\n    [fields]=\"fields[i]\"\n    [options]=\"options\"\n    [form]=\"this.formControl.at(i)\"\n    [ngClass]=\"field.fieldArray.fieldGroupClassName\">\n  </formly-form>\n</div>\n<div class=\"addButton\">\n  <button class=\"btn btn-primary buttonSize\" type=\"button\" (click)=\"add()\">{{field.fieldArray.templateOptions.btnText}}</button>\n</div>"

/***/ }),

/***/ "./client/app/shared/formly/repeat-section/repeat-section.type.scss":
/***/ (function(module, exports) {

module.exports = "@charset \"UTF-8\";\n.col-1,\n.col-2,\n.col-3,\n:host /deep/ .col-4 {\n  padding-right: 5px;\n  padding-left: 5px; }\n:host /deep/ .addButton {\n  margin: 2em 0; }\n:host /deep/ .card {\n  margin: 1.5em 0; }\n.buttonSize {\n  /*margin: auto 4px auto 0;*/\n  -webkit-transform: scale(0.75);\n          transform: scale(0.75); }\n.close {\n  display: block;\n  color: #777;\n  font: 14px/100% arial, sans-serif;\n  position: absolute;\n  right: 5px;\n  text-decoration: none;\n  text-shadow: 0 1px 0 #fff;\n  top: 5px; }\n.close-thik:after {\n  content: '✖';\n  /* UTF-8 symbol */ }\n"

/***/ }),

/***/ "./client/app/shared/formly/repeat-section/repeat-section.type.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RepeatTypeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ngx_formly_core__ = __webpack_require__("./node_modules/@ngx-formly/core/@ngx-formly/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RepeatTypeComponent = /** @class */ (function (_super) {
    __extends(RepeatTypeComponent, _super);
    function RepeatTypeComponent(builder) {
        var _this = _super.call(this) || this;
        _this.builder = builder;
        _this.fields = [];
        return _this;
    }
    Object.defineProperty(RepeatTypeComponent.prototype, "newFields", {
        get: function () {
            return __WEBPACK_IMPORTED_MODULE_3_lodash__["cloneDeep"](this.field.fieldArray.fieldGroup);
        },
        enumerable: true,
        configurable: true
    });
    RepeatTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (this.model) {
            setTimeout(function () { return _this.model.map(function () { return _this.add(); }); });
        }
    };
    RepeatTypeComponent.prototype.add = function () {
        var form = new __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"]({}), i = this.fields.length;
        if (!this.model[i]) {
            this.model.push({});
        }
        this.fields.push(this.newFields);
        this.builder.buildForm(form, this.fields[i], this.model[i], this.options);
        this.formControl.push(form);
    };
    RepeatTypeComponent.prototype.remove = function (i) {
        this.formControl.removeAt(i);
        this.model.splice(i, 1);
        this.fields.splice(i, 1);
    };
    RepeatTypeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'formly-repeat-section',
            template: __webpack_require__("./client/app/shared/formly/repeat-section/repeat-section.type.html"),
            styles: [__webpack_require__("./client/app/shared/formly/repeat-section/repeat-section.type.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__ngx_formly_core__["c" /* FormlyFormBuilder */]])
    ], RepeatTypeComponent);
    return RepeatTypeComponent;
}(__WEBPACK_IMPORTED_MODULE_2__ngx_formly_core__["a" /* FieldType */]));



/***/ }),

/***/ "./client/app/shared/forms/abstract-form.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AbstractFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AbstractFormComponent = /** @class */ (function () {
    function AbstractFormComponent() {
        this.cancelForm = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    AbstractFormComponent.prototype.setUpValidators = function (aForm, controls) {
        var _this = this;
        this.currentForm = aForm;
        controls.forEach(function (controlName) {
            var control = _this.currentForm.get(controlName);
            _this.validator(control, controlName + 'Invalid');
        });
    };
    AbstractFormComponent.prototype.validator = function (item, name) {
        var _this = this;
        item
            .valueChanges
            .debounceTime(1000)
            .subscribe(function (value) {
            var result = false;
            if (item.touched && item.invalid) {
                result = true;
            }
            _this[name] = result;
        });
    };
    AbstractFormComponent.prototype.onCancel = function (event) {
        this.cancelForm.emit(false);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AbstractFormComponent.prototype, "cancelForm", void 0);
    return AbstractFormComponent;
}());



/***/ }),

/***/ "./client/app/shared/forms/address-form/address-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fadeInForm\">\n\n    <form [formGroup]=\"addressForm\" (ngSubmit)=\"onAddressSubmit()\">\n      <div class=\"profile-div\">\n        <div class=\"form-group\" [ngClass]=\"{ 'has-danger': line1Invalid }\">\n          <label>Address Line 1</label>\n          <input class=\"form-control\" formControlName=\"line1\">\n        </div>\n        <div class=\"form-group\">\n          <label>Address Line 2</label>\n          <input class=\"form-control\" formControlName=\"line2\">\n        </div>\n        <div class=\"form-group\" [ngClass]=\"{ 'has-danger': cityInvalid }\">\n          <label>City\n            <input class=\"form-control\" formControlName=\"city\">\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"center-block\">State\n            <select class=\"form-control\" formControlName=\"state\">\n              <option *ngFor=\"let state of states\" value=\"{{state.value}}\">{{state.label}}</option>\n            </select>\n          </label>\n        </div>\n        <div class=\"form-group\" [ngClass]=\"{ 'has-danger': zipInvalid }\">\n          <label class=\"center-block\">Zip Code\n            <input class=\"form-control\" formControlName=\"zip\">\n          </label>\n        </div>\n      </div>\n\n      <div>\n        <button type=\"submit\" title=\"Save address\" class=\"btn btn-primary btn-sm\" [disabled]=\"addressForm.invalid\"><i class=\"fa fa-save\"></i>Save</button>\n        <button class=\"btn btn-secondary btn-sm\" title=\"Cancel address\" (click)=\"onCancel($event)\"><i class=\"fa fa-times\"></i>Cancel</button>\n      </div>\n    </form>\n</div>\n"

/***/ }),

/***/ "./client/app/shared/forms/address-form/address-form.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/shared/forms/address-form/address-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AddressFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_index__ = __webpack_require__("./client/app/services/index.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abstract_form__ = __webpack_require__("./client/app/shared/forms/abstract-form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_lodash__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AddressFormComponent = /** @class */ (function (_super) {
    __extends(AddressFormComponent, _super);
    function AddressFormComponent(formBuilder, statesService) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.statesService = statesService;
        _this.anAddress = {};
        _this.countryName = 'usa';
        _this.mode = false;
        _this.line1Invalid = false;
        _this.cityInvalid = false;
        _this.zipInvalid = false;
        _this.userId = 0;
        _this.saveAddress = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.addressForm = _this.formBuilder.group({
            line1: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(100),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)
                ]
            ],
            line2: [
                '',
                [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(100), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)]
            ],
            city: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(30),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)
                ]
            ],
            state: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)
                ]
            ],
            zip: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(5),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.zipRegex)
                ]
            ]
        });
        _this.setUpValidators(_this.addressForm, ['line1', 'city', 'zip']);
        return _this;
    }
    Object.defineProperty(AddressFormComponent.prototype, "address", {
        set: function (anAddress) {
            this.anAddress = __WEBPACK_IMPORTED_MODULE_5_lodash__["cloneDeep"](anAddress);
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressFormComponent.prototype, "zoneMode", {
        set: function (mode) {
            this.mode = mode;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AddressFormComponent.prototype, "country", {
        set: function (aCountry) {
            this.countryName = aCountry || 'usa';
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    AddressFormComponent.prototype.fillForm = function () {
        this.states = this.statesService.getStatesProvinces(this.countryName);
        this.addressForm.setValue({
            line1: this.anAddress.line1 || '',
            line2: this.anAddress.line2 || '',
            city: this.anAddress.city || '',
            state: this.anAddress.state || '',
            zip: this.anAddress.zip || ''
        });
    };
    AddressFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    AddressFormComponent.prototype.onAddressSubmit = function () {
        var _this = this;
        if (this.addressService) {
            var newAddress = this.addressForm.value;
            var observable = void 0;
            newAddress.id = this.anAddress.id;
            this.saveAddress.emit({ action: 'show_overlay' });
            if (__WEBPACK_IMPORTED_MODULE_5_lodash__["isNil"](newAddress.id) || parseInt(newAddress.id) === 0) {
                observable = this.addressService.createAddress(newAddress);
            }
            else {
                observable = this.addressService.updateAddress(newAddress);
            }
            observable.subscribe(function () {
                _this.saveAddress.emit({ action: 'save_success' });
            }, function (err) {
                _this.saveAddress.emit({ action: 'save_failure' });
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], AddressFormComponent.prototype, "saveAddress", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AddressFormComponent.prototype, "address", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AddressFormComponent.prototype, "zoneMode", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AddressFormComponent.prototype, "country", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], AddressFormComponent.prototype, "addressService", void 0);
    AddressFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'address-form',
            template: __webpack_require__("./client/app/shared/forms/address-form/address-form.component.html"),
            styles: [__webpack_require__("./client/app/shared/forms/address-form/address-form.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_2__services_index__["d" /* StatesService */]])
    ], AddressFormComponent);
    return AddressFormComponent;
}(__WEBPACK_IMPORTED_MODULE_3__abstract_form__["a" /* AbstractFormComponent */]));



/***/ }),

/***/ "./client/app/shared/forms/address-form/horizontal-address-form/horizontal-address-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fadeInForm\">\n\n    <form [formGroup]=\"addressForm\" (ngSubmit)=\"onAddressSubmit()\">\n      <div class=\"form-row\">\n        <div class=\"col-3\" [ngClass]=\"{ 'has-danger': line1Invalid }\">\n          <label>Address Line 1\n            <input class=\"form-control\" formControlName=\"line1\">\n          </label>\n        </div>\n        <div class=\"col-3\">\n          <label>Address Line 2\n            <input class=\"form-control\" formControlName=\"line2\">\n          </label>\n        </div>\n        <div class=\"col-2\" [ngClass]=\"{ 'has-danger': cityInvalid }\">\n          <label>City\n            <input class=\"form-control\" formControlName=\"city\">\n          </label>\n        </div>\n        <div class=\"col-2\">\n          <label class=\"center-block\">State\n            <select class=\"form-control\" formControlName=\"state\">\n              <option *ngFor=\"let state of states\" value=\"{{state.value}}\">{{state.label}}</option>\n            </select>\n          </label>\n        </div>\n        <div class=\"col-2\" [ngClass]=\"{ 'has-danger': zipInvalid }\">\n          <label class=\"center-block\">Zip Code\n            <input class=\"form-control\" formControlName=\"zip\">\n          </label>\n        </div>\n<!--\n        <div class=\"col-2\">\n          <button type=\"submit\" title=\"Save address\" class=\"btn btn-primary btn-sm\" [disabled]=\"addressForm.invalid\"><i class=\"fa fa-save\"></i></button>\n          <button class=\"btn btn-secondary btn-sm\" title=\"Cancel address\" (click)=\"onCancel($event)\"><i class=\"fa fa-times\"></i></button>\n        </div> -->\n      </div>\n\n    </form>\n</div>\n"

/***/ }),

/***/ "./client/app/shared/forms/address-form/horizontal-address-form/horizontal-address-form.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/shared/forms/address-form/horizontal-address-form/horizontal-address-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HorizontalAddressFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__address_form_component__ = __webpack_require__("./client/app/shared/forms/address-form/address-form.component.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var HorizontalAddressFormComponent = /** @class */ (function (_super) {
    __extends(HorizontalAddressFormComponent, _super);
    function HorizontalAddressFormComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HorizontalAddressFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'horizontal-address-form',
            template: __webpack_require__("./client/app/shared/forms/address-form/horizontal-address-form/horizontal-address-form.component.html"),
            styles: [__webpack_require__("./client/app/shared/forms/address-form/horizontal-address-form/horizontal-address-form.component.scss")]
        })
    ], HorizontalAddressFormComponent);
    return HorizontalAddressFormComponent;
}(__WEBPACK_IMPORTED_MODULE_1__address_form_component__["a" /* AddressFormComponent */]));



/***/ }),

/***/ "./client/app/shared/forms/bio-form/bio-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fadeInForm\">\n  <div class=\"\">\n    <form [formGroup]=\"bioForm\" (ngSubmit)=\"onSubmit()\">\n      <div class=\"input-group\" [ngClass]=\"{ 'has-danger': firstnameInvalid }\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-user\"></i></span>\n        <input class=\"form-control\" name=\"firstname\" formControlName=\"firstname\" placeholder=\"Firstname\">\n      </div>\n      <div class=\"input-group\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-user-o\"></i></span>\n        <input class=\"form-control\" name=\"middlenames\" formControlName=\"middlenames\" placeholder=\"Middlename\">\n      </div>\n      <div class=\"input-group\" [ngClass]=\"{ 'has-danger': lastnameInvalid }\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-user-circle-o\"></i></span>\n        <input class=\"form-control\" name=\"lastname\" formControlName=\"lastname\" placeholder=\"Lastname\">\n      </div>\n      <div class=\"input-group\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-venus-mars\"></i></span>\n        <select class=\"form-control\" name=\"gender\" formControlName=\"gender\">\n          <option value=\"\" selected disabled>Gender</option>\n          <option value=\"m\">Male</option>\n          <option value=\"f\">Female</option>\n        </select>\n      </div>\n      <div class=\"input-group\">\n        <span class=\"input-group-addon\"><i class=\"fa  fa-birthday-cake\"></i></span>\n        <my-date-picker name=\"dob\" [options]=\"myDatePickerOptions\"  formControlName=\"dob\" placeholder=\"Date of birth\"></my-date-picker>\n      </div>\n      <br>\n      <div>\n        <button type=\"submit\" title=\"Save personal details.\" class=\"btn btn-primary btn-sm\" [disabled]=\"bioForm.invalid\"> <i class=\"fa fa-save\"></i>Save</button>\n        <button type=\"button\" title=\"Cancel personal details.\" class=\"btn btn-secondary btn-sm\" (click)=\"onCancel($event)\"><i class=\"fa fa-times\"></i>Cancel</button>\n      </div>\n    </form>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/shared/forms/bio-form/bio-form.component.scss":
/***/ (function(module, exports) {

module.exports = ".input-group {\n  margin-bottom: 0.5em; }\n  .input-group .input-group-addon {\n    min-width: 2.625em; }\n  .input-group input + .input-group-addon {\n    min-width: 5.375em; }\n"

/***/ }),

/***/ "./client/app/shared/forms/bio-form/bio-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BioFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_form__ = __webpack_require__("./client/app/shared/forms/abstract-form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var BioFormComponent = /** @class */ (function (_super) {
    __extends(BioFormComponent, _super);
    function BioFormComponent(formBuilder, userService) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.userService = userService;
        _this.saveBio = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.aPerson = {};
        _this.mode = false;
        _this.showDivbio = true;
        _this.firstnameInvalid = false;
        _this.lastnameInvalid = false;
        _this.myDatePickerOptions = {
            dateFormat: 'yyyy-mm-dd'
        };
        _this.bioForm = _this.formBuilder.group({
            firstname: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(30),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)
                ]
            ],
            middlenames: [
                '',
                [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)]
            ],
            lastname: [
                '',
                [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(30), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)]
            ],
            gender: ['', [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].nullValidator]],
            dob: [{ date: { year: 1998, month: 10, day: 9 } }, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required] // this example is initialized to specific date
        });
        _this.setUpValidators(_this.bioForm, ['firstname', 'lastname']);
        return _this;
    }
    Object.defineProperty(BioFormComponent.prototype, "person", {
        set: function (aPerson) {
            this.aPerson = aPerson;
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    BioFormComponent.prototype.fillForm = function () {
        if (this.aPerson) {
            this.bioForm.setValue({
                firstname: this.aPerson.firstname,
                middlenames: this.aPerson.middlenames,
                lastname: this.aPerson.lastname,
                gender: this.aPerson.gender,
                dob: this.getDate(this.aPerson.dob)
            });
        }
    };
    BioFormComponent.prototype.getDate = function (timestamp) {
        var date = new Date(timestamp);
        return {
            date: {
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate()
            }
        };
    };
    BioFormComponent.prototype.setDate = function (timestamp) {
        if (timestamp) {
            // Set today using the setValue function
            this.bioForm.patchValue({ dob: this.getDate(timestamp) });
        }
        else {
            this.resetDate();
        }
    };
    BioFormComponent.prototype.resetDate = function () {
        // Reset date picker to specific date (today)
        this.bioForm.reset({ dob: { jsdate: new Date() } });
    };
    BioFormComponent.prototype.clearDate = function () {
        // Clear the date using the patchValue function (use null or empty string)
        this.bioForm.patchValue({ dob: null });
    };
    BioFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    BioFormComponent.prototype.getEpoc = function (dob) {
        var value = 0;
        if (dob.epoc) {
            value = Number(dob.epoc) * 1000;
        }
        else {
            var day = Number(dob.date.day);
            var month = Number(dob.date.month) - 1;
            var year = Number(dob.date.year);
            value = new Date(year, month, day).getTime();
        }
        return value;
    };
    BioFormComponent.prototype.onSubmit = function () {
        var _this = this;
        var bio = this.bioForm.value;
        bio.dob = this.getEpoc(bio.dob);
        this.userService.updatePerson(bio, this.aPerson.id).subscribe(function () {
            _this.saveBio.emit({ action: 'save_success' });
        }, function (err) {
            _this.saveBio.emit({ action: 'save_failure' });
        });
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], BioFormComponent.prototype, "person", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], BioFormComponent.prototype, "saveBio", void 0);
    BioFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'bio-form',
            template: __webpack_require__("./client/app/shared/forms/bio-form/bio-form.component.html"),
            styles: [__webpack_require__("./client/app/shared/forms/bio-form/bio-form.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]])
    ], BioFormComponent);
    return BioFormComponent;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_form__["a" /* AbstractFormComponent */]));



/***/ }),

/***/ "./client/app/shared/forms/organization-form/organization-form.component.html":
/***/ (function(module, exports) {

module.exports = "<base-form [fields]=\"fields\" [model]=\"model\" (ngSubmit)=\"onSubmit($event)\">\n\t<hr class=\"space-hr\"/>\n  <button type=\"submit\" class=\"btn btn-primary btn-sm\" [disabled]=\"disable || !baseForm.form.valid\">{{submitText}}</button>\n  <span class=\"spacer\">&nbsp;</span>\n  <button type=\"submit\" class=\"btn btn-danger btn-sm\" title=\"Cancel\" (click)=\"onCancel($event)\">Cancel</button>\n</base-form>\n"

/***/ }),

/***/ "./client/app/shared/forms/organization-form/organization-form.component.scss":
/***/ (function(module, exports) {

module.exports = ".space-hr {\n  padding: 5px; }\n\n.spacer {\n  display: inline-block;\n  min-width: 3em; }\n"

/***/ }),

/***/ "./client/app/shared/forms/organization-form/organization-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OrganizationFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_states_service__ = __webpack_require__("./client/app/services/states.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__formly_base_form_base_form_component__ = __webpack_require__("./client/app/shared/formly/base-form/base-form.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var OrganizationFormComponent = /** @class */ (function () {
    function OrganizationFormComponent(statesService) {
        this.statesService = statesService;
        this.submitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.cancelSubmitter = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        this.model = {};
        this.disable = true;
        this.submitText = this.getSubmitText(false);
        this.disable = true;
    }
    Object.defineProperty(OrganizationFormComponent.prototype, "aModel", {
        set: function (model) {
            var hasId = this.modelHasId(model);
            this.submitText = this.getSubmitText(hasId);
            this.model = __WEBPACK_IMPORTED_MODULE_3_lodash__["cloneDeep"](model);
        },
        enumerable: true,
        configurable: true
    });
    OrganizationFormComponent.prototype.modelHasId = function (model) {
        return __WEBPACK_IMPORTED_MODULE_3_lodash__["has"](model, 'id') && Number(model.id) > 0;
    };
    OrganizationFormComponent.prototype.getSubmitText = function (hasId) {
        return hasId ? 'Edit Organization' : 'Create Organization';
    };
    OrganizationFormComponent.prototype.ngOnInit = function () {
        this.states = this.statesService.getStatesProvinces();
        this.fields = [
            {
                fieldGroupClassName: 'row',
                fieldGroup: [
                    {
                        className: 'col-sm-12',
                        type: 'input',
                        key: 'name',
                        templateOptions: {
                            label: 'Organization Name',
                            required: true,
                            minLength: 5,
                            pattern: /\w+[a-zA-Z0-9]/
                        }
                    }
                ]
            },
            {
                template: '<hr class="space-hr" /><div><strong>Address</strong></div>'
            },
            {
                key: 'addresses',
                type: 'repeat',
                fieldArray: {
                    fieldGroupClassName: 'row',
                    templateOptions: {
                        btnText: 'Add Address'
                    },
                    fieldGroup: [
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
                                options: __WEBPACK_IMPORTED_MODULE_3_lodash__["cloneDeep"](this.states),
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
                        },
                        {
                            type: 'input',
                            key: 'country',
                            className: 'col-sm-12',
                            templateOptions: {
                                label: 'Country'
                            }
                        }
                    ]
                }
            },
            {
                template: '<hr class="space-hr" /><div><strong>Phones</strong></div>'
            },
            {
                key: 'phones',
                type: 'repeat',
                fieldArray: {
                    fieldGroupClassName: 'row',
                    templateOptions: {
                        btnText: 'Add Phone'
                    },
                    fieldGroup: [
                        {
                            className: 'col-sm-6',
                            type: 'select',
                            key: 'description',
                            templateOptions: {
                                label: 'Type',
                                required: true,
                                options: [
                                    { label: 'Mobile', value: 'mobile' },
                                    { label: 'Home', value: 'home' },
                                    { label: 'Work', value: 'work' },
                                    { label: 'Other', value: 'other' }
                                ]
                            }
                        },
                        {
                            type: 'input',
                            key: 'number',
                            className: 'col-sm-6',
                            templateOptions: {
                                type: 'text',
                                label: 'Number',
                                pattern: /(\d{3}-\d{3}-\d{4}|\d{10,})/,
                                required: true
                            }
                        }
                    ]
                }
            }
        ];
    };
    OrganizationFormComponent.prototype.ngAfterViewInit = function () {
        this.disable = false;
    };
    OrganizationFormComponent.prototype.onSubmit = function (model) {
        this.submitter.emit(model);
    };
    OrganizationFormComponent.prototype.onCancel = function (event) {
        this.cancelSubmitter.emit(true);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ViewChild"])(__WEBPACK_IMPORTED_MODULE_2__formly_base_form_base_form_component__["a" /* BaseFormComponent */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_2__formly_base_form_base_form_component__["a" /* BaseFormComponent */])
    ], OrganizationFormComponent.prototype, "baseForm", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])('model'),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], OrganizationFormComponent.prototype, "aModel", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('ngSubmit'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], OrganizationFormComponent.prototype, "submitter", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])('ngCancel'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], OrganizationFormComponent.prototype, "cancelSubmitter", void 0);
    OrganizationFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'organization-form',
            template: __webpack_require__("./client/app/shared/forms/organization-form/organization-form.component.html"),
            styles: [__webpack_require__("./client/app/shared/forms/organization-form/organization-form.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__services_states_service__["a" /* StatesService */]])
    ], OrganizationFormComponent);
    return OrganizationFormComponent;
}());



/***/ }),

/***/ "./client/app/shared/forms/password-form/password-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fadeInForm\">\n    <form [formGroup]=\"passwordForm\" (ngSubmit)=\"onPasswordSubmit()\">\n      <div class=\"input-group\" [ngClass]=\"{ 'has-danger': password1Invalid }\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n        <input class=\"form-control\" type=\"password\" formControlName=\"password1\" placeholder=\"New password\">\n      </div>\n      <div class=\"input-group\" [ngClass]=\"{ 'has-danger': password2Invalid }\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n        <input class=\"form-control\" type=\"password\" formControlName=\"password2\" placeholder=\"Repeat new password\">\n      </div>\n      <br>\n      <div>\n        <button type=\"submit\" title=\"Save new password\" class=\"btn btn-primary btn-sm\" [disabled]=\"passwordForm.invalid\"><i class=\"fa fa-save\"></i>Save</button>\n        <button class=\"btn btn-secondary btn-sm\" title=\"Cancel new password\" (click)=\"onCancel($event)\"><i class=\"fa fa-times\"></i>Cancel</button>\n      </div>\n    </form>\n</div>\n"

/***/ }),

/***/ "./client/app/shared/forms/password-form/password-form.component.scss":
/***/ (function(module, exports) {

module.exports = ".input-group {\n  margin-bottom: 0.5em; }\n"

/***/ }),

/***/ "./client/app/shared/forms/password-form/password-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PasswordFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_form__ = __webpack_require__("./client/app/shared/forms/abstract-form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__compareFields__ = __webpack_require__("./client/app/shared/compareFields.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PasswordFormComponent = /** @class */ (function (_super) {
    __extends(PasswordFormComponent, _super);
    function PasswordFormComponent(formBuilder, userService) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.userService = userService;
        _this.showDivreset = true;
        _this.password1Invalid = false;
        _this.password2Invalid = false;
        _this.savePassword = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.passwordForm = _this.formBuilder.group({
            password1: [
                '',
                [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(6)]
            ],
            password2: [
                '',
                [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(6)]
            ]
        }, { validator: Object(__WEBPACK_IMPORTED_MODULE_3__compareFields__["a" /* compareFields */])('password1', 'password2') });
        _this.setUpValidators(_this.passwordForm, ['password1', 'password2']);
        return _this;
    }
    PasswordFormComponent.prototype.onPasswordSubmit = function () {
        var _this = this;
        this.userService
            .changepassword(this.passwordForm.value, this.user.id)
            .subscribe(function () {
            _this.savePassword.emit({ action: 'save_success' });
        }, function (err) {
            _this.savePassword.emit({ action: 'save_failure' });
        });
    };
    PasswordFormComponent.prototype.fillForm = function () {
        this.passwordForm.setValue({
            password1: '',
            password2: ''
        });
    };
    PasswordFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PasswordFormComponent.prototype, "savePassword", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], PasswordFormComponent.prototype, "user", void 0);
    PasswordFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'password-form',
            template: __webpack_require__("./client/app/shared/forms/password-form/password-form.component.html"),
            styles: [__webpack_require__("./client/app/shared/forms/password-form/password-form.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]])
    ], PasswordFormComponent);
    return PasswordFormComponent;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_form__["a" /* AbstractFormComponent */]));



/***/ }),

/***/ "./client/app/shared/forms/phone-form/phone-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"fadeInForm\">\n\n    <form [formGroup]=\"phoneForm\" (ngSubmit)=\"onPhoneSubmit()\">\n      <div class=\"input-group\" [ngClass]=\"{ 'has-danger': descriptionInvalid || numberInvalid }\">\n\n        <label class=\"center-block\">\n          <select class=\"form-control\" formControlName=\"description\">\n            <option value=\"\" selected disabled>Type</option>\n            <option value=\"mobile\">Mobile</option>\n            <option value=\"home\">Home</option>\n            <option value=\"work\">Work</option>\n            <option value=\"other\">Other</option>\n          </select>\n\n          <div class=\"input-group required-field-block\">\n            <span class=\"input-group-addon\">\n              <i class=\"fa fa-phone\"></i>\n            </span>\n            <input class=\"form-control\" formControlName=\"number\" placeholder=\"Phone Number\" autofocus aria-describedby=\"basic-addon-phone\">\n          </div>\n        </label>\n\n      </div>\n\n      <br>\n      <div>\n        <button type=\"submit\" title=\"Save phone information.\" class=\"btn btn-primary btn-sm\" [disabled]=\"phoneForm.invalid\"><i class=\"fa fa-save\"></i>Save</button>\n        <button title=\"Cancel phone information.\" class=\"btn btn-secondary btn-sm\" (click)=\"onCancel($event)\"><i class=\"fa fa-times\"></i>Cancel</button>\n      </div>\n    </form>\n</div>\n"

/***/ }),

/***/ "./client/app/shared/forms/phone-form/phone-form.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/shared/forms/phone-form/phone-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__abstract_form__ = __webpack_require__("./client/app/shared/forms/abstract-form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__("./node_modules/lodash/lodash.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var PhoneFormComponent = /** @class */ (function (_super) {
    __extends(PhoneFormComponent, _super);
    function PhoneFormComponent(formBuilder) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.savePhone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.numberInvalid = false;
        _this.descriptionInvalid = false;
        _this.phoneForm = _this.formBuilder.group({
            number: [
                '',
                [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(6), __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(20)]
            ],
            description: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(10),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)
                ]
            ]
        });
        _this.setUpValidators(_this.phoneForm, ['number', 'description']);
        return _this;
    }
    Object.defineProperty(PhoneFormComponent.prototype, "phone", {
        set: function (aPhone) {
            this.telephone = aPhone;
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    PhoneFormComponent.prototype.fillForm = function () {
        this.phoneForm.setValue({
            number: this.telephone.number || '',
            description: this.telephone.description || ''
        });
    };
    PhoneFormComponent.prototype.onPhoneSubmit = function () {
        var _this = this;
        if (this.phoneService) {
            var newPhone = this.phoneForm.value;
            var observable = void 0;
            newPhone.id = this.telephone.id;
            this.savePhone.emit({ action: 'show_overlay' });
            if (__WEBPACK_IMPORTED_MODULE_3_lodash__["isNil"](newPhone.id) || parseInt(newPhone.id) === 0) {
                observable = this.phoneService.createPhone(newPhone);
            }
            else {
                observable = this.phoneService.updatePhone(newPhone);
            }
            observable.subscribe(function () {
                _this.savePhone.emit({ action: 'save_success' });
            }, function (err) {
                _this.savePhone.emit({ action: 'save_failure' });
            });
        }
    };
    PhoneFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], PhoneFormComponent.prototype, "savePhone", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], PhoneFormComponent.prototype, "phone", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], PhoneFormComponent.prototype, "phoneService", void 0);
    PhoneFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'phone-form',
            template: __webpack_require__("./client/app/shared/forms/phone-form/phone-form.component.html"),
            styles: [__webpack_require__("./client/app/shared/forms/phone-form/phone-form.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"]])
    ], PhoneFormComponent);
    return PhoneFormComponent;
}(__WEBPACK_IMPORTED_MODULE_2__abstract_form__["a" /* AbstractFormComponent */]));



/***/ }),

/***/ "./client/app/shared/forms/zone-form/zone-form.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card card-outline-success\">\n  <div class=\"card-block numberbg\">\n\n    <form [formGroup]=\"zoneForm\" (ngSubmit)=\"onZoneSubmit()\">\n      <p>Please update your availability zone. </p>\n      <div class=\"profile-div\">\n\n        <div class=\"form-group\" [ngClass]=\"{ 'has-danger': cityInvalid }\">\n          <label class=\"center-block\">City:\n            <input class=\"form-control\" formControlName=\"city\">\n          </label>\n        </div>\n        <div class=\"form-group\">\n          <label class=\"center-block\">State:\n            <select class=\"form-control\" formControlName=\"state\">\n              <option *ngFor=\"let state of states\" value=\"{{state.abbreviation}}\">{{state.name}}</option>\n            </select>\n          </label>\n        </div>\n        <div class=\"form-group\" [ngClass]=\"{ 'has-danger': zipInvalid }\">\n          <label class=\"center-block\">Zip Code:\n            <input class=\"form-control\" formControlName=\"zip\">\n          </label>\n        </div>\n\n        <div class=\"form-group\" [ngClass]=\"{ 'has-danger': radiusInvalid }\">\n          <label class=\"center-block\">Travel Radius:\n            <input class=\"form-control\" formControlName=\"radius\">\n          </label>\n        </div>\n      </div>\n\n      <div>\n        <button type=\"submit\" title=\"Save new zone.\" class=\"btn btn-primary btn-sm\" [disabled]=\"zoneForm.invalid\"><i class=\"fa fa-save\"></i>Save</button>\n        <button title=\"Cancel new zone.\" class=\"btn btn-secondary btn-sm\" (click)=\"onCancel($event)\"><i class=\"fa fa-times\"></i>Cancel</button>\n      </div>\n    </form>\n\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/shared/forms/zone-form/zone-form.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/shared/forms/zone-form/zone-form.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ZoneFormComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_states_service__ = __webpack_require__("./client/app/services/states.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__abstract_form__ = __webpack_require__("./client/app/shared/forms/abstract-form.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_debounceTime__ = __webpack_require__("./node_modules/rxjs/_esm5/add/operator/debounceTime.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ZoneFormComponent = /** @class */ (function (_super) {
    __extends(ZoneFormComponent, _super);
    function ZoneFormComponent(formBuilder, statesService) {
        var _this = _super.call(this) || this;
        _this.formBuilder = formBuilder;
        _this.statesService = statesService;
        _this.countryName = 'usa';
        _this.radiusInvalid = false;
        _this.cityInvalid = false;
        _this.zipInvalid = false;
        _this.saveZone = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
        _this.zoneForm = _this.formBuilder.group({
            city: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(30),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)
                ]
            ],
            state: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(20),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.alphaNumericRegex)
                ]
            ],
            zip: [
                '',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(2),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(12),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern(_this.zipRegex)
                ]
            ],
            radius: [
                '5',
                [
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].minLength(1),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].maxLength(3),
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["Validators"].pattern('\\d{1,3}')
                ]
            ]
        });
        _this.setUpValidators(_this.zoneForm, ['city', 'zip', 'radius']);
        return _this;
    }
    Object.defineProperty(ZoneFormComponent.prototype, "zone", {
        set: function (aZone) {
            this.aZone = aZone;
            this.fillForm();
        },
        enumerable: true,
        configurable: true
    });
    ZoneFormComponent.prototype.country = function (aCountry) {
        if (aCountry === void 0) { aCountry = 'usa'; }
        this.countryName = aCountry;
        this.fillForm();
    };
    ZoneFormComponent.prototype.fillForm = function () {
        this.states = this.statesService.getStatesProvinces(this.countryName);
        this.zoneForm.setValue({
            city: this.aZone.city,
            state: this.aZone.state,
            zip: this.aZone.zip,
            radius: this.aZone.radius || 5
        });
    };
    ZoneFormComponent.prototype.ngOnInit = function () {
        this.fillForm();
    };
    ZoneFormComponent.prototype.onZoneSubmit = function () {
        this.saveZone.emit(this.zoneForm.value);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", Object)
    ], ZoneFormComponent.prototype, "saveZone", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ZoneFormComponent.prototype, "zone", null);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], ZoneFormComponent.prototype, "country", null);
    ZoneFormComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'zone-form',
            template: __webpack_require__("./client/app/shared/forms/zone-form/zone-form.component.html"),
            styles: [__webpack_require__("./client/app/shared/forms/zone-form/zone-form.component.scss")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"],
            __WEBPACK_IMPORTED_MODULE_2__services_states_service__["a" /* StatesService */]])
    ], ZoneFormComponent);
    return ZoneFormComponent;
}(__WEBPACK_IMPORTED_MODULE_3__abstract_form__["a" /* AbstractFormComponent */]));



/***/ }),

/***/ "./client/app/shared/loading/loading.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\" *ngIf=\"condition\">\n  <h4 class=\"card-header\">Loading...</h4>\n  <div class=\"card-block text-xs-center\">\n    <i class=\"fa fa-circle-o-notch fa-spin fa-3x\"></i>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/shared/loading/loading.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./client/app/shared/loading/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
    }
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Boolean)
    ], LoadingComponent.prototype, "condition", void 0);
    LoadingComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-loading',
            template: __webpack_require__("./client/app/shared/loading/loading.component.html"),
            styles: [__webpack_require__("./client/app/shared/loading/loading.component.scss")]
        })
    ], LoadingComponent);
    return LoadingComponent;
}());



/***/ }),

/***/ "./client/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading_loading_component__ = __webpack_require__("./client/app/shared/loading/loading.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__account_profile_suspended_suspended_component__ = __webpack_require__("./client/app/account/profile/suspended/suspended.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__account_profile_deactivated_deactivated_component__ = __webpack_require__("./client/app/account/profile/deactivated/deactivated.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__account_profile_standby_standby_component__ = __webpack_require__("./client/app/account/profile/standby/standby.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__account_profile_passwordreset_passwordreset_component__ = __webpack_require__("./client/app/account/profile/passwordreset/passwordreset.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










// import { RichGridComponent } from '../rich-grid-example/rich-grid.component';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"], __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */]],
            exports: [
                // Shared Modules
                __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["b" /* HttpModule */],
                // Shared Components
                __WEBPACK_IMPORTED_MODULE_4__toast_toast_component__["a" /* ToastComponent */],
                __WEBPACK_IMPORTED_MODULE_5__loading_loading_component__["a" /* LoadingComponent */]
            ],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__toast_toast_component__["a" /* ToastComponent */],
                __WEBPACK_IMPORTED_MODULE_5__loading_loading_component__["a" /* LoadingComponent */],
                __WEBPACK_IMPORTED_MODULE_6__account_profile_suspended_suspended_component__["a" /* SuspendedComponent */],
                __WEBPACK_IMPORTED_MODULE_7__account_profile_deactivated_deactivated_component__["a" /* DeactivatedComponent */],
                __WEBPACK_IMPORTED_MODULE_8__account_profile_standby_standby_component__["a" /* StandbyComponent */],
                __WEBPACK_IMPORTED_MODULE_9__account_profile_passwordreset_passwordreset_component__["a" /* PasswordresetComponent */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_4__toast_toast_component__["a" /* ToastComponent */]]
        })
    ], SharedModule);
    return SharedModule;
}());



/***/ }),

/***/ "./client/app/shared/toast/toast.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message.body\" class=\"alert alert-{{message.type}} alert-dismissible\" role=\"alert\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <strong>Message:</strong> {{message.body}}\n</div>"

/***/ }),

/***/ "./client/app/shared/toast/toast.component.scss":
/***/ (function(module, exports) {

module.exports = ".alert {\n  z-index: 999;\n  position: fixed;\n  bottom: 15px;\n  left: 25%;\n  width: 50%;\n  opacity: 0.9; }\n"

/***/ }),

/***/ "./client/app/shared/toast/toast.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToastComponent = /** @class */ (function () {
    function ToastComponent() {
        this.message = { body: '', type: '' };
    }
    ToastComponent.prototype.setMessage = function (body, type, time) {
        var _this = this;
        if (time === void 0) { time = 10000; }
        this.message.body = body;
        this.message.type = type;
        setTimeout(function () {
            _this.message.body = '';
        }, time);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Object)
    ], ToastComponent.prototype, "message", void 0);
    ToastComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-toast',
            template: __webpack_require__("./client/app/shared/toast/toast.component.html"),
            styles: [__webpack_require__("./client/app/shared/toast/toast.component.scss")]
        })
    ], ToastComponent);
    return ToastComponent;
}());



/***/ }),

/***/ "./client/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./client/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./client/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./client/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);


/***/ }),

/***/ "./node_modules/moment/locale recursive ^\\.\\/.*$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": "./node_modules/moment/locale/af.js",
	"./af.js": "./node_modules/moment/locale/af.js",
	"./ar": "./node_modules/moment/locale/ar.js",
	"./ar-dz": "./node_modules/moment/locale/ar-dz.js",
	"./ar-dz.js": "./node_modules/moment/locale/ar-dz.js",
	"./ar-kw": "./node_modules/moment/locale/ar-kw.js",
	"./ar-kw.js": "./node_modules/moment/locale/ar-kw.js",
	"./ar-ly": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ly.js": "./node_modules/moment/locale/ar-ly.js",
	"./ar-ma": "./node_modules/moment/locale/ar-ma.js",
	"./ar-ma.js": "./node_modules/moment/locale/ar-ma.js",
	"./ar-sa": "./node_modules/moment/locale/ar-sa.js",
	"./ar-sa.js": "./node_modules/moment/locale/ar-sa.js",
	"./ar-tn": "./node_modules/moment/locale/ar-tn.js",
	"./ar-tn.js": "./node_modules/moment/locale/ar-tn.js",
	"./ar.js": "./node_modules/moment/locale/ar.js",
	"./az": "./node_modules/moment/locale/az.js",
	"./az.js": "./node_modules/moment/locale/az.js",
	"./be": "./node_modules/moment/locale/be.js",
	"./be.js": "./node_modules/moment/locale/be.js",
	"./bg": "./node_modules/moment/locale/bg.js",
	"./bg.js": "./node_modules/moment/locale/bg.js",
	"./bm": "./node_modules/moment/locale/bm.js",
	"./bm.js": "./node_modules/moment/locale/bm.js",
	"./bn": "./node_modules/moment/locale/bn.js",
	"./bn.js": "./node_modules/moment/locale/bn.js",
	"./bo": "./node_modules/moment/locale/bo.js",
	"./bo.js": "./node_modules/moment/locale/bo.js",
	"./br": "./node_modules/moment/locale/br.js",
	"./br.js": "./node_modules/moment/locale/br.js",
	"./bs": "./node_modules/moment/locale/bs.js",
	"./bs.js": "./node_modules/moment/locale/bs.js",
	"./ca": "./node_modules/moment/locale/ca.js",
	"./ca.js": "./node_modules/moment/locale/ca.js",
	"./cs": "./node_modules/moment/locale/cs.js",
	"./cs.js": "./node_modules/moment/locale/cs.js",
	"./cv": "./node_modules/moment/locale/cv.js",
	"./cv.js": "./node_modules/moment/locale/cv.js",
	"./cy": "./node_modules/moment/locale/cy.js",
	"./cy.js": "./node_modules/moment/locale/cy.js",
	"./da": "./node_modules/moment/locale/da.js",
	"./da.js": "./node_modules/moment/locale/da.js",
	"./de": "./node_modules/moment/locale/de.js",
	"./de-at": "./node_modules/moment/locale/de-at.js",
	"./de-at.js": "./node_modules/moment/locale/de-at.js",
	"./de-ch": "./node_modules/moment/locale/de-ch.js",
	"./de-ch.js": "./node_modules/moment/locale/de-ch.js",
	"./de.js": "./node_modules/moment/locale/de.js",
	"./dv": "./node_modules/moment/locale/dv.js",
	"./dv.js": "./node_modules/moment/locale/dv.js",
	"./el": "./node_modules/moment/locale/el.js",
	"./el.js": "./node_modules/moment/locale/el.js",
	"./en-au": "./node_modules/moment/locale/en-au.js",
	"./en-au.js": "./node_modules/moment/locale/en-au.js",
	"./en-ca": "./node_modules/moment/locale/en-ca.js",
	"./en-ca.js": "./node_modules/moment/locale/en-ca.js",
	"./en-gb": "./node_modules/moment/locale/en-gb.js",
	"./en-gb.js": "./node_modules/moment/locale/en-gb.js",
	"./en-ie": "./node_modules/moment/locale/en-ie.js",
	"./en-ie.js": "./node_modules/moment/locale/en-ie.js",
	"./en-il": "./node_modules/moment/locale/en-il.js",
	"./en-il.js": "./node_modules/moment/locale/en-il.js",
	"./en-nz": "./node_modules/moment/locale/en-nz.js",
	"./en-nz.js": "./node_modules/moment/locale/en-nz.js",
	"./eo": "./node_modules/moment/locale/eo.js",
	"./eo.js": "./node_modules/moment/locale/eo.js",
	"./es": "./node_modules/moment/locale/es.js",
	"./es-do": "./node_modules/moment/locale/es-do.js",
	"./es-do.js": "./node_modules/moment/locale/es-do.js",
	"./es-us": "./node_modules/moment/locale/es-us.js",
	"./es-us.js": "./node_modules/moment/locale/es-us.js",
	"./es.js": "./node_modules/moment/locale/es.js",
	"./et": "./node_modules/moment/locale/et.js",
	"./et.js": "./node_modules/moment/locale/et.js",
	"./eu": "./node_modules/moment/locale/eu.js",
	"./eu.js": "./node_modules/moment/locale/eu.js",
	"./fa": "./node_modules/moment/locale/fa.js",
	"./fa.js": "./node_modules/moment/locale/fa.js",
	"./fi": "./node_modules/moment/locale/fi.js",
	"./fi.js": "./node_modules/moment/locale/fi.js",
	"./fo": "./node_modules/moment/locale/fo.js",
	"./fo.js": "./node_modules/moment/locale/fo.js",
	"./fr": "./node_modules/moment/locale/fr.js",
	"./fr-ca": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ca.js": "./node_modules/moment/locale/fr-ca.js",
	"./fr-ch": "./node_modules/moment/locale/fr-ch.js",
	"./fr-ch.js": "./node_modules/moment/locale/fr-ch.js",
	"./fr.js": "./node_modules/moment/locale/fr.js",
	"./fy": "./node_modules/moment/locale/fy.js",
	"./fy.js": "./node_modules/moment/locale/fy.js",
	"./gd": "./node_modules/moment/locale/gd.js",
	"./gd.js": "./node_modules/moment/locale/gd.js",
	"./gl": "./node_modules/moment/locale/gl.js",
	"./gl.js": "./node_modules/moment/locale/gl.js",
	"./gom-latn": "./node_modules/moment/locale/gom-latn.js",
	"./gom-latn.js": "./node_modules/moment/locale/gom-latn.js",
	"./gu": "./node_modules/moment/locale/gu.js",
	"./gu.js": "./node_modules/moment/locale/gu.js",
	"./he": "./node_modules/moment/locale/he.js",
	"./he.js": "./node_modules/moment/locale/he.js",
	"./hi": "./node_modules/moment/locale/hi.js",
	"./hi.js": "./node_modules/moment/locale/hi.js",
	"./hr": "./node_modules/moment/locale/hr.js",
	"./hr.js": "./node_modules/moment/locale/hr.js",
	"./hu": "./node_modules/moment/locale/hu.js",
	"./hu.js": "./node_modules/moment/locale/hu.js",
	"./hy-am": "./node_modules/moment/locale/hy-am.js",
	"./hy-am.js": "./node_modules/moment/locale/hy-am.js",
	"./id": "./node_modules/moment/locale/id.js",
	"./id.js": "./node_modules/moment/locale/id.js",
	"./is": "./node_modules/moment/locale/is.js",
	"./is.js": "./node_modules/moment/locale/is.js",
	"./it": "./node_modules/moment/locale/it.js",
	"./it.js": "./node_modules/moment/locale/it.js",
	"./ja": "./node_modules/moment/locale/ja.js",
	"./ja.js": "./node_modules/moment/locale/ja.js",
	"./jv": "./node_modules/moment/locale/jv.js",
	"./jv.js": "./node_modules/moment/locale/jv.js",
	"./ka": "./node_modules/moment/locale/ka.js",
	"./ka.js": "./node_modules/moment/locale/ka.js",
	"./kk": "./node_modules/moment/locale/kk.js",
	"./kk.js": "./node_modules/moment/locale/kk.js",
	"./km": "./node_modules/moment/locale/km.js",
	"./km.js": "./node_modules/moment/locale/km.js",
	"./kn": "./node_modules/moment/locale/kn.js",
	"./kn.js": "./node_modules/moment/locale/kn.js",
	"./ko": "./node_modules/moment/locale/ko.js",
	"./ko.js": "./node_modules/moment/locale/ko.js",
	"./ky": "./node_modules/moment/locale/ky.js",
	"./ky.js": "./node_modules/moment/locale/ky.js",
	"./lb": "./node_modules/moment/locale/lb.js",
	"./lb.js": "./node_modules/moment/locale/lb.js",
	"./lo": "./node_modules/moment/locale/lo.js",
	"./lo.js": "./node_modules/moment/locale/lo.js",
	"./lt": "./node_modules/moment/locale/lt.js",
	"./lt.js": "./node_modules/moment/locale/lt.js",
	"./lv": "./node_modules/moment/locale/lv.js",
	"./lv.js": "./node_modules/moment/locale/lv.js",
	"./me": "./node_modules/moment/locale/me.js",
	"./me.js": "./node_modules/moment/locale/me.js",
	"./mi": "./node_modules/moment/locale/mi.js",
	"./mi.js": "./node_modules/moment/locale/mi.js",
	"./mk": "./node_modules/moment/locale/mk.js",
	"./mk.js": "./node_modules/moment/locale/mk.js",
	"./ml": "./node_modules/moment/locale/ml.js",
	"./ml.js": "./node_modules/moment/locale/ml.js",
	"./mr": "./node_modules/moment/locale/mr.js",
	"./mr.js": "./node_modules/moment/locale/mr.js",
	"./ms": "./node_modules/moment/locale/ms.js",
	"./ms-my": "./node_modules/moment/locale/ms-my.js",
	"./ms-my.js": "./node_modules/moment/locale/ms-my.js",
	"./ms.js": "./node_modules/moment/locale/ms.js",
	"./mt": "./node_modules/moment/locale/mt.js",
	"./mt.js": "./node_modules/moment/locale/mt.js",
	"./my": "./node_modules/moment/locale/my.js",
	"./my.js": "./node_modules/moment/locale/my.js",
	"./nb": "./node_modules/moment/locale/nb.js",
	"./nb.js": "./node_modules/moment/locale/nb.js",
	"./ne": "./node_modules/moment/locale/ne.js",
	"./ne.js": "./node_modules/moment/locale/ne.js",
	"./nl": "./node_modules/moment/locale/nl.js",
	"./nl-be": "./node_modules/moment/locale/nl-be.js",
	"./nl-be.js": "./node_modules/moment/locale/nl-be.js",
	"./nl.js": "./node_modules/moment/locale/nl.js",
	"./nn": "./node_modules/moment/locale/nn.js",
	"./nn.js": "./node_modules/moment/locale/nn.js",
	"./pa-in": "./node_modules/moment/locale/pa-in.js",
	"./pa-in.js": "./node_modules/moment/locale/pa-in.js",
	"./pl": "./node_modules/moment/locale/pl.js",
	"./pl.js": "./node_modules/moment/locale/pl.js",
	"./pt": "./node_modules/moment/locale/pt.js",
	"./pt-br": "./node_modules/moment/locale/pt-br.js",
	"./pt-br.js": "./node_modules/moment/locale/pt-br.js",
	"./pt.js": "./node_modules/moment/locale/pt.js",
	"./ro": "./node_modules/moment/locale/ro.js",
	"./ro.js": "./node_modules/moment/locale/ro.js",
	"./ru": "./node_modules/moment/locale/ru.js",
	"./ru.js": "./node_modules/moment/locale/ru.js",
	"./sd": "./node_modules/moment/locale/sd.js",
	"./sd.js": "./node_modules/moment/locale/sd.js",
	"./se": "./node_modules/moment/locale/se.js",
	"./se.js": "./node_modules/moment/locale/se.js",
	"./si": "./node_modules/moment/locale/si.js",
	"./si.js": "./node_modules/moment/locale/si.js",
	"./sk": "./node_modules/moment/locale/sk.js",
	"./sk.js": "./node_modules/moment/locale/sk.js",
	"./sl": "./node_modules/moment/locale/sl.js",
	"./sl.js": "./node_modules/moment/locale/sl.js",
	"./sq": "./node_modules/moment/locale/sq.js",
	"./sq.js": "./node_modules/moment/locale/sq.js",
	"./sr": "./node_modules/moment/locale/sr.js",
	"./sr-cyrl": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr-cyrl.js": "./node_modules/moment/locale/sr-cyrl.js",
	"./sr.js": "./node_modules/moment/locale/sr.js",
	"./ss": "./node_modules/moment/locale/ss.js",
	"./ss.js": "./node_modules/moment/locale/ss.js",
	"./sv": "./node_modules/moment/locale/sv.js",
	"./sv.js": "./node_modules/moment/locale/sv.js",
	"./sw": "./node_modules/moment/locale/sw.js",
	"./sw.js": "./node_modules/moment/locale/sw.js",
	"./ta": "./node_modules/moment/locale/ta.js",
	"./ta.js": "./node_modules/moment/locale/ta.js",
	"./te": "./node_modules/moment/locale/te.js",
	"./te.js": "./node_modules/moment/locale/te.js",
	"./tet": "./node_modules/moment/locale/tet.js",
	"./tet.js": "./node_modules/moment/locale/tet.js",
	"./tg": "./node_modules/moment/locale/tg.js",
	"./tg.js": "./node_modules/moment/locale/tg.js",
	"./th": "./node_modules/moment/locale/th.js",
	"./th.js": "./node_modules/moment/locale/th.js",
	"./tl-ph": "./node_modules/moment/locale/tl-ph.js",
	"./tl-ph.js": "./node_modules/moment/locale/tl-ph.js",
	"./tlh": "./node_modules/moment/locale/tlh.js",
	"./tlh.js": "./node_modules/moment/locale/tlh.js",
	"./tr": "./node_modules/moment/locale/tr.js",
	"./tr.js": "./node_modules/moment/locale/tr.js",
	"./tzl": "./node_modules/moment/locale/tzl.js",
	"./tzl.js": "./node_modules/moment/locale/tzl.js",
	"./tzm": "./node_modules/moment/locale/tzm.js",
	"./tzm-latn": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm-latn.js": "./node_modules/moment/locale/tzm-latn.js",
	"./tzm.js": "./node_modules/moment/locale/tzm.js",
	"./ug-cn": "./node_modules/moment/locale/ug-cn.js",
	"./ug-cn.js": "./node_modules/moment/locale/ug-cn.js",
	"./uk": "./node_modules/moment/locale/uk.js",
	"./uk.js": "./node_modules/moment/locale/uk.js",
	"./ur": "./node_modules/moment/locale/ur.js",
	"./ur.js": "./node_modules/moment/locale/ur.js",
	"./uz": "./node_modules/moment/locale/uz.js",
	"./uz-latn": "./node_modules/moment/locale/uz-latn.js",
	"./uz-latn.js": "./node_modules/moment/locale/uz-latn.js",
	"./uz.js": "./node_modules/moment/locale/uz.js",
	"./vi": "./node_modules/moment/locale/vi.js",
	"./vi.js": "./node_modules/moment/locale/vi.js",
	"./x-pseudo": "./node_modules/moment/locale/x-pseudo.js",
	"./x-pseudo.js": "./node_modules/moment/locale/x-pseudo.js",
	"./yo": "./node_modules/moment/locale/yo.js",
	"./yo.js": "./node_modules/moment/locale/yo.js",
	"./zh-cn": "./node_modules/moment/locale/zh-cn.js",
	"./zh-cn.js": "./node_modules/moment/locale/zh-cn.js",
	"./zh-hk": "./node_modules/moment/locale/zh-hk.js",
	"./zh-hk.js": "./node_modules/moment/locale/zh-hk.js",
	"./zh-tw": "./node_modules/moment/locale/zh-tw.js",
	"./zh-tw.js": "./node_modules/moment/locale/zh-tw.js"
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./node_modules/moment/locale recursive ^\\.\\/.*$";

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./client/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map