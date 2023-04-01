import { Component, Input } from '@angular/core';
import { Dice } from './dice.model';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrls: ['./dice.component.scss'],
})
export class DiceComponent {
  @Input() dice: Dice = new Dice();
  color: string = 'dark';

  get diceUrl(): string {
    return `assets/dices/dice-${this.dice.value}-${this.color}.svg`;
  }
}
