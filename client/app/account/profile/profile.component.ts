import {
	ChangeDetectorRef,
	ChangeDetectionStrategy,
	Component,
	OnInit
} from '@angular/core';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';
import {
	FormGroup,
	FormControl,
	Validators,
	FormBuilder,
	EmailValidator
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import {
	AuthService,
	CanComponentDeactivate,
	ProfileService,
	UserService
} from '../../services/index';

import { ToastComponent } from '../../shared/toast/toast.component';
//Models
import {
	Address,
	Person,
	Phone,
	Profile,
	User
} from './../../shared/models/index';
import {
	CropImageModalService,
	CropImageState,
	UploadState
} from './../../shared/crop-image-modal/index';
import { Observable, Subscription } from 'rxjs';
import * as _ from 'lodash';
import * as moment from 'moment';

// End
@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit, CanComponentDeactivate {
	private subscriptions: Subscription[] = [];
	protected data: Profile = <Profile>{};
	public user: User = <User>{};
	protected person: Person = <Person>{};

	public addresses: Address[];
	protected dummyAddress: Address = <Address>{};
	public phones: Phone[];
	protected dummyPhone: Phone = <Phone>{};
	protected available: any = {};
	public isLoading: boolean = true;
	protected allowEdit: boolean = false;
	protected middlenameFlag: boolean = false;

	protected abort: boolean = false;
	public editBio: boolean = false;
	public editPassword: boolean = false;

	public editPhone: boolean = false;
	public currentPhone: number = 0;

	public editAddress: boolean = false;
	public currentAddress: number = 0;

	protected birthday: string = '';
	public defaultImage: string = 'assets/images/avatar2.png';
	public destination: string;

	constructor(
		private cd: ChangeDetectorRef,
		private route: ActivatedRoute,
		private router: Router,
		private auth: AuthService,
		private profileService: ProfileService,
		private userService: UserService,
		private cropImageModalService: CropImageModalService
	) {
		this.addresses = [];
		this.phones = [];
	}

	ngOnInit() {
		this.getProfile();
		this.subscriptions.push(
			this.cropImageModalService.cropImageSubject$.subscribe(
				(cropImageState: CropImageState) => {
					if (cropImageState.uploadState === UploadState.Success) {
						this.getProfile();
					}
					this.cd.markForCheck();
				}
			)
		);
	}

	ngOnDestroy() {
		this.subscriptions.forEach((s: Subscription) => s.unsubscribe());
	}
	private setClassValue(value): any {
		let cssClasses = {
			'btn-success': false,
			'btn-warning': false,
			'btn-danger': false
		};
		if (value === 'active') {
			cssClasses['btn-success'] = true;
		} else if (value === 'pending') {
			cssClasses['btn-warning'] = true;
		} else {
			cssClasses['btn-danger'] = true;
		}
		return cssClasses;
	}

	public setCanOrganizeClass(): any {
		return this.setClassValue(this.user.can_organize);
	}

	public setCanRefereeClass(): any {
		return this.setClassValue(this.user.can_referee);
	}

	public setStatusClass(): any {
		return this.setClassValue(this.user.status);
	}

	public openModal(): void {
		const user = this.user;
		this.destination = `/api/upload_image/${user.id}`;
		this.cropImageModalService.show();
	}

	public closeModal($event): void {
		this.cropImageModalService.hide();
	}

	public canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
		if (!this.allowEdit) {
			return true;
		}
	}

	public getImageAddress(): string {
		let url = _.get(this.data, 'images[0].location', '');
		return url;
	}

	public getProfile() {
		const currentUser: User = this.auth.getCurrentUser();

		//this.isLoading = true;
		this.profileService.getProfile(currentUser.id).subscribe(
			(profile: Profile) => {
				this.data = profile;
				this.user = <User>{
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
				this.person = profile.person;
				this.addresses = _.sortBy(profile.addresses, 'id');
				this.phones = _.sortBy(profile.phones, 'id');
				this.birthday = moment(profile.person.dob).format('LL');
				if (JSON.stringify(profile.person.middlenames) !== 'null') {
					this.middlenameFlag = true;
				}
				this.isLoading = false;
				this.cd.markForCheck();
			},
			(err: HttpErrorResponse) => {
				this.isLoading = false;
				if (!this.auth.loggedIn) {
					this.abort = true;
					this.auth.logout();
				}
				this.cd.markForCheck();
			}
		);
	}

	public clearEdits() {
		this.editBio = false;
		this.editPassword = false;
		this.editAddress = false;
		this.editPhone = false;
		this.isLoading = false;
	}

	public setEditAddress(id: number = 0, value: boolean = false) {
		this.clearEdits();
		this.currentAddress = id;
		this.editAddress = value;
	}

	public setEditBio(value: boolean = false) {
		this.clearEdits();
		this.editBio = value;
	}

	public setEditPassword(value: boolean = false) {
		this.clearEdits();
		this.editPassword = value;
	}

	public setEditPhone(id: number = 0, value: boolean = false) {
		this.clearEdits();
		this.currentPhone = id;
		this.editPhone = value;
	}

	public onAddressSubmit(res) {
		this.onFormSave(res);
	}

	public onBioSubmit(res) {
		this.onFormSave(res);
	}

	public onPasswordSubmit(res) {
		this.onFormSave(res);
	}

	public onPhoneSubmit(res) {
		this.onFormSave(res);
	}

	public onFormSave(res: any) {
		if (res.action === 'show_overlay') {
			this.isLoading = true;
		} else if (res.action === 'save_success') {
			this.onFormCancel(false);
			this.getProfile();
		} else if (res.action === 'save_failure') {
			this.isLoading = false;
		} else {
			this.onFormCancel(false);
		}
		this.cd.markForCheck();
	}

	public onFormCancel(value) {
		this.clearEdits();
	}
}
