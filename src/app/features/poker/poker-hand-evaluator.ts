import { Card, CardSuit } from './card/card.interface';

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

  const check = (cards: Card[]): boolean => {
    let counter = 0;
    let prevRank = 0;

    for (const card of cards) {
      // Check Ace, 5, 4, 3 and 2.
      if ((prevRank === 14 && card.rank === 5) || prevRank === card.rank + 1) {
        counter++;
      } else {
        counter = 0;
      }

      // Check if some straigh include
      if (counter + 1 >= count) {
        return true;
      }

      prevRank = card.rank;
    }
    return false;
  };

  if (!sameSuit) {
    const ids = cards.map(({ rank }) => rank);
    const filtered = cards.filter(
      ({ rank }, index) => !ids.includes(rank, index + 1)
    );
    return check(filtered);
  }

  // Separate cards by Suit.
  const separatedCards = cards.reduce((a, b) => {
    const group = b.suit;
    if (!a[group]) {
      a[group] = [];
    }
    a[group] = [...a[group], b];
    return a;
  }, {} as { [key: string]: Card[] });

  const aaa = Object.values(separatedCards).filter(
    (cards) => cards.length >= count
  );

  for (const cards of aaa) {
    if (cards.length < count) {
      continue;
    }

    if (checkRoyal && cards[0].rank !== 14) {
      continue;
    }

    const checkResult = check(cards);
    if (checkResult) {
      return true;
    }
  }

  return false;
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

export function isHighCard(_cards: Card[]): boolean {
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
  sameSuit: boolean = false,
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
