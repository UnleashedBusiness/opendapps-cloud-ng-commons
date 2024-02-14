import {Component, Input, type OnInit} from '@angular/core';

@Component({
  selector: 'app-successful-overlay',
  templateUrl: './successful-overlay.component.html',
  styleUrls: ['./successful-overlay.component.scss']
})
export class SuccessfulOverlayComponent implements OnInit {
  @Input() text?: string;
  @Input() buttons: OverlayButton[] = [];

  constructor() {
  }

  ngOnInit() {
    if (this.text === undefined)
      this.text = 'Transaction was successful...';
  }
}

export class OverlayButton {
  constructor(
    public actionLambda: (() => void) | undefined = undefined,
    public actionText: string = 'Continue',
    public action: string = '',
  ) {
  }
}
