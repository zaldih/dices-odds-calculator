import { NgModule } from '@angular/core';
import { MaterialModule } from './material/material.module';
import { AnimatedNumberComponent } from './components/animated-number/animated-number.component';

@NgModule({
  exports: [MaterialModule, AnimatedNumberComponent],
  declarations: [AnimatedNumberComponent],
})
export class SharedModule {}
