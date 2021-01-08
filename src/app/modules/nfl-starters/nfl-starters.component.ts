import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NFLDataService, UtilService, RankService, DepthService } from '../../services/index';
import { isPlatformBrowser } from '@angular/common';
import { Observable, interval, forkJoin } from 'rxjs';
import * as CryptoJS from 'crypto-js';
let headers = null;
let playerString = null;
let batterString = null;
let weekTimes = null;
let pos = {
  'QB':'o',
  'WR':'o',
  'RB':'o',
  'TE':'o',
  'LB':'d',
  'S':'d',
  'CB':'d',
  'DE':'d',
  'SS':'d',
  'FS':'d',
  'DB':'d',
  'MLB':'d',
  'ILB':'d',
  'OLB':'d',
  'NT':'d',
  'DT':'d',
  'FB':'n',
  'T':'d',
  'OT':'n',
  'G':'n',
}

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
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-regular";
  public poRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2021-playoff";
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
  public selectedWeek: string;
  public tsDate: any;
  public typeToHideAway: string = 'd';
  public typeToHideHome: string = 'd';
  public isOpen: boolean = false;
  public tweetsData: Array <any> = [];
  public noPosts: any;
  public submitting: boolean = false;
  public selectedPlayer: any;
  public type: any;
  public name: any;
  public image: any;
  public mobile: boolean;
  public repImg: any;
  public depth: any;
  public gameStarter: { 
    gameID: string, 
    name: any, 
    team: any, 
    playerID: string, 
    score: any, 
    status: any, 
    scheduleStatus: any,
    position: any,
    startType: any,
    playerType: any;
  };
  
  constructor(
    private dataService: NFLDataService,
    private util: UtilService,
    private http: HttpClient,
    private rankService: RankService,
    private depthService: DepthService,
    @Inject(PLATFORM_ID) platformId: string) {
      this.teams = this.util.getNFLTeams();
      this.testBrowser = isPlatformBrowser(platformId);
      this.playerImages = this.util.getNFLImages();
      this.repImg = this.util.getRepImages();
      this.selectedWeek = '1';
      weekTimes = this.util.getWeekTimes();
      this.depth = this.depthService.getNFLDepth();

      for (let week of weekTimes) {
        let date = new Date();
        if (date > new Date(week.dateBeg) && date < new Date(week.dateEnd)) {
          this.selectedWeek = week.week;
          if (date < new Date('Tue Jan 05 2021 00:00:00 GMT-0700 (Pacific Daylight Time)')) {
            let utcDate = new Date(week.dateBeg);
            utcDate.setHours(utcDate.getHours() - 24);
            let myDate = new Date(utcDate);
            let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
            this.tsDate = dailyDate; 
          }
        }
      }
  }

  public authorize(item) {
    //console.log(item)
    if (item != null) {
      this.isOpen = true;
      this.submitting = true;
      let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');
  
      this.http.post('/authorize', {headers}).subscribe((res) => {
        this.openModal(item, headers, 'nfl');
      });
    }
  }

  public openModal(player, headers, type) {
    this.type = type;
    this.selectedPlayer = null;
    this.noPosts = '';
    this.selectedPlayer = player;
    let twitter = null;
    twitter = player.team.twitter;
    let searchterm = null;
    searchterm = 'query=' + player.player.lastName + ' ' + twitter;
    this.image = player.player.officialImageSrc;
    this.name = player.player.firstName + ' ' + player.player.lastName +' - '+ player.player.primaryPosition +' | #'+ player.player.jerseyNumber;
    this.http.post('/search', searchterm, {headers}).subscribe((res) => {
      this.submitting = false;
      this.tweetsData = res['data'].statuses;
      if (this.tweetsData.length === 0) {
        this.noPosts = "No Tweets.";
      }
    });
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
    this.liveGames = false;
    this.gamesToday = false;
    this.noGamesMsg = '';
    this.loadData();
  }

  public loadData() {
    this.dataService
      .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));

        this.dataService
          .sendHeaderOptions(headers, this.selectedWeek, this.apiRoot);

        this.dataService
          .getSchedule(this.selectedWeek).subscribe(res => {
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
                    
                     this.http.get(`${parseInt(this.selectedWeek) > 17 ? this.poRoot : this.apiRoot}/games/`+g['schedule'].id+`/lineup.json?position=Offense-RB-1,Offense-TE-1,Offense-QB-1,Offense-WR-1,Defense-DE-1,Defense-CB-1,Defense-S-1,Defense-LB-1`, { headers })
                    
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
                  let week;
                  let startTime;
                  const today = new Date()
                  const afterTomorrow = new Date(today);
                  afterTomorrow.setDate(afterTomorrow.getDate() + 3)
                
                  
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
                      startTime = new Date(game2.startTime);
                      week = game2.week;
                      //console.log(game2, 'game')
                      originalStart = game2.originalStartTime != null ? new Date(game2.originalStartTime) : new Date(game2.startTime);
                      //console.log(gameDay.getDay(), 'game day', originalStart.getDay(), 'original start', game2.homeTeam.abbreviation);
                        i2 = index;
                       
                        if (res2[i2].actual != null && res2[i2].expected != null && startTime < afterTomorrow && week === parseInt(this.selectedWeek)) {

                          for (let position of res2[i2].actual.lineupPositions) {
                            //console.log(pos[position.player.position], pos, position.player.position);
                           if (position.player != null) {
                              this.gameStarter = {
                                playerID: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? this.depth[res2[i2].team.id][0][position['position']].id : position.player.id, //position.player.id,
                                name: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? this.depth[res2[i2].team.id][0][position['position']].lastName : position.player.lastName, //position.player.lastName,
                                team: res2[i2].team.id,
                                gameID: game2.id,
                                score: score2,
                                status: game2.playedStatus,
                                scheduleStatus: game2.scheduleStatus,
                                position: position['position'],
                                startType: 'actual',
                                playerType: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? pos[this.depth[res2[i2].team.id][0][position['position']].position] : pos[position.player.position]
                              }

                              this.gameStarters.push(this.gameStarter);
                              this.starterIdData.push(this.gameStarter['playerID']);

                           } 
                          }
                         
                          playerString = this.starterIdData.join();
                          //batterString = this.batterIdData.join(); 
                          
                        } else if (res2[i2].actual == null && res2[i2].expected != null && startTime < afterTomorrow && week === parseInt(this.selectedWeek)) {
                          //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
                          for (let position of res2[i2].expected.lineupPositions) {
                            //console.log(pos[position.player.position], pos, position.player.position);
                           if (position.player != null) {
                            this.gameStarter = {
                              playerID: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? this.depth[res2[i2].team.id][0][position['position']].id : position.player.id, //position.player.id,
                              name: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? this.depth[res2[i2].team.id][0][position['position']].lastName : position.player.lastName, //position.player.lastName,
                              team: res2[i2].team.id,
                              gameID: game2.id,
                              score: score2,
                              status: game2.playedStatus,
                              scheduleStatus: game2.scheduleStatus,
                              position: position.player ? position.player.position : position['position'],
                              startType: 'expected',
                              playerType: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? pos[this.depth[res2[i2].team.id][0][position['position']].position] : pos[position.player.position]
                            }
                            
                            this.gameStarters.push(this.gameStarter);
                            this.starterIdData.push(this.gameStarter['playerID']);

                            
                          }   
                         }
                          playerString = this.starterIdData.join(); 
                                
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
        .dailyTeams(this.selectedWeek).subscribe(res => {
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
        .getDaily(this.selectedWeek, playerString).subscribe(async res => {
            const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
            //console.log(res, "Daily stats...");
            this.dailyStats = res != null ? res['gamelogs'] : [];

            this.dataService
              .getTeamStats(this.tsDate).subscribe(async res => {

                for (let stats of res['teamStatsTotals']) {
                  for (let team of this.teams) {
                    if (stats.team.id === team.id) {
                      stats.bye = team.bye;
                    }
                  }
                }

                let promiseOne;
                promiseOne = new Promise((resolve, reject) => {
                  this.teams = this.rankService.rankOffense(res['teamStatsTotals'], this.teams, this.selectedWeek);
                  this.teams = this.rankService.rankDefense(res['teamStatsTotals'], this.teams, this.selectedWeek); 
                  resolve();
                })
              
                let resultOne = await promiseOne;

                this.nflTeamStats = res['teamStatsTotals'];
                this.nflTeamStatsLoading = false;
                await sleep(500);
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

              let values = [];
              if (res != null) values = res['playerStatsTotals'];
              this.myData = values;
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
                            data.playerType = gs.playerType;
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
                        let week;
                        const today = new Date()
                        const afterTomorrow = new Date(today);
                        afterTomorrow.setDate(afterTomorrow.getDate() + 3);
                       // console.log('start sorting data for daily schedule...');
                        for (let schedule of this.dailySchedule) {
                          for (let sdata of this.myData) {
                            gameDay = new Date(this.gameDate);
                            originalStart = new Date(schedule.schedule.startTime);
                            week = schedule.schedule.week;

                            //console.log(schedule.schedule, 'teams starting this week below', originalStart, afterTomorrow)
                       
                            
                            if (schedule.schedule.awayTeam != null && 
                              schedule.schedule.homeTeam != null && originalStart < afterTomorrow && week === parseInt(this.selectedWeek)) {

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

                              if (this.repImg[sdata.player.id] != null) {
                                sdata.player.officialImageSrc = this.repImg[sdata.player.id].new;
                              }

                              if (sdata.player.officialImageSrc == null) {
                                sdata.player.officialImageSrc = this.playerImages[sdata.player.id] != null ? this.playerImages[sdata.player.id].image : null;
                              }

                              if (sdata.stats.rushing && sdata.player.primaryPosition === 'RB' && 
                              sdata.stats.rushing.rushYards < 20 && sdata.stats.rushing.rushTD < 1) {
                                  sdata.playerType = 'n';
                              }

                              if (sdata.stats.receiving && sdata.player.primaryPosition === 'TE' && 
                              sdata.stats.receiving.receptions < 1) {
                                  sdata.playerType = 'n';
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
                 
                              if (data.stats.rushing) {
                                data.stats.receiving.seasonTotalTouches = data.stats.rushing.rushAttempts + data.stats.receiving.targets;
                                data.stats.receiving.seasonTotalTouchPct = Math.floor(data.stats.receiving.seasonTotalTouches / team.seasonPlays * 100);
                                data.stats.rushing.seasonTRPct = Math.floor(data.stats.rushing.rushAttempts / team.seasonRunPlays * 100);
                                data.stats.receiving.seasonTCPct = Math.floor(data.stats.receiving.targets / team.seasonPassPlays * 100);
                              }
                                data.stats.teamSRYards = team.seasonRY;
                                data.stats.teamSPYards = team.seasonPY;
                                data.stats.teamSRPlays = team.seasonRunPlays;
                                data.stats.teamSPPlays = team.seasonPassPlays;
                                data.stats.teamSRPct = Math.floor(team.seasonRunPlays / team.seasonPlays * 100);
                                data.stats.teamSPPct = Math.floor(team.seasonPassPlays / team.seasonPlays * 100);
                                data.stats.seasonRun = team.seasonRun;
                                data.teamStats = team.sTeamStats; 
                                data.teamORank = team.offenseRankLs;
                                data.teamDRank = team.defenseRankLs;
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
                          
                          // if (data.team.opponentId === gs.team && 
                          //   data.gameId === gs.gameID) {
                          //     data.player.po = gs.name;
                          // }
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

                    if (this.myData && this.dailyStats.length > 0) {
                     // console.log('start sorting data for daily stats...');
                      for (let daily of this.dailyStats) {
                        for (let mdata of this.myData) {

                          if (daily.player.id === mdata.player.id) {
                            
                            mdata.player.fpToday = 0;
                            mdata.gameId = daily.game.id;
                            mdata.stats.recToday = daily.stats.receiving ? daily.stats.receiving.receptions : 0;
                            mdata.stats.tyToday = daily.stats.receiving ?  daily.stats.receiving.recYards + daily.stats.rushing.rushYards : 0;
                            mdata.stats.tqbyToday = daily.stats.passing ?  daily.stats.passing.passYards + daily.stats.rushing.rushYards : 0;
                            mdata.stats.ttdToday = daily.stats.receiving ? daily.stats.passing.passTD + daily.stats.rushing.rushTD + daily.stats.receiving.recTD  : 0;
                            if (mdata.stats.receiving) {
                              mdata.stats.receiving.dailyTotalTouches = daily.stats.rushing ? daily.stats.rushing.rushAttempts + daily.stats.receiving.targets : 0;
                              mdata.stats.receiving.dailyRTouches = daily.stats.rushing ? daily.stats.rushing.rushAttempts : 0;
                              mdata.stats.receiving.dailyPTouches = daily.stats.rushing ? daily.stats.receiving.targets : 0;
                            }
                            mdata.stats.tacklesToday = daily.stats.tackles ? daily.stats.tackles.tackleTotal : 0;
                            mdata.stats.pdToday = daily.stats.interceptions ? daily.stats.interceptions.passesDefended : 0;
                            mdata.stats.sacksToday = daily.stats.tackles ? daily.stats.tackles.sacks : 0;
                            mdata.stats.intToday = daily.stats.interceptions ? daily.stats.interceptions.interceptions : 0;
                            mdata.stats.intTdToday = daily.stats.interceptions ? daily.stats.interceptions.intTD : 0;
                            mdata.stats.ffToday = daily.stats.fumbles ? daily.stats.fumbles.fumForced : 0;
                            mdata.stats.frToday = daily.stats.fumbles ? daily.stats.fumbles.fumOppRec : 0;
                            mdata.stats.fumTdToday = daily.stats.fumbles ? daily.stats.fumbles.fumTD : 0;
                            
                          }

                        }
                      }

                      for (let team of this.teamRef) {
                        for (let data of this.myData) { 
                           if (team.id === data.team.id) {
                             if (data.stats.receiving) {
                              data.stats.receiving.dailyTotalTouchPct = Math.floor(data.stats.receiving.dailyTotalTouches / team.dailyPlays * 100);
                              data.stats.rushing.dailyTRPct = Math.floor(data.stats.rushing.rushAttempts / team.dailyRunPlays * 100);
                              data.stats.receiving.dailyTCPct = Math.floor(data.stats.receiving.targets / team.dailyPassPlays * 100);
                             }
                              
                              data.stats.teamDRYards = team.dailyRY;
                              data.stats.teamDPYards = team.dailyPY;
                              data.stats.teamDRPlays = team.dailyRunPlays;
                              data.stats.teamDPPlays = team.dailyPassPlays;
                              data.stats.teamDRPct = Math.floor(team.dailyRunPlays / team.dailyPlays * 100);
                              data.stats.teamDPPct = Math.floor(team.dailyPassPlays / team.dailyPlays * 100);
                              data.stats.dailyRun = team.dailyRun;
                              data.dTeamStats = team.dTeamStats; 
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
      if (window.innerWidth < 700) { // 768px portrait
        this.mobile = true;
      }
      this.loadData();
    }
  }

}
