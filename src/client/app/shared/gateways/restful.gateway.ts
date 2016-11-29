import { Injectable } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

import { GAME_TEXT } from '../../config/config';
import { RestfulCommand } from '../commands/restful.command';
import { Gateway } from './base.gateway';

// Mocking backend validation behavior.
@Injectable()
export class RestfulGateway extends Gateway {
  private _lastText = '';
  private _lastTime = new Date();

  send(command: RestfulCommand): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const currentText = (command as any).text;
      const currentTime = new Date((command as any).time);

      let status = 200;
      if (currentText.length - this._lastText.length > 10 && currentTime.getTime() - this._lastTime.getTime() < 2000) {
        status = 403;
      }

      this._lastText = currentText;
      this._lastTime = currentTime;

      if (GAME_TEXT === this._lastText) {
        this._lastText = '';
      }
      const response = new Response(new ResponseOptions({
        body: null,
        status,
        headers: null,
        statusText: null,
        type: null,
        url: null
      }));
      return status === 200 ? observer.next(response) : observer.error(response);
    });
  }
}
