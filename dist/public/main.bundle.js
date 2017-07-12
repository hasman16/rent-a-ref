webpackJsonp([1],{

/***/ "./client async recursive":
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./client async recursive";

/***/ }),

/***/ "./client/app/about/about.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <h4 class=\"card-header\">About Us</h4>\n  <div class=\"card-block\">\n    <blockquote>\n      <p>Rent-A-Ref is an ever growing Community of Sports Professionals that connects Leagues, Tournaments and Referees that help service one another.</p>      \n    </blockquote>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/about/about.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/about/about.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutComponent = (function () {
    function AboutComponent() {
    }
    return AboutComponent;
}());
AboutComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-about',
        template: __webpack_require__("./client/app/about/about.component.html"),
        styles: [__webpack_require__("./client/app/about/about.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], AboutComponent);

//# sourceMappingURL=about.component.js.map

/***/ }),

/***/ "./client/app/account/account.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading [condition]=\"isLoading\"></app-loading>\n\n<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"card\" *ngIf=\"!isLoading\">\n  <h4 class=\"card-header\">Account settings</h4>\n  <div class=\"card-block\">\n    <form #accountForm=\"ngForm\" (ngSubmit)=\"save(user)\">\n      <div class=\"input-group\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-user\"></i></span>\n        <input class=\"form-control\" type=\"text\" name=\"username\" [(ngModel)]=\"user.username\" placeholder=\"Username\" required>\n      </div>\n      <div class=\"input-group\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-envelope\"></i></span>\n        <input class=\"form-control\" type=\"email\" name=\"email\" [(ngModel)]=\"user.email\" placeholder=\"Email\" required>\n      </div>\n      <div class=\"input-group\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-black-tie\"></i></span>\n        <select class=\"form-control\" name=\"role\" [(ngModel)]=\"user.role\">\n          <option value=\"\" disabled>Role</option>\n          <option value=\"user\">User</option>\n          <option value=\"admin\">Admin</option>\n        </select>\n      </div>\n      <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!accountForm.form.valid\">\n        <i class=\"fa fa-save\"></i> Save\n      </button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/account/account.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/account/account.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AccountComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AccountComponent = (function () {
    function AccountComponent(auth, toast, userService) {
        this.auth = auth;
        this.toast = toast;
        this.userService = userService;
        this.user = {};
        this.isLoading = true;
    }
    AccountComponent.prototype.ngOnInit = function () {
        this.getUser();
    };
    AccountComponent.prototype.getUser = function () {
        var _this = this;
        this.userService.getUser(this.auth.currentUser).subscribe(function (data) { return _this.user = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    AccountComponent.prototype.save = function (user) {
        var _this = this;
        this.userService.editUser(user).subscribe(function (res) { return _this.toast.setMessage('account settings saved!', 'success'); }, function (error) { return console.log(error); });
    };
    return AccountComponent;
}());
AccountComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-account',
        template: __webpack_require__("./client/app/account/account.component.html"),
        styles: [__webpack_require__("./client/app/account/account.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__["a" /* ToastComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__["a" /* ToastComponent */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _c || Object])
], AccountComponent);

var _a, _b, _c;
//# sourceMappingURL=account.component.js.map

/***/ }),

/***/ "./client/app/account/profile/edit-profile/edit-profile.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  edit-profile works!\n</p>\n"

/***/ }),

/***/ "./client/app/account/profile/edit-profile/edit-profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/account/profile/edit-profile/edit-profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EditProfileComponent = (function () {
    function EditProfileComponent() {
    }
    EditProfileComponent.prototype.ngOnInit = function () {
    };
    return EditProfileComponent;
}());
EditProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-edit-profile',
        template: __webpack_require__("./client/app/account/profile/edit-profile/edit-profile.component.html"),
        styles: [__webpack_require__("./client/app/account/profile/edit-profile/edit-profile.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], EditProfileComponent);

//# sourceMappingURL=edit-profile.component.js.map

/***/ }),

/***/ "./client/app/account/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  profile works!\n</p>\n"

/***/ }),

/***/ "./client/app/account/profile/profile.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/account/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ProfileComponent = (function () {
    function ProfileComponent() {
    }
    ProfileComponent.prototype.ngOnInit = function () {
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-profile',
        template: __webpack_require__("./client/app/account/profile/profile.component.html"),
        styles: [__webpack_require__("./client/app/account/profile/profile.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], ProfileComponent);

//# sourceMappingURL=profile.component.js.map

/***/ }),

/***/ "./client/app/admin/admin.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading [condition]=\"isLoading\"></app-loading>\n\n<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"card\" *ngIf=\"!isLoading\">\n  <h4 class=\"card-header\">Registered users ({{users.length}})</h4>\n  <div class=\"card-block\">\n    <table class=\"table table-bordered table-striped\">\n      <thead class=\"thead-default\">\n        <tr>\n          <th>Username</th>\n          <th>Email</th>\n          <th>Role</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody *ngIf=\"users.length === 0\">\n        <tr>\n          <td colspan=\"4\">There are no registered users.</td>\n        </tr>  \n      </tbody>\n      <tbody>\n        <tr *ngFor=\"let user of users\">\n          <td>{{user.username}}</td>\n          <td>{{user.email}}</td>\n          <td>{{user.role}}</td>\n          <td>\n            <button class=\"btn btn-sm btn-danger\" (click)=\"deleteUser(user)\" [disabled]=\"auth.currentUser._id === user._id\">\n              <i class=\"fa fa-trash\"></i>\n            </button>\n          </td>\n        </tr>  \n      </tbody>\n    </table>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/admin/admin.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/admin/admin.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AdminComponent = (function () {
    function AdminComponent(auth, toast, userService) {
        this.auth = auth;
        this.toast = toast;
        this.userService = userService;
        this.users = [];
        this.isLoading = true;
    }
    AdminComponent.prototype.ngOnInit = function () {
        this.getUsers();
    };
    AdminComponent.prototype.getUsers = function () {
        var _this = this;
        this.userService.getUsers().subscribe(function (data) { return _this.users = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    AdminComponent.prototype.deleteUser = function (user) {
        var _this = this;
        this.userService.deleteUser(user).subscribe(function (data) { return _this.toast.setMessage('user deleted successfully.', 'success'); }, function (error) { return console.log(error); }, function () { return _this.getUsers(); });
    };
    return AdminComponent;
}());
AdminComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-admin',
        template: __webpack_require__("./client/app/admin/admin.component.html"),
        styles: [__webpack_require__("./client/app/admin/admin.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__["a" /* ToastComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__shared_toast_toast_component__["a" /* ToastComponent */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _c || Object])
], AdminComponent);

var _a, _b, _c;
//# sourceMappingURL=admin.component.js.map

/***/ }),

/***/ "./client/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<script type=\"text/javascript\" src=\"http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js\"></script>\n<script type=\"text/javascript\">\n \n\n</script>\n\n<div *ngIf=\"windowWidth > 599\" id=\"master-wrapper\" style=\"opacity: 0.987679; background: url( 'http://localhost:4200/assets/images/refereebg.jpg') repeat fixed center center transparent\"></div>\n<div class=\"container\">\n<app-header></app-header>\n<!--<app-header (featureSelected)=\"onNavigate($event)\"></app-header>-->\n  \n\n  <router-outlet></router-outlet>\n \n<app-footer *ngIf=\"windowWidth > 599  else tabletFooter\"></app-footer>\n\n<ng-template #tabletFooter>\n            <app-footer-tablet></app-footer-tablet>\n        </ng-template>\n\n\n</div>"

/***/ }),

