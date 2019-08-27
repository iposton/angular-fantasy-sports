import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout'

import { MatCardModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatGridListModule, 
        MatToolbarModule, 
        MatSnackBarModule, 
        MatButtonModule, 
        MatTabsModule, 
        MatMenuModule,
        MatListModule,
        MatInputModule,
        MatChipsModule,
        MatTooltipModule,
        MatDialogModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatSortModule,
        MatTableModule, 
        MatSidenavModule } from '@angular/material';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';


import { OrderBy } from './orderby.pipe';
import { StartingPitcherComponent } from './starting-pitcher/starting-pitcher.component';
import { PitchingStatsComponent, MyDialog } from './pitching-stats/pitching-stats.component';
import { StartingGoaliesComponent, Info, TodayDialog, LastweekDialog, LoginDialog } from './starting-goalies/starting-goalies.component';
import { YesterdayResultsComponent, InfoYesterday } from './yesterday-results/yesterday-results.component';
import { TomorrowResultsComponent, InfoTomorrow, TomorrowDialog } from './tomorrow-results/tomorrow-results.component';
import { BaseballPlayerComponent } from './baseball-player/baseball-player.component';
// import { ShareModule } from 'ng2share/share.module';


const routes: Routes = [
 {
        path: '',
        redirectTo: 'all-sports',
        pathMatch: 'full'
 },
 { 
        path: 'all-sports', 
        component: StartingPitcherComponent 
 },
 { 
        path: 'pitching-stats', 
        component: PitchingStatsComponent 
 },
 {
        path: 'starting-goalies-yesterday',
        component: YesterdayResultsComponent
  },
  {
        path: 'starting-goalies-tomorrow',
        component: TomorrowResultsComponent
  },
  {
        path: 'starting-goalies',
        component: StartingGoaliesComponent
  },
  {
        path: 'daily-stats/:id',
        component: BaseballPlayerComponent
      
   }

 
];

@NgModule({
  declarations: [
    AppComponent,
    StartingPitcherComponent,
    OrderBy,
    MyDialog,
    PitchingStatsComponent,
    StartingGoaliesComponent,
    TomorrowResultsComponent,
    YesterdayResultsComponent,
    Info,
    InfoYesterday,
    InfoTomorrow,
    TodayDialog,
    LastweekDialog,
    TomorrowDialog,
    LoginDialog,
    BaseballPlayerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    MatCardModule, 
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule, 
    MatToolbarModule, 
    MatSnackBarModule, 
    MatButtonModule, 
    MatTabsModule, 
    MatMenuModule,
    MatListModule,
    MatInputModule,
    MatChipsModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule, 
    MatSidenavModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  entryComponents: [
   MyDialog, Info, InfoYesterday, InfoTomorrow, TodayDialog, LastweekDialog, TomorrowDialog, LoginDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
