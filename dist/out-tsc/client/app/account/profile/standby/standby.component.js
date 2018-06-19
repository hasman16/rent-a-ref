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
var index_1 = require("../../../services/index");
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
        var currentUser = this.auth.getCurrentUser();
        this.userService.getProfile(currentUser.id).subscribe(function (res) {
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
            if (!_this.auth.loggedIn) {
                _this.auth.logout();
            }
        });
    };
    StandbyComponent = __decorate([
        core_1.Component({
            selector: 'app-standby',
            templateUrl: './standby.component.html',
            styleUrls: ['./standby.component.scss']
        }),
        __metadata("design:paramtypes", [index_1.AuthService, index_1.UserService])
    ], StandbyComponent);
    return StandbyComponent;
}());
exports.StandbyComponent = StandbyComponent;
//# sourceMappingURL=standby.component.js.map