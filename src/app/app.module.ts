import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { TransferStateInterceptor } from './interceptors/transfer-state.interceptor';
//angularfire2/auth
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { OrderBy } from './pipes/orderby.pipe';

import { HomeComponent } from './modules/home/home.component';
import { StatLeadersComponent } from './modules/stat-leaders/stat-leaders.component';
import { StartingFiveComponent } from './modules/starting-five/starting-five.component';
// import { StartingLineComponent } from './modules/starting-line/starting-line.component';
// import { TouchesComponent, LastweekNFLDialog } from './modules/touches/touches.component';
import { StartingPitcherComponent } from './modules/starting-pitcher/starting-pitcher.component';
// import { PitchingStatsComponent, MyDialog } from './modules/pitching-stats/pitching-stats.component';
import { StartingGoaliesComponent } from './modules/starting-goalies/starting-goalies.component';
//import { YesterdayResultsComponent, InfoYesterday } from './modules/yesterday-results/yesterday-results.component';
//import { TomorrowResultsComponent, InfoTomorrow, TomorrowDialog } from './modules/tomorrow-results/tomorrow-results.component';
import { MinuteSecondsPipe } from './pipes/minute-seconds.pipe';
import { ServiceWorkerModule } from '@angular/service-worker';
import { GoogleAnalyticsGtagComponent } from './components/google-analytics-gtag/google-analytics-gtag.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SortByPipe } from './pipes/sort-by.pipe';
import { StatCardComponent } from './components/stat-card/stat-card.component';
import { TeamRankComponent } from './components/team-rank/team-rank.component';
import { StatToggleComponent } from './components/stat-toggle/stat-toggle.component';
import { PositionCardComponent } from './components/position-card/position-card.component';
import { TeamScheduleComponent } from './components/team-schedule/team-schedule.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';

@NgModule({
  declarations: [
    AppComponent,
    StartingPitcherComponent,
    OrderBy,
    StartingGoaliesComponent,
    StartingFiveComponent,
    HomeComponent,
    StatLeadersComponent,
    MinuteSecondsPipe,
    GoogleAnalyticsGtagComponent,
    SpinnerComponent,
    SortByPipe,
    StatCardComponent,
    TeamRankComponent,
    StatToggleComponent,
    PositionCardComponent,
    TeamScheduleComponent,
    DialogComponent,
    DatePickerComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TransferStateInterceptor,
      multi: true
    }
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
