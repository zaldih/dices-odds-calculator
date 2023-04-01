import { Component, Input } from '@angular/core';
import { Dice } from '../dice.model';
import { DiceGroup } from './dice-group.model';

@Component({
  selector: 'app-dice-group',
  templateUrl: './dice-group.component.html',
  styleUrls: ['./dice-group.component.scss'],
})
export class DiceGroupComponent {
  @Input() group: DiceGroup = new DiceGroup();

  get dices(): Dice[] {
    return this.group.dices;
  }
}
