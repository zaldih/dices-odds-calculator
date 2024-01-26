import { Injectable } from '@angular/core';
import { PokerGame } from './poker-game.model';
import { PokerPlayer } from './player/poker-player.model';
import { Card, CardSuit } from './card/card.interface';

export const GAME_LIMIT = 3e3;

@Injectable({
  providedIn: 'root',
})
export class PokerService {
  private players: PokerPlayer[] = [];
  private communityCards: Card[] = [];
  private games: PokerGame[] = [];

  constructor() {
    this.reset();
  }

  reset() {
    this.players = [
      new PokerPlayer([]),
      new PokerPlayer([]),
      new PokerPlayer([]),
      new PokerPlayer([]),
      new PokerPlayer([]),
      new PokerPlayer([]),
    ];
    this.communityCards = [];
  }

  simulateGames() {
    const start = Date.now();
    // const gameLimit = 1e4;
    this.players.forEach((player) => {
      player.resetStats();
    });

    for (let i = 0; i < GAME_LIMIT; i++) {
      this.simulateGame({
        players: [...this.players],
        communityCards: [...this.communityCards],
      });
    }
    const end = Date.now();
    this.players.forEach((player) => {
      player.computeFinalStats(GAME_LIMIT);
      player.evaluateHand(this.communityCards);
    });

    console.log(`Played ${GAME_LIMIT} hands in ${end - start} ms`);
    console.log(this.players);
  }

  getCardSuitUrl(card: Card): string {
    const name = card.suit.toLowerCase();
    return `/assets/cards/${name}.svg`;
  }

  getRankText(card: Card): string {
    const { rank } = card;
    const ranges = ['J', 'Q', 'K', 'A'];
    if (rank <= 10) {
      return rank.toString();
    }
    return ranges[rank - 11];
  }

  getPlayers(): PokerPlayer[] {
    return this.players;
  }

  addCommunityCard(card: Card) {
    this.communityCards = [...this.communityCards, card];
  }

  removeLastCommunityCard(): void {
    this.communityCards.pop();
  }

  getCommunityCards(): Card[] {
    return this.communityCards;
  }

  private simulateGame(config: {
    players: PokerPlayer[];
    communityCards: Card[];
  }) {
    const game = new PokerGame({
      players: config.players,
      communityCards: config.communityCards,
    });
    const result = game.simulate(false);
    return result;
  }
}
