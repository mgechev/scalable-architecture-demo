import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { SinglePlayerComponent } from './single-player.component';

@NgModule({
  imports: [SharedModule, CommonModule],
  declarations: [SinglePlayerComponent],
  exports: [SinglePlayerComponent]
})
export class SinglePlayerModule {}
