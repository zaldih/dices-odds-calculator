import { Card, CardSuit } from './card/card.interface';
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
} from './poker-hand-evaluator';

fdescribe('Poker Hand Evaluator', () => {
  it('should detect One Pairs', () => {
    const cards: Card[] = [
      { rank: 1, suit: CardSuit.Hearts },
      { rank: 2, suit: CardSuit.Clubs },
      { rank: 4, suit: CardSuit.Hearts },
      { rank: 7, suit: CardSuit.Diamonds },
    ];

    expect(isOnePair(cards)).toBeFalse();
    cards.push({ rank: 4, suit: CardSuit.Clubs });
    expect(isOnePair(cards)).toBeTrue();
  });

  it('should detect Two Pairs', () => {
    const cards: Card[] = [
      { rank: 1, suit: CardSuit.Hearts },
      { rank: 2, suit: CardSuit.Clubs },
      { rank: 7, suit: CardSuit.Hearts },
      { rank: 7, suit: CardSuit.Diamonds },
      { rank: 3, suit: CardSuit.Hearts },
    ];

    expect(isTwoPair(cards)).toBeFalse();
    cards.push({ rank: 3, suit: CardSuit.Hearts });
    expect(isTwoPair(cards)).toBeTrue();
  });

  it('should detect Three Of A Kind', () => {
    const cards: Card[] = [
      { rank: 1, suit: CardSuit.Hearts },
      { rank: 2, suit: CardSuit.Clubs },
      { rank: 7, suit: CardSuit.Hearts },
      { rank: 7, suit: CardSuit.Diamonds },
      { rank: 3, suit: CardSuit.Hearts },
    ];

    expect(isThreeOfAKind(cards)).toBeFalse();
    cards.push({ rank: 7, suit: CardSuit.Clubs });
    expect(isThreeOfAKind(cards)).toBeTrue();
  });

  describe('Straight', () => {
    it('should detect basic Straight', () => {
      const cards: Card[] = [
        { rank: 2, suit: CardSuit.Clubs },
        { rank: 3, suit: CardSuit.Hearts },
        { rank: 4, suit: CardSuit.Hearts },
        { rank: 5, suit: CardSuit.Hearts },
      ];

      // expect(isStraight(cards)).toBeFalse();
      cards.push({ rank: 6, suit: CardSuit.Clubs });
      expect(isStraight(cards)).toBeTrue();
    });

    it('should detect Straight in hight-ace', () => {
      const cards: Card[] = [
        { rank: 14, suit: CardSuit.Clubs },
        { rank: 13, suit: CardSuit.Hearts },
        { rank: 12, suit: CardSuit.Hearts },
        { rank: 11, suit: CardSuit.Hearts },
        { rank: 10, suit: CardSuit.Hearts },
      ];

      expect(isStraight(cards)).toBeTrue();
    });

    it('should detect Straight in low-ace', () => {
      const cards: Card[] = [
        { rank: 14, suit: CardSuit.Clubs },
        { rank: 2, suit: CardSuit.Hearts },
        { rank: 3, suit: CardSuit.Hearts },
        { rank: 4, suit: CardSuit.Spades },
        { rank: 5, suit: CardSuit.Hearts },
      ];

      expect(isStraight(cards)).toBeTrue();
    });

    it('should detect advanced Straight', () => {
      const cards: Card[] = [
        { rank: 7, suit: CardSuit.Clubs },
        { rank: 3, suit: CardSuit.Hearts },
        { rank: 5, suit: CardSuit.Hearts },
        { rank: 5, suit: CardSuit.Diamonds },
        { rank: 8, suit: CardSuit.Diamonds },
        { rank: 8, suit: CardSuit.Clubs },
        { rank: 9, suit: CardSuit.Diamonds },
      ];

      expect(isStraight(cards)).toBeFalse();
      cards.push({ rank: 6, suit: CardSuit.Clubs });
      expect(isStraight(cards)).toBeTrue();
    });
  });

  it('should detect Flush', () => {
    const cards: Card[] = [
      { rank: 7, suit: CardSuit.Clubs },
      { rank: 14, suit: CardSuit.Diamonds },
      { rank: 3, suit: CardSuit.Hearts },
      { rank: 9, suit: CardSuit.Diamonds },
      { rank: 5, suit: CardSuit.Hearts },
      { rank: 5, suit: CardSuit.Diamonds },
      { rank: 8, suit: CardSuit.Diamonds },
      { rank: 8, suit: CardSuit.Clubs },
    ];

    expect(isFlush(cards)).toBeFalse();
    cards.push({ rank: 6, suit: CardSuit.Diamonds });
    expect(isFlush(cards)).toBeTrue();
  });

  it('should detect Full House', () => {
    const cards: Card[] = [
      { rank: 7, suit: CardSuit.Clubs },
      { rank: 3, suit: CardSuit.Hearts },
      { rank: 5, suit: CardSuit.Hearts },
      { rank: 5, suit: CardSuit.Diamonds },
      { rank: 8, suit: CardSuit.Diamonds },
      { rank: 8, suit: CardSuit.Clubs },
      { rank: 9, suit: CardSuit.Diamonds },
    ];

    expect(isFullHouse(cards)).toBeFalse();
    cards.push({ rank: 5, suit: CardSuit.Clubs });
    expect(isFullHouse(cards)).toBeTrue();
  });

  it('should detect Four Of a Kind', () => {
    const cards: Card[] = [
      { rank: 7, suit: CardSuit.Clubs },
      { rank: 3, suit: CardSuit.Hearts },
      { rank: 5, suit: CardSuit.Spades },
      { rank: 5, suit: CardSuit.Diamonds },
      { rank: 8, suit: CardSuit.Diamonds },
      { rank: 5, suit: CardSuit.Clubs },
      { rank: 9, suit: CardSuit.Diamonds },
    ];

    expect(isFourOfAKind(cards)).toBeFalse();
    cards.push({ rank: 5, suit: CardSuit.Hearts });
    expect(isFourOfAKind(cards)).toBeTrue();
  });

  describe('Straight Flush', () => {
    it('should detect basic Straight Flush', () => {
      const cards: Card[] = [
        { rank: 9, suit: CardSuit.Diamonds },
        { rank: 3, suit: CardSuit.Hearts },
        { rank: 5, suit: CardSuit.Hearts },
        { rank: 5, suit: CardSuit.Diamonds },
        { rank: 8, suit: CardSuit.Diamonds },
        { rank: 7, suit: CardSuit.Diamonds },
        { rank: 5, suit: CardSuit.Clubs },
      ];

      expect(isStraightFlush(cards)).toBeFalse();
      cards.push({ rank: 6, suit: CardSuit.Diamonds });
      expect(isStraightFlush(cards)).toBeTrue();
    });

    it('should detect advanced Straight Flush', () => {
      const cards: Card[] = [
        { rank: 9, suit: CardSuit.Diamonds },
        { rank: 3, suit: CardSuit.Hearts },
        { rank: 5, suit: CardSuit.Spades },
        { rank: 6, suit: CardSuit.Hearts },
        { rank: 7, suit: CardSuit.Clubs },
        { rank: 8, suit: CardSuit.Hearts },
        { rank: 9, suit: CardSuit.Hearts },
        { rank: 5, suit: CardSuit.Diamonds },
        { rank: 8, suit: CardSuit.Diamonds },
        { rank: 7, suit: CardSuit.Diamonds },
        { rank: 5, suit: CardSuit.Clubs },
      ];

      expect(isStraightFlush(cards)).toBeFalse();
      cards.push({ rank: 6, suit: CardSuit.Diamonds });
      expect(isStraightFlush(cards)).toBeTrue();
    });
  });

  it('should detect Royal Flush', () => {
    const cards: Card[] = [
      { rank: 13, suit: CardSuit.Diamonds },
      { rank: 9, suit: CardSuit.Diamonds },
      { rank: 3, suit: CardSuit.Hearts },
      { rank: 11, suit: CardSuit.Diamonds },
      { rank: 14, suit: CardSuit.Hearts },
      { rank: 14, suit: CardSuit.Diamonds },
      { rank: 10, suit: CardSuit.Spades },
      { rank: 7, suit: CardSuit.Diamonds },
      { rank: 10, suit: CardSuit.Diamonds },
      { rank: 5, suit: CardSuit.Clubs },
    ];

    expect(isRoyalFlush(cards)).toBeFalse();
    cards.push({ rank: 12, suit: CardSuit.Diamonds });
    expect(isRoyalFlush(cards)).toBeTrue();
  });
});
