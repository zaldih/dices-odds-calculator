import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { Card } from '../card/card.interface';
import { PokerService } from '../poker.service';

@Component({
  selector: 'app-poker-community-cards',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './poker-community-cards.component.html',
  styleUrl: './poker-community-cards.component.scss',
})
export class PokerCommunityCardsComponent {
  constructor(private readonly pokerService: PokerService) {}

  get cards(): Card[] {
    return this.pokerService.getCommunityCards();
  }
}
