import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-hbox',
  templateUrl: './hbox.component.html'
})
export class HBoxComponent implements OnInit {
  @Input() classText: string = '';
  @Input() allowResponsive: boolean = false;
  @Input() multiline: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
