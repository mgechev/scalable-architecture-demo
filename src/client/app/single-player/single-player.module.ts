import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { SinglePlayerComponent } from './single-player.component';

@NgModule({
  imports: [SharedModule],
  declarations: [SinglePlayerComponent],
  exports: [SinglePlayerComponent]
})
export class SinglePlayerModule {}
