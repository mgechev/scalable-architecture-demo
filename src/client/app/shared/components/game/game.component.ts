import {
  Component, Renderer, Input, ViewChild, ElementRef, Output, EventEmitter,
  AfterViewInit
} from '@angular/core';
import { TimerComponent } from '../timer/timer.component';
import { GameModel } from '../../models/game.model';

import 'rxjs/add/operator/scan';

@Component({
  selector: 'sd-game',
  template: `
    <section [hidden]="!(invalid() | async)">
      <h1>Your game is invalid!</h1>
      <img src="./app/assets/cheater.gif">
    </section>
    <section [hidden]="(invalid() | async)">
      <sd-timer #timer></sd-timer>
      <div class="game" #gameContainer>
        <div class="game-text">{{text}}</div>
        <textarea #textArea (keyup)="changeHandler($event.target.value)"></textarea>
      </div>
    </section>
  `,
  styles: [`
    .game textarea {
      font-size: 14px;
      width: 400px;
      height: 250px;
    }
    .game.wrong textarea {
      background-color: red;
      color: white;
    }
  `]
})
export class GameComponent implements AfterViewInit {
  @ViewChild('gameContainer') gameContainer: ElementRef;
  @ViewChild('textArea') textArea: ElementRef;
  @ViewChild('timer') timer: TimerComponent;
  @Input() text: string;
  @Output() end: EventEmitter<number> = new EventEmitter<number>();
  @Output() change: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _model: GameModel, private _renderer: Renderer) {}

  ngAfterViewInit() {
    setTimeout(() => {
      this._model.startGame();
      this.timer.start();
      this._renderer.invokeElementMethod(this.textArea.nativeElement, 'focus', []);
    }, 0);
  }

  changeHandler(data: string) {
    if (this.text === data) {
      this.end.emit(this.timer.time);
      this._model.completeGame(this.timer.time, this.text);
      this.timer.reset();
    } else {
      this._model.onProgress(data);
      if (this.text.indexOf(data) !== 0) {
        this._renderer.setElementClass(this.gameContainer.nativeElement, 'wrong', true);
      } else {
        this._renderer.setElementClass(this.gameContainer.nativeElement, 'wrong', false);
      }
    }
  }

  reset() {
    this.timer.reset();
    this.text = '';
  }

  invalid() {
    return this._model.game$
      .scan((accum: boolean, current: any) => {
        return (current && current.get('invalid')) || accum;
      }, false);
  }

}
