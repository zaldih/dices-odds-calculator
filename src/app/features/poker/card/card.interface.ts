export enum CardRank {
  Two = 2,
  Three = 3,
  Four = 4,
  Five = 5,
  Six = 6,
  Seven = 7,
  Eight = 8,
  Nine = 9,
  Ten = 10,
  Jack = 11,
  Queen = 12,
  King = 13,
  Ace = 14,
}

export enum CardSuit {
  Hearts = 'Heart',
  Diamonds = 'Diamond',
  Clubs = 'Club',
  Spades = 'Spade',
}

export interface Card {
  rank: number;
  suit: CardSuit;

  // Use for identify what cards is setted by user or given randomly.
  definedByUser?: boolean;
}
