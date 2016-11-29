import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { APP_BASE_HREF, CommonModule } from '@angular/common';

import { provideStore } from '@ngrx/store';

import { GameComponent } from './components/game/game.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TimerComponent } from './components/timer/timer.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { gameReducer, gamesReducer, p2pGameReducer } from './reducers/game.reducer';
import { GameModel } from './models/game.model';
import { RestfulGateway } from './gateways/restful.gateway';

import { RoomConfig } from '../config/config';

@NgModule({
  imports: [CommonModule, RouterModule],
  declarations: [GameComponent, NavbarComponent, TimerComponent, ToolbarComponent],
  exports: [GameComponent, NavbarComponent, TimerComponent, ToolbarComponent],
  providers: [GameModel, provideStore({
    game: gameReducer,
    games: gamesReducer,
    p2pGame: p2pGameReducer
  }),
  { provide: APP_BASE_HREF, useValue: '<%= APP_BASE %>' },
  RoomConfig,
  RestfulGateway]
})
export class SharedModule {}
