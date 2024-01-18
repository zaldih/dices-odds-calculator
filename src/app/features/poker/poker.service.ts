import { Injectable } from '@angular/core';
import { PokerGame } from './poker-game.model';
import { PokerPlayer } from './player/poker-player.model';
import { Card, CardSuit } from './card/card.interface';

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
    const gameLimit = 3e3;

    this.players.forEach((player) => {
      player.resetStats();
    });

    for (let i = 0; i < gameLimit; i++) {
      this.simulateGame({
        players: [...this.players],
        communityCards: [...this.communityCards],
      });
    }
    const end = Date.now();
    this.players.forEach((player) => {
      player.computeFinalStats(gameLimit);
      player.evaluateHand(this.communityCards);
    });

    console.log(`Played ${gameLimit} hands in ${end - start} ms`);
    console.log(this.players);
  }

  getCardImageUrl(card: Card): string {
    const CARD_NAMES: { [key: string]: string } = {
      '11': 'jack',
      '12': 'queen',
      '13': 'king',
      '14': 'ace',
    };

    const name = card.suit.toLowerCase();
    const rank = card.rank < 11 ? card.rank : CARD_NAMES[card.rank.toString()];

    return `/assets/cards/${name}_${rank}.svg`;
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
