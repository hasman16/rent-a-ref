import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'formly-horizontal-textarea-type',
  template: `<div class="row" style="text-align:right;">
      <label attr.for="{{key}}" class="col-4 form-control-label" style="padding-top: 6px;">{{ to.label }}</label>
      <div class="col">
        <ng-template #fieldComponent></ng-template>
      </div>
    </div>`,
})
export class FormlyHorizontalTextAreaWrapper extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef }) fieldComponent: ViewContainerRef;
}