/***/ "./client/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/*.wrapper{\n      width: 60%;\n      margin: 60px auto;\n    }\n    html,body,div,span,applet,object,iframe,h1,h2,h3,h4,h5,h6,p,blockquote,pre,a,abbr,acronym,address,big,cite,code,del,dfn,em,font,img,ins,kbd,q,s,samp,small,strike,strong,sub,sup,tt,var,dd,dl,dt,li,ol,ul,fieldset,form,label,legend,table,caption,tbody,tfoot,thead,tr,th,td\n\t{\n\tfont-family: \"Arial\", Helvetica, sans-serif;\n\tmargin: 0;\n\tpadding: 0;\n}\n \n\n\n.wrapper {\n\tbackground: white;\n\twidth: 1000px;\n\tmargin: 0 auto;\n\tpadding: 0;\n\t-webkit-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.75);\n\t-moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.75);\n\tbox-shadow: 0px 0px 15px rgba(0, 0, 0, 0.75);\n}\n*/\n/* ACCORDION */\n.navigatorwidget {\n  list-style-type: none;\n  float: left;\n  position: relative;\n  width: 218px;\n  height: auto;\n  margin-bottom: 5px; }\n\n.navigatorwidget li {\n  list-style-type: none;\n  color: black;\n  text-transform: uppercase; }\n\n.navigatorwidget li {\n  font-size: 12px; }\n\n.navigatorwidget li a {\n  display: block;\n  padding: 3px;\n  text-decoration: none; }\n\n.navigatorwidget li a:link, .navigatorwidget li a:visited {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget li a.open {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget ul.news-navigator li a:link, .navigatorwidget ul.news-navigator li a:visited {\n  background: none; }\n\n.navigatorwidget ul.post-navigator li a:link, .navigatorwidget ul.post-navigator li a:visited {\n  background: none; }\n\n.navigatorwidget li a.open {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget li ul {\n  overflow: hidden;\n  display: none;\n  padding: 0 0 10px 20px; }\n\n.navigatorwidget li ul li {\n  font-size: 12px;\n  text-transform: none; }\n\n.navigatorwidget li ul li a, .navigatorwidget li a:visited ul li a, .navigatorwidget li li a:link, .navigatorwidget li li a:visited {\n  font-weight: normal;\n  border-bottom: 0;\n  text-decoration: underline;\n  padding: 3px 12px;\n  color: black; }\n\n.navigatorwidget li ul li a:hover, .navigatorwidget li a:visited ul li a:hover {\n  text-decoration: underline;\n  color: #faa21b; }\n\n* html .navigatorwidget {\n  height: 30em; }\n\n* html .navigatorwidget a, * html .navigatorwidget li {\n  height: 1%; }\n\n.productnavigator.navigatorwidget ul {\n  overflow: hidden;\n  padding: 0 0 10px 20px; }\n\n.productnavigator.navigatorwidget li {\n  text-transform: none; }\n\n.productnavigator.navigatorwidget li a:link, .navigatorwidget li a:visited {\n  border-bottom: 0 none;\n  color: black;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.productnavigator.navigatorwidget li a.selected {\n  color: #F3980D; }\n\n.productnavigator.navigatorwidget li a:hover {\n  color: #faa21b; }\n\n.ui-tabs {\n  padding: 0;\n  zoom: 1;\n  margin-bottom: 15px; }\n\n.ui-tabs .ui-tabs-nav {\n  height: 39px;\n  width: 710px;\n  float: left;\n  margin: 0;\n  padding: 1px 10px 0;\n  list-style: none;\n  position: relative;\n  -moz-border-radius-topright: 7px;\n  -khtml-border-radius-topright: 7px;\n  -webkit-border-top-right-radius: 7px;\n  -moz-border-radius-topleft: 7px;\n  -khtml-border-radius-topleft: 7px;\n  -webkit-border-top-left-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\n.ui-tabs .ui-tabs-nav li {\n  position: relative;\n  float: left;\n  border-bottom-width: 0 !important;\n  padding: 0;\n  font-size: 14px;\n  font-weight: bold;\n  margin-right: 15px; }\n\n.ui-tabs .ui-tabs-nav li a {\n  float: left;\n  height: 39px;\n  line-height: 39px;\n  text-decoration: none;\n  padding: 0 15px;\n  color: black;\n  text-decoration: none;\n  outline: none; }\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-selected {\n  background: white;\n  border: 1px solid #faa21b;\n  border-bottom: 0;\n  height: 38px;\n  line-height: 37px;\n  -moz-border-radius-topright: 5px;\n  -khtml-border-radius-topright: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -khtml-border-radius-topleft: 5px;\n  -webkit-border-top-left-radius: 5px; }\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a {\n  height: 38px;\n  line-height: 37px;\n  background: white;\n  cursor: text;\n  -moz-border-radius-topright: 5px;\n  -khtml-border-radius-topright: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -khtml-border-radius-topleft: 5px;\n  -webkit-border-top-left-radius: 5px; }\n\n.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a {\n  cursor: pointer; }\n\n.ui-tabs .ui-tabs-panel {\n  display: block;\n  border-width: 0;\n  background: none;\n  margin-bottom: 15px; }\n\n.ui-tabs .ui-tabs-hide {\n  display: none !important; }\n\n.ui-tabs .ui-tabs-panel .tab-content {\n  margin-bottom: 15px;\n  clear: both;\n  border: 1px solid #bbb;\n  border-top: 0;\n  padding: 10px;\n  float: left;\n  width: 708px; }\n\n.tab-content .image img {\n  border: 1px solid #bbb; }\n\n.tab-content .image {\n  float: left;\n  width: 375px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.tab-content .details {\n  float: left;\n  width: 100%;\n  padding-top: 10px; }\n\n.tab-content .detailstop {\n  float: left;\n  padding-top: 10px;\n  width: 300px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.tab-content .details p span {\n  font-style: italic; }\n\n/* tabs tables */\n.tab-content table {\n  font-size: 12px;\n  width: 100%;\n  border: 0;\n  border-spacing: 0;\n  border-collapse: collapse; }\n\n.tab-content table th {\n  text-align: left;\n  font-weight: normal;\n  color: black;\n  text-transform: uppercase;\n  padding: 8px; }\n\n.tab-content table td {\n  text-align: left;\n  padding: 8px; }\n\n.tab-content table td em.available {\n  color: #7db730; }\n\n.tab-content table tr:nth-child(odd) td {\n  background: #f1f1f1; }\n\n/* FOOTER */\n#deck {\n  width: 100%;\n  clear: both;\n  z-index: -1; }\n\n#deck .wrapper {\n  clear: both;\n  border-bottom: 3px solid #111;\n  background: #4d4d4d;\n  background: -moz-linear-gradient(#575757, #3a3a3a); }\n\n#deck h4 {\n  background: none;\n  padding: 0;\n  color: #999999;\n  font: 12px/14px \"Arial\",Helvetica,sans-serif;\n  margin-bottom: 15px;\n  text-transform: uppercase; }\n\n#deck .three-column-first, #deck .three-column-second {\n  display: inline-block;\n  vertical-align: top;\n  width: 278px;\n  padding: 20px 20px 10px;\n  height: 180px;\n  *display: inline;\n  *zoom: 1; }\n\n#deck .three-column-third {\n  display: inline-block;\n  vertical-align: top;\n  width: 285px;\n  padding: 20px 20px 10px;\n  *display: inline;\n  *zoom: 1; }\n\n#deck p {\n  color: white;\n  font-size: 11px; }\n\n#deck p span {\n  display: block; }\n\n#deck a {\n  color: white; }\n\n#deck a.arrow {\n  display: block; }\n\n#deck a:hover {\n  color: #faa21b; }\n\n#deck .column {\n  float: left;\n  width: 50%; }\n\n#deck ul {\n  list-style-type: none;\n  margin-bottom: 15px;\n  float: left;\n  width: 100%; }\n\n#deck ul li {\n  font-size: 11px;\n  margin-bottom: 6px;\n  float: left;\n  width: 100%; }\n\n#deck ul li a {\n  color: white;\n  padding-left: 12px; }\n\n.clearfix {\n  clear: both;\n  width: 100%;\n  height: 0;\n  font-size: 0;\n  line-height: 0; }\n\n/* FOOTER-LINKS-LOGOS */\n#footer {\n  width: 100%;\n  clear: both;\n  float: left;\n  height: 200px; }\n\n#footer .wrapper {\n  background: transparent;\n  padding: 25px 0;\n  box-shadow: none; }\n\n#footer p {\n  font-size: 11px; }\n\n#footer p img {\n  margin: 0 25px; }\n\n/* FACEBOX POPUP */\n#facebox {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 100;\n  text-align: left; }\n\n#facebox .popup {\n  position: relative; }\n\n#facebox .content {\n  display: table;\n  width: 500px;\n  padding: 15px;\n  background: #eee; }\n\n#facebox .close {\n  position: absolute;\n  top: -8px;\n  right: -8px; }\n\n#facebox .loading {\n  text-align: center; }\n\n#facebox .image {\n  text-align: center; }\n\n#facebox img {\n  border: 0;\n  margin: 0; }\n\n#facebox_overlay {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  height: 100%;\n  width: 100%; }\n\n.facebox_hide {\n  z-index: -100; }\n\n.facebox_overlayBG {\n  background: black;\n  z-index: 99; }\n\n#facebox .gallery {\n  width: 400px;\n  background: white; }\n\n#facebox .gallery .content {\n  background: white; }\n\n#facebox .contain {\n  padding: 15px; }\n\n/* FORM STYLES */\n#facebox form {\n  font-size: 12px;\n  font-weight: bold;\n  color: #666;\n  margin-bottom: 33px; }\n\n#facebox form div {\n  padding: 10px 0;\n  clear: both; }\n\n#facebox form label {\n  width: 200px;\n  float: left;\n  font-weight: bold;\n  padding-top: 9px; }\n\n#facebox form input, #facebox form select, #facebox form textarea {\n  float: left;\n  border: 1px solid #ccc;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  background: white;\n  margin: 0;\n  padding: 8px;\n  width: 250px;\n  color: #111; }\n\n#facebox form input.date {\n  width: 200px; }\n\n#facebox form .capcha {\n  float: left;\n  border: 1px solid #ccc;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  background: white;\n  margin: 0;\n  padding: 8px;\n  width: 160px;\n  color: #111; }\n\n#facebox form div.dates {\n  float: none; }\n\n#facebox form div.dates input {\n  width: 85px; }\n\n#facebox form div.checkbox, #facebox form div.radio {\n  padding: 10px 0; }\n\n#facebox form div.checkbox input, #facebox form div.radio input {\n  width: auto;\n  padding: 0;\n  border: 0;\n  margin-right: 5px; }\n\n#facebox input.btn {\n  margin-bottom: 15px; }\n\n#facebox .content .featured {\n  padding: 0 0 0 12px; }\n\n#facebox .content .postitem {\n  padding: 10px; }\n\n#facebox .content .postitemcell {\n  padding: 0 0 0 10px; }\n\n.error {\n  font-size: 8pt;\n  color: #ff0000;\n  padding: 1px;\n  margin-bottom: 5px; }\n\n#ProductHeader {\n  display: block;\n  clear: both; }\n\n#productHeaderImages {\n  width: 735px;\n  float: left; }\n\n#productHeaderInfo {\n  background: #1f1f1f;\n  width: 265px;\n  height: 484px;\n  float: left;\n  display: block;\n  position: relative; }\n\n#productHeaderInfo .content {\n  padding: 10px;\n  padding-top: 15px; }\n\n#productHeaderInfo h1 {\n  font-family: arial;\n  forn-weight: bold;\n  color: #ffffff;\n  font-size: 20px;\n  margin-bottom: 5px;\n  line-height: 1;\n  overflow: hidden;\n  width: 243px; }\n\n.productHeaderDisplay {\n  color: #5c5c5c;\n  font-size: 12px; }\n\n#productHeaderInfo h4 {\n  padding-left: 5px;\n  padding: 0px;\n  margin: 0px;\n  font: 12px/16px \"Arial\",Helvetica,sans-serif;\n  background: transparent;\n  color: #5c5c5c; }\n\ndl.margins {\n  font-weight: bold;\n  width: 250px;\n  overflow: hidden; }\n\n.margins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 12px;\n  padding: 2px 5px 2px 0;\n  clear: left; }\n\n.margins dd {\n  padding-left: 5px;\n  float: left;\n  font-size: 12px;\n  color: #ffffff;\n  padding: 2px 0;\n  clear: right; }\n\ndl.largmargins {\n  margin-bottom: 2px;\n  padding: 5px 0 8px 0;\n  font-weight: bold;\n  width: 250px;\n  overflow: hidden; }\n\n.largmargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 12px;\n  padding: 2px 5px 2px 0;\n  clear: left; }\n\n.largmargins dd {\n  padding-left: 5px;\n  float: left;\n  font-size: 12px;\n  color: #ffffff;\n  padding: 2px 0;\n  clear: right; }\n\ndl.smallmargins {\n  width: 250px;\n  overflow: hidden;\n  font-weight: bold; }\n\n.smallmargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 11px;\n  padding: 3px 2px 1px 0;\n  font-weight: bold;\n  clear: left; }\n\n.smallmargins dd {\n  padding-left: 5px;\n  font-size: 11px;\n  color: #ffffff;\n  padding: 3px 0px 1px 0;\n  font-weight: bold;\n  clear: right; }\n\ndl.nomargins {\n  padding: 0 6px 0 0;\n  width: 250px;\n  font-weight: bold; }\n\ndl.nomargins.toppadding {\n  padding: 10px 6px 0 0; }\n\n.nomargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 11px;\n  padding: 0 6px 0 0;\n  font-weight: bold;\n  clear: left; }\n\n.nomargins dd {\n  padding-left: 5px;\n  font-size: 11px;\n  color: #ffffff;\n  padding: 0;\n  font-weight: bold;\n  clear: right; }\n\n.newsbox {\n  border: 1px solid #BBBBBB;\n  margin-bottom: 10px;\n  padding: 10px;\n  width: 956px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.newsbox a, .two-column-box a {\n  color: black;\n  text-decoration: underline;\n  font: 11px/16px \"Arial\",Helvetica,sans-serif; }\n\n.newsbox a, .three-column-box a {\n  color: black;\n  text-decoration: underline;\n  font: 11px/16px \"Arial\",Helvetica,sans-serif; }\n\n.newsbox a:hover, .two-column-box a:hover {\n  color: #F3980D; }\n\n#productHeaderInfo a {\n  color: #5c5c5c;\n  text-decoration: underline;\n  font: 11px/16px \"Arial\",Helvetica,sans-serif; }\n\n#productHeaderInfo a:hover {\n  color: #fAA21B; }\n\n.enquireBtn, #productHeaderInfo a#enquireBtn, #facebox a#enquireBtn, #content a#enquireBtn, div#enquireBtn a.enquire-link {\n  position: absolute;\n  right: 10px;\n  bottom: 8px;\n  font-size: 16px;\n  color: black;\n  outline: none;\n  width: auto;\n  cursor: pointer;\n  text-decoration: none;\n  padding: 10px 25px;\n  -moz-border-radius: 7px;\n  -khtml-border-radius: 7px;\n  -webkit-border-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\n.enquireBtn, #content a#enquireBtn, div#enquireBtn a.enquire-link {\n  position: relative;\n  float: right; }\n\n.enquireBtn, #productHeaderInfo a#enquireBtn:hover, #facebox a#enquireBtn:hover, #content a#enquireBtn:hover {\n  background: -moz-linear-gradient(#faa21b, #fccc83); }\n\n.newsbox .img {\n  padding-right: 15px; }\n\n.clearpadding {\n  margin-left: -5px; }\n\n.hidden {\n  display: none; }\n\n.two-column-box h6 a {\n  font: bold 12px/16px \"Arial\", Helvetica, sans-serif;\n  color: #f3980d;\n  text-decoration: none; }\n\n.two-column-box h6 a:hover {\n  color: #f3980d;\n  text-decoration: underline; }\n\n.tooltip {\n  display: none;\n  background: url(\"http://localhost:4200/assets/images/rar.png\");\n  height: 163px;\n  padding: 40px 30px 10px 30px;\n  width: 310px;\n  font-size: 11px;\n  color: #fff; }\n\n/* a .label element inside tooltip */\n.tooltip .label {\n  color: yellow;\n  width: 35px; }\n\n.tooltip a {\n  color: #ad4;\n  font-size: 11px;\n  font-weight: bold; }\n\n#footer-left-container-left {\n  float: left;\n  width: 78px; }\n\n#footer-left-container-right {\n  float: left;\n  font-size: 9px;\n  width: 900px; }\n\n#menu-footer-left {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n\n#menu-footer-left li {\n  display: block;\n  padding: 0px 6px 0px 6px;\n  border-right: 1px solid #5c5c5c;\n  float: left; }\n\n#menu-footer-left li.lastitem {\n  border-right: 0px; }\n\n#menu-footer-left li a {\n  color: black;\n  text-decoration: underline;\n  font-size: 11px;\n  line-height: 16px; }\n\n.navcontent {\n  background: #1f1f1f;\n  z-index: 5;\n  position: absolute;\n  display: none; }\n\n#header1Image {\n  z-index: 1;\n  position: relative; }\n\n#navcontentContainer {\n  width: 1000px;\n  position: absolute;\n  z-index: 10; }\n\n#navcontentContainer h1 em {\n  color: #999999; }\n\n#navcontentContainer h1 a {\n  color: #fff; }\n\n#navcontent1 {\n  width: 1000px;\n  height: 481px; }\n\n#navcontent2 {\n  width: 350px;\n  height: 481px;\n  position: absolute;\n  right: 0px; }\n\n/*.sliderContent{clear:both;}*/\n.navcontentbox1 {\n  height: 450px;\n  width: 190px;\n  float: left;\n  padding: 15px;\n  border-right: 1px solid #4c4c4c; }\n\n.navcontentbox2 {\n  height: 450px;\n  width: 140px;\n  float: left;\n  padding: 15px;\n  border-right: 1px solid #4c4c4c;\n  display: none; }\n\n.navcontentbox3 {\n  height: 450px;\n  width: 295px;\n  float: left;\n  padding: 15px;\n  border-right: 1px solid #4c4c4c;\n  display: none; }\n\n.navcontentbox4 {\n  height: 450px;\n  width: 225px;\n  float: left;\n  padding: 22px;\n  display: none; }\n\n.navcontentbox5 {\n  height: 450px;\n  width: 225px;\n  float: left;\n  padding: 15px;\n  display: block; }\n\n.tours-year li, .tours-duration li, .tours-country li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 10px;\n  padding-left: 10px; }\n\n.tours-year li a, .tours-year li a:visited, .tours-duration li a, .tours-country li a:visited, .tours-country li a, .tours-country li a:visited {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-year li a:hover, .tours-duration li a:hover, .tours-country li a:hover {\n  color: #FAA21b;\n  text-decoration: underline; }\n\n.navcontentbox2 ul li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 10px;\n  padding-left: 10px; }\n\n.navcontentbox2 ul li a {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.durationwidget ul li a {\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.navcontentbox2 ul li a:hover {\n  color: #FAA21b; }\n\n#duration-navigator ul li a {\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-list li, #menu-charter-tours li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 5px; }\n\n.tours-list li a, .tours-list li a:visited, #menu-charter-tours li a, #menu-charter-tours li a:visited {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-list li a:hover, #menu-charter-tours li a:hover {\n  color: #FAA21b;\n  text-decoration: underline; }\n\np.wprice {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal;\n  margin-bottom: 0; }\n\np.wmore {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal;\n  margin: 0; }\n\n.wdetails {\n  color: #ffffff;\n  height: 255px;\n  overflow: hidden; }\n\n.wdetails a {\n  color: #F3980D;\n  text-decoration: underline; }\n\np.wactivity {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal; }\n\n#content ul.breadcrumb {\n  clear: both;\n  color: #5c5c5c;\n  font-size: 12px;\n  list-style: none;\n  padding-bottom: 5px; }\n\n#content ul.breadcrumb li {\n  display: inline; }\n\n#content ul.breadcrumb li a {\n  color: #000;\n  text-decoration: underline; }\n\n#content ul.breadcrumb li a:hover {\n  color: #F3980D; }\n\n#content ul.breadcrumb li a.selected {\n  color: #F3980D; }\n\n.jcarousel {\n  position: relative;\n  overflow: hidden;\n  height: 157px;\n  margin-left: 0px;\n  padding-left: 0px;\n  width: 100%;\n  margin-top: 244px;\n  padding-top: 310px;\n  margin-bottom: 0px;\n  padding-bottom: 0px; }\n\n.jcarousel ul {\n  width: 20000em;\n  position: absolute;\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.jcarousel li {\n  float: left; }\n\nul.jcarousel-control {\n  margin-left: 800px;\n  width: 250px;\n  position: absolute;\n  margin-top: 220px;\n  padding-top: 200px;\n  z-index: 1; }\n\nul.jcarousel-control li {\n  background-image: url(\"http://localhost:4200/assets/images/rar.png\");\n  display: inline-block;\n  height: 17px;\n  width: 17px;\n  *display: inline;\n  *zoom: 1; }\n\n#banner a, #banner a:hover {\n  color: #FFFFFF;\n  text-decoration: none; }\n\n#banner .banner-content {\n  height: 65px;\n  background: #000000;\n  margin-top: -5px; }\n\n#banner .banner-content p {\n  margin: 0;\n  padding-left: 40px;\n  color: #FFFFFF; }\n\n#banner .banner-content p.banner-title {\n  font: bold 25px Arial,Helvetica,sans-serif;\n  padding-left: 20px;\n  padding-top: 10px; }\n\n#banner .banner-content p.banner-title img {\n  padding-bottom: 5px;\n  padding-right: 10px; }\n\n.loadImage {\n  width: 32px;\n  height: 32px;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 193px; }\n\n#product-navigation {\n  width: 100%; }\n\n#product-navigation .wrapper {\n  padding: 0px;\n  width: 100%;\n  height: 6px; }\n\n#product-navigation #menu-product-navigation {\n  display: table;\n  width: 100%; }\n\n#product-navigation #menu-product-navigation #accommodatedtour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #campingtour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #daytour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #accommodation {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #chartertour {\n  width: 258px; }\n\n.browseListings h2 {\n  font-weight: bold;\n  margin-bottom: 10px; }\n\n#date-details {\n  float: left;\n  margin: 10px 0; }\n\n#facebox-loading {\n  text-align: center; }\n\n#facebox .form-container {\n  padding-bottom: 50px; }\n\n#facebox a#enquireBtn {\n  bottom: 20px;\n  right: 45px; }\n\n#twitter {\n  margin-top: 5px; }\n\n#twitter h4 {\n  background: none; }\n\n#content a#request-brochure {\n  border: medium none;\n  height: 92px;\n  width: 240px;\n  cursor: pointer;\n  margin: 0 0 10px;\n  display: block;\n  text-decoration: none; }\n\n.nomadNews .featuredblog h3 {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  margin-bottom: 15px; }\n\n.nomadNews .featuredblog h3 em {\n  color: #111;\n  font: bold 25px/27px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em; }\n\n.sliderContent .navigatorwidget {\n  margin-bottom: 15px;\n  position: relative;\n  width: 190px; }\n\n.sliderContent .navigatorwidget ul.product-detailed-navigator li {\n  color: black;\n  font-size: 12px;\n  list-style-type: none;\n  padding-left: 5px;\n  padding-top: 10px; }\n\n.sliderContent .navigatorwidget ul.product-detailed-navigator li a, .sliderContent .navigatorwidget ul.product-detailed-navigator li a:visited, .sliderContent .navigatorwidget ul.product-detailed-navigator li a:link {\n  white-space: nowrap;\n  border-bottom: 0 none;\n  color: #FFFFFF;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline;\n  text-transform: capitalize; }\n\n.imagegallerywidget h3 {\n  display: none; }\n\n.imagegallerywidget div.image {\n  background: none repeat scroll 0 0 #FFFFFF;\n  float: left;\n  margin: 5px 6px 6px 5px;\n  overflow: hidden;\n  position: relative; }\n\n.imagegallerywidget img {\n  float: left;\n  padding: 0; }\n\n.imagegallerywidget div.image label {\n  color: black;\n  font-size: 11px;\n  line-height: 14px;\n  padding: 10px 10px 0;\n  text-transform: uppercase;\n  display: block;\n  position: relative;\n  float: left;\n  background: #faa21b;\n  height: 100px;\n  width: 100%;\n  opacity: 0.9;\n  filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity = 90)\";\n  -MS-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=90)\"; }\n\n#social-share-links div {\n  display: inline-block;\n  width: 100px;\n  *display: inline;\n  *zoom: 1; }\n\n#page-not-found {\n  text-align: center; }\n\n#page-not-found img {\n  padding: 25px 0; }\n\n#page-not-found h1 {\n  padding: 0 0 10px; }\n\n#page-not-found h1 em {\n  letter-spacing: 0.01px; }\n\n#page-not-found .submit-container {\n  float: none; }\n\n#page-not-found .submit-container a.btn {\n  color: #fff;\n  text-decoration: none; }\n\n#page-not-found .form-container {\n  display: inline-block;\n  float: none;\n  padding: 20px 0 0;\n  *display: inline;\n  *zoom: 1; }\n\n#page-not-found .form-container .formfield-container {\n  float: none;\n  height: 40px;\n  width: 400px; }\n\n#page-not-found .form-container .formfield-container label {\n  width: 100px;\n  text-align: left; }\n\n#unsubscribe .form-container {\n  display: inline-block;\n  float: none;\n  width: 100%;\n  *display: inline;\n  *zoom: 1; }\n\n#unsubscribe .form-container .formfield-container {\n  float: none; }\n\n#unsubscribe .form-container .formfield-container label {\n  width: 100px; }\n\n#unsubscribe .submit-container {\n  float: left;\n  padding: 0 10px; }\n\n#unsubscribe .submit-container a.btn {\n  color: #fff;\n  text-decoration: none;\n  margin: 0; }\n\n.newsletter.box {\n  border: none;\n  height: 220px;\n  width: 220px !important; }\n\n.newsletter.box input {\n  border: 1px solid #FAA21B; }\n\n#profiles {\n  color: #000000;\n  text-decoration: none;\n  margin: 0 0px 0 0px;\n  padding: 0;\n  clear: both;\n  height: 100%;\n  width: 100% !important; }\n\n.profiles.box {\n  background: #E5E5FF;\n  border: none;\n  float: right;\n  width: 100% !important;\n  margin: 0 0px 0 5px;\n  padding-top: 9px;\n  clear: both;\n  height: 100%; }\n\n#menuFull {\n  width: 100%;\n  clear: both;\n  padding: 0px 0px 30px;\n  margin: 0px; }\n\n#subscribecontainer img.newsletter-icon {\n  display: inline-block; }\n\n#subscribecontainer h3 {\n  color: #ffffff;\n  display: inline-block;\n  width: 75%; }\n\n#browse-button {\n  display: inline-block;\n  margin-top: 20px;\n  vertical-align: top;\n  width: 130px; }\n\n#subscribe-button {\n  display: inline-block;\n  height: 34px;\n  margin-left: 5px;\n  margin-top: 5px;\n  width: 76px; }\n\n#subscribecontainer a:hover, #subscribecontainer a:active {\n  color: #fff; }\n\n#frmsubscribe input.error {\n  outline: 2px solid #FF0000; }\n\n#frmsubscribe label.error {\n  display: none !important; }\n\n/*-- Camtour --*/\n#slider-wrapper div.jqans-wrapper.default a {\n  color: #363636 !important; }\n\n#slider-wrapper div.jqans-wrapper.default {\n  background: none repeat scroll 0 0 #FFFFFF !important;\n  border-left: 1px solid #DBE1E6;\n  border-right: 1px solid #DBE1E6;\n  border-top: 1px solid #DBE1E6;\n  color: inherit; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong {\n  color: #000000;\n  font-weight: bold;\n  text-transform: uppercase; }\n\n#slider-wrapper div.jqans-wrapper.default img {\n  margin: 0;\n  max-width: 100%;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 {\n  font-size: 138% !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited {\n  background: none repeat scroll 0 0 transparent;\n  border: medium none;\n  color: #16387C !important;\n  text-decoration: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content p {\n  color: #333333 !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories {\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li {\n  background-color: #FCFCFD;\n  background-image: -moz-linear-gradient(center top, #E8EDF0, #FCFCFD);\n  border-top-color: #A8B4BF; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected {\n  background-color: #59728B;\n  background-image: -moz-linear-gradient(center top, #59728B, #2D4458);\n  border-top-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img {\n  background-color: #FFFFFF;\n  border: 1px solid #C5CED7;\n  margin: 8px 0 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img {\n  border: 1px solid #000000; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 {\n  background: none repeat scroll 0 0 transparent !important;\n  color: #59728B !important;\n  font-size: 12px !important;\n  font-weight: normal;\n  line-height: 14px !important;\n  margin: 0;\n  padding: 0;\n  text-shadow: none;\n  text-transform: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 {\n  color: #FFFFFF !important;\n  font-size: 12px !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div {\n  border-bottom: 10px solid #59728B;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul, #slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li {\n  background: none repeat scroll 0 0 transparent !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination {\n  background-color: #F9FAFA;\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a {\n  border-right-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span {\n  border-right-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span {\n  border-left-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default #control-play {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default #pause-left, #slider-wrapper div.jqans-wrapper.default #pause-right {\n  background: none repeat scroll 0 0 #59728B; }\n\n/* Accessible News Slider : Theme Custom*/\n/* DEFAULT STYLES\n#slider-wrapper div.jqans-wrapper.default a &gt; color of links in post text\n*/\n#slider-wrapper div.jqans-wrapper.default a {\n  color: #363636 !important; }\n\n/* WRAPPER\n#slider-wrapper div.jqans-wrapper.default &gt; color of the top, left, right border background color and text color (useful for changing color to subtitle) of the main wrapper\n*/\n#slider-wrapper div.jqans-wrapper.default {\n  border-left: 1px solid #DBE1E6;\n  border-right: 1px solid #DBE1E6;\n  border-top: 1px solid #DBE1E6;\n  background: #FFF !important;\n  color: inherit; }\n\n/* HEADLINE\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong &gt; aspect of the widget title (\\\\\\\\\\\\\\\"Today news\\\\\\\\\\\\\\\")\n*/\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong {\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #000; }\n\n/* POST CONTENT\n#slider-wrapper div.jqans-wrapper.default img &gt; img dimensions\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 &gt; size of post title\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited &gt; color of post title\n#slider-wrapper div.jqans-wrapper.default .jqans-content p &gt; color of post paragraph\n*/\n#slider-wrapper div.jqans-wrapper.default img {\n  max-width: 100%;\n  margin: 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 {\n  font-size: 138% !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited {\n  color: #16387C !important;\n  text-decoration: none;\n  background: transparent;\n  border: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content p {\n  color: #333 !important; }\n\n/* CAROUSEL\n#slider-wrapper div.jqans-wrapper.default .jqans-stories &gt; list border bottom color\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li &gt; carousel item background color, gradient and border top color\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected &gt; carousel item selected background color, gradient and border top color\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img &gt; carousel item image border and background, margin and padding\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img &gt; carusel item image border when selected\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 &gt; carousel item paragraph font size, color and line height\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 &gt; carousel item paragraph font size and color when selected\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div &gt; carousel item arrow color\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul, #slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li &gt; ensure transparency on selector background\n*/\n#slider-wrapper div.jqans-wrapper.default .jqans-stories {\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li {\n  background-color: #FCFCFD;\n  background-image: -moz-linear-gradient(center top, #E8EDF0, #FCFCFD);\n  border-top-color: #A8B4BF; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected {\n  background-color: #59728B;\n  background-image: -moz-linear-gradient(center top, #59728B, #2D4458);\n  border-top-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img {\n  border: 1px solid #C5CED7;\n  background-color: #fff;\n  margin: 8px 0 0 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img {\n  border: 1px solid #000; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 {\n  font-size: 12px !important;\n  color: #59728B !important;\n  line-height: 14px !important;\n  text-transform: none;\n  background: transparent !important;\n  background-color: transparent !important;\n  background-image: none !important;\n  margin: 0;\n  padding: 0;\n  text-shadow: none;\n  font-weight: normal; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 {\n  font-size: 12px !important;\n  color: #FFF !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div {\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid #59728B;\n  border-left: 10px solid transparent; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul, #slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li {\n  background-color: transparent !important;\n  background: transparent !important; }\n\n/* PAGINATION\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination &gt; border bottom color and backround of the box containing pagination and slider controls\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a &gt; previous button control color\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a &gt; next button control color\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span &gt; fake element to make an arrow with pure css: it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span &gt; fake element to make an arrow with pure css: it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color\n#slider-wrapper div.jqans-wrapper.default #control-play &gt; play button color\n#slider-wrapper div.jqans-wrapper.default #pause-left, #slider-wrapper div.jqans-wrapper.default #pause-right &gt; pause button color\n*/\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination {\n  border-bottom-color: #DBE1E6;\n  background-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a {\n  border-right-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span {\n  border-right-color: #F9FAFA;\n  /* it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color*/ }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span {\n  border-left-color: #F9FAFA;\n  /* it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color*/ }\n\n#slider-wrapper div.jqans-wrapper.default #control-play {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default #pause-left, #slider-wrapper div.jqans-wrapper.default #pause-right {\n  background: #59728B; }\n\n/* Master */\n#master-wrapper {\n  background: url(\"http://localhost:4200/assets/images/refereebg1.jpg\") repeat fixed center center #000000;\n  height: 100%;\n  position: fixed;\n  width: 100%;\n  z-index: -1; }\n\n/* Menu start*/\n.nfMain {\n  -moz-border-bottom-colors: none;\n  -moz-border-left-colors: none;\n  -moz-border-right-colors: none;\n  -moz-border-top-colors: none;\n  border-color: #00AD00;\n  -o-border-image: none;\n     border-image: none;\n  border-style: solid;\n  border-width: 0 0 0 2px;\n  width: 980px;\n  clear: both;\n  padding: 0;\n  margin: 0;\n  position: relative;\n  display: block; }\n\n.nfMain .nfLink {\n  border-color: #00AD00;\n  border-style: solid;\n  border-width: 0 2px 2px 0;\n  color: #000000;\n  font-family: Arial;\n  font-size: 0.9em;\n  padding: 9px 30px 5px;\n  text-decoration: none; }\n\n.nfPure .nfItem:hover > .nfLink, .nfPure .nfItem:hover > * > .nfLink {\n  text-decoration: underline; }\n\n.nfPure .nfLink:hover, .nfMain .nfJSHover {\n  color: #FFFFFF;\n  text-decoration: underline; }\n\n.nfMain, .nfSubC, .nfSubS {\n  list-style: none;\n  margin: 0px;\n  padding: 0px; }\n\n.nfMain {\n  position: relative;\n  z-index: 1; }\n\n.nfMain .nfSubC {\n  visibility: hidden;\n  position: absolute; }\n\n.nfMain .nfItem, .nfMain .nfLink {\n  list-style: none;\n  position: relative;\n  display: block;\n  white-space: nowrap;\n  margin: 0px; }\n\n.nfMain:after {\n  content: \".\";\n  display: block;\n  height: 0px;\n  clear: both;\n  overflow: hidden; }\n\n.nfPure .nfItem:hover, .nfPure .nfItem:hover > .nfSubC {\n  z-index: 1101;\n  visibility: inherit; }\n\n.nfPure .nfLink:focus {\n  z-index: 1102; }\n\n.nfMain .nfJSActiveItem {\n  z-index: 1101; }\n\n.nfMain .nfJSShowSub {\n  z-index: 1101;\n  visibility: inherit; }\n\n.nfMain .nfItem div.nfLink {\n  cursor: default; }\n\n.nfMain .nfItem {\n  float: left; }\n\n.nfMain .nfItem .nfItem {\n  float: none; }\n\n.nfMain .nfItem .nfSubC {\n  top: 100%;\n  left: 0px;\n  width: auto; }\n\n.nfMain .nfSubC .nfItem .nfSubC {\n  top: 0px;\n  left: 100%;\n  width: auto; }\n\n/*~~~~~~~~~~~~~~~~ Menu Styles (global - all menus) ~~~~~~~~~~~~~~~~*/\n/******[Main Menu]******/\n/*Main Menu Container*/\n.nfMain {\n  background-color: #55556a;\n  background-image: url(\"http://localhost:4200/assets/images/refereebg.jpg\");\n  padding: 0px 0px 0px 20px; }\n\n/*Item Links*/\n.nfMain .nfLink {\n  border-style: solid;\n  border-width: 1px 0px 1px 1px;\n  border-color: #333;\n  padding: 6px 40px 6px 20px;\n  font-family: Arial;\n  font-size: 14px;\n  color: #fff;\n  text-decoration: none; }\n\n/*Item Links - Parent*/\n.nfMain .nfParent .nfLink {\n  background-position: 92% 52%;\n  background-repeat: no-repeat; }\n\n.nfMain .nfParent .nfSubS .nfLink {\n  background-image: none; }\n\n/*Item Links - Hover (duplicate styles below!)*/\n.nfPure .nfItem:hover > .nfLink, .nfPure .nfItem:hover > * > .nfLink {\n  text-decoration: underline; }\n\n.nfPure .nfLink:hover, .nfMain .nfJSHover {\n  text-decoration: underline; }\n\n/*Item Links - Active*/\n.nfMain .nfItem .nfJSActive {\n  border-bottom-color: #e5ebf7;\n  background-color: #e5ebf7;\n  color: #425fa7;\n  text-decoration: underline; }\n\n/*Item Links - Focus*/\n.nfPure .nfLink:focus, .nfMain .nfItem .nfJSFocus {\n  text-decoration: underline; }\n\n/*Item Links - Breadcrumbs*/\n/******[Sub Menus]******/\n/*Sub Menu Styles*/\n.nfMain .nfSubS {\n  background-color: #e5ebf7;\n  padding: 20px; }\n\n.nfMain .nfSubS {\n  height: auto;\n  border: solid 1px #333;\n  border-width: 0px 1px 1px 1px;\n  background-color: #e5ebf7;\n  -moz-border-radius-bottomLeft: 10px;\n  -moz-border-radius-bottomRight: 10px;\n  -webkit-border-bottom-right-radius: 10px;\n  -webkit-border-bottom-left-radius: 10px; }\n\n/*Sub Menu Position Offsets - Level 2*/\n.nfMain .nfSubS .nfSubC {\n  margin: -1px 0px 0px 0px; }\n\n/*Sub Menu Styles - Level 2*/\n.nfMain .nfSubS .nfSubS {\n  border-width: 1px; }\n\n.nfMain .nfSubS .nfSubS {\n  -moz-border-radius-topRight: 10px;\n  -moz-border-radius-bottomLeft: 10px;\n  -moz-border-radius-bottomRight: 10px;\n  -webkit-border-bottom-right-radius: 10px;\n  -webkit-border-bottom-left-radius: 10px;\n  -webkit-border-top-right-radius: 10px; }\n\n/*Item Links*/\n.nfMain .nfSubS .nfLink {\n  border-style: solid;\n  border-width: 0px 0px 1px 0px;\n  border-color: #999;\n  padding: 6px 40px 6px 5px;\n  font-size: 13px;\n  color: #55556a; }\n\n/*Item Links - Parent*/\n.nfMain .nfSubS .nfParent .nfSubS .nfLink {\n  background-image: none; }\n\n/*Item Links - Last Child (ignored by IE8 & down)*/\n.nfMain .nfSubS .nfItem:last-child .nfLink {\n  border-width: 0px; }\n\n/*Item Links - Hover (duplicate styles below!)*/\n/*Item Links - Active*/\n.nfMain .nfSubS .nfItem .nfJSActive {\n  background-color: #ccd0e3;\n  color: #425fa7;\n  text-decoration: underline; }\n\n/*Item Links - Focus*/\n.nfPure .nfSubS .nfLink:focus, .nfMain .nfSubS .nfItem .nfJSFocus {\n  color: #03f; }\n\n/*Item Links - Breadcrumbs*/\n/******[Custom Example Menu Styles]******/\n.custTitle {\n  font-size: 1em;\n  margin: 20px 0px 5px 0px;\n  color: #55556a;\n  font-weight: bold; }\n\n.custTitleBoxed {\n  font-size: .9em;\n  margin: 20px 0px 5px 0px;\n  color: #55556a;\n  padding: 8px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #fff;\n  border-color: #979cb6;\n  -moz-border-radius: 4px;\n  -webkit-border-radius: 4px; }\n\n.custTitleTop {\n  margin: 5px 0px 5px 0px; }\n\n.custMegaSub {\n  width: 760px; }\n\n.custMegaItem {\n  font-size: .9em; }\n\n.megaContentRight {\n  position: relative;\n  width: 190px;\n  left: 290px; }\n\n.megaContentMiddle {\n  position: absolute;\n  width: 140px;\n  left: 170px; }\n\n.megaContentLeft {\n  position: absolute;\n  width: 240px; }\n\n.megaContentMiddle ul, .megaContentLeft ul, .megaContentRight ul {\n  list-style-type: circle;\n  margin: 10px 0px 0px 24px;\n  padding: 0px; }\n\n.megaTopTitle {\n  width: 440px;\n  font-size: 1em;\n  color: #55556a;\n  white-space: normal;\n  margin-bottom: 10px;\n  padding: 8px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #fff;\n  border-color: #979cb6;\n  -moz-border-radius: 4px;\n  -webkit-border-radius: 4px; }\n\n.megaTitle {\n  color: #55556a;\n  white-space: normal; }\n\n/*End menu */\n#content .whitebg {\n  background: red;\n  clear: both; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__("./node_modules/jquery/dist/jquery.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AppComponent = (function () {
    /*ngAfterViewInit() {
      this.windowWidth = window.innerWidth;
    }*/
    function AppComponent(auth, ngZone) {
        // Screen size example 1
        /*this.innerHeight = (window.screen.height) + 'px';
        this.innerWidth = (window.screen.width) + 'px"'
        console.log('Screen width: ' + this.innerWidth);
        console.log('Screen height: ' + this.innerHeight);*/
        var _this = this;
        this.auth = auth;
        this.ngZone = ngZone;
        /*innerHeight: any;
        innerWidth: any;*/
        this.windowWidth = window.innerWidth;
        console.log('Width on resize 1: ' + window.innerWidth);
        console.log('Height on resize 2: ' + window.innerHeight);
        // Screen size example 2
        window.onresize = function (e) {
            ngZone.run(function () {
                _this.windowWidth = window.innerWidth;
                console.log('Width on resize: ' + window.innerWidth);
                console.log('Height on resize: ' + window.innerHeight);
            });
        };
        // alert('testing');
        var destination_anim_bgs = new Array('assets/images/refereebg.jpg', 'assets/images/refereebg1.jpg', 'assets/images/refereebg2.jpg');
        var destination_anim_bgs2 = new Array('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
        var destination_anim_bgs3 = new Array('assets/images/refereebg6.jpg', 'assets/images/refereebg7.jpg', 'assets/images/refereebg8.jpg');
        // destination_anim_bgs = [];
        destination_anim_bgs.push('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
        destination_anim_bgs.push('assets/images/refereebg6.jpg', 'assets/images/refereebg7.jpg', 'assets/images/refereebg8.jpg');
        // destination_anim_bgs.push(destination_anim_bgs2);
        // destination_anim_bgs.push(destination_anim_bgs3);
        __WEBPACK_IMPORTED_MODULE_2_jquery__(document).ready(function () {
            var imgArr = new Array('assets/images/refereebg.jpg', 'assets/images/refereebg1.jpg', 'assets/images/refereebg2.jpg');
            // const imgArr2 = new Array('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
            // const imgArr3 = new Array('assets/images/refereebg6.jpg', 'assets/images/refereebg7.jpg', 'assets/images/refereebg8.jpg');
            // let imgArr = [];
            imgArr.push('assets/images/refereebg3.jpg', 'assets/images/refereebg4.jpg', 'assets/images/refereebg5.jpg');
            imgArr.push('assets / images / refereebg6.jpg', 'assets/ images / refereebg7.jpg', 'assets/ images / refereebg8.jpg');
            // imgArr.push(imgArr3);
            if (destination_anim_bgs[0]) {
                imgArr = destination_anim_bgs;
            }
            var preloadArr = new Array();
            var i;
            /* preload images */
            for (i = 0; i < imgArr.length; i++) {
                preloadArr[i] = new Image();
                preloadArr[i].src = imgArr[i];
            }
            var currImg = 0;
            var intID = setInterval(changeImg, 10000);
            /* image rotator */
            function changeImg() {
                // alert('change image');
                __WEBPACK_IMPORTED_MODULE_2_jquery__('#master-wrapper').animate({ opacity: 0 }, 200, function () {
                    __WEBPACK_IMPORTED_MODULE_2_jquery__(this).css('background', 'url(' + preloadArr[currImg++ % preloadArr.length].src + ') fixed center');
                    // alert('change image again');
                }).animate({ opacity: 1 }, 200);
            }
            // $('body').css('background', 'url(' + preloadArr[currImg++ % preloadArr.length].src + ') fixed center');
        });
    }
    return AppComponent;
}());
AppComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-root',
        template: __webpack_require__("./client/app/app.component.html"),
        styles: [__webpack_require__("./client/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["NgZone"]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "./client/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__routing_module__ = __webpack_require__("./client/app/routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__ = __webpack_require__("./client/app/shared/shared.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_cat_service__ = __webpack_require__("./client/app/services/cat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_auth_guard_login_service__ = __webpack_require__("./client/app/services/auth-guard-login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_auth_guard_admin_service__ = __webpack_require__("./client/app/services/auth-guard-admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("./client/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__cats_cats_component__ = __webpack_require__("./client/app/cats/cats.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__about_about_component__ = __webpack_require__("./client/app/about/about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__register_register_component__ = __webpack_require__("./client/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__login_login_component__ = __webpack_require__("./client/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__logout_logout_component__ = __webpack_require__("./client/app/logout/logout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__account_account_component__ = __webpack_require__("./client/app/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__admin_admin_component__ = __webpack_require__("./client/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__not_found_not_found_component__ = __webpack_require__("./client/app/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__header_header_component__ = __webpack_require__("./client/app/header/header.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__shared_dropdown_directive__ = __webpack_require__("./client/app/shared/dropdown.directive.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__home_home_component__ = __webpack_require__("./client/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__footer_footer_component__ = __webpack_require__("./client/app/footer/footer.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__home_how_it_works_how_it_works_component__ = __webpack_require__("./client/app/home/how-it-works/how-it-works.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__home_pricing_pricing_component__ = __webpack_require__("./client/app/home/pricing/pricing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__account_profile_profile_component__ = __webpack_require__("./client/app/account/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__account_profile_edit_profile_edit_profile_component__ = __webpack_require__("./client/app/account/profile/edit-profile/edit-profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__footer_footer_tablet_footer_tablet_component__ = __webpack_require__("./client/app/footer/footer-tablet/footer-tablet.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__carousel_carousel_item_carousel_item_component__ = __webpack_require__("./client/app/carousel/carousel-item/carousel-item.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__carousel_carousel_component__ = __webpack_require__("./client/app/carousel/carousel.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};































var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__cats_cats_component__["a" /* CatsComponent */],
            __WEBPACK_IMPORTED_MODULE_10__about_about_component__["a" /* AboutComponent */],
            __WEBPACK_IMPORTED_MODULE_11__register_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_12__login_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_13__logout_logout_component__["a" /* LogoutComponent */],
            __WEBPACK_IMPORTED_MODULE_14__account_account_component__["a" /* AccountComponent */],
            __WEBPACK_IMPORTED_MODULE_15__admin_admin_component__["a" /* AdminComponent */],
            __WEBPACK_IMPORTED_MODULE_16__not_found_not_found_component__["a" /* NotFoundComponent */],
            __WEBPACK_IMPORTED_MODULE_17__header_header_component__["a" /* HeaderComponent */],
            __WEBPACK_IMPORTED_MODULE_18__shared_dropdown_directive__["a" /* DropdownDirective */],
            __WEBPACK_IMPORTED_MODULE_19__home_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_20__footer_footer_component__["a" /* FooterComponent */],
            __WEBPACK_IMPORTED_MODULE_21__home_how_it_works_how_it_works_component__["a" /* HowItWorksComponent */],
            __WEBPACK_IMPORTED_MODULE_22__home_pricing_pricing_component__["a" /* PricingComponent */],
            __WEBPACK_IMPORTED_MODULE_23__account_profile_profile_component__["a" /* ProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_24__account_profile_edit_profile_edit_profile_component__["a" /* EditProfileComponent */],
            __WEBPACK_IMPORTED_MODULE_25__footer_footer_tablet_footer_tablet_component__["a" /* FooterTabletComponent */],
            __WEBPACK_IMPORTED_MODULE_26__carousel_carousel_item_carousel_item_component__["a" /* CarouselItemComponent */],
            __WEBPACK_IMPORTED_MODULE_27__carousel_carousel_component__["a" /* CarouselComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__routing_module__["a" /* RoutingModule */],
            __WEBPACK_IMPORTED_MODULE_2__shared_shared_module__["a" /* SharedModule */],
            __WEBPACK_IMPORTED_MODULE_28__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_29__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_30__angular_http__["HttpModule"]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5__services_auth_service__["a" /* AuthService */],
            __WEBPACK_IMPORTED_MODULE_6__services_auth_guard_login_service__["a" /* AuthGuardLogin */],
            __WEBPACK_IMPORTED_MODULE_7__services_auth_guard_admin_service__["a" /* AuthGuardAdmin */],
            __WEBPACK_IMPORTED_MODULE_3__services_cat_service__["a" /* CatService */],
            __WEBPACK_IMPORTED_MODULE_4__services_user_service__["a" /* UserService */]
        ],
        schemas: [__WEBPACK_IMPORTED_MODULE_0__angular_core__["CUSTOM_ELEMENTS_SCHEMA"]],
        // Add bootstrap
        bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "./client/app/carousel/carousel-item/carousel-item.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"carousel-item text-center\" [hidden]=\"!isActive\">\n  <ng-content></ng-content>\n</div>"

/***/ }),

/***/ "./client/app/carousel/carousel-item/carousel-item.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/carousel/carousel-item/carousel-item.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselItemComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var CarouselItemComponent = (function () {
    function CarouselItemComponent() {
    }
    CarouselItemComponent.prototype.ngOnInit = function () {
    };
    return CarouselItemComponent;
}());
CarouselItemComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-carousel-item',
        template: __webpack_require__("./client/app/carousel/carousel-item/carousel-item.component.html"),
        styles: [__webpack_require__("./client/app/carousel/carousel-item/carousel-item.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], CarouselItemComponent);

//# sourceMappingURL=carousel-item.component.js.map

/***/ }),

/***/ "./client/app/carousel/carousel.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"carousel slide\">\n  <div class=\"carousel-inner\" role=\"listbox\">\n    <ng-content></ng-content>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/carousel/carousel.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__carousel_item_carousel_item_component__ = __webpack_require__("./client/app/carousel/carousel-item/carousel-item.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CarouselComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var CarouselComponent = (function () {
    function CarouselComponent() {
        this.delay = 500;
    }
    CarouselComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.activeItem = 0;
        var arrItems = this.items.toArray();
        var max = arrItems.length;
        setInterval(function () {
            for (var i = 0; i < max; i++) {
                arrItems[i].isActive = (i === _this.activeItem);
            }
            _this.activeItem = (_this.activeItem + 1) % max;
        }, this.delay);
    };
    return CarouselComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], CarouselComponent.prototype, "delay", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["ContentChildren"])(__WEBPACK_IMPORTED_MODULE_1__carousel_item_carousel_item_component__["a" /* CarouselItemComponent */]),
    __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["QueryList"]) === "function" && _a || Object)
], CarouselComponent.prototype, "items", void 0);
CarouselComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-carousel',
        template: __webpack_require__("./client/app/carousel/carousel.component.html")
    })
], CarouselComponent);

var _a;
//# sourceMappingURL=carousel.component.js.map

/***/ }),

/***/ "./client/app/cats/cats.component.html":
/***/ (function(module, exports) {

module.exports = "<app-loading [condition]=\"isLoading\"></app-loading>\n\n<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"card\" *ngIf=\"!isLoading\">\n  <h4 class=\"card-header\">Current cats ({{cats.length}})</h4>\n  <div class=\"card-block\">\n    <table class=\"table table-bordered table-striped\">\n      <thead class=\"thead-default\">\n        <tr>\n          <th>Name</th>\n          <th>Age</th>\n          <th>Weight</th>\n          <th>Actions</th>\n        </tr>\n      </thead>\n      <tbody *ngIf=\"cats.length === 0\">\n        <tr>\n          <td colspan=\"4\">There are no cats in the DB. Add a new cat below.</td>\n        </tr>  \n      </tbody>\n      <tbody *ngIf=\"!isEditing\">\n        <tr *ngFor=\"let cat of cats\">\n          <td>{{cat.name}}</td>\n          <td>{{cat.age}}</td>\n          <td>{{cat.weight}}</td>\n          <td>\n            <button class=\"btn btn-sm btn-warning\" (click)=\"enableEditing(cat)\"><i class=\"fa fa-pencil\"></i> Edit</button> <button class=\"btn btn-sm btn-danger\" (click)=\"deleteCat(cat)\"><i class=\"fa fa-trash\"></i> Delete</button>\n          </td>\n        </tr>  \n      </tbody>\n      <tbody *ngIf=\"isEditing\">\n        <tr>\n          <td colspan=\"4\">\n            <form class=\"form-inline\" #form=\"ngForm\" (ngSubmit)=\"editCat(cat)\" style=\"display:inline\">\n              <div class=\"form-group\">\n                  <input class=\"form-control\" type=\"text\" name=\"name\" [(ngModel)]=\"cat.name\" placeholder=\"Name\" required>\n              </div>\n              <div class=\"form-group\">\n                <input class=\"form-control\" type=\"number\" name=\"age\" [(ngModel)]=\"cat.age\" placeholder=\"Age\" min=\"0\" required>\n              </div>\n              <div class=\"form-group\">\n                <input class=\"form-control\" type=\"number\" name=\"weight\" [(ngModel)]=\"cat.weight\" placeholder=\"Weight\" step=\"any\" min=\"0\" required>\n              </div>\n              <button class=\"btn btn-sm btn-primary\" type=\"submit\" [disabled]=\"!form.form.valid\"><i class=\"fa fa-floppy-o\"></i> Save</button>\n            </form>\n            <button class=\"btn btn-sm btn-warning\" (click)=\"cancelEditing()\"><i class=\"fa fa-times\"></i> Cancel</button>\n          </td>\n        </tr>\n      </tbody>\n    </table>\n  </div>\n</div>\n\n<div class=\"card\" *ngIf=\"!isEditing\">\n  <h4 class=\"card-header\">Add new cat</h4>\n  <div class=\"card-block\">\n    <form class=\"form-inline\" [formGroup]=\"addCatForm\" (ngSubmit)=\"addCat()\" style=\"text-align:center\">\n      <div class=\"form-group\">\n          <input class=\"form-control\" type=\"text\" name=\"name\" formControlName=\"name\" placeholder=\"Name\">\n      </div>\n      <div class=\"form-group\">\n        <input class=\"form-control\" type=\"number\" name=\"age\" formControlName=\"age\" placeholder=\"Age\" min=\"0\">\n      </div>\n      <div class=\"form-group\">\n        <input class=\"form-control\" type=\"number\" name=\"weight\" formControlName=\"weight\" placeholder=\"Weight\" step=\"any\" min=\"0\">\n      </div>\n      <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!addCatForm.valid\"><i class=\"fa fa-floppy-o\"></i> Add</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/cats/cats.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".table td, .table th {\n  text-align: center;\n  width: 25%; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/cats/cats.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_cat_service__ = __webpack_require__("./client/app/services/cat.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CatsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CatsComponent = (function () {
    function CatsComponent(catService, formBuilder, http, toast) {
        this.catService = catService;
        this.formBuilder = formBuilder;
        this.http = http;
        this.toast = toast;
        this.cat = {};
        this.cats = [];
        this.isLoading = true;
        this.isEditing = false;
        this.name = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required);
        this.age = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required);
        this.weight = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required);
    }
    CatsComponent.prototype.ngOnInit = function () {
        this.getCats();
        this.addCatForm = this.formBuilder.group({
            name: this.name,
            age: this.age,
            weight: this.weight
        });
    };
    CatsComponent.prototype.getCats = function () {
        var _this = this;
        this.catService.getCats().subscribe(function (data) { return _this.cats = data; }, function (error) { return console.log(error); }, function () { return _this.isLoading = false; });
    };
    CatsComponent.prototype.addCat = function () {
        var _this = this;
        this.catService.addCat(this.addCatForm.value).subscribe(function (res) {
            var newCat = res.json();
            _this.cats.push(newCat);
            _this.addCatForm.reset();
            _this.toast.setMessage('item added successfully.', 'success');
        }, function (error) { return console.log(error); });
    };
    CatsComponent.prototype.enableEditing = function (cat) {
        this.isEditing = true;
        this.cat = cat;
    };
    CatsComponent.prototype.cancelEditing = function () {
        this.isEditing = false;
        this.cat = {};
        this.toast.setMessage('item editing cancelled.', 'warning');
        // reload the cats to reset the editing
        this.getCats();
    };
    CatsComponent.prototype.editCat = function (cat) {
        var _this = this;
        this.catService.editCat(cat).subscribe(function (res) {
            _this.isEditing = false;
            _this.cat = cat;
            _this.toast.setMessage('item edited successfully.', 'success');
        }, function (error) { return console.log(error); });
    };
    CatsComponent.prototype.deleteCat = function (cat) {
        var _this = this;
        if (window.confirm('Are you sure you want to permanently delete this item?')) {
            this.catService.deleteCat(cat).subscribe(function (res) {
                var pos = _this.cats.map(function (elem) { return elem._id; }).indexOf(cat._id);
                _this.cats.splice(pos, 1);
                _this.toast.setMessage('item deleted successfully.', 'success');
            }, function (error) { return console.log(error); });
        }
    };
    return CatsComponent;
}());
CatsComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-cats',
        template: __webpack_require__("./client/app/cats/cats.component.html"),
        styles: [__webpack_require__("./client/app/cats/cats.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_cat_service__["a" /* CatService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_cat_service__["a" /* CatService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */]) === "function" && _d || Object])
], CatsComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=cats.component.js.map

/***/ }),

