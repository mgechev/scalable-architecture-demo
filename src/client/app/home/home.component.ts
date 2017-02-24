import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { GameModel } from '../shared/models/game.model';
import { RoomConfig } from '../config/config';

import 'rxjs/add/operator/scan';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/take';

@Component({
  selector: 'sd-home',
  moduleId: module.id,
  styles: [`
    strong {
      cursor: pointer;
    }
  `],
  templateUrl: 'home.component.html'
})
export class HomeComponent {
  partner: string;
  name: string;

  constructor(private _game: GameModel, private _roomConfig: RoomConfig, private _router: Router) {}

  startSinglePlayerGame() {
    this._router.navigate(['single-player']);
  }

  startMultiPlayerGame() {
    this._roomConfig.name = this.name;
    this._roomConfig.isInitiator = true;
    this._router.navigate(['multi-player']);
  }

  joinGame() {
    this._roomConfig.name = this.partner;
    this._roomConfig.isInitiator = false;
    this._router.navigate(['multi-player']);
  }

  hasGames() {
    return this._game.games$
      .scan((accum: boolean, game: any) => (accum || !!game.size), false);
  }
}
