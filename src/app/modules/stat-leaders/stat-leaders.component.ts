import { Component, OnInit, Output, EventEmitter, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NBADataService, UtilService, GoogleAnalyticsService } from '../../services/index';
import { DatePipe, PercentPipe, DecimalPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { interval, forkJoin } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

let headers = null;
let playerString = null;
let today = new Date();
let teamRef = [];
let teams = null;
let starterNames = {
  'Starter1': 'Starter1',
  'Starter2': 'Starter2',
  'Starter3': 'Starter3',
  'Starter4': 'Starter4',
  'Starter5': 'Starter5',
  'Bench1': 'Bench1',
  'Bench2': 'Bench2'
}
let benchNames = {
  'Bench1': 'Bench1',
  'Bench2': 'Bench2'
}

@Component({
  selector: 'app-stat-leaders',
  templateUrl: './stat-leaders.component.html',
  styleUrls: ['./stat-leaders.component.scss']
})
export class StatLeadersComponent implements OnInit {

  public dailySchedule: Array <any>;
  public teamRef: Array <any>;
  public previousGames: Array <any>;
  public players: Array <any>;
  public allSentData: Array <any>;
  public teamStats: Array <any>;
  public pitcherSpeed: Array <any>;
  public starterIdData: Array <any> = [];
  public benchIdData: Array <any> = [];
  public specificFastballData: Array <any> = [];
  public specificFastballDataById: Array <any> = [];
  public speedResults: Array <any> = [];
  public gameDate: any;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nba/2019-2020-regular";
  public showData: Array <any> = [];
  public playerInfo: Array <any>;
  public groups: Array <any>;
  public tsGroups: Array <any>;
  public schedGroups: Array <any>;
  public lineGroups: Array <any>;
  public myData: Array <any>;
  public benchData: Array <any>;
  public dailyStats: Array <any>;
  public benchStats: Array <any>;
  public weekStats: Array <any>;
  public score: Array <any>;
  public gamesToday: boolean = false;
  public noGamesToday: boolean = false;
  public loading: boolean = true;
  public loadingPrevious: boolean = true;
  public liveGames: boolean = false;
  public gameover: boolean = false;
  public postponed: boolean = false;
  public noGamesMsg: string = '';
  public errMessage: string = '';
  public teamSchedule: { team: string, schedule: [] };
  public pitcherspeed: { pitcher: string, pitchspeedStart: string, lastName: string };
  public teamSchedules: Array <any> = [];
  public teamsCompletedPlayingToday: Array <any> = [];
  public selectedWeek: string;
  public tsDate: any;
  public teams: any;
  public dRank: Array <any> = [];
  public oRank: Array <any> = [];
  public tRank: Array <any> = [];
  public gameStarter: { currentTeam: string, gameID: string, playerID: string, score: any, status: any, scheduleStatus: any, playerStatus: any, bench: boolean };
  public gameStarters: Array <any> = [];
  public benchStarters: Array <any> = [];
  public maxD = new Date(today.getTime() + (24 * 60 * 60 * 1000));
  public mobile: boolean = false;
  public stats: any = '1';
  public twitter: boolean = false;
  public selected: any;
  public playerImages: any;
  public tomorrowDate: any;
  public startersSection: boolean = false;
  public positionSection: boolean = true;
  public scheduleSection: boolean = false;
  public weekResults: boolean = false;

  constructor(private dataService: NBADataService, 
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private util: UtilService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public gaService: GoogleAnalyticsService) {
    //this.allSentData = this.dataService.getSentStats();
    //this.players = this.allSentData[0];
    //this.myData = this.allSentData[1];
    //this.dailySchedule = this.allSentData[2];
    this.stats = '1';
    this.teams = this.util.getNBATeams();
    this.playerImages = this.util.getNBAImages();
    teams = this.teams;
    let thisDate = new Date();
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
  }

  public compareDate (start) {
    if (new Date(start) < this.tomorrowDate) {
      return true;
    } else {
      return false;
    }
  }

  public changeStats() {
    this.gaService.eventEmitter("nba player stats", "nba", "stats", "click", 10);
    if (this.stats === '1') {
      this.stats = '2';
    } else if (this.stats === '2') {
      this.stats = '3';
    } else if (this.stats === '3') {
      this.stats = '4';
    } else if (this.stats === '4') {
      this.stats = '5';
    } else if (this.stats === '5') {
      this.stats = '6';
    } else if (this.stats === '6') {
      this.stats = '1';
    }
  }

  public colorLuminance(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
  
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }
  
    return rgb;
  }

  public getBackground(color) {
    let lighter = this.colorLuminance(color, 0.6);
    if (color === "#c4ced4") {
      color = "#000000";
      lighter = "#555555";
    }    
    if (color === "#000000")
      lighter = "#555555";

    return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(${color}, ${lighter})`);
  }


  public getByDate(event) {
    this.loading = true;
    let thisDate = new Date(event.value);
    let utcDate = new Date(thisDate.toUTCString());
    utcDate.setHours(utcDate.getHours());
    let myDate = new Date(utcDate);
    let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
    console.log(dailyDate, 'get stats for this selected date');
    this.dataService.selectedDate(dailyDate);

    //empty old data on data change 
    this.dailySchedule = [];
    this.gameStarters = [];
    this.benchStarters = [];
    this.starterIdData = [];
    this.benchIdData = [];
    playerString = null;
    this.dailyStats = [];
    this.benchStats = [];
    this.myData = [];
    this.benchData = [];
    this.showData = [];
    this.specificFastballData = [];
    this.teamsCompletedPlayingToday = [];
    this.previousGames = [];
    this.score = [];
    this.players = [];
    this.speedResults = [];
    this.liveGames = false;
    this.gameover = false;
    this.postponed = false;
    this.gamesToday = false;
    this.noGamesMsg = '';
    this.loadData();
  }

  loadData() {

    this.dataService
      .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));

        this.dataService
          .sendHeaderOptions(headers);

        this.dataService
          .getSchedule().subscribe(res => {
            console.log(res, "schedule...");

            if (res['games'].length === 0) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "There Are No Games Scheduled Today :(";
              console.log('There are no games being played today.');
            } else {
              if (res['games'][0].schedule.playedStatus === "LIVE") {
                this.liveGames = true;
                console.log('interval set...');
              }
              this.dailySchedule = res['games'];
              this.teamRef = res['references'].teamReferences;
              teamRef = res['references'].teamReferences;
              console.log(this.teamRef, 'tream ref');
              this.gameDate = res['games'][0].schedule.startTime && res['games'][0].schedule.scheduleStatus != 'POSTPONED' ? res['games'][0].schedule.startTime : new Date();
              let dPipe = new DatePipe("en-US");

              this.gamesToday = true;
              this.sortData();
              //console.log(this.dailySchedule, 'sched');
              // let d = new Date();
              // let gd = new Date(this.gameDate);
              // if (this.teamSchedules.length === 0) {
              //   let team;
              //   let teamSchedule;
              //   const nbaTeamsArray = Object.values(teams);
              //   forkJoin(
              //     nbaTeamsArray.map(
              //       g => 
                    
              //        this.http.get(`${this.apiRoot}/games.json?team=${g['abbreviation']}&date=from-20200309-to-20200315`, { headers })
                    
              //     )
              //   )
              //   .subscribe(res => {
              //     //console.log(res, 'get team schedules...');

              //     res.forEach((item, index) => {
              //       team = nbaTeamsArray[index]['abbreviation'];
              //       //team = teamRef[index].abbreviation;
              //       teamSchedule = {
              //         team: team,
              //         schedule: res[index]['games'],
              //         teamInfo: nbaTeamsArray[index]
              //       }
              //       this.teamSchedules.push(teamSchedule);
              //       //console.log(this.teamSchedules, 'schedules array...');

              //     })
                  

              //    // this.sortData();

              //   }, (err: HttpErrorResponse) => {
                  
              //     console.log(err, 'error getting schedule');

              // });

              // } else {
              //   //this.sortData();
              // }

            }

          //   forkJoin(
          //     res['games'].map(
          //       g => 
                
          //        this.http.get(`${this.apiRoot}/games/`+g['schedule'].id+`/lineup.json`, { headers })
                
          //     )
          //   )
          //   .subscribe(res => {
          //     let i = null;
          //     let i2 = null;
          //     let res2 = null;
          //     let game2 = null;
          //     let score2 = null;
            
              
          //   res.forEach((item, index) => {
          //       //console.log(this.dailySchedule[i], 'score for games');
          //       //console.log(res, 'got starting lineups data!');
          //       i = index;
          //       if (res[i]['game'].playedStatus != "UNPLAYED") {
          //         this.liveGames = true;
          //         console.log('interval set...');
          //       }
                 
          //       try {
          //         game2 = res[i]['game'];
          //         res2 = res[i]['teamLineups'];
          //         score2 = this.dailySchedule[i].score;
          //       } catch {
          //         console.log('bad endpoint');
          //       }

          //       res2.forEach((item, index) => {

          //         i2 = index;
          //         //console.log(res2[i2], 'looking of starters');
                  
          //         if (res2[i2].actual != null && res2[i2].expected != null)  {
          //           //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
          //           res2[i2].actual.lineupPositions.forEach(item => {
          //             //console.log(item, 'whats up');
          //             if (starterNames[item.position] && item.player != null) {
          //               this.gameStarter = {
          //                 currentTeam: res2[i2]['team'].abbreviation,
          //                 playerID: item.player.id,
          //                 gameID: game2.id,
          //                 score: score2,
          //                 status: game2.playedStatus,
          //                 scheduleStatus: game2.scheduleStatus,
          //                 playerStatus: 'actual',
          //                 bench: true ? benchNames[item.position] : false
          //               }
          //               this.gameStarters.push(this.gameStarter);
          //               this.starterIdData.push(item.player.id);
          //               playerString = this.starterIdData.join();
          //             }
          //             // if (benchNames[item.position]) {
          //             //   this.gameStarter = {
          //             //     playerID: item.player.id,
          //             //     gameID: game2.id,
          //             //     score: score2,
          //             //     status: game2.playedStatus,
          //             //     scheduleStatus: game2.scheduleStatus,
          //             //     playerStatus: 'actual'
          //             //   }
          //             //   this.benchStarters.push(this.gameStarter);
          //             //   this.benchIdData.push(item.player.id);
          //             //   benchString = this.benchIdData.join();
          //             // }
          //           })

          //         } else if (res2[i2].actual == null && res2[i2].expected != null) {

          //             res2[i2].expected.lineupPositions.forEach(item => {
          //              // console.log(item, 'whats up');
          //               if (starterNames[item.position] && item.player != null) {
          //                 this.gameStarter = {
          //                   currentTeam: res2[i2]['team'].abbreviation,
          //                   playerID: item.player.id,
          //                   gameID: game2.id,
          //                   score: score2,
          //                   status: game2.playedStatus,
          //                   scheduleStatus: game2.scheduleStatus,
          //                   playerStatus: 'expected',
          //                   bench: true ? benchNames[item.position] : false
          //                 }
          //                 this.gameStarters.push(this.gameStarter);
          //                 this.starterIdData.push(item.player.id);
          //                 playerString = this.starterIdData.join();
          //               }
          //             })
          //           //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
                   
                    
          //         } else {
          //           //console.log(res2[i2].team.Name, 'player is not expected or actual yet...');
          //         }

          //       });
          //     });

          //     this.sortData();

          //   }, (err: HttpErrorResponse) => {
              
          //     console.log(err, 'error getting lineup');

          // });
          }, (err: HttpErrorResponse) => {

            console.log(err, 'error getting schedule');

          });
      });

  }

  public async sortData() {
    if (this.gamesToday === true) {
      // let promiseDaily;
      // promiseDaily = new Promise((resolve, reject) => {
      //   this.dataService
      //     .getDaily(playerString).subscribe(res => {
      //       console.log(res, "Daily stats...");
      //       this.dailyStats = res['gamelogs'];
      //       resolve();
      //   })
      //   // this.dataService
      //   //   .getDaily(benchString).subscribe(res => {
      //   //     console.log(res, "Daily bench stats...");
      //   //     this.benchStats = res['gamelogs'];
      //   //     resolve();
      //   // })
      // });

      let promiseOne;
      promiseOne = new Promise((resolve, reject) => {
        this.dataService
          .getTeamStats(this.tsDate).subscribe(res => {
            console.log(res, 'got team stats!');
            this.teamStats = res['teamStatsTotals'];

            // this.dataService
            //  .getDaily(playerString).subscribe(res => {
            //    console.log(res, "Daily stats...");
            //    this.dailyStats = res['gamelogs'];
            // })

        //     let oSort = [];
        //     let dSort = [];
        //     let dRank = [];
        //     let oRank = [];
        //     let tRank = [];
        //     oSort = res['teamStatsTotals'];
        //     dSort = res['teamStatsTotals'];

        //     this.dataService
        //       .getWeek(this.selectedWeek).subscribe(res => {
        //         console.log(res, "weekly games...");
        //         this.weekStats = res['gamelogs'];
        //     });
            
        //     dRank = dSort.slice().sort((a: any, b: any) => {

        //       if (this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek)) {
        //         console.log(a['team'].abbreviation, 'had a bye');
        //       }

        //       if (a['stats'].standings.pointsAgainst +
        //       (this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(a['stats'].standings.pointsAgainst / (parseInt(this.selectedWeek) - 1)) : 0)
        //        <= b['stats'].standings.pointsAgainst +
        //        (this.byes[b['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(b['stats'].standings.pointsAgainst / (parseInt(this.selectedWeek) - 1)) : 0)) {
        //         return -1;
        //       } else if (a['stats'].standings.pointsAgainst +
        //       (this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(a['stats'].standings.pointsAgainst / (parseInt(this.selectedWeek) - 1)) : 0)
        //        >= b['stats'].standings.pointsAgainst +
        //        (this.byes[b['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(b['stats'].standings.pointsAgainst / (parseInt(this.selectedWeek) - 1)) : 0)) {
        //         return 1;
        //       } else {
        //         return 0;
        //       }
        //     });

        //     dRank.forEach(function(item, index){
        //       for (let team of teamRef) {
        //        if (dRank[index].team.abbreviation === team.abbreviation) { 
        //          team.dRank = index + 1; 
        //        }
        //       }
        //     });

        //     oRank = oSort.slice().sort((a: any, b: any) => {
        //       if (a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) +
        //       (this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)) : 0)
        //       >= b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards) + 
        //       (this.byes[b['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)) : 0)) {
        //         return -1;
        //       } else if (a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) +
        //       (this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)) : 0)
        //       <= b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards) + 
        //       (this.byes[b['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)) : 0)) {
        //         return 1;
        //       } else {
        //         return 0;
        //       }
        //     });
            
        //    oRank.forEach(function(item, index){
        //     for (let team of teamRef) {
        //      if (oRank[index].team.abbreviation === team.abbreviation) { 
        //        team.oRank = index + 1; 
        //      }
        //     }
        //    });

        //    tRank = teamRef.slice().sort((a: any, b: any) => {
  
        //     if ((a.oRank + a.dRank)
        //     <= (b.oRank + b.dRank)) {
        //       return -1;
        //     } else if ((a.oRank + a.dRank)
        //     >= (b.oRank + b.dRank)) {
        //       return 1;
        //     } else {
        //       return 0;
        //     }
        //   });
          
        //  tRank.forEach(function(item, index){
        //   for (let team of teamRef) {
        //    if (tRank[index].abbreviation === team.abbreviation) { 
        //      team.teamRank = index + 1; 
        //    }
        //   }
        //  });
        //     console.log(tRank, 'first index should be least points against');
        //     this.dRank = dRank;
        //     this.oRank = oRank;
        //     this.tRank = tRank;
            resolve();
        });
      });
      // let resultTwo = await promiseDaily;
      let resultOne = await promiseOne;
      this.dataService
       .getAllStats().subscribe(res => {

          console.log(res, 'player info');
          console.log(this.gameStarters, 'game starters');
          const nbaTeamsArray = Object.values(this.teams);

          this.myData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5 && player.stats.offense.pts > 200);

            for (let starter of this.gameStarters) {
              for (let data of this.myData) {
  
                if (starter.playerID === data.player.id) {
                  data.starterInfo = starter;
                  data.player['currentTeam'].abbreviation = starter.currentTeam;
                  data.player.lineupTeam = starter.currentTeam;
                  if (starter.status === "LIVE") {
                    //run interval
                    this.liveGames = true;
                    
                  }
                }     
              }
            }

          for (let schedule of this.dailySchedule) {
            for (let sdata of this.myData) {

              if (schedule.schedule.awayTeam.abbreviation === sdata.team.abbreviation) {
                sdata.player.gameTime = schedule.schedule.startTime;
                sdata.team.gameField = schedule.schedule.venue.name;
                sdata.gameId = schedule.schedule.id;
                sdata.player.gameLocation = "away";
                sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;
                sdata.team.abbreviation = schedule.schedule.awayTeam.abbreviation;
                sdata.team.opponentId = schedule.schedule.homeTeam.id;
              }
              if (schedule.schedule.homeTeam.abbreviation === sdata.team.abbreviation) {
                sdata.player.gameTime = schedule.schedule.startTime;
                sdata.team.gameField = schedule.schedule.venue.name;
                sdata.gameId = schedule.schedule.id;
                sdata.player.gameLocation = "home";
                sdata.team.opponent = schedule.schedule.awayTeam.abbreviation;
                sdata.team.abbreviation = schedule.schedule.homeTeam.abbreviation;
                sdata.team.opponentId = schedule.schedule.awayTeam.id;
              }
              if (sdata.player.officialImageSrc == null) {
                sdata.player.officialImageSrc = this.playerImages[sdata.player.id] != null ? this.playerImages[sdata.player.id].image : null;
              }
            }
          }
          
          for (let team of nbaTeamsArray) {
            for (let data of this.myData) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                // data.team.color = team['teamColoursHex'][0];
                // data.team.accent = team['teamColoursHex'][1];
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                data.flip = 'inactive';
                // data.dRank = team.dRank;
                // data.oRank = team.oRank;
                // data.teamRank = team.teamRank; //Math.floor(((team.dRank*1 + team.oRank*1) /2));
              }
              
            }  
         }
         
         for (let team of this.teamSchedules) {
          for (let data of this.myData) { 
            if (data.player['currentTeam'] != null && team.team === data.player['currentTeam'].abbreviation && data.player['currentTeam'].id === data.team.id) {
              data.team.gamesThisWeek = team['schedule'].length;
              data.team.weekSchedule = team['schedule'];
            } 
          }  
         }

         

          // if (this.myData && this.dailyStats) {
          //   console.log('start sorting data for daily stats...');
          //   for (let daily of this.dailyStats) {
          //     for (let data of this.myData) {
          //       if (daily.player.id === data.player.id) {
          //         data.player.tpm = daily.stats.fieldGoals.fg3PtMade;
          //         data.player.stl = daily.stats.defense.stl;
          //         data.player.blk = daily.stats.defense.blk;
          //         data.player.pts = daily.stats.offense.pts;
          //         data.player.ast = daily.stats.offense.ast;
          //         data.player.reb = daily.stats.rebounds.reb;
          //         data.player.ptsAvg = daily.stats.offense.ptsPerGame;
          //         data.player.fga = daily.stats.fieldGoals.fgAtt;
          //         data.player.min = Math.floor(daily.stats.miscellaneous.minSeconds / 60);
          //         //data.player.startsdaily.stats.miscellaneous.gamesStarted
          //         // data.player.minAvg = Math.floor(daily.stats.miscellaneous.minSecondsPerGame / 60);
          //       }
          //     }
          //   }
          // }

          for (let team of this.teamStats) {
            for (let data of this.myData) { 
               if (data.team.opponentId != null && 
                 data.team.id === team.team.id) {
                 data.win = team.stats.standings.wins;
                 data.loss = team.stats.standings.losses;
               } else if (data.player.lineupTeam === team.team.abbreviation) { 
                 data.win = team.stats.standings.wins;
                 data.loss = team.stats.standings.losses;
               }
             }  
          }
       

          this.groups = this.myData.reduce(function (r, a) {
            r[a.player['currentTeam'].abbreviation] = r[a.player['currentTeam'].abbreviation] || [];
            r[a.player['currentTeam'].abbreviation].push({'of': 'of', 'playerObj': a});
            return r;
           }, Object.create(null));

                      // this.tsGroups = this.teamStats.reduce(function (r, a) {
                      //   r[a.team.abbreviation] = r[a.team.abbreviation] || [];
                      //   r[a.team.abbreviation].push(a);
                      //   return r;
  
                      // }, Object.create(null));

                      // this.schedGroups = this.teamSchedules.reduce(function (r, a) {
                      //   r[a.team] = r[a.team] || [];
                      //   r[a.team].push(a);
                      //   return r;
  
                      // }, Object.create(null));

          this.lineGroups = Object.keys(this.groups).map((key, index) => {
              return {team: key, offensePlayers: this.groups[key].filter(item => item.of)};
          });

          this.showTeams();

      })

    } else {
      console.log('No games then no daily stats either. :(');
    }

  }

  public showTeams() {
    this.showData = this.lineGroups;

     console.log(this.showData, 'show data');
     this.dataService
       .sendStats(this.showData, this.myData, this.dailySchedule);

       this.loading = false;
  }

  public goAnchor(data) {
    let anchor = "";
    anchor = data;
    if (data === 'top') {
      document.querySelector("div[id="+anchor+"]").scrollIntoView();
    } else {
      document.querySelector("mat-card[id="+anchor+"]").scrollIntoView({behavior: "smooth"});
    } 
  }

  flipBack(data) {
    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';
  }

  getPreviousGameStats(data) {

    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';
    this.loadingPrevious = false;
    console.log(data, 'this player has been flipped data...');
    //console.log(this.previousGames, 'previous games find player id');
   // for (let game of this.previousGames) {
     // if (game['schedule'].awayTeam.abbreviation === data.team.abbreviation ||
      ///  game['schedule'].homeTeam.abbreviation === data.team.abbreviation) {

      //  let prevHome = game['schedule'].homeTeam.abbreviation === data.team.abbreviation ? true : false;

        // this.dataService
        //  .getScore(game['schedule'].id).subscribe(res => {

        //    console.log(res, 'score of this previous game');

        //    let players = null;

        //    if (prevHome)
        //      players = res.stats.home.players;
        //    else
        //      players = res.stats.away.players;

        //    for (let item of players) {
        //      if (item.player.id === data.player.id) {
        //         this.getAverages(game['schedule'].id);
        //         let stats = item.playerStats[0].pitching;
        //         console.log(stats, 'stats for', data.player.lastName);
        //         data.pgBlurb1 = (prevHome ? ' vs ' + game['schedule'].awayTeam.abbreviation : ' @ ' +  game['schedule'].homeTeam.abbreviation) + ': ' + stats.pitchesThrown + ' pitches, ' + stats.hitsAllowed + ' hits allowed, sat down ' + stats.pitcherStrikeouts;
        //         data.homeruns1 = stats.homerunsAllowed;
        //         data.previousEra1 = parseFloat(stats.earnedRunAvg).toFixed(2);
        //         data.previousWin1 = stats.wins;
        //         data.previousL1 = stats.losses;
        //         data.previousSO1 = stats.pitcherStrikeouts;
        //         data.walks1 = stats.pitcherWalks;
        //      }
        //    }

        // })

      //  this.http.get(`${this.apiRoot}/games/`+game['schedule'].id+`/playbyplay.json`, { headers })
      // .subscribe(res => {
      //       console.log(res, 'got play by play game data for ' + data.player.lastName);

      //     if (res != null) {}

      //   })
//
   //   }
   // }
   
  }

  // public getAverages(gid) {

  //   this.http.get(`${this.apiRoot}/games/`+gid+`/playbyplay.json`, { headers })
  //     .subscribe(res => {
  //         console.log(res, 'got play by play game data for ');

  //         if (res != null) {

  //         if (res['atBats'] != null) {

  //         res['atBats'].forEach((item2, index) => {

  //            if (item2 != null && item2.atBatPlay.length > 0)
  //              item2.atBatPlay.forEach((item3, index) => {
  //              let f = item3;

  //              if (f.pitch != undefined && f.pitch.ballStartSpeed != undefined) {
  //                //console.log(f.pitch);
  //                this.pitcherspeed = {
  //                  pitcher: f.pitch.pitchingPlayer.id,
  //                  pitchspeedStart: f.pitch.ballStartSpeed,
  //                  lastName: f.pitch.pitchingPlayer.lastName,
  //                }
  //                this.specificFastballData.push(this.pitcherspeed);

     
  //              }

  //            })
  //          })

  //          this.speedResults = this.specificFastballData.reduce(function(r, a) {
  //            r[a.pitcher] = r[a.pitcher] || [];
  //            r[a.pitcher].push(a.pitchspeedStart);
  //            return r
  //          }, Object.create(null));
  //          console.log('made groups of pichers pitch speeds by ID...');

  //        }
  //        this.myData.forEach((data, index) => {


  //          if (this.speedResults[data.player.id]) {
  //            let avg = this.speedResults[data.player.id].reduce((r, a) => {

  //              return r + parseInt(a);

  //            }, 0) / this.speedResults[data.player.id].length;

  //            let max = this.speedResults[data.player.id].reduce(function(a, b) {
  //              return Math.max(a, b);
  //            });

  //            data.player.pitchSpeedAvg = Math.floor(avg);
  //            data.player.fastestPitch = max;

  //            }

  //         });

  //       }
  //      }, (err: HttpErrorResponse) => {

  //           console.log(err, 'error getting playbyplay');

  //      });

  // }


  public getGameStats(data, gid) {
    //console.log(data, 'whats going on');

    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';
   
    this.dataService
      .getScore(gid).subscribe(res => {
       
          if (res != null) {
            console.log(res, "Score, Game...");
            this.score = res['scoring'];
            let game = null;
            // game = res['game'].playedStatus; //"COMPLETED" playedStatus: "COMPLETED_PENDING_REVIEW"

            // if (data.player.gameLocation === 'home') {
            //   data.team.teamScore = this.score['homeScoreTotal'];
            //   data.team.opponentScore = this.score['awayScoreTotal'];
            // } else if (data.player.gameLocation === 'away') {
            //   data.team.teamScore = this.score['awayScoreTotal'];
            //   data.team.opponentScore = this.score['homeScoreTotal'];
            // }

            // data.team.currentInning = this.score['currentInning'];
            // data.team.currentInningHalf = this.score['currentInningHalf'];
            // data.gameStatus = game;
            // //console.log(game, 'is game over?');
            // if (game === "COMPLETED" || game === "COMPLETED_PENDING_REVIEW") {
            //   data.team.isGameOver = true;
            //   data.team.isGameInProgress = false;
            //   data.team.isGameUnplayed = false;
            // } else {
            //   data.team.isGameInProgress = true;
            //   data.team.isGameUnplayed = true;
            //   data.team.isGameOver = false;
            // }

        }

   }, (err: HttpErrorResponse) => {

     console.log(err, 'error getting boxscore');

   });
    console.log(`${this.apiRoot}/games/`+gid+`/playbyplay.json`);
    this.http.get(`${this.apiRoot}/games/`+gid+`/playbyplay.json`, { headers })
      .subscribe(res => {
            console.log(res, 'got play by play game data for ' + data.player.lastName);

        //  if (res != null) {

         // if (res['atBats'] != null) {

         //  res['atBats'].forEach((item2, index) => {

         //     //console.log(item2, 'atbatplay items...');
         //     if (data.team.abbreviation === item2.battingTeam.abbreviation)
         //      data.isTeamPitching = false;
         //     else 
         //       data.isTeamPitching = true;
         //     data.battingTeam = item2.battingTeam.abbreviation;
         //     if (item2 != null && item2.atBatPlay.length > 0)
         //       item2.atBatPlay.forEach((item3, index) => {
         //       let f = item3;

         //       if (f.pitch != undefined && f.pitch.ballStartSpeed != undefined) {
         //         //console.log(f.pitch);
         //         this.pitcherspeed = {
         //           pitcher: f.pitch.pitchingPlayer.id,
         //           pitchspeedStart: f.pitch.ballStartSpeed,
         //           lastName: f.pitch.pitchingPlayer.lastName,
         //         }
         //         this.specificFastballData.push(this.pitcherspeed);

         //         data.batter = f.pitch.battingPlayer.firstName +' '+ f.pitch.battingPlayer.lastName; //id: 16046, firstName: "Tommy", lastName: "Edman", position: "2B", jerseyNumber: 19}
         //         data.pitcher = f.pitch.pitchingPlayer.firstName +' '+ f.pitch.pitchingPlayer.lastName; //id: 12389, firstName: "Josh", lastName: "Hader", position: "P", jerseyNumber: 71}
         //         data.pitchResult = f.pitch.result; //"IN_PLAY_OUTS"
         //         data.throwType = f.pitch.throwType; //"FOUR_SEAM_FASTBALL"
         //         data.throwHand = f.pitch.throwingLeftOrRight; //"L"
         //         data.throwSpeed = f.pitch.ballStartSpeed;

         //         if (data.battingTeam !== data.team.abbreviation 
         //           && data.pitcher !== data.player.firstName + ' ' + data.player.lastName)
         //           data.isPitchingRightNow = false;
         //         else 
         //           data.isPitchingRightNow = true;
     
         //       }

         //       if (f.playStatus  != undefined && f.playStatus != null) {
         //             //console.log(f.playStatus, 'play status');
         //             data.team.ballCount = f.playStatus.ballCount;
         //             data.team.strikeCount = f.playStatus.strikeCount;
         //             data.team.outCount = f.playStatus.outCount;

         //            if (f.playStatus['batter'] != null) {
         //               data.batter = f.playStatus['batter'].firstName + ' ' + f.playStatus['batter'].lastName;
         //            }
         //            if (f.playStatus['firstBaseRunner'] != null) {
         //              data.firstBaseRunner = f.playStatus['firstBaseRunner'].firstName + ' ' + f.playStatus['firstBaseRunner'].lastName;
         //            }
         //            if (f.playStatus['secondBaseRunner'] != null) {
         //              data.secondBaseRunner = f.playStatus['secondBaseRunner'].firstName + ' ' + f.playStatus['secondBaseRunner'].lastName;
         //            }
         //            if (f.playStatus['thirdBaseRunner'] != null) {
         //              data.thirdBaseRunner = f.playStatus['thirdBaseRunner'].firstName + ' ' + f.playStatus['thirdBaseRunner'].lastName;
         //            }
         //            data.pitcher = f.playStatus.pitcher['firstName'] + ' ' + f.playStatus.pitcher['lastName'];
         //       }

         //      if (f.batterUp  != undefined && f.batterUp != null) {
         //       data.battingFrom = f.batterUp.standingLeftOrRight;
         //       data.batResult = f.batterUp.result;  
         //      }

         //     })
         //   })

         //   this.speedResults = this.specificFastballData.reduce(function(r, a) {
         //     r[a.pitcher] = r[a.pitcher] || [];
         //     r[a.pitcher].push(a.pitchspeedStart);
         //     return r
         //   }, Object.create(null));
         //   console.log('made groups of pichers pitch speeds by ID...');

         // }
        //  this.myData.forEach((data, index) => {


        //    if (this.speedResults[data.player.id]) {
        //      let avg = this.speedResults[data.player.id].reduce((r, a) => {

        //        return r + parseInt(a);

        //      }, 0) / this.speedResults[data.player.id].length;

        //      let max = this.speedResults[data.player.id].reduce(function(a, b) {
        //        return Math.max(a, b);
        //      });

        //      data.player.pitchSpeedAvgToday = Math.floor(avg);
        //      data.player.fastestPitchToday = max;

        //      }

        //   });

        // //}
       }, (err: HttpErrorResponse) => {

            console.log(err, 'error getting playbyplay');

       });

  }

  public open(event, data, type) {
    this.gaService.eventEmitter("nba player info "+(data.playerObj ? data.playerObj.player.lastName : data.player.lastName), "nbatwitter", "tweet", "click", 10);
    data.area = type;
    this.selected = data;
    console.log(data, 'ok you clicked on player img...');
    // this.dialog.open(NBATodayDialog, {
    //   data: data,
    //   width: '600px',
    // });
  }

  openSnackBar() {
    // this.snackBar.openFromComponent(NBAInfo, {
    //   // duration: 500,
    // });
  }

  ngOnInit() {
    if (window.innerWidth < 700) { // 768px portrait
      this.mobile = true;
    }
     if (this.players === undefined) {
      this.loadData();
      console.log('fetch data on init...');
      // get our data every subsequent 10 minutes
      const MILLISECONDS_IN_TEN_MINUTES = 600000;
      interval(MILLISECONDS_IN_TEN_MINUTES)
        .subscribe(() => {
          console.log('starting interval on init...');
          if (this.gamesToday === true && this.liveGames === true) {
            this.loadData();
            // this.dataService
            //   .getSchedule().subscribe(res => {
            //     console.log(res, "schedule...");
            //     if (res['games'].length === 0) {
            //       this.loading = false;
            //       this.noGamesToday = true;
            //       this.noGamesMsg = "There Are No Games Scheduled Today :(";
            //       console.log('There are no games being played today.');
            //     } else {
            //       this.dailySchedule = res['games'];
            //     }
            
            //   this.dataService
            //     .getDaily(playerString).subscribe(res => {
            //       console.log(res, "Daily stats...");
            //       this.dailyStats = res['gamelogs'];

            //       // if (this.myData && this.dailySchedule) {
            //       //   console.log('start sorting sched data...');     
            //       // }

            //     if (this.myData && this.dailyStats) {
            //         console.log('getting daily stats again, live update...');
            //         for (let daily of this.dailyStats) {
            //           for (let data of this.myData) {
            //             if (daily.player.id === data.player.id) {
            //               data.player.pts = daily.stats.offense.pts;
            //               data.player.ptsAvg = daily.stats.offense.ptsPerGame;
            //               data.player.min = Math.floor(daily.stats.miscellaneous.minSeconds / 60);
            //               // data.player.minAvg = Math.floor(daily.stats.miscellaneous.minSecondsPerGame / 60);
            //             }
            //           }
            //         }
            //     }
            //   })
            // })

          } else {
            console.log('No games or all complete, nothing to update...');
          }
        });
        
      
      
     } else {
        this.loading = false;
        this.showData = this.players;
        this.gameDate = this.showData[0].offensePlayers[0].playerObj['player'].gameTime;

        for (let p of this.players) {
          if (p.playingRightNow === true) {
            this.liveGames = true;
          } 
          if (p.playingOver === true) {
            this.gameover = true;
          }
        }
     }
  }

}

// @Component({
//   selector: 'nba-today-dialog',
//   template: `<i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
//   <span style="color:#00aced;">Twitter Updates!</span> 
//   <mat-dialog-content>
//   <span style="font-size: 26px; font-weight: light; color: #555; text-align: center;">{{ noPosts }}</span>
//   <ul *ngFor="let item of tweetsData" style="font-size:14px">
//     <li>{{item.text}} <span style="color:#6740B4; font-weight: bold;">{{item.created_at | date:'fullDate'}}</span></li>
// </ul>
// </mat-dialog-content>`,
// })

// export class NBATodayDialog implements OnInit {
//   noPosts: any;
//   tweetsData: any;
//   constructor(public dialogRef: MatDialogRef < NBATodayDialog > , @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

//   }

//   loadStuff() {
//     let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');

//     this.http.post('/authorize', {headers}).subscribe((res) => {
//       this.searchCall();
//     })


//   }

//   searchCall() {
//     console.log(this.data, 'data passed in');

//     let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');
//     //let searchterm = 'query=#startingGoalies #nhl ' + this.data.player.FirstName + ' ' + this.data.player.LastName;
//     let searchterm = null;
//     if (this.data.area === 'top') {
//       searchterm = 'query=' + this.data.playerObj.player.lastName + ' ' + teams[this.data.playerObj.player['currentTeam'].abbreviation].twitter;
//     } else {
//       searchterm = 'query=' + this.data.player.lastName + ' ' + teams[this.data.player['currentTeam'].abbreviation].twitter;
//     }


//     this.http.post('/search', searchterm, {headers}).subscribe((res) => {
//        console.log(res['data'].statuses, 'twitter stuff');
//       this.tweetsData = res['data'].statuses;
//       if (this.tweetsData.length === 0) {
//         this.noPosts = "No Tweets.";
//       }
//     });
//   }

//   ngOnInit() {
//     this.loadStuff();
//   }
// }

// @Component({
//   selector: 'nba-info',
//   template: `<i (click)="close()" class="material-icons close">close</i><br />
//   <span style="color: orange;"><i class="material-icons md-18" style="background: #fff; border-radius: 50%;">check_circle</i></span> = Expected Starter <br />
//   <span style="color: #2ecc71;"><i class="material-icons md-18" style="background: #fff; border-radius: 50%;">check_circle</i></span> = Confirmed Starter <br />
// <span>Click on player image for twitter updates!</span> <br />
// <span>Click on player stats for MORE stats!</span>`,
//   styles: [`.close { float:right; cursor:pointer; font-size: 20px; } .green-dot { height: 10px; width: 10px; background:#2ecc71; border-radius: 50%; display: inline-block; }`]
// })

// export class NBAInfo {
//   constructor(public snackBar: MatSnackBar) {}
//   close() {
//     this.snackBar.dismiss();
//   }
// }