import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { SvgTimerComponent } from './svg-timer/svg-timer.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgTimerComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
