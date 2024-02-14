import {Component, EventEmitter, Input, type OnInit, Output} from '@angular/core';
import {type IconProp} from '@fortawesome/fontawesome-svg-core';

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

    constructor() {
    }

    ngOnInit(): void {
    }

}
