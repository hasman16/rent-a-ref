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
Object.defineProperty(exports, "__esModule", { value: true });
//https://github.com/stripe/stripe-payments-demo
var core_1 = require("@angular/core");
var index_1 = require("../../services/index");
var _ = require("lodash");
var StripeComponent = /** @class */ (function () {
    function StripeComponent(cd, organizeService) {
        this.cd = cd;
        this.organizeService = organizeService;
        this.amount = 0;
        this.cardHandler = this.onChange.bind(this);
    }
    StripeComponent.prototype.ngAfterViewInit = function () {
        this.card = elements.create('card', {
            style: {
                base: {
                    iconColor: '#666EE8',
                    color: '#31325F',
                    lineHeight: '40px',
                    fontWeight: 300,
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSize: '18px',
                    '::placeholder': {
                        color: '#CFD7E0'
                    }
                }
            }
        });
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
                    if (!_.has(result, 'error')) {
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
                })
                    .finally(function () {
                    _this.cd.markForCheck();
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
        }, function () {
            _this.cd.markForCheck();
        });
    };
    StripeComponent.prototype.errorOut = function (err) {
        if (_.has(err, 'error.message.message')) {
            this.error = err.error.message.message;
        }
    };
    __decorate([
        core_1.ViewChild('cardInfo'),
        __metadata("design:type", core_1.ElementRef)
    ], StripeComponent.prototype, "cardInfo", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], StripeComponent.prototype, "amount", void 0);
    __decorate([
        core_1.Output(),
        __metadata("design:type", core_1.EventEmitter)
    ], StripeComponent.prototype, "finished", void 0);
    StripeComponent = __decorate([
        core_1.Component({
            selector: 'rar-stripe',
            templateUrl: './stripe.component.html',
            styleUrls: ['./stripe.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            index_1.OrganizeService])
    ], StripeComponent);
    return StripeComponent;
}());
exports.StripeComponent = StripeComponent;
//# sourceMappingURL=stripe.component.js.map