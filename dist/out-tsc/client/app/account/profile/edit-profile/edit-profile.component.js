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
var forms_1 = require("@angular/forms");
var toast_component_1 = require("../../../shared/toast/toast.component");
var index_1 = require("../../../services/index");
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
        this.email = new forms_1.FormControl('', [
            forms_1.Validators.required,
            forms_1.Validators.email
        ]);
        this.paypalinfo = new forms_1.FormControl('', [
            forms_1.Validators.nullValidator
        ]);
        this.check = new forms_1.FormControl('', [forms_1.Validators.nullValidator]);
        this.ccinfo = new forms_1.FormControl('', [forms_1.Validators.nullValidator]);
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
        core_1.Component({
            selector: 'app-edit-profile',
            templateUrl: './edit-profile.component.html',
            styleUrls: ['./edit-profile.component.scss']
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder,
            index_1.AuthService,
            toast_component_1.ToastComponent,
            index_1.ProfileService,
            index_1.UserService,
            router_1.ActivatedRoute,
            router_1.Router,
            index_1.StatesService])
    ], EditProfileComponent);
    return EditProfileComponent;
}());
exports.EditProfileComponent = EditProfileComponent;
//# sourceMappingURL=edit-profile.component.js.map