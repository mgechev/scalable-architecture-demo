import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import * as Peer from 'simple-peer';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

import { Gateway } from '../../shared/gateways/base.gateway';
import { WebSocketGateway } from './websocket.gateway';
import { Command } from '../../shared/commands/base.command';
import { JsonPayload } from '../../shared/commands/payloads/json.command.payload';

import { Observer } from 'rxjs/Observer';
import { RoomConfig } from '../../config/config';

class SignalingCommand extends Command {}

// TODO implement disconnect functionality
@Injectable()
export class WebRTCGateway extends Gateway {
  public connectionEvents: Observable<boolean>;
  private _peer: any;
  private _partner: any;
  private _name: any;
  private _connected: boolean = false;

  constructor(private _provider: RoomConfig, private _ws: WebSocketGateway) {
    super();
    if (this._provider.isInitiator) {
      this._name = this._provider.name;
    } else {
      this._name = `${Math.round(Math.random() * 1000)}-${Date.now()}`;
      this._partner = this._provider.name;
    }

    const jsonStream = this._ws.dataStream
      .map((data:any) => JSON.parse(data));

    if (this._provider.isInitiator) {
      jsonStream.filter((data: any) => {
        return data.type === 'start' && data.target === this._name;
      })
      .subscribe((data: any) => {
        console.log('Handling', data);
        this._partner = data.source;
        this._addHandlers();
      });
    } else {
      jsonStream.filter((data: any) => {
        return data.type === 'init' && data.target === this._name;
      })
      .subscribe((data: any) => {
        console.log('Offering connection', data);
        this._addHandlers();
        this._signal({
          type: 'start',
          source: this._name,
          target: this._partner
        });
      });
    }
    jsonStream.filter((data: any) => {
      return data.type ==='signal';
    }).subscribe((data: any) => {
      this._peer.signal(data.data);
    });
    this._ws.connectionEvents.filter((e: boolean) => e)
      .subscribe(() => {
        this._signal({
          type: 'init',
          source: this._name,
          target: this._partner
        });
      });
  }

  send(command: Command) {
    // Send if connected & drop all others
    // TODO: buffer the input
    if (this._connected) {
      this._peer.send(command.serialize());
    }
    return Observable.create((observer: Observer<any>) => observer.complete());
  }

  private _addHandlers() {
    this._peer = new (Peer as any)({ initiator: this._provider.isInitiator });
    this._peer.on('signal', (data: any) => {
      this._signal({
        type: 'signal',
        target: this._partner,
        source: this._name,
        data
      });
    });

    this._peer.on('connect', () => {
      console.log('CONNECT');
      this._connectionEventsEmitter.next(true);
      this._connected = true;
    });

    this._peer.on('data', (data: any) => {
      console.log('got a message from peer: ' + data);
      this._emitter.next(data);
    });

    // Reconnect somehow...
    this._peer.on('error', (err: any) => {
      console.log('error', err);
      this._connectionEventsEmitter.next(false);
    });
  }

  private _signal(data: any) {
    let command = new SignalingCommand();
    command.payload = new JsonPayload();
    command.payload.setData(data);
    this._ws.send(command);
  }
}
