import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';

import { appRouting } from './app.routing';

import { SharedModule } from './shared/shared.module';
import { SinglePlayerModule } from './single-player/single-player.module';
import { MultiPlayerModule } from './multi-player/multi-player.module';

/**
 * Note that the example doesn't implement lazy loading.
 * 
 * It can be easily achieved by producing three bundles:
 * 
 * 1. app.bundle.ts - includes all the common modules and the bootstrap functionality.
 * 2. single-player.bundle.ts - includes all the logic for the single player feature.
 * 3. multi-player.bundle.ts - includes all the logic for the multi player feature.
 * 
 * In case we apply lazy loading we'll have to replace the reducer associated to our store.
 * For further reading take a look at this issue: https://github.com/ngrx/store/issues/197
 */
@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [
    SharedModule,
    SinglePlayerModule,
    MultiPlayerModule,
    BrowserModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRouting)
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
