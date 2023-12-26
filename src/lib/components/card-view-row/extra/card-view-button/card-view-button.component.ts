import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {IconProp} from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-card-view-button',
  template: ''
})
export class CardViewButtonComponent implements OnInit {
  @Input() classText = '';
  @Input() disabled = false;
  @Input() title = '';
  @Input() icon?: IconProp = undefined;
  @Output() onClick = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
