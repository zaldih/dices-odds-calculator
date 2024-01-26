import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Card, CardSuit } from '../card/card.interface';
import { PokerService } from '../poker.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-card-selector',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-selector.component.html',
  styleUrl: './card-selector.component.scss',
})
export class CardSelectorComponent implements OnInit {
  cards: Card[] = [];

  @Output() cardSelected = new EventEmitter<Card>();

  constructor(private readonly pokerService: PokerService) {}

  ngOnInit(): void {
    this.generateCards();
  }

  selectCard(card: Card): void {
    this.cardSelected.emit(card);
  }

  private generateCards() {
    for (const suit in CardSuit) {
      for (let rank = 2; rank <= 14; rank++) {
        const card: Card = {
          rank: rank,
          suit: CardSuit[suit as keyof typeof CardSuit],
        };

        this.cards = [...this.cards, card];
      }
    }
  }
}
