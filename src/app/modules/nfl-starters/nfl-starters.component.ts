import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NFLDataService, UtilService } from '../../services/index';
import { isPlatformBrowser } from '@angular/common';
import { Observable, interval, forkJoin } from 'rxjs';
import * as CryptoJS from 'crypto-js';
let headers = null;
let playerString = null;
let batterString = null;

@Component({
  selector: 'app-nfl-starters',
  templateUrl: './nfl-starters.component.html',
  styleUrls: ['./nfl-starters.component.scss']
})
export class NflStartersComponent implements OnInit {
  public dailySchedule: Array <any>;
  public starterIdData: Array <any> = [];
  public batterIdData: Array <any> = [];
  public gameStarters: Array <any> = [];
  public gameBatters: Array <any> = [];
  public dailyTeamStats: Array <any> = [];
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular";
  public testBrowser: boolean;
  public gamesToday: boolean = false;
  public noGamesToday: boolean = false;
  public loading: boolean = true;
  public noGamesMsg: string = '';
  public teamRef: Array <any>;
  public gameDate: any;
  public teams: Array <any>;
  public myData: Array <any>;
  public dailyStats: Array <any>;
  public errMessage: string = '';
  public gameGroups: Array <any>;
  public statData: Array <any> = [];
  public liveGames: boolean;
  public showData: Array <any>;
  public spinTitle: string = 'NFL Data';
  public twitter: boolean;
  public nflTeamStats: Array <any> = [];
  public nflTeamStatsLoading: boolean;
  public playerImages: any;
  public gameStarter: { 
    gameID: string, 
    name: any, 
    team: any, 
    playerID: string, 
    score: any, 
    status: any, 
    scheduleStatus: any,
    position: any,
    startType: any 
  };
  
