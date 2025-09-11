import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  template: `
    <header>
      <section class="language-selector">
        <select (change)="onSelectionChange($event)">
          @for (language of selectorOptions(); track language) {
          <option value="{{ language }}">{{ language }}</option>
          } @empty {
          <p>Error loading languages!</p>
          }
        </select>
      </section>

      <!--TODO: Design simple SVG logo for the application.-->
      <section class="title">
        <img src="./assets/images/logos/diacrino/mockup_logo.svg" alt="">
      </section>
    </header>
  `,
  styles: `

      .title {
        height: 100%;
      }
      .language-selector {
        padding-left: 2rem;
      }
  `,
})
export class HeaderComponent {
  selectorOptions = input<string[]>();
  title = input<string>();
  openHelpMenuEvent = output();
  selectionChangeEvent = output<string>();

  onClickHelpButton() {
    this.openHelpMenuEvent.emit();
  }

  onSelectionChange(event: Event) {
    this.selectionChangeEvent.emit((event.target as HTMLSelectElement).value);
  }
}
