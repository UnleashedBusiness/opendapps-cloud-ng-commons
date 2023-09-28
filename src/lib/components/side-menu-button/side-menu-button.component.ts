import {Component, Input, OnInit} from '@angular/core';
import {IconProp} from "@fortawesome/fontawesome-svg-core";

@Component({
  selector: 'app-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrls: ['./side-menu-button.component.scss']
})
export class SideMenuButtonComponent implements OnInit {
  @Input() link = '';
  @Input() disabled = false;
  @Input() selected = true;
  @Input() text = '';
  @Input() icon?: IconProp;
  @Input() hasRedDot = false;
  @Input() isNew = false;

  constructor() { }

  ngOnInit(): void {
  }

}
