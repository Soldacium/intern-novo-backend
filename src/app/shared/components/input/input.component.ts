import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  @Input() placeholder = '';
  @Input() label = '';
  @Input() type: 'text'|'number'|'email'|'password'|'datetime-local' = 'text';
  @Input() darkMode = false;
  @Input() textColor = 'black';

  @Input() inputModel!: string;
  @Output() inputModelChange = new EventEmitter<string>();

}
