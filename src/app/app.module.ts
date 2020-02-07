import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SvgTimerComponent } from './svg-timer/svg-timer.component';
import { PvTextfieldComponent } from './pv-textfield/pv-textfield.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgTimerComponent,
    PvTextfieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
