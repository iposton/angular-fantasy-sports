import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatNativeDateModule } from '@angular/material/core';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { OrderBy } from './pipes/orderby.pipe';

import { HomeComponent } from './modules/home/home.component';
import { StartingFiveComponent, NBATodayDialog, NBAInfo } from './modules/starting-five/starting-five.component';
import { StartingLineComponent } from './modules/starting-line/starting-line.component';
import { TouchesComponent, LastweekNFLDialog } from './modules/touches/touches.component';
import { StartingPitcherComponent } from './modules/starting-pitcher/starting-pitcher.component';
import { PitchingStatsComponent, MyDialog } from './modules/pitching-stats/pitching-stats.component';
import { StartingGoaliesComponent, Info, TodayDialog, LastweekDialog, LoginDialog } from './modules/starting-goalies/starting-goalies.component';
import { YesterdayResultsComponent, InfoYesterday } from './modules/yesterday-results/yesterday-results.component';
import { TomorrowResultsComponent, InfoTomorrow, TomorrowDialog } from './modules/tomorrow-results/tomorrow-results.component';

// import { ShareModule } from 'ng2share/share.module';


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
    NBAInfo,
    InfoYesterday,
    InfoTomorrow,
    TodayDialog,
    NBATodayDialog,
    LastweekDialog,
    LastweekNFLDialog,
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
    MatGridListModule, 
    MatToolbarModule, 
    MatSnackBarModule, 
    MatButtonModule,
    MatNativeDateModule,
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
   MyDialog, 
   Info, 
   NBAInfo, 
   InfoYesterday, 
   InfoTomorrow, 
   TodayDialog, 
   NBATodayDialog, 
   LastweekDialog, 
   LastweekNFLDialog, 
   TomorrowDialog, 
   LoginDialog
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
