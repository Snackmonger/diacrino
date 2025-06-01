import { Component } from '@angular/core';
import { choice } from '../utils';
import { Language, languages } from './language';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Diacrínō';
  navWidth: string = "0";

  currentLanguage: Language
  inputText: string = "";
  outputText: string = "";


  constructor() {
    this.currentLanguage = choice(languages);
    console.log(`Selected ${this.currentLanguage.name}`)
  }

  convertText(event: KeyboardEvent){
    this.outputText = this.currentLanguage.convert(
      (event.target as HTMLTextAreaElement).value
    );
    console.log(this.inputText, this.outputText)
  }

  changeLanguage(language: string) {
    for (let lang of languages) {
      if (language == lang.name) {
        this.currentLanguage = lang;
      }
    }
  }

  openNav() {
    this.navWidth = "100%";
  }
  closeNav() {
    this.navWidth = "0";
  }
}
