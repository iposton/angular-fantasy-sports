import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout'
import { MatCardModule, 
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
 import { DataService } from './data.service';
 import { YesterdayService } from './yesterday.service';
 import { TomorrowService } from './tomorrow.service';
 import { NhlDataService } from './nhl-data.service';


import { AppComponent } from './app.component';
import { StartingPitcherComponent } from './starting-pitcher/starting-pitcher.component';

import { masterFirebaseConfig } from './api-keys';

import { FirebaseService } from './firebase.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { OrderBy } from './orderby.pipe';
import { PitchingStatsComponent, MyDialog } from './pitching-stats/pitching-stats.component';
import { StartingGoaliesComponent, Info, TodayDialog, LastweekDialog, LoginDialog } from './starting-goalies/starting-goalies.component';
import { YesterdayResultsComponent, InfoYesterday } from './yesterday-results/yesterday-results.component';
import { TomorrowResultsComponent, InfoTomorrow, TomorrowDialog } from './tomorrow-results/tomorrow-results.component';
import { ShareModule } from 'ng2share/share.module';

export const firebaseConfig = {
  apiKey: masterFirebaseConfig.apiKey,
  authDomain: masterFirebaseConfig.authDomain,
  databaseURL: masterFirebaseConfig.databaseURL
};

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
    LoginDialog
    
  ],
  imports: [
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    MatGridListModule,
    MatToolbarModule,
    MatSnackBarModule,
    MatButtonModule, 
    MatTabsModule,
    MatMenuModule,
    MatSelectModule,
    MatDialogModule,
    MatListModule,
    MatChipsModule,
    MatTooltipModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSidenavModule,
    MatTableModule,
    MatSortModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    ShareModule,
    AngularFireModule.initializeApp(firebaseConfig),
    RouterModule.forRoot(routes)
  ],
  providers: [DataService, FirebaseService, TomorrowService, YesterdayService, NhlDataService],
  entryComponents: [
   MyDialog, Info, InfoYesterday, InfoTomorrow, TodayDialog, LastweekDialog, TomorrowDialog, LoginDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
