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
  /** Mode determine the size. */
  @Input() mode: 'hero' | 'community' | 'villain' | 'selector' = 'hero';
  rankText = '';
  suitImageUrl = '';

  constructor(private readonly pokerService: PokerService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && this.card) {
      this.suitImageUrl = this.pokerService.getCardSuitUrl(this.card);
      this.rankText = this.pokerService.getRankText(this.card);
    }
  }

  get suit(): string {
    return this.card ? this.card.suit.toLowerCase() : ' ';
  }
}
