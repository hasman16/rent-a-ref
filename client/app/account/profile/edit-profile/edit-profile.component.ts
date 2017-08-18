import { Component, OnInit } from '@angular/core';
import { ToastComponent } from '../../../shared/toast/toast.component';
import { AuthService } from '../../../services/auth.service';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, EmailValidator } from '@angular/forms';
import * as $ from 'jquery';
// import 'jquery-ui';
// import { DatepickerPopupComponent } from '../../../shared/datepicker-popup/datepicker-popup.component';
import { NgbDatepickerModule } from '../../../shared/ngBootstrap/datepicker/datepicker.module';
import * as moment from 'moment';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
/*
  public dt: Date = new Date();
  public minDate: Date = void 0;
  public events: any[];
  public tomorrow: Date;
  public afterTomorrow: Date;
  public dateDisabled: { date: Date, mode: string }[];
  public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
    'shortDate'];
  public format: string = this.formats[0];
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };
  private opened = false;
*/
  paypalFlag = false;
  checkFlag = false;
  ccFlag = false;
  paypal = '';

  user = {};
  isLoading = true;
  model;
  constructor(private auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService) {
    /*
    (this.tomorrow = new Date()).setDate(this.tomorrow.getDate() + 1);
    (this.afterTomorrow = new Date()).setDate(this.tomorrow.getDate() + 2);
    (this.minDate = new Date()).setDate(this.minDate.getDate() - 1000);
    (this.dateDisabled = []);
    this.events = [
      { date: this.tomorrow, status: 'full' },
      { date: this.afterTomorrow, status: 'partially' }
    ];*/
/*
    $(function () {
      const bindDatePicker = function () {
        $("#datetimepicker1").datetimepicker({
          format: 'YYYY-MM-DD',
          icons: {
            time: 'fa fa-clock-o',
            date: 'fa fa-calendar',
            up: 'fa fa-arrow-up',
            down: 'fa fa-arrow-down'
          }
        }).find('input:first').on('blur', function () {
          console.log('Calendar test');
          // check if the date is correct. We can accept dd-mm-yyyy and yyyy-mm-dd.
          // update the format if it's yyyy-mm-dd
          let date: any = parseDate($(this).val());

          if (!isValidDate(date, '')) {
            // create date based on momentjs (we have that)
            date = moment().format('YYYY-MM-DD');
          }

          $(this).val(date);
          });

      }

      const isValidDate = function (value, format) {
        format = format || false;
        // lets parse the date to the best of our knowledge
        if (format) {
          value = parseDate(value);
        }

        const timestamp = Date.parse(value);

        return isNaN(timestamp) === false;
      }

      const parseDate = function (value) {
        const m = value.match(/^(\d{1,2})(\/|-)?(\d{1,2})(\/|-)?(\d{4})$/);
        if (m) {
          value = m[5] + '-' + ('00' + m[3]).slice(-2) + '-' + ('00' + m[1]).slice(-2);
        }
        return value;
      }

      bindDatePicker();
    });*/
    }
  /*calendarLoad() {
    $('#datepicker').datepicker({
      uiLibrary: 'bootstrap4',
      iconsLibrary: 'fontawesome'
    });
    console.log('Calender test');
  }*/
  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userService.getUser(this.auth.currentUser.id).subscribe(
      data => this.user = data,
      error => console.log('Get user error: ', error),
      () => this.isLoading = false
    );
  }

  save(user) {
    this.userService.editUser(user).subscribe(
      res => this.toast.setMessage('account settings saved!', 'success'),
      error => console.log(error)
    );
  }
/*
  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }

  public today(): void {
    this.dt = new Date();
  }

  public d20090824(): void {
    this.dt = new Date(2009, 7, 24);
  }

  public disableTomorrow(): void {
    this.dateDisabled = [{ date: this.tomorrow, mode: 'day' }];
  }

  // todo: implement custom class cases
  public getDayClass(date: any, mode: string): string {
    if (mode === 'day') {
      const dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (const event of this.events) {
        const currentDay = new Date(event.date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return event.status;
        }
      }
    }

    return '';
  }

  public disabled(date: Date, mode: string): boolean {
    return (mode === 'day' && (date.getDay() === 0 || date.getDay() === 6));
  }

  public open(): void {
    this.opened = !this.opened;
  }

  public clear(): void {
    this.dt = void 0;
    this.dateDisabled = undefined;
  }

  public toggleMin(): void {
    this.dt = new Date(this.minDate.valueOf());
  }
*/
}

