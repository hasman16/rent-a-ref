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
var index_2 = require("../shared/crop-image-modal/index");
var _ = require("lodash");
require("rxjs/add/operator/combineLatest");
require("rxjs/add/operator/switchMap");
var OrganizeComponent = /** @class */ (function () {
    function OrganizeComponent(cd, auth, toast, route, router, statesService, organizeService, cropImageModalService) {
        this.cd = cd;
        this.auth = auth;
        this.toast = toast;
        this.route = route;
        this.router = router;
        this.statesService = statesService;
        this.organizeService = organizeService;
        this.cropImageModalService = cropImageModalService;
        this.subscriptions = [];
        this.currentModel = {};
        this.titles = ['Organization Name', '', ''];
        this.heading = 'You have no <i>organizations</i>.';
        this.organizations = [];
        this.isLoading = false;
        this.isEditing = false;
        this.showDialog = false;
        this.defaultImage = 'assets/images/ball.png';
    }
    Object.defineProperty(OrganizeComponent.prototype, "country", {
        set: function (aCountry) {
            this.countryName = aCountry || 'usa';
        },
        enumerable: true,
        configurable: true
    });
    OrganizeComponent.prototype.ngOnInit = function () {
        var _this = this;
        var organizations = this.route.snapshot.data
            .organizations;
        this.organizations = _.isArray(organizations) ? organizations : [];
        this.setOrganizeMode();
        this.subscriptions.push(this.cropImageModalService.cropImageSubject$.subscribe(function (cropImageState) {
            if (cropImageState.uploadState === index_2.UploadState.Success) {
                _this.getOrganizations();
            }
            _this.cd.markForCheck();
        }));
    };
    OrganizeComponent.prototype.ngOnDestroy = function () {
        this.subscriptions.forEach(function (s) { return s.unsubscribe(); });
    };
    OrganizeComponent.prototype.getImageAddress = function (organization) {
        var url = _.get(organization, 'images[0].location', '');
        return url;
    };
    OrganizeComponent.prototype.openModal = function (organization) {
        this.destination = "/api/upload_logo/" + organization.id;
        this.cropImageModalService.show();
    };
    OrganizeComponent.prototype.closeModal = function ($event) {
        console.log('close modal');
        this.cropImageModalService.hide();
    };
    OrganizeComponent.prototype.setOrganizeMode = function () {
        this.currentModel = {};
        this.isEditing = false;
        this.setHeadingTitle();
    };
    OrganizeComponent.prototype.setEditMode = function (model) {
        this.currentModel = _.cloneDeep(model);
        this.isEditing = true;
        this.setHeadingTitle();
    };
    OrganizeComponent.prototype.modelHasId = function (model) {
        return _.has(model, 'id') && Number(model.id) > 0;
    };
    OrganizeComponent.prototype.getSubmitText = function (hasId) {
        return hasId ? 'Update Organization' : 'Create Organization';
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
        var currentModel = _.find(this.organizations, function (organization) { return organization.id == orgId; });
        if (currentModel) {
            this.organizeService
                .getOrgAddresses(orgId)
                .combineLatest(this.organizeService.getOrgPhones(orgId))
                .take(1)
                .map(function (_a) {
                var addresses = _a[0], phones = _a[1];
                return [_.head(addresses), _.head(phones)];
            })
                .map(function (_a) {
                var addresses = _a[0], phones = _a[1];
                return [addresses['addresses'], phones['phones']];
            })
                .subscribe(function (_a) {
                var addresses = _a[0], phones = _a[1];
                currentModel = _.cloneDeep(currentModel);
                currentModel = Object.assign({}, currentModel, {
                    addresses: addresses,
                    phones: phones
                });
                _this.setEditMode(currentModel);
                _this.cd.markForCheck();
            });
        }
    };
    OrganizeComponent.prototype.editEvents = function (organization_id) {
        this.router.navigate(["/organization/" + organization_id + "/events/"]);
    };
    OrganizeComponent.prototype.getOrganizations = function (user_id) {
        var _this = this;
        var currentUser = this.auth.getCurrentUser();
        user_id = user_id || currentUser.id;
        this.organizeService.getUserOrganization(user_id).subscribe(function (profile) {
            _this.organizations = profile.organizations;
        }, function (err) { return _this.callFailure(err); }, function () {
            _this.setOrganizeMode();
            _this.isLoading = false;
            if (_this.organizations.length === 0) {
                _this.setOrganizeMode();
            }
            _this.cd.markForCheck();
        });
    };
    OrganizeComponent.prototype.submitOrganization = function (model) {
        if (_.isNil(model.id) || !model.id) {
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
        }, function (err) { return _this.callFailure(err); }, function () {
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
        return _(newItems)
            .filter(function (newItem) {
            var item = _.find(oldItems, function (oldItem) { return oldItem.id === newItem.id; });
            return item ? true : false;
        })
            .filter(function (item) { return !_.isNil(item.id); })
            .value();
    };
    OrganizeComponent.prototype.deletedPhones = function (newPhones, oldPhones) {
        return this.deleteItems(newPhones, oldPhones);
    };
    OrganizeComponent.prototype.deletedAddresses = function (newAddresses, oldAddresses) {
        return this.deleteItems(newAddresses, oldAddresses);
    };
    OrganizeComponent.prototype.deleteItems = function (newItems, oldItems) {
        return _(newItems)
            .filter(function (newItem) {
            return !_.some(oldItems, function (oldItem) {
                return oldItem.id === newItem.id;
            });
        })
            .filter(function (item) { return !_.isNil(item.id); })
            .value();
    };
    OrganizeComponent.prototype.submitUpdateOrganization = function (model) {
        var _this = this;
        var newPhones = _.filter(model.phones, function (phone) {
            return _.isNil(phone.id);
        });
        var newAddresses = _.filter(model.addresses, function (address) { return _.isNil(address.id); });
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
        }, function (err) { return _this.callFailure(err); }, function () {
            _this.getOrganizations();
        });
    };
    OrganizeComponent.prototype.callFailure = function (err, message) {
        if (message === void 0) { message = 'An error occurred'; }
        if (err.error instanceof Error) {
            this.toast.setMessage(message, 'danger');
        }
        else {
            this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
        }
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], OrganizeComponent.prototype, "country", null);
    OrganizeComponent = __decorate([
        core_1.Component({
            selector: 'rar-organize',
            templateUrl: './organize.component.html',
            styleUrls: ['./organize.component.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }),
        __metadata("design:paramtypes", [core_1.ChangeDetectorRef,
            index_1.AuthService,
            toast_component_1.ToastComponent,
            router_1.ActivatedRoute,
            router_1.Router,
            index_1.StatesService,
            index_1.OrganizeService,
            index_2.CropImageModalService])
    ], OrganizeComponent);
    return OrganizeComponent;
}());
exports.OrganizeComponent = OrganizeComponent;
//# sourceMappingURL=organize.component.js.map