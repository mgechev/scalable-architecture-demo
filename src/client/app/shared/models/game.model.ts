import { Inject, Injectable, Optional } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AsyncService } from '../async-services/base.async-service';
import { Model } from './base.model';
import { GameActions } from '../actions/action-creators/game.action-creator';

@Injectable()
export class GameModel extends Model {
  games$: Observable<any>;
  game$: Observable<any>;

  constructor(protected _store: Store<any>,
      @Optional() @Inject(AsyncService) _services: AsyncService[]) {
    super(_services || []);
    this.games$ = this._store.select('games');
    this.game$ = this._store.select('game');
  }

  startGame() {
    this._store.dispatch(GameActions.startGame());
  }

  onProgress(text: string) {
    this.performAsyncAction(GameActions.gameProgress(text, new Date()))
      .subscribe(() => {
        // Do nothing, we're all good
      }, () => {
        this._store.dispatch(GameActions.invalidateGame());
      });
  }

  completeGame(time: number, text: string) {
    this._store.dispatch(GameActions.completeGame(time, text));
    this.performAsyncAction(GameActions.completeGame(new Date(), text))
      .subscribe(
        () => console.log('Done!'),
        () => console.log('Done cheating!')
      );
  }
}
