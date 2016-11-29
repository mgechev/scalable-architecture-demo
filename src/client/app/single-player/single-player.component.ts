import { Component, ViewChild } from '@angular/core';

import { GameComponent } from '../shared/components/game/game.component';
import { GameModel } from '../shared/models/game.model';
import { AsyncService } from '../shared/async-services/base.async-service';
import { GameServer } from '../shared/async-services/game-server/game-server.async-service';
import { GAME_TEXT } from '../config/config';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: 'single-player.component.html',
  styleUrls: ['single-player.component.css'],
  providers: [
    { provide: AsyncService, multi: true, useClass: GameServer },
    GameModel
  ]
})
export class SinglePlayerComponent {
  @ViewChild(GameComponent) game: GameComponent;
  text = GAME_TEXT;

  private gameEnabled: boolean = false;
  private time: number;
  private gamePlayed: boolean = false;

  gameCompleted(time: number) {
    this.time = time;
    this.gameEnabled = false;
    this.game.reset();
  }
  start() {
    this.gamePlayed = true;
    this.time = 0;
    this.gameEnabled = true;
  }
}
