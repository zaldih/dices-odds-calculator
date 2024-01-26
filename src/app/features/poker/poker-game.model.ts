import { Card, CardRank, CardSuit } from './card/card.interface';
import { PokerPlayer } from './player/poker-player.model';

export class PokerGame {
  private deck: Card[] = [];
  private communityCards: Card[] = [];
  private players: PokerPlayer[] = [];

  constructor(
    private readonly config: { players: PokerPlayer[]; communityCards: Card[] }
  ) {
    this.players = config.players;
    this.communityCards = config.communityCards;
  }

  simulate(log: boolean) {
    const newDeck = this.generateDeck();
    this.deck = this.shuffleDeck(newDeck);
    this.dealCards();
    const winner = this.getWinners();
    if (!winner) {
      return null;
    }
    winner.setWin();
    if (log) {
      console.log('Game result', this.communityCards);
      console.log('Players:', this.players);
      console.log('Winners:', winner);
      console.log('-------------');
    }
    return winner;
  }

  private dealCards() {
    for (let i = 0; i < this.players.length; i++) {
      this.players[i].reset();
      if (this.players[i].getCards().length === 2) {
        continue;
      }

      const cards = [this.drawCard(), this.drawCard()];
      this.players[i].giveCards(cards);
    }

    while (this.communityCards.length < 5) {
      this.communityCards = [...this.communityCards, this.drawCard()];
    }
  }

  private drawCard(): Card {
    const card = this.deck.shift();
    if (!card) {
      throw new Error('No cards in deck.');
    }
    return card;
  }

  private getWinners(): PokerPlayer | null {
    // Determine the winner among players
    if (this.players.length === 2) {
      throw new Error('Min. 2 players required in the game.');
    }

    let winners: PokerPlayer[] = [this.players[0]];
    let maxHandValue = this.players[0].evaluateHand(this.communityCards);

    for (let i = 1; i < this.players.length; i++) {
      if (this.players[i].folded) {
        continue;
      }

      const currentHand = this.players[i].evaluateHand(this.communityCards);

      if (currentHand.value > maxHandValue.value) {
        maxHandValue = currentHand;
        winners = [this.players[i]];
      } else if (currentHand.value === maxHandValue.value) {
        if (currentHand.highestCard > maxHandValue.highestCard) {
          maxHandValue = currentHand;
          winners = [this.players[i]];
          continue;
        }

        // Get the highest card of all
        const prevPlayerCards = this.players[i - 1]
          .getCards()
          .sort((a, b) => b.rank - a.rank)
          .map((card) => card.rank);
        const actPlayerCards = this.players[i]
          .getCards()
          .sort((a, b) => b.rank - a.rank)
          .map((card) => card.rank);

        if (
          prevPlayerCards[0] < actPlayerCards[0] ||
          prevPlayerCards[1] < actPlayerCards[1]
        ) {
          winners = [this.players[i]];
          continue;
        }

        if (
          prevPlayerCards[0] > actPlayerCards[0] ||
          prevPlayerCards[1] > actPlayerCards[1]
        ) {
          continue;
        }

        winners.push(this.players[i]);
      }
    }

    if (winners.length === 1) {
      return winners[0];
    } else {
      for (const winner of winners) {
        winner.setTie();
      }
      return null; // Indicates a tie
    }
  }

  generateDeck(): Card[] {
    let cards: Card[] = [];
    const playerCards: Card[] = this.players
      .filter((player) => player.getCards().length !== 0)
      .map((player) => player.getCards())
      .flat();
    const usedCard = [...this.config.communityCards, ...playerCards];

    for (let rank = 2; rank <= 14; rank++) {
      for (const suit in CardSuit) {
        const card: Card = {
          rank: rank,
          suit: CardSuit[suit as keyof typeof CardSuit],
        };

        if (
          !usedCard.some(
            (playerCard) =>
              playerCard.rank === card.rank && playerCard.suit === card.suit
          )
        ) {
          cards = [...cards, card];
        }
      }
    }
    // cards = cards.filter(card=> playerCards.in.includes(card.suit))
    return cards;
  }

  shuffleDeck(deck: Card[]): Card[] {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }

  isEnded(): boolean {
    return this.communityCards.length === 5;
  }
}