  constructor(
    private dataService: NFLDataService,
    private util: UtilService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) platformId: string) {
      this.teams = this.util.getNFLTeams();
      this.testBrowser = isPlatformBrowser(platformId);
      this.playerImages = this.util.getNFLImages();
  }

  loadData() {
    this.dataService
      .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));

        this.dataService
          .sendHeaderOptions(headers, 1, this.apiRoot);

        this.dataService
          .getSchedule(1).subscribe(res => {
            //console.log(res, "schedule...");

            if (res['games'].length === 0) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "There Are No Games Scheduled Today :(";
              console.log('There are no games being played today.');
            } else {
              this.dailySchedule = res['games'];
              this.teamRef = this.teams; //res['references'].teamReferences;
              this.gameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime;
              this.gamesToday = true;
              //console.log(this.dailySchedule, 'sched');
            
              forkJoin(
                  res['games'].map(
                    g => 
                    
                     this.http.get(`${this.apiRoot}/games/`+g['schedule'].id+`/lineup.json?position=Offense-RB-1,Offense-TE-1,Offense-QB-1,Offense-WR-1`, { headers })
                    
                  )
                )
                .subscribe(res => {
                  let i = null;
                  let i2 = null;
                  let res2 = null;
                  let game2 = null;
                  let score2 = null;
                  let originalStart = null;
                  let gameDay = null;
                
                  
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
                      gameDay = new Date(this.gameDate);
                      originalStart = game2.originalStartTime != null ? new Date(game2.originalStartTime) : new Date(game2.startTime);
                      //console.log(gameDay.getDay(), 'game day', originalStart.getDay(), 'original start', game2.homeTeam.abbreviation);
                        i2 = index;
                        if (res2[i2].actual != null && res2[i2].expected != null) {

                          for (let position of res2[i2].expected.lineupPositions) {
                             //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
                           if (position.player != null) {
                              this.gameStarter = {
                                playerID: position.player.id,
                                name: position.player.lastName,
                                team: res2[i2].team.id,
                                gameID: game2.id,
                                score: score2,
                                status: game2.playedStatus,
                                scheduleStatus: game2.scheduleStatus,
                                position: position['position'],
                                startType: 'actual'
                              }

                              this.gameStarters.push(this.gameStarter);
                              this.starterIdData.push(position.player.id);

                              // if (position['position'] === 'P') {
                              //   this.gameStarters.push(this.gameStarter);
                              //   this.starterIdData.push(position.player.id);
                              // } else {
                              //   this.gameBatters.push(this.gameStarter);
                              //   this.batterIdData.push(position.player.id);
                              // }
                           } 
                          }
                         
                          playerString = this.starterIdData.join();
                          //batterString = this.batterIdData.join(); 
  
                        } else if (res2[i2].actual == null && res2[i2].expected != null) {
                          //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
                          for (let position of res2[i2].expected.lineupPositions) {
                            //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
                           if (position.player != null) {
                            this.gameStarter = {
                              playerID: position.player.id,
                              name: position.player.lastName,
                              team: res2[i2].team.id,
                              gameID: game2.id,
                              score: score2,
                              status: game2.playedStatus,
                              scheduleStatus: game2.scheduleStatus,
                              position: position['position'],
                              startType: 'expected'
                            }

                            this.gameStarters.push(this.gameStarter);
                            this.starterIdData.push(position.player.id);

                            // if (position['position'] === 'P') {
                            //   this.gameStarters.push(this.gameStarter);
                            //   this.starterIdData.push(position.player.id);
                            // } else {
                            //   this.gameBatters.push(this.gameStarter);
                            //   this.batterIdData.push(position.player.id);
                            // }
                          }   
                         }
                          playerString = this.starterIdData.join(); 
                          //batterString = this.batterIdData.join();       
                        } 
                      
                    });
                  });
                  //console.log(this.gameStarters, 'nfl starters');
                  this.sortData();

                }, (err: HttpErrorResponse) => {
                  
                  console.log(err, 'error getting lineup');

              });

            }
          }, (err: HttpErrorResponse) => {

            console.log(err, 'error getting schedule');

          });
      });
  }

  public sortData() {
    if (this.gamesToday === true) {
      this.dataService
        .dailyTeams(1).subscribe(res => {
            //console.log(res, "Daily team stats...");
            this.dailyTeamStats = res != null ? res['gamelogs'] : [];
            if (this.dailyTeamStats) {
              for (let teamStats of this.dailyTeamStats) {
                for (let team of this.teams) {
                  if (team.id === teamStats.team.id) {
                    team.dTeamStats = teamStats;
                    team.dailyPY = teamStats.stats.passing.passGrossYards;
                    team.dailyRY = teamStats.stats.rushing.rushYards;
                    team.dailyPlays = teamStats.stats.rushing.rushAttempts + teamStats.stats.passing.passAttempts;
                    team.dailyPassPlays = teamStats.stats.passing.passAttempts;
                    team.dailyRunPlays = teamStats.stats.rushing.rushAttempts;
                    if (teamStats.stats.rushing.rushAttempts > teamStats.stats.passing.passAttempts) {
                      team.dailyRun = true;
                    } else {
                      team.dailyRun = false;
                    }
                  }
                }
              }
            }   
      });

      this.dataService
        .getDaily(1, playerString).subscribe(res => {
            //console.log(res, "Daily stats...");
            this.dailyStats = res != null ? res['gamelogs'] : [];

            this.dataService
              .getTeamStats('').subscribe(res => {
                this.nflTeamStats = res['teamStatsTotals'];
                this.nflTeamStatsLoading = false;
                for (let teamStats of this.nflTeamStats) {
                  for (let team of this.teams) {
                    if (team.id === teamStats.team.id) {
                      team.sTeamStats = teamStats;
                      team.seasonPY = teamStats.stats.passing.passGrossYards;
                      team.seasonRY = teamStats.stats.rushing.rushYards;
                      team.seasonPlays = teamStats.stats.rushing.rushAttempts + teamStats.stats.passing.passAttempts;
                      team.seasonPassPlays = teamStats.stats.passing.passAttempts;
                      team.seasonRunPlays = teamStats.stats.rushing.rushAttempts;
                      if (teamStats.stats.rushing.rushAttempts > teamStats.stats.passing.passAttempts) {
                        team.seasonRun = true;
                      } else {
                        team.seasonRun = false;
                      }
                    }
                  }
                }
            })

            this.dataService
              .getStats(playerString).subscribe(res => {

                function removeDuplicatesBy(keyFn, array) {
                  var mySet = new Set();
                  return array.filter(function(x) {  
                      var key = keyFn(x), isNew = !mySet.has(key);
                      if (isNew) mySet.add(key);  
                      return isNew;
                  });
                }
              
              let values = [];
              if (res != null) values = res['playerStatsTotals'];
              this.myData = values;
              //removeDuplicatesBy(x => x.player.id, values)

                  if (this.starterIdData.length > 0 || this.noGamesToday === true) {
                    if (this.myData && this.gameStarters) {
                      for (let gs of this.gameStarters) {
                        for (let data of this.myData) {
                          data.player.gameLocation = "none";
                          if (gs.playerID === data.player.id) {
                            data.gameId = gs.gameID;
                            data.score = gs.score;
                            data.gameStatus = gs.status;
                            data.starterTeam = gs.team;
                            data.sStatus = gs.scheduleStatus;
                            //this.pitcherFp(data);

                            if (gs.status !== "UNPLAYED") {
                              data.team.currentQ = gs.score.currentQuarter
                              if (gs.score.currentIntermission === 2)
                                data.team.currentQ = 'HALFTIME';
                              //data.team.currentInningHalf = gs.score['currentInningHalf'];
                            }
                  

                          }
                        }
                      }
                       //console.log('start sorting data for real gameID by PitcherID...');
                    
                      if (this.myData && this.dailySchedule) {
                        let gameDay = null;
                        let originalStart = null;
                       // console.log('start sorting data for daily schedule...');
                        for (let schedule of this.dailySchedule) {
                          for (let sdata of this.myData) {
                            gameDay = new Date(this.gameDate);
                            originalStart = new Date(schedule.schedule.startTime);
                            
                            if (schedule.schedule.awayTeam != null && 
                              schedule.schedule.homeTeam != null) {

                              if (schedule.schedule.awayTeam.id === sdata.starterTeam) {
                                sdata.sStatus = schedule.schedule.scheduleStatus;
                                sdata.player.gameTime = schedule.schedule.startTime;
                                sdata.team.gameField = schedule.schedule.venue.name;
                                //sdata.gameId = schedule.id;
                                sdata.player.gameLocation = "away";
                                sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;
                                //sdata.team.opponentCity = schedule.schedule.homeTeam.city;
                                sdata.team.opponentId = schedule.schedule.homeTeam.id;

                              }
                              if (schedule.schedule.homeTeam.id === sdata.starterTeam) {
                                sdata.sStatus = schedule.schedule.scheduleStatus;
                                sdata.player.gameTime = schedule.schedule.startTime;
                                sdata.team.gameField = schedule.schedule.venue.name;
                                //sdata.gameId = schedule.schedule.id;
                                sdata.player.gameLocation = "home";
                                sdata.team.opponent = schedule.schedule.awayTeam.abbreviation;
                                //sdata.team.opponentCity = schedule.schedule.awayTeam.city;
                                sdata.team.opponentId = schedule.schedule.awayTeam.id;
                              } 
                              if (sdata.player.officialImageSrc == null) {
                                sdata.player.officialImageSrc = this.playerImages[sdata.player.id] != null ? this.playerImages[sdata.player.id].image : null;
                              }
                            } 
                          } 
                        }
                      }

                       for (let team of this.teamRef) {
                         for (let data of this.myData) { 
                            if (team.id === data.starterTeam) {
                              data.team.color = team.teamColoursHex[0];
                              data.team.accent = team.teamColoursHex[1];
                              data.team.logo = team.officialLogoImageSrc;
                              data.team.city = team.city;
                              data.team.name = team.name;
                              data.team.twitter = team.twitter;
                 
                              data.stats.receiving.seasonTotalTouches = data.stats.rushing.rushAttempts + data.stats.receiving.targets;
                              data.stats.receiving.seasonTotalTouchPct = Math.floor(data.stats.receiving.seasonTotalTouches / team.seasonPlays * 100);
                              data.stats.rushing.seasonTRPct = Math.floor(data.stats.rushing.rushAttempts / team.seasonRunPlays * 100);
                              data.stats.receiving.seasonTCPct = Math.floor(data.stats.receiving.targets / team.seasonPassPlays * 100);
                              
                              data.stats.teamSRYards = team.seasonRY;
                              data.stats.teamSPYards = team.seasonPY;
                              data.stats.teamSRPlays = team.seasonRunPlays;
                              data.stats.teamSPPlays = team.seasonPassPlays;
                              data.stats.teamSRPct = Math.floor(team.seasonRunPlays / team.seasonPlays * 100);
                              data.stats.teamSPPct = Math.floor(team.seasonPassPlays / team.seasonPlays * 100);
                              data.stats.seasonRun = team.seasonRun;
                            }
                          }  
                       }
                    }

                    if (this.myData && this.dailySchedule) {
                      //console.log('start sorting data for pitching opponent...');
                      for (let schedule of this.myData) {
                        for (let sdata of this.myData) {
                          if (sdata.team.opponentId === schedule.team.id && 
                            sdata.gameId === schedule.gameId) {
                            sdata.team.opponentLogo = schedule.team.logo;
                          }
                        }
                      }

                      for (let gs of this.gameStarters) {
                        for (let data of this.myData) {

                          if (gs.playerID === data.player.id) {

                            if (gs.status !== "UNPLAYED") {
                              if (data.player.gameLocation === 'home') {
                                data.team.teamScore = gs.score['homeScoreTotal'];
                                data.team.opponentScore = gs.score['awayScoreTotal'];
                              } else if (data.player.gameLocation === 'away') {
                                data.team.teamScore = gs.score['awayScoreTotal'];
                                data.team.opponentScore = gs.score['homeScoreTotal'];
                              }
                            }

                          }
                          
                          if (data.team.opponentId === gs.team && 
                            data.gameId === gs.gameID) {
                              data.player.po = gs.name;
                          }
                        }
                      }

                      for (let team of this.teamRef) {
                        for (let data of this.myData) { 
                           if (team.id === data.team.opponentId) {
                            data.team.opponentLogo = team.officialLogoImageSrc;
                           }
                         }  
                      }
                    }

                    if (this.myData && this.dailyStats) {
                     // console.log('start sorting data for daily stats...');
                      for (let daily of this.dailyStats) {
                        for (let mdata of this.myData) {

                          if (daily.player.id === mdata.player.id) {
                            
                            mdata.player.fpToday = 0;
                            mdata.gameId = daily.game.id;
                            mdata.stats.recToday = daily.stats.receiving ? daily.stats.receiving.receptions : 0;
                            mdata.stats.tyToday = daily.stats.receiving ?  daily.stats.receiving.recYards + daily.stats.rushing.rushYards : 0;
                            mdata.stats.tqbyToday = daily.stats.passing ?  daily.stats.passing.passYards + daily.stats.rushing.rushYards : 0;
                            mdata.stats.ttdToday = daily.stats.receiving ? daily.stats.passing.passTD + daily.stats.rushing.rushTD : 0;
                            mdata.stats.receiving.dailyTotalTouches = daily.stats.rushing.rushAttempts + daily.stats.receiving.targets;
                            mdata.stats.receiving.dailyRTouches = daily.stats.rushing.rushAttempts;
                            mdata.stats.receiving.dailyPTouches = daily.stats.receiving.targets;
                            
                          }
                        }
                      }

                      for (let team of this.teamRef) {
                        for (let data of this.myData) { 
                           if (team.id === data.team.opponentId) {
                              data.stats.receiving.dailyTotalTouchPct = Math.floor(data.stats.receiving.dailyTotalTouches / team.dailyPlays * 100);
                              data.stats.rushing.dailyTRPct = Math.floor(data.stats.rushing.rushAttempts / team.dailyRunPlays * 100);
                              data.stats.receiving.dailyTCPct = Math.floor(data.stats.receiving.targets / team.dailyPassPlays * 100);
                              data.stats.teamDRYards = team.dailyRY;
                              data.stats.teamDPYards = team.dailyPY;
                              data.stats.teamDRPlays = team.dailyRunPlays;
                              data.stats.teamDPPlays = team.dailyPassPlays;
                              data.stats.teamDRPct = Math.floor(team.dailyRunPlays / team.dailyPlays * 100);
                              data.stats.teamDPPct = Math.floor(team.dailyPassPlays / team.dailyPlays * 100);
                              data.stats.dailyRun = team.dailyRun;
                           }
                         }  
                      }

                      this.groupPlayers();
                    } else {
                      this.groupPlayers();
                    }
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

  public showMatchups(type) {
    if (type === 'o') {
      this.showData = this.gameGroups;
      console.log(this.showData, 'show data');
      // this.dataService
      //   .sendStats(this.showData);
    } 
    
    // else {
    //   // this.showBatterData = this.gameBatterGroups.sort((a, b) => {
    //   //   if (a.id <= b.id) return -1
    //   //   else if (a.id >= b.id) return 1
    //   //   else return 0
    //   // });
    //   // console.log(this.showBatterData, 'show Batter data');
    // }
  }

  // public pitcherFp(player) {
  //   player.stats.pitching.fp = (player.stats.pitching.earnedRunsAllowed * -3) + player.stats.pitching.pitcherStrikeouts + player.stats.pitching.pickoffs + player.stats.pitching.pitcherFlyOuts + player.stats.pitching.pitcherGroundOuts;
  //   player.stats.pitching.fpa = Math.floor(player.stats.pitching.fp / player.stats.gamesPlayed);
  // }

  public groupPlayers() {
    this.statData = this.myData.reduce(function(r, a) {
      if(a.team != null){
        r[a.gameId] = r[a.gameId] || [];
        r[a.gameId].push({'location': a['player'].gameLocation, 'of': 'of', 'playerObj': a});
      }
      return r
    }, Object.create(null));

    this.gameGroups = Object.keys(this.statData).map((key, index) => {
        return {game: key, oPlayers: this.statData[key].sort((a, b) => a.location.localeCompare(b.location))};
    });

    this.showMatchups('o');
  }

  ngOnInit(): void {
    if (this.testBrowser) {
      this.loadData();
    }
  }

}
