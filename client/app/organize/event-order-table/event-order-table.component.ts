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
        kids_ref_total: model.kids_ref_pay * model.kids_referees,
        teens_ref_total: model.teens_ref_pay * model.teens_referees,
        adults_ref_total: model.adults_ref_pay * model.adults_referees
      },
      model
    );
    this.model.total =
      this.model.kids_ref_total +
      this.model.teens_ref_total +
      this.model.adults_ref_total;
    this.cd.markForCheck();
  }
  public model: any;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}
}
