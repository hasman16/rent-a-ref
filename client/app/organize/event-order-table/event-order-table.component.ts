import {
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit
} from '@angular/core';

@Component({
  selector: 'event-order-table',
  templateUrl: './event-order-table.component.html',
  styleUrls: ['./event-order-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EventOrderTableComponent implements OnInit {
  @Input('model')
  set setModel(model: any) {
    this.model = Object.assign(
      {},
      {
        kids_ref_total: 0,
        teens_ref_total: 0,
        adults_ref_total: 0
      },
      model
    );
    this.update();
  }

  public inputKidsRefpay: boolean = false;
  public inputTeensRefpay: boolean = false;
  public inputAdultRefpay: boolean = false;
  public model: any;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  update(): void {
    const model = this.model;
    this.inputAdultRefpay = false;
    this.inputKidsRefpay = false;
    this.inputTeensRefpay = false;
    (model.kids_ref_total = model.kids_ref_pay * model.kids_referees),
      (model.teens_ref_total = model.teens_ref_pay * model.teens_referees),
      (model.adults_ref_total = model.adults_ref_pay * model.adults_referees);

    model.total =
      model.kids_ref_total + model.teens_ref_total + model.adults_ref_total;
    this.cd.markForCheck();
  }
}
