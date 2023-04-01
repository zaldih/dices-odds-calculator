import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiceComponent } from './dice.component';
import { DiceGroupComponent } from './dice-group/dice-group.component';

const components = [DiceComponent, DiceGroupComponent];

@NgModule({
  declarations: [...components],
  imports: [CommonModule],
  exports: [...components],
})
export class DiceModule {}
