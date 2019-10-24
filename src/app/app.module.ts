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

import { StartingFiveComponent } from './starting-five/starting-five.component';
import { StartingLineComponent } from './starting-line/starting-line.component';
import { TouchesComponent } from './touches/touches.component';
import { StartingPitcherComponent } from './starting-pitcher/starting-pitcher.component';
import { PitchingStatsComponent, MyDialog } from './pitching-stats/pitching-stats.component';
import { StartingGoaliesComponent, Info, TodayDialog, LastweekDialog, LoginDialog } from './starting-goalies/starting-goalies.component';
import { YesterdayResultsComponent, InfoYesterday } from './yesterday-results/yesterday-results.component';
import { TomorrowResultsComponent, InfoTomorrow, TomorrowDialog } from './tomorrow-results/tomorrow-results.component';

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
        path: 'nfl-line-rank', 
        component: StartingLineComponent 
 },
 { 
        path: 'nfl-touches', 
        component: TouchesComponent 
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
  ,
  {
        path: 'starting-five',
        component: StartingFiveComponent
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
    StartingLineComponent,
    StartingFiveComponent,
    TomorrowResultsComponent,
    YesterdayResultsComponent,
    TouchesComponent,
    Info,
    InfoYesterday,
    InfoTomorrow,
    TodayDialog,
    LastweekDialog,
    TomorrowDialog,
    LoginDialog
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
