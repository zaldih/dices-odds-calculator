import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardSelectorComponent } from 'src/app/features/poker/card-selector/card-selector.component';
import { Card } from 'src/app/features/poker/card/card.interface';
import { PlayerComponent } from 'src/app/features/poker/player/player.component';
import { PokerPlayer } from 'src/app/features/poker/player/poker-player.model';
import { PokerCommunityCardsComponent } from 'src/app/features/poker/poker-community-cards/poker-community-cards.component';
import { PokerService } from 'src/app/features/poker/poker.service';
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
  constructor(private readonly pokerService: PokerService) {}

  onCardSelected(card: Card) {
    if (this.players[0].getCards().length < 2) {
      this.players[0].giveCards([{ ...card, definedByUser: true }]);
      this.simulate();
      return;
    }

    if (this.pokerService.getCommunityCards().length === 5) {
      return;
    }

    this.pokerService.addCommunityCard({ ...card, definedByUser: true });

    const commonCards = this.pokerService.getCommunityCards();
    if (commonCards.length < 3) {
      return;
    }

    this.simulate();
  }

  simulate(): void {
    setTimeout(() => {
      this.pokerService.simulateGames();
    }, 10);
  }

  reset(): void {
    this.pokerService.reset();
  }

  remove(): void {
    if (this.pokerService.getCommunityCards().length > 0) {
      this.pokerService.removeLastCommunityCard();
      this.simulate();
      return;
    }

    if (this.pokerService.getPlayers()[0].getCards().length > 0) {
      this.pokerService.getPlayers()[0].removeLastCard();
      return;
    }
  }

  get players(): PokerPlayer[] {
    return this.pokerService.getPlayers();
  }
}
