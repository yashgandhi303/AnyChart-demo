/// <reference path="../../node_modules/anychart/dist/index.d.ts"/>


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DemoDataProviderService } from './demo-data-provider.service';
import { ChartComponent } from './chart/chart.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DemoDataProviderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