/***/ "./client/app/footer/footer-tablet/footer-tablet.component.html":
/***/ (function(module, exports) {

module.exports = "<!--footer start from here-->\n<link href=\"https://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css\" rel=\"stylesheet\">\n<footer>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-4 col-sm-6 footerleft \">\n        <div class=\"logofooter\"> <img src=\"assets/images/reficon1.png\" class=\"img-fluid img-responsive\" width=auto alt=\"Rent A Ref\"><img src=\"assets/images/reftext.png\"\n            class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=50% max-width=100% height=auto display=\"block\"></div>      \n\n      </div>\n      <div class=\"col-md-2 col-sm-6 paddingtop-bottom\">       \n        <ul class=\"footer-ul\">          \n          <li><a routerLink=\"/privacy-policy\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-file-text-o\"></i><span style=\"color: #ffffff\"> Privacy Policy</span>\n        </a></li>\n          <li><a routerLink=\"/term-conditions\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-eye\"></i><span style=\"color: #ffffff\"> Terms & Conditions</span>\n        </a></li>         \n        </ul>\n      </div>     \n      <div class=\"col-md-3 col-sm-6 paddingtop-bottom\">       \n      </div>\n      <div class=\"social-icons\">\n        <ul class=\"nomargin\">\n          <a href=\"https://www.facebook.com/rentaref\"><i class=\"fa fa-facebook-square fa-3x social-fb\" id=\"social\"></i></a>\n          <a href=\"https://twitter.com/rentaref\"><i class=\"fa fa-twitter-square fa-3x social-tw\" id=\"social\"></i></a>\n          <a href=\"https://www.instagram.com/rentaref/\"><i class=\"fa fa-instagram fa-3x social-gp\" id=\"social\"></i></a>\n          <br>\n          <a href=\"https://www.linkedin.com/company-beta/6407927/\"><i class=\"fa fa-linkedin-square fa-3x social-gp\" id=\"social\"></i></a>\n          <a href=\"mailto:info@rentaref.com\"><i class=\"fa fa-envelope-square fa-3x social-em\" id=\"social\"></i></a>\n\n        </ul>\n      </div>\n    </div>\n  </div>\n</footer>\n<!--footer start from here-->\n\n<div class=\"copyright\">\n  <div class=\"container\">\n    <div class=\"col-md-6\">\n      <p>© 2017 - Powered by <a href=\"www.hasmandesign.com\"> Hasman Design L.L.C</a></p>\n    </div>\n    <div class=\"col-md-6\">\n      <ul class=\"bottom_ul\">\n        \n        <li><a routerLink=\"/about\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-book\"></i><span style=\"color: #ffffff\"> About Us</span>\n        </a></li>\n        \n        <li><a routerLink=\"/faq\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-question-circle-o\"></i><span style=\"color: #ffffff\"> Faq's</span>\n        </a></li>\n        <li><a routerLink=\"/contact\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-envelope-o\"></i><span style=\"color: #ffffff\"> Contact Us</span>\n        </a></li>\n        \n      </ul>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/footer/footer-tablet/footer-tablet.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700,300);", ""]);

