import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading.component.html'
})
export class LoadingComponent implements OnInit {
  @Input() text?: string;
  constructor() { }

  ngOnInit() {
    if (this.text === undefined)
      this.text = 'Please, wait while we execute your request...';
  }

}
