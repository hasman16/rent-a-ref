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
var toast_component_1 = require("../shared/toast/toast.component");
var index_1 = require("../services/index");
require("rxjs/add/operator/combineLatest");
require("rxjs/add/operator/switchMap");
var MatchesComponent = /** @class */ (function () {
    function MatchesComponent(cd, auth, toast, route, router) {
        this.cd = cd;
        this.auth = auth;
        this.toast = toast;
        this.route = route;
        this.router = router;
        this.subscriptions = [];
    }
    MatchesComponent.prototype.ngOnInit = function () { };
    MatchesComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    MatchesComponent.prototype.createNewMatch = function () { };
    MatchesComponent = __decorate([
        core_1.Component({
            selector: 'rar-matches',
            templateUrl: './matches.component.html',
            styleUrls: ['./matches.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            index_1.AuthService,
            toast_component_1.ToastComponent,
            router_1.ActivatedRoute,
            router_1.Router])
    ], MatchesComponent);
    return MatchesComponent;
}());
exports.MatchesComponent = MatchesComponent;
//# sourceMappingURL=matches.component.js.map