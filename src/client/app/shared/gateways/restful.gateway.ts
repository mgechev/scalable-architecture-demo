import { Injectable } from '@angular/core';
import { Response, ResponseOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/merge';

import { RestfulCommand } from '../commands/restful.command';
import { Gateway } from './base.gateway';

@Injectable()
export class RestfulGateway extends Gateway {
  send(command: RestfulCommand): Observable<any> {
    return Observable.create((observer: Observer<any>) => {
      const ok = Math.random() <= 0.99;
      const response = new Response(new ResponseOptions({
        body: null,
        status: ok ? 200 : 500,
        headers: null,
        statusText: null,
        type: null,
        url: null
      }));
      return ok ? observer.next(response) : observer.error(response);
    });
  }
}
