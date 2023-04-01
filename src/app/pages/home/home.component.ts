import { Component, OnInit } from '@angular/core';
import { DiceGroup } from 'src/app/features/dice/dice-group/dice-group.model';
import { Dice } from 'src/app/features/dice/dice.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  diceGroups: DiceGroup[] = [];
  target: number | null = null;

  constructor() {}

  ngOnInit(): void {
    this.initGroups();
    this.diceGroups[0].value;
  }

  isGroupValid(group: DiceGroup): boolean {
    return this.target === null || group.value === this.target;
  }

  private initGroups(): void {
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        this.diceGroups.push(new DiceGroup([new Dice(i), new Dice(j)]));
      }
    }
  }

  get probability(): number {
    const validGroups = this.diceGroups.filter((group) =>
      this.isGroupValid(group)
    );

    return Math.round((validGroups.length / this.diceGroups.length) * 100);
  }
}
