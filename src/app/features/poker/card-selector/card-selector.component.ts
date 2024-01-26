import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { Card, CardSuit } from '../card/card.interface';
import { PokerService } from '../poker.service';
import { CardComponent } from '../card/card.component';

interface SelectorCard {
  card: Card;
  disabled: boolean;
}

@Component({
  selector: 'app-card-selector',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './card-selector.component.html',
  styleUrl: './card-selector.component.scss',
})
export class CardSelectorComponent implements OnInit, OnChanges {
  cards: SelectorCard[] = [];

  @Output() cardSelected = new EventEmitter<Card>();
  @Input() disabledCards: Card[] = [];

  constructor(private readonly pokerService: PokerService) {}

  ngOnInit(): void {
    this.generateCards();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disabledCards']) {
      this.cards = this.cards.map((card) => {
        card.disabled = this.disabledCards.some(
          (disabledCard) =>
            disabledCard.rank === card.card.rank &&
            disabledCard.suit === card.card.suit
        );
        return card;
      });
    }
  }

  selectCard(card: SelectorCard): void {
    if (card.disabled) {
      return;
    }
    this.cardSelected.emit(card.card);
  }

  private generateCards() {
    for (const suit in CardSuit) {
      for (let rank = 2; rank <= 14; rank++) {
        const card: Card = {
          rank: rank,
          suit: CardSuit[suit as keyof typeof CardSuit],
        };

        this.cards = [...this.cards, { card, disabled: false }];
      }
    }
  }
}
