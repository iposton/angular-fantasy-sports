import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NFLDataService, 
         UtilService, 
         DepthService,
         NflUtilService,
        NHLDataService,
        LocalStorageService } from '../../services/index';
import { isPlatformBrowser } from '@angular/common';
// import { forkJoin } from 'rxjs';
// import { debounceTime } from 'rxjs/operators';
// import * as CryptoJS from 'crypto-js';
// let headers = null;
let playerString = null;
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
  public dailySchedule: Array <any>
  public starterIdData: Array <any> = []
  public batterIdData: Array <any> = []
  public gameStarters: Array <any> = []
  public gameBatters: Array <any> = []
  public dailyTeamStats: Array <any> = []
  public teamSchedules: Array <any> = []
  public toughOSchedules: Array <any> = []
  public dailyLineup: Array <any> = []

  public testBrowser: boolean;
  public gamesToday: boolean = false;
  public noGamesToday: boolean = false;
  public loading: boolean = true;
  public noGamesMsg: string = '';
  public teamRef: Array <any>;
  public gameDate: any;
  public teams: Array <any>
  public myData: Array <any>
  public dailyStats: Array <any>
  public teamStats: Array <any>
  public teamScheds: Array <any>
  public errMessage: string = ''
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
  public nflSeason: string
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
  public depth: any;
  public showMatchup: boolean
  public haveNflSchedules: boolean
  public nflSchedules: any
  public showDef: boolean
  public nflDraftKit: boolean
  public seasonLength   : string = 'dtr'
  public seasonLengthD  : string = 'otr'
  public currentWeek: string
  public isPast: boolean
  public fantasyPoints: boolean
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
    image: any,
    playerType: any;
  }

  public longNames: any = {
    'Edwards-Helaire' : 'Edwards-Helaire',
    'Valdes-Scantling' : 'Valdes-Scantling', 
    'O\'Shaughnessy' : 'O\'Shaughnessy',
    'Roethlisberger' : 'Roethlisberger',
    'Smith-Schuster' : 'Smith-Schuster',
    'Peoples-Jones' : 'Peoples-Jones',
    'Beckham Jr.' : 'Beckham Jr.',
    'Westbrook-Ikhine' : 'Westbrook-Ikhine',
    'Okwuegbunam' : 'Okwuegbunam'
  }
  
  constructor(
    private dataService: NFLDataService,
    private util: UtilService,
    private http: HttpClient,
    private depthService: DepthService,
    private nhlService: NHLDataService,
    private nflUtil: NflUtilService,
    public ls: LocalStorageService,
    @Inject(PLATFORM_ID) platformId: string) {
      this.showMatchup = true;
      this.teams = this.nflUtil.getNFLTeams();
      this.testBrowser = isPlatformBrowser(platformId);
      this.playerImages = this.nflUtil.getNFLImages();
      this.selectedWeek = '1'
      this.nflSeason = '2021-2022-regular'
      weekTimes = this.nflUtil.getWeekTimes();
      this.depth = this.depthService.getNFLDepth();
      this.nflDraftKit = true
      this.showDef = true
      this.isPast = false
      this.fantasyPoints = false
      this.haveNflSchedules = false

      for (let week of weekTimes) {
        let date = new Date();
        if (date > new Date(week.dateBeg) && date < new Date(week.dateEnd)) {
          this.selectedWeek = week.week
          this.currentWeek = week.week
          this.util.nflWeek = week.week
          this.nflSeason = parseInt(this.selectedWeek) > 18 ? '2023-playoff' : '2022-2023-regular'
          if (date < new Date(week.dateEnd)) {
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
    this.type = type
    this.selectedPlayer = null
    this.noPosts = ''
    this.selectedPlayer = player
    console.log('selectedPlayer', this.selectedPlayer)
    let twitter = null
    twitter = player.team.twitter
    let searchterm = null
    searchterm = 'query=' + player.player.lastName + ' ' + twitter
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
    this.loading = true
    this.selectedWeek = week
    this.nflSeason = parseInt(this.selectedWeek) > 18 ? '2023-playoff' : '2022-2023-regular'
    this.haveNflSchedules = (this.teamScheds.length > 0 ? true : false)
    this.dailySchedule = []
    this.starterIdData = []
    playerString = null
    this.dailyStats = []
    this.myData = []
    this.showData = []
    this.liveGames = false
    this.gamesToday = false
    this.noGamesMsg = ''
    this.loadData()
  }

  public loadData() {
  
    if (this.showMatchup) {

        this.nhlService.serverInfo(
        'nfl', 
        '2022-2023-regular', 
        'games', 
        'dateB', 
        'dateE', 
        'player',
        'Offense-RB-1,Offense-TE-1,Offense-QB-1,Offense-WR-1,Offense-WR-2', 
        this.teams,
        this.tsDate, 
        'true',
        'dailySchedule',
        'true',
        this.selectedWeek).subscribe(res => {
          console.log(res, 'client res: schedlule')

          this.dailyLineup = res['dailyLineup']

          for(let item of this.dailyLineup) {
            for(let sched of res['games'].games) {
              if (item.game.id === sched.schedule.id) {
                item.game.score = sched.score
              }
            }
          }

          if (res['games'].games.length === 0) {
            this.loading = false;
            this.noGamesToday = true;
            this.noGamesMsg = "There Are No Games Scheduled Today :(";
            console.log('There are no games being played today.');
          } else {
            this.isPast = this.currentWeek > this.selectedWeek ? true : false
            this.dailySchedule = res['games'].games
            this.teamRef = this.teams //res['references'].teamReferences;
            this.gameDate = res['games'].games[0].schedule.startTime ? res['games'].games[0].schedule.startTime : res['games'].games[1].schedule.startTime
            this.gamesToday = true
            

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
              const afterTomorrow = new Date(today)
              afterTomorrow.setDate(afterTomorrow.getDate() + 5)
            
              
              res.dailyLineup.forEach((item, index) => {
                //console.log(this.dailySchedule[i], 'score for games');
                //console.log(res, 'got starting lineups data!');
                i = index;
                try {
                  game2 = res.dailyLineup[i]['game'];
                  res2 = res.dailyLineup[i]['teamLineups'];
                  score2 = this.dailyLineup[i]['game'].score
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
                            playerID: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? this.depth[res2[i2].team.id][0][position['position']].id : position.player.id,
                            name: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? this.depth[res2[i2].team.id][0][position['position']].lastName : position.player.lastName,
                            team: res2[i2].team.id,
                            gameID: game2.id,
                            score: score2,
                            status: game2.playedStatus,
                            scheduleStatus: game2.scheduleStatus,
                            position: position['position'],
                            startType: 'actual',
                            image: '',//this.depth[res2[i2].team.id][0][position['position']].image != null ? this.depth[res2[i2].team.id][0][position['position']].image : '',
                            playerType: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? pos[this.depth[res2[i2].team.id][0][position['position']].position] : pos[position.player.position]
                          }
                          this.gameStarters.push(this.gameStarter)
                          this.starterIdData.push(this.gameStarter['playerID'])
                        } 
                      }
                      
                      playerString = this.starterIdData.join();
                      
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
                            image: '',//this.depth[res2[i2].team.id][0][position['position']].image != null ? this.depth[res2[i2].team.id][0][position['position']].image : '',
                            playerType: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][position['position']] != null && this.depth[res2[i2].team.id][0]['gdate'] === parseInt(this.selectedWeek) ? pos[this.depth[res2[i2].team.id][0][position['position']].position] : pos[position.player.position]
                          }
                          
                          this.gameStarters.push(this.gameStarter);
                          this.starterIdData.push(this.gameStarter['playerID']);
                        }   
                      }
                      playerString = this.starterIdData.join();        
                    } 
                })
              })
              this.sortData()
          }
        })
      } else {
        this.sortTeamRanks();
      }
  }

  public sortData() {
    if (this.gamesToday === true) {
      this.haveNflSchedules = (this.nflSchedules.length > 0 ? true : false)
      this.nhlService.myStats(
        'nfl', 
        this.nflSeason, 
        'player_gamelogs', 
        'team_stats_totals', 
        'player_stats_totals', 
        playerString, 
        'QB,WR,TE,RB', 
        this.teams,
        this.tsDate, 
        'isToday',
        'stats',
        'nflPlayers',
        this.selectedWeek,
        'noUpdate',
        'none',
        this.haveNflSchedules).subscribe(async res => {
        
          console.log(res, 'nfl stats data')
          this.teamStats = res['teamStats'].teamStatsTotals
          this.teamScheds = res['scheduleGames']

          if (res['scheduleGames'].length > 32) {
            console.log('server added too many schedule objects, truncate')
            res['scheduleGames'].length = 32
            console.log(res['scheduleGames'], 'after truncate')
            this.ls.set('nflSchedules', res['scheduleGames'])
          }

          if (res['scheduleGames'].length === 0) {
            console.log('use nfl schedule from local storage')
            res['scheduleGames'] = this.nflSchedules
            this.teamScheds = res['scheduleGames']
          } else {
            console.log('set to local storage', res['scheduleGames'])
            this.ls.set('nflSchedules', res['scheduleGames'])
          }

          if (this.teamSchedules.length === 0)
            this.sortTeamRanks()

          this.dailyStats = res['dailyStats'].gamelogs
          this.myData = res['playerStats'].playerStatsTotals
          //this.util.updatePlayers(res['playerInfo'].players, this.myData, this.teams)
     
            this.dailyTeamStats = res['team'].gamelogs
            if (this.dailyTeamStats) {
              for (let teamStats of this.dailyTeamStats) {
                for (let team of this.teams) {
                  if (team.id === teamStats.team.id) {
                    team.dTeamStats = teamStats;
                    team.winToday = teamStats.stats.standings.wins
                    team.lossToday = teamStats.stats.standings.losses
                    team.tieToday = teamStats.stats.standings.ties
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
                      data.player.officialImageSrc = gs.image != null ? gs.image : ''
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
                  afterTomorrow.setDate(afterTomorrow.getDate() + 5);
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

                        if (this.playerImages[sdata.player.id] != null) {
                          sdata.player.officialImageSrc = this.playerImages[sdata.player.id].image
                        }

                        if (sdata.stats.rushing && sdata.player.primaryPosition === 'RB' && 
                        sdata.stats.rushing.rushYards < 1 && sdata.stats.rushing.rushTD < 1) {
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
                        data.team.abbreviation = team.abbreviation;
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
                          data.stats.seasonRun = team.seasonRunPlays > team.seasonPassPlays ? true : false;
                          data.teamStats = team.sTeamStats; 
                          data.teamORank = team.offenseRankLs;
                          data.teamDRank = team.defenseRankLs;
                          data.winToday = 0
                          data.lossToday = 0
                          data.tieToday = 0
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
                      this.nflUtil.offenseFp(data)
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
                      this.nflUtil.offDailyFp(mdata, daily)
                      if (mdata.stats.receiving) {
                        mdata.stats.receiving.dailyTotalTouches = daily.stats.rushing ? daily.stats.rushing.rushAttempts + daily.stats.receiving.targets : 0;
                        mdata.stats.receiving.dailyRTouches = daily.stats.rushing ? daily.stats.rushing.rushAttempts : 0;
                        mdata.stats.receiving.dailyPTouches = daily.stats.rushing ? daily.stats.receiving.targets : 0;
                      }
                      // mdata.stats.tacklesToday = daily.stats.tackles ? daily.stats.tackles.tackleTotal : 0;
                      // mdata.stats.pdToday = daily.stats.interceptions ? daily.stats.interceptions.passesDefended : 0;
                      // mdata.stats.sacksToday = daily.stats.tackles ? daily.stats.tackles.sacks : 0;
                      // mdata.stats.intToday = daily.stats.interceptions ? daily.stats.interceptions.interceptions : 0;
                      // mdata.stats.intTdToday = daily.stats.interceptions ? daily.stats.interceptions.intTD : 0;
                      // mdata.stats.ffToday = daily.stats.fumbles ? daily.stats.fumbles.fumForced : 0;
                      // mdata.stats.frToday = daily.stats.fumbles ? daily.stats.fumbles.fumOppRec : 0;
                      // mdata.stats.fumTdToday = daily.stats.fumbles ? daily.stats.fumbles.fumTD : 0;
                      
                    }

                  }
                }

                for (let team of this.teamRef) {
                  for (let data of this.myData) { 
                      if (team.id === data.starterTeam) {
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
                        data.dTeamStats = team.dTeamStats
                        if (team.dTeamStats != null) {
                          data.winToday = this.isPast ? 0 : team.winToday
                          data.lossToday = this.isPast ? 0 : team.lossToday
                          data.tieToday = this.isPast ? 0 : team.tieToday 
                        }
                        
                      }
                    }  
                }
                this.groupPlayers()
              } else {
                this.groupPlayers()
              }
            }
            this.loading = false;
          })

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
  }

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
      if (window.innerWidth < 700) {
        this.mobile = true
        this.util.mobile = this.mobile
        
      }
      this.util.tb = this.testBrowser
      this.nflSchedules = this.ls.get('nflSchedules')
      this.loadData()
    }
  }

  public sortToughest(d) {
    if (d) {
      this.seasonLengthD = 'otr'
      this.showDef = false;
    } else if (!d) {
      this.seasonLength = 'dtr'
      this.showDef = true;
    }
  }

  public seasonChange(sl) {
    console.log(sl, 'season length changed');
    this.seasonLength = sl;
  }

  public sortTeamRanks() {
    this.nflTeamStatsLoading = true
    this.nflUtil.teamFp(this.teams, this.teamStats)
    this.nflUtil.rank(this.teams, this.teamStats, this.selectedWeek)
    this.nflUtil.updateTeamStats(this.teamStats)
    this.nflTeamStats = this.teamStats
    this.nflUtil.sortSchedules(this.teamSchedules, this.selectedWeek, this.teamScheds);
    //console.log(this.nflTeamStats, 'nfl team season stats');
    this.nflTeamStatsLoading = false
  }
}
