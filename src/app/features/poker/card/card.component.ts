import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Card } from './card.interface';
import { PokerService } from '../poker.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnChanges {
  @Input() card: Card | undefined;
  cardImageUrl = '';

  constructor(private readonly pokerService: PokerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && this.card) {
      this.cardImageUrl = this.pokerService.getCardImageUrl(this.card);
    }
  }
}
