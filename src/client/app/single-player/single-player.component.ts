import { Component, ViewChild } from '@angular/core';

import { GameComponent } from '../shared/components/game/game.component';
import { AsyncService } from '../shared/async-services/base.async-service';
import { GameServer } from '../shared/async-services/game-server/game-server.async-service';
import { GameModel } from '../shared/models/game.model';
import { GAME_TEXT } from '../config/config';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  templateUrl: 'single-player.component.html',
  styleUrls: ['single-player.component.css'],
  providers: [

    // Notice how in single player mode we use only the GameServer
    // AsyncService by having a multi-provider.
    // In MultiPlayerComponent we override the multi-provider by
    // introducing the WebRTC async service.
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
