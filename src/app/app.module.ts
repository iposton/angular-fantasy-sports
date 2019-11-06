import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing/app-routing.module';

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
import { OrderBy } from './pipes/orderby.pipe';

import { HomeComponent } from './modules/home/home.component';
import { StartingFiveComponent } from './modules/starting-five/starting-five.component';
import { StartingLineComponent } from './modules/starting-line/starting-line.component';
import { TouchesComponent } from './modules/touches/touches.component';
import { StartingPitcherComponent } from './modules/starting-pitcher/starting-pitcher.component';
import { PitchingStatsComponent, MyDialog } from './modules/pitching-stats/pitching-stats.component';
import { StartingGoaliesComponent, Info, TodayDialog, LastweekDialog, LoginDialog } from './modules/starting-goalies/starting-goalies.component';
import { YesterdayResultsComponent, InfoYesterday } from './modules/yesterday-results/yesterday-results.component';
import { TomorrowResultsComponent, InfoTomorrow, TomorrowDialog } from './modules/tomorrow-results/tomorrow-results.component';

// import { ShareModule } from 'ng2share/share.module';


// const routes: Routes = [
//  {
//         path: '',
//         redirectTo: 'all-sports',
//         pathMatch: 'full'
//  },
//  { 
//        path: 'all-sports', 
//        component: HomeComponent 
//  },
//  { 
//         path: 'starting-pitchers', 
//         component: StartingPitcherComponent 
//  },
//  { 
//         path: 'pitching-stats', 
//         component: PitchingStatsComponent 
//  },
//  { 
//         path: 'nfl-line-rank', 
//         component: StartingLineComponent 
//  },
//  { 
//         path: 'nfl-touches', 
//         component: TouchesComponent 
//  },
//  {
//         path: 'starting-goalies-yesterday',
//         component: YesterdayResultsComponent
//   },
//   {
//         path: 'starting-goalies-tomorrow',
//         component: TomorrowResultsComponent
//   },
//   {
//         path: 'starting-goalies',
//         component: StartingGoaliesComponent
//   },
//   {
//         path: 'starting-five',
//         component: StartingFiveComponent
//   }

// ];

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
    HomeComponent,
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
    AppRoutingModule
  ],
  providers: [],
  entryComponents: [
   MyDialog, Info, InfoYesterday, InfoTomorrow, TodayDialog, LastweekDialog, TomorrowDialog, LoginDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
