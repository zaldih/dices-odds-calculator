import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent {
  @Input() value: number = 1;
  color: string = 'dark';

  get diceUrl(): string {
    return `assets/dice/dice-${this.value}-${this.color}.svg`;
  }
}
