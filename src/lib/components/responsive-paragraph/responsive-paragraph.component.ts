import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-responsive-paragraph',
  templateUrl: './responsive-paragraph.component.html'
})
export class ResponsiveParagraphComponent {
  @Input() classText = '';
  @Input() text = '';
  @Input() largeClasses = '';
  @Input() smallClasses = '';
  @Input() element = 'p';

  public get content(): string {
    return `<${this.element} class="d-none d-lg-flex ${this.classText} ${this.largeClasses}">${this.text}</${this.element}>` +
      `<${this.element} class="d-flex d-lg-none ${this.classText} ${this.smallClasses}">${this.text}</${this.element}>\n`
  }
}
