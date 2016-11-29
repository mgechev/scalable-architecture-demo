import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'sd-timer',
  template: '<div>{{ timer | async }} sec.</div>'
})
export class TimerComponent {
  time: number = 0;
  timer: Observable<number>;
  private _interval: any;
  private _observer: Observer<number>;

  reset() {
    if (this._observer) {
      this._observer.next(0);
    }
    this.time = 0;
    clearInterval(this._interval);
  }

  start() {
    this.timer = new Observable<number>((observer: Observer<number>) => {
      this._observer = observer;
      observer.next(this.time);
      this._interval = setInterval(() => {
        this.time += 10;
        observer.next(this.time);
      }, 10);
    });
  }
}
