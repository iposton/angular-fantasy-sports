import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NBADataService, 
  UtilService, 
  GoogleAnalyticsService, 
  DepthService,
  NbaUtilService,
  NHLDataService } from '../../services/index';
import { isPlatformBrowser } from '@angular/common';
import { interval, forkJoin } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
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
  selector: 'app-starting-five',
  templateUrl: './starting-five.component.html',
  styleUrls: ['./starting-five.component.scss']
})
export class StartingFiveComponent implements OnInit {

  public dailySchedule: Array <any>;
  public teamRef: Array <any>;
  public previousGames: Array <any>;
  public players: Array <any>;
  public allSentData: Array <any>;
  public teamStats: Array <any>;
  public teamStatsUpdate: any;
  public selectedDate: any;
  public starterIdData: Array <any> = [];
  public benchIdData: Array <any> = [];
  public speedResults: Array <any> = [];
  public gameDate: string = '';
  public apiRoot: string = "";
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
  public teamSchedules: any;
  public teamsCompletedPlayingToday: Array <any> = [];
  public selectedWeek: string;
  public tsDate: any;
  public teams: any;
  public dRank: Array <any> = [];
  public oRank: Array <any> = [];
  public tRank: Array <any> = [];
  public gameStarter: { currentTeam: string, gameID: string, playerID: string, score: any, status: any, scheduleStatus: any, playerStatus: any, position: any, bench: boolean };
  public gameStarters: Array <any> = [];
  public benchStarters: Array <any> = [];
  public maxD = new Date(today.getTime() + (24 * 60 * 60 * 1000));
  public mobile: boolean = false;
  public stats: any = '1';
  public twitter: boolean = false;
  public selected: any;
  public playerImages: any;
  public tomorrowDate: any;
  public startersSection: boolean = true;
  public positionSection: boolean = false;
  public scheduleSection: boolean = false;
  public weekResults: boolean = false;
  public isOpen: boolean = false;
  public tweetsData: Array <any> = [];
  public noPosts: any;
  public submitting: boolean = false;
  public selectedPlayer: any;
  public type: any;
  public image: any;
  public name: any;
  public area: any;
  public testBrowser: boolean;
  public depth: any;
  public nextWeek: boolean = false;
  public nbaPlayoffDate: string;
  public isNBAPlayoffs: boolean = false;
  public haveSchedules: boolean
  public nbaSeason: string
  public nbaTeamsSched: Array <any> = []
  public serverInfo: Array <any> = []
  public schedInfo: Array <any> = []
  public dailyLineup: Array <any> = []

  constructor(private dataService: NBADataService,
              public nhlService: NHLDataService, 
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private util: UtilService,
              public gaService: GoogleAnalyticsService,
              private depthService: DepthService,
              private nbaUtil: NbaUtilService,
              @Inject(PLATFORM_ID) platformId: string) {
    this.nbaSeason = '2021-2022-regular';            
    this.apiRoot = `https://api.mysportsfeeds.com/v2.1/pull/nba/${this.nbaSeason}`;
    this.depth = this.depthService.getNBADepth();
    this.allSentData = this.dataService.getSentStats();
    this.players = this.allSentData[0];
    this.myData = this.allSentData[1];
    this.dailySchedule = this.allSentData[2];
    this.stats = '1';
    this.teams = this.nbaUtil.getNBATeams();
    this.playerImages = this.nbaUtil.getNBAImages();
    teams = this.teams;
    let thisDate = new Date();
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
    this.testBrowser = isPlatformBrowser(platformId);
    this.selectedDate = new Date();
    this.nbaPlayoffDate = 'Mon May 17 2022 00:00:00 GMT-0700 (Pacific Daylight Time)'
    this.checkPlayoffs(new Date(this.selectedDate))
    this.haveSchedules = false
    //this.teamSchedules = [];
  }

  public checkPlayoffs(date) {
    if (date > new Date(this.nbaPlayoffDate)) {
      this.nbaSeason = '2022-playoff'
      this.isNBAPlayoffs = true;
      this.dataService.isPlayoffs = this.isNBAPlayoffs;
    } else {
      this.isNBAPlayoffs = false;
      this.dataService.isPlayoffs = this.isNBAPlayoffs;
    } 
  }

