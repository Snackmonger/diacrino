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
      }
      @empty {
        <p>Error loading languages!</p>
      }
    </select>

  </section>

  <!--TODO: Design simple SVG logo for the application.-->
  <section class="title">
    <p>{{ title() }}</p>
  </section>

  <section class="help-button" (click)="onClickHelpButton()">
    <p class="circle">
      ?
    </p>
  </section>
  
</header>
`,
  styles: `
  header {
    height: 10vh;
    width: 100%;

    position: relative;
    top: 0;

    padding: 0rem 0.5rem;

    display: flex;
    flex-direction: row;
    align-items: center;

    font-family: Verdana, Geneva, Tahoma, sans-serif;
    color: white;

    background-image: var(--brand-color);

    border-bottom-style: solid;
    border-bottom-width: 0.35rem;
    border-bottom-color: var(--color2);
  }

  .language-selector,
  .title,
  .help-button {
    width: 33vw;
  }

  .title {
    text-align: center;
    font-size: 3.5vh;
  }

  .help-button {
    display: flex;
    padding-right: 1rem;
    justify-content: right;
    cursor: pointer;
    font-size: 5vh;
  }

  .circle {
      display: block;
      border-color: white;
      border-style: solid;
      color: #fff;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      line-height: 32px;
      font-size: 3.5vh;
      text-align: center;
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
    this.selectionChangeEvent.emit((event.target as HTMLSelectElement).value)
  }
}
