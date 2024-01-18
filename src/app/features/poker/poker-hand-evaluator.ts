import { Card, CardRank, CardSuit } from './card/card.interface';

const sortByRank = (cards: Card[]): Card[] => {
  return cards.slice().sort((a, b) => b.rank - a.rank);
};

const countRanks = (cards: Card[]): Map<number, number> => {
  const rankCounts = new Map<number, number>();
  cards.forEach((card) => {
    rankCounts.set(card.rank, (rankCounts.get(card.rank) || 0) + 1);
  });
  return rankCounts;
};

const isSequence = (
  cards: Card[],
  count: number,
  sameSuit: boolean,
  checkRoyal: boolean = false
): boolean => {
  if (cards.length < count) {
    return false;
  }
  let comparableCards = cards;

  if (sameSuit) {
    if (comparableCards.length < count) {
      return false;
    }
  }

  if (checkRoyal && comparableCards[0].rank !== 14) {
    return false;
  }

  for (let i = 1; i < count; i++) {
    if (comparableCards[i - 1].rank !== comparableCards[i].rank + 1) {
      return false;
    }
  }

  return true;
};

const isSameSuitCount = (cards: Card[], count: number): boolean => {
  const suitCounts = new Map<CardSuit, number>();
  cards.forEach((card) => {
    suitCounts.set(card.suit, (suitCounts.get(card.suit) || 0) + 1);
  });
  return Array.from(suitCounts.values()).some(
    (suitCount) => suitCount >= count
  );
};

export function isHighCard(cards: Card[]): boolean {
  return true;
}

export function isOnePair(cards: Card[]): boolean {
  const rankCounts = countRanks(cards);
  return Array.from(rankCounts.values()).includes(2);
}

export function isTwoPair(cards: Card[]): boolean {
  const rankCounts = countRanks(cards);
  const pairs = Array.from(rankCounts.values()).filter((count) => count === 2);
  return pairs.length === 2;
}

export function isThreeOfAKind(cards: Card[]): boolean {
  const rankCounts = countRanks(cards);
  return Array.from(rankCounts.values()).includes(3);
}

export function isStraight(
  cards: Card[],
  sameSuit: boolean,
  checkRoyal = false
): boolean {
  if (cards.length < 5) {
    return false;
  }
  const sortedCards = sortByRank(cards);
  return isSequence(sortedCards, 5, sameSuit, checkRoyal);
}

export function isFlush(cards: Card[]): boolean {
  if (cards.length < 5) {
    return false;
  }
  return isSameSuitCount(cards, 5);
}

export function isFullHouse(cards: Card[]): boolean {
  if (cards.length < 5) {
    return false;
  }
  const rankCounts = countRanks(cards);
  return (
    Array.from(rankCounts.values()).includes(3) &&
    Array.from(rankCounts.values()).includes(2)
  );
}

export function isFourOfAKind(cards: Card[]): boolean {
  const rankCounts = countRanks(cards);
  return Array.from(rankCounts.values()).includes(4);
}

export function isStraightFlush(cards: Card[], checkRoyal = false): boolean {
  if (cards.length < 5) {
    return false;
  }

  return isStraight(cards, true, checkRoyal) && isFlush(cards);
}

export function isRoyalFlush(cards: Card[]): boolean {
  if (cards.length < 5) {
    return false;
  }
  const sortedCards = sortByRank(cards);
  return isStraightFlush(sortedCards, true);
}
