import { Component, input, output } from '@angular/core';
import { Language } from '../language';

@Component({
  selector: 'app-main-activity',
  imports: [],
  template: `
  <main>
      <textarea
        class="activity-input"
        [placeholder]="currentLanguage()!.demoText"
        (keyup)="onKeyPress($event)"
      ></textarea>

      <textarea
        class="activity-output"
        [placeholder]="currentLanguage()!.convert(currentLanguage()!.demoText)"
        readonly
        [value]="outputText()"
      ></textarea>
</main>
`,
  styles: `
  
`
})
export class MainActivityComponent {
  currentLanguage = input<Language>();

  inputText = output<string>();
  outputText = input<string>(); 

  onKeyPress(keyPress: KeyboardEvent) {
    this.inputText.emit((keyPress.target as HTMLTextAreaElement).value);
  }

}
