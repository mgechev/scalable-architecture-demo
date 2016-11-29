import { Injectable, Inject, OpaqueToken } from '@angular/core';

import { Observable } from 'rxjs/Observable';

import { Gateway } from '../../shared/gateways/base.gateway';
import { Command } from '../../shared/commands/base.command';

export interface WebSocketGatewayConfig {
  secure: boolean;
  port: number;
  host: string;
}

export const WS_CONFIG = new OpaqueToken('ws-config');

@Injectable()
export class WebSocketGateway extends Gateway {
  private _endpoint: string;
  private _ws: WebSocket;
  private _connected: boolean = false;
  private _reconnectTimeout: any;

  constructor(@Inject(WS_CONFIG) private config: WebSocketGatewayConfig) {
    super();
    let schema = 'ws';
    if (config.secure) {
      schema = 'wss';
    }
    this._endpoint = schema + '://' + config.host + ':' + config.port;
    this._createConnection();
  }

  send(command: Command) {
    // Send if connected & drop all others
    // TODO: buffer the input
    if (this._connected) {
      this._ws.send(command.serialize());
    }
    return Observable.create();
  }

  _createConnection() {
    if (this._reconnectTimeout) {
      return;
    }
    this._ws = new WebSocket(this._endpoint);
    this._ws.onopen = () => {
      this._connected = true;
      this._connectionEventsEmitter.next(true);
    };
    this._ws.onerror = this._ws.onclose = () => {
      this._connected = false;
      this._connectionEventsEmitter.next(true);
      this._reconnectTimeout = setTimeout(() => {
        this._createConnection();
      }, 2000);
    };
    this._ws.onmessage = (e: any) => {
      this._emitter.next(e.data);
    };
  }
}
