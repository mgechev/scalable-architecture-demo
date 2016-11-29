import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { appRouting } from './app.routing';

import { HomeComponent } from './home/home.component';

import { SharedModule } from './shared/shared.module';

import { SinglePlayerModule } from './single-player/single-player.module';
import { MultiPlayerModule } from './multi-player/multi-player.module';

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
