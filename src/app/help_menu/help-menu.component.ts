import { Component, input, Input, output } from '@angular/core';
import { Language } from '../language';

@Component({
  selector: 'app-help-menu',
  imports: [],
  template: `
  <section class="help-menu" [class.active]="isOpen()">
    <a 
    href="javascript:void(0)" 
    class="close-button" 
    (click)="closeHelpMenu()"
      >&times;</a
    >
    <section class="help-main-content">
      @for (line of getDescription(); track line) {
        <p>{{ line }}</p>
      }
      @empty {
        <p>Error loading help data</p>
      }
    </section>
  </section>
`,
  styles: `
  .help-menu {
    position: fixed;
    z-index: 999;
    
    left: -100%;
    top: 0;
    padding-top: 5vh;
    
    height: 100%;
    width: 100%;
    
    transition: left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94);
    
    background-color: #182848e9;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow-x: hidden;
  }
  .help-menu.active {
    left: 0;
  }
  .help-main-content {
    display: flex;
    flex-direction: column;
    height: 75vh;
    justify-content: center;
    padding: 0 5vw;
    font-size: 3vh;
  }

  .help-main-content p {
    margin-bottom: 1em;
  }

  .help-menu a {
    padding: 0.3rem 0.9rem 1rem 0.8rem;
    text-decoration: none;
    font-size: 1rem;
    color: beige;
    display: block;
    transition: 0.3s;
  }
  .help-menu a:hover {
    color: #f1f1f1;
  }
  .help-menu .close-button {
    position: absolute;
    top: 0;
    right: 1rem;
    font-weight: 900;
    font-size: 3rem;
  }
  @media screen and (max-height: 450px) {
    .help-menu {
      padding-top: 15px;
    }
    .help-menu a {
      font-size: 18px;
    }
  }
  @media (max-width: 640px) {
  .help-main-content {
    font-size: 1em;
    border-radius: 15px;
    background-color: beige;
  }
}
  .help-main-content {
    border-radius: 15px;
    background-color: beige;
  }
`,
})
export class HelpMenuComponent {
  language = input.required<Language>();

  closeHelpMenuEvent = output();
  isOpen = input<boolean>();

  getDescription() {
    return this.language().description
  }

  closeHelpMenu() {
    this.closeHelpMenuEvent.emit();
  }
}
