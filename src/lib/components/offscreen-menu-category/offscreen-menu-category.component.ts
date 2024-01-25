import { Component, Input } from "@angular/core";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-offscreen-menu-category',
  templateUrl: './offscreen-menu-category.component.html',
  styleUrls: ['./offscreen-menu-category.component.scss']
})
export class OffscreenMenuCategoryComponent {
  @Input() text!: string;
  @Input() icon?: IconProp;
}
