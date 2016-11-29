import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MultiPlayerComponent } from './components/multi-player.component';

import { P2PGameModel } from './models/p2p-game.model';
import { WebRTCGateway } from './gateways/webrtc.gateway';
import { WebSocketGateway } from './gateways/websocket.gateway';

import { SharedModule } from '../shared/shared.module';

import { RoomConfig } from '../config/config';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [MultiPlayerComponent],
  exports: [MultiPlayerComponent],
  providers: [P2PGameModel, WebRTCGateway, WebSocketGateway, RoomConfig]
})
export class MultiPlayerModule {}
