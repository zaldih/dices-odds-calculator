import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceGroupComponent } from './dice-group.component';

describe('DiceGroupComponent', () => {
  let component: DiceGroupComponent;
  let fixture: ComponentFixture<DiceGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiceGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiceGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
