import { Component } from '@angular/core';
import { GameModel } from '../shared/models/game.model';
import { AppComponent } from '../app.component';
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
  parent: string;
  name: string;

  constructor(private _game: GameModel, private _roomConfig: RoomConfig, private _parent: AppComponent) {}

  startGame() {
    this._roomConfig.name = this.name;
    this._roomConfig.isInitiator = true;
    this.navigateTo('multi-player');
  }
  joinGame() {
    this._roomConfig.name = this.parent;
    this._roomConfig.isInitiator = false;
    this.navigateTo('multi-player');
  }
  hasGames() {
    return this._game.games$.scan((accum: boolean, game: any) => (accum || !!game.size), false);
  }
  navigateTo(page: string) {
    this._parent.navigateTo(page);
  }
}