// module
exports.push([module.i, "footer {\n  background-color: #0c1a1e;\n  min-height: 350px;\n  font-family: 'Open Sans', sans-serif; }\n\n.footerleft {\n  margin-top: 50px;\n  padding: 0 36px; }\n\n.logofooter {\n  margin-bottom: 10px;\n  font-size: 25px;\n  color: #fff;\n  font-weight: 700; }\n\n.footerleft p {\n  color: #fff;\n  font-size: 12px !important;\n  font-family: 'Open Sans', sans-serif;\n  margin-bottom: 15px; }\n\n.footerleft p i {\n  width: 20px;\n  color: #999; }\n\n.paddingtop-bottom {\n  margin-top: 50px; }\n\n.footer-ul {\n  list-style-type: none;\n  padding-left: 0px;\n  margin-left: 2px; }\n\n.footer-ul li {\n  line-height: 29px;\n  font-size: 12px; }\n\n.footer-ul li a {\n  color: #a0a3a4;\n  transition: color 0.2s linear 0s, background 0.2s linear 0s; }\n\n.footer-ul i {\n  margin-right: 10px; }\n\n.footer-ul li a:hover {\n  transition: color 0.2s linear 0s, background 0.2s linear 0s;\n  color: #ff670f; }\n\n.social:hover {\n  -webkit-transform: scale(1.1);\n  -moz-transform: scale(1.1);\n  -o-transform: scale(1.1); }\n\n.icon-ul {\n  list-style-type: none !important;\n  margin: 0px;\n  padding: 0px; }\n\n.icon-ul li {\n  line-height: 75px;\n  width: 100%;\n  float: left; }\n\n.icon {\n  float: left;\n  margin-right: 5px; }\n\n.copyright {\n  min-height: 40px;\n  background-color: #000000; }\n\n.copyright p {\n  text-align: left;\n  color: #FFF;\n  padding: 10px 0;\n  margin-bottom: 0px; }\n\n.heading7 {\n  font-size: 21px;\n  font-weight: 700;\n  color: #d9d6d6;\n  margin-bottom: 22px; }\n\n.post p {\n  font-size: 12px;\n  color: #FFF;\n  line-height: 20px; }\n\n.post p span {\n  display: block;\n  color: #8f8f8f; }\n\n.bottom_ul {\n  list-style-type: none;\n  float: right;\n  margin-bottom: 0px; }\n\n.bottom_ul li {\n  float: left;\n  line-height: 40px; }\n\n.bottom_ul li:after {\n  content: \"/\";\n  color: #FFF;\n  margin-right: 8px;\n  margin-left: 8px; }\n\n.bottom_ul li a {\n  color: #FFF;\n  font-size: 12px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/footer/footer-tablet/footer-tablet.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterTabletComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterTabletComponent = (function () {
    function FooterTabletComponent() {
    }
    FooterTabletComponent.prototype.ngOnInit = function () {
    };
    return FooterTabletComponent;
}());
FooterTabletComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer-tablet',
        template: __webpack_require__("./client/app/footer/footer-tablet/footer-tablet.component.html"),
        styles: [__webpack_require__("./client/app/footer/footer-tablet/footer-tablet.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], FooterTabletComponent);

//# sourceMappingURL=footer-tablet.component.js.map

/***/ }),

/***/ "./client/app/footer/footer.component.html":
/***/ (function(module, exports) {

module.exports = "<!--footer start from here-->\n<link href=\"https://fortawesome.github.io/Font-Awesome/assets/font-awesome/css/font-awesome.css\" rel=\"stylesheet\">\n<footer>\n  <div class=\"container\">\n    <div class=\"row\">\n      <div class=\"col-md-4 col-sm-6 footerleft \">\n        <div class=\"logofooter\"> <img src=\"assets/images/reficon1.png\" class=\"img-fluid img-responsive\" width=auto alt=\"Rent A Ref\"><img src=\"assets/images/reftext.png\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=50% max-width=100% height=auto display=\"block\"></div>\n        <p>Your most trusted gateway to modern sports management. <b>1 STOP</b> to events organization and Referee or Umpires assignment </p>\n        <p><i class=\"fa fa-map-pin\"></i> P.O Box: , Corona, CA</p>\n        <p><i class=\"fa fa-phone\"></i> Phone (USA) : +1 (949)351-5674</p>\n        <p><i class=\"fa fa-envelope\"></i> E-mail : info@rentaref.com</p>\n\n      </div>\n      <div class=\"col-md-3 col-sm-6 paddingtop-bottom\">\n        <h6 class=\"heading7\">GENERAL LINKS</h6>\n        <ul class=\"footer-ul\">          \n            <li><a routerLink=\"/career\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-briefcase\"></i><span style=\"color: #ffffff\"> Career</span>\n        </a></li>\n            <li><a routerLink=\"/privacy-policy\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-file-text-o\"></i><span style=\"color: #ffffff\"> Privacy Policy</span>\n        </a></li>\n            <li><a routerLink=\"/term-conditions\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-eye\"></i><span style=\"color: #ffffff\"> Terms & Conditions</span>\n        </a></li>\n            <li><a routerLink=\"/faq\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-question-circle-o\"></i><span style=\"color: #ffffff\"> Frequently Ask Questions</span>\n        </a></li>      \n        </ul>\n      </div>\n      <div class=\"col-md-3 col-sm-6 paddingtop-bottom\">\n        <h6 class=\"heading7\">LATEST POST</h6>\n        <div class=\"post\">\n          <p>facebook crack the movie advertisment code:what it means for you <span>August 3,2015</span></p>\n          <p>facebook crack the movie advertisment code:what it means for you <span>August 3,2015</span></p>\n          <p>facebook crack the movie advertisment code:what it means for you <span>August 3,2015</span></p>\n        </div>\n      </div>\n      <div class=\"col-md-3 col-sm-6 paddingtop-bottom\">\n        <!--<div class=\"fb-page\" data-href=\"https://www.facebook.com/facebook\" data-tabs=\"timeline\" data-height=\"300\" data-small-header=\"false\"\n          style=\"margin-bottom:15px;\" data-adapt-container-width=\"true\" data-hide-cover=\"false\" data-show-facepile=\"true\">\n          <div class=\"fb-xfbml-parse-ignore\">\n            <blockquote cite=\"https://www.facebook.com/facebook\"><a href=\"https://www.facebook.com/facebook\">Facebook</a></blockquote>\n          </div>\n        </div>-->\n      </div>\n      <div class=\"social-icons\">\n        <ul class=\"nomargin\">\n          <a href=\"https://www.facebook.com/rentaref\"><i class=\"fa fa-facebook-square fa-3x social-fb\" id=\"social\"></i></a>\n          <a href=\"https://twitter.com/rentaref\"><i class=\"fa fa-twitter-square fa-3x social-tw\" id=\"social\"></i></a>\n          <a href=\"https://www.instagram.com/rentaref/\"><i class=\"fa fa-instagram fa-3x social-gp\" id=\"social\"></i></a>\n          <a href=\"https://www.linkedin.com/company-beta/6407927/\"><i class=\"fa fa-linkedin-square fa-3x social-gp\" id=\"social\"></i></a>\n          <a href=\"mailto:info@rentaref.com\"><i class=\"fa fa-envelope-square fa-3x social-em\" id=\"social\"></i></a>\n\n        </ul>\n      </div>\n    </div>\n  </div>\n</footer>\n<!--footer start from here-->\n\n<div class=\"copyright\">\n  <div class=\"container\">\n    <div class=\"col-md-6\">\n      <p>© 2017 - Powered by <a href=\"www.hasmandesign.com\"> Hasman Design L.L.C</a></p>\n    </div>\n    <div class=\"col-md-6\">\n      <ul class=\"bottom_ul\">        \n        <li><a routerLink=\"/partners\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-users\"></i><span style=\"color: #ffffff\"> Partners</span>\n        </a></li>\n        <li><a routerLink=\"/about\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-book\"></i><span style=\"color: #ffffff\"> About Us</span>\n        </a></li>\n        <li><a routerLink=\"/blog\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-rss-square\"></i><span style=\"color: #ffffff\"> Blog</span>\n        </a></li>\n               <li><a routerLink=\"/contact\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-envelope-o\"></i><span style=\"color: #ffffff\"> Contact Us</span>\n        </a></li>\n        <li><a routerLink=\"/sitemap\" class=\"nav-item nav-link\" aria-hidden=\"true\" routerLinkActive=\"active\">\n        <i class=\"fa fa-sitemap\"></i><span style=\"color: #ffffff\"> Site Map</span>\n        </a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "./client/app/footer/footer.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans:400,700,300);", ""]);

// module
exports.push([module.i, "footer {\n  background-color: #0c1a1e;\n  min-height: 350px;\n  font-family: 'Open Sans', sans-serif; }\n\n.footerleft {\n  margin-top: 50px;\n  padding: 0 36px; }\n\n.logofooter {\n  margin-bottom: 10px;\n  font-size: 25px;\n  color: #fff;\n  font-weight: 700; }\n\n.footerleft p {\n  color: #fff;\n  font-size: 12px !important;\n  font-family: 'Open Sans', sans-serif;\n  margin-bottom: 15px; }\n\n.footerleft p i {\n  width: 20px;\n  color: #999; }\n\n.paddingtop-bottom {\n  margin-top: 50px; }\n\n.footer-ul {\n  list-style-type: none;\n  padding-left: 0px;\n  margin-left: 2px; }\n\n.footer-ul li {\n  line-height: 29px;\n  font-size: 12px; }\n\n.footer-ul li a {\n  color: #a0a3a4;\n  transition: color 0.2s linear 0s, background 0.2s linear 0s; }\n\n.footer-ul i {\n  margin-right: 10px; }\n\n.footer-ul li a:hover {\n  transition: color 0.2s linear 0s, background 0.2s linear 0s;\n  color: #ff670f; }\n\n.social:hover {\n  -webkit-transform: scale(1.1);\n  -moz-transform: scale(1.1);\n  -o-transform: scale(1.1); }\n\n.icon-ul {\n  list-style-type: none !important;\n  margin: 0px;\n  padding: 0px; }\n\n.icon-ul li {\n  line-height: 75px;\n  width: 100%;\n  float: left; }\n\n.icon {\n  float: left;\n  margin-right: 5px; }\n\n.copyright {\n  min-height: 40px;\n  background-color: #000000; }\n\n.copyright p {\n  text-align: left;\n  color: #FFF;\n  padding: 10px 0;\n  margin-bottom: 0px; }\n\n.heading7 {\n  font-size: 21px;\n  font-weight: 700;\n  color: #d9d6d6;\n  margin-bottom: 22px; }\n\n.post p {\n  font-size: 12px;\n  color: #FFF;\n  line-height: 20px; }\n\n.post p span {\n  display: block;\n  color: #8f8f8f; }\n\n.bottom_ul {\n  list-style-type: none;\n  float: right;\n  margin-bottom: 0px; }\n\n.bottom_ul li {\n  float: left;\n  line-height: 40px; }\n\n.bottom_ul li:after {\n  content: \"/\";\n  color: #FFF;\n  margin-right: 8px;\n  margin-left: 8px; }\n\n.bottom_ul li a {\n  color: #FFF;\n  font-size: 12px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/footer/footer.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FooterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = (function () {
    function FooterComponent() {
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    return FooterComponent;
}());
FooterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-footer',
        template: __webpack_require__("./client/app/footer/footer.component.html"),
        styles: [__webpack_require__("./client/app/footer/footer.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], FooterComponent);

//# sourceMappingURL=footer.component.js.map

/***/ }),

/***/ "./client/app/header/header.component.html":
/***/ (function(module, exports) {

module.exports = "<!--<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a href=\"#\" class=\"navbar-brand\"> Recipe Book</a>\n    </div>\n\n    <div class=\"collapse navbar-collapse\">\n      <ul class=\"nav navbar-nav\">\n        //!--We need to pass an event onClick so we know what we are dealing with--\n        <li><a href=\"#\" (click)=\"onSelect('recipe')\">Recipes</a></li>\n        <li><a href=\"#\" (click)=\"onSelect('shopping-list')\">Shopping List</a></li>\n      </ul>\n\n      <ul class=\"nav navbar-nav navbar-right\">\n        //!--Add the dropdown directive appDropDown from the shared/dropdown.directive.ts to enable the dropdown to work--\n        <li class=\"dropdown\" appDropdown>\n          <a href=\"#\" class=\"dropdown-toggle\" role=\"button\">Manage <span class=\"caret\"></span></a>\n          <ul class=\"dropdown-menu\">\n            <li><a href=\"#\">Save Data</a></li>\n            <li><a href=\"#\">Fetch Data</a></li>\n          </ul>\n        </li>\n      </ul>\n    </div>\n  </div>\n</nav>-->\n\n\n<nav class=\"navbar navbar-dark bg-primary\">\n  <div class=\"nav navbar-nav\">    \n    <a routerLink=\"/\" class=\"nav-item nav-link\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact:true}\"> <img src=\"assets/images/reficon1.png\" class=\"img-fluid img-responsive\" width=auto alt=\"Rent A Ref\"><img src=\"assets/images/reftext.png\"\n        class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=80% max-width=100%></a>\n    <a routerLink=\"/\" class=\"nav-item nav-link\" routerLinkActive=\"active\" [routerLinkActiveOptions]=\"{exact:true}\">\n        <i class=\"fa fa-home\"></i> Home\n      </a>\n      <a routerLink=\"/how-it-works\" class=\"nav-item nav-link\" routerLinkActive=\"active\">\n        <i class=\"fa  fa-info-circle\" aria-hidden=\"true\"></i> How It Works\n      </a>\n      <a routerLink=\"/pricing\" class=\"nav-item nav-link\" routerLinkActive=\"active\">\n        <i class=\"fa  fa-money\" aria-hidden=\"true\"></i> Pricing\n      </a>\n    <a routerLink=\"/cats\" class=\"nav-item nav-link\" routerLinkActive=\"active\">\n        <i class=\"fa fa-list\"></i> Cats     </a>\n     \n    <a routerLink=\"/login\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"!auth.loggedIn\">\n        <i class=\"fa fa-sign-in\"></i> Login\n      </a>\n    <a routerLink=\"/register\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"!auth.loggedIn\">\n        <i class=\"fa fa-user-plus\"></i> Register\n      </a>\n      \n    <a routerLink=\"/account\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn\">\n        <i class=\"fa fa-user\"></i> Account ({{auth.currentUser.username}})\n      </a>\n    <a routerLink=\"/admin\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn && auth.isAdmin\">\n        <i class=\"fa fa-lock\"></i> Admin\n      </a>\n    <a routerLink=\"/logout\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"auth.loggedIn\">\n        <i class=\"fa fa-sign-out\"></i> Logout\n      </a>\n      \n  </div>  \n  <br>\n  <div class=\"nav navbar-nav\">\n<a routerLink=\"/profile\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"!auth.loggedIn\">\n        <i class=\"fa fa-user\"></i> Profile\n      </a>\n      <a routerLink=\"/edit-profile\" class=\"nav-item nav-link\" routerLinkActive=\"active\" *ngIf=\"!auth.loggedIn\">\n        <i class=\"fa fa-pencil-square-o\"></i> Edit Profile\n      </a>\n    </div>\n</nav>\n\n<!--\n  <ul class=\"nav navbar-nav navbar-right\">\n    !--Add the dropdown directive appDropDown from the shared/dropdown.directive.ts to enable the dropdown to work--\n<li class=\"dropdown\" appDropdown>\n  <a href=\"#\" class=\"dropdown-toggle\" role=\"button\">Manage <span class=\"caret\"></span></a>\n  <ul class=\"dropdown-menu\">\n    <li><a href=\"#\">Save Data</a></li>\n    <li><a href=\"#\">Fetch Data</a></li>\n  </ul>\n</li>\n</ul>\n<nav class=\"navbar navbar-default\">\n  <div class=\"container-fluid\">\n    <div class=\"navbar-header\">\n      <a class=\"navbar-brand\" href=\"#\">WebSiteName</a>\n    </div>\n    <ul class=\"nav navbar-nav\">\n      <li class=\"active\"><a href=\"#\">Home</a></li>\n      <li><a href=\"#\">Page 1</a></li>\n      <li><a href=\"#\">Page 2</a></li>\n      <li><a href=\"#\">Page 3</a></li>\n    </ul>\n  </div>\n</nav>-->"

/***/ }),

/***/ "./client/app/header/header.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/header/header.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HeaderComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HeaderComponent = (function () {
    // This featureSelected would be use in the app.component.html
    function HeaderComponent(auth) {
        this.auth = auth;
        // We need to emit the value received from the header.component.html onSelect() function call
        // For that, we use the @Output to broacast our emitter to the global application so it is reachable everywhere
        this.featureSelected = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    HeaderComponent.prototype.onSelect = function (feature) {
        this.featureSelected.emit(feature);
    };
    return HeaderComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "featureSelected", void 0);
HeaderComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-header',
        template: __webpack_require__("./client/app/header/header.component.html"),
        styles: [__webpack_require__("./client/app/header/header.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], HeaderComponent);

var _a;
//# sourceMappingURL=header.component.js.map

/***/ }),

/***/ "./client/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<!--\n<style media=\"screen\">\n  body {\n    /*margin: 0;\n  padding: 0;*/\n    /*  Background fallback in case of IE8 & down, or in case video doens't load, such as with slower connections  */\n    /*background: #333;\n  background-attachment: fixed;\n  background-size: cover;*/\n  }\n  /* The only rule that matters */\n\n  #video-background {\n    /*  making the video fullscreen  \n  position: fixed;\n  right: 0; \n  bottom: 0;\n  min-width: 50%; \n  min-height: 50%;\n  width: auto; \n  height: auto;\n  z-index: -100;*/\n    position: fixed;\n    width: 85%;\n    height: auto;\n    z-index: -100;\n  }\n  /* These just style the content */\n\n  article {\n    /*  just a fancy border  \n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  border: 10px solid rgba(255, 255, 255, 0.5);\n  margin: 10px;*/\n  }\n\n  h1 {\n    position: absolute;\n    top: 60%;\n    width: 100%;\n    font-size: 36px;\n    letter-spacing: 3px;\n    color: #fff;\n    font-family: Oswald, sans-serif;\n    text-align: center;\n  }\n\n  h1 span {\n    font-family: sans-serif;\n    letter-spacing: 0;\n    font-weight: 300;\n    font-size: 16px;\n    line-height: 24px;\n  }\n\n  h1 span a {\n    color: #fff;\n  }\n</style>\n\n<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet' type='text/css'>\n-->\n\n<!--  Video is muted & autoplays, placed after major DOM elements for performance & has an image fallback  -->\n<!--<video autoplay loop id=\"video-background\" muted plays-inline>\n  <source src=\"assets/images/background.mp4\" type=\"video/mp4\">\n</video>-->\n<app-carousel [delay]=\"2000\">\n  <app-carousel-item>\n    <img src=\"https://unsplash.it/200\" alt=\"\">\n  </app-carousel-item>\n  <app-carousel-item>\n    <img src=\"https://unsplash.it/201\" alt=\"\">\n  </app-carousel-item>\n  <app-carousel-item>\n    <img src=\"https://unsplash.it/202\" alt=\"\">\n  </app-carousel-item>\n</app-carousel>\n<p>\n  home works! now Ahmadou\n  \n</p>\n<div>\n<span style=\"text-align: left\"><img src=\"assets/images/umpire.jpg\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=15% max-width=100%></span>\n<span style=\"text-align: right\"><img src=\"assets/images/red_ref.jpg\" class=\"img-fluid img-responsive\" alt=\"Responsive image\" width=15% max-width=100% align=\"right\"> </span>\n\n</div>\n"

/***/ }),

