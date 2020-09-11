import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NFLDataService } from '../../services/index';
import { isPlatformBrowser } from '@angular/common';
import { Observable, interval, forkJoin } from 'rxjs';
import * as CryptoJS from 'crypto-js';
let headers = null;

@Component({
  selector: 'app-nfl-starters',
  templateUrl: './nfl-starters.component.html',
  styleUrls: ['./nfl-starters.component.scss']
})
export class NflStartersComponent implements OnInit {
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular";

  constructor(private dataService: NFLDataService,
    private http: HttpClient) { }

  loadData() {

    // this.dataService
    //   .getEnv().subscribe(res => {
    //     let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
    //     let originalText = bytes.toString(CryptoJS.enc.Utf8);
    //     headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));

    //     this.dataService
    //       .sendHeaderOptions(headers, 1, this.apiRoot);

    //     this.dataService
    //       .getSchedule(1).subscribe(res => {
    //         //console.log(res, "schedule...");

    //         if (res['games'].length === 0) {
    //           this.loading = false;
    //           this.noGamesToday = true;
    //           this.noGamesMsg = "There Are No Games Scheduled Today :(";
    //           console.log('There are no games being played today.');
    //         } else {
    //           this.dailySchedule = res['games'];
    //           this.teamRef = this.teams; //res['references'].teamReferences;
    //           this.gameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime;
    //           this.gamesToday = true;
    //           //console.log(this.dailySchedule, 'sched');
            
    //           forkJoin(
    //               res['games'].map(
    //                 g => 
                    
    //                  this.http.get(`${this.apiRoot}/games/`+g['schedule'].id+`/lineup.json?position=Offense-RB-1,Offense-TE-1,Offense-QB-1,Offense-WR-1`, { headers })
                    
    //               )
    //             )
    //             .subscribe(res => {
    //               let i = null;
    //               let i2 = null;
    //               let res2 = null;
    //               let game2 = null;
    //               let score2 = null;
    //               let originalStart = null;
    //               let gameDay = null;
                
                  
    //             res.forEach((item, index) => {
    //                 //console.log(this.dailySchedule[i], 'score for games');
    //                 //console.log(res, 'got starting lineups data!');
    //                 i = index;
    //                 try {
    //                   game2 = res[i]['game'];
    //                   res2 = res[i]['teamLineups'];
    //                   score2 = this.dailySchedule[i].score;
    //                 } catch {
    //                   console.log('bad endpoint');
    //                 }

    //                 res2.forEach((item, index) => {
    //                   gameDay = new Date(this.gameDate);
    //                   originalStart = game2.originalStartTime != null ? new Date(game2.originalStartTime) : new Date(game2.startTime);
    //                   //console.log(gameDay.getDay(), 'game day', originalStart.getDay(), 'original start', game2.homeTeam.abbreviation);
    //                   if (gameDay.getDay() === originalStart.getDay() || game2.playedStatus === 'COMPLETED' || game2.playedStatus === 'LIVE') {
    //                     i2 = index;
    //                     if (res2[i2].actual != null && res2[i2].expected != null) {

    //                       for (let position of res2[i2].actual.lineupPositions) {
    //                          //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
    //                        if (position.player != null) {
    //                           this.gameStarter = {
    //                             playerID: position.player.id,
    //                             name: position.player.lastName,
    //                             team: res2[i2].team.id,
    //                             gameID: game2.id,
    //                             score: score2,
    //                             status: game2.playedStatus,
    //                             scheduleStatus: game2.scheduleStatus,
    //                             position: position['position'],
    //                             startType: 'actual'
    //                           }
    //                           if (position['position'] === 'P') {
    //                             this.gameStarters.push(this.gameStarter);
    //                             this.starterIdData.push(position.player.id);
    //                           } else {
    //                             this.gameBatters.push(this.gameStarter);
    //                             this.batterIdData.push(position.player.id);
    //                           }
    //                        } 
    //                       }
                         
    //                       playerString = this.starterIdData.join();
    //                       batterString = this.batterIdData.join(); 
  
    //                     } else if (res2[i2].actual == null && res2[i2].expected != null) {
    //                       //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
    //                       for (let position of res2[i2].expected.lineupPositions) {
    //                         //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
    //                        if (position.player != null) {
    //                         this.gameStarter = {
    //                           playerID: position.player.id,
    //                           name: position.player.lastName,
    //                           team: res2[i2].team.id,
    //                           gameID: game2.id,
    //                           score: score2,
    //                           status: game2.playedStatus,
    //                           scheduleStatus: game2.scheduleStatus,
    //                           position: position['position'],
    //                           startType: 'expected'
    //                         }
    //                         if (position['position'] === 'P') {
    //                           this.gameStarters.push(this.gameStarter);
    //                           this.starterIdData.push(position.player.id);
    //                         } else {
    //                           this.gameBatters.push(this.gameStarter);
    //                           this.batterIdData.push(position.player.id);
    //                         }
    //                       }   
    //                      }
    //                       playerString = this.starterIdData.join(); 
    //                       batterString = this.batterIdData.join();       
    //                     } 
    //                   }
    //                 });
    //               });

    //               this.sortData();

    //             }, (err: HttpErrorResponse) => {
                  
    //               console.log(err, 'error getting lineup');

    //           });

    //         }
    //       }, (err: HttpErrorResponse) => {

    //         console.log(err, 'error getting schedule');

    //       });
    //   });
  }

  ngOnInit(): void {
    this.loadData();
  }

}
