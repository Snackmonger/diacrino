import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: ` <footer>
    <section class="sponsor-logos">
      @for (sponsorImage of sponsorImages(); track sponsorImage[0]) {
      <a href="{{ sponsorImage[2] }}">
        <img src="{{ sponsorImage[0] }}" alt="{{ sponsorImage[1] }}" />
      </a>
      }
    </section>

    <section class="developer-logo">
      @for (socialImage of socialImages(); track socialImage[0]) {
      <a href="{{ socialImage[2] }}">
        <img src="{{ socialImage[0] }}" alt="{{ socialImage[1] }}" />
      </a>
      }
    </section>
  </footer>`,
  styles: `
      .sponsor-logos,
      .developer-logo {
        width: 50vw;
        height: 8vh;
        padding: 0 1rem;
        display: flex;
        flex-direction: row;
      }
      .developer-logo {
        justify-content: right;
      }
      .sponsor-logos img {
        width: 8vw;
      }
`,
})
export class FooterComponent {
  sponsorImages = input.required<string[][]>();
  socialImages = input.required<string[][]>();
}
