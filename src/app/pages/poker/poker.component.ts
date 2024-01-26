import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardSelectorComponent } from 'src/app/features/poker/card-selector/card-selector.component';
import { Card } from 'src/app/features/poker/card/card.interface';
import { PlayerComponent } from 'src/app/features/poker/player/player.component';
import { PokerPlayer } from 'src/app/features/poker/player/poker-player.model';
import { PokerCommunityCardsComponent } from 'src/app/features/poker/poker-community-cards/poker-community-cards.component';
import { GAME_LIMIT, PokerService } from 'src/app/features/poker/poker.service';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-poker',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    PlayerComponent,
    CardSelectorComponent,
    PokerCommunityCardsComponent,
  ],
  templateUrl: './poker.component.html',
  styleUrl: './poker.component.scss',
})
export class PokerComponent {
  cardsUsed: Card[] = [];
  handStats = [
    {
      name: 'Royal Flush',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'Straight Flush',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'Four of a Kind',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'Full House',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'Flush',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'Straight',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'Three of a Kind',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'Two Pair',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'One Pair',
      probYou: 0,
      probVillain: 0,
    },
    {
      name: 'High Card',
      probYou: 0,
      probVillain: 0,
    },
  ];

  constructor(private readonly pokerService: PokerService) {}

  onCardSelected(card: Card) {
    if (this.players[0].getCards().length < 2) {
      this.players[0].giveCards([{ ...card, definedByUser: true }]);
      this.cardsUsed = this.getCardsInUse();
      this.simulate();
      return;
    }

    if (this.pokerService.getCommunityCards().length === 5) {
      return;
    }

    this.pokerService.addCommunityCard({ ...card, definedByUser: true });
    this.cardsUsed = this.getCardsInUse();

    const commonCards = this.pokerService.getCommunityCards();
    if (commonCards.length < 3) {
      return;
    }

    this.simulate();
  }

  simulate(): void {
    setTimeout(() => {
      this.pokerService.simulateGames();
      this.aa();
    }, 10);
  }

  private aa() {
    const you = this.pokerService.getPlayers()[0];
    const villain = this.pokerService.getPlayers()[0];
    for (const handName of Object.keys(you.handNames)) {
      const ea = this.handStats.find((stat) => stat.name === handName);
      if (!ea) {
        console.warn('No hand stat for:', handName);
        return;
      }
      ea.probYou = (you.handNames[handName] / GAME_LIMIT) * 100;
      ea.probVillain = (villain.handNames[handName] / GAME_LIMIT) * 100;
    }
  }

  reset(): void {
    this.pokerService.reset();
    this.cardsUsed = this.getCardsInUse();
  }

  remove(): void {
    if (this.pokerService.getCommunityCards().length > 0) {
      this.pokerService.removeLastCommunityCard();
      this.cardsUsed = this.getCardsInUse();
      this.simulate();
      return;
    }

    if (this.pokerService.getPlayers()[0].getCards().length > 0) {
      this.pokerService.getPlayers()[0].removeLastCard();
      this.cardsUsed = this.getCardsInUse();
      return;
    }
  }

  private getCardsInUse(): Card[] {
    const playersHands = this.pokerService
      .getPlayers()
      .reduce((acc: Card[], act) => {
        acc = [...acc, ...act.getCards()];
        return acc;
      }, [])
      .filter((card) => card.definedByUser);

    return [...this.pokerService.getCommunityCards(), ...playersHands];
  }

  get players(): PokerPlayer[] {
    return this.pokerService.getPlayers();
  }
}
