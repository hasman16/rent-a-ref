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
        kids_games_total: 0,
        teen_games_total: 0,
        adult_games_total: 0
      },
      model
    );
    this.update();
  }

  public model: any;
  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {}

  update(): void {
    const model = this.model;
    model.kids_games_total = model.kids_game_price * model.kids_games;
    model.teen_games_total = model.teen_game_price * model.teen_games;
    model.adult_games_total = model.adult_game_price * model.adult_games;

    model.total =
      model.kids_games_total + model.teen_games_total + model.adult_games_total;
    console.log('total:', model.total, model);
    this.cd.markForCheck();
  }
}
