import { Component, Input } from "@angular/core";

@Component({
  selector: 'app-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent {
  @Input() bgOpacity = 1;
  @Input() minHeight = 400;
}
