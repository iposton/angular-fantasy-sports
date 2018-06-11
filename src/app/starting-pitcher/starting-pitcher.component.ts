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
        transform: 'rotateY(179deg)'
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
  apiRoot: string = "https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-regular";
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

        headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));

        this.dataService
          .sendHeaderOptions(headers);

        this.dataService
          .getDailySchedule().subscribe(res => {
            console.log(res, "schedule...");

            if (res['dailygameschedule'].gameentry == null) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "There Are No Games Scheduled Today :("
              console.log('There are no games being played today.');
            } else {

              this.dailySchedule = res['dailygameschedule'].gameentry;
              this.gameDate = res['dailygameschedule'].gameentry[0].date;
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

              forkJoin(

                  res['dailygameschedule'].gameentry.map(
                    g =>
                    this.http.get(`${this.apiRoot}/game_startinglineup.json?gameid=` + g.id + `&position=P`, { headers })

                  )
                )
                .subscribe(res => {


                  let i;
                  let i2;
                  let res2;
                  let game2;
                  res.forEach((item, index) => {
                    i = index;
                    //console.log(res[i]['gamestartinglineup'], 'got starting lineups data!');
                    game2 = res[i]['gamestartinglineup'].game;
                    res2 = res[i]['gamestartinglineup'].teamLineup;

                    res2.forEach((item, index) => {

                      i2 = index;
                      if (res2[i2].actual != null && res2[i2].expected != null) {
                        //console.log(res2[i2].actual.starter[0].player, 'got player ID for goalie actualy starting!');

                        this.gameStarter = {
                          playerID: res2[i2].actual.starter[0].player.ID,
                          gameID: game2.id
                        }
                        this.gameStarters.push(this.gameStarter);

                        this.starterIdData.push(res2[i2].actual.starter[0].player.ID);
                        playerString = this.starterIdData.join();

                      } else if (res2[i2].actual == null && res2[i2].expected != null) {
                        //console.log(res2[i2].expected.starter[0].player.ID, 'got player ID for goalie expected to start!');
                        this.gameStarter = {
                          playerID: res2[i2].expected.starter[0].player.ID,
                          gameID: game2.id
                        }
                        this.gameStarters.push(this.gameStarter);

                        this.starterIdData.push(res2[i2].expected.starter[0].player.ID);
                        playerString = this.starterIdData.join();
                      } else {

                        //console.log(res2[i2].team.Name, 'player is not expected or actual yet...');

                      }

                    });
                  });


                  this.sortData();

                });



            }


          });

      });

  }

  sortData() {

    if (this.gamesToday === true) {
      this.dataService
        .getDaily().subscribe(res => {
            console.log(res, "Daily stats...");
            this.dailyStats = res['dailyplayerstats'].playerstatsentry;

            this.dataService
              .getStats(playerString).subscribe(res => {
                  console.log(res, "cumulative stats...");

                  this.myData = res['cumulativeplayerstats'].playerstatsentry;

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
                          if (speeddata.stats.PitchesThrown['#text'] > 0) {
                            if (speeddata.stats.Pitcher2SeamFastballs && speeddata.stats.Pitcher4SeamFastballs && speeddata.stats.PitcherChangeups && speeddata.stats.PitcherCurveballs && speeddata.stats.PitcherCutters && speeddata.stats.PitcherSliders && speeddata.stats.PitcherSinkers && speeddata.stats.PitcherSplitters) {
                              speeddata.player.favPitch = Math.max(parseInt(speeddata.stats.Pitcher2SeamFastballs['#text'], 10), parseInt(speeddata.stats.Pitcher4SeamFastballs['#text'], 10), parseInt(speeddata.stats.PitcherChangeups['#text'], 10), parseInt(speeddata.stats.PitcherCurveballs['#text'], 10), parseInt(speeddata.stats.PitcherCutters['#text'], 10), parseInt(speeddata.stats.PitcherSliders['#text'], 10), parseInt(speeddata.stats.PitcherSinkers['#text'], 10), parseInt(speeddata.stats.PitcherSplitters['#text'], 10));
                              speeddata.player.favPitchPercent = Math.floor(speeddata.player.favPitch / parseInt(speeddata.stats.PitchesThrown['#text'], 10) * 100);
                            }
                          } else {
                            speeddata.firstStart = "First start this season.";
                          }

                          if (fastballspeed.ID === speeddata.player.ID) {

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

                          if (gs.playerID === data.player.ID) {
                            data.gameId = gs.gameID;
                          }

                        }

                      }


                      if (this.myData && this.dailySchedule) {
                        console.log('start sorting data for daily schedule...');
                        for (let schedule of this.dailySchedule) {

                          for (let sdata of this.myData) {

                            if (schedule.awayTeam.Name === sdata.team.Name) {

                              sdata.player.gameTime = schedule.time;
                              sdata.team.gameField = schedule.location;
                              //sdata.gameId = schedule.id;
                              sdata.player.gameLocation = "away";
                              sdata.team.opponent = schedule.homeTeam.City + ' ' + schedule.homeTeam.Name;
                              sdata.team.opponentCity = schedule.homeTeam.City;
                              sdata.team.opponentId = schedule.homeTeam.ID;

                            }
                            if (schedule.homeTeam.Name === sdata.team.Name) {

                              sdata.player.gameTime = schedule.time;
                              sdata.team.gameField = schedule.location;
                              //sdata.gameId = schedule.id;
                              sdata.player.gameLocation = "home";
                              sdata.team.opponent = schedule.awayTeam.City + ' ' + schedule.awayTeam.Name;
                              sdata.team.opponentCity = schedule.awayTeam.City;
                              sdata.team.opponentId = schedule.awayTeam.ID;
                            }
                          }
                        }
                      }

                    }

                    if (this.myData && this.dailySchedule) {
                      console.log('start sorting data for pitching opponent...');
                      for (let schedule of this.myData) {

                        for (let sdata of this.myData) {
                          if (sdata.team.opponentId === schedule.team.ID) {
                            sdata.player.pitchingOpponent = schedule.player.FirstName + ' ' + schedule.player.LastName;
                          }
                        }
                      }
                    }

                    if (this.myData && this.dailyStats) {
                      console.log('start sorting data for daily stats...');
                      for (let daily of this.dailyStats) {
                        for (let mdata of this.myData) {

                          if (daily.team.Name === mdata.team.Name) {
                            if (daily.stats.Wins['#text'] === '1' || daily.stats.Losses['#text'] === '1') {
                              this.gameover = true;
                              console.log(daily.team.Name, 'this team has completed their game today...');
                              this.teamsCompletedPlayingToday.push(daily.team.Name);
                            }
                          }

                          if (daily.player.ID === mdata.player.ID) {
                            if (daily.stats.Pitcher2SeamFastballs && daily.stats.Pitcher4SeamFastballs && daily.stats.PitcherChangeups && daily.stats.PitcherCurveballs && daily.stats.PitcherCutters && daily.stats.PitcherSliders && daily.stats.PitcherSinkers && daily.stats.PitcherSplitters) {
                              mdata.player.favPitchToday = Math.max(parseInt(daily.stats.Pitcher2SeamFastballs['#text'], 10), parseInt(daily.stats.Pitcher4SeamFastballs['#text'], 10), parseInt(daily.stats.PitcherChangeups['#text'], 10), parseInt(daily.stats.PitcherCurveballs['#text'], 10), parseInt(daily.stats.PitcherCutters['#text'], 10), parseInt(daily.stats.PitcherSliders['#text'], 10), parseInt(daily.stats.PitcherSinkers['#text'], 10), parseInt(daily.stats.PitcherSplitters['#text'], 10));
                              mdata.player.favPitchPercentToday = Math.floor(mdata.player.favPitchToday / parseInt(daily.stats.PitchesThrown['#text'], 10) * 100);
                            }
                            mdata.playerNotPlayingYet = false;
                            this.liveGames = true;
                            mdata.player.playingToday = true;
                            mdata.player.winToday = daily.stats.Wins['#text'];
                            mdata.player.loseToday = daily.stats.Losses['#text'];
                            mdata.player.saveToday = daily.stats.Saves['#text'];
                            mdata.player.inningsToday = daily.stats.InningsPitched['#text'];
                            mdata.player.earnedrunsToday = daily.stats.EarnedRunsAllowed['#text'];
                            mdata.player.strikeoutsToday = daily.stats.PitcherStrikeouts['#text'];
                            mdata.player.hitsallowedToday = daily.stats.HitsAllowed['#text'];
                            mdata.player.pitchesthrownToday = daily.stats.PitchesThrown['#text'];
                            mdata.player.eraToday = daily.stats.EarnedRunAvg['#text'];
                            mdata.stats.Pitcher2SeamFastballsToday = daily.stats.Pitcher2SeamFastballs['#text'];
                            mdata.stats.Pitcher4SeamFastballsToday = daily.stats.Pitcher4SeamFastballs['#text'];
                            mdata.stats.PitcherChangeupsToday = daily.stats.PitcherChangeups['#text'];
                            mdata.stats.PitcherCurveballsToday = daily.stats.PitcherCurveballs['#text'];
                            mdata.stats.PitcherCuttersToday = daily.stats.PitcherCutters['#text'];
                            mdata.stats.PitcherSlidersToday = daily.stats.PitcherSliders['#text'];
                            mdata.stats.PitcherSinkersToday = daily.stats.PitcherSinkers['#text'];
                            mdata.stats.PitcherSplittersToday = daily.stats.PitcherSplitters['#text'];
                            if (daily.stats.PitchesThrown['#text'] > '0' && daily.stats.Wins['#text'] === '0' && daily.stats.Losses['#text'] === '0') {
                              mdata.playingRightNow = true;

                            } else if (daily.stats.PitchesThrown['#text'] > '0' && daily.stats.Wins['#text'] === '1' || daily.stats.Losses['#text'] === '1') {
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
    this.loadingPrevious = true;
    if (data.player.previousGame1 != null) {

      this.http.get(`${this.apiRoot}/game_boxscore.json?gameid=` + data.player.previousGame1, { headers })
        .subscribe(res => {
          this.loadingPrevious = false;

          if (data.team.Name === res['gameboxscore'].game.homeTeam.Name) {
            console.log(res['gameboxscore'], "last home game data");


            res['gameboxscore'].homeTeam.homePlayers['playerEntry'].forEach((item, index) => {
              if (item.player.ID === data.player.ID) {
                console.log(item, 'this is the pitcher and stats...');

                data.pgBlurb1 = item.stats.PitchesThrown['#text'] + ' pitches thrown, ' + item.stats.HitsAllowed['#text'] + ' hits allowed, sat down ' + item.stats.PitcherStrikeouts['#text'] + ' batters VS ' + res['gameboxscore'].game.awayTeam.Name;
                data.homeruns1 = parseInt(item.stats.HomerunsAllowed['#text']);
                data.previousEra1 = parseInt(item.stats.EarnedRunAvg['#text']);
                data.previousWin1 = parseInt(item.stats.Wins['#text']);
                data.previousL1 = parseInt(item.stats.Losses['#text']);
                data.previousSO1 = parseInt(item.stats.PitcherStrikeouts['#text']);
              }

            });
          } else {
            //console.log(res['gameboxscore'].awayTeam.awayPlayers['playerEntry'], "last away game data");
            res['gameboxscore'].awayTeam.awayPlayers['playerEntry'].forEach((item, index) => {
              if (item.player.ID === data.player.ID) {
                console.log(item, 'this is the pitcher and stats...')
                data.pgBlurb1 = item.stats.PitchesThrown['#text'] + ' pitches thrown, ' + item.stats.HitsAllowed['#text'] + ' hits allowed, sat down ' + item.stats.PitcherStrikeouts['#text'] + ' batters @ ' + res['gameboxscore'].game.homeTeam.Name;
                data.homeruns1 = parseInt(item.stats.HomerunsAllowed['#text']);
                data.previousEra1 = parseInt(item.stats.EarnedRunAvg['#text']);
                data.previousWin1 = parseInt(item.stats.Wins['#text']);
                data.previousL1 = parseInt(item.stats.Losses['#text']);
                data.previousSO1 = parseInt(item.stats.PitcherStrikeouts['#text']);
              }

            });
          }
        })
    } else {
      this.loadingPrevious = false;
      console.log(data, 'no previous game for data...');
    }

    if (data.player.previousGame2 != null) {
      this.http.get(`${this.apiRoot}/game_boxscore.json?gameid=` + data.player.previousGame2, { headers })
        .subscribe(res => {
          this.loadingPrevious = false;
          if (data.team.Name === res['gameboxscore'].game.homeTeam.Name) {

            // console.log(res['gameboxscore'].homeTeam.homePlayers['playerEntry'], "the other previous home game data");
            res['gameboxscore'].homeTeam.homePlayers['playerEntry'].forEach((item, index) => {
              if (item.player.ID === data.player.ID) {
                console.log(item, 'this is the pitcher and stats...')
                data.pgBlurb2 = item.stats.PitchesThrown['#text'] + ' pitches thrown, ' + item.stats.HitsAllowed['#text'] + ' hits allowed, sat down ' + item.stats.PitcherStrikeouts['#text'] + ' batters VS ' + res['gameboxscore'].game.awayTeam.Name;
                data.homeruns2  = parseInt(item.stats.HomerunsAllowed['#text']);
                data.previousEra2 = parseInt(item.stats.EarnedRunAvg['#text']);
                data.previousWin2 = parseInt(item.stats.Wins['#text']);
                data.previousL2 = parseInt(item.stats.Losses['#text']);
                data.previousSO2 = parseInt(item.stats.PitcherStrikeouts['#text']);
              }

            });
          } else {
            // console.log(res['gameboxscore'].awayTeam.awayPlayers['playerEntry'], "the other previous away game data");
            res['gameboxscore'].awayTeam.awayPlayers['playerEntry'].forEach((item, index) => {
              if (item.player.ID === data.player.ID) {
                console.log(item, 'this is the pitcher and stats...');
                data.pgBlurb2 = item.stats.PitchesThrown['#text'] + ' pitches thrown, ' + item.stats.HitsAllowed['#text'] + ' hits allowed, sat down ' + item.stats.PitcherStrikeouts['#text'] + ' batters @ ' + res['gameboxscore'].game.homeTeam.Name;
                data.homeruns2 = parseInt(item.stats.HomerunsAllowed['#text']);
                data.previousEra2 = parseInt(item.stats.EarnedRunAvg['#text']);
                data.previousWin2 = parseInt(item.stats.Wins['#text']);
                data.previousL2 = parseInt(item.stats.Losses['#text']);
                data.previousSO2 = parseInt(item.stats.PitcherStrikeouts['#text']);
              }

            });
          }
        })
    } else {
      this.loadingPrevious = false;
      console.log(data, 'no previous game for data for 2 item in game id array...');
    }
  }


  getGameStats(data) {
    console.log(data, 'whats going on');
    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';

    this.dataService
      .getScore().subscribe(res => {
        console.log(res['scoreboard'].gameScore, "Score...");
        this.score = res['scoreboard'].gameScore;

        if (this.myData && this.score) {
          console.log('start sorting data for scoreboard stats...');
          for (let sc of this.score) {
            for (let pdata of this.myData) {

              // USE GAMEID TO CHECK FOR OPPOSING PITCHER 
              if (sc.game.awayTeam.Abbreviation === pdata.team.Abbreviation) {

                //console.log(sc, 'score items');
                pdata.team.awayPitcher = pdata.player.FirstName + ' ' + pdata.player.LastName;
                pdata.team.opponentAbbreviation = sc.game.homeTeam.Abbreviation;
                pdata.team.teamScore = sc.awayScore;
                pdata.team.opponentScore = sc.homeScore;
                pdata.team.currentInning = sc.currentInning;
                pdata.team.currentInningHalf = sc.currentInningHalf;
                if (sc.isCompleted === true) {
                  this.gameover = true;
                }
                pdata.team.isGameOver = sc.isCompleted;
                pdata.team.isGameInProgress = sc.isInProgress;
                pdata.team.isGameUnplayed = sc.isUnplayed;

                if (sc.playStatus != null) {
                  //console.log(sc.playStatus, 'play status');
                  pdata.team.balls = sc.playStatus.ballCount;
                  pdata.team.strikes = sc.playStatus.strikeCount;
                  pdata.team.outs = sc.playStatus.outCount;
                  if (sc.playStatus['batter'] != null) {
                    pdata.team.currentBatter = sc.playStatus['batter'].FirstName + ' ' + sc.playStatus['batter'].LastName;
                  }
                  if (sc.playStatus['firstBaseRunner'] != null) {
                    pdata.team.firstBaseRunner = sc.playStatus['firstBaseRunner'].FirstName + ' ' + sc.playStatus['firstBaseRunner'].LastName;

                  }
                  if (sc.playStatus['secondBaseRunner'] != null) {
                    pdata.team.secondBaseRunner = sc.playStatus['secondBaseRunner'].FirstName + ' ' + sc.playStatus['secondBaseRunner'].LastName;
                  }
                  if (sc.playStatus['thirdBaseRunner'] != null) {
                    pdata.team.thirdBaseRunner = sc.playStatus['thirdBaseRunner'].FirstName + ' ' + sc.playStatus['thirdBaseRunner'].LastName;
                  }

                  pdata.team.currentPitcher = sc.playStatus.pitcher['FirstName'] + ' ' + sc.playStatus.pitcher['LastName'];
                }

              }
              if (sc.game.homeTeam.Abbreviation === pdata.team.Abbreviation) {

                pdata.team.homePitcher = pdata.player.FirstName + ' ' + pdata.player.LastName;
                pdata.team.opponentAbbreviation = sc.game.awayTeam.Abbreviation;
                pdata.team.opponentScore = sc.awayScore;
                pdata.team.teamScore = sc.homeScore;
                pdata.team.currentInning = sc.currentInning;
                pdata.team.currentInningHalf = sc.currentInningHalf;
                if (sc.isCompleted === true) {
                  this.gameover = true;
                }
                pdata.team.isGameOver = sc.isCompleted;
                pdata.team.isGameInProgress = sc.isInProgress;
                pdata.team.isGameUnplayed = sc.isUnplayed;
                if (sc.playStatus != null) {
                  //console.log(sc.playStatus, 'play status');
                  pdata.team.balls = sc.playStatus.ballCount;
                  pdata.team.strikes = sc.playStatus.strikeCount;
                  pdata.team.outs = sc.playStatus.outCount;
                  if (sc.playStatus['batter'] != null) {
                    pdata.team.currentBatter = sc.playStatus['batter'].FirstName + ' ' + sc.playStatus['batter'].LastName;
                  }
                  if (sc.playStatus['firstBaseRunner'] != null) {
                    pdata.team.firstBaseRunner = sc.playStatus['firstBaseRunner'].FirstName + ' ' + sc.playStatus['firstBaseRunner'].LastName;
                  }
                  if (sc.playStatus['secondBaseRunner'] != null) {
                    pdata.team.secondBaseRunner = sc.playStatus['secondBaseRunner'].FirstName + ' ' + sc.playStatus['secondBaseRunner'].LastName;
                  }
                  if (sc.playStatus['thirdBaseRunner'] != null) {
                    pdata.team.thirdBaseRunner = sc.playStatus['thirdBaseRunner'].FirstName + ' ' + sc.playStatus['thirdBaseRunner'].LastName;
                  }

                  pdata.team.currentPitcher = sc.playStatus.pitcher['FirstName'] + ' ' + sc.playStatus.pitcher['LastName'];
                }

              }

            }
          }


        }


      });


    this.http.get(`${this.apiRoot}/game_playbyplay.json?gameid=` + data.gameId, { headers })
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


          if (this.speedResults[data.player.ID]) {
            let avg = this.speedResults[data.player.ID].reduce((r, a) => {

              return r + parseInt(a);

            }, 0) / this.speedResults[data.player.ID].length;

            let max = this.speedResults[data.player.ID].reduce(function(a, b) {
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
                this.dailyStats = res['dailyplayerstats'].playerstatsentry;

                if (this.myData && this.dailyStats) {
                  console.log('start sorting data for daily stats...');
                  for (let daily of this.dailyStats) {
                    for (let mdata of this.myData) {

                      if (daily.team.Name === mdata.team.Name) {
                        if (daily.stats.Wins['#text'] === '1' || daily.stats.Losses['#text'] === '1') {
                          console.log(daily.team.Name, 'this team has completed their game today...');
                          this.liveGames = false;
                          this.teamsCompletedPlayingToday.push(daily.team.Name);
                        }
                      }

                      if (daily.player.ID === mdata.player.ID) {
                        mdata.playerNotPlayingYet = false;

                        mdata.player.playingToday = true;
                        mdata.player.winToday = daily.stats.Wins['#text'];
                        mdata.player.loseToday = daily.stats.Losses['#text'];
                        mdata.player.saveToday = daily.stats.Saves['#text'];
                        mdata.player.inningsToday = daily.stats.InningsPitched['#text'];
                        mdata.player.earnedrunsToday = daily.stats.EarnedRunsAllowed['#text'];
                        mdata.player.strikeoutsToday = daily.stats.PitcherStrikeouts['#text'];
                        mdata.player.hitsallowedToday = daily.stats.HitsAllowed['#text'];
                        mdata.player.pitchesthrownToday = daily.stats.PitchesThrown['#text'];
                        if (daily.stats.PitchesThrown['#text'] > '0' && daily.stats.Wins['#text'] === '0' && daily.stats.Losses['#text'] === '0') {
                          mdata.playingRightNow = true;
                          this.liveGames = true;

                        } else if (daily.stats.PitchesThrown['#text'] > '0' && daily.stats.Wins['#text'] === '1' || daily.stats.Losses['#text'] === '1') {
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

        if (p.playingRightNow === false) {
          this.liveGames = false;
        } else if (p.playingRightNow === true) {
          this.liveGames = true;
        } else if (p.playingOver === true) {
          this.gameover = true;
        }

      }
    }
  }

}
