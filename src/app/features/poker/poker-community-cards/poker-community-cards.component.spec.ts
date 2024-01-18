import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokerCommunityCardsComponent } from './poker-community-cards.component';

describe('PokerCommunityCardsComponent', () => {
  let component: PokerCommunityCardsComponent;
  let fixture: ComponentFixture<PokerCommunityCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokerCommunityCardsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PokerCommunityCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
