import { Component, Input } from "@angular/core";
import { type IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-offscreen-menu-button',
  templateUrl: './offscreen-menu-button.component.html',
  styleUrls: ['./offscreen-menu-button.component.scss']
})
export class OffscreenMenuButtonComponent {
  @Input() link?: string;
  @Input() dropDownTarget?: string;
  @Input() disabled = false;
  @Input() selected = true;
  @Input() text = '';
  @Input() icon?: IconProp;
  @Input() hasRedDot = false;
  @Input() isNew = false;
}