/***/ "./client/app/home/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".wrapper {\n  width: 60%;\n  margin: 60px auto; }\n\nhtml, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, dd, dl, dt, li, ol, ul, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td {\n  font-family: \"Arial\", Helvetica, sans-serif;\n  margin: 0;\n  padding: 0; }\n\nbody {\n  background: url(\"http://localhost:4200/assets/images/refereebg.jpg\") 0 0 repeat-x;\n  color: #5c5c5c; }\n\n.wrapper {\n  background: white;\n  width: 1000px;\n  margin: 0 auto;\n  padding: 0;\n  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.75); }\n\n/* FONT STYLES */\na {\n  color: black;\n  text-decoration: underline; }\n\na:hover, a:active {\n  color: #faa21b; }\n\na.white {\n  color: #ffffff;\n  text-decoration: underline; }\n\na.white:hover {\n  color: #faa21b; }\n\nh1 {\n  color: #111;\n  font: bold 25px/27px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em; }\n\nh1 em {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: uppercase;\n  margin-bottom: 15px; }\n\n#products h1 {\n  padding: 0 0 10px; }\n\nh2 {\n  font: normal 12px/16px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  color: #111;\n  margin-bottom: 15px; }\n\nh3 {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  margin-bottom: 15px; }\n\nh3 em {\n  color: #111;\n  font: bold 25px/27px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em; }\n\nh4 {\n  font: normal 12px/16px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  color: #111;\n  padding: 10px;\n  -moz-border-radius-topright: 7px;\n  -khtml-border-radius-topright: 7px;\n  -webkit-border-top-right-radius: 7px;\n  -moz-border-radius-topleft: 7px;\n  -khtml-border-radius-topleft: 7px;\n  -webkit-border-top-left-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\nh5 {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  margin-bottom: 10px; }\n\nh6 {\n  font: bold 12px/16px \"Arial\", Helvetica, sans-serif; }\n\nh6 a {\n  color: #f3980d;\n  text-decoration: none; }\n\nh6 a:hover {\n  color: #f3980d;\n  text-decoration: underline; }\n\np {\n  font-size: 12px;\n  line-height: 16px;\n  margin-bottom: 15px; }\n\nem {\n  font-style: normal;\n  font-weight: bold; }\n\nh7 {\n  color: #111;\n  font: normal 17px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em;\n  text-align: justify; }\n\nh8 {\n  margin: 0;\n  padding-top: 5px;\n  color: #111;\n  font: normal 17px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em;\n  text-align: justify; }\n\n/* HEADER ELEMENTS */\n#header1 {\n  height: 5px;\n  position: relative;\n  z-index: 3; }\n\n#header1 .wrapper {\n  background: #313131 url(\"http://localhost:4200/assets/images/rar.png\") bottom right no-repeat;\n  height: 155px;\n  position: relative;\n  z-index: 3; }\n\n#header1 h3 {\n  color: #999999; }\n\n#header1 a {\n  color: #CC6600;\n  cursor: hand; }\n\n#header1 a:hover {\n  color: red;\n  cursor: pointer; }\n\n#header1 #logo {\n  float: left;\n  width: 325px;\n  height: 155px; }\n\n#header1 #logo a {\n  display: block;\n  width: 262px;\n  height: 131px;\n  margin: 12px 0 0 30px;\n  background: url(\"http://localhost:4200/assets/images/rar.png\") 0 0 no-repeat;\n  color: white;\n  line-height: 2.5em;\n  font-size: 4.0em;\n  text-indent: -9999px; }\n\n#header1 #topnav1 {\n  float: right;\n  height: 28px;\n  width: 675px;\n  padding: 2px 0 0; }\n\n#header1 #topnav1 ul#flags {\n  float: left;\n  list-style-type: none;\n  padding-right: 2px; }\n\n#header1 #topnav1 ul#flags li {\n  float: left;\n  width: 16px;\n  height: 11px;\n  list-style-type: none;\n  font-size: 11px;\n  line-height: 12px;\n  text-indent: -9999px;\n  margin-right: 3px; }\n\n#header1 #topnav1 ul#flags li a {\n  color: #faa21b;\n  padding: 0;\n  float: left;\n  width: 16px;\n  height: 11px; }\n\n#header1 #topnav1 ul#menu-top-navigation {\n  float: right;\n  list-style-type: none;\n  padding-right: 2px;\n  vertical-align: top; }\n\n#header1 #topnav1 ul#menu-top-navigation li {\n  float: left;\n  list-style-type: none;\n  font-size: 11px;\n  line-height: 12px; }\n\n#header1 #topnav1 ul#menu-top-navigation li a {\n  padding: 0 6px;\n  border-right: 1px solid #838383; }\n\n#header1 #topnav1 ul#menu-top-navigation li:last-child a {\n  border-right: 0; }\n\n#header1 #search {\n  float: left;\n  padding-top: 50px; }\n\n#header1 #search input {\n  float: left;\n  font: normal 12px/20px \"Arial\", Helvetica, sans-serif;\n  border: 1px solid #838383;\n  background: #313131;\n  margin: 0 8px 0 0;\n  padding: 10px;\n  height: 20px;\n  width: 250px;\n  color: #999999; }\n\n#header1 #search input:focus {\n  color: white; }\n\n#header1 #liveChat {\n  float: right;\n  width: 240px;\n  padding-top: 25px; }\n\n#liveChat h3 em {\n  color: white; }\n\n#liveChat p {\n  font-size: 11px; }\n\n#liveChat a {\n  color: #FAA21B;\n  cursor: pointer; }\n\n#header1 #liveChat {\n  float: right;\n  width: 240px;\n  padding-top: 25px; }\n\n#tabs #liveChat {\n  width: 544px;\n  background-color: #1f1f1f;\n  float: left;\n  padding: 10px;\n  height: 85px; }\n\n#content #tabs #enquireBtn {\n  float: left;\n  width: 144px;\n  background-color: #1f1f1f;\n  padding: 31px 0;\n  height: 43px; }\n\n/* MAIN NAVIGATION */\n#mainNav {\n  width: 100%;\n  height: 55px;\n  background: #faa21b;\n  position: relative;\n  z-index: 3; }\n\n#mainNav ul li {\n  /*float: left;*/\n  height: 55px;\n  font: bold 20px/52px \"Arial\", Helvetica, sans-serif;\n  list-style-type: none;\n  display: table-cell; }\n\n#mainNav ul li a {\n  color: #111;\n  text-decoration: none;\n  /*float: left;*/\n  height: 55px;\n  padding-left: 15px;\n  padding-right: 15px;\n  letter-spacing: -0.04em;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fcbe60, #faa21b);\n  border-right: 1px solid #c88620;\n  border-left: 1px solid #fccf88;\n  display: block; }\n\n#mainNav ul li a span.navdown {\n  background: url(\"http://localhost:4200/assets/images/rar.png\") no-repeat scroll right center transparent;\n  display: block; }\n\n#mainNav ul li a span.navselected {\n  background: url(\"http://localhost:4200/assets/images/rar.png\") no-repeat scroll right center transparent;\n  display: block; }\n\n#mainNav ul li a:hover {\n  background: #1f1f1f;\n  color: #ffffff;\n  border-right: 1px solid #1f1f1f;\n  border-left: 1px solid #1f1f1f; }\n\n#mainNav ul li a:hover span {\n  background: url(\"http://localhost:4200/assets/images/rar.png\") no-repeat scroll right center transparent; }\n\n#mainNav ul li a.mainNav_selected {\n  background: #1f1f1f;\n  color: #ffffff;\n  background: url(\"http://localhost:4200/assets/images/rar.png\") #1f1f1f no-repeat scroll right center transparent;\n  border-right: 1px solid #1f1f1f;\n  border-left: 1px solid #1f1f1f; }\n\n/* CONTENT COLUMNS */\n#content {\n  width: 100%;\n  padding: 0px 0px 0px 0px;\n  margin: -15px 0px 0px 0px; }\n\n#content .wrapper {\n  padding: 0px 0px 0px 0px;\n  width: 980px; }\n\n#content .one-column {\n  float: left;\n  width: 980px; }\n\n#content .full-column-first {\n  padding-bottom: 0px;\n  margin-bottom: 0px;\n  vertical-align: top;\n  width: 100%;\n  background: white;\n  position: relative;\n  clear: both;\n  height: 100%; }\n\n#content .full {\n  padding: 0px;\n  margin: 0px;\n  vertical-align: top;\n  width: 980px;\n  background: white;\n  clear: both;\n  height: 100%; }\n\n#content .two-column-first {\n  padding-bottom: 0px;\n  margin-bottom: 0px;\n  vertical-align: top;\n  width: 730px;\n  position: relative;\n  clear: both; }\n\n#content .featured {\n  margin-top: 0px;\n  padding-top: 20px 12px 0px 12px;\n  font: italic 11px/16px \"Arial\", Helvetica, sans-serif; }\n\n#content .featured1 {\n  margin-top: 0px;\n  padding-top: 90px;\n  font: normal 11px/16px \"Arial\", Helvetica, sans-serif; }\n\n#content .featured_hotel {\n  margin-top: 0px;\n  padding-top: 9px;\n  font: normal 13px/16px \"Arial\", Helvetica, sans-serif; }\n\n#content .box1 {\n  border: 1px solid #bbb;\n  float: left;\n  margin-bottom: 10px; }\n\n#content .two-column-second {\n  display: inline-block;\n  vertical-align: top;\n  width: 300px;\n  *display: inline;\n  *zoom: 1; }\n\n#content .two-column-wide {\n  display: inline-block;\n  width: 708px;\n  *display: inline;\n  *zoom: 1; }\n\n#content .three-column-first {\n  display: inline-block;\n  margin-right: 10px;\n  vertical-align: top;\n  width: 240px;\n  *display: inline;\n  *zoom: 1; }\n\n#content .three-column-second {\n  display: inline-block;\n  vertical-align: top;\n  width: 480px;\n  *display: inline;\n  *zoom: 1; }\n\n#content .three-column-third {\n  display: inline-block;\n  width: 240px;\n  *display: inline;\n  *zoom: 1; }\n\n/* BOX ELEMENTS */\n.box {\n  border: 1px solid #bbb;\n  margin-top: 0px;\n  padding-top: 30px;\n  float: left;\n  margin-bottom: 10px;\n  background: white;\n  clear: both;\n  width: 750px;\n  text-indent: 50px; }\n\n.box2 {\n  border: 1px solid #bbb;\n  margin-top: 0px;\n  padding-top: 30px;\n  float: left;\n  margin-bottom: 10px;\n  background: white;\n  clear: both;\n  width: 200px;\n  text-indent: 5px; }\n\n.box3 {\n  border: 1px solid #bbb;\n  margin: 0px 5px 5px 5px;\n  padding-top: 60px;\n  float: left;\n  background: white;\n  clear: both;\n  width: 960px;\n  text-indent: 10px;\n  display: inline-block; }\n\n.box4 {\n  border: 1px solid #bbb;\n  margin: 0px 5px 5px 5px;\n  padding-top: 60px;\n  float: left;\n  background: white;\n  clear: both;\n  width: 750px;\n  text-indent: 50px; }\n\n.box5 {\n  border: 1px solid #bbb;\n  margin: 0px 5px 5px 5px;\n  padding-top: 6px;\n  float: left;\n  background: white;\n  clear: both;\n  width: 960px;\n  text-indent: 10px;\n  display: inline-block; }\n\n.two-column-box {\n  border: 1px solid #bbb;\n  padding: 10px;\n  float: left;\n  margin-bottom: 10px;\n  width: 708px; }\n\n.three-column-box {\n  border: 1px solid #bbb;\n  padding: 10px;\n  float: left;\n  margin-bottom: 10px;\n  width: 455px; }\n\n.tab-content ul, .newsbox ul, .two-column-box ul {\n  margin: 0;\n  list-style-type: disc;\n  list-style-position: inside;\n  color: #cccccc; }\n\n.tab-content ul li, .newsbox ul li, .two-column-box ul li {\n  color: #5c5c5c;\n  font-size: 12px;\n  line-height: 16px; }\n\n.two-column-box img, .newsbox img {\n  padding-left: 8px;\n  padding-right: 8px; }\n\n#content .three-column-first .box, #content .three-column-third .box, #content .two-column-second .box {\n  width: 218px; }\n\n.noMargin {\n  margin: 0; }\n\n/* listings */\n.staffBlog {\n  width: 338px; }\n\n.nomadNews {\n  width: 338px;\n  float: right; }\n\n.listing ul {\n  list-style-type: none; }\n\n.listing ul li {\n  list-style-type: none;\n  float: left;\n  margin-bottom: 15px; }\n\n.listing ul li:last-child {\n  margin-bottom: 0px; }\n\n.listing .image {\n  float: left;\n  width: 90px; }\n\n.listing .details {\n  float: right;\n  width: 245px; }\n\n.listing p {\n  margin-bottom: 6px;\n  font: normal 11px/16px \"Arial\", Helvetica, sans-serif; }\n\np.posted {\n  font-style: normal;\n  font-size: 11px; }\n\np.posted em {\n  color: black;\n  font-style: normal;\n  font-weight: normal; }\n\n.details h6 {\n  margin-bottom: 6px; }\n\np.price {\n  color: black;\n  font-style: normal;\n  font-size: 11px; }\n\n.listing .details p.price, .listing .details p.posted {\n  margin-bottom: 6px; }\n\n.details p.more span {\n  float: right;\n  font-weight: bold;\n  padding-right: 8px; }\n\n#content .three-column-second .listing .details {\n  float: right;\n  width: 368px; }\n\n/* featured items (carousel) */\n.featured .image img {\n  margin-bottom: 10px; }\n\n.featured p {\n  margin-bottom: 6px;\n  font: italic 11px/16px \"Arial\", Helvetica, sans-serif; }\n\n.featured .short_description {\n  margin-bottom: 6px;\n  font: italic 11px/16px \"Arial\", Helvetica, sans-serif;\n  overflow: hidden;\n  height: 50px; }\n\n/* product listings*/\n#content .three-column-second .listing li.product .image {\n  width: 236px; }\n\n#content .three-column-second .listing li.product .details {\n  float: right;\n  width: 222px; }\n\n#content .three-column-second .listing li.product .details p {\n  margin-bottom: 6px;\n  font: italic 11px/16px \"Arial\", Helvetica, sans-serif; }\n\n#content .three-column-second .listing li.product .details p.price, #content .three-column-second .listing li.product .details p.more {\n  font-style: normal; }\n\n/* PHOTOCOMP  */\n.photoComp {\n  background: #eee; }\n\n.photoComp ul {\n  list-style-type: none;\n  float: left;\n  margin-bottom: 10px; }\n\n.photoComp ul li {\n  list-style-type: none;\n  float: left;\n  margin: 0 1.5px 3px; }\n\n.photoComp ul li img {\n  float: left; }\n\n/* NEWSLETTERS */\n#newsletter .listing.box {\n  float: none;\n  padding: 0; }\n\n#newsletter .listing.box h1 {\n  padding: 10px; }\n\n#newsletter .listing.box h1 em {\n  margin-bottom: 0; }\n\n#newsletter .listing .details {\n  background: none repeat scroll 0 0 #F5F5F5;\n  float: none;\n  margin: 0;\n  width: auto; }\n\n#newsletter .listing .details h6, #newsletter .listing .details p {\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n#newsletter .listing .details h6 {\n  margin-bottom: 0;\n  padding: 15px 10px;\n  width: 85%; }\n\n/* CAR HIRE */\ndl#cars dt {\n  width: 250px;\n  float: left;\n  clear: both; }\n\ndl#cars dd {\n  width: 400px;\n  float: right;\n  padding-bottom: 20px; }\n\ndl#cars dd p {\n  margin-bottom: 10px; }\n\ndl#cars dd p span {\n  padding: 0 4px;\n  color: #5c5c5c; }\n\ndl#cars dt a {\n  width: 240px;\n  height: 150px;\n  float: left; }\n\ndl#cars table {\n  width: 97%;\n  font-size: 11px;\n  margin: 0 0 10px;\n  border: 1px solid #ddd;\n  border-right: 0;\n  border-bottom: 0;\n  border-spacing: 0;\n  border-collapse: collapse; }\n\ndl#cars table td {\n  text-align: left;\n  padding: 5px;\n  border: 1px solid #ddd;\n  border-left: 0;\n  border-top: 0; }\n\ntable.thin-border {\n  width: 97%;\n  font-size: 11px;\n  margin: 0 0 10px;\n  border: 1px solid #ddd;\n  border-right: 0;\n  border-bottom: 0;\n  border-spacing: 0;\n  border-collapse: collapse; }\n\ntable.thin-border td {\n  text-align: left;\n  padding: 5px;\n  border: 1px solid #ddd;\n  border-left: 0;\n  border-top: 0; }\n\n/* QUICKLINKS BUTTONS */\n#quickLinks {\n  margin-bottom: 0; }\n\n#quickLinks img {\n  margin-bottom: 6px; }\n\n/* PAGINATION margin-bottom: 15px;;*/\n.pagination {\n  clear: both;\n  background: black;\n  height: 25px;\n  padding: 5px 10px 0;\n  text-align: right;\n  display: block; }\n\n.pagination ul {\n  list-style-type: none;\n  float: left;\n  width: 100%;\n  text-align: center;\n  margin: 0; }\n\n.pagination ul li {\n  list-style-type: none;\n  font-size: 14px;\n  margin: 0;\n  display: inline;\n  text-align: center; }\n\n.pagination ul li a {\n  color: white;\n  text-decoration: none;\n  font-weight: bold;\n  display: inline; }\n\n.pagination ul li a:hover {\n  color: #faa21b; }\n\n.pagination ul li.index a {\n  padding: 2px; }\n\n.pagination ul li.index a.selected {\n  color: #faa21b; }\n\n.pagination ul li.start {\n  display: none; }\n\n.pagination ul li.previous {\n  float: left;\n  margin-top: 2px; }\n\n.pagination ul li.previous a {\n  padding-left: 15px; }\n\n.pagination ul li.next {\n  float: right;\n  margin-top: 2px; }\n\n.pagination ul li.end {\n  display: none; }\n\n.pagination ul li.next a {\n  padding-right: 15px; }\n\n/* BUTTONS & LINKS */\na.btn, #content input.btn, #facebox input.btn {\n  font-size: 11px;\n  color: white;\n  padding: 10px 15px;\n  margin: 0;\n  width: auto;\n  cursor: pointer;\n  float: right;\n  -moz-border-radius: 5px;\n  -khtml-border-radius: 5px;\n  -webkit-border-radius: 5px;\n  background: black;\n  text-decoration: none;\n  border: 0;\n  outline: none;\n  margin-top: 3px; }\n\na.btn:hover, #content input.btn:hover, #facebox input.btn:hover {\n  background: #faa21b;\n  color: white; }\n\na.largeBtn, #header1 #search input.largeBtn {\n  font-size: 16px;\n  color: black;\n  outline: none;\n  width: auto;\n  cursor: pointer;\n  padding: 10px 15px;\n  height: 42px;\n  -moz-border-radius: 7px;\n  -khtml-border-radius: 7px;\n  -webkit-border-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\na.largeBtn:hover, #header1 #search input.largeBtn:hover {\n  background: -moz-linear-gradient(#faa21b, #fccc83); }\n\na.arrow {\n  padding-left: 12px; }\n\n.moreLink {\n  float: right;\n  padding-top: 5px; }\n\n.moreLink a.btn {\n  float: left; }\n\np.more {\n  color: black;\n  font-style: normal;\n  font-size: 11px;\n  margin: 0; }\n\np.moredetails {\n  color: black;\n  font-style: normal;\n  font-size: 11px;\n  margin: 0;\n  bottom: 0;\n  width: 100%;\n  vertical-align: bottom;\n  position: absolute; }\n\n.details p.moredetails span {\n  float: right;\n  font-weight: bold;\n  padding-right: 8px; }\n\n.infiniteCarousel .container ul li .details {\n  display: block;\n  height: 130px;\n  position: relative; }\n\n/* LISTS */\nul.arrows {\n  padding: 0 0 15px 10px;\n  list-style-type: none;\n  list-style-position: inside;\n  list-style-type: none; }\n\nul.arrows li {\n  font-size: 12px;\n  text-transform: none; }\n\nul.arrows li a {\n  display: block;\n  font-weight: normal;\n  border-bottom: 0;\n  text-decoration: underline;\n  padding: 3px 12px; }\n\nul.bullets {\n  padding: 0;\n  margin: 0 25px 15px; }\n\nul.bullets li {\n  font-size: 12px;\n  margin: 0 0 6px; }\n\n/* FORM ELEMENTS */\n.rdpwidget input {\n  background: white;\n  border: 1px solid #bbb;\n  padding: 8px;\n  color: #5c5c5c;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  margin: 0 0 5px;\n  width: 91%; }\n\n.rdpwidget select {\n  background: white;\n  border: 1px solid #bbb;\n  padding: 8px;\n  color: #5c5c5c;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  margin: 0 0 5px;\n  width: 99%; }\n\n.rdpwidget form a {\n  font-size: 11px; }\n\ndiv.form-container {\n  float: left; }\n\n.rdpform .formfield-container {\n  float: left; }\n\n.rdpform .formfield-container label {\n  font-size: 12px;\n  float: left;\n  font-weight: bold;\n  padding-top: 9px;\n  width: 350px; }\n\n.rdpform .formfield-container label.error {\n  float: left;\n  padding-left: 5px;\n  width: 150px; }\n\n.rdpform .formfield-container input {\n  float: left;\n  background: white;\n  border: 1px solid #bbb;\n  padding: 8px;\n  color: #5c5c5c;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  margin: 0 0 5px;\n  width: 282px; }\n\n.rdpform .formfield-container select {\n  float: left;\n  background: white;\n  border: 1px solid #bbb;\n  padding: 8px;\n  color: #5c5c5c;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  margin: 0 0 5px;\n  width: 300px; }\n\n.rdpform .formfield-container textarea {\n  float: left;\n  background: white;\n  border: 1px solid #bbb;\n  padding: 8px;\n  color: #5c5c5c;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  margin: 0 0 5px;\n  width: 282px; }\n\n.rdpform .formfield-container .checkbox {\n  margin-top: 5px;\n  width: 10px; }\n\n/* FEATURED CAROUSEL */\n.infiniteCarousel {\n  width: 708px;\n  height: 285px;\n  position: relative;\n  float: right; }\n\n.infiniteCarousel .container {\n  width: 708px;\n  height: 285px;\n  overflow: auto;\n  position: absolute;\n  top: 0; }\n\n.infiniteCarousel .container ul {\n  width: 9999px;\n  height: 285px;\n  list-style-image: none;\n  list-style-position: outside;\n  list-style-type: none;\n  margin: 0;\n  padding: 0;\n  position: absolute;\n  top: 0; }\n\n.infiniteCarousel .container ul li {\n  display: block;\n  float: left;\n  height: 285px;\n  width: 226px;\n  padding: 0 10px 0 0;\n  margin: 0;\n  background: none; }\n\n.infiniteCarousel .arrow {\n  display: block;\n  height: 28px;\n  width: 28px;\n  background: url(\"http://localhost:4200/assets/images/rar.png\") 0 0 no-repeat;\n  text-indent: -9999px;\n  position: absolute;\n  top: 42%;\n  cursor: pointer;\n  padding: 0; }\n\n.infiniteCarousel .forward {\n  background-position: -28px 0;\n  right: -14px; }\n\n.infiniteCarousel .back {\n  background-position: 0 0;\n  left: -14px; }\n\n.infiniteCarousel .forward:hover {\n  background-position: -28px -28px; }\n\n.infiniteCarousel .back:hover {\n  background-position: 0 -28px; }\n\n/* ACCORDION */\n.navigatorwidget {\n  list-style-type: none;\n  float: left;\n  position: relative;\n  width: 218px;\n  height: auto;\n  margin-bottom: 5px; }\n\n.navigatorwidget li {\n  list-style-type: none;\n  color: black;\n  text-transform: uppercase; }\n\n.navigatorwidget li {\n  font-size: 12px; }\n\n.navigatorwidget li a {\n  display: block;\n  padding: 3px;\n  text-decoration: none; }\n\n.navigatorwidget li a:link, .navigatorwidget li a:visited {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget li a.open {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget ul.news-navigator li a:link, .navigatorwidget ul.news-navigator li a:visited {\n  background: none; }\n\n.navigatorwidget ul.post-navigator li a:link, .navigatorwidget ul.post-navigator li a:visited {\n  background: none; }\n\n.navigatorwidget li a.open {\n  padding: 5px 20px;\n  color: black; }\n\n.navigatorwidget li ul {\n  overflow: hidden;\n  display: none;\n  padding: 0 0 10px 20px; }\n\n.navigatorwidget li ul li {\n  font-size: 12px;\n  text-transform: none; }\n\n.navigatorwidget li ul li a, .navigatorwidget li a:visited ul li a, .navigatorwidget li li a:link, .navigatorwidget li li a:visited {\n  font-weight: normal;\n  border-bottom: 0;\n  text-decoration: underline;\n  padding: 3px 12px;\n  color: black; }\n\n.navigatorwidget li ul li a:hover, .navigatorwidget li a:visited ul li a:hover {\n  text-decoration: underline;\n  color: #faa21b; }\n\n* html .navigatorwidget {\n  height: 30em; }\n\n* html .navigatorwidget a, * html .navigatorwidget li {\n  height: 1%; }\n\n.productnavigator.navigatorwidget ul {\n  overflow: hidden;\n  padding: 0 0 10px 20px; }\n\n.productnavigator.navigatorwidget li {\n  text-transform: none; }\n\n.productnavigator.navigatorwidget li a:link, .navigatorwidget li a:visited {\n  border-bottom: 0 none;\n  color: black;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.productnavigator.navigatorwidget li a.selected {\n  color: #F3980D; }\n\n.productnavigator.navigatorwidget li a:hover {\n  color: #faa21b; }\n\n.ui-tabs {\n  padding: 0;\n  zoom: 1;\n  margin-bottom: 15px; }\n\n.ui-tabs .ui-tabs-nav {\n  height: 39px;\n  width: 710px;\n  float: left;\n  margin: 0;\n  padding: 1px 10px 0;\n  list-style: none;\n  position: relative;\n  -moz-border-radius-topright: 7px;\n  -khtml-border-radius-topright: 7px;\n  -webkit-border-top-right-radius: 7px;\n  -moz-border-radius-topleft: 7px;\n  -khtml-border-radius-topleft: 7px;\n  -webkit-border-top-left-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\n.ui-tabs .ui-tabs-nav li {\n  position: relative;\n  float: left;\n  border-bottom-width: 0 !important;\n  padding: 0;\n  font-size: 14px;\n  font-weight: bold;\n  margin-right: 15px; }\n\n.ui-tabs .ui-tabs-nav li a {\n  float: left;\n  height: 39px;\n  line-height: 39px;\n  text-decoration: none;\n  padding: 0 15px;\n  color: black;\n  text-decoration: none;\n  outline: none; }\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-selected {\n  background: white;\n  border: 1px solid #faa21b;\n  border-bottom: 0;\n  height: 38px;\n  line-height: 37px;\n  -moz-border-radius-topright: 5px;\n  -khtml-border-radius-topright: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -khtml-border-radius-topleft: 5px;\n  -webkit-border-top-left-radius: 5px; }\n\n.ui-tabs .ui-tabs-nav li.ui-tabs-selected a, .ui-tabs .ui-tabs-nav li.ui-state-disabled a, .ui-tabs .ui-tabs-nav li.ui-state-processing a {\n  height: 38px;\n  line-height: 37px;\n  background: white;\n  cursor: text;\n  -moz-border-radius-topright: 5px;\n  -khtml-border-radius-topright: 5px;\n  -webkit-border-top-right-radius: 5px;\n  -moz-border-radius-topleft: 5px;\n  -khtml-border-radius-topleft: 5px;\n  -webkit-border-top-left-radius: 5px; }\n\n.ui-tabs .ui-tabs-nav li a, .ui-tabs.ui-tabs-collapsible .ui-tabs-nav li.ui-tabs-selected a {\n  cursor: pointer; }\n\n.ui-tabs .ui-tabs-panel {\n  display: block;\n  border-width: 0;\n  background: none;\n  margin-bottom: 15px; }\n\n.ui-tabs .ui-tabs-hide {\n  display: none !important; }\n\n.ui-tabs .ui-tabs-panel .tab-content {\n  margin-bottom: 15px;\n  clear: both;\n  border: 1px solid #bbb;\n  border-top: 0;\n  padding: 10px;\n  float: left;\n  width: 708px; }\n\n.tab-content .image img {\n  border: 1px solid #bbb; }\n\n.tab-content .image {\n  float: left;\n  width: 375px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.tab-content .details {\n  float: left;\n  width: 100%;\n  padding-top: 10px; }\n\n.tab-content .detailstop {\n  float: left;\n  padding-top: 10px;\n  width: 300px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.tab-content .details p span {\n  font-style: italic; }\n\n/* tabs tables */\n.tab-content table {\n  font-size: 12px;\n  width: 100%;\n  border: 0;\n  border-spacing: 0;\n  border-collapse: collapse; }\n\n.tab-content table th {\n  text-align: left;\n  font-weight: normal;\n  color: black;\n  text-transform: uppercase;\n  padding: 8px; }\n\n.tab-content table td {\n  text-align: left;\n  padding: 8px; }\n\n.tab-content table td em.available {\n  color: #7db730; }\n\n.tab-content table tr:nth-child(odd) td {\n  background: #f1f1f1; }\n\n/* FOOTER */\n#deck {\n  width: 100%;\n  clear: both;\n  z-index: -1; }\n\n#deck .wrapper {\n  clear: both;\n  border-bottom: 3px solid #111;\n  background: #4d4d4d;\n  background: -moz-linear-gradient(#575757, #3a3a3a); }\n\n#deck h4 {\n  background: none;\n  padding: 0;\n  color: #999999;\n  font: 12px/14px \"Arial\",Helvetica,sans-serif;\n  margin-bottom: 15px;\n  text-transform: uppercase; }\n\n#deck .three-column-first, #deck .three-column-second {\n  display: inline-block;\n  vertical-align: top;\n  width: 278px;\n  padding: 20px 20px 10px;\n  height: 180px;\n  *display: inline;\n  *zoom: 1; }\n\n#deck .three-column-third {\n  display: inline-block;\n  vertical-align: top;\n  width: 285px;\n  padding: 20px 20px 10px;\n  *display: inline;\n  *zoom: 1; }\n\n#deck p {\n  color: white;\n  font-size: 11px; }\n\n#deck p span {\n  display: block; }\n\n#deck a {\n  color: white; }\n\n#deck a.arrow {\n  display: block; }\n\n#deck a:hover {\n  color: #faa21b; }\n\n#deck .column {\n  float: left;\n  width: 50%; }\n\n#deck ul {\n  list-style-type: none;\n  margin-bottom: 15px;\n  float: left;\n  width: 100%; }\n\n#deck ul li {\n  font-size: 11px;\n  margin-bottom: 6px;\n  float: left;\n  width: 100%; }\n\n#deck ul li a {\n  color: white;\n  padding-left: 12px; }\n\n.clearfix {\n  clear: both;\n  width: 100%;\n  height: 0;\n  font-size: 0;\n  line-height: 0; }\n\n/* FOOTER-LINKS-LOGOS */\n#footer {\n  width: 100%;\n  clear: both;\n  float: left;\n  height: 200px; }\n\n#footer .wrapper {\n  background: transparent;\n  padding: 25px 0;\n  box-shadow: none; }\n\n#footer p {\n  font-size: 11px; }\n\n#footer p img {\n  margin: 0 25px; }\n\n/* FACEBOX POPUP */\n#facebox {\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 100;\n  text-align: left; }\n\n#facebox .popup {\n  position: relative; }\n\n#facebox .content {\n  display: table;\n  width: 500px;\n  padding: 15px;\n  background: #eee; }\n\n#facebox .close {\n  position: absolute;\n  top: -8px;\n  right: -8px; }\n\n#facebox .loading {\n  text-align: center; }\n\n#facebox .image {\n  text-align: center; }\n\n#facebox img {\n  border: 0;\n  margin: 0; }\n\n#facebox_overlay {\n  position: fixed;\n  top: 0px;\n  left: 0px;\n  height: 100%;\n  width: 100%; }\n\n.facebox_hide {\n  z-index: -100; }\n\n.facebox_overlayBG {\n  background: black;\n  z-index: 99; }\n\n#facebox .gallery {\n  width: 400px;\n  background: white; }\n\n#facebox .gallery .content {\n  background: white; }\n\n#facebox .contain {\n  padding: 15px; }\n\n/* FORM STYLES */\n#facebox form {\n  font-size: 12px;\n  font-weight: bold;\n  color: #666;\n  margin-bottom: 33px; }\n\n#facebox form div {\n  padding: 10px 0;\n  clear: both; }\n\n#facebox form label {\n  width: 200px;\n  float: left;\n  font-weight: bold;\n  padding-top: 9px; }\n\n#facebox form input, #facebox form select, #facebox form textarea {\n  float: left;\n  border: 1px solid #ccc;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  background: white;\n  margin: 0;\n  padding: 8px;\n  width: 250px;\n  color: #111; }\n\n#facebox form input.date {\n  width: 200px; }\n\n#facebox form .capcha {\n  float: left;\n  border: 1px solid #ccc;\n  font: normal 12px/13px \"Arial\", Helvetica, sans-serif;\n  background: white;\n  margin: 0;\n  padding: 8px;\n  width: 160px;\n  color: #111; }\n\n#facebox form div.dates {\n  float: none; }\n\n#facebox form div.dates input {\n  width: 85px; }\n\n#facebox form div.checkbox, #facebox form div.radio {\n  padding: 10px 0; }\n\n#facebox form div.checkbox input, #facebox form div.radio input {\n  width: auto;\n  padding: 0;\n  border: 0;\n  margin-right: 5px; }\n\n#facebox input.btn {\n  margin-bottom: 15px; }\n\n#facebox .content .featured {\n  padding: 0 0 0 12px; }\n\n#facebox .content .postitem {\n  padding: 10px; }\n\n#facebox .content .postitemcell {\n  padding: 0 0 0 10px; }\n\n.error {\n  font-size: 8pt;\n  color: #ff0000;\n  padding: 1px;\n  margin-bottom: 5px; }\n\n#ProductHeader {\n  display: block;\n  clear: both; }\n\n#productHeaderImages {\n  width: 735px;\n  float: left; }\n\n#productHeaderInfo {\n  background: #1f1f1f;\n  width: 265px;\n  height: 484px;\n  float: left;\n  display: block;\n  position: relative; }\n\n#productHeaderInfo .content {\n  padding: 10px;\n  padding-top: 15px; }\n\n#productHeaderInfo h1 {\n  font-family: arial;\n  forn-weight: bold;\n  color: #ffffff;\n  font-size: 20px;\n  margin-bottom: 5px;\n  line-height: 1;\n  overflow: hidden;\n  width: 243px; }\n\n.productHeaderDisplay {\n  color: #5c5c5c;\n  font-size: 12px; }\n\n#productHeaderInfo h4 {\n  padding-left: 5px;\n  padding: 0px;\n  margin: 0px;\n  font: 12px/16px \"Arial\",Helvetica,sans-serif;\n  background: transparent;\n  color: #5c5c5c; }\n\ndl.margins {\n  font-weight: bold;\n  width: 250px;\n  overflow: hidden; }\n\n.margins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 12px;\n  padding: 2px 5px 2px 0;\n  clear: left; }\n\n.margins dd {\n  padding-left: 5px;\n  float: left;\n  font-size: 12px;\n  color: #ffffff;\n  padding: 2px 0;\n  clear: right; }\n\ndl.largmargins {\n  margin-bottom: 2px;\n  padding: 5px 0 8px 0;\n  font-weight: bold;\n  width: 250px;\n  overflow: hidden; }\n\n.largmargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 12px;\n  padding: 2px 5px 2px 0;\n  clear: left; }\n\n.largmargins dd {\n  padding-left: 5px;\n  float: left;\n  font-size: 12px;\n  color: #ffffff;\n  padding: 2px 0;\n  clear: right; }\n\ndl.smallmargins {\n  width: 250px;\n  overflow: hidden;\n  font-weight: bold; }\n\n.smallmargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 11px;\n  padding: 3px 2px 1px 0;\n  font-weight: bold;\n  clear: left; }\n\n.smallmargins dd {\n  padding-left: 5px;\n  font-size: 11px;\n  color: #ffffff;\n  padding: 3px 0px 1px 0;\n  font-weight: bold;\n  clear: right; }\n\ndl.nomargins {\n  padding: 0 6px 0 0;\n  width: 250px;\n  font-weight: bold; }\n\ndl.nomargins.toppadding {\n  padding: 10px 6px 0 0; }\n\n.nomargins dt {\n  color: #5c5c5c;\n  float: left;\n  font-size: 11px;\n  padding: 0 6px 0 0;\n  font-weight: bold;\n  clear: left; }\n\n.nomargins dd {\n  padding-left: 5px;\n  font-size: 11px;\n  color: #ffffff;\n  padding: 0;\n  font-weight: bold;\n  clear: right; }\n\n.newsbox {\n  border: 1px solid #BBBBBB;\n  margin-bottom: 10px;\n  padding: 10px;\n  width: 956px;\n  display: inline-block;\n  *display: inline;\n  *zoom: 1; }\n\n.newsbox a, .two-column-box a {\n  color: black;\n  text-decoration: underline;\n  font: 11px/16px \"Arial\",Helvetica,sans-serif; }\n\n.newsbox a, .three-column-box a {\n  color: black;\n  text-decoration: underline;\n  font: 11px/16px \"Arial\",Helvetica,sans-serif; }\n\n.newsbox a:hover, .two-column-box a:hover {\n  color: #F3980D; }\n\n#productHeaderInfo a {\n  color: #5c5c5c;\n  text-decoration: underline;\n  font: 11px/16px \"Arial\",Helvetica,sans-serif; }\n\n#productHeaderInfo a:hover {\n  color: #fAA21B; }\n\n.enquireBtn, #productHeaderInfo a#enquireBtn, #facebox a#enquireBtn, #content a#enquireBtn, div#enquireBtn a.enquire-link {\n  position: absolute;\n  right: 10px;\n  bottom: 8px;\n  font-size: 16px;\n  color: black;\n  outline: none;\n  width: auto;\n  cursor: pointer;\n  text-decoration: none;\n  padding: 10px 25px;\n  -moz-border-radius: 7px;\n  -khtml-border-radius: 7px;\n  -webkit-border-radius: 7px;\n  border: 0;\n  background: #faa21b;\n  background: -moz-linear-gradient(#fccc83, #faa21b); }\n\n.enquireBtn, #content a#enquireBtn, div#enquireBtn a.enquire-link {\n  position: relative;\n  float: right; }\n\n.enquireBtn, #productHeaderInfo a#enquireBtn:hover, #facebox a#enquireBtn:hover, #content a#enquireBtn:hover {\n  background: -moz-linear-gradient(#faa21b, #fccc83); }\n\n.newsbox .img {\n  padding-right: 15px; }\n\n.clearpadding {\n  margin-left: -5px; }\n\n.hidden {\n  display: none; }\n\n.two-column-box h6 a {\n  font: bold 12px/16px \"Arial\", Helvetica, sans-serif;\n  color: #f3980d;\n  text-decoration: none; }\n\n.two-column-box h6 a:hover {\n  color: #f3980d;\n  text-decoration: underline; }\n\n.tooltip {\n  display: none;\n  background: url(\"http://localhost:4200/assets/images/rar.png\");\n  height: 163px;\n  padding: 40px 30px 10px 30px;\n  width: 310px;\n  font-size: 11px;\n  color: #fff; }\n\n/* a .label element inside tooltip */\n.tooltip .label {\n  color: yellow;\n  width: 35px; }\n\n.tooltip a {\n  color: #ad4;\n  font-size: 11px;\n  font-weight: bold; }\n\n#footer-left-container-left {\n  float: left;\n  width: 78px; }\n\n#footer-left-container-right {\n  float: left;\n  font-size: 9px;\n  width: 900px; }\n\n#menu-footer-left {\n  list-style-type: none;\n  margin: 0;\n  padding: 0; }\n\n#menu-footer-left li {\n  display: block;\n  padding: 0px 6px 0px 6px;\n  border-right: 1px solid #5c5c5c;\n  float: left; }\n\n#menu-footer-left li.lastitem {\n  border-right: 0px; }\n\n#menu-footer-left li a {\n  color: black;\n  text-decoration: underline;\n  font-size: 11px;\n  line-height: 16px; }\n\n.navcontent {\n  background: #1f1f1f;\n  z-index: 5;\n  position: absolute;\n  display: none; }\n\n#header1Image {\n  z-index: 1;\n  position: relative; }\n\n#navcontentContainer {\n  width: 1000px;\n  position: absolute;\n  z-index: 10; }\n\n#navcontentContainer h1 em {\n  color: #999999; }\n\n#navcontentContainer h1 a {\n  color: #fff; }\n\n#navcontent1 {\n  width: 1000px;\n  height: 481px; }\n\n#navcontent2 {\n  width: 350px;\n  height: 481px;\n  position: absolute;\n  right: 0px; }\n\n/*.sliderContent{clear:both;}*/\n.navcontentbox1 {\n  height: 450px;\n  width: 190px;\n  float: left;\n  padding: 15px;\n  border-right: 1px solid #4c4c4c; }\n\n.navcontentbox2 {\n  height: 450px;\n  width: 140px;\n  float: left;\n  padding: 15px;\n  border-right: 1px solid #4c4c4c;\n  display: none; }\n\n.navcontentbox3 {\n  height: 450px;\n  width: 295px;\n  float: left;\n  padding: 15px;\n  border-right: 1px solid #4c4c4c;\n  display: none; }\n\n.navcontentbox4 {\n  height: 450px;\n  width: 225px;\n  float: left;\n  padding: 22px;\n  display: none; }\n\n.navcontentbox5 {\n  height: 450px;\n  width: 225px;\n  float: left;\n  padding: 15px;\n  display: block; }\n\n.tours-year li, .tours-duration li, .tours-country li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 10px;\n  padding-left: 10px; }\n\n.tours-year li a, .tours-year li a:visited, .tours-duration li a, .tours-country li a:visited, .tours-country li a, .tours-country li a:visited {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-year li a:hover, .tours-duration li a:hover, .tours-country li a:hover {\n  color: #FAA21b;\n  text-decoration: underline; }\n\n.navcontentbox2 ul li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 10px;\n  padding-left: 10px; }\n\n.navcontentbox2 ul li a {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.durationwidget ul li a {\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.navcontentbox2 ul li a:hover {\n  color: #FAA21b; }\n\n#duration-navigator ul li a {\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-list li, #menu-charter-tours li {\n  color: black;\n  list-style-type: none;\n  font-size: 12px;\n  padding-top: 5px; }\n\n.tours-list li a, .tours-list li a:visited, #menu-charter-tours li a, #menu-charter-tours li a:visited {\n  color: #ffffff;\n  border-bottom: 0 none;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline; }\n\n.tours-list li a:hover, #menu-charter-tours li a:hover {\n  color: #FAA21b;\n  text-decoration: underline; }\n\np.wprice {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal;\n  margin-bottom: 0; }\n\np.wmore {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal;\n  margin: 0; }\n\n.wdetails {\n  color: #ffffff;\n  height: 255px;\n  overflow: hidden; }\n\n.wdetails a {\n  color: #F3980D;\n  text-decoration: underline; }\n\np.wactivity {\n  color: #ffffff;\n  font-size: 11px;\n  font-style: normal; }\n\n#content ul.breadcrumb {\n  clear: both;\n  color: #5c5c5c;\n  font-size: 12px;\n  list-style: none;\n  padding-bottom: 5px; }\n\n#content ul.breadcrumb li {\n  display: inline; }\n\n#content ul.breadcrumb li a {\n  color: #000;\n  text-decoration: underline; }\n\n#content ul.breadcrumb li a:hover {\n  color: #F3980D; }\n\n#content ul.breadcrumb li a.selected {\n  color: #F3980D; }\n\n.jcarousel {\n  position: relative;\n  overflow: hidden;\n  height: 157px;\n  margin-left: 0px;\n  padding-left: 0px;\n  width: 100%;\n  margin-top: 244px;\n  padding-top: 310px;\n  margin-bottom: 0px;\n  padding-bottom: 0px; }\n\n.jcarousel ul {\n  width: 20000em;\n  position: absolute;\n  list-style: none;\n  margin: 0;\n  padding: 0; }\n\n.jcarousel li {\n  float: left; }\n\nul.jcarousel-control {\n  margin-left: 800px;\n  width: 250px;\n  position: absolute;\n  margin-top: 220px;\n  padding-top: 200px;\n  z-index: 1; }\n\nul.jcarousel-control li {\n  background-image: url(\"http://localhost:4200/assets/images/rar.png\");\n  display: inline-block;\n  height: 17px;\n  width: 17px;\n  *display: inline;\n  *zoom: 1; }\n\n#banner a, #banner a:hover {\n  color: #FFFFFF;\n  text-decoration: none; }\n\n#banner .banner-content {\n  height: 65px;\n  background: #000000;\n  margin-top: -5px; }\n\n#banner .banner-content p {\n  margin: 0;\n  padding-left: 40px;\n  color: #FFFFFF; }\n\n#banner .banner-content p.banner-title {\n  font: bold 25px Arial,Helvetica,sans-serif;\n  padding-left: 20px;\n  padding-top: 10px; }\n\n#banner .banner-content p.banner-title img {\n  padding-bottom: 5px;\n  padding-right: 10px; }\n\n.loadImage {\n  width: 32px;\n  height: 32px;\n  display: block;\n  margin-left: auto;\n  margin-right: auto;\n  margin-top: 193px; }\n\n#product-navigation {\n  width: 100%; }\n\n#product-navigation .wrapper {\n  padding: 0px;\n  width: 100%;\n  height: 6px; }\n\n#product-navigation #menu-product-navigation {\n  display: table;\n  width: 100%; }\n\n#product-navigation #menu-product-navigation #accommodatedtour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #campingtour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #daytour {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #accommodation {\n  width: 258px; }\n\n#product-navigation #menu-product-navigation #chartertour {\n  width: 258px; }\n\n.browseListings h2 {\n  font-weight: bold;\n  margin-bottom: 10px; }\n\n#date-details {\n  float: left;\n  margin: 10px 0; }\n\n#facebox-loading {\n  text-align: center; }\n\n#facebox .form-container {\n  padding-bottom: 50px; }\n\n#facebox a#enquireBtn {\n  bottom: 20px;\n  right: 45px; }\n\n#twitter {\n  margin-top: 5px; }\n\n#twitter h4 {\n  background: none; }\n\n#content a#request-brochure {\n  border: medium none;\n  height: 92px;\n  width: 240px;\n  cursor: pointer;\n  margin: 0 0 10px;\n  display: block;\n  text-decoration: none; }\n\n.nomadNews .featuredblog h3 {\n  color: #5c5c5c;\n  font: normal 12px/14px \"Arial\", Helvetica, sans-serif;\n  text-transform: uppercase;\n  margin-bottom: 15px; }\n\n.nomadNews .featuredblog h3 em {\n  color: #111;\n  font: bold 25px/27px \"Arial\", Helvetica, sans-serif;\n  display: block;\n  text-transform: none;\n  letter-spacing: -0.04em; }\n\n.sliderContent .navigatorwidget {\n  margin-bottom: 15px;\n  position: relative;\n  width: 190px; }\n\n.sliderContent .navigatorwidget ul.product-detailed-navigator li {\n  color: black;\n  font-size: 12px;\n  list-style-type: none;\n  padding-left: 5px;\n  padding-top: 10px; }\n\n.sliderContent .navigatorwidget ul.product-detailed-navigator li a, .sliderContent .navigatorwidget ul.product-detailed-navigator li a:visited, .sliderContent .navigatorwidget ul.product-detailed-navigator li a:link {\n  white-space: nowrap;\n  border-bottom: 0 none;\n  color: #FFFFFF;\n  font-weight: normal;\n  padding: 3px 12px;\n  text-decoration: underline;\n  text-transform: capitalize; }\n\n.imagegallerywidget h3 {\n  display: none; }\n\n.imagegallerywidget div.image {\n  background: none repeat scroll 0 0 #FFFFFF;\n  float: left;\n  margin: 5px 6px 6px 5px;\n  overflow: hidden;\n  position: relative; }\n\n.imagegallerywidget img {\n  float: left;\n  padding: 0; }\n\n.imagegallerywidget div.image label {\n  color: black;\n  font-size: 11px;\n  line-height: 14px;\n  padding: 10px 10px 0;\n  text-transform: uppercase;\n  display: block;\n  position: relative;\n  float: left;\n  background: #faa21b;\n  height: 100px;\n  width: 100%;\n  opacity: 0.9;\n  filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity = 90)\";\n  -MS-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=90)\"; }\n\n#social-share-links div {\n  display: inline-block;\n  width: 100px;\n  *display: inline;\n  *zoom: 1; }\n\n#page-not-found {\n  text-align: center; }\n\n#page-not-found img {\n  padding: 25px 0; }\n\n#page-not-found h1 {\n  padding: 0 0 10px; }\n\n#page-not-found h1 em {\n  letter-spacing: 0.01px; }\n\n#page-not-found .submit-container {\n  float: none; }\n\n#page-not-found .submit-container a.btn {\n  color: #fff;\n  text-decoration: none; }\n\n#page-not-found .form-container {\n  display: inline-block;\n  float: none;\n  padding: 20px 0 0;\n  *display: inline;\n  *zoom: 1; }\n\n#page-not-found .form-container .formfield-container {\n  float: none;\n  height: 40px;\n  width: 400px; }\n\n#page-not-found .form-container .formfield-container label {\n  width: 100px;\n  text-align: left; }\n\n#unsubscribe .form-container {\n  display: inline-block;\n  float: none;\n  width: 100%;\n  *display: inline;\n  *zoom: 1; }\n\n#unsubscribe .form-container .formfield-container {\n  float: none; }\n\n#unsubscribe .form-container .formfield-container label {\n  width: 100px; }\n\n#unsubscribe .submit-container {\n  float: left;\n  padding: 0 10px; }\n\n#unsubscribe .submit-container a.btn {\n  color: #fff;\n  text-decoration: none;\n  margin: 0; }\n\n.newsletter.box {\n  border: none;\n  height: 220px;\n  width: 220px !important; }\n\n.newsletter.box input {\n  border: 1px solid #FAA21B; }\n\n#profiles {\n  color: #000000;\n  text-decoration: none;\n  margin: 0 0px 0 0px;\n  padding: 0;\n  clear: both;\n  height: 100%;\n  width: 100% !important; }\n\n.profiles.box {\n  background: #E5E5FF;\n  border: none;\n  float: right;\n  width: 100% !important;\n  margin: 0 0px 0 5px;\n  padding-top: 9px;\n  clear: both;\n  height: 100%; }\n\n#menuFull {\n  width: 100%;\n  clear: both;\n  padding: 0px 0px 30px;\n  margin: 0px; }\n\n#subscribecontainer img.newsletter-icon {\n  display: inline-block; }\n\n#subscribecontainer h3 {\n  color: #ffffff;\n  display: inline-block;\n  width: 75%; }\n\n#browse-button {\n  display: inline-block;\n  margin-top: 20px;\n  vertical-align: top;\n  width: 130px; }\n\n#subscribe-button {\n  display: inline-block;\n  height: 34px;\n  margin-left: 5px;\n  margin-top: 5px;\n  width: 76px; }\n\n#subscribecontainer a:hover, #subscribecontainer a:active {\n  color: #fff; }\n\n#frmsubscribe input.error {\n  outline: 2px solid #FF0000; }\n\n#frmsubscribe label.error {\n  display: none !important; }\n\n/*-- Camtour --*/\n#slider-wrapper div.jqans-wrapper.default a {\n  color: #363636 !important; }\n\n#slider-wrapper div.jqans-wrapper.default {\n  background: none repeat scroll 0 0 #FFFFFF !important;\n  border-left: 1px solid #DBE1E6;\n  border-right: 1px solid #DBE1E6;\n  border-top: 1px solid #DBE1E6;\n  color: inherit; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong {\n  color: #000000;\n  font-weight: bold;\n  text-transform: uppercase; }\n\n#slider-wrapper div.jqans-wrapper.default img {\n  margin: 0;\n  max-width: 100%;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 {\n  font-size: 138% !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited {\n  background: none repeat scroll 0 0 transparent;\n  border: medium none;\n  color: #16387C !important;\n  text-decoration: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content p {\n  color: #333333 !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories {\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li {\n  background-color: #FCFCFD;\n  background-image: -moz-linear-gradient(center top, #E8EDF0, #FCFCFD);\n  border-top-color: #A8B4BF; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected {\n  background-color: #59728B;\n  background-image: -moz-linear-gradient(center top, #59728B, #2D4458);\n  border-top-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img {\n  background-color: #FFFFFF;\n  border: 1px solid #C5CED7;\n  margin: 8px 0 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img {\n  border: 1px solid #000000; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 {\n  background: none repeat scroll 0 0 transparent !important;\n  color: #59728B !important;\n  font-size: 12px !important;\n  font-weight: normal;\n  line-height: 14px !important;\n  margin: 0;\n  padding: 0;\n  text-shadow: none;\n  text-transform: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 {\n  color: #FFFFFF !important;\n  font-size: 12px !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div {\n  border-bottom: 10px solid #59728B;\n  border-left: 10px solid transparent;\n  border-right: 10px solid transparent; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul, #slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li {\n  background: none repeat scroll 0 0 transparent !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination {\n  background-color: #F9FAFA;\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a {\n  border-right-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span {\n  border-right-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span {\n  border-left-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default #control-play {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default #pause-left, #slider-wrapper div.jqans-wrapper.default #pause-right {\n  background: none repeat scroll 0 0 #59728B; }\n\n/* Accessible News Slider : Theme Custom*/\n/* DEFAULT STYLES\n#slider-wrapper div.jqans-wrapper.default a &gt; color of links in post text\n*/\n#slider-wrapper div.jqans-wrapper.default a {\n  color: #363636 !important; }\n\n/* WRAPPER\n#slider-wrapper div.jqans-wrapper.default &gt; color of the top, left, right border background color and text color (useful for changing color to subtitle) of the main wrapper\n*/\n#slider-wrapper div.jqans-wrapper.default {\n  border-left: 1px solid #DBE1E6;\n  border-right: 1px solid #DBE1E6;\n  border-top: 1px solid #DBE1E6;\n  background: #FFF !important;\n  color: inherit; }\n\n/* HEADLINE\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong &gt; aspect of the widget title (\\\\\\\\\\\\\\\"Today news\\\\\\\\\\\\\\\")\n*/\n#slider-wrapper div.jqans-wrapper.default .jqans-headline strong {\n  text-transform: uppercase;\n  font-weight: bold;\n  color: #000; }\n\n/* POST CONTENT\n#slider-wrapper div.jqans-wrapper.default img &gt; img dimensions\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 &gt; size of post title\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited &gt; color of post title\n#slider-wrapper div.jqans-wrapper.default .jqans-content p &gt; color of post paragraph\n*/\n#slider-wrapper div.jqans-wrapper.default img {\n  max-width: 100%;\n  margin: 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 {\n  font-size: 138% !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content h1 a, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:hover, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:active, #slider-wrapper div.jqans-wrapper.default .jqans-content h1 a:visited {\n  color: #16387C !important;\n  text-decoration: none;\n  background: transparent;\n  border: none; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-content p {\n  color: #333 !important; }\n\n/* CAROUSEL\n#slider-wrapper div.jqans-wrapper.default .jqans-stories &gt; list border bottom color\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li &gt; carousel item background color, gradient and border top color\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected &gt; carousel item selected background color, gradient and border top color\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img &gt; carousel item image border and background, margin and padding\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img &gt; carusel item image border when selected\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 &gt; carousel item paragraph font size, color and line height\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 &gt; carousel item paragraph font size and color when selected\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div &gt; carousel item arrow color\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul, #slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li &gt; ensure transparency on selector background\n*/\n#slider-wrapper div.jqans-wrapper.default .jqans-stories {\n  border-bottom-color: #DBE1E6; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li {\n  background-color: #FCFCFD;\n  background-image: -moz-linear-gradient(center top, #E8EDF0, #FCFCFD);\n  border-top-color: #A8B4BF; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected {\n  background-color: #59728B;\n  background-image: -moz-linear-gradient(center top, #59728B, #2D4458);\n  border-top-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li img {\n  border: 1px solid #C5CED7;\n  background-color: #fff;\n  margin: 8px 0 0 0;\n  padding: 0; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected img {\n  border: 1px solid #000; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li h3 {\n  font-size: 12px !important;\n  color: #59728B !important;\n  line-height: 14px !important;\n  text-transform: none;\n  background: transparent !important;\n  background-color: transparent !important;\n  background-image: none !important;\n  margin: 0;\n  padding: 0;\n  text-shadow: none;\n  font-weight: normal; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories li.selected h3 {\n  font-size: 12px !important;\n  color: #FFF !important; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li.selected div {\n  border-right: 10px solid transparent;\n  border-bottom: 10px solid #59728B;\n  border-left: 10px solid transparent; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-stories-selector ul, #slider-wrapper div.jqans-wrapper.default .jqans-stories-selector li {\n  background-color: transparent !important;\n  background: transparent !important; }\n\n/* PAGINATION\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination &gt; border bottom color and backround of the box containing pagination and slider controls\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a &gt; previous button control color\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a &gt; next button control color\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span &gt; fake element to make an arrow with pure css: it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span &gt; fake element to make an arrow with pure css: it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color\n#slider-wrapper div.jqans-wrapper.default #control-play &gt; play button color\n#slider-wrapper div.jqans-wrapper.default #pause-left, #slider-wrapper div.jqans-wrapper.default #pause-right &gt; pause button color\n*/\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination {\n  border-bottom-color: #DBE1E6;\n  background-color: #F9FAFA; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a {\n  border-right-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-back a span {\n  border-right-color: #F9FAFA;\n  /* it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color*/ }\n\n#slider-wrapper div.jqans-wrapper.default .jqans-pagination-controls-next a span {\n  border-left-color: #F9FAFA;\n  /* it needs to be the same color as #slider-wrapper div.jqans-wrapper.default .jqans-pagination background color*/ }\n\n#slider-wrapper div.jqans-wrapper.default #control-play {\n  border-left-color: #59728B; }\n\n#slider-wrapper div.jqans-wrapper.default #pause-left, #slider-wrapper div.jqans-wrapper.default #pause-right {\n  background: #59728B; }\n\n/* Master */\n#master-wrapper {\n  background: url(\"http://localhost:4200/assets/images/refereebg1.jpg\") repeat fixed center center #000000;\n  height: 100%;\n  position: fixed;\n  width: 100%;\n  z-index: -1; }\n\n/* Menu start*/\n.nfMain {\n  -moz-border-bottom-colors: none;\n  -moz-border-left-colors: none;\n  -moz-border-right-colors: none;\n  -moz-border-top-colors: none;\n  border-color: #00AD00;\n  -o-border-image: none;\n     border-image: none;\n  border-style: solid;\n  border-width: 0 0 0 2px;\n  width: 980px;\n  clear: both;\n  padding: 0;\n  margin: 0;\n  position: relative;\n  display: block; }\n\n.nfMain .nfLink {\n  border-color: #00AD00;\n  border-style: solid;\n  border-width: 0 2px 2px 0;\n  color: #000000;\n  font-family: Arial;\n  font-size: 0.9em;\n  padding: 9px 30px 5px;\n  text-decoration: none; }\n\n.nfPure .nfItem:hover > .nfLink, .nfPure .nfItem:hover > * > .nfLink {\n  text-decoration: underline; }\n\n.nfPure .nfLink:hover, .nfMain .nfJSHover {\n  color: #FFFFFF;\n  text-decoration: underline; }\n\n.nfMain, .nfSubC, .nfSubS {\n  list-style: none;\n  margin: 0px;\n  padding: 0px; }\n\n.nfMain {\n  position: relative;\n  z-index: 1; }\n\n.nfMain .nfSubC {\n  visibility: hidden;\n  position: absolute; }\n\n.nfMain .nfItem, .nfMain .nfLink {\n  list-style: none;\n  position: relative;\n  display: block;\n  white-space: nowrap;\n  margin: 0px; }\n\n.nfMain:after {\n  content: \".\";\n  display: block;\n  height: 0px;\n  clear: both;\n  overflow: hidden; }\n\n.nfPure .nfItem:hover, .nfPure .nfItem:hover > .nfSubC {\n  z-index: 1101;\n  visibility: inherit; }\n\n.nfPure .nfLink:focus {\n  z-index: 1102; }\n\n.nfMain .nfJSActiveItem {\n  z-index: 1101; }\n\n.nfMain .nfJSShowSub {\n  z-index: 1101;\n  visibility: inherit; }\n\n.nfMain .nfItem div.nfLink {\n  cursor: default; }\n\n.nfMain .nfItem {\n  float: left; }\n\n.nfMain .nfItem .nfItem {\n  float: none; }\n\n.nfMain .nfItem .nfSubC {\n  top: 100%;\n  left: 0px;\n  width: auto; }\n\n.nfMain .nfSubC .nfItem .nfSubC {\n  top: 0px;\n  left: 100%;\n  width: auto; }\n\n/*~~~~~~~~~~~~~~~~ Menu Styles (global - all menus) ~~~~~~~~~~~~~~~~*/\n/******[Main Menu]******/\n/*Main Menu Container*/\n.nfMain {\n  background-color: #55556a;\n  background-image: url(\"http://localhost:4200/assets/images/refereebg.jpg\");\n  padding: 0px 0px 0px 20px; }\n\n/*Item Links*/\n.nfMain .nfLink {\n  border-style: solid;\n  border-width: 1px 0px 1px 1px;\n  border-color: #333;\n  padding: 6px 40px 6px 20px;\n  font-family: Arial;\n  font-size: 14px;\n  color: #fff;\n  text-decoration: none; }\n\n/*Item Links - Parent*/\n.nfMain .nfParent .nfLink {\n  background-position: 92% 52%;\n  background-repeat: no-repeat; }\n\n.nfMain .nfParent .nfSubS .nfLink {\n  background-image: none; }\n\n/*Item Links - Hover (duplicate styles below!)*/\n.nfPure .nfItem:hover > .nfLink, .nfPure .nfItem:hover > * > .nfLink {\n  text-decoration: underline; }\n\n.nfPure .nfLink:hover, .nfMain .nfJSHover {\n  text-decoration: underline; }\n\n/*Item Links - Active*/\n.nfMain .nfItem .nfJSActive {\n  border-bottom-color: #e5ebf7;\n  background-color: #e5ebf7;\n  color: #425fa7;\n  text-decoration: underline; }\n\n/*Item Links - Focus*/\n.nfPure .nfLink:focus, .nfMain .nfItem .nfJSFocus {\n  text-decoration: underline; }\n\n/*Item Links - Breadcrumbs*/\n/******[Sub Menus]******/\n/*Sub Menu Styles*/\n.nfMain .nfSubS {\n  background-color: #e5ebf7;\n  padding: 20px; }\n\n.nfMain .nfSubS {\n  height: auto;\n  border: solid 1px #333;\n  border-width: 0px 1px 1px 1px;\n  background-color: #e5ebf7;\n  -moz-border-radius-bottomLeft: 10px;\n  -moz-border-radius-bottomRight: 10px;\n  -webkit-border-bottom-right-radius: 10px;\n  -webkit-border-bottom-left-radius: 10px; }\n\n/*Sub Menu Position Offsets - Level 2*/\n.nfMain .nfSubS .nfSubC {\n  margin: -1px 0px 0px 0px; }\n\n/*Sub Menu Styles - Level 2*/\n.nfMain .nfSubS .nfSubS {\n  border-width: 1px; }\n\n.nfMain .nfSubS .nfSubS {\n  -moz-border-radius-topRight: 10px;\n  -moz-border-radius-bottomLeft: 10px;\n  -moz-border-radius-bottomRight: 10px;\n  -webkit-border-bottom-right-radius: 10px;\n  -webkit-border-bottom-left-radius: 10px;\n  -webkit-border-top-right-radius: 10px; }\n\n/*Item Links*/\n.nfMain .nfSubS .nfLink {\n  border-style: solid;\n  border-width: 0px 0px 1px 0px;\n  border-color: #999;\n  padding: 6px 40px 6px 5px;\n  font-size: 13px;\n  color: #55556a; }\n\n/*Item Links - Parent*/\n.nfMain .nfSubS .nfParent .nfSubS .nfLink {\n  background-image: none; }\n\n/*Item Links - Last Child (ignored by IE8 & down)*/\n.nfMain .nfSubS .nfItem:last-child .nfLink {\n  border-width: 0px; }\n\n/*Item Links - Hover (duplicate styles below!)*/\n/*Item Links - Active*/\n.nfMain .nfSubS .nfItem .nfJSActive {\n  background-color: #ccd0e3;\n  color: #425fa7;\n  text-decoration: underline; }\n\n/*Item Links - Focus*/\n.nfPure .nfSubS .nfLink:focus, .nfMain .nfSubS .nfItem .nfJSFocus {\n  color: #03f; }\n\n/*Item Links - Breadcrumbs*/\n/******[Custom Example Menu Styles]******/\n.custTitle {\n  font-size: 1em;\n  margin: 20px 0px 5px 0px;\n  color: #55556a;\n  font-weight: bold; }\n\n.custTitleBoxed {\n  font-size: .9em;\n  margin: 20px 0px 5px 0px;\n  color: #55556a;\n  padding: 8px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #fff;\n  border-color: #979cb6;\n  -moz-border-radius: 4px;\n  -webkit-border-radius: 4px; }\n\n.custTitleTop {\n  margin: 5px 0px 5px 0px; }\n\n.custMegaSub {\n  width: 760px; }\n\n.custMegaItem {\n  font-size: .9em; }\n\n.megaContentRight {\n  position: relative;\n  width: 190px;\n  left: 290px; }\n\n.megaContentMiddle {\n  position: absolute;\n  width: 140px;\n  left: 170px; }\n\n.megaContentLeft {\n  position: absolute;\n  width: 240px; }\n\n.megaContentMiddle ul, .megaContentLeft ul, .megaContentRight ul {\n  list-style-type: circle;\n  margin: 10px 0px 0px 24px;\n  padding: 0px; }\n\n.megaTopTitle {\n  width: 440px;\n  font-size: 1em;\n  color: #55556a;\n  white-space: normal;\n  margin-bottom: 10px;\n  padding: 8px;\n  border-style: solid;\n  border-width: 1px;\n  background-color: #fff;\n  border-color: #979cb6;\n  -moz-border-radius: 4px;\n  -webkit-border-radius: 4px; }\n\n.megaTitle {\n  color: #55556a;\n  white-space: normal; }\n\n/*End menu */\n#content .whitebg {\n  background: red;\n  clear: both; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

// import our Carousel Component
// import { CarouselComponent } from '../carousel/carousel.component';
var HomeComponent = (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-home',
        template: __webpack_require__("./client/app/home/home.component.html"),
        styles: [__webpack_require__("./client/app/home/home.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], HomeComponent);

//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "./client/app/home/how-it-works/how-it-works.component.html":
/***/ (function(module, exports) {

module.exports = "\n<p>\n  how-it-works works!\n</p>\n"

/***/ }),

/***/ "./client/app/home/how-it-works/how-it-works.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/home/how-it-works/how-it-works.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HowItWorksComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HowItWorksComponent = (function () {
    function HowItWorksComponent() {
    }
    HowItWorksComponent.prototype.ngOnInit = function () {
    };
    return HowItWorksComponent;
}());
HowItWorksComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-how-it-works',
        template: __webpack_require__("./client/app/home/how-it-works/how-it-works.component.html"),
        styles: [__webpack_require__("./client/app/home/how-it-works/how-it-works.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], HowItWorksComponent);

//# sourceMappingURL=how-it-works.component.js.map

/***/ }),

/***/ "./client/app/home/pricing/pricing.component.html":
/***/ (function(module, exports) {

module.exports = "<p>\n  pricing works!\n</p>\n"

/***/ }),

/***/ "./client/app/home/pricing/pricing.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/home/pricing/pricing.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PricingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PricingComponent = (function () {
    function PricingComponent() {
    }
    PricingComponent.prototype.ngOnInit = function () {
    };
    return PricingComponent;
}());
PricingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-pricing',
        template: __webpack_require__("./client/app/home/pricing/pricing.component.html"),
        styles: [__webpack_require__("./client/app/home/pricing/pricing.component.scss")]
    }),
    __metadata("design:paramtypes", [])
], PricingComponent);