  public compareDate (start) {
    if (new Date(start) < this.tomorrowDate) {
      return true;
    } else {
      return false;
    }
  }

  public changeStats() {
    //this.gaService.eventEmitter("nba player stats", "nba", "stats", "click", 10);
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
      this.stats = '7';
    } else if (this.stats === '7') {
      this.stats = '8';
    } else if (this.stats === '8') {
      this.stats = '9';
    } else if (this.stats === '9') {
      this.stats = '10';
    } else if (this.stats === '10') {
      this.stats = '1';
    }
  }

  public getBackground(color) {
    let lighter = this.util.colorLuminance(color, 0.6);
    if (color === "#c4ced4") {
      color = "#000000";
      lighter = "#555555";
    }    
    if (color === "#000000")
      lighter = "#555555";

    return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(${color}, ${lighter})`);
  }

  public getSchedules() {
   // console.log('fetching schedule')
    //this.nbaTeamsSched = this.nextWeek ? this.serverInfo['nextSchedule'] : this.serverInfo['weeklySchedule']

    if (this.nbaTeamsSched.length === 0) {
      console.log('fetching schedule')
      this.nhlService.serverInfo('nba', 
          '2021-2022-regular', 
          'games', 
          'dateB', 
          'dateE', 
          'player', 
          'G', 
          this.teams,
          this.selectedDate, 
          this.dataService.isToday,
          'schedules',
          this.haveSchedules,
          '').subscribe(res => {
            console.log(res, 'schedule info')
            this.schedInfo = res
            this.nbaTeamsSched = this.nextWeek ? this.schedInfo['nextSchedule'] : this.schedInfo['weeklySchedule']
          })

    } else {
      console.log('already have schedule')
      this.nbaTeamsSched = this.nextWeek ? this.schedInfo['nextSchedule'] : this.schedInfo['weeklySchedule']
    }
    
  }


  public getByDate(event) {
    this.loading = true;
    this.dataService.selectedDate(event)
    this.nhlService.selectedDate(event)
    this.selectedDate = event.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
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
    //this.teamSchedules = [];
    this.loadData();
  }

  loadData() {

      this.nhlService.serverInfo(
      'nba', 
      this.nbaSeason, 
      'games', 
      'dateB', 
      'dateE', 
      'player', 
      '', 
      this.teams,
      this.selectedDate, 
      this.dataService.isToday,
      'dailySchedule',
      this.haveSchedules,
      '').subscribe(res => {
        console.log(res, 'client res: schedlule')
        this.serverInfo = res
        this.dailyLineup = res.dailyLineup

        for(let item of this.dailyLineup) {
          for(let sched of res['games'].games)
          if (item.game.id === sched.schedule.id) {
            item.game.score = sched.score
          }
        }

        if (res['games'].games.length === 0) {
          this.loading = false
          this.noGamesToday = true
          this.noGamesMsg = "There Are No Games Scheduled Today :("
          console.log('There are no games being played today.')
        } else {
          if (res['games'].games[0].schedule.playedStatus === "LIVE") {
            this.liveGames = true;    
          }

          this.dailySchedule = res['games'].games
          this.teamRef = res['games']['references'].teamReferences
          teamRef = res['games']['references'].teamReferences
          this.gameDate = this.selectedDate //res['games'][0].schedule.startTime && res['games'][0].schedule.scheduleStatus != 'POSTPONED' ? res['games'][0].schedule.startTime : new Date();
          this.gamesToday = true;
          if (this.nbaTeamsSched.length === 0) {
            //this.nhlService.getSchedules(this.nextWeek, 'nba', teams);
            //this.getSchedules()
          }
        }

          let i = null;
          let i2 = null;
          let res2 = null;
          let game2 = null;
          let score2 = null;
        
          
          this.dailyLineup.forEach((item, index) => {
            //console.log(this.dailySchedule[i], 'score for games');
            //console.log(res, 'got starting lineups data!');
            i = index;
            if (this.dailyLineup[i]['game'].playedStatus != "UNPLAYED" && this.dailyLineup[i]['game'].playedStatus != "COMPLETED") {
              this.liveGames = true;
              //console.log('interval set...');
            }
              
            try {
              game2 = this.dailyLineup[i]['game']
              res2 = this.dailyLineup[i]['teamLineups']
              score2 = this.dailyLineup[i]['game'].score
            } catch {
              console.log('bad endpoint');
            }

            res2.forEach((item, index) => {
              i2 = index;
              //console.log(res2[i2], 'looking of starters');
              
              if (res2[i2].actual != null && res2[i2].expected != null)  {
                //console.log(res2[i2].actual.lineupPositions[0].player, 'got player ID for pitcher..');
                res2[i2].actual.lineupPositions.forEach(item => {
                  //console.log(item, 'whats up');
                  if (starterNames[item.position] && item.player != null) {
                    this.gameStarter = {
                      playerID: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][item['position']] != null && new Date(this.depth[res2[i2].team.id][0]['gdate']).getDate() === new Date(game2.startTime).getDay() ? this.depth[res2[i2].team.id][0][item['position']].id : item.player.id,
                      currentTeam: res2[i2]['team'].abbreviation,
                      gameID: game2.id,
                      score: score2,
                      status: game2.playedStatus,
                      scheduleStatus: game2.scheduleStatus,
                      position: item.position,
                      playerStatus: 'actual',
                      bench: true ? benchNames[item.position] : false
                    }
                    this.gameStarters.push(this.gameStarter);
                    this.starterIdData.push(this.gameStarter['playerID']);
                    
                  }
                })
                playerString = this.starterIdData.join();

              } else if (res2[i2].actual == null && res2[i2].expected != null) {

                  res2[i2].expected.lineupPositions.forEach(item => {
                    // console.log(item, 'whats up');
                    if (starterNames[item.position] && item.player != null) {
                      this.gameStarter = {
                        playerID: this.depth[res2[i2].team.id] && this.depth[res2[i2].team.id][0][item['position']] != null && new Date(this.depth[res2[i2].team.id][0]['gdate']).getDate() === new Date(game2.startTime).getDay() ? this.depth[res2[i2].team.id][0][item['position']].id : item.player.id,
                        currentTeam: res2[i2]['team'].abbreviation,
                        gameID: game2.id,
                        score: score2,
                        status: game2.playedStatus,
                        scheduleStatus: game2.scheduleStatus,
                        playerStatus: 'expected',
                        position: item.position,
                        bench: true ? benchNames[item.position] : false
                      }
                      this.gameStarters.push(this.gameStarter);
                      this.starterIdData.push(this.gameStarter['playerID']);
                      
                    }
                  })
                  playerString = this.starterIdData.join();
                //console.log(res2[i2].expected.lineupPositions[0].player.id, 'got player ID for goalie expected to start!');
                
                
              } else {
                //console.log(res2[i2].team.Name, 'player is not expected or actual yet...');
              }

            });
          });

          this.sortData();
      })
  }

  public async sortData() {
    if (this.gamesToday === true) {

      this.nhlService.myStats(
      'nba', 
      this.nbaSeason, 
      'player_gamelogs', 
      'team_stats_totals', 
      'player_stats_totals', 
      playerString, 
      'G', 
      '',
      this.selectedDate, 
      this.dataService.isToday,
      'stats',
      'nbaPlayers',
      'nflWeek',
      'noUpdate',
      'none',
      'haveSchedules',
      'havePlayerInfo').subscribe(async res => {
       console.log(res, 'stats')
       this.dailyStats = res['dailyStats'].gamelogs
       this.teamStats = res['teamStats'].teamStatsTotals
       this.myData = res['playerStats'].playerStatsTotals
       this.teamStatsUpdate = res['teamStats'].lastUpdatedOn
       const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

          console.log('start sorting my data with gameStarters')
            for (let starter of this.gameStarters) {
              for (let data of this.myData) {
  
                if (starter.playerID === data.player.id) {
                  data.starterInfo = starter;
                  data.gameId = starter.gameID;
                  data.player.position = starter.position;
                  if (data.player['currentTeam'] != null)
                    data.player['currentTeam'].abbreviation = starter.currentTeam;
                  else
                    data.player.currentTeam = {'abbreviation': starter.currentTeam};
                  data.player.lineupTeam = starter.currentTeam;
                  data.gameStatus = starter.status;
                  this.playerFp(data);
                  if (starter.status === "LIVE") {
                    //run interval
                    this.liveGames = true;
                    
                  }
                  if (starter.status !== "UNPLAYED") {
                    data.team.currentQuarter = starter.score['currentQuarter'];
                    data.team.currentIntermission = starter.score['currentIntermission'];
                  }
                }   
              }
            }

          for (let schedule of this.dailySchedule) {
            for (let sdata of this.myData) {

              if (sdata.player['currentTeam'] != null && schedule.schedule.awayTeam.abbreviation === sdata.player['currentTeam'].abbreviation) {
                sdata.player.gameTime = schedule.schedule.startTime;
                sdata.team.gameField = schedule.schedule.venue.name;
                sdata.gameId = sdata.gameId == null ? schedule.schedule.id : sdata.gameId;
                sdata.player.gameLocation = "away";
                sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;
                sdata.team.abbreviation = schedule.schedule.awayTeam.abbreviation;
                sdata.team.opponentId = schedule.schedule.homeTeam.id;
              }
              if (sdata.player['currentTeam'] != null && schedule.schedule.homeTeam.abbreviation === sdata.player['currentTeam'].abbreviation) {
                sdata.player.gameTime = schedule.schedule.startTime;
                sdata.team.gameField = schedule.schedule.venue.name;
                sdata.gameId = sdata.gameId == null ? schedule.schedule.id : sdata.gameId;
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

          for (let team of teamRef) {
            for (let data of this.myData) { 
              if (data.player['currentTeam'] != null && team.id === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.color = team.teamColoursHex[0];
                data.team.accent = team.teamColoursHex[1];
                data.team.logo = team.officialLogoImageSrc;
                data.team.city = team.city;
                data.team.name = team.name;
                data.winToday = false;
                data.lostToday = false;

                // data.dRank = team.dRank;
                // data.oRank = team.oRank;
                // data.teamRank = team.teamRank; //Math.floor(((team.dRank*1 + team.oRank*1) /2));
              } else if (data.player.lineupTeam === team.abbreviation) {
                data.team.color = team.teamColoursHex[0];
                data.team.accent = team.teamColoursHex[1];
                data.team.logo = team.officialLogoImageSrc;
                data.team.city = team.city;
                data.team.name = team.name;
                data.flip = 'inactive';
                data.winToday = false;
                data.lostToday = false;
              } 
            }  
         }
         
         for (let team of this.nhlService.nbaTeamsSched) {
          for (let data of this.myData) { 
            if (data.player['currentTeam'] != null && team.team === data.player['currentTeam'].abbreviation && data.player['currentTeam'].id === data.team.id) {
              data.team.gamesThisWeek = team['schedule'].length;
              data.team.weekSchedule = team['schedule'];
            } 
          }  
         }

         for (let starter of this.gameStarters) {
          for (let data of this.myData) {
            if (starter.playerID === data.player.id) {
              if (starter.status != "UNPLAYED") {
                if (data.player.gameLocation === 'home') {
                  data.team.teamScore = starter.score['homeScoreTotal'];
                  data.team.opponentScore = starter.score['awayScoreTotal'];
                } else if (data.player.gameLocation === 'away') {
                  data.team.teamScore = starter.score['awayScoreTotal'];
                  data.team.opponentScore = starter.score['homeScoreTotal'];
                }
              }
              if (starter.status === "COMPLETED" || starter.status === "COMPLETED_PENDING_REVIEW") {
                if (data.team.teamScore > data.team.opponentScore) {
                  data.winToday = true;
                } else {
                  data.lostToday = true;
                }
              }
            } 
          }
        }

          if (this.myData && this.dailyStats) {
            for (let daily of this.dailyStats) {
              for (let data of this.myData) {
                if (daily.player.id === data.player.id) {
                  data.player.tpm = daily.stats.fieldGoals.fg3PtMade
                  data.player.stl = daily.stats.defense.stl
                  data.player.blk = daily.stats.defense.blk
                  data.player.pts = daily.stats.offense.pts
                  data.player.ast = daily.stats.offense.ast
                  data.player.reb = daily.stats.rebounds.reb
                  data.player.ptsAvg = daily.stats.offense.ptsPerGame
                  data.player.fga = daily.stats.fieldGoals.fgAtt
                  data.player.min = Math.floor(daily.stats.miscellaneous.minSeconds / 60)
                  data.player.tov = daily.stats.defense.tov
                  data.player.fpToday = Math.floor(data.player.pts + (data.player.ast * 1.5) + (data.player.reb * 1.2) + (data.player.stl * 3) + (data.player.blk * 3) - data.player.tov)
                  //data.player.startsdaily.stats.miscellaneous.gamesStarted
                  //data.player.minAvg = Math.floor(daily.stats.miscellaneous.minSecondsPerGame / 60)
                }
              }
            }
          }
          
          this.util.teamRecord(this.teamStats, this.myData)

          this.groups = this.myData.reduce(function (r, a) {
            r[a.player['currentTeam'].abbreviation] = r[a.player['currentTeam'].abbreviation] || [];
            r[a.player['currentTeam'].abbreviation].push({gid: a.gameId, 'of': 'of', 'playerObj': a});
            return r;
           }, Object.create(null));

          this.lineGroups = Object.keys(this.groups).map((key, index) => {
            return {id: this.groups[key][0].gid != null ? this.groups[key][0].gid : 
              this.groups[key][1].gid != null ? this.groups[key][1].gid : 
              this.groups[key][2].gid, 
              team: key, offensePlayers: this.groups[key].filter(item => item.of)};   
          });

          this.showTeams();

      })

    } else {
      console.log('No games then no daily stats either. :(');
    }

  }

  public playerFp(player) {
    player.stats.offense.fp = Math.floor(player.stats.offense.pts + (player.stats.offense.ast * 1.5) + (player.stats.rebounds.reb * 1.2) + (player.stats.defense.stl * 3) + (player.stats.defense.blk * 3) - player.stats.defense.tov);
    player.stats.offense.fpa = Math.floor(player.stats.offense.fp / player.stats.gamesPlayed);
  }

  public showTeams() {
    this.showData = this.lineGroups.sort((a, b) => {
      if (a.id <= b.id) return -1
      else if (a.id >= b.id) return 1
      else return 0
    });
    console.log('show data', this.showData);
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
      document.querySelector("div[id="+anchor+"]").scrollIntoView({behavior: "smooth"});
    } 
  }

  public authorize(event: object) {
    this.isOpen = true;
    this.submitting = true;
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('/authorize', {headers}).subscribe((res) => {
      this.openModal(event['player'], headers, event['area']);
    });
  }

  public openModal(item, headers, area) {
    this.area = area;
    this.type = 'nba';
    this.selectedPlayer = null
    this.noPosts = ''
    this.selectedPlayer = item
    console.log('selectedPlayer', this.selectedPlayer)
    //this.gaService.eventEmitter("nba player info "+(data.playerObj ? data.playerObj.player.lastName : data.player.lastName), "nbatwitter", "tweet", "click", 10);
    let searchterm = null;
    if (area === 'top') {
      searchterm = 'query=' + item.playerObj.player.lastName + ' ' + teams[item.playerObj.player['currentTeam'].abbreviation].twitter;
      this.image = item.playerObj.player.officialImageSrc;
      this.name = item.playerObj.player.firstName + ' ' + item.playerObj.player.lastName +' - '+ item.playerObj.player.primaryPosition +' | #'+ item.playerObj.player.jerseyNumber;
    } else {
      searchterm = 'query=' + item.player.lastName + ' ' + teams[item.player['currentTeam'].abbreviation].twitter;
      this.image = item.player.officialImageSrc;
      this.name = item.player.firstName + ' ' + item.player.lastName +' - '+ item.player.primaryPosition +' | #'+ item.player.jerseyNumber;
    }
    console.log(searchterm, 'search term');
    this.http.post('/search', searchterm, {headers}).subscribe((res) => {
      this.submitting = false;
      this.tweetsData = res['data'].statuses;
      if (this.tweetsData.length === 0) {
        this.noPosts = "No Tweets.";
      }
    });
  }

  ngOnInit() {
    if (this.testBrowser) {
      if (window.innerWidth < 700) {
        this.mobile = true
      }
      if (this.players === undefined) {
        this.loadData()
        console.log('fetch data on init...');
        // get our data every subsequent 10 minutes
        const MILLISECONDS_IN_TEN_MINUTES = 600000
        interval(MILLISECONDS_IN_TEN_MINUTES)
          .subscribe(() => {
            console.log('interval get data again...');
            if (this.gamesToday === true && this.liveGames === true) {
              this.nhlService.myStats(
                'nba', 
                this.nbaSeason, 
                'player_gamelogs', 
                'team_stats_totals', 
                'player_stats_totals', 
                playerString, 
                'G', 
                '',
                this.selectedDate, 
                this.dataService.isToday,
                'stats',
                'nbaPlayers',
                'nflWeek',
                'nbaUpdate',
                'none',
                'haveSchedules',
                'havePlayerInfo').subscribe(async res => {
                  console.log(res, 'updated nba schedule')
                  this.dailyStats = res['dailyStats'].gamelogs
                  this.dailySchedule = res['updatedSchedule'].games

                  if (this.myData && this.dailyStats) {
                    console.log('start sorting data for daily stats...')

                    for (let schedule of this.dailySchedule) {
                      for (let sdata of this.myData) {

                        if (sdata.player != null && schedule['schedule'].awayTeam.abbreviation === sdata.player.currentTeam.abbreviation || sdata.player != null && schedule['schedule'].homeTeam.abbreviation === sdata.player.currentTeam.abbreviation) {
                          sdata.status = schedule['schedule'].playedStatus
                          sdata.gameStatus = schedule['schedule'].playedStatus
                        }
                        if (sdata.player != null && schedule['schedule'].awayTeam.abbreviation === sdata.player.currentTeam.abbreviation) {    
                          sdata.team.teamScore = schedule['score'].awayScoreTotal
                          sdata.team.opponentScore = schedule['score'].homeScoreTotal
                        }
                        if (sdata.player != null && schedule['schedule'].homeTeam.abbreviation === sdata.player.currentTeam.abbreviation) {    
                          sdata.team.teamScore = schedule['score'].homeScoreTotal
                          sdata.team.opponentScore = schedule['score'].awayScoreTotal
                        }

                      }
                    }

                    for (let daily of this.dailyStats) {
                      for (let data of this.myData) {
                        if (daily.player.id === data.player.id) {
                          data.player.pts = daily.stats.offense.pts;
                          data.player.ptsAvg = daily.stats.offense.ptsPerGame;
                          data.player.min = Math.floor(daily.stats.miscellaneous.minSeconds / 60);
                          // data.player.minAvg = Math.floor(daily.stats.miscellaneous.minSecondsPerGame / 60);

                          if (data.status === "COMPLETED" || data.status === "COMPLETED_PENDING_REVIEW") {
                            if (data.team.teamScore > data.team.opponentScore) {
                              data.winToday = true;
                            } else {
                              data.lostToday = true;
                            }
                          }
                        }
                      }
                    }

                  }
              })

            } else {
              console.log('No games or all complete, nothing to update...');
            }
          })
      } else {
          this.loading = false;
          this.showData = this.players;
          this.gameDate = this.showData[0].offensePlayers[0].playerObj['player'].gameTime

          for (let p of this.players) {
            if (p.playingRightNow === true) {
              this.liveGames = true
            } 
            if (p.playingOver === true) {
              this.gameover = true
            }
          }
      }
    }
  }
}
