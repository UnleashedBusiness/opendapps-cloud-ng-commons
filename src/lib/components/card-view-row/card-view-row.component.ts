import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import { CardViewButtonComponent } from './extra/card-view-button/card-view-button.component';

@Component({
  selector: 'app-card-view-row',
  templateUrl: './card-view-row.component.html',
})
export class CardViewRowComponent implements OnInit {
  @Input() classText: string = '';
  @Input() displayTitle: string = '';
  @Input() tooltipText: string = '';
  @Input() justified = false;
  @Input() small = true;
  @Input() multiline = false;

  @ContentChildren(CardViewButtonComponent) buttons!: QueryList<CardViewButtonComponent>;

  constructor() {}

  ngOnInit(): void {}

  protected readonly undefined = undefined;
}
