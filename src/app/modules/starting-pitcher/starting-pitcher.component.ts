import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {FirebaseService, 
        DataService, 
        UtilService, 
        DepthService,
        MlbUtilService,
        NHLDataService} from '../../services/index';
import { isPlatformBrowser } from '@angular/common';
import { interval, forkJoin } from 'rxjs';
import * as CryptoJS from 'crypto-js';

let headers = null;
let playerString = null;
let batterString = null;
let today = new Date();
let playedStatuses = {'COMPLETED': 'COMPLETED', 'COMPLETED_PENDING_REVIEW': 'COMPLETED_PENDING_REVIEW', 'LIVE' : 'LIVE'}

@Component({
  selector: 'app-starting-pitcher',
  templateUrl: './starting-pitcher.component.html',
  styleUrls: ['./starting-pitcher.component.scss']
})
export class StartingPitcherComponent implements OnInit {

  public dailySchedule: Array <any>;
  public teamRef: Array <any>;
  public previousGames: Array <any>;
  public players: Array <any>;
  public pitcherSpeed: Array <any>;
  public starterIdData: Array <any> = [];
  public batterIdData: Array <any> = [];
  public specificFastballData: Array <any> = [];
  public specificFastballDataById: Array <any> = [];
  public speedResults: Array <any> = [];
  public gameDate: any;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular";
  public showData: Array <any>;
  public showBatterData: Array <any>;
  public playerInfo: Array <any>;
  public myData: Array <any>;
  public dailyStats: Array <any>;
  public myBatterData: Array <any>;
  public dailyBatterStats: Array <any>;
  public score: Array <any>;
  public gamesToday: boolean = false;
  public noGamesToday: boolean = false;
  public loading: boolean = true;
  public loadingPrevious: boolean = true;
  public liveGames: boolean = false;
  public gameover: boolean = false;
  public postponed: boolean = false;
  public pitcherSection: boolean = true;
  public batterSection: boolean = false;
  public noGamesMsg: string = '';
  public errMessage: string = '';
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
  public pitcherspeed: { pitcher: string, pitchspeedStart: string, lastName: string };
  public gameStarters: Array <any> = [];
  public gameBatters: Array <any> = [];
  public teamsCompletedPlayingToday: Array <any> = [];
  public maxD = new Date(today.getTime() + (24 * 60 * 60 * 1000));
  public teams: Array <any>;
  public gameGroups: Array <any>;
  public gameBatterGroups: Array <any>;
  public teamStats: Array <any>;
  public teamStatsUpdate: any;
  public statData: Array <any> = [];
  public statBatterData: Array <any> = [];
  public teamGames: Array <any> = [];
  public testBrowser: boolean;
  public twitter: boolean;
  public isOpen: boolean = false;
  public tweetsData: Array <any> = [];
  public noPosts: any;
  public submitting: boolean = false;
  public selectedPlayer: any;
  public type: any;
  public name: any;
  public image: any;
  public spinTitle: string = 'Pitcher Data';
  public showFp: boolean = false;
  public stat: any = 1;
  public playerImages: any;
  public actualStarters: any;
  public startingP: any;
  public selectedDate: any;
  public compareDate: any;
  public isPlayoffs: boolean;
  public playoffDate: string;
  public season: string;
 
  
  constructor(private fbService: FirebaseService, 
              private dataService: DataService,
              private depth: DepthService, 
              private http: HttpClient,
              private util: UtilService,
              private mlbUtil: MlbUtilService,
              public nhlService: NHLDataService,
              @Inject(PLATFORM_ID) platformId: string) {
    this.fbService
      .getData().subscribe(res => {
        //console.log(res, 'firebase data');
        this.pitcherSpeed = res;
      });

    this.players = this.dataService.getSentStats();
    this.teams = this.mlbUtil.getMLBTeams();
    this.testBrowser = isPlatformBrowser(platformId);
    this.playerImages = this.mlbUtil.getMLBImages();
    this.actualStarters = this.depth.getActualStarters();
    this.startingP = this.mlbUtil.getStartingPitchers();
    this.selectedDate = new Date();
    this.compareDate = new Date();
    this.dataService.checkDay();
    this.season = '2021-regular'
    this.playoffDate = 'Tue Oct 5 2022 00:00:00 GMT-0700 (Pacific Daylight Time)'
    this.checkPlayoffs(new Date(this.selectedDate))
    this.apiRoot = `https://api.mysportsfeeds.com/v2.1/pull/mlb/${this.season}`;
  }

  public checkPlayoffs(date) {
    if (date > new Date(this.playoffDate)) {
      this.season = '2021-playoff'
      this.isPlayoffs = true
      this.dataService.isPlayoffs = this.isPlayoffs
    } else {
      this.season = '2021-regular'
      this.isPlayoffs = false
      this.dataService.isPlayoffs = this.isPlayoffs
    }    
  }

  public statToggle() {
    if (this.stat === 1) {
      this.stat = 2;
    } else if (this.stat === 2) {
      this.stat = 3;
    } else if (this.stat === 3) {
      this.stat = 4;
    } else if (this.stat === 4) {
      this.stat = 5;
    } else if (this.stat === 5) {
      this.stat = 1;
    }
  }

  public authorize(item) {
    //console.log(item)
    if (item != null) {
      this.isOpen = true;
      this.submitting = true;
      let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');
  
      this.http.post('/authorize', {headers}).subscribe((res) => {
        this.openModal(item, headers, 'mlb');
      });
    }
  }

  public openModal(player, headers, type) {
    this.type = type;
    this.selectedPlayer = null;
    this.noPosts = '';
    this.selectedPlayer = player;
    //this.gaService.eventEmitter("nba player info "+(data.playerObj ? data.playerObj.player.lastName : data.player.lastName), "nbatwitter", "tweet", "click", 10);
    let twitter = null;
    twitter = player.team.twitter;
    let searchterm = null;
    searchterm = 'query=' + player.player.lastName + ' ' + twitter;
    this.image = player.player.image;
    this.name = player.player.firstName + ' ' + player.player.lastName +' - '+ player.player.primaryPosition +' | #'+ player.player.jerseyNumber;
    this.http.post('/search', searchterm, {headers}).subscribe((res) => {
      this.submitting = false;
      this.tweetsData = res['data'].statuses;
      if (this.tweetsData.length === 0) {
        this.noPosts = "No Tweets.";
      }
    });
  }

