import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing/app-routing.module';

// import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
// import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
// import { MatTabsModule } from '@angular/material/tabs';
// import { MatMenuModule } from '@angular/material/menu';
// import { MatChipsModule } from '@angular/material/chips';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
// import { MatSelectModule } from '@angular/material/select';
// import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { MatSortModule } from '@angular/material/sort';
// import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
// import { MatInputModule } from '@angular/material/input';
// import { MatListModule } from '@angular/material/list';
// import { MatNativeDateModule } from '@angular/material/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
//angularfire2/auth
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { OrderBy } from './pipes/orderby.pipe';

import { HomeComponent } from './modules/home/home.component';
import { StatLeadersComponent } from './modules/stat-leaders/stat-leaders.component';
import { StartingFiveComponent, NBAInfo } from './modules/starting-five/starting-five.component';
// import { StartingLineComponent } from './modules/starting-line/starting-line.component';
// import { TouchesComponent, LastweekNFLDialog } from './modules/touches/touches.component';
import { StartingPitcherComponent } from './modules/starting-pitcher/starting-pitcher.component';
// import { PitchingStatsComponent, MyDialog } from './modules/pitching-stats/pitching-stats.component';
import { StartingGoaliesComponent, Info, TodayDialog, LastweekDialog, LoginDialog } from './modules/starting-goalies/starting-goalies.component';
import { YesterdayResultsComponent, InfoYesterday } from './modules/yesterday-results/yesterday-results.component';
import { TomorrowResultsComponent, InfoTomorrow, TomorrowDialog } from './modules/tomorrow-results/tomorrow-results.component';
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

// import { ShareModule } from 'ng2share/share.module';


@NgModule({
  declarations: [
    AppComponent,
    StartingPitcherComponent,
    OrderBy,
    StartingGoaliesComponent,
    StartingFiveComponent,
    TomorrowResultsComponent,
    YesterdayResultsComponent,
    HomeComponent,
    StatLeadersComponent,
    Info,
    NBAInfo,
    InfoYesterday,
    InfoTomorrow,
    TodayDialog,
    LastweekDialog,
    TomorrowDialog,
    LoginDialog,
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
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatGridListModule, 
    MatToolbarModule, 
    MatSnackBarModule, 
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  entryComponents: [
   Info, 
   NBAInfo, 
   InfoYesterday, 
   InfoTomorrow, 
   TodayDialog, 
   LastweekDialog, 
   TomorrowDialog, 
   LoginDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
