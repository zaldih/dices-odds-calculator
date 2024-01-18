import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { CardComponent } from '../card/card.component';
import { PokerPlayer } from './poker-player.model';
import { Card } from '../card/card.interface';
import { SharedModule } from 'src/app/shared/shared.module';
import { PokerService } from '../poker.service';

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule, SharedModule, CardComponent],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss',
})
export class PlayerComponent {
  @Input() player!: PokerPlayer;
  @Input() oponent: boolean = false;

  constructor(private readonly pokerService: PokerService) {}

  foldToggle(): void {
    this.player.folded = !this.player.folded;
    this.pokerService.simulateGames();
  }

  get card1(): Card | undefined {
    return this.oponent ? undefined : this.player.getCards()[0];
  }

  get card2(): Card | undefined {
    return this.oponent ? undefined : this.player.getCards()[1];
  }

  get winRatio(): number {
    return this.player.getStats().winsPercentage;
  }

  get tieRatio(): number {
    return this.player.getStats().tiesPercentage;
  }

  get foldText(): string {
    return this.player.folded ? 'Unfold' : 'Fold';
  }
}
