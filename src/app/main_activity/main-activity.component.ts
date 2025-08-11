import { Component, input, output } from '@angular/core';
import { Language } from '../language';

@Component({
  selector: 'app-main-activity',
  imports: [],
  template: `
  <section class="main-container">
    <section class="activity-area">
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
    </section>
  </section>
`,
  styles: `
  .main-container {
  display: flex;
  flex-direction: row;
  height: 80vh;
  justify-content: center;
  background-color: var(--color3);
}

.activity-area {
  height: 80vvh;
  width: 70vw;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color3);
}
textarea {
  resize: none;
  height: 100%;
  border: 0.25rem solid #ccc;
  padding: 1rem;
  border-radius: 1rem;
  font-size: 3vh;
}

textarea + textarea {
  margin-top: 1rem;
}


.activity-input {
  font-family: "Times New Roman", Times, serif;
}

.activity-output {
  font-family: "NewAthena";
}

@media (max-width: 960px) {
  .activity-area {
    width: 80vw;
  }
}

@media (max-width: 640px) {
  .activity-area {
    width: 100vw;
  }
  textarea {
    font-size: large;
  }
}
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