//# sourceMappingURL=pricing.component.js.map

/***/ }),

/***/ "./client/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"card\">\n  <h4 class=\"card-header\">Login</h4>\n  <div class=\"card-block\">\n    <form [formGroup]=\"loginForm\" (ngSubmit)=\"login()\">\n      <div class=\"input-group\" [ngClass]=\"setClassEmail()\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-envelope\"></i></span>\n        <input class=\"form-control\" type=\"email\" name=\"email\" formControlName=\"email\" placeholder=\"Email\" autofocus>\n      </div>\n      <div class=\"input-group\" [ngClass]=\"setClassPassword()\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n        <input class=\"form-control\" type=\"password\" name=\"password\" formControlName=\"password\" placeholder=\"Password\">\n      </div>\n      <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!loginForm.valid\"><i class=\"fa fa-sign-in\"></i> Login</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/login/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var LoginComponent = (function () {
    function LoginComponent(auth, formBuilder, router, toast) {
        this.auth = auth;
        this.formBuilder = formBuilder;
        this.router = router;
        this.toast = toast;
        this.email = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(3),
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(100)]);
        this.password = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(6)]);
    }
    LoginComponent.prototype.ngOnInit = function () {
        if (this.auth.loggedIn) {
            this.router.navigate(['/']);
        }
        this.loginForm = this.formBuilder.group({
            email: this.email,
            password: this.password
        });
    };
    LoginComponent.prototype.setClassEmail = function () {
        return { 'has-danger': !this.email.pristine && !this.email.valid };
    };
    LoginComponent.prototype.setClassPassword = function () {
        return { 'has-danger': !this.password.pristine && !this.password.valid };
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.auth.login(this.loginForm.value).subscribe(function (res) { return _this.router.navigate(['/']); }, function (error) { return _this.toast.setMessage('invalid email or password!', 'danger'); });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__("./client/app/login/login.component.html"),
        styles: [__webpack_require__("./client/app/login/login.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "./client/app/logout/logout.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogoutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogoutComponent = (function () {
    function LogoutComponent(auth) {
        this.auth = auth;
    }
    LogoutComponent.prototype.ngOnInit = function () {
        this.auth.logout();
    };
    return LogoutComponent;
}());
LogoutComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-logout',
        template: './logout.component.html',
        styles: ['']
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_auth_service__["a" /* AuthService */]) === "function" && _a || Object])
], LogoutComponent);

