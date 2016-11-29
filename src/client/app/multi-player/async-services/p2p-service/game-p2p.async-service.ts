import { Injectable } from '@angular/core';
import { Store, Action } from '@ngrx/store';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { buildP2PCommand } from './index';
import { PROGRESS, COMPLETE } from './command-builders/game-p2p.commands';
import { WebRTCGateway } from '../../gateways/webrtc.gateway';
import { AsyncService } from '../../../shared/async-services/base.async-service';
import { RPCCommand } from '../../commands/rpc.command';
import { JsonPayload } from '../../../shared/commands/payloads/json.command.payload';
import { P2PGameActions } from '../../actions/action-creators/p2p-game.action-creators';

@Injectable()
export class GameP2PService extends AsyncService {
  constructor(private _rtcGateway: WebRTCGateway, private _store: Store<any>) {
    super();
    _rtcGateway.dataStream
      .map((data: any) => JSON.parse(data.toString()))
      .subscribe((command: any) => {
        switch (command.method) {
          case PROGRESS:
            _store.dispatch(P2PGameActions.partnerProgress(command.payload.text));
            break;
          case COMPLETE:
            _store.dispatch(P2PGameActions.partnerCompleted());
            break;
        }
      });
  }

  process(action: Action) {
    let baseCommand = new RPCCommand();
    baseCommand.payload = new JsonPayload();
    baseCommand.gateway = this._rtcGateway;
    let commandBuilder = buildP2PCommand(action);
    if (!commandBuilder) {
      console.warn('This command is not supported');
      return Observable.create((obs: Observer<any>) => obs.complete());
    } else {
      return commandBuilder(baseCommand).invoke();
    }
  }
}
