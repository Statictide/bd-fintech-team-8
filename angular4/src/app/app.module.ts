import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterOutlet } from '@angular/router';
import { FormsModule }   from '@angular/forms';

import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import * as highcharts from 'highcharts';

import { Service } from '../services/service';
import { AppComponent } from './app.component';
import { Front } from '../pages/front/front';
import { Transactions } from '../pages/transactions/transactions';
import { Overview } from '../pages/overview/overview';
import { Bankbot } from '../pages/bankbot/bankbot';
import { SecretDirective } from './secret.directive';

export const routes: Routes = [
  { path: '', component: Front },
  { path: 'transactions', component: Transactions},
  { path: 'transactions/:id', component: Transactions },
  { path: 'bankbot', component: Bankbot },
  { path: 'overview', component: Overview }
];

export function highchartsFactory() {
  return highcharts;
}

@NgModule({
  declarations: [
    Front,
    Transactions,
    Overview,
    Bankbot,
    AppComponent,
    SecretDirective
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      routes
    ),
    ChartModule
  ],
  providers: [
    Service,
    {
      provide: HighchartsStatic,
      useFactory: highchartsFactory
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }