// Based on https://codesandbox.io/s/3j3mq7ykp?file=/src/animated/animated-d
// igit.component.ts:306-341
import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-animated-number',
  templateUrl: './animated-number.component.html',
  styleUrls: ['./animated-number.component.scss'],
})
export class AnimatedNumberComponent implements AfterViewInit, OnChanges {
  @Input() duration: number = 0;
  @Input() digit: number = 0;
  @ViewChild('animatedDigit') animatedDigit!: ElementRef;
  private prevDigit: number = 0;

  animateCount() {
    if (!this.duration) {
      this.duration = 1000;
    }

    if (typeof this.digit === 'number') {
      this.counterFunc(this.digit, this.duration, this.animatedDigit);
    }
  }

  counterFunc(endValue: number, durationMs: number, element: ElementRef) {
    const steps = 1;
    const stepCount = Math.abs(durationMs / steps);
    const valueIncrement = (endValue - this.prevDigit) / stepCount;
    const sinValueIncrement = Math.PI / stepCount;

    let currentValue = this.prevDigit;
    let currentSinValue = 0;

    const step = () => {
      currentSinValue += sinValueIncrement;
      currentValue += valueIncrement * Math.sin(currentSinValue) ** 2 * 2;

      element.nativeElement.textContent = Math.abs(Math.floor(currentValue));

      if (currentSinValue < Math.PI) {
        window.requestAnimationFrame(step);
      } else {
        this.prevDigit = this.digit;
      }
    };

    step();
  }

  ngAfterViewInit() {
    if (this.digit) {
      this.animateCount();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['digit']) {
      this.animateCount();
    }
  }
}