var _a;
//# sourceMappingURL=logout.component.js.map

/***/ }),

/***/ "./client/app/not-found/not-found.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\">\n  <h4 class=\"card-header\">404 Not Found</h4>\n  <div class=\"card-block\">\n    <p>The page you requested was not found.</p>\n    <p>Go to <a routerLink=\"/\">Homepage</a>.</p>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/not-found/not-found.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return NotFoundComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var NotFoundComponent = (function () {
    function NotFoundComponent() {
    }
    return NotFoundComponent;
}());
NotFoundComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-not-found',
        template: __webpack_require__("./client/app/not-found/not-found.component.html")
    }),
    __metadata("design:paramtypes", [])
], NotFoundComponent);

//# sourceMappingURL=not-found.component.js.map

/***/ }),

/***/ "./client/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<app-toast [message]=\"toast.message\"></app-toast>\n\n<div class=\"card\">\n  <h4 class=\"card-header\">Register</h4>\n  <div class=\"card-block\">\n    <form [formGroup]=\"registerForm\" (ngSubmit)=\"register()\">\n      <div class=\"input-group\" [ngClass]=\"setClassUsername()\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-user\"></i></span>\n        <input class=\"form-control\" type=\"text\" name=\"username\" formControlName=\"username\" placeholder=\"Username\" autofocus>\n      </div>\n      <div class=\"input-group\" [ngClass]=\"setClassEmail()\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-envelope\"></i></span>\n        <input class=\"form-control\" type=\"email\" name=\"email\" formControlName=\"email\" placeholder=\"Email\">\n      </div>\n      <div class=\"input-group\" [ngClass]=\"setClassPassword()\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-key\"></i></span>\n        <input class=\"form-control\" type=\"password\" name=\"password\" formControlName=\"password\" placeholder=\"Password\">\n      </div>\n      <div class=\"input-group\">\n        <span class=\"input-group-addon\"><i class=\"fa fa-black-tie\"></i></span>\n        <select class=\"form-control\" name=\"role\" formControlName=\"role\">\n          <option value=\"\" selected disabled>Role</option>\n          <option value=\"user\">User</option>\n          <option value=\"admin\">Admin</option>\n        </select>\n      </div>\n      <button class=\"btn btn-primary\" type=\"submit\" [disabled]=\"!registerForm.valid\"><i class=\"fa fa-user-plus\"></i> Register</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/register/register.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterComponent = (function () {
    function RegisterComponent(formBuilder, router, toast, userService) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.toast = toast;
        this.userService = userService;
        this.username = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(2),
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(30),
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].pattern('[a-zA-Z0-9_-\\s]*')]);
        this.email = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(3),
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].maxLength(100)]);
        this.password = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].minLength(6)]);
        this.role = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["c" /* FormControl */]('', [__WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]);
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerForm = this.formBuilder.group({
            username: this.username,
            email: this.email,
            password: this.password,
            role: this.role
        });
    };
    RegisterComponent.prototype.setClassUsername = function () {
        return { 'has-danger': !this.username.pristine && !this.username.valid };
    };
    RegisterComponent.prototype.setClassEmail = function () {
        return { 'has-danger': !this.email.pristine && !this.email.valid };
    };
    RegisterComponent.prototype.setClassPassword = function () {
        return { 'has-danger': !this.password.pristine && !this.password.valid };
    };
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.userService.register(this.registerForm.value).subscribe(function (res) {
            _this.toast.setMessage('you successfully registered!', 'success');
            _this.router.navigate(['/login']);
        }, function (error) { return console.log(error); }, function () { return _this.toast.setMessage('email already exists', 'danger'); }
        // error => this.toast.setMessage('email already exists', 'danger')
        );
        // console.log('Erro: ' + this.error);
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-register',
        template: __webpack_require__("./client/app/register/register.component.html"),
        styles: [__webpack_require__("./client/app/register/register.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_forms__["e" /* FormBuilder */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__shared_toast_toast_component__["a" /* ToastComponent */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _d || Object])
], RegisterComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "./client/app/routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cats_cats_component__ = __webpack_require__("./client/app/cats/cats.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__about_about_component__ = __webpack_require__("./client/app/about/about.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__register_register_component__ = __webpack_require__("./client/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login_component__ = __webpack_require__("./client/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__logout_logout_component__ = __webpack_require__("./client/app/logout/logout.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__account_account_component__ = __webpack_require__("./client/app/account/account.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__admin_admin_component__ = __webpack_require__("./client/app/admin/admin.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__not_found_not_found_component__ = __webpack_require__("./client/app/not-found/not-found.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__home_home_component__ = __webpack_require__("./client/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services_auth_guard_login_service__ = __webpack_require__("./client/app/services/auth-guard-login.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__services_auth_guard_admin_service__ = __webpack_require__("./client/app/services/auth-guard-admin.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__home_how_it_works_how_it_works_component__ = __webpack_require__("./client/app/home/how-it-works/how-it-works.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__home_pricing_pricing_component__ = __webpack_require__("./client/app/home/pricing/pricing.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__account_profile_profile_component__ = __webpack_require__("./client/app/account/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__account_profile_edit_profile_edit_profile_component__ = __webpack_require__("./client/app/account/profile/edit-profile/edit-profile.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RoutingModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var routes = [
    {
        path: '', component: __WEBPACK_IMPORTED_MODULE_10__home_home_component__["a" /* HomeComponent */],
    },
    { path: 'how-it-works', component: __WEBPACK_IMPORTED_MODULE_13__home_how_it_works_how_it_works_component__["a" /* HowItWorksComponent */] },
    { path: 'pricing', component: __WEBPACK_IMPORTED_MODULE_14__home_pricing_pricing_component__["a" /* PricingComponent */] },
    { path: 'about', component: __WEBPACK_IMPORTED_MODULE_3__about_about_component__["a" /* AboutComponent */] },
    { path: 'cats', component: __WEBPACK_IMPORTED_MODULE_2__cats_cats_component__["a" /* CatsComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_4__register_register_component__["a" /* RegisterComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_5__login_login_component__["a" /* LoginComponent */] },
    { path: 'logout', component: __WEBPACK_IMPORTED_MODULE_6__logout_logout_component__["a" /* LogoutComponent */] },
    { path: 'account', component: __WEBPACK_IMPORTED_MODULE_7__account_account_component__["a" /* AccountComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_11__services_auth_guard_login_service__["a" /* AuthGuardLogin */]] },
    { path: 'profile', component: __WEBPACK_IMPORTED_MODULE_15__account_profile_profile_component__["a" /* ProfileComponent */] },
    { path: 'edit-profile', component: __WEBPACK_IMPORTED_MODULE_16__account_profile_edit_profile_edit_profile_component__["a" /* EditProfileComponent */] },
    { path: 'admin', component: __WEBPACK_IMPORTED_MODULE_8__admin_admin_component__["a" /* AdminComponent */], canActivate: [__WEBPACK_IMPORTED_MODULE_12__services_auth_guard_admin_service__["a" /* AuthGuardAdmin */]] },
    { path: 'notfound', component: __WEBPACK_IMPORTED_MODULE_9__not_found_not_found_component__["a" /* NotFoundComponent */] },
    { path: '**', redirectTo: '/notfound' },
];
var RoutingModule = (function () {
    function RoutingModule() {
    }
    return RoutingModule;
}());
RoutingModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */].forRoot(routes, { enableTracing: true } // For debugging purposes only
            )],
        exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* RouterModule */]]
    })
], RoutingModule);

