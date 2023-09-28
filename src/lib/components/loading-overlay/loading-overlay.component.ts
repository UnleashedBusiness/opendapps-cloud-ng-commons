import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-overlay-spinner',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss']
})
export class LoadingOverlayComponent implements OnInit {
  @Input() text?: string;
  @Input() bgOpacity = 1;
  constructor() { }

  ngOnInit() {
    if (this.text === undefined)
      this.text = 'Please, wait while we execute your request...';
  }
}
