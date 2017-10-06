import { Component, OnInit, ViewChild  } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, AbstractControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import * as moment from 'moment';
import { ToastComponent } from '../shared/toast/toast.component';
import { AuthService } from '../services/auth.service';
import { StatesService } from '../services/states.service';
import { UserService } from '../services/user.service';
import { OrganizeService } from '../services/organize.service';
import { MyDatePickerModule, IMyDpOptions, IMyDateModel } from 'mydatepicker';
import { DataTable, DataTableTranslations, DataTableResource } from 'angular-4-data-table';
import { films } from './organize-data';
/*"angular-2-data-table": "^0.1.2", */
@Component({
  selector: 'app-organize',
  templateUrl: './organize.component.html',
  styleUrls: ['./organize.component.scss']
})
export class OrganizeComponent implements OnInit {
  // Datadable start
  filmResource = new DataTableResource(films);
  films = [];
  filmCount = 0;
  update: any = 'update';
  create: any = 'create';
  view: any = 'view';
  @ViewChild(DataTable) filmsTable;
  // special params:

  translations = <DataTableTranslations>{
    indexColumn: 'Index column',
    expandColumn: 'Expand column',
    selectColumn: 'Select column',
    paginationLimit: 'Max results',
    paginationRange: 'Result range'
  };
// Datatable end
  organizeFlag = false;
  states;
  selectedValue;
  abort = false;
  alphaNumericRegex: '[a-zA-Z0-9_-\\s]*';
  userDatas = { id: '', name: '' };
  userData;
  orgDataPhones = { id: '', name: '' };
  
  showDivOrg_name = true;
  saveFlag = false;

  public myDatePickerOptions: IMyDpOptions = {
    // other options...
    dateFormat: 'yyyy-mm-dd',
  };
  public dateModel;

  organizationForm: FormGroup;
  organizationUpdateForm: FormGroup;
  organizationViewForm: FormGroup;
  org_name = new FormControl('', [Validators.required, Validators.minLength(2),
  Validators.maxLength(90), Validators.pattern(this.alphaNumericRegex)]);

  onDateChanged(event: IMyDateModel) {
    console.log('onDateChanged(): ', event.date,
      ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(), ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
  }


  constructor(private formBuilder: FormBuilder, private auth: AuthService,
    public toast: ToastComponent, private userService: UserService, private route: ActivatedRoute,
    private router: Router, private statesService: StatesService, private organizeService: OrganizeService) {
    this.subscribeToParams(route);
    this.filmResource.count().then(count => this.filmCount = count);
  }

  subscribeToParams(route) {
    this.organizationForm = this.formBuilder.group({
      org_name: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(90), Validators.pattern(this.alphaNumericRegex)]]
    });
    // Update
    this.organizationUpdateForm = this.formBuilder.group({
      org_name: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(90), Validators.pattern(this.alphaNumericRegex)]]
    });
    // View
    this.organizationViewForm = this.formBuilder.group({
      org_name: ['', [Validators.required, Validators.minLength(2),
      Validators.maxLength(90), Validators.pattern(this.alphaNumericRegex)]]
    });

    route.queryParams.subscribe(
      data => {
        this.userData = this.organizeService.fetchOrganization(this.auth.currentUser.id);
        this.org_name = this.userData;
        this.userDatas = {id: this.userData.id, name: this.userData.name};
        console.log('userData: ', this.userData);

      });
  }

  // Datatable start
  reloadFilms(params) {
    this.filmResource.query(params).then(films => this.films = films);
  }

  cellColor(car) {
    return 'rgb(255, 255,' + (155 + Math.floor(100 - ((car.rating - 8.7) / 1.3) * 100)) + ')';
  }
// Datatable end

  ngOnInit() {
    /*console.log('onInit: call createOrganization:', this.organizationForm.value);
    this.organizationForm.setValue({
      org_name: 'Testing testing'
    });
    this.createOrganization();*/
  }

  getOrgValue() {
    const org = this.organizationForm.value;
    return { name: org.org_name };

  }

  createOrganization() {
    this.userService.createOrganization(this.getOrgValue()).subscribe(
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      }
    );
    if (this.saveFlag) {
      this.showDivOrg_name = false;
      // Reload the page
      this.router.navigate(['organizer', this.auth.currentUser.id], { relativeTo: this.route, queryParamsHandling: 'preserve' });
    }
  }

  updateOrganization() {
    /*

    this.userService.updateOrganization(this.organizationUpdateForm.value, this.userData.id).subscribe(
*/
    this.userService.updateOrganization(this.getOrgValue(), this.userData.id).subscribe(

      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      }
    );
  }
/*
  getOrganizations() {
    this.userService.getOrganization(this.auth.currentUser.id).subscribe(
      // data => this.users = data,
      // error => console.log(error),
      // () => this.isLoading = false
      res => this.callSuccess(res),
      (err: HttpErrorResponse) => {
        this.callFailure(err);
      }
    );
  }
*/
  callSuccess(res) {
    this.org_name = res;
    console.log('callSuccess: ' + res + ' name: ' + res.name);
    this.toast.setMessage(res.message, 'success');
    // this.onCancel();
    this.saveFlag = true;
  }

  callFailure(err: HttpErrorResponse, message = 'Update failed, Please try again') {
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      this.toast.setMessage(message, 'danger');
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      this.toast.setMessage('An error occurred:' + err.statusText, 'danger');
    }

    // this.resetDivs();
  }
  setClassName() {
    return { 'has-danger': !this.org_name.pristine && !this.org_name.valid };
  }
}
