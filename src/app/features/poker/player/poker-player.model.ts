import { Card, CardRank } from '../card/card.interface';
import {
  isFlush,
  isFourOfAKind,
  isFullHouse,
  isOnePair,
  isRoyalFlush,
  isStraight,
  isStraightFlush,
  isThreeOfAKind,
  isTwoPair,
} from '../poker-hand-evaluator';

export type HandRanks =
  | 'Royal Flush'
  | 'Straight Flush'
  | 'Four of a Kind'
  | 'Full House'
  | 'Flush'
  | 'Straight'
  | 'Three of a Kind'
  | 'Two Pair'
  | 'One Pair'
  | 'High Card';

export interface HandEvaluationResult {
  rank: HandRanks;
  highestCard: CardRank;
  value: number;
}

export class PokerPlayer {
  private _id = Math.random();
  private cards: Card[] = [];
  private stats = { winsPercentage: 0, tiesPercentage: 0, wins: 0, ties: 0 };
  folded = false;
  handName = '';
  handNames: { [key: string]: number } = {};

  constructor(cards: Card[]) {
    this.cards = cards;
  }

  giveCards(cards: Card[]): void {
    if (this.cards.length + cards.length > 2) {
      throw new Error('Player only can have 2 cards.');
    }
    this.cards = [...this.cards, ...cards];
  }

  removeLastCard(): void {
    this.cards.pop();
  }

  getCards(): Card[] {
    return this.cards;
  }

  setWin(): void {
    this.stats.wins++;
  }

  setTie(): void {
    this.stats.ties++;
  }

  getStats() {
    return this.stats;
  }

  isSameHand(cards: Card[]): boolean {
    return this.cards.every(
      (card) =>
        cards.some((ocards) => ocards.rank === card.rank) &&
        cards.some((ocards) => ocards.suit === card.suit)
    );
  }

  evaluateHand(communityCards: Card[]): HandEvaluationResult {
    const result = this._evaluateHand(communityCards);
    this.handName = result.rank;
    if (!this.handNames[result.rank]) {
      this.handNames[result.rank] = 0;
    }

    this.handNames[result.rank]++;
    return result;
  }

  /** Remove given cards */
  reset() {
    this.cards = this.cards.filter((card) => card.definedByUser);
    this.handName = '';
  }

  resetStats() {
    this.stats = {
      tiesPercentage: 0,
      winsPercentage: 0,
      wins: 0,
      ties: 0,
    };
  }

  computeFinalStats(plays: number) {
    this.stats.winsPercentage = +((this.stats.wins / plays) * 100).toFixed(2);
    this.stats.tiesPercentage = +((this.stats.ties / plays) * 100).toFixed(2);
  }

  private _evaluateHand(communityCards: Card[]): HandEvaluationResult {
    const cards = [...this.cards, ...communityCards];
    const sortedCards = cards.sort((a, b) => b.rank - a.rank);
    const sortedUserCards = [...this.cards].sort((a, b) => b.rank - a.rank);

    if (isRoyalFlush(sortedCards)) {
      return {
        rank: 'Royal Flush',
        highestCard: sortedCards[0].rank,
        value: 9,
      };
    }

    if (isStraightFlush(sortedCards)) {
      return {
        rank: 'Straight Flush',
        highestCard: sortedCards[0].rank,
        value: 8,
      };
    }

    if (isFourOfAKind(sortedCards)) {
      return {
        rank: 'Four of a Kind',
        highestCard: sortedCards[0].rank,
        value: 7,
      };
    }

    if (isFullHouse(sortedCards)) {
      return {
        rank: 'Full House',
        highestCard: sortedCards[0].rank,
        value: 6,
      };
    }

    if (isFlush(sortedCards)) {
      return { rank: 'Flush', highestCard: sortedCards[0].rank, value: 5 };
    }

    if (isStraight(sortedCards, false)) {
      return {
        rank: 'Straight',
        highestCard: sortedCards[0].rank,
        value: 4,
      };
    }

    if (isThreeOfAKind(sortedCards)) {
      return {
        rank: 'Three of a Kind',
        highestCard: sortedCards[0].rank,
        value: 3,
      };
    }

    if (isTwoPair(sortedCards)) {
      return {
        rank: 'Two Pair',
        highestCard: sortedCards[0].rank,
        value: 2,
      };
    }

    if (isOnePair(sortedCards)) {
      return {
        rank: 'One Pair',
        highestCard: sortedCards[0].rank,
        value: 1,
      };
    }

    return {
      rank: 'High Card',
      highestCard: sortedCards[0].rank,
      value: 0,
    };
  }

  get id() {
    return this._id;
  }
}
