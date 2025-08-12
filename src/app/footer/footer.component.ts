import { Component, input } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  template: `
    <footer>

     <section class="sponsor-logos">
      @for (sponsorImage of sponsorImages(); track sponsorImage[0]) {
      <a href="{{ sponsorImage[2] }}">
        <img src="{{ sponsorImage[0] }}" alt="{{ sponsorImage[1] }}">
      </a>
      }
    </section>

    <section class="socials">
      @for (socialImage of socialImages(); track socialImage[0]) {
        <a href="{{ socialImage[2] }}">
        <img src="{{ socialImage[0] }}" alt="{{ socialImage[1] }}">
      </a>
      }
    </section>
  </footer>`,
  styles: `
    footer {
      width: 100%;
      height: 10vh;

      position: relative;
      bottom: 0;

      padding: 0rem 0.5rem;
      border-top-style: solid;
      border-top-width: 0.35rem;
      border-top-color: var(--color2);

      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;

      background-image: var(--brand-color-reverse);
      font-family: Verdana, Geneva, Tahoma, sans-serif;
      color: white;
    }

  .sponsor-logos,
  .socials {
    width: 50vw;
    display: flex;
    gap: 1rem;
  }

  .sponsor-logos {
    flex-direction: row;
  }

  .socials {
    justify-content: right;
  }

  img {
    max-height: 5vh;
  }
`
})
export class FooterComponent {
  sponsorImages = input.required<string[][]>();
  socialImages = input.required<string[][]>();
}
