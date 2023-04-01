import { Dice } from '../dice.model';

export class DiceGroup {
  private _dices: Dice[] = [];

  constructor(dices: Dice[] = []) {
    this.dices = dices;
  }

  set dices(dices: Dice[]) {
    this._dices = dices;
  }

  get dices(): Dice[] {
    return this._dices;
  }

  get value(): number {
    return this.dices.reduce((acc, dice) => acc + dice.value, 0);
  }
}
