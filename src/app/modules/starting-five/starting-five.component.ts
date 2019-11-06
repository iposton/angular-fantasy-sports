import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NBADataService } from '../../services/index';
import { DatePipe, PercentPipe, DecimalPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, interval, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderBy } from '../../pipes/orderby.pipe';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

let headers = null;
let playerString = null;
let today = new Date();
let teamRef = [];
let starterNames = {
  'Starter1': 'Starter1',
  'Starter2': 'Starter2',
  'Starter3': 'Starter3',
  'Starter4': 'Starter4',
  'Starter5': 'Starter5'
}

@Component({
  selector: 'app-starting-five',
  templateUrl: './starting-five.component.html',
  styleUrls: ['./starting-five.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ],
})
export class StartingFiveComponent implements OnInit {

  public dailySchedule: Array <any>;
  public teamRef: Array <any>;
  public previousGames: Array <any>;
  public players: Array <any>;
  public teamStats: Array <any>;
  public pitcherSpeed: Array <any>;
  public starterIdData: Array <any> = [];
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
  public dailyStats: Array <any>;
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
  public byes: any;
  public dRank: Array <any> = [];
  public oRank: Array <any> = [];
  public tRank: Array <any> = [];
  public gameStarter: { gameID: string, playerID: string, score: any, status: any, scheduleStatus: any, playerStatus: any };
  public gameStarters: Array <any> = [];

  constructor(private dataService: NBADataService, 
              private http: HttpClient,
              private sanitizer: DomSanitizer) {
    this.players = this.dataService.getSentStats();

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

  public onChange(week) {
   this.loading = true;
   this.selectedWeek = week;
   this.dailySchedule = [];
   this.starterIdData = [];
   playerString = null;
   this.dailyStats = [];
   this.myData = [];
   this.showData = [];
   this.weekStats = [];
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

        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(res + ":" + 'MYSPORTSFEEDS'));

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
              this.gameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime;
              let dPipe = new DatePipe("en-US");

              this.gamesToday = true;
              //console.log(this.dailySchedule, 'sched');
              // let d = new Date();
              // let gd = new Date(this.gameDate);
              if (this.teamSchedules.length === 0) {
              //   let team;
              //   let teamSchedule;
              //   forkJoin(
              //     teamRef.map(
              //       g => 
                    
              //        this.http.get(`${this.apiRoot}/games.json?team=${g.abbreviation}`, { headers })
                    
              //     )
              //   )
              //   .subscribe(res => {
              //     //console.log(res, 'get team schedules...');

              //     res.forEach((item, index) => {
              //       team = teamRef[index].abbreviation;
              //       teamSchedule = {
              //         team: team,
              //         schedule: res[index]['games']
              //       }
              //       this.teamSchedules.push(teamSchedule);
              //       //console.log(this.teamSchedules, 'schedules array...');

              //     })
                  

              //    // this.sortData();

              //   }, (err: HttpErrorResponse) => {
                  
              //     console.log(err, 'error getting lineup');

              // });

              } else {
                //this.sortData();
              }

            }

            forkJoin(
              res['games'].map(
                g => 
                
                 this.http.get(`${this.apiRoot}/games/`+g['schedule'].id+`/lineup.json`, { headers })
                
              )
            )
            .subscribe(res => {
              let i = null;
              let i2 = null;
              let res2 = null;
              let game2 = null;
              let score2 = null;
            
              
            res.forEach((item, index) => {
                //console.log(this.dailySchedule[i], 'score for games');
                //console.log(res, 'got starting lineups data!');
                i = index;
                if (res[i]['game'].playedStatus != "UNPLAYED") {
                  this.liveGames = true;
                  console.log('interval set...');
                }
                 
                try {
                  game2 = res[i]['game'];
                  res2 = res[i]['teamLineups'];
                  score2 = this.dailySchedule[i].score;
                } catch {
                  console.log('bad endpoint');
                }

                res2.forEach((item, index) => {

                  i2 = index;
                  // console.log(res2[i2], 'looking of starters');
                  
                  if (res2[i2].actual != null && res2[i2].expected != null)  {
                    //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
                    res2[i2].actual.lineupPositions.forEach(item => {
                      if (starterNames[item.position]) {

                        this.gameStarter = {
                          playerID: item.player.id,
                          gameID: game2.id,
                          score: score2,
                          status: game2.playedStatus,
                          scheduleStatus: game2.scheduleStatus,
                          playerStatus: 'actual'
                        }
                        this.gameStarters.push(this.gameStarter);
                        this.starterIdData.push(item.player.id);
                        playerString = this.starterIdData.join();

                      }
                    })

                  } else if (res2[i2].actual == null && res2[i2].expected != null) {

                      res2[i2].expected.lineupPositions.forEach(item => {
                        if (starterNames[item.position]) {

                          this.gameStarter = {
                            playerID: item.player.id,
                            gameID: game2.id,
                            score: score2,
                            status: game2.playedStatus,
                            scheduleStatus: game2.scheduleStatus,
                            playerStatus: 'expected'
                          }
                          this.gameStarters.push(this.gameStarter);
                          this.starterIdData.push(item.player.id);
                          playerString = this.starterIdData.join();

                        }
                      })
                    //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
                   
                    
                  } else {
                    //console.log(res2[i2].team.Name, 'player is not expected or actual yet...');
                  }

                });
              });

              this.sortData();

            }, (err: HttpErrorResponse) => {
              
              console.log(err, 'error getting lineup');

          });
          }, (err: HttpErrorResponse) => {

            console.log(err, 'error getting schedule');

          });
      });

  }

  public async sortData() {
    if (this.gamesToday === true) {
      let promiseDaily;
      promiseDaily = new Promise((resolve, reject) => {
        this.dataService
          .getDaily(playerString).subscribe(res => {
            console.log(res, "Daily stats...");
            this.dailyStats = res['gamelogs'];
            resolve();
        })
      });

      let promiseOne;
      promiseOne = new Promise((resolve, reject) => {
        this.dataService
          .getTeamStats(this.tsDate).subscribe(res => {
            console.log(res, 'got team stats!');
            this.teamStats = res['teamStatsTotals'];

            this.dataService
             .getDaily(playerString).subscribe(res => {
               console.log(res, "Daily stats...");
               this.dailyStats = res['gamelogs'];
            })

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
      let resultTwo = await promiseDaily;
      let resultOne = await promiseOne;

      this.dataService
       .getStats(playerString).subscribe(res => {

          console.log(res, 'player info');
          console.log(this.gameStarters, 'game starters');

          this.myData = res['playerStatsTotals'];

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
            }
          }

          for (let team of teamRef) {
            for (let data of this.myData) { 
              if (team.id === data.team.id) {
                data.team.color = team.teamColoursHex[0];
                data.team.accent = team.teamColoursHex[1];
                data.team.logo = team.officialLogoImageSrc;
                data.team.city = team.city;
                data.team.name = team.name;
                data.flip = 'inactive';
                // data.dRank = team.dRank;
                // data.oRank = team.oRank;
                // data.teamRank = team.teamRank; //Math.floor(((team.dRank*1 + team.oRank*1) /2));
              } 
            }  
         }

          for (let starter of this.gameStarters) {
            for (let data of this.myData) {

              if (starter.playerID === data.player.id) {
                data.starterInfo = starter;
                if (starter.status === "LIVE") {
                  //run interval
                  this.liveGames = true;
                  
                }
              }     
            }
          }

          if (this.myData && this.dailyStats) {
            console.log('start sorting data for daily stats...');
            for (let daily of this.dailyStats) {
              for (let data of this.myData) {
                if (daily.player.id === data.player.id) {
                  data.player.pts = daily.stats.offense.pts;
                  data.player.ptsAvg = daily.stats.offense.ptsPerGame;
                  data.player.min = Math.floor(daily.stats.miscellaneous.minSeconds / 60);
                  // data.player.minAvg = Math.floor(daily.stats.miscellaneous.minSecondsPerGame / 60);
                }
              }
            }
          }

          for (let team of this.teamStats) {
            for (let data of this.myData) { 
               if (data.team.opponentId != null && 
                 data.team.id === team.team.id) {
                 data.win = team.stats.standings.wins;
                 data.loss = team.stats.standings.losses;
               }
             }  
          }
       

          this.groups = this.myData.reduce(function (r, a) {
            r[a.team.abbreviation] = r[a.team.abbreviation] || [];
            r[a.team.abbreviation].push({'of': 'of', 'playerObj': a});
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
       .sendStats(this.showData);

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
    console.log(data, 'whats going on');

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

  ngOnInit() {
     if (this.players === undefined) {
      this.loadData();
      console.log('fetch data on init...');
      // get our data every subsequent 10 minutes
      const MILLISECONDS_IN_TEN_MINUTES = 600000;
      interval(MILLISECONDS_IN_TEN_MINUTES)
        .subscribe(() => {
          console.log('starting interval on init...');
          if (this.gamesToday === true && this.liveGames === true) {
            this.dataService
              .getSchedule().subscribe(res => {
                console.log(res, "schedule...");
                if (res['games'].length === 0) {
                  this.loading = false;
                  this.noGamesToday = true;
                  this.noGamesMsg = "There Are No Games Scheduled Today :(";
                  console.log('There are no games being played today.');
                } else {
                  this.dailySchedule = res['games'];
                }
            
              this.dataService
                .getDaily(playerString).subscribe(res => {
                  console.log(res, "Daily stats...");
                  this.dailyStats = res['gamelogs'];

                  // if (this.myData && this.dailySchedule) {
                  //   console.log('start sorting sched data...');     
                  // }

                if (this.myData && this.dailyStats) {
                    console.log('getting daily stats again, live update...');
                    for (let daily of this.dailyStats) {
                      for (let data of this.myData) {
                        if (daily.player.id === data.player.id) {
                          data.player.pts = daily.stats.offense.pts;
                          data.player.ptsAvg = daily.stats.offense.ptsPerGame;
                          data.player.min = Math.floor(daily.stats.miscellaneous.minSeconds / 60);
                          // data.player.minAvg = Math.floor(daily.stats.miscellaneous.minSecondsPerGame / 60);
                        }
                      }
                    }
                }
              })
            })

          } else {
            console.log('No games or all complete, nothing to update...');
          }
        });
        
      
      
     } else {
        this.loading = false;
        this.showData = this.players;
        this.gameDate = this.showData[0].gamedate;

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