  public getByDate(event) {
    this.loading = true;
    this.dataService.selectedDate(event)
    this.nhlService.selectedDate(event)
    this.selectedDate = event.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
    this.compareDate = this.util.formatTime(this.selectedDate)
    this.checkPlayoffs(new Date(this.selectedDate))
    this.dataService.checkDay();
    //empty old data on data change 
    this.dailySchedule = [];
    this.gameStarters = [];
    this.starterIdData = [];
    playerString = null;
    this.dailyStats = [];
    this.dailyBatterStats = [];
    this.myData = [];
    this.myBatterData = [];
    this.showData = [];
    this.showBatterData = [];
    this.specificFastballData = [];
    this.previousGames = [];
    this.score = [];
    this.players = [];
    this.speedResults = [];
    this.batterIdData = [];
    this.gameBatters = [];
    this.teamGames = [];
    this.batterSection = false;
    this.pitcherSection = true;
    this.liveGames = false;
    this.gameover = false;
    this.postponed = false;
    this.gamesToday = false;
    this.noGamesMsg = '';
    this.loadData()
  }

  loadData() {

          this.nhlService.serverInfo(
          'mlb', 
          '2022-regular', 
          'games', 
          'dateB', 
          'dateE', 
          'player', 
          'P,BO1,BO2,BO3,BO4', 
          this.teams,
          this.selectedDate, 
          this.dataService.isToday,
          'dailySchedule',
          'haveSchedules',
          '').subscribe(res => {
            console.log(res, 'client res: schedlule')
            //this.serverInfo = res
            //this.fullSchedule = res['fullSchedule'].games

      // this.nhlService
      //   .getTeamStats(this.apiRoot, headers).subscribe(res => {
      //     this.teamStatsUpdate = res['lastUpdatedOn'];
      //     this.teamStats = res['teamStatsTotals']; 
      //     console.log(this.teamStats, 'teamstats');        
      // });

        // this.dataService
        //   .getDailySchedule().subscribe(res => {
            //console.log(res, "schedule...");

            if (res['games'].games.length === 0) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "There Are No Games Scheduled Today :(";
              console.log('There are no games being played today.');
            } else {

              this.dailySchedule = res['games'].games.filter(item => new Date(item['schedule'].startTime).getDate() === this.compareDate.getDate() || this.util.formatTime(item['schedule'].startTime).getDate() === this.compareDate.getDate() && playedStatuses[item['schedule'].playedStatus] != null)    
              this.teamRef = this.teams
              this.gameDate = res['games'].games[0].schedule.startTime ? res['games'].games[0].schedule.startTime : res['games'].games[1].schedule.startTime;
              this.gamesToday = true
              //console.log(this.dailySchedule, 'sched');
            
              // forkJoin(
              //   this.dailySchedule.map(
              //       g => 
                    
              //        this.http.get(`${this.apiRoot}/games/`+g['schedule'].id+`/lineup.json?position=P,BO1,BO2,BO3,BO4`, { headers })
                    
              //     )
              //   )
              //   .subscribe(res => {


                  let i = null;
                  let i2 = null;
                  let res2 = null;
                  let game2 = null;
                  let score2 = null;
                  let originalStart = null;
                  let gameDay = null;
                  let start = null
                
                  
                  res.dailyLineup.forEach((item, index) => {
                    //console.log(this.dailySchedule[i], 'score for games');
                    //console.log(res, 'got starting lineups data!');
                    i = index;
                    try {
                      game2 = res.dailyLineup[i]['game'];
                      res2 = res.dailyLineup[i]['teamLineups'];
                      score2 = this.dailySchedule[i].score;
                      start = this.dailySchedule[i]['schedule'].startTime;
                    } catch(e) {
                      console.log(e, 'lineup error')
                      console.log(res.dailyLineup[i], 'error data')
                    }

                    res2.forEach((item, index) => {
                      //console.log(new Date(start).getDate(), 'start time', this.compareDate.getDate(), 'selected date down below');
                      gameDay = new Date(this.gameDate);
                      originalStart = game2.originalStartTime != null ? new Date(game2.originalStartTime) : new Date(game2.startTime);
                      //console.log(gameDay.getDay(), 'game day', originalStart.getDay(), 'original start', game2.homeTeam.abbreviation);
                     // if (gameDay.getDay() === originalStart.getDay() || game2.playedStatus === 'COMPLETED' || game2.playedStatus === 'LIVE') {
                       
                        i2 = index;
                        this.teamGames.push({team: res2[i2].team.id, gameID: game2.id, status: game2.playedStatus})
                        if (res2[i2].actual != null && res2[i2].expected != null) {

                          for (let position of res2[i2].actual.lineupPositions) {
                             //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
                           if (position.player != null) {
                              this.gameStarter = {
                                playerID: position['position'] === 'P' && this.actualStarters[res2[i2].team.id] != null && new Date(this.actualStarters[res2[i2].team.id].gdate).getDay() === new Date(game2.startTime).getDay() ? this.actualStarters[res2[i2].team.id].id : position.player.id,
                                name: position['position'] === 'P' && this.actualStarters[res2[i2].team.id] != null && new Date(this.actualStarters[res2[i2].team.id].gdate).getDay() === new Date(game2.startTime).getDay() ? this.actualStarters[res2[i2].team.id].lastName : position.player.lastName,
                                team: res2[i2].team.id,
                                gameID: game2.id,
                                score: score2,
                                status: game2.playedStatus,
                                scheduleStatus: game2.scheduleStatus,
                                position: position['position'],
                                startType: 'actual'
                              }
                              if (position['position'] === 'P') {
                                this.gameStarters.push(this.gameStarter);
                                this.starterIdData.push(this.gameStarter.playerID);
                              } else {
                                this.gameBatters.push(this.gameStarter);
                                this.batterIdData.push(this.gameStarter.playerID);
                              }
                           } 
                          }
                         
                          playerString = this.starterIdData.join();
                          batterString = this.batterIdData.join(); 
  
                        } else if (res2[i2].actual == null && res2[i2].expected != null) {
                          //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
                          for (let position of res2[i2].expected.lineupPositions) {
                            //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
                           if (position.player != null) {
                            this.gameStarter = {
                              playerID: position['position'] === 'P' && this.actualStarters[res2[i2].team.id] != null && new Date(this.actualStarters[res2[i2].team.id].gdate).getDay() === new Date(game2.startTime).getDay() ? this.actualStarters[res2[i2].team.id].id : position.player.id,
                              name: position['position'] === 'P' && this.actualStarters[res2[i2].team.id] != null && new Date(this.actualStarters[res2[i2].team.id].gdate).getDay() === new Date(game2.startTime).getDay() ? this.actualStarters[res2[i2].team.id].lastName : position.player.lastName,
                              team: res2[i2].team.id,
                              gameID: game2.id,
                              score: score2,
                              status: game2.playedStatus,
                              scheduleStatus: game2.scheduleStatus,
                              position: position['position'],
                              startType: 'expected'
                            }
                            if (position['position'] === 'P') {
                              this.gameStarters.push(this.gameStarter);
                              this.starterIdData.push(this.gameStarter.playerID);
                            } else {
                              this.gameBatters.push(this.gameStarter);
                              this.batterIdData.push(this.gameStarter.playerID);
                            }
                          }   
                         }
                          playerString = this.starterIdData.join(); 
                          batterString = this.batterIdData.join();       
                        } 
                     // }
                    });
                  });

                  this.sortData();

                //});
            }
          });
      //});
  }

  public sortData() {
    if (this.gamesToday === true) {
      this.nhlService.myStats(
        'mlb', 
        this.season, 
        'player_gamelogs', 
        'team_stats_totals', 
        'player_stats_totals', 
        playerString, 
        'P', 
        this.teams,
        this.selectedDate, 
        'isToday',
        'stats',
        'mlbPlayers',
        'selectedWeek',
        'noUpdate',
        'none',
        'haveNflSchedules').subscribe(async res => {
          console.log(res, 'nfl stats data')

      // this.dataService
      //   .getDaily(playerString).subscribe(res => {
            //console.log(res, "Daily stats...");
            this.dailyStats = res['dailyStats'].gamelogs
            this.teamStats = res['teamStats'].teamStatsTotals

            // this.dataService
            //   .getStats(playerString).subscribe(res => {
              
           
              this.myData = res['playerStats'].playerStatsTotals

              for (let data of this.myData) {
                data.player.gameLocation = "none";

                if (this.startingP[data.player.id] != null) {
                  this.startingP[data.player.id].new = false;  
                }
              }

                  if (this.starterIdData.length > 0 || this.noGamesToday === true) {

                    const startingPitchers = Object.values(this.startingP);
           
                    startingPitchers.forEach((item, index) =>  {
                      if (startingPitchers[index]['new'] === true) {
                        let newPitcher = this.mlbUtil.getNewPitcher();
                        //console.log(newPitcher, 'new Pitcher');
                        newPitcher.player.id = startingPitchers[index]['id'];
                        newPitcher.player.firstName = startingPitchers[index]['firstName'];
                        newPitcher.player.lastName = startingPitchers[index]['lastName'];
                        newPitcher.player.currentTeam.id = startingPitchers[index]['teamId'];
                        newPitcher.player.currentTeam.abbreviation = startingPitchers[index]['abbreviation'];
                        newPitcher.player.officialImageSrc = null;
                        newPitcher.player.image = startingPitchers[index]['img'];
                        newPitcher.team.id =  startingPitchers[index]['teamId'];
                        newPitcher.team.abbreviation =  startingPitchers[index]['abbreviation'];
                        this.myData.push(newPitcher)
                      }  
                    });
                  //  console.log('this.starterIdData.length > 0 || this.noGamesToday === true...');


                    // if (this.myData && this.pitcherSpeed) {
                    //   console.log('start sorting players for pitch speeds from firebase...');
                    //   for (let fastballspeed of this.pitcherSpeed) {
                    //     for (let speeddata of this.myData) {

                    //       speeddata.playerNotPlayingYet = true;
                    //       speeddata.playingRightNow = false;
                    //       speeddata.playingOver = false;
                    //       speeddata.gamedate = this.gameDate;
                    //       speeddata.flip = 'inactive';

                    //       if (speeddata.stats.pitching.pitchesThrown > 0) {
                    //         if (speeddata.stats.pitching.pitcher2SeamFastballs >= 0 && 
                    //           speeddata.stats.pitching.pitcher4SeamFastballs >= 0 && 
                    //           speeddata.stats.pitching.pitcherChangeups >= 0 && 
                    //           speeddata.stats.pitching.pitcherCurveballs >= 0 && 
                    //           speeddata.stats.pitching.pitcherCutters >= 0 && 
                    //           speeddata.stats.pitching.pitcherSliders >= 0 && 
                    //           speeddata.stats.pitching.pitcherSinkers >= 0 && 
                    //           speeddata.stats.pitching.pitcherSplitters >= 0) {
                    //           speeddata.player.favPitch = Math.max(speeddata.stats.pitching.pitcher2SeamFastballs, speeddata.stats.pitching.pitcher4SeamFastballs, speeddata.stats.pitching.pitcherChangeups, speeddata.stats.pitching.pitcherCurveballs, speeddata.stats.pitching.pitcherCutters, speeddata.stats.pitching.pitcherSliders, speeddata.stats.pitching.pitcherSinkers, speeddata.stats.pitching.pitcherSplitters);
                    //           speeddata.player.favPitchPercent = Math.floor(speeddata.player.favPitch / speeddata.stats.pitching.pitchesThrown * 100);
                    //         }
                    //         if (speeddata.stats.pitching.earnedRunAvg)
                    //           speeddata.stats.pitching.earnedRunAvg = parseFloat(speeddata.stats.pitching.earnedRunAvg).toFixed(2);
                    //       } else {
                    //         speeddata.firstStart = "First start this season.";
                    //       }

                    //       // if (parseInt(fastballspeed.ID) === speeddata.player.id) {

                    //       //   speeddata.player.pitchSpeedAvg = fastballspeed.pitchSpeedAvg;
                    //       //   speeddata.player.fastestPitch = fastballspeed.fastestPitch;
                    //       //   speeddata.player.image = fastballspeed.image;
                    //       //   speeddata.player.contractStartYear = fastballspeed.ContractStartYear;
                    //       //   speeddata.player.contractTotalYears = fastballspeed.ContractTotalYears;
                    //       //   speeddata.player.contractBaseSalary = fastballspeed.ContractBaseSalary;
                    //       //   speeddata.player.contractTotalSalary = fastballspeed.ContractTotalSalary;
                    //       //   speeddata.player.draftYear = fastballspeed.DraftYear;
                    //       //   speeddata.player.draftRound = fastballspeed.DraftRound;
                    //       //   speeddata.player.draftOverallPick = fastballspeed.DraftOverallPick;
                    //       //   speeddata.player.draftRoundPick = fastballspeed.DraftRoundPick;
                    //       //   if (fastballspeed.previousGameID != null) {
                    //       //     speeddata.player.previousGame1 = fastballspeed.previousGameID[0];
                    //       //   }
                    //       //   if (fastballspeed.previousGameID != null && fastballspeed.previousGameID.length > 1) {
                    //       //     speeddata.player.previousGame2 = fastballspeed.previousGameID[1];
                    //       //   }


                    //       // }

                    //     }
                    //   }

                    // }

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
                            this.mlbUtil.fantasyPoints(data,'p')

                            if (gs.status !== "UNPLAYED") {
                              data.team.currentInning = gs.score['currentInning'];
                              data.team.currentInningHalf = gs.score['currentInningHalf'];
                            }
                            //console.log(game, 'is game over?');
                            if (gs.status === "COMPLETED" 
                              || gs.status === "COMPLETED_PENDING_REVIEW") {
                              data.team.isGameOver = true;
                              data.team.isGameInProgress = false;
                              data.team.isGameUnplayed = false;
                              this.liveGames = false;
                            } else {
                              data.team.isGameInProgress = true;
                              data.team.isGameUnplayed = true;
                              data.team.isGameOver = false;
                            }

                            if (gs.status === "LIVE") {
                              this.liveGames = true;
                            }

                            if (gs.scheduleStatus === "POSTPONED") {
                              data.postponed = true;
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
                              //if (schedule.schedule.scheduleStatus != "POSTPONED" && gameDay.getDay() === originalStart.getDay()) {

                                if (schedule.schedule.awayTeam.id === sdata.starterTeam) {
                                  sdata.sStatus = schedule.schedule.scheduleStatus;
                                  sdata.player.gameTime = schedule.schedule.startTime;
                                  sdata.team.gameField = schedule.schedule.venue.name;
                                  //sdata.gameId = schedule.id;
                                  sdata.player.gameLocation = "away";
                                  sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;
                                  //sdata.team.opponentCity = schedule.schedule.homeTeam.city;
                                  sdata.team.opponentId = schedule.schedule.homeTeam.id;

                                  if (sdata.player.officialImageSrc != null) {
                                    sdata.player.image = this.dataService.imageSwap(sdata.player.officialImageSrc);
                                  }
                                   

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

                                  if (sdata.player.officialImageSrc != null) {
                                    sdata.player.image = this.dataService.imageSwap(sdata.player.officialImageSrc);
                                  }
                                  
                                }

                                if (sdata.player.officialImageSrc == null && sdata.player.image == null) {
                                  sdata.player.image = this.playerImages[sdata.player.id] != null ? this.playerImages[sdata.player.id].image : null;
                                }

                             // }
                                
                            } 
                           
                          } 
                        }
                      }

                       for (let team of this.teamRef) {
                         for (let data of this.myData) { 
                            if (team.id === data.starterTeam) {
                              data.team.color = team.teamColoursHex ? team.teamColoursHex[0] : '#000';
                              data.team.accent = team.teamColoursHex ? team.teamColoursHex[1] : '#000';
                              data.team.logo = team.officialLogoImageSrc;
                              data.team.city = team.city;
                              data.team.name = team.name;
                              data.team.twitter = team.twitter;
                            }
                          }  
                       }

                    
                      this.util.updatePlayers(res['playerInfo'].players, this.myData, this.teamRef);    
                    

                    }

                    if (this.myData && this.dailySchedule) {
                      //console.log('start sorting data for pitching opponent...');
                      
                      for (let schedule of this.myData) {

                        for (let sdata of this.myData) {
                          if (sdata.team.opponentId === schedule.team.id && 
                            sdata.gameId === schedule.gameId) {
                            sdata.player.pitchingOpponent = schedule.player.firstName + ' ' + schedule.player.lastName;
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
                           this.mlbUtil.dailyFp(mdata, daily, 'p') 
                          }
                        }
                      }
                //     this.dataService
                //       .getPrevGameId().subscribe(res => {
                //       //  console.log(res, 'got previous games array!');
                //         this.previousGames = res['games'];
                //     });
                //   }
                      this.groupPitchers();
                    } else {
                      this.groupPitchers();
                    }
                  }
                  this.loading = false;
                //});
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
    if (type === 'pitcher') {
      this.showData = this.gameGroups;
      console.log(this.showData, 'show data');
      this.dataService
        .sendStats(this.showData);
    } else {
      this.showBatterData = this.gameBatterGroups.sort((a, b) => {
        if (a.id <= b.id) return -1
        else if (a.id >= b.id) return 1
        else return 0
      });
      console.log(this.showBatterData, 'show Batter data');
    }
  }

  public groupPitchers() {
    this.statData = this.myData.reduce(function(r, a) {
      if(a.team != null){
        r[a.gameId] = r[a.gameId] || [];
        r[a.gameId].push({'gameTime': a['player'].gameTime, 'location': a['player'].gameLocation, 'of': 'of', 'playerObj': a});
      }
      return r
    }, Object.create(null));

    this.gameGroups = Object.keys(this.statData).map((key, index) => {
        return {game: key, pitchers: this.statData[key].sort((a, b) => a.location.localeCompare(b.location))};
    });

    this.gameGroups.sort((a, b) => {
      if (a['pitchers'][0].gameTime <= b['pitchers'][0].gameTime) return -1
      else if (a['pitchers'][0].gameTime >= b['pitchers'][0].gameTime) return 1
      else return 0
    });

    this.showMatchups('pitcher');
  }

  public async sortBatters() {
        
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    if (this.gamesToday === true) {
      
      for (let team of this.teamRef) {
        for (let data of this.teamGames) { 
            if (team.id === data.team) { 
              if (team.gameIds.length === 0)  {
                team.gamesToday += 1;
                team.gameIds.push({game1: data.gameID});
                team.gameStatus1st = data.status;
              } else if (team.gameIds.length === 1)  {
                team.gamesToday += 1;
                team.gameIds.push({game2: data.gameID});
                team.gameStatus2nd = data.status;
              }
          }  
        } 
      }

      

      this.spinTitle = 'Batter Data';
      this.loading = true;

      this.nhlService.myStats(
        'mlb', 
        this.season, 
        'player_gamelogs', 
        'team_stats_totals', 
        'player_stats_totals', 
        batterString, 
        'OF,1B,2B,3B,C,SS,CF,LF,RF,DH', 
        this.teams,
        this.selectedDate, 
        'isToday',
        'stats',
        'mlbPlayers',
        'selectedWeek',
        'noUpdate',
        'none',
        'haveNflSchedules').subscribe(async res => {
          console.log(res, 'mlb stats data')

      // this.dataService
      //       .getDailyBatters(batterString).subscribe(res => {
                //console.log(res, "Daily batter stats...");
                this.dailyBatterStats = res['dailyStats'].gamelogs
                
                // this.dataService
                //   .getBatStats(batterString).subscribe(res => {
                    
                  // let values = [];
                  // if (res != null) values = res['playerStatsTotals'];
                  this.myBatterData = res['playerStats'].playerStatsTotals
                  //console.log(this.myBatterData, 'my batter data');
                      if (this.batterIdData.length > 0 || this.noGamesToday === true) {
                        if (this.myBatterData && this.gameBatters) {
                          for (let gb of this.gameBatters) {
                            for (let data of this.myBatterData) {
                              data.player.gameLocation = "none";
                              if (gb.playerID === data.player.id) {
                                //data.gameId = gb.gameID;
                                data.score = gb.score;
                                data.gameStatus = gb.status;
                                data.starterTeam = gb.team;
                                data.sStatus = gb.scheduleStatus;
                                data.order = gb.position;
                                //this.batterFp(data);
                                this.mlbUtil.fantasyPoints(data,'b')

                                if (gb.status !== "UNPLAYED") {
                                  data.team.currentInning = gb.score['currentInning'];
                                  data.team.currentInningHalf = gb.score['currentInningHalf'];
                                }
                                //console.log(game, 'is game over?');
                                if (gb.status === "COMPLETED" 
                                  || gb.status === "COMPLETED_PENDING_REVIEW") {
                                  data.team.isGameOver = true;
                                  data.team.isGameInProgress = false;
                                  data.team.isGameUnplayed = false;
                                  this.liveGames = false;
                                } else {
                                  data.team.isGameInProgress = true;
                                  data.team.isGameUnplayed = true;
                                  data.team.isGameOver = false;
                                }

                                if (gb.status === "LIVE") {
                                  this.liveGames = true;
                                }

                                if (gb.scheduleStatus === "POSTPONED") {
                                  data.postponed = true;
                                }
                              }
                            }
                          }
                          //console.log('start sorting data for real gameID by PitcherID...');
                        
                          if (this.myBatterData && this.dailySchedule) {
                            let gameDay = null;
                            let originalStart = null;
                            let specialImgNum = null;
                            //console.log('start sorting data for daily schedule for hitters...', this.dailySchedule);
                            for (let schedule of this.dailySchedule) {
                              for (let sdata of this.myBatterData) {
                                gameDay = new Date(this.gameDate);
                                originalStart = new Date(schedule.schedule.startTime);
                                
                                if (schedule.schedule.awayTeam != null && 
                                  schedule.schedule.homeTeam != null) {
                                 // if (gameDay.getDay() === originalStart.getDay()) {

                                    if (schedule.schedule.awayTeam.id === sdata.starterTeam) {
                                      sdata.sStatus = schedule.schedule.scheduleStatus;
                                      sdata.player.gameTime = schedule.schedule.startTime;
                                      sdata.team.gameField = schedule.schedule.venue.name;
                                      //sdata.gameId = schedule.id;
                                      sdata.player.gameLocation = "away";
                                      sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;   
                                      sdata.team.opponentId = schedule.schedule.homeTeam.id;
                                      if (sdata.player.officialImageSrc != null) {
                                        sdata.player.image = this.dataService.imageSwap(sdata.player.officialImageSrc);
                                      }

                                    }
                                    if (schedule.schedule.homeTeam.id === sdata.starterTeam) {
                                      sdata.sStatus = schedule.schedule.scheduleStatus;
                                      sdata.player.gameTime = schedule.schedule.startTime;
                                      sdata.team.gameField = schedule.schedule.venue.name;
                                      //sdata.gameId = schedule.schedule.id;
                                      sdata.player.gameLocation = "home";
                                      sdata.team.opponent = schedule.schedule.awayTeam.abbreviation;
                                      sdata.team.opponentId = schedule.schedule.awayTeam.id;

                                      if (sdata.player.officialImageSrc != null) {
                                        sdata.player.image = this.dataService.imageSwap(sdata.player.officialImageSrc);
                                      }
                                    }

                                    if (sdata.player.officialImageSrc == null && sdata.player.image == null) {
                                      sdata.player.image = this.playerImages[sdata.player.id] != null ? this.playerImages[sdata.player.id].image : null;
                                    }

                                 // }
                                    
                                } 
                              
                              } 
                            }
                          }
                      sleep(2000);
                          for (let team of this.teamRef) {
                            for (let data of this.myBatterData) { 
                                if (team.id === data.starterTeam) {
                                  if (team.gameIds != null && team.gameIds.length === 1) {
                                    data.doubleHeader = false;
                                    data.gameId = team.gameIds[0] ? team.gameIds[0]['game1'] : 0;   
                                  } else if (team.gameIds != null && team.gameIds.length > 1) {
                                    data.gameId = team.gameIds[0] ? team.gameIds[0]['game1'] : 0;
                                    data.doubleHeader = true;
                                    data.secondGameId = team.gameIds[1] ? team.gameIds[1]['game2'] : 0;
                                    data.gameStatus2nd = team.gameStatus2nd;
                                  }
                                  data.team.color = team.teamColoursHex ? team.teamColoursHex[0] : '#000';
                                  data.team.accent = team.teamColoursHex ? team.teamColoursHex[1] : '#000';
                                  data.team.logo = team.officialLogoImageSrc;
                                  data.team.city = team.city;
                                  data.team.name = team.name;
                                  data.team.twitter = team.twitter;
                                  data.gamesToday = team.gamesToday;
                                  data.gamesIds = team.gameIds;
                                  
                                  
                                }
                              }  
                          }

                          this.util.updatePlayers(res['playerInfo'].players, this.myBatterData, this.teamRef)
                        }
                        
                        if (this.myBatterData && this.dailySchedule) {
                          //console.log('start sorting data for pitching opponent...');
                          for (let schedule of this.myBatterData) {
                            for (let sdata of this.myBatterData) {
                              if (sdata.team.opponentId === schedule.team.id && 
                                sdata.gameId === schedule.gameId) {
                                sdata.player.pitchingOpponent = schedule.player.firstName + ' ' + schedule.player.lastName;
                                sdata.team.opponentLogo = schedule.team.logo;
                              }
                            }
                          }
                        }

                        for (let gb of this.gameBatters) {
                          for (let data of this.myBatterData) {
                            //if (gb.playerID === data.player.id) {
                              if (gb.status !== "UNPLAYED" && data.gameId === gb.gameID) {
                                if (data.player.gameLocation === 'home') {
                                  data.team.teamScore = gb.score['homeScoreTotal'];
                                  data.team.opponentScore = gb.score['awayScoreTotal'];
                                } else if (data.player.gameLocation === 'away') {
                                  data.team.teamScore = gb.score['awayScoreTotal'];
                                  data.team.opponentScore = gb.score['homeScoreTotal'];
                                }
                              }

                              if (gb.status !== "UNPLAYED" && data.secondGameId === gb.gameID) {
                                if (data.player.gameLocation === 'home') {
                                  data.team.teamScore2nd = gb.score['homeScoreTotal'];
                                  data.team.opponentScore2nd = gb.score['awayScoreTotal'];
                                } else if (data.player.gameLocation === 'away') {
                                  data.team.teamScore2nd = gb.score['awayScoreTotal'];
                                  data.team.opponentScore2nd = gb.score['homeScoreTotal'];
                                }
                              }
                            //}
                            
                            if (data.team.opponentId === gb.team && 
                              data.gameId === gb.gameID) {
                                data.player.po = gb.name;
                            }
                            
                          }
                        }

                        if (this.myBatterData && this.dailyBatterStats) {
                        // console.log('start sorting data for daily stats...');
                          for (let daily of this.dailyBatterStats) {
                            for (let mdata of this.myBatterData) {
                              if (daily.game.id === mdata.gameId) { 
                                if (daily.player.id === mdata.player.id) {
                                  this.mlbUtil.dailyFp(mdata, daily, 'b1')
                                  //console.log(daily.game, 'get game info by player id')

                                }
                            }

                              if (daily.game.id === mdata.secondGameId) {
                                  if (daily.player.id === mdata.player.id) {
                                  this.mlbUtil.dailyFp(mdata, daily, 'b2')

                                }
                              }
                              
                            }
                          }
                          sleep(1500);
                          for (let mdata of this.myBatterData) {
                              if (mdata.doubleHeader &&  mdata.stats.hitsToday2nd != null) {  
                                mdata.player.fpToday = (mdata.player.fpToday ? mdata.player.fpToday : 0) + (mdata.player.fpToday2nd ? mdata.player.fpToday2nd : 0);
                                mdata.stats.hitsToday = (mdata.stats.hitsToday ? mdata.stats.hitsToday : 0) + (mdata.stats.hitsToday2nd ? mdata.stats.hitsToday2nd : 0);
                                mdata.stats.runsToday = (mdata.stats.runsToday ? mdata.stats.runsToday : 0) + (mdata.stats.runsToday2nd ? mdata.stats.runsToday2nd : 0);
                                mdata.stats.rbiToday = (mdata.stats.rbiToday ? mdata.stats.rbiToday : 0) + (mdata.stats.rbiToday2nd ? mdata.stats.rbiToday2nd : 0);
                                mdata.stats.hrToday = (mdata.stats.hrToday ? mdata.stats.hrToday : 0) + (mdata.stats.hrToday2nd ? mdata.stats.hrToday2nd : 0);
                                mdata.stats.dblToday = (mdata.stats.dblToday ? mdata.stats.dblToday : 0) + (mdata.stats.dblToday2nd ? mdata.stats.dblToday2nd : 0);
                                mdata.stats.tplToday = (mdata.stats.tplToday ? mdata.stats.tplToday : 0) + (mdata.stats.tplToday2nd ? mdata.stats.tplToday2nd : 0);
                                mdata.stats.walksToday = (mdata.stats.walksToday ? mdata.stats.walksToday : 0) + (mdata.stats.walksToday2nd ? mdata.stats.walksToday2nd : 0);
                                mdata.stats.sbToday = (mdata.stats.sbToday ? mdata.stats.sbToday : 0) + (mdata.stats.sbToday2nd ? mdata.stats.sbToday2nd : 0);
                                mdata.stats.hbpToday = (mdata.stats.hbpToday ? mdata.stats.hbpToday : 0) + (mdata.stats.hbpToday2nd ? mdata.stats.hbpToday2nd : 0);
                            }
                          }
                          this.util.teamRecord(this.teamStats, this.myBatterData)
                          this.groupBatters();
                        } else {
                          this.util.teamRecord(this.teamStats, this.myBatterData)
                          this.groupBatters();
                        }
                      }
                      this.loading = false;
                    //});
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

  public groupBatters() {
    this.statBatterData = this.myBatterData.reduce(function(r, a) {
      if(a.team != null){
        r[a.starterTeam] = r[a.starterTeam] || [];
        r[a.starterTeam].push({'gameTime': a['player'].gameTime, 'order': a.order, 'gid': a.gameId, 'location': a['player'].gameLocation, 'of': 'of', 'playerObj': a});
      }
      return r
    }, Object.create(null));

    this.gameBatterGroups = Object.keys(this.statBatterData).map((key, index) => {
        return {gTime: this.statBatterData[key][0].gameTime != null ? this.statBatterData[key][0].gameTime : this.statBatterData[key][1].gameTime != null ? this.statBatterData[key][1].gameTime : 'undefined',
          id: this.statBatterData[key][0].gid != null ?  this.statBatterData[key][0].gid : 
           this.statBatterData[key][1].gid != null ?  this.statBatterData[key][1].gid : 
           this.statBatterData[key][2].gid, game: key, batters: this.statBatterData[key].sort((a, b) => a.order.localeCompare(b.order))};
    });

    this.gameBatterGroups.sort((a, b) => {
      if (a['batters'][0].gameTime <= b['batters'][0].gameTime) return -1
      else if (a['batters'][0].gameTime >= b['batters'][0].gameTime) return 1
      else return 0
    });

    this.showMatchups('batter');
  }

  // public getPreviousGameStats(data) {
  //   this.loadingPrevious = false;
  //  // console.log(data, 'this player has been flipped data...');
  //   //console.log(this.previousGames, 'previous games find player id');
  //   for (let game of this.previousGames) {
  //     if (game['schedule'].awayTeam.abbreviation === data.team.abbreviation ||
  //       game['schedule'].homeTeam.abbreviation === data.team.abbreviation) {

  //       let prevHome = game['schedule'].homeTeam.abbreviation === data.team.abbreviation ? true : false;

  //       this.dataService
  //        .getScore(game['schedule'].id).subscribe(res => {

  //          //console.log(res, 'score of this previous game');

  //          let players = null;

  //          if (prevHome)
  //            players = res.stats.home.players;
  //          else
  //            players = res.stats.away.players;

  //          for (let item of players) {
  //            if (item.player.id === data.player.id) {
  //               this.getAverages(game['schedule'].id);
  //               let stats = item.playerStats[0].pitching;
  //              // console.log(stats, 'stats for', data.player.lastName);
  //               data.pgBlurb1 = (prevHome ? ' vs ' + game['schedule'].awayTeam.abbreviation : ' @ ' +  game['schedule'].homeTeam.abbreviation) + ': ' + stats.pitchesThrown + ' pitches, ' + stats.hitsAllowed + ' hits allowed, sat down ' + stats.pitcherStrikeouts;
  //               data.homeruns1 = stats.homerunsAllowed;
  //               data.previousEra1 = parseFloat(stats.earnedRunAvg).toFixed(2);
  //               data.previousWin1 = stats.wins;
  //               data.previousL1 = stats.losses;
  //               data.previousSO1 = stats.pitcherStrikeouts;
  //               data.walks1 = stats.pitcherWalks;
  //            }
  //          }

  //       })

  //     //  this.http.get(`${this.apiRoot}/games/`+game['schedule'].id+`/playbyplay.json`, { headers })
  //     // .subscribe(res => {
  //     //       console.log(res, 'got play by play game data for ' + data.player.lastName);

  //     //     if (res != null) {}

  //     //   })

  //     }
  //   } 
  // }

  // public getAverages(gid) {

  //   this.http.get(`${this.apiRoot}/games/`+gid+`/playbyplay.json`, { headers })
  //     .subscribe(res => {
  //        // console.log(res, 'got play by play game data for ');

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
  //          //console.log('made groups of pichers pitch speeds by ID...');

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


  // getGameStats(data, gid) {
  // // console.log(data, 'whats going on');
   
  //   this.dataService
  //     .getScore(gid).subscribe(res => {
       
  //         if (res != null) {
  //         //  console.log(res, "Score, Game...");
  //           this.score = res['scoring'];
  //           let game = null;
  //           game = res['game'].playedStatus; //"COMPLETED" playedStatus: "COMPLETED_PENDING_REVIEW"

  //           if (data.player.gameLocation === 'home') {
  //             data.team.teamScore = this.score['homeScoreTotal'];
  //             data.team.opponentScore = this.score['awayScoreTotal'];
  //           } else if (data.player.gameLocation === 'away') {
  //             data.team.teamScore = this.score['awayScoreTotal'];
  //             data.team.opponentScore = this.score['homeScoreTotal'];
  //           }

  //           data.team.currentInning = this.score['currentInning'];
  //           data.team.currentInningHalf = this.score['currentInningHalf'];
  //           data.gameStatus = game;
  //           //console.log(game, 'is game over?');
  //           if (game === "COMPLETED" || game === "COMPLETED_PENDING_REVIEW") {
  //             data.team.isGameOver = true;
  //             data.team.isGameInProgress = false;
  //             data.team.isGameUnplayed = false;
  //           } else {
  //             data.team.isGameInProgress = true;
  //             data.team.isGameUnplayed = true;
  //             data.team.isGameOver = false;
  //           }

  //       }

  //  }, (err: HttpErrorResponse) => {

  //    console.log(err, 'error getting boxscore');

  //  });
  //   //console.log(`${this.apiRoot}/games/`+gid+`/playbyplay.json`);
  //   this.http.get(`${this.apiRoot}/games/`+gid+`/playbyplay.json`, { headers })
  //     .subscribe(res => {
  //           //console.log(res, 'got play by play game data for ' + data.player.lastName);

  //         if (res != null) {

  //         if (res['atBats'] != null) {

  //         res['atBats'].forEach((item2, index) => {

  //            //console.log(item2, 'atbatplay items...');
  //            if (data.team.abbreviation === item2.battingTeam.abbreviation)
  //             data.isTeamPitching = false;
  //            else 
  //              data.isTeamPitching = true;
  //            data.battingTeam = item2.battingTeam.abbreviation;
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

  //                data.batter = f.pitch.battingPlayer.firstName +' '+ f.pitch.battingPlayer.lastName; //id: 16046, firstName: "Tommy", lastName: "Edman", position: "2B", jerseyNumber: 19}
  //                data.pitcher = f.pitch.pitchingPlayer.firstName +' '+ f.pitch.pitchingPlayer.lastName; //id: 12389, firstName: "Josh", lastName: "Hader", position: "P", jerseyNumber: 71}
  //                data.pitchResult = f.pitch.result; //"IN_PLAY_OUTS"
  //                data.throwType = f.pitch.throwType; //"FOUR_SEAM_FASTBALL"
  //                data.throwHand = f.pitch.throwingLeftOrRight; //"L"
  //                data.throwSpeed = f.pitch.ballStartSpeed;

  //                if (data.battingTeam !== data.team.abbreviation 
  //                  && data.pitcher !== data.player.firstName + ' ' + data.player.lastName)
  //                  data.isPitchingRightNow = false;
  //                else 
  //                  data.isPitchingRightNow = true;
     
  //              }

  //              if (f.playStatus  != undefined && f.playStatus != null) {
  //                    //console.log(f.playStatus, 'play status');
  //                    data.team.ballCount = f.playStatus.ballCount;
  //                    data.team.strikeCount = f.playStatus.strikeCount;
  //                    data.team.outCount = f.playStatus.outCount;

  //                   if (f.playStatus['batter'] != null) {
  //                      data.batter = f.playStatus['batter'].firstName + ' ' + f.playStatus['batter'].lastName;
  //                   }
  //                   if (f.playStatus['firstBaseRunner'] != null) {
  //                     data.firstBaseRunner = f.playStatus['firstBaseRunner'].firstName + ' ' + f.playStatus['firstBaseRunner'].lastName;
  //                   }
  //                   if (f.playStatus['secondBaseRunner'] != null) {
  //                     data.secondBaseRunner = f.playStatus['secondBaseRunner'].firstName + ' ' + f.playStatus['secondBaseRunner'].lastName;
  //                   }
  //                   if (f.playStatus['thirdBaseRunner'] != null) {
  //                     data.thirdBaseRunner = f.playStatus['thirdBaseRunner'].firstName + ' ' + f.playStatus['thirdBaseRunner'].lastName;
  //                   }
  //                   data.pitcher = f.playStatus.pitcher['firstName'] + ' ' + f.playStatus.pitcher['lastName'];
  //              }

  //             if (f.batterUp  != undefined && f.batterUp != null) {
  //              data.battingFrom = f.batterUp.standingLeftOrRight;
  //              data.batResult = f.batterUp.result;  
  //             }

  //            })
  //          })

  //          this.speedResults = this.specificFastballData.reduce(function(r, a) {
  //            r[a.pitcher] = r[a.pitcher] || [];
  //            r[a.pitcher].push(a.pitchspeedStart);
  //            return r
  //          }, Object.create(null));
  //         // console.log('made groups of pichers pitch speeds by ID...');

  //        }
  //        this.myData.forEach((data, index) => {


  //          if (this.speedResults[data.player.id]) {
  //            let avg = this.speedResults[data.player.id].reduce((r, a) => {

  //              return r + parseInt(a);

  //            }, 0) / this.speedResults[data.player.id].length;

  //            let max = this.speedResults[data.player.id].reduce(function(a, b) {
  //              return Math.max(a, b);
  //            });

  //            data.player.pitchSpeedAvgToday = Math.floor(avg);
  //            data.player.fastestPitchToday = max;

  //            }

  //         });

  //       }
  //      }, (err: HttpErrorResponse) => {

  //           console.log(err, 'error getting playbyplay');

  //      });

  // }

  ngOnInit() {
    if (this.testBrowser) {
      if (this.players === undefined) {
        this.loadData();
        // get our data every subsequent 10 minutes
        // const MILLISECONDS_IN_TEN_MINUTES = 600000;
        // interval(MILLISECONDS_IN_TEN_MINUTES)
        //   .subscribe(() => {
        //     if (this.gamesToday === true) {
        //       this.dataService
        //         .getDaily(playerString).subscribe(res => {
        //           //console.log(res, "Daily stats updated!");
                
        //           this.dailyStats = res != null ? res['gamelogs'] : [];

        //             if (this.myData && this.dailySchedule) {
        //               //  console.log('start sorting data for pitching opponent...');
                        
        //                   for (let gs of this.gameStarters) {

        //                     for (let data of this.myData) {

        //                     if (gs.playerID === data.player.id) {
        //                       data.gameId = gs.gameID;
        //                       data.score = gs.score;
        //                       data.gameStatus = gs.status;
        //                       data.starterTeam = gs.team;

        //                       if (gs.status !== "UNPLAYED") {
        //                         if (data.player.gameLocation === 'home') {
        //                           data.team.teamScore = gs.score['homeScoreTotal'];
        //                           data.team.opponentScore = gs.score['awayScoreTotal'];
        //                         } else if (data.player.gameLocation === 'away') {
        //                           data.team.teamScore = gs.score['awayScoreTotal'];
        //                           data.team.opponentScore = gs.score['homeScoreTotal'];
        //                         }
        //                         data.team.currentInning = gs.score['currentInning'];
        //                         data.team.currentInningHalf = gs.score['currentInningHalf'];
        //                       }
        //                       //console.log(game, 'is game over?');
        //                       if (gs.status === "COMPLETED" 
        //                         || gs.status === "COMPLETED_PENDING_REVIEW") {
        //                         data.team.isGameOver = true;
        //                         data.team.isGameInProgress = false;
        //                         data.team.isGameUnplayed = false;
        //                         this.liveGames = false;
        //                       } else {
        //                         data.team.isGameInProgress = true;
        //                         data.team.isGameUnplayed = true;
        //                         data.team.isGameOver = false;
        //                       }

        //                       if (gs.status === "LIVE") {
        //                         this.liveGames = true;
        //                       }
        //                     }

        //                   }

        //                 }
        //               }

        //           if (this.myData && this.dailyStats) {
        //             //console.log('start sorting data for daily stats...');
        //             for (let daily of this.dailyStats) {
        //               for (let mdata of this.myData) {

                        

        //                     if (daily.player.id === mdata.player.id) {
        //                       if (daily.stats.pitching.pitcher2SeamFastballs >= 0 && daily.stats.pitching.pitcher4SeamFastballs >= 0 && daily.stats.pitching.pitcherChangeups >= 0 && daily.stats.pitching.pitcherCurveballs >= 0 && daily.stats.pitching.pitcherCutters >= 0 && daily.stats.pitching.pitcherSliders >= 0 && daily.stats.pitching.pitcherSinkers >= 0 && daily.stats.pitching.pitcherSplitters) {
        //                         mdata.player.favPitchToday = Math.max(daily.stats.pitching.pitcher2SeamFastballs, daily.stats.pitching.pitcher4SeamFastballs, daily.stats.pitching.pitcherChangeups, daily.stats.pitching.pitcherCurveballs, daily.stats.pitching.pitcherCutters, daily.stats.pitching.pitcherSliders, daily.stats.pitching.pitcherSinkers, daily.stats.pitching.pitcherSplitters);
        //                         mdata.player.favPitchPercentToday = Math.floor(mdata.player.favPitchToday / daily.stats.pitching.pitchesThrown * 100);
        //                       }
        //                       mdata.playerNotPlayingYet = false;
        //                       //this.liveGames = true;
        //                       mdata.player.playingToday = true;
        //                       mdata.player.winToday = daily.stats.pitching.wins;
        //                       mdata.player.loseToday = daily.stats.pitching.losses;
        //                       mdata.player.saveToday = daily.stats.pitching.saves;
        //                       mdata.player.inningsToday = daily.stats.pitching.inningsPitched;
        //                       mdata.player.earnedrunsToday = daily.stats.pitching.earnedRunsAllowed;
        //                       mdata.player.strikeoutsToday = daily.stats.pitching.pitcherStrikeouts;
        //                       mdata.player.hitsallowedToday = daily.stats.pitching.hitsAllowed;
        //                       mdata.player.pitchesthrownToday = daily.stats.pitching.pitchesThrown;
        //                       mdata.player.eraToday = daily.stats.pitching.earnedRunAvg.toFixed(2);
        //                       mdata.stats.pitcher2SeamFastballsToday = daily.stats.pitching.pitcher2SeamFastballs;
        //                       mdata.stats.pitcher4SeamFastballsToday = daily.stats.pitching.pitcher4SeamFastballs;
        //                       mdata.stats.pitcherChangeupsToday = daily.stats.pitching.pitcherChangeups;
        //                       mdata.stats.pitcherCurveballsToday = daily.stats.pitching.pitcherCurveballs;
        //                       mdata.stats.pitcherCuttersToday = daily.stats.pitching.pitcherCutters;
        //                       mdata.stats.pitcherSlidersToday = daily.stats.pitching.pitcherSliders;
        //                       mdata.stats.pitcherSinkersToday = daily.stats.pitching.pitcherSinkers;
        //                       mdata.stats.pitcherSplittersToday = daily.stats.pitching.pitcherSplitters;
        //                       if (daily.stats.pitching.pitchesThrown > 0 && daily.stats.pitching.wins === 0 && daily.stats.pitching.losses === 0) {
        //                         mdata.playingRightNow = true;

        //                       } else if (daily.stats.pitching.pitchesThrown > 0 && daily.stats.pitching.wins === 1 || daily.stats.pitching.losses === 1) {
        //                         mdata.playingRightNow = false;
        //                         // mdata.playingOver = true;
        //                         this.gameover = true;
        //                       }
        //                     } else {

        //                 }

        //               }
        //             }

                    

        //           }
        //         })

        //     } else {
        //       console.log('No games then no daily stats either. :(');
        //     }
        //   });
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
}
