import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NFLDataService } from '../nfl-data.service';
import { FirebaseService } from '../firebase.service';
import { DatePipe, PercentPipe, DecimalPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, interval, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderBy } from '../orderby.pipe';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/observable/forkJoin';

let headers = null;
let playerString = null;
let today = new Date();
let teamRef = [];
@Component({
  selector: 'app-starting-line',
  templateUrl: './starting-line.component.html',
  styleUrls: ['./starting-line.component.scss'],
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
export class StartingLineComponent implements OnInit {

  public dailySchedule: Array <any>;
  public teamRef: Array <any>;
  public dRank: Array <any>;
  public previousGames: Array <any>;
  public players: Array <any>;
  public teamStats: Array <any>;
  public pitcherSpeed: Array <any>;
  public starterIdData: Array <any> = [];
  public specificFastballData: Array <any> = [];
  public specificFastballDataById: Array <any> = [];
  public speedResults: Array <any> = [];
  public gameDate: any;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-2020-regular";
  public showData: Array <any> = [];
  public playerInfo: Array <any>;
  public groups: Array <any>;
  public tsGroups: Array <any>;
  public lineGroups: Array <any>;
  public myData: Array <any>;
  public dailyStats: Array <any>;
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
  public gameStarter: { gameID: string, playerID: string, score: any, status: any, scheduleStatus: any };
  public pitcherspeed: { pitcher: string, pitchspeedStart: string, lastName: string };
  public gameStarters: Array <any> = [];
  public teamsCompletedPlayingToday: Array <any> = [];
  public selectedWeek: string;

  constructor(
              private dataService: NFLDataService, 
              private http: HttpClient) {
    this.players = this.dataService.getSentStats();
    this.selectedWeek = '1';
  }

  public onChange(week) {
   this.loading = true;
   this.selectedWeek = week;
   this.dailySchedule = [];
   this.gameStarters = [];
   this.starterIdData = [];
   playerString = null;
   this.dailyStats = [];
   this.myData = [];
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

        //headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));

        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(res + ":" + 'MYSPORTSFEEDS'));

        this.dataService
          .sendHeaderOptions(headers);

        this.dataService
          .getSchedule(this.selectedWeek).subscribe(res => {
            console.log(res, "schedule...");

            if (res['games'].length === 0) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "There Are No Games Scheduled Today :(";
              console.log('There are no games being played today.');
            } else {

              this.dailySchedule = res['games'];
              this.teamRef = res['references'].teamReferences;
              teamRef = res['references'].teamReferences;
              console.log(this.teamRef, 'tream ref');
              this.gameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime;
              let dPipe = new DatePipe("en-US");

              this.gamesToday = true;
              //console.log(this.dailySchedule, 'sched');
              let d = new Date();
              let gd = new Date(this.gameDate);
              if (d.getDay() === gd.getDay()) {

               
                forkJoin(
                  res['games'].map(
                    g => 
                    
                     this.http.get(`${this.apiRoot}/games/`+g['schedule'].id+`/lineup.json?position=G,C,OT,NT,DT,DE`, { headers })
                    
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
                    try {
                      game2 = res[i]['game'];
                      res2 = res[i]['teamLineups'];
                      score2 = this.dailySchedule[i].score;
                    } catch {
                      console.log('bad endpoint');
                    }

                    res2.forEach((item, index) => {

                      i2 = index;
                      if (res2[i2].actual != null && res2[i2].expected != null) {
                        //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
                        this.gameStarter = {
                          playerID: res2[i2].actual.lineupPositions[0].player.id,
                          gameID: game2.id,
                          score: score2,
                          status: game2.playedStatus,
                          scheduleStatus: game2.scheduleStatus
                        }
                        this.gameStarters.push(this.gameStarter);
                        this.starterIdData.push(res2[i2].actual.lineupPositions[0].player.firstName+'-'+res2[i2].actual.lineupPositions[0].player.lastName);
                        playerString = this.starterIdData.join();

                      } else if (res2[i2].actual == null && res2[i2].expected != null) {
                        //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
                        this.gameStarter = {
                          playerID: res2[i2].expected.lineupPositions[0].player.id,
                          gameID: game2.id,
                          score: score2,
                          status: game2.playedStatus,
                          scheduleStatus: game2.scheduleStatus
                        }
                        this.gameStarters.push(this.gameStarter);
                        this.starterIdData.push(res2[i2].expected.lineupPositions[0].player.firstName+'-'+res2[i2].expected.lineupPositions[0].player.lastName);
                        playerString = this.starterIdData.join();
                        
                      } else {
                        //console.log(res2[i2].team.Name, 'player is not expected or actual yet...');
                      }

                    });
                  });

                  this.sortData();

                }, (err: HttpErrorResponse) => {
                  
                  console.log(err, 'error getting lineup');

              });

              } else {
                this.sortData();
              }

            }
          }, (err: HttpErrorResponse) => {

            console.log(err, 'error getting schedule');

          });

      });

  }

  public async sortData() {
    if (this.gamesToday === true) {

      let promiseOne;
      promiseOne = new Promise((resolve, reject) => {
        this.dataService
          .getTeamStats().subscribe(res => {
            console.log(res, 'got team stats!');
            this.teamStats = res['teamStatsTotals'];
            let oSort = [];
            let dSort = [];
            let dRank = [];
            let oRank = [];
            oSort = res['teamStatsTotals'];
            dSort = res['teamStatsTotals'];

            dRank = dSort.slice().sort((a: any, b: any) => {
              if (a['stats'].standings.pointsAgainst <= b['stats'].standings.pointsAgainst) {
                return -1;
              } else if (a['stats'].standings.pointsAgainst >= b['stats'].standings.pointsAgainst) {
                return 1;
              } else {
                return 0;
              }
            });

            dRank.forEach(function(item, index){
              for (let team of teamRef) {
               if (dRank[index].team.abbreviation === team.abbreviation) { 
                 team.dRank = index + 1; 
               }
              }
            });

            oRank = oSort.slice().sort((a: any, b: any) => {
              if (a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards)   >= b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards)) {
                return -1;
              } else if (a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) <= b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards)) {
                return 1;
              } else {
                return 0;
              }
            });
            
           oRank.forEach(function(item, index){
            for (let team of teamRef) {
             if (oRank[index].team.abbreviation === team.abbreviation) { 
               team.oRank = index + 1; 
             }
            }
           });
            console.log(oRank, 'first index should be least points against');
            resolve();
        });
      });

      let resultOne = await promiseOne;

      this.dataService
        .getDaily(this.selectedWeek).subscribe(res => {
            console.log(res, "Daily stats...");
            this.dailyStats = res['gamelogs'];

            this.dataService
              .getStats(playerString).subscribe(res => {

                  //this.myData = res['playerStatsTotals'];
                  this.myData = res['playerStatsTotals'].filter(
                  player => player.stats.miscellaneous && player.stats.miscellaneous['gamesStarted'] > 1);

                  if (this.myData) {
                    console.log(this.myData, "cumulative stats...");

                       console.log('start sorting data for real gameID by ID...');
                    
                      if (this.myData && this.dailySchedule) {
                        console.log('start sorting data for daily schedule...');
                        for (let schedule of this.dailySchedule) {

                          for (let sdata of this.myData) {

                            if (schedule.schedule.awayTeam.abbreviation === sdata.team.abbreviation) {

                              sdata.player.gameTime = schedule.schedule.startTime;
                              sdata.team.gameField = schedule.schedule.venue.name;
                              sdata.gameId = schedule.schedule.id;
                              sdata.player.gameLocation = "away";
                              sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;
                              //sdata.team.opponentCity = schedule.schedule.homeTeam.city;
                              sdata.team.opponentId = schedule.schedule.homeTeam.id;
                            }
                            if (schedule.schedule.homeTeam.abbreviation === sdata.team.abbreviation) {

                              sdata.player.gameTime = schedule.schedule.startTime;
                              sdata.team.gameField = schedule.schedule.venue.name;
                              sdata.gameId = schedule.schedule.id;
                              sdata.player.gameLocation = "home";
                              sdata.team.opponent = schedule.schedule.awayTeam.abbreviation;
                              //sdata.team.opponentCity = schedule.schedule.awayTeam.city;
                              sdata.team.opponentId = schedule.schedule.awayTeam.id;
                            }
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
                              data.dRank = team.dRank;
                              data.oRank = team.oRank;
                              data.teamRank = Math.floor(((team.dRank*1 + team.oRank*1) /2));
                            }
                          }  
                       }

                       for (let schedule of this.myData) {
                        for (let sdata of this.myData) {
                          if (sdata.team.opponentId != null && 
                            sdata.team.opponentId === schedule.team.id && 
                            sdata.gameId === schedule.gameId) {
                            sdata.team.opponentLogo = schedule.team.logo;
                            sdata.team.opponentName = schedule.team.name;
                            sdata.opponentDR = schedule.dRank;
                            sdata.opponentOR = schedule.oRank;
                            sdata.opponentTR = schedule.teamRank;
                            sdata.opponentColor = schedule.team.color;
                          }
                        }
                      }

                     this.groups = this.myData.reduce(function (r, a) {
                      r[a.team.abbreviation] = r[a.team.abbreviation] || [];
                       if (a.player.primaryPosition === 'NT' || a.player.primaryPosition === 'DT' || a.player.primaryPosition === 'DE') {
                         r[a.team.abbreviation].push({'def': 'def', 'playerObj': a});
                         return r;
                       } else {
                         r[a.team.abbreviation].push({'of': 'of', 'playerObj': a});
                        return r;
                       }
                          
                      }, Object.create(null));

                      this.tsGroups = this.teamStats.reduce(function (r, a) {
                        r[a.team.abbreviation] = r[a.team.abbreviation] || [];
                        r[a.team.abbreviation].push(a);
                        return r;
  
                      }, Object.create(null));

                      this.lineGroups = Object.keys(this.groups).map(key => {
                        return {team: key, offensePlayers: this.groups[key].filter(item => item.of), defensePlayers: this.groups[key].filter(item => item.def), teamStats: this.tsGroups[key][0].stats};
                      });

                     this.showTeams();

                  } else {
                      // this.showData = this.myData;
                      // this.dataService
                      //   .sendStats(this.showData);
                  }

                  this.loading = false;

                },
                (err: HttpErrorResponse) => {
                  if (err instanceof Error) {
                    console.log('api error', err.error.message);
                    // client-side error
                    this.loading = false;
                    this.errMessage = `An error occured ${err.error.message}`;
                  } else {
                    this.loading = false;
                    console.log('api error', err.message);
                    this.errMessage = `${err.status}. Sorry :( Please Try again.`;
                  }
                }
              );
          },
          (err: HttpErrorResponse) => {
            if (err instanceof Error) {
              console.log('api error', err.error.message);
              // client-side error
              this.loading = false;
              this.errMessage = `An error occured ${err.error.message}`;
            } else {
              this.loading = false;
              console.log('api error', err.message);
              this.errMessage = `${err.status}. Sorry :( Please Try again.`;
            }
          }
        );

    } else {
      console.log('No games then no daily stats either. :(');
    }

  }

  public showTeams() {
    this.showData = this.lineGroups;

     console.log(this.showData, 'show data');
     this.dataService
       .sendStats(this.showData);
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
    //   // get our data every subsequent 10 minutes
    //   const MILLISECONDS_IN_TEN_MINUTES = 600000;
    //   interval(MILLISECONDS_IN_TEN_MINUTES)
    //     .subscribe(() => {
    //       if (this.gamesToday === true) {
    //         this.dataService
    //           .getDaily(this.selectedWeek).subscribe(res => {
    //             console.log(res, "Daily stats updated!");
               
    //             this.dailyStats = res['gamelogs'];

    //               if (this.myData && this.dailySchedule) {
    //                   console.log('start sorting data for pitching opponent...');
                      
    //                     for (let gs of this.gameStarters) {

    //                       for (let data of this.myData) {

    //                       if (gs.playerID === data.player.id) {
    //                         data.gameId = gs.gameID;
    //                         data.score = gs.score;
    //                         data.gameStatus = gs.status;

    //                         if (gs.status !== "UNPLAYED") {
    //                           if (data.player.gameLocation === 'home') {
    //                             data.team.teamScore = gs.score['homeScoreTotal'];
    //                             data.team.opponentScore = gs.score['awayScoreTotal'];
    //                           } else if (data.player.gameLocation === 'away') {
    //                             data.team.teamScore = gs.score['awayScoreTotal'];
    //                             data.team.opponentScore = gs.score['homeScoreTotal'];
    //                           }
    //                           data.team.currentInning = gs.score['currentInning'];
    //                           data.team.currentInningHalf = gs.score['currentInningHalf'];
    //                         }
    //                         //console.log(game, 'is game over?');
    //                         if (gs.status === "COMPLETED" 
    //                           || gs.status === "COMPLETED_PENDING_REVIEW") {
    //                           data.team.isGameOver = true;
    //                           data.team.isGameInProgress = false;
    //                           data.team.isGameUnplayed = false;
    //                           this.liveGames = false;
    //                         } else {
    //                           data.team.isGameInProgress = true;
    //                           data.team.isGameUnplayed = true;
    //                           data.team.isGameOver = false;
    //                         }

    //                         if (gs.status === "LIVE") {
    //                           this.liveGames = true;
    //                         }
    //                       }

    //                     }

    //                   }
    //                 }

    //             if (this.myData && this.dailyStats) {
    //               console.log('start sorting data for daily stats...');
    //              // for (let daily of this.dailyStats) {
    //                // for (let mdata of this.myData) {

    //                   // if (daily.team.abbreviation === mdata.team.abbreviation) {
    //                   //       if (daily.stats.pitching.wins === 1 || daily.stats.pitching.losses === 1) {
    //                   //         this.gameover = true;
    //                   //         console.log(daily.team.abbreviation, 'this team has completed their game today...');
    //                   //         this.teamsCompletedPlayingToday.push(daily.team.abbreviation);
    //                   //       }
    //                   //     }

    //                   //     if (daily.player.id === mdata.player.id) {
    //                   //       if (daily.stats.pitching.pitcher2SeamFastballs >= 0 && daily.stats.pitching.pitcher4SeamFastballs >= 0 && daily.stats.pitching.pitcherChangeups >= 0 && daily.stats.pitching.pitcherCurveballs >= 0 && daily.stats.pitching.pitcherCutters >= 0 && daily.stats.pitching.pitcherSliders >= 0 && daily.stats.pitching.pitcherSinkers >= 0 && daily.stats.pitching.pitcherSplitters) {
    //                   //         mdata.player.favPitchToday = Math.max(daily.stats.pitching.pitcher2SeamFastballs, daily.stats.pitching.pitcher4SeamFastballs, daily.stats.pitching.pitcherChangeups, daily.stats.pitching.pitcherCurveballs, daily.stats.pitching.pitcherCutters, daily.stats.pitching.pitcherSliders, daily.stats.pitching.pitcherSinkers, daily.stats.pitching.pitcherSplitters);
    //                   //         mdata.player.favPitchPercentToday = Math.floor(mdata.player.favPitchToday / daily.stats.pitching.pitchesThrown * 100);
    //                   //       }
    //                   //       mdata.playerNotPlayingYet = false;
    //                   //       //this.liveGames = true;
    //                   //       mdata.player.playingToday = true;
    //                   //       mdata.player.winToday = daily.stats.pitching.wins;
    //                   //       mdata.player.loseToday = daily.stats.pitching.losses;
    //                   //       mdata.player.saveToday = daily.stats.pitching.saves;
    //                   //       mdata.player.inningsToday = daily.stats.pitching.inningsPitched;
    //                   //       mdata.player.earnedrunsToday = daily.stats.pitching.earnedRunsAllowed;
    //                   //       mdata.player.strikeoutsToday = daily.stats.pitching.pitcherStrikeouts;
    //                   //       mdata.player.hitsallowedToday = daily.stats.pitching.hitsAllowed;
    //                   //       mdata.player.pitchesthrownToday = daily.stats.pitching.pitchesThrown;
    //                   //       mdata.player.eraToday = daily.stats.pitching.earnedRunAvg;
    //                   //       mdata.stats.pitcher2SeamFastballsToday = daily.stats.pitching.pitcher2SeamFastballs;
    //                   //       mdata.stats.pitcher4SeamFastballsToday = daily.stats.pitching.pitcher4SeamFastballs;
    //                   //       mdata.stats.pitcherChangeupsToday = daily.stats.pitching.pitcherChangeups;
    //                   //       mdata.stats.pitcherCurveballsToday = daily.stats.pitching.pitcherCurveballs;
    //                   //       mdata.stats.pitcherCuttersToday = daily.stats.pitching.pitcherCutters;
    //                   //       mdata.stats.pitcherSlidersToday = daily.stats.pitching.pitcherSliders;
    //                   //       mdata.stats.pitcherSinkersToday = daily.stats.pitching.pitcherSinkers;
    //                   //       mdata.stats.pitcherSplittersToday = daily.stats.pitching.pitcherSplitters;
    //                   //       if (daily.stats.pitching.pitchesThrown > 0 && daily.stats.pitching.wins === 0 && daily.stats.pitching.losses === 0) {
    //                   //         mdata.playingRightNow = true;

    //                   //       } else if (daily.stats.pitching.pitchesThrown > 0 && daily.stats.pitching.wins === 1 || daily.stats.pitching.losses === 1) {
    //                   //         mdata.playingRightNow = false;
    //                   //         // mdata.playingOver = true;
    //                   //         this.gameover = true;
    //                   //       }
    //                   //     } else {

    //                   // }

    //               //   }
    //               // }

    //               if (this.teamsCompletedPlayingToday != null) {
    //                 for (let complete of this.teamsCompletedPlayingToday) {
    //                   for (let comdata of this.myData) {
    //                     if (comdata.team.abbreviation === complete) {
    //                       comdata.playingRightNow = false;
    //                       comdata.playingOver = true;
    //                     }

    //                   }
    //                 }
    //               }

    //             }
    //           })

    //       } else {
    //         console.log('No games then no daily stats either. :(');
    //       }
    //     });
     } else {
      this.loading = false;
      this.showData = this.players;
      this.gameDate = this.showData[0].gamedate;

      for (let p of this.players) {

        // if (p.playingRightNow === false) {
        //   //this.liveGames = false;
        // } 

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
