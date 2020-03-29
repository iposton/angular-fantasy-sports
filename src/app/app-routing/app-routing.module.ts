import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../modules/home/home.component';
import { StartingFiveComponent } from '../modules/starting-five/starting-five.component';
import { StartingLineComponent } from '../modules/starting-line/starting-line.component';
import { StatLeadersComponent } from '../modules/stat-leaders/stat-leaders.component';
import { TouchesComponent } from '../modules/touches/touches.component';
import { StartingPitcherComponent } from '../modules/starting-pitcher/starting-pitcher.component';
import { PitchingStatsComponent, MyDialog } from '../modules/pitching-stats/pitching-stats.component';
import { StartingGoaliesComponent, Info, TodayDialog, LastweekDialog, LoginDialog } from '../modules/starting-goalies/starting-goalies.component';
import { YesterdayResultsComponent, InfoYesterday } from '../modules/yesterday-results/yesterday-results.component';
import { TomorrowResultsComponent, InfoTomorrow, TomorrowDialog } from '../modules/tomorrow-results/tomorrow-results.component';

const routes: Routes = [
//   {
//          path: '',
//          redirectTo: '',
//          pathMatch: 'full'
//   },
  { 
        path: '', 
        component: HomeComponent 
  },
  { 
         path: 'starting-pitchers', 
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
   },
   {
         path: 'starting-five',
         component: StartingFiveComponent
   },
   {
       path: 'stat-leaders',
       component: StatLeadersComponent
   },
   {
          path: '**', 
          component: HomeComponent
   }
 
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
