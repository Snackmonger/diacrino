import { Component, EventEmitter, input, output, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  selectorOptions = input<string[]>();
  title = input<string>();
  openHelpMenuEvent = output();

  openHelpMenu() {
    this.openHelpMenuEvent.emit();
  }

  changeSelection() {
    // Selector event goes here.
  }
}
