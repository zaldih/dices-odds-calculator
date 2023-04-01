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

  constructor() {}

  ngOnInit(): void {
    this.initGroups();
  }

  private initGroups(): void {
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 6; j++) {
        this.diceGroups.push(new DiceGroup([new Dice(i), new Dice(j)]));
      }
    }
  }
}
