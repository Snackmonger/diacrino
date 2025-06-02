import { Component } from '@angular/core';
import { choice } from '../utils';
import { Language, languages } from './language';
import { HeaderComponent } from "./header/header.component";
import { HelpMenuComponent } from "./help-menu/help-menu.component";

@Component({
  selector: 'app-root',
  imports: [HeaderComponent, HelpMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  helpMenuWidth: string = "0";
  languageIdentifiers: string[] = languages.map(it => it.name)

  currentLanguage: Language
  inputText: string = "";
  outputText: string = "";

  constructor() {
    this.currentLanguage = choice(languages);
    console.log(`Selected ${ this.currentLanguage.name }`)
  }

  /**
   * Convert the text entered by the user and insert it into 
   * the output area.
   * @param keyPressEvent   The event associated with this callback,
   *                        namely any key press.
   */
  convertText(keyPressEvent: KeyboardEvent){
    this.outputText = this.currentLanguage.convert(
      (keyPressEvent.target as HTMLTextAreaElement).value
    );
  }

  /**
   * Change the active language of the application.
   * @param language        The language to change to.
   */
  changeLanguage(language: string) {
    for (let lang of languages) {
      if (language == lang.name) {
        this.currentLanguage = lang;
      }
    }
  }

  /**
   * Display the help menu.
   */
  openHelpMenu() {
    console.log("Called main app OPEN")
    this.helpMenuWidth = "100%";
  }

  /**
   * Hide the help menu.
   */
  closeHelpMenu() {
    console.log("Called main app CLOSE")
    this.helpMenuWidth = "0";
  }

}
