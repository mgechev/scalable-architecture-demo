import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { SinglePlayerComponent } from './single-player/single-player.component';
import { MultiPlayerComponent } from './multi-player/components/multi-player.component';

export const appRouting: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'single-player',
    component: SinglePlayerComponent
  },
  {
    path: 'multi-player',
    component: MultiPlayerComponent
  }
];
