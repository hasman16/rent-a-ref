//embed.plnkr.co/AuFMJVHpk9OaLr62puS1
import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  EventEmitter
} from '@angular/core';

import { ModalService } from './modal.service';
import { ModalState } from './modal';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'rar-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input('name') modalName: string = '';
  @Input() closable = true;
  @Input() visible: boolean = false;
  @Input() backText: string = '';
  @Input() cancelText: string = 'Cancel';
  @Input() disableSubmit: boolean = false;
  @Input() submitText: string = 'Submit';
  @Input() title: string;

  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() back: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() submit: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() cancel: EventEmitter<boolean> = new EventEmitter<boolean>();
  private subscription: Subscription[] = [];

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.subscription.push(
      this.modalService.modalState$.subscribe((modalState: ModalState) => {
        if (modalState && modalState.show === true) {
          this.showModal(null);
        } else {
          this.closeModal(null);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((sub: Subscription) => sub.unsubscribe());
  }

  public backModal($event) {
    this.back.emit(true);
  }

  public closeModal($event) {
    this.cancel.emit(true);
    this.hideModal(null);
  }

  public submitModal($event) {
    this.submit.emit(true);
  }

  public hideModal($event) {
    this.updateVisibility(false);
  }

  public showModal($event) {
    this.updateVisibility(true);
  }

  protected updateVisibility(state: boolean): void {
    this.visible = state;
    this.visibleChange.emit(this.visible);
  }
}