//# sourceMappingURL=routing.module.js.map

/***/ }),

/***/ "./client/app/services/auth-guard-admin.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardAdmin; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardAdmin = (function () {
    function AuthGuardAdmin(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardAdmin.prototype.canActivate = function () {
        return this.auth.isAdmin;
    };
    return AuthGuardAdmin;
}());
AuthGuardAdmin = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AuthGuardAdmin);

var _a, _b;
//# sourceMappingURL=auth-guard-admin.service.js.map

/***/ }),

/***/ "./client/app/services/auth-guard-login.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__auth_service__ = __webpack_require__("./client/app/services/auth.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuardLogin; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AuthGuardLogin = (function () {
    function AuthGuardLogin(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    AuthGuardLogin.prototype.canActivate = function () {
        return this.auth.loggedIn;
    };
    return AuthGuardLogin;
}());
AuthGuardLogin = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__auth_service__["a" /* AuthService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AuthGuardLogin);

var _a, _b;
//# sourceMappingURL=auth-guard-login.service.js.map

/***/ }),

/***/ "./client/app/services/auth.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__ = __webpack_require__("./node_modules/angular2-jwt/angular2-jwt.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_angular2_jwt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_angular2_jwt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_user_service__ = __webpack_require__("./client/app/services/user.service.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AuthService = (function () {
    function AuthService(userService, router) {
        this.userService = userService;
        this.router = router;
        this.loggedIn = false;
        this.isAdmin = false;
        this.jwtHelper = new __WEBPACK_IMPORTED_MODULE_2_angular2_jwt__["JwtHelper"]();
        this.currentUser = { username: '', role: '' };
        var token = null; //localStorage.getItem('token');
        if (token) {
            var decodedUser = this.decodeUserFromToken(token);
            //this.setCurrentUser(decodedUser);
        }
    }
    AuthService.prototype.login = function (emailAndPassword) {
        var _this = this;
        return this.userService.login(emailAndPassword).map(function (res) { return res.json(); }).map(function (res) {
            localStorage.setItem('token', res.token);
            var decodedUser = _this.decodeUserFromToken(res.token);
            _this.setCurrentUser();
            return _this.loggedIn;
        });
    };
    AuthService.prototype.logout = function () {
        localStorage.removeItem('token');
        this.loggedIn = false;
        this.isAdmin = false;
        this.currentUser = { username: '', role: '' };
        this.router.navigate(['/']);
    };
    AuthService.prototype.decodeUserFromToken = function (token) {
        return this.jwtHelper.decodeToken(token).user;
    };
    AuthService.prototype.setCurrentUser = function () {
        this.loggedIn = true;
        this.currentUser.username = 'Admin';
        this.currentUser.role = 'no role';
        //decodedUser.role === 'admin' ? this.isAdmin = true : this.isAdmin = false;
        //delete decodedUser.role;
    };
    return AuthService;
}());
AuthService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_user_service__["a" /* UserService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === "function" && _b || Object])
], AuthService);

var _a, _b;
//# sourceMappingURL=auth.service.js.map

/***/ }),

/***/ "./client/app/services/cat.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CatService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var CatService = (function () {
    function CatService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: this.headers });
    }
    CatService.prototype.getCats = function () {
        return this.http.get('/api/cats').map(function (res) { return res.json(); });
    };
    CatService.prototype.countCats = function () {
        return this.http.get('/api/cats/count').map(function (res) { return res.json(); });
    };
    CatService.prototype.addCat = function (cat) {
        return this.http.post('/api/cat', JSON.stringify(cat), this.options);
    };
    CatService.prototype.getCat = function (cat) {
        return this.http.get("/api/cat/" + cat._id).map(function (res) { return res.json(); });
    };
    CatService.prototype.editCat = function (cat) {
        return this.http.put("/api/cat/" + cat._id, JSON.stringify(cat), this.options);
    };
    CatService.prototype.deleteCat = function (cat) {
        return this.http.delete("/api/cat/" + cat._id, this.options);
    };
    return CatService;
}());
CatService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], CatService);

var _a;
//# sourceMappingURL=cat.service.js.map

/***/ }),

/***/ "./client/app/services/user.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("./node_modules/rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return UserService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var UserService = (function () {
    function UserService(http) {
        this.http = http;
        this.headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["Headers"]({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
        this.options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["RequestOptions"]({ headers: this.headers });
    }
    UserService.prototype.register = function (user) {
        return this.http.post('/api/user', JSON.stringify(user), this.options);
    };
    UserService.prototype.login = function (credentials) {
        return this.http.post('/api/login', JSON.stringify(credentials), this.options);
    };
    UserService.prototype.getUsers = function () {
        return this.http.get('/api/users').map(function (res) { return res.json(); });
    };
    UserService.prototype.countUsers = function () {
        return this.http.get('/api/users/count').map(function (res) { return res.json(); });
    };
    UserService.prototype.addUser = function (user) {
        return this.http.post('/api/user', JSON.stringify(user), this.options);
    };
    UserService.prototype.getUser = function (user) {
        return this.http.get("/api/user/" + user._id).map(function (res) { return res.json(); });
    };
    UserService.prototype.editUser = function (user) {
        return this.http.put("/api/user/" + user._id, JSON.stringify(user), this.options);
    };
    UserService.prototype.deleteUser = function (user) {
        return this.http.delete("/api/user/" + user._id, this.options);
    };
    return UserService;
}());
UserService = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["Http"]) === "function" && _a || Object])
], UserService);

var _a;
//# sourceMappingURL=user.service.js.map

/***/ }),

/***/ "./client/app/shared/dropdown.directive.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DropdownDirective; });
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
var DropdownDirective = (function () {
    function DropdownDirective() {
        // We use the HostBinding to attach the css element class.open
        // The HostListener listen to the CLICK even so the class.open can be applied to the html object
        // class.open allows the dropdown to open up and reveal its content
        this.isOpen = false;
    }
    DropdownDirective.prototype.toggleOpen = function () {
        this.isOpen = !this.isOpen;
    };
    return DropdownDirective;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostBinding"])('class.open'),
    __metadata("design:type", Object)
], DropdownDirective.prototype, "isOpen", void 0);
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["HostListener"])('click'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DropdownDirective.prototype, "toggleOpen", null);
DropdownDirective = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Directive"])({
        selector: '[appDropdown]'
    })
    // This appDropdown would be consumed by the recipe-detail.component.html and header.component.html.
    ,
    __metadata("design:paramtypes", [])
], DropdownDirective);

//# sourceMappingURL=dropdown.directive.js.map

/***/ }),

/***/ "./client/app/shared/loading/loading.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"card\" *ngIf=\"condition\">\n  <h4 class=\"card-header\">Loading...</h4>\n  <div class=\"card-block text-xs-center\">\n    <i class=\"fa fa-circle-o-notch fa-spin fa-3x\"></i>\n  </div>\n</div>"

/***/ }),

/***/ "./client/app/shared/loading/loading.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/shared/loading/loading.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadingComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var LoadingComponent = (function () {
    function LoadingComponent() {
    }
    return LoadingComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Boolean)
], LoadingComponent.prototype, "condition", void 0);
LoadingComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-loading',
        template: __webpack_require__("./client/app/shared/loading/loading.component.html"),
        styles: [__webpack_require__("./client/app/shared/loading/loading.component.scss")]
    })
], LoadingComponent);

//# sourceMappingURL=loading.component.js.map

/***/ }),

/***/ "./client/app/shared/shared.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__("./node_modules/@angular/http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__toast_toast_component__ = __webpack_require__("./client/app/shared/toast/toast.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__loading_loading_component__ = __webpack_require__("./client/app/shared/loading/loading.component.ts");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SharedModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var SharedModule = (function () {
    function SharedModule() {
    }
    return SharedModule;
}());
SharedModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"]
        ],
        exports: [
            // Shared Modules
            __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_3__angular_http__["HttpModule"],
            // Shared Components
            __WEBPACK_IMPORTED_MODULE_4__toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_5__loading_loading_component__["a" /* LoadingComponent */]
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_4__toast_toast_component__["a" /* ToastComponent */],
            __WEBPACK_IMPORTED_MODULE_5__loading_loading_component__["a" /* LoadingComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__toast_toast_component__["a" /* ToastComponent */]
        ]
    })
], SharedModule);

//# sourceMappingURL=shared.module.js.map

/***/ }),

/***/ "./client/app/shared/toast/toast.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message.body\" class=\"alert alert-{{message.type}} alert-dismissible\" role=\"alert\">\n  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n    <span aria-hidden=\"true\">&times;</span>\n  </button>\n  <strong>Message:</strong> {{message.body}}\n</div>"

/***/ }),

/***/ "./client/app/shared/toast/toast.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, ".alert {\n  z-index: 999;\n  position: fixed;\n  bottom: 15px;\n  left: 25%;\n  width: 50%;\n  opacity: 0.9; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "./client/app/shared/toast/toast.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ToastComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ToastComponent = (function () {
    function ToastComponent() {
        this.message = { body: '', type: '' };
    }
    ToastComponent.prototype.setMessage = function (body, type, time) {
        var _this = this;
        if (time === void 0) { time = 3000; }
        this.message.body = body;
        this.message.type = type;
        setTimeout(function () { _this.message.body = ''; }, time);
    };
    return ToastComponent;
}());
__decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
    __metadata("design:type", Object)
], ToastComponent.prototype, "message", void 0);
ToastComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-toast',
        template: __webpack_require__("./client/app/shared/toast/toast.component.html"),
        styles: [__webpack_require__("./client/app/shared/toast/toast.component.scss")]
    })
], ToastComponent);

//# sourceMappingURL=toast.component.js.map

/***/ }),

/***/ "./client/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
// The file contents for the current environment will overwrite these during build.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "./client/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./client/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./client/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./client/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map