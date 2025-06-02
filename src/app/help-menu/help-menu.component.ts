import { Component, input, Input, output } from '@angular/core';

@Component({
  selector: 'app-help-menu',
  imports: [],
  templateUrl: './help-menu.component.html',
  styleUrl: './help-menu.component.css',
})
export class HelpMenuComponent {
  description = input<string[]>();
  rules = input<string[]>();
  helpMenuWidth = input<string>();
  closeHelpMenuEvent = output();

  closeHelpMenu() {
    this.closeHelpMenuEvent.emit();
  }
}
