import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../modules/home/home.component';
import { StartingFiveComponent } from '../modules/starting-five/starting-five.component';
import { StatLeadersComponent } from '../modules/stat-leaders/stat-leaders.component';
import { StartingPitcherComponent } from '../modules/starting-pitcher/starting-pitcher.component';
import { StartingGoaliesComponent } from '../modules/starting-goalies/starting-goalies.component';
import { NflStartersComponent } from '../modules/nfl-starters/nfl-starters.component';


const routes: Routes = [
//   {
//          path: '',
//          redirectTo: 'stat-leaders',
//          pathMatch: 'full'
//   },
  { 
        path: '', 
        component: HomeComponent 
  },
  { 
         path: 'mlb', 
         component: StartingPitcherComponent 
  },
   {
         path: 'nhl',
         component: StartingGoaliesComponent
   },
   {
         path: 'nba',
         component: StartingFiveComponent
   },
   {
         path: 'nfl',
         component: NflStartersComponent
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
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
