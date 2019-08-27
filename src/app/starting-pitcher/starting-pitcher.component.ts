import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { DataService } from '../data.service';
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

@Component({
  selector: 'app-starting-pitcher',
  templateUrl: './starting-pitcher.component.html',
  styleUrls: ['./starting-pitcher.component.css'],
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
export class StartingPitcherComponent implements OnInit {

  dailySchedule: Array < any > ;
  players: Array < any > ;
  pitcherSpeed: Array < any > ;
  starterIdData: Array < any > = [];
  specificFastballData: Array < any > = [];
  specificFastballDataById: Array < any > = [];
  speedResults: Array < any > = [];
  gameDate: any;
  apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular";
  showData: Array < any > ;
  myData: Array < any > ;
  dailyStats: Array < any > ;
  score: Array < any > ;
  gamesToday: boolean = false;
  noGamesToday: boolean = false;
  loading: boolean = true;
  loadingPrevious: boolean = true;
  liveGames: boolean = false;
  gameover: boolean = false;
  noGamesMsg: string = '';
  errMessage: string = '';
  gameStarter: { gameID: string, playerID: string };
  pitcherspeed: { pitcher: string, pitchspeedStart: string, lastName: string };
  gameStarters: Array < any > = [];
  teamsCompletedPlayingToday: Array < any > = [];

  constructor(private fbService: FirebaseService, private dataService: DataService, private http: HttpClient) {
    this.fbService
      .getData().subscribe(res => {
        console.log(res, 'firebase data');
        this.pitcherSpeed = res;
      });

    this.players = this.dataService.getSentStats();
  }

  loadData() {

    this.dataService
      .getEnv().subscribe(res => {

        //headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));
        
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(res + ":" + 'MYSPORTSFEEDS'));

        this.dataService
          .sendHeaderOptions(headers);

        this.dataService
          .getDailySchedule().subscribe(res => {
            console.log(res, "schedule...");

            if (res['games'].length === 0) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "There Are No Games Scheduled Today :("
              console.log('There are no games being played today.');
            } else {

              this.dailySchedule = res['games'];
              this.gameDate = res['lastUpdatedOn'];
              let dPipe = new DatePipe("en-US");

              // let postponed;
              //   res['dailygameschedule'].gameentry.forEach((item, index) => {

              //     if(this.fbService.userDetails === null) {

              //       dailyTeams.push(item.homeTeam.Abbreviation, item.awayTeam.Abbreviation); 
              //       teamString = dailyTeams.join();
              //     }

              //     // postponed = index;
              //     // if (res['dailygameschedule'].gameentry[postponed].id === '41392') {
              //     //   console.log(res['dailygameschedule'].gameentry[postponed], "hi, iam postponed and causing trouble...");
              //     //   res['dailygameschedule'].gameentry.splice(postponed, 1);
              //     // }
              //   });

              this.gamesToday = true;

              console.log(this.dailySchedule, 'sched')

              forkJoin(

                  res['games'].map(
                    g =>
             
                    this.http.get(`${this.apiRoot}/games/`+this.dataService.dailyDate+`-`+ g['schedule'].awayTeam.abbreviation +`-`+ g['schedule'].homeTeam.abbreviation+`/lineup.json?position=P`, { headers })

                  )
                )
                .subscribe(res => {


                  let i;
                  let i2;
                  let res2;
                  let game2;
                  res.forEach((item, index) => {
                    i = index;
                    console.log(res, 'got starting lineups data!');
                    try {
                      game2 = res[i]['game'];
                      res2 = res[i]['teamLineups'];
                    } catch {
                      console.log('bad endpoint');
                    }

                    res2.forEach((item, index) => {

                      i2 = index;
                      if (res2[i2].actual != null && res2[i2].expected != null) {
                        console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');

                        this.gameStarter = {
                          playerID: res2[i2].actual.lineupPositions[0].player.id,
                          gameID: game2.id
                        }
                        this.gameStarters.push(this.gameStarter);

                        this.starterIdData.push(res2[i2].actual.lineupPositions[0].player.id);
                        playerString = this.starterIdData.join();

                      } else if (res2[i2].actual == null && res2[i2].expected != null) {
                        //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
                        this.gameStarter = {
                          playerID: res2[i2].expected.lineupPositions[0].player.id,
                          gameID: game2.id
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

                });

            }
          }, (err: HttpErrorResponse) => {

            console.log(err);

          });

      });

  }

  sortData() {

    if (this.gamesToday === true) {
      this.dataService
        .getDaily().subscribe(res => {
            console.log(res, "Daily stats...");
            this.dailyStats = res['gamelogs'];

            this.dataService
              .getStats(playerString).subscribe(res => {
                  console.log(res, "cumulative stats...");

                  this.myData = res['playerStatsTotals'];

                  if (this.starterIdData.length > 0 || this.noGamesToday === true) {
                    console.log('this.starterIdData.length > 0 || this.noGamesToday === true...');


                    if (this.myData && this.pitcherSpeed) {
                      console.log('start sorting players for pitch speeds from firebase...');
                      for (let fastballspeed of this.pitcherSpeed) {
                        for (let speeddata of this.myData) {

                          speeddata.playerNotPlayingYet = true;
                          speeddata.playingRightNow = false;
                          speeddata.playingOver = false;
                          speeddata.gamedate = this.gameDate;
                          speeddata.flip = 'inactive';

                          if (speeddata.stats.pitching.pitchesThrown > 0) {
                            if (speeddata.stats.pitching.pitcher2SeamFastballs && speeddata.stats.pitching.pitcher4SeamFastballs && speeddata.stats.pitching.pitcherChangeups && speeddata.stats.pitching.pitcherCurveballs && speeddata.stats.pitching.pitcherCutters && speeddata.stats.pitching.pitcherSliders && speeddata.stats.pitching.pitcherSinkers && speeddata.stats.pitching.pitcherSplitters) {
                              speeddata.player.favPitch = Math.max(parseInt(speeddata.stats.pitching.pitcher2SeamFastballs, 10), parseInt(speeddata.stats.pitching.pitcher4SeamFastballs, 10), parseInt(speeddata.stats.pitching.pitcherChangeups, 10), parseInt(speeddata.stats.pitching.pitcherCurveballs, 10), parseInt(speeddata.stats.pitching.pitcherCutters, 10), parseInt(speeddata.stats.pitching.pitcherSliders, 10), parseInt(speeddata.stats.pitching.pitcherSinkers, 10), parseInt(speeddata.stats.pitching.pitcherSplitters, 10));
                              speeddata.player.favPitchPercent = Math.floor(speeddata.player.favPitch / parseInt(speeddata.stats.pitching.pitchesThrown, 10) * 100);
                            }
                          } else {
                            speeddata.firstStart = "First start this season.";
                          }

                          if (parseInt(fastballspeed.ID) === speeddata.player.id) {

                            speeddata.player.pitchSpeedAvg = fastballspeed.pitchSpeedAvg;
                            speeddata.player.fastestPitch = fastballspeed.fastestPitch;
                            speeddata.player.image = fastballspeed.image;
                            speeddata.player.Height = fastballspeed.Height;
                            speeddata.player.Weight = fastballspeed.Weight;
                            speeddata.player.age = fastballspeed.age;
                            speeddata.player.city = fastballspeed.city;
                            speeddata.player.country = fastballspeed.country;
                            speeddata.player.IsRookie = fastballspeed.IsRookie;
                            speeddata.player.Throws = fastballspeed.Throws;
                            speeddata.player.BirthDate = fastballspeed.BirthDate;
                            speeddata.player.ContractStartYear = fastballspeed.ContractStartYear;
                            speeddata.player.ContractTotalYears = fastballspeed.ContractTotalYears;
                            speeddata.player.ContractBaseSalary = fastballspeed.ContractBaseSalary;
                            speeddata.player.ContractTotalSalary = fastballspeed.ContractTotalSalary;
                            speeddata.player.DraftYear = fastballspeed.DraftYear;
                            speeddata.player.DraftRound = fastballspeed.DraftRound;
                            speeddata.player.DraftOverallPick = fastballspeed.DraftOverallPick;
                            speeddata.player.DraftRoundPick = fastballspeed.DraftRoundPick;
                            speeddata.player.College = fastballspeed.College;
                            speeddata.player.Highschool = fastballspeed.HighSchool;
                            if (fastballspeed.previousGameID != null) {
                              speeddata.player.previousGame1 = fastballspeed.previousGameID[0];
                            }
                            if (fastballspeed.previousGameID != null && fastballspeed.previousGameID.length > 1) {
                              speeddata.player.previousGame2 = fastballspeed.previousGameID[1];
                            }


                          }

                        }
                      }

                    }

                    if (this.myData && this.gameStarters) {
                      console.log('start sorting data for real gameID by PitcherID...');
                      for (let gs of this.gameStarters) {

                        for (let data of this.myData) {

                          if (gs.playerID === data.player.id) {
                            data.gameId = gs.gameID;
                          }

                        }

                      }


                      if (this.myData && this.dailySchedule) {
                        console.log('start sorting data for daily schedule...');
                        for (let schedule of this.dailySchedule) {

                          for (let sdata of this.myData) {

                            if (schedule.schedule.awayTeam.abbreviation === sdata.team.abbreviation) {

                              sdata.player.gameTime = schedule.schedule.startTime;
                              sdata.team.gameField = schedule.schedule.venue.name;
                              //sdata.gameId = schedule.id;
                              sdata.player.gameLocation = "away";
                              sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;
                              //sdata.team.opponentCity = schedule.schedule.homeTeam.city;
                              sdata.team.opponentId = schedule.schedule.homeTeam.id;

                            }
                            if (schedule.schedule.homeTeam.abbreviation === sdata.team.abbreviation) {

                              sdata.player.gameTime = schedule.schedule.startTime;
                              sdata.team.gameField = schedule.schedule.venue.name;
                              //sdata.gameId = schedule.schedule.id;
                              sdata.player.gameLocation = "home";
                              sdata.team.opponent = schedule.schedule.awayTeam.abbreviation;
                              //sdata.team.opponentCity = schedule.schedule.awayTeam.city;
                              sdata.team.opponentId = schedule.schedule.awayTeam.id;
                            }
                          }
                        }
                      }

                    }

                    if (this.myData && this.dailySchedule) {
                      console.log('start sorting data for pitching opponent...');
                      for (let schedule of this.myData) {

                        for (let sdata of this.myData) {
                          if (sdata.team.opponentId === schedule.team.id) {
                            sdata.player.pitchingOpponent = schedule.player.firstName + ' ' + schedule.player.lastName;
                          }
                        }
                      }
                    }

                    if (this.myData && this.dailyStats) {
                      console.log('start sorting data for daily stats...');
                      for (let daily of this.dailyStats) {
                        for (let mdata of this.myData) {

                          if (daily.team.abbreviation === mdata.team.abbreviation) {
                            if (daily.stats.pitching.wins === '1' || daily.stats.pitching.losses === '1') {
                              this.gameover = true;
                              console.log(daily.team.abbreviation, 'this team has completed their game today...');
                              this.teamsCompletedPlayingToday.push(daily.team.abbreviation);
                            }
                          }

                          if (daily.player.id === mdata.player.id) {
                            if (daily.stats.pitching.pitcher2SeamFastballs && daily.stats.pitching.pitcher4SeamFastballs && daily.stats.pitching.pitcherChangeups && daily.stats.pitching.pitcherCurveballs && daily.stats.pitching.pitcherCutters && daily.stats.pitching.pitcherSliders && daily.stats.pitching.pitcherSinkers && daily.stats.pitching.pitcherSplitters) {
                              mdata.player.favPitchToday = Math.max(parseInt(daily.stats.pitching.pitcher2SeamFastballs, 10), parseInt(daily.stats.pitching.pitcher4SeamFastballs, 10), parseInt(daily.stats.pitching.pitcherChangeups, 10), parseInt(daily.stats.pitching.pitcherCurveballs, 10), parseInt(daily.stats.pitching.pitcherCutters, 10), parseInt(daily.stats.pitching.pitcherSliders, 10), parseInt(daily.stats.pitching.pitcherSinkers, 10), parseInt(daily.stats.pitching.pitcherSplitters, 10));
                              mdata.player.favPitchPercentToday = Math.floor(mdata.player.favPitchToday / parseInt(daily.stats.pitching.pitchesThrown, 10) * 100);
                            }
                            mdata.playerNotPlayingYet = false;
                            this.liveGames = true;
                            mdata.player.playingToday = true;
                            mdata.player.winToday = daily.stats.pitching.wins;
                            mdata.player.loseToday = daily.stats.pitching.losses;
                            mdata.player.saveToday = daily.stats.pitching.saves;
                            mdata.player.inningsToday = daily.stats.pitching.inningsPitched;
                            mdata.player.earnedrunsToday = daily.stats.pitching.earnedRunsAllowed;
                            mdata.player.strikeoutsToday = daily.stats.pitching.pitcherStrikeouts;
                            mdata.player.hitsallowedToday = daily.stats.pitching.hitsAllowed;
                            mdata.player.pitchesthrownToday = daily.stats.pitching.pitchesThrown;
                            mdata.player.eraToday = daily.stats.pitching.earnedRunAvg;
                            mdata.stats.pitching.pitcher2SeamFastballsToday = daily.stats.pitching.pitcher2SeamFastballs;
                            mdata.stats.pitching.pitcher4SeamFastballsToday = daily.stats.pitching.pitcher4SeamFastballs;
                            mdata.stats.pitching.pitcherChangeupsToday = daily.stats.pitching.pitcherChangeups;
                            mdata.stats.pitching.pitcherCurveballsToday = daily.stats.pitching.pitcherCurveballs;
                            mdata.stats.pitching.pitcherCuttersToday = daily.stats.pitching.pitcherCutters;
                            mdata.stats.pitching.pitcherSlidersToday = daily.stats.pitching.pitcherSliders;
                            mdata.stats.pitching.pitcherSinkersToday = daily.stats.pitching.pitcherSinkers;
                            mdata.stats.pitching.pitcherSplittersToday = daily.stats.pitching.pitcherSplitters;
                            if (daily.stats.pitching.pitchesThrown > '0' && daily.stats.pitching.wins === '0' && daily.stats.pitching.losses === '0') {
                              mdata.playingRightNow = true;

                            } else if (daily.stats.pitching.pitchesThrown > '0' && daily.stats.pitching.wins === '1' || daily.stats.pitching.losses === '1') {
                              mdata.playingRightNow = false;
                              // mdata.playingOver = true;
                              this.gameover = true;
                            }
                          } else {

                          }

                        }
                      }

                      if (this.teamsCompletedPlayingToday != null) {
                        for (let complete of this.teamsCompletedPlayingToday) {
                          for (let comdata of this.myData) {
                            if (comdata.team.Name === complete) {
                              comdata.playingRightNow = false;
                              comdata.playingOver = true;
                            }

                          }
                        }
                      }

                      //THIS FOR LOOP GETS AVG PITCH SPEED FOR EVERY PITCHER IN THIS LIST
                      this.showData = this.myData;
                      this.dataService
                        .sendStats(this.showData);

                    } else {
                      this.showData = this.myData;
                      this.dataService
                        .sendStats(this.showData);
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

  flipBack(data) {
    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';
  }

  getPreviousGameStats(data) {

    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';
    this.loadingPrevious = false;
    console.log(data, 'this player has been flipped data...');

    // if (data.player.previousGame1 != null) {
    //   // /games/`+this.dataService.dailyDate+`-`+ g['schedule'].awayTeam.abbreviation +`-`+ g['schedule'].homeTeam.abbreviation+`/lineup.json?position=P`

    //   this.http.get(`${this.apiRoot}/game_boxscore.json?gameid=` + data.player.previousGame1, { headers })
    //     .subscribe(res => {
    //       this.loadingPrevious = false;

    //       if (data.team.abbreviation === res['gameboxscore'].game.homeTeam.abbreviation) {
    //         console.log(res['gameboxscore'], "last home game data");


    //         res['gameboxscore'].homeTeam.homePlayers['playerEntry'].forEach((item, index) => {
    //           if (item.player.ID === data.player.ID) {
    //            // console.log(item, 'this is the pitcher and stats...');

    //             data.pgBlurb1 = ' vs ' + res['gameboxscore'].game.awayTeam.abbreviation + ': ' + item.stats.PitchesThrown['#text'] + ' pitches, ' + item.stats.HitsAllowed['#text'] + ' hits allowed, sat down ' + item.stats.PitcherStrikeouts['#text'];
    //             data.homeruns1 = parseInt(item.stats.HomerunsAllowed['#text']);
    //             data.previousEra1 = parseFloat(item.stats.EarnedRunAvg['#text']);
    //             data.previousWin1 = parseInt(item.stats.Wins['#text']);
    //             data.previousL1 = parseInt(item.stats.Losses['#text']);
    //             data.previousSO1 = parseInt(item.stats.PitcherStrikeouts['#text']);
    //             data.walks1 = parseInt(item.stats.PitcherWalks['#text']);
    //           }

    //         });
    //       } else {
    //         //console.log(res['gameboxscore'].awayTeam.awayPlayers['playerEntry'], "last away game data");
    //         res['gameboxscore'].awayTeam.awayPlayers['playerEntry'].forEach((item, index) => {
    //           if (item.player.ID === data.player.ID) {
    //             console.log(item, 'this is the pitcher and stats...')
    //             data.pgBlurb1 = ' @ ' + res['gameboxscore'].game.homeTeam.abbreviation + ': ' + item.stats.PitchesThrown['#text'] + ' pitches, ' + item.stats.HitsAllowed['#text'] + ' hits allowed, sat down ' + item.stats.PitcherStrikeouts['#text'];
    //             data.homeruns1 = parseInt(item.stats.HomerunsAllowed['#text']);
    //             data.previousEra1 = parseFloat(item.stats.EarnedRunAvg['#text']);
    //             data.previousWin1 = parseInt(item.stats.Wins['#text']);
    //             data.previousL1 = parseInt(item.stats.Losses['#text']);
    //             data.previousSO1 = parseInt(item.stats.PitcherStrikeouts['#text']);
    //             data.walks1 = parseInt(item.stats.PitcherWalks['#text']);
    //           }

    //         });
    //       }
    //     })
    // } else {
    //   this.loadingPrevious = false;
    //   console.log(data, 'no previous game for data...');
    // }

    // if (data.player.previousGame2 != null) {
    //   this.http.get(`${this.apiRoot}/game_boxscore.json?gameid=` + data.player.previousGame2, { headers })
    //     .subscribe(res => {
    //       this.loadingPrevious = false;
    //       if (data.team.abbreviation === res['gameboxscore'].game.homeTeam.abbreviation) {

    //         // console.log(res['gameboxscore'].homeTeam.homePlayers['playerEntry'], "the other previous home game data");
    //         res['gameboxscore'].homeTeam.homePlayers['playerEntry'].forEach((item, index) => {
    //           if (item.player.ID === data.player.ID) {
    //             console.log(item, 'this is the pitcher and stats...')
    //             data.pgBlurb2 = ' vs ' + res['gameboxscore'].game.awayTeam.abbreviation + ': ' + item.stats.PitchesThrown['#text'] + ' pitches, ' + item.stats.HitsAllowed['#text'] + ' hits allowed, sat down ' + item.stats.PitcherStrikeouts['#text'];
    //             data.homeruns2  = parseInt(item.stats.HomerunsAllowed['#text']);
    //             data.previousEra2 = parseFloat(item.stats.EarnedRunAvg['#text']);
    //             data.previousWin2 = parseInt(item.stats.Wins['#text']);
    //             data.previousL2 = parseInt(item.stats.Losses['#text']);
    //             data.previousSO2 = parseInt(item.stats.PitcherStrikeouts['#text']);
    //             data.walks2 = parseInt(item.stats.PitcherWalks['#text']);
    //           }

    //         });
    //       } else {
    //         // console.log(res['gameboxscore'].awayTeam.awayPlayers['playerEntry'], "the other previous away game data");
    //         res['gameboxscore'].awayTeam.awayPlayers['playerEntry'].forEach((item, index) => {
    //           if (item.player.ID === data.player.ID) {
    //             console.log(item, 'this is the pitcher and stats...');
    //             data.pgBlurb2 = ' @ ' + res['gameboxscore'].game.homeTeam.abbreviation + ': ' + item.stats.PitchesThrown['#text'] + ' pitches, ' + item.stats.HitsAllowed['#text'] + ' hits allowed, sat down ' + item.stats.PitcherStrikeouts['#text'];
    //             data.homeruns2 = parseInt(item.stats.HomerunsAllowed['#text']);
    //             data.previousEra2 = parseFloat(item.stats.EarnedRunAvg['#text']);
    //             data.previousWin2 = parseInt(item.stats.Wins['#text']);
    //             data.previousL2 = parseInt(item.stats.Losses['#text']);
    //             data.previousSO2 = parseInt(item.stats.PitcherStrikeouts['#text']);
    //             data.walks2 = parseInt(item.stats.PitcherWalks['#text']);
    //           }

    //         });
    //       }
    //     })
    // } else {
    //   this.loadingPrevious = false;
    //   console.log(data, 'no previous game for data for 2 item in game id array...');
    // }
  }


  getGameStats(data) {
    console.log(data, 'whats going on');
    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';

    this.dataService
      .getScore(data).subscribe(res => {
        console.log(res['scoring'], "Score...");
        this.score = res['scoring'];
        let game = res['game'].playedStatus; //"COMPLETED"

   
    // "awayHitsTotal": 7,
    // "awayErrorsTotal": 0,

    // "homeHitsTotal": 10,
    // "homeErrorsTotal": 1,

    if (data.player.gameLocation === 'home') {
      data.team.teamScore = this.score['homeScoreTotal'];
      data.team.opponentScore = this.score['awayScoreTotal'];
    } else if (data.player.gameLocation === 'away') {
      data.team.teamScore = this.score['awayScoreTotal'];
      data.team.opponentScore = this.score['homeScoreTotal'];
    }

    data.team.currentInning = this.score['currentInning'];
    data.team.currentInningHalf = this.score['currentInningHalf'];

    if (game === "COMPLETED") {
      data.team.isGameOver = true;
      data.team.isGameInProgress = false;
      data.team.isGameUnplayed = false;
    } else {
      data.team.isGameInProgress = true;
      data.team.isGameUnplayed = true;
      data.team.isGameOver = false;
    }

    //TODO: loop to get current pitcher info

    //data.team.awayPitcher = pdata.player.FirstName + ' ' + pdata.player.LastName;
    //data.team.opponentAbbreviation = sc.game.homeTeam.Abbreviation;
    //pdata.team.homePitcher = pdata.player.FirstName + ' ' + pdata.player.LastName;
    //pdata.team.opponentAbbreviation = sc.game.awayTeam.Abbreviation;

    //     if (this.myData && this.score) {
    //       console.log('start sorting data for scoreboard stats...');
    //       for (let sc of this.score) {
    //         for (let pdata of this.myData) {

    //           // USE GAMEID TO CHECK FOR OPPOSING PITCHER 
    //           if (sc.game.awayTeam.Abbreviation === pdata.team.abbreviation) {

    //             //console.log(sc, 'score items');
    //             pdata.team.awayPitcher = pdata.player.FirstName + ' ' + pdata.player.LastName;
    //             pdata.team.opponentAbbreviation = sc.game.homeTeam.Abbreviation;
    //             pdata.team.teamScore = sc.awayScore;
    //             pdata.team.opponentScore = sc.homeScore;
    //             pdata.team.currentInning = sc.currentInning;
    //             pdata.team.currentInningHalf = sc.currentInningHalf;
    //             if (sc.isCompleted === true) {
    //               this.gameover = true;
    //             }
    //             pdata.team.isGameOver = sc.isCompleted;
    //             pdata.team.isGameInProgress = sc.isInProgress;
    //             pdata.team.isGameUnplayed = sc.isUnplayed;

    //             if (sc.playStatus != null) {
    //               //console.log(sc.playStatus, 'play status');
    //               pdata.team.balls = sc.playStatus.ballCount;
    //               pdata.team.strikes = sc.playStatus.strikeCount;
    //               pdata.team.outs = sc.playStatus.outCount;
    //               if (sc.playStatus['batter'] != null) {
    //                 pdata.team.currentBatter = sc.playStatus['batter'].FirstName + ' ' + sc.playStatus['batter'].LastName;
    //               }
    //               if (sc.playStatus['firstBaseRunner'] != null) {
    //                 pdata.team.firstBaseRunner = sc.playStatus['firstBaseRunner'].FirstName + ' ' + sc.playStatus['firstBaseRunner'].LastName;

    //               }
    //               if (sc.playStatus['secondBaseRunner'] != null) {
    //                 pdata.team.secondBaseRunner = sc.playStatus['secondBaseRunner'].FirstName + ' ' + sc.playStatus['secondBaseRunner'].LastName;
    //               }
    //               if (sc.playStatus['thirdBaseRunner'] != null) {
    //                 pdata.team.thirdBaseRunner = sc.playStatus['thirdBaseRunner'].FirstName + ' ' + sc.playStatus['thirdBaseRunner'].LastName;
    //               }

    //               pdata.team.currentPitcher = sc.playStatus.pitcher['FirstName'] + ' ' + sc.playStatus.pitcher['LastName'];
    //             }

    //           }
    //           if (sc.game.homeTeam.Abbreviation === pdata.team.Abbreviation) {

    //             pdata.team.homePitcher = pdata.player.FirstName + ' ' + pdata.player.LastName;
    //             pdata.team.opponentAbbreviation = sc.game.awayTeam.Abbreviation;
    //             pdata.team.opponentScore = sc.awayScore;
    //             pdata.team.teamScore = sc.homeScore;
    //             pdata.team.currentInning = sc.currentInning;
    //             pdata.team.currentInningHalf = sc.currentInningHalf;
    //             if (sc.isCompleted === true) {
    //               this.gameover = true;
    //             }
    //             pdata.team.isGameOver = sc.isCompleted;
    //             pdata.team.isGameInProgress = sc.isInProgress;
    //             pdata.team.isGameUnplayed = sc.isUnplayed;
    //             if (sc.playStatus != null) {
    //               //console.log(sc.playStatus, 'play status');
    //               pdata.team.balls = sc.playStatus.ballCount;
    //               pdata.team.strikes = sc.playStatus.strikeCount;
    //               pdata.team.outs = sc.playStatus.outCount;
    //               if (sc.playStatus['batter'] != null) {
    //                 pdata.team.currentBatter = sc.playStatus['batter'].FirstName + ' ' + sc.playStatus['batter'].LastName;
    //               }
    //               if (sc.playStatus['firstBaseRunner'] != null) {
    //                 pdata.team.firstBaseRunner = sc.playStatus['firstBaseRunner'].FirstName + ' ' + sc.playStatus['firstBaseRunner'].LastName;
    //               }
    //               if (sc.playStatus['secondBaseRunner'] != null) {
    //                 pdata.team.secondBaseRunner = sc.playStatus['secondBaseRunner'].FirstName + ' ' + sc.playStatus['secondBaseRunner'].LastName;
    //               }
    //               if (sc.playStatus['thirdBaseRunner'] != null) {
    //                 pdata.team.thirdBaseRunner = sc.playStatus['thirdBaseRunner'].FirstName + ' ' + sc.playStatus['thirdBaseRunner'].LastName;
    //               }

    //               pdata.team.currentPitcher = sc.playStatus.pitcher['FirstName'] + ' ' + sc.playStatus.pitcher['LastName'];
    //             }

    //           }

    //         }
    //       }

    //     }


       });

    // /games/`+this.dataService.dailyDate+`-`+ g['schedule'].awayTeam.abbreviation +`-`+ g['schedule'].homeTeam.abbreviation+`/playbyplay.json?position=P`; 

    this.http.get(`${this.apiRoot}/games/`+this.dataService.dailyDate+`-`+ data.team.opponent +`-`+ data.team.abbreviation+`/playbyplay.json`, { headers })
      .subscribe(res => {


        console.log(res['gameplaybyplay'], 'got play by play game data for ' + data.player.LastName);

        if (res['gameplaybyplay'].atBats != null) {

          res['gameplaybyplay'].atBats.atBat.forEach((item2, index) => {

            //console.log(item2.atBatPlay, 'atbatplay items...');
            item2.atBatPlay.forEach((item3, index) => {
              let f = item3;

              if (f.pitch != undefined && f.pitch.ballStartSpeed != undefined) {
                //console.log(f.pitch);
                this.pitcherspeed = {
                  pitcher: f.pitch.pitchingPlayer.ID,
                  pitchspeedStart: f.pitch.ballStartSpeed,
                  lastName: f.pitch.pitchingPlayer.LastName,
                }
                this.specificFastballData.push(this.pitcherspeed);

              }

            })


          })

          this.speedResults = this.specificFastballData.reduce(function(r, a) {
            r[a.pitcher] = r[a.pitcher] || [];
            r[a.pitcher].push(a.pitchspeedStart);
            return r
          }, Object.create(null));
          console.log('made groups of pichers pitch speeds by ID...');

        }
        this.myData.forEach((data, index) => {


          if (this.speedResults[data.player.id]) {
            let avg = this.speedResults[data.player.id].reduce((r, a) => {

              return r + parseInt(a);

            }, 0) / this.speedResults[data.player.id].length;

            let max = this.speedResults[data.player.id].reduce(function(a, b) {
              return Math.max(a, b);
            });

            data.player.pitchSpeedAvgToday = Math.floor(avg);
            data.player.fastestPitchToday = max;



          }

        });



      });

  }

  ngOnInit() {
    if (this.players === undefined) {
      this.loadData();
      // get our data every subsequent 10 minutes
      const MILLISECONDS_IN_TEN_MINUTES = 600000;
      interval(MILLISECONDS_IN_TEN_MINUTES)
        .subscribe(() => {
          if (this.gamesToday === true) {
            this.dataService
              .getDaily().subscribe(res => {
                console.log(res, "Daily stats updated!");
               
                this.dailyStats = res['gamelogs'];

                if (this.myData && this.dailyStats) {
                  console.log('start sorting data for daily stats...');
                  for (let daily of this.dailyStats) {
                    for (let mdata of this.myData) {

                      if (daily.team.abbreviation === mdata.team.abbreviation) {
                            if (daily.stats.pitching.wins === '1' || daily.stats.pitching.losses === '1') {
                              this.gameover = true;
                              console.log(daily.team.abbreviation, 'this team has completed their game today...');
                              this.teamsCompletedPlayingToday.push(daily.team.abbreviation);
                            }
                          }

                          if (daily.player.id === mdata.player.id) {
                            if (daily.stats.pitching.pitcher2SeamFastballs && daily.stats.pitching.pitcher4SeamFastballs && daily.stats.pitching.pitcherChangeups && daily.stats.pitching.pitcherCurveballs && daily.stats.pitching.pitcherCutters && daily.stats.pitching.pitcherSliders && daily.stats.pitching.pitcherSinkers && daily.stats.pitching.pitcherSplitters) {
                              mdata.player.favPitchToday = Math.max(parseInt(daily.stats.pitching.pitcher2SeamFastballs, 10), parseInt(daily.stats.pitching.pitcher4SeamFastballs, 10), parseInt(daily.stats.pitching.pitcherChangeups, 10), parseInt(daily.stats.pitching.pitcherCurveballs, 10), parseInt(daily.stats.pitching.pitcherCutters, 10), parseInt(daily.stats.pitching.pitcherSliders, 10), parseInt(daily.stats.pitching.pitcherSinkers, 10), parseInt(daily.stats.pitching.pitcherSplitters, 10));
                              mdata.player.favPitchPercentToday = Math.floor(mdata.player.favPitchToday / parseInt(daily.stats.pitching.pitchesThrown, 10) * 100);
                            }
                            mdata.playerNotPlayingYet = false;
                            this.liveGames = true;
                            mdata.player.playingToday = true;
                            mdata.player.winToday = daily.stats.pitching.wins;
                            mdata.player.loseToday = daily.stats.pitching.losses;
                            mdata.player.saveToday = daily.stats.pitching.saves;
                            mdata.player.inningsToday = daily.stats.pitching.inningsPitched;
                            mdata.player.earnedrunsToday = daily.stats.pitching.earnedRunsAllowed;
                            mdata.player.strikeoutsToday = daily.stats.pitching.pitcherStrikeouts;
                            mdata.player.hitsallowedToday = daily.stats.pitching.hitsAllowed;
                            mdata.player.pitchesthrownToday = daily.stats.pitching.pitchesThrown;
                            mdata.player.eraToday = daily.stats.pitching.earnedRunAvg;
                            mdata.stats.Pitcher2SeamFastballsToday = daily.stats.pitching.pitcher2SeamFastballs;
                            mdata.stats.Pitcher4SeamFastballsToday = daily.stats.pitching.pitcher4SeamFastballs;
                            mdata.stats.PitcherChangeupsToday = daily.stats.pitching.pitcherChangeups;
                            mdata.stats.PitcherCurveballsToday = daily.stats.pitching.pitcherCurveballs;
                            mdata.stats.PitcherCuttersToday = daily.stats.pitching.pitcherCutters;
                            mdata.stats.PitcherSlidersToday = daily.stats.pitching.pitcherSliders;
                            mdata.stats.PitcherSinkersToday = daily.stats.pitching.pitcherSinkers;
                            mdata.stats.PitcherSplittersToday = daily.stats.pitching.pitcherSplitters;
                            if (daily.stats.pitching.pitchesThrown > '0' && daily.stats.pitching.wins === '0' && daily.stats.pitching.losses === '0') {
                              mdata.playingRightNow = true;

                            } else if (daily.stats.pitching.pitchesThrown > '0' && daily.stats.pitching.wins === '1' || daily.stats.pitching.losses === '1') {
                              mdata.playingRightNow = false;
                              // mdata.playingOver = true;
                              this.gameover = true;
                            }
                          } else {

                      }

                    }
                  }

                  if (this.teamsCompletedPlayingToday != null) {
                    for (let complete of this.teamsCompletedPlayingToday) {
                      for (let comdata of this.myData) {
                        if (comdata.team.Name === complete) {
                          comdata.playingRightNow = false;
                          comdata.playingOver = true;
                        }

                      }
                    }
                  }



                }
              })

          } else {
            console.log('No games then no daily stats either. :(');
          }
        });
    } else {
      this.loading = false;
      this.showData = this.players;
      this.gameDate = this.showData["0"].gamedate;

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
