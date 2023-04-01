export class Dice {
  private _value: number = 1;

  constructor(value: number = 1) {
    this.value = value;
  }

  set value(value: number) {
    if (value < 1 || value > 6) {
      throw new Error('Dice value must be between 1 and 6');
    }

    this._value = value;
  }

  get value(): number {
    return this._value;
  }
}
