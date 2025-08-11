import { Component } from '@angular/core';
import { Language, LANGUAGES } from './language';
import { HeaderComponent } from "./header/header.component";
import { HelpMenuComponent } from "./help_menu/help-menu.component";
import { FooterComponent } from "./footer/footer.component";
import { MainActivityComponent } from "./main_activity/main-activity.component";
import { imageLinkData } from './app-data';

@Component({
  selector: 'app-root',
  imports: [
    HeaderComponent,
    HelpMenuComponent,
    FooterComponent,
    MainActivityComponent
  ],
  template: `
  <app-help-menu
    [language]="currentLanguage"
    [isOpen]="isHelpMenuOpen"
    (closeHelpMenuEvent)="closeHelpMenu()"
  ></app-help-menu>

  <app-header
    [selectorOptions]="languageIdentifiers"
    title="Diacrínō"
    (openHelpMenuEvent)="openHelpMenu()"
    (selectionChangeEvent)="changeLanguage($event)"
  ></app-header>

  <app-main-activity
    [currentLanguage]="currentLanguage"
    [outputText]="convertedText"
    (inputText)="convertText($event)"
  ></app-main-activity>

  <app-footer
    [sponsorImages]="sponsorImages"
    [socialImages]="socialImages"
  ></app-footer>
  `,
  styles: `
  @font-face {
  font-family: "NewAthena";
  src: url("/assets/fonts/newathu5_8.woff");
}
`
})
export class AppComponent {

  isHelpMenuOpen: boolean = false;
  languageIdentifiers: string[] = LANGUAGES.map(it => it.name);
  currentLanguage: Language;

  sponsorImages = imageLinkData[0];
  socialImages = imageLinkData[1];

  unconvertedText: string = "";
  convertedText: string = "";

  constructor() {
    this.currentLanguage = LANGUAGES[0];
  }

  /**
   * Change the active language of the application.
   * 
   * @param language  The language to change to.
   * 
   * Note: After changing language, the previous input text is automatically
   * converted to the new language.
   */
  changeLanguage(language: string) {
    for (let lang of LANGUAGES) {
      if (language == lang.name) {
        this.currentLanguage = lang;
      }
    }
    // Refresh the output
    this.convertText(this.unconvertedText);
  }

  /**
   * Convert text using the current converter.
   * 
   * @param text The text to convert.
   * 
   * Converted text is bound to the output textbox in the main activity. 
   */
  convertText(text: string) {
    this.unconvertedText = text;
    this.convertedText = this.currentLanguage.convert(text);
  }


  /**
   * Display the help menu.
   */
  openHelpMenu() {
    this.isHelpMenuOpen = true;
    document.body.style.overflow = "hidden";
  }

  /**
   * Hide the help menu.
   */
  closeHelpMenu() {
    this.isHelpMenuOpen = false;
    document.body.style.overflow = "auto";
  }

}
