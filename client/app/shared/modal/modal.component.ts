//embed.plnkr.co/AuFMJVHpk9OaLr62puS1
import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'rar-modal',
  templateUrl: '/modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)' }))
      ])
    ])
  ]
})
export class ModalComponent implements OnInit {
  @Input() closable = true;
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public show: boolean = true;

  constructor() {}

  ngOnInit() {}

  open() {}

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }
}
