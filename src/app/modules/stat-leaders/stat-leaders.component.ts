import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { NBADataService, 
  NHLDataService, 
  DataService,
  UtilService, 
  GoogleAnalyticsService,
  NFLDataService,
  NhlUtilService,
  NbaUtilService,
  MlbUtilService,
  NflUtilService,
  LocalStorageService } from '../../services/index';
import * as CryptoJS from 'crypto-js';
import { forkJoin } from 'rxjs';

let headers = null;
let today = new Date();
let repImg = null;
let nflplayerImages = null;
let nbabig = {'C':'C', 'PF':'PF'}
let nbasmall = {'SF':'SF', 'SG':'SG', 'PG':'PG'}

@Component({
  selector: 'app-stat-leaders',
  templateUrl: './stat-leaders.component.html',
  styleUrls: ['./stat-leaders.component.scss']
})
export class StatLeadersComponent implements OnInit {

  public teamRef: Array <any>
  public allSentData: Array <any>
  public nbaSeasonType: string
  public nflSeasonType: string
  public nhlSeasonType: string
  public mlbSeasonType: string
  public myData: Array <any>;
  public fgPlayers: Array <any>;
  public smPlayers: Array <any>;
  public pitcherERA: Array <any>;
  public closerERA: Array <any>;
  public mlbPitchingData: Array <any>;
  public mlbHittingData: Array <any>;
  public nflOffenseData: Array <any>;
  public nflData: Array <any>;
  public nflDefenseData: Array <any>;
  public gamesByID: Array<any> = []

  public st1: any; //passing
  public st2: any;
  public st3: any;
  public st4: any;
  public st5: any;
  public st6: any;
  public sf1: any; //passYards
  public sf2: any;
  public sf3: any;
  public sf4: any;
  public sf5: any;
  public sf6: any;
  public t1: any; //Passing Yards
  public t2: any;
  public t3: any;
  public t4: any;
  public t5: any;
  public t6: any;
  public tag1: any; //PY
  public tag2: any;
  public tag3: any;
  public tag4: any;
  public tag5: any;
  public tag6: any;

  public newDefenseData: Array <any>;
  public newGoalieData: Array <any>;
  public nhlSkaters: Array <any>;
  public dSkaters: Array <any>;
  public fSkaters: Array <any>;
  public nhlGoaltenders: Array <any>;
  public gaaGoalies: Array <any>;
  public loading: boolean;
  public nhlSkaterloading: boolean;
  public nhlGoalieloading: boolean;
  public mlbPitchingLoading: boolean;
  public mlbHittingLoading: boolean;
  public nflOffenseLoading: boolean;
  public nflDefenseLoading: boolean;
  public noGamesMsg: string = '';
  public errMessage: string = '';
  public tsDate: any;
  public nbaTeams: any;
  public nhlTeams: any;
  public mlbTeams: any;
  public nflTeams: any;
  public mobile: boolean = false;
  public stats: any = '1';
  public twitter: boolean = false;
  public selected: any;
  public playerImages: any;
  public mlbplayerImages: any;
  public nhlplayerImages: any;
  public tomorrowDate: any;
  public mlbSection: boolean = false;
  public mlbHittingSection: boolean = false;
  public nbaSection: boolean = false;
  public nhlSection: boolean = false;
  public nflSection: boolean = false;
  public nflDefenseSection: boolean = false;
  public nflTeamLoading: boolean = false;
  public nhlGoalies: boolean = false;
  public weekResults: boolean = false;
  public page: number
  public amount: number
  public getAll: boolean = true;
  public isOpen: boolean = false;
  public tweetsData: Array <any> = [];
  public noPosts: any;
  public submitting: boolean = false;
  public selectedPlayer: any;
  public type: any;
  public nflTeamStats: any;
  public name: any;
  public image: any;
  public teamSchedules: Array <any> = []
  public nflPlayers: Array <any> = []
  public nflRookies: Array <any> = []
  public nfl22Rookies: Array <any> = []
  public defenseRookies: Array <any> = []
  public nflDPlayers: Array <any> = []
  public nflDraftKit: boolean
  public skaterRookies: Array <any> = []
  public pitcherRookies: Array <any> = []
  public hitterRookies: Array <any> = []
  public nbaRookies: Array <any> = []
  public seasonLength   : string = 'full';
  public seasonLengthD  : string = 'full';
  public testBrowser: boolean
  public timeSpan: string = 'full'
  public nbaSpanGames: Array <any> = []
  public reduced: Array <any> = []
  public crunched: Array <any> = []
  public combined: Array <any> = []
  public sport: string
  public nflWeek: any
  public week: any = 'all'
  public defaultWeek: string = ''
  public hitterPosition: string
  public schedules: any
  public wlPlayers: any
  public nflWl: any
  public mlbHitWl: any
  public mlbWl: any

  public crunchedDef: Array <any> = []
  public nhlSeason: boolean = true
  public nbaSeason: boolean = true
  public mlbSeason: boolean = true
  public nflSeason: boolean = true
  public nflPosition: string
  public nflDPosition: string
  public haveNflSchedules: boolean
  public havePlayerInfo: boolean
  public pStats: boolean
  public nflSchedules: any
  public selectedPlayerInfo: any
  public nflFavorites: any
  public favorites: any
  
  constructor(private nbaService: NBADataService,
              private nhlService: NHLDataService,
              private mlbService: DataService,
              private http: HttpClient,
              private util: UtilService,
              public gaService: GoogleAnalyticsService,
              public nflService: NFLDataService,
              public nhlUtil: NhlUtilService,
              public nbaUtil: NbaUtilService,
              public mlbUtil: MlbUtilService,
              public nflUtil: NflUtilService,
              public ls: LocalStorageService,
              @Inject(PLATFORM_ID) platformId: string) {
    //default sport load
    this.page = 29
    this.amount = -1
    this.pStats = true
    this.nflSection = true
    this.sport = 'nfl'
    this.nflDraftKit = false
    this.nflWeek = '1'
    this.util.nflWeek = '1'
    this.nflPosition = 'qb'
    this.nflDPosition = 'LB,DT,DE,OLB,ILB,MLB'
    this.nhlSection = false
    this.mlbSection = false
    //this.sport = 'mlb'
    this.hitterPosition = 'OF,LF,RF,CF'
    //default sport load

    this.st1 = 'passing'
    this.sf1 = 'passYards'
    this.t1 = 'Passing Yards'
    this.tag1 = 'PY'

     this.st2 = 'rushing'
     this.sf2 = 'rushYards'
     this.t2 = 'QB Rush Yards'
     this.tag2 = 'RY'

     this.st3 = 'passing'
     this.sf3 = 'totalPassPct'
     this.t3 = 'Pass % of All Plays'
     this.tag3 = '%'

    this.st4 = 'passing'
    this.sf4 = 'totalPassYards'
    this.t4 = 'Rookie Total Yds'
    this.tag4 = 'Yds'

    this.st5 = 'receiving'
    this.sf5 = 'fanDuelFP'
    this.t5 = 'Fantasy Points'
    this.tag5 = 'FP'

    this.st6 = 'receiving'
    this.sf6 = 'fanDuelFPA'
    this.t6 = 'Fantasy Points Average'
    this.tag6 = 'FPA'
    //default sport load
    
    this.stats = '1'
    this.nbaTeams = this.nbaUtil.getNBATeams()
    this.nhlTeams = this.nhlUtil.getNHLTeams()
    this.mlbTeams = this.mlbUtil.getMLBTeams()
    this.nflTeams = this.nflUtil.getNFLTeams()
    this.playerImages = this.nbaUtil.getNBAImages()
    nflplayerImages = this.nflUtil.getNFLImages()
    this.mlbplayerImages = this.mlbUtil.getMLBImages()
    this.nhlplayerImages = this.nhlUtil.getNHLImages()
    

    
    let thisDate = new Date()
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000))
    this.testBrowser = isPlatformBrowser(platformId)
    let weekTimes = this.nflUtil.getWeekTimes()
    this.nflSeasonType = '2022-2023-regular'
    //reset global daily date
    this.nhlService.selectedDate(this.nhlService.dailyDate)

    for (let week of weekTimes) {
      let date = new Date()
      if (date > new Date(week.dateBeg) && date < new Date(week.dateEnd)) {
        this.nflWeek = week.week
        this.util.nflWeek = week.week 
        this.nflSeasonType = this.nflWeek > 18 ? '2024-playoff' : '2023-2024-regular'
        this.nflSeason = this.nflWeek > 18 ? false : true
        // this.timeSpan = week.week
        // this.week = week.week
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

  public updateEndpoint() {

    if (this.sport === 'nfl') {
      this.nflSeasonType = this.nflSeason ? '2023-2024-regular' : '2024-playoff' 
     
      if (this.nflSection) { 
        this.loadNFL()
      } else {
        this.defensePlayers()
      }
    }

    if (this.sport === 'nba') {
      this.nbaSeasonType = this.nbaSeason ? "2021-2022-regular" : "2022-playoff";
     
      if (this.nbaSection) { 
        this.sortNBA()
      }
    }

    if (this.sport === 'nhl') {
        this.nhlSeasonType = this.nhlSeason ? "2021-2022-regular" : "2022-playoff";
       
        if (this.nhlSection) { 
          this.sortNHL()
        } else {
          this.goalies()
        }
    }

    if (this.sport === 'mlb') {
      // this.mlbApiRoot = this.mlbSeason ? "https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular" : "https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-playoff"

      this.mlbSeasonType = this.mlbSeason ? "2022-regular" : "2022-playoff"
      
      if (this.mlbSection) { 
        this.loadMLB()
      } else {
        this.loadHitters()
      }
    }
  }

  public authorize(event: object) {
    this.isOpen = true
    this.submitting = true
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded')

    this.http.post('/authorize', {headers}).subscribe((res) => {
      this.openModal(event['player'], headers, event['type'])
    });
  }

  public openModal(player, headers, type) {
    this.type = type
    this.selectedPlayer = null
    this.noPosts = ''
    this.selectedPlayer = player
    console.log('selectedPlayer', this.selectedPlayer.player.id, this.selectedPlayer)
    //this.gaService.eventEmitter("nba player info "+(data.playerObj ? data.playerObj.player.lastName : data.player.lastName), "nbatwitter", "tweet", "click", 10);
    let twitter = null;
    twitter = type === 'nba' ? this.nbaTeams[player.player['currentTeam'].abbreviation].twitter : type === 'nhl' ? this.nhlTeams[player.player['currentTeam'].abbreviation].twitter : player.team.twitter;
    let searchterm = null;
    searchterm = 'query=' + player.player.lastName + ' ' + twitter;
    this.image = player.player.officialImageSrc;
    this.name = player.player.firstName + ' ' + player.player.lastName +' - '+ player.player.primaryPosition +' | #'+ player.player.jerseyNumber;
    this.http.post('/search', searchterm, {headers}).subscribe((res) => {
      this.submitting = false
      console.log(res['data'].errors[0].message, 'twitter api response.')
      this.tweetsData = res['data'].statuses
      // if (this.tweetsData.length === 0) {
      //   this.noPosts = "No Tweets."
      // }
    })
  }

  public getByDate(event, type) {
    console.log('trying to get stats for', event, type)
    this.sport = type
    if (this.sport === 'nba')
      this.loading = true;
    if (this.sport === 'nhl' && this.nhlSection)
      this.nhlSkaterloading = true;
    if (this.sport === 'nhl' && this.nhlGoalies)
      this.nhlGoalieloading = true;
    if (this.sport === 'mlb' && this.mlbSection)
      this.mlbPitchingLoading = true;
    if (this.sport === 'mlb' && this.mlbHittingSection)
      this.mlbHittingLoading = true;
    this.timeSpan = event
    this.combined = [];
    this.crunched = [];
    this.reduced = [];

    if (type === 'nba') {
      this.sortNBA();
    }

    if (type === 'nhl' && this.nhlSection) {
      this.sortNHL();
    }

    if (type === 'nhl' && this.nhlGoalies) {
      this.goalies();
    }

    if (type === 'mlb' && this.mlbSection) {
      this.loadMLB();
    }

    if (type === 'mlb' && this.mlbHittingSection) {
      this.loadHitters();
    } 
  }

  public onChange(week) {
    this.defaultWeek = week
    this.week = week
    this.nflSeasonType = week > 18 ? '2024-playoff' : '2023-2024-regular'
    this.timeSpan = week
    this.combined = []
    this.reduced = []
    if (this.nflDefenseSection) {
      this.defensePlayers()
    } else if (this.nflSection) {
      this.nflFavorites = this.favorites.filter(player => player.dateAdded != null && player.dateAdded === this.week)
      console.log(this.nflFavorites, 'nfl favorites')
      this.loadNFL()
    } 
  }

  public onPosChange(p) {

     this.st1 = p === 'qb' ? 'passing' : p === 'rb' ? 'rushing' : p === 'wr' ? 'receiving' : p === 'te' ? 'receiving' : p === 'k' ? 'fieldGoals' : ''
     this.sf1 = p === 'qb' ? 'passYards' : p === 'rb' ? 'rushYards' : p === 'wr' ? 'recYards' : p === 'te' ? 'recYards' : p === 'k' ? 'fgMade' : ''
     this.t1 = p === 'qb' ? 'Passing Yards' : p === 'rb' ? 'Rush Yards' : p === 'wr' ? 'WR Yards' : p === 'te' ? 'TE Yards' : p === 'k' ? 'FieldGoals' : ''
     this.tag1 = p === 'qb' ? 'PY' : p === 'rb' ? 'RY' : p === 'wr' ? 'Yds' : p === 'te' ? 'Yds' : p === 'k' ? 'FG' : ''

     this.st2 = p === 'qb' ? 'rushing' : p === 'rb' ? 'receiving' : p === 'wr' ? 'receiving' : p === 'te' ? 'receiving' : p === 'k' ? 'fieldGoals' : ''
     this.sf2 = p === 'qb' ? 'rushYards' : p === 'rb' ? 'receptions' : p === 'wr' ? 'receptions' : p === 'te' ? 'receptions' : p === 'k' ? 'longFgMade' : ''
     this.t2 = p === 'qb' ? 'QB Rush Yards' : p === 'rb' ? 'RB Receptions' : p === 'wr' ? 'WR Receptions' : p === 'te' ? 'TE Receptions' : p === 'k' ? 'FG +40Yards' : ''
     this.tag2 = p === 'qb' ? 'RY' : p === 'rb' ? 'Rec' : p === 'wr' ? 'Rec' : p === 'te' ? 'Rec' : p === 'k' ? 'FG' : ''

     this.st3 = p === 'qb' ? 'passing' : p === 'rb' ? 'rushing' : p === 'wr' ? 'receiving' : p === 'te' ? 'receiving' : p === 'k' ? '' : ''
     this.sf3 = p === 'qb' ? 'totalPassPct' : p === 'rb' ? 'touchRunPct' : p === 'wr' ? 'touchCatchPct' : p === 'te' ? 'touchCatchPct' : p === 'k' ? '' : ''
     this.t3 = p === 'qb' ? 'Pass % of All Plays' : p === 'rb' ? 'Touch % of All Rush Plays' : p === 'wr' ? 'Target % of All Pass Plays' : p === 'te' ? 'Target % of All Pass Plays' : p === 'k' ? '' : ''
     this.tag3 = '%'

     this.st4 = p === 'qb' ? 'passing' : p === 'rb' ? 'receiving' : p === 'wr' ? 'receiving' : p === 'te' ? 'receiving' : p === 'k' ? 'fieldGoals' : ''
     this.sf4 = p === 'qb' ? 'totalPassYards' : p === 'rb' ? 'totalYards' : p === 'wr' ? 'totalYards' : p === 'te' ? 'totalYards' : p === 'k' ? 'fgMade' : ''
     this.t4 = p === 'k' ? 'Rookie FieldGoals' : 'Rookie Total Yds'
     this.tag4 = p === 'k' ? 'FG' : 'Yds'

     this.st5 = p === 'k' ? 'fieldGoals' : 'receiving'
     this.sf5 = 'fanDuelFP'
     this.t5 = 'Fantasy Points'
     this.tag5 = 'FP'

     this.st6 = p === 'k' ? 'fieldGoals' : 'receiving'
     this.sf6 = 'fanDuelFPA'
     this.t6 = 'Fantasy Points Average'
     this.tag6 = 'FPA'

     this.week = 'all'
     this.timeSpan = 'full'
     this.nflPosition = p
     this.defaultWeek = ''
     //temparary to save player info before season starts
     this.getSelectedPlayerInfo(this.nflPosition)
     //temparary to save player info before season starts
     //this.deletePlayerInfo(this.nflPosition)
     this.ls.set('watchList', this.wlPlayers)
     this.loadNFL()
  }

  public getSelectedPlayerInfo(position) {
    console.log(`getting player info ${position}`)
    this.selectedPlayerInfo = this.ls.get(position+'Info')
    this.selectedPlayerInfo = this.selectedPlayerInfo != null  ? this.selectedPlayerInfo : []
  }

  public deletePlayerInfo(position) {
    console.log(`deleting player info ${position}`)
    this.ls.delete(position+'Info')
  }

  public onHitterChange(p) {
    this.hitterPosition = p
    this.timeSpan = 'full'
    this.loadHitters()
  }

  public onPosDChange(p) {
    console.log(p+' : new nfl defense position')
    this.week = 'all'
    this.timeSpan = 'full'
    this.nflDPosition = p
    this.defaultWeek = ''
    this.defensePlayers()
  }

  public spanGames() {
    let type = null
    let season= null
    if (this.sport === 'nba' && this.nbaSection) {
      this.loading = true
      season = this.nbaSeasonType
    }
      

    if (this.sport === 'nhl' && this.nhlSection) {
      this.nhlSkaterloading = true
      season = this.nhlSeasonType
      type = 'skaters'
    }
      
    if (this.sport === 'nhl' && this.nhlGoalies) {
      this.nhlGoalieloading = true
      season = this.nhlSeasonType
      type = 'goalies'
    }

    if (this.sport === 'mlb' && this.mlbSection) {
      this.mlbPitchingLoading = true
      season = this.mlbSeasonType
      type = 'pitchers'
    }
      
    if (this.sport === 'mlb' && this.mlbHittingSection) {
      this.mlbHittingLoading = true;
      season = this.mlbSeasonType;
      type = 'batters'
    }

    if (this.sport === 'nfl') {     
      season = '2023-2024-regular'
    }

      this.nhlService.myStats(
        this.sport, 
        season, 
        'player_gamelogs', 
        'team_stats_totals', 
        'player_stats_totals', 
        'player', 
        this.nflPosition, 
        this.nflTeams,
        this.tsDate, 
        'isToday',
        'spanStats',
        'nflOffense',
        'nflWeek',
        'nflSpanUpdate',
        this.timeSpan,
        this.haveNflSchedules,
        this.havePlayerInfo).subscribe(async res => {
          console.log(res, this.sport+' span stats data')

      if (this.sport != 'nfl') {
        this.sortStats(res['boxscores'], this.sport, type)
      } else if (this.sport === 'nfl' && this.nflSection) {
        this.sortNFLStats(res['boxscores'], this.sport, type, this.nflTeams)
      } else if (this.sport === 'nfl' && this.nflDefenseSection) {
        this.sortNFLDStats(res['boxscores'], this.sport, type, this.nflTeams)
      }
      
    })
  }

  public sortNHL() {
    this.nbaSection = false
    this.nhlSection = true 
    this.mlbSection = false
    this.mlbHittingSection = false
    this.nhlGoalies = false
    this.nflSection = false
    this.nflDefenseSection = false
    this.nflDraftKit = false
    this.sport = 'nhl'
    this.nhlSkaterloading = true

    this.nhlService.myStats(
      'nhl', 
      this.nhlSeasonType, 
      'player_gamelogs', 
      'team_stats_totals', 
      'player_stats_totals', 
      'player', 
      'RW,LW,D,C', 
      this.nhlTeams,
      this.tsDate, 
      'isToday',
      'stats',
      'nhlGoalies',
      'all',
      'noUpdate',
      'none',
      'haveSchedules',
      'havePlayerInfo').subscribe(async res => {
        console.log(res, 'nhl stats data')

        this.nhlSkaters = res['playerStats'].playerStatsTotals.filter(player => player.stats != null && player.stats.gamesPlayed > 1)
        this.skaterRookies = res['playerStats'].rookies ? res['playerStats'].rookies : []
        this.nhlInfo(this.nhlSkaters)
        this.nhlInfo(this.skaterRookies)

        //this.util.updatePlayers(res['players'], this.nhlSkaters, nhlTeamsArray)

        if (this.timeSpan === 'full') {
          this.dSkaters = this.nhlSkaters.filter(player => player.player.primaryPosition === 'D')
          this.fSkaters = this.nhlSkaters.filter(player => player.player.primaryPosition != 'D')
        }
          
        if (this.timeSpan != 'full') {
          this.spanGames()
        } else {
          this.nhlSkaterloading = false
        } 
    })
  }

  public goalies() {
    this.nhlGoalieloading = true

      this.nhlService.myStats(
        'nhl', 
        this.nhlSeasonType, 
        'player_gamelogs', 
        'team_stats_totals', 
        'player_stats_totals', 
        'player', 
        'G', 
        this.nhlTeams,
        this.tsDate, 
        'isToday',
        'stats',
        'nhlGoalies',
        'all',
        'noUpdate',
        'none',
        'haveSchedules',
        'havePlayerInfo').subscribe(async res => {
         console.log(res, 'stats')

        const nhlTeamsArray = Object.values(this.nhlTeams)
        this.nhlGoaltenders = res['playerStats'].playerStatsTotals.filter(player => player.stats != null && player.stats.gamesPlayed > (this.nhlSeason ? 2 : 0))
        this.gaaGoalies = this.nhlGoaltenders.filter(player => player.stats.goaltending['gamesStarted'] > (this.nhlSeason ? 2 : 0) && player.stats.goaltending.saves > (this.nhlSeason ? 50 : 15))
        //this.nhlInfo(this.nhlGoaltenders)

        for (let team of nhlTeamsArray) {
          for (let data of this.nhlGoaltenders) { 
            if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
              data.team.logo = team['officialLogoImageSrc'];
              data.team.city = team['city'];
              data.team.name = team['name'];
              data.stats.goaltending.fanDuelFP = this.util.round(this.nhlUtil.goalieSLFP(data),1);
              data.stats.goaltending.fanDuelFPA = this.util.round(this.nhlUtil.goalieSLFPA(data),1);
              data.stats.goaltending.goalsAgainstAverage = data.stats.goaltending.goalsAgainstAverage.toFixed(3)   
            }

            if (data.player.officialImageSrc == null) {
              data.player.officialImageSrc = this.nhlplayerImages[data.player.id] != null ? this.nhlplayerImages[data.player.id].image : null;
            } 
          }  
        }

        //this.util.updatePlayers(res['players'], this.nhlGoaltenders, nhlTeamsArray);

        
        if (this.timeSpan != 'full') {
          this.spanGames()
        } else {
          this.nhlGoalieloading = false
        }
        
    })
  }
  public async sortNBA() {
      this.loading = true
      this.nbaSection = true
      this.nhlSection = false 
      this.mlbHittingSection = false
      this.mlbSection = false
      this.nhlGoalies = false
      this.nflSection = false
      this.nflDefenseSection = false
      this.nflDraftKit = false
      this.sport = 'nba'

      this.nhlService.myStats(
        'nba', 
        this.nbaSeasonType, 
        'player_gamelogs', 
        'team_stats_totals', 
        'player_stats_totals', 
        'playerString', 
        'G,PG,SG,SF,PF,C', 
        '',
        this.tsDate, 
        'isToday',
        'stats',
        'statLeaders',
        'all',
        'noUpdate',
        'none',
        'haveSchedules',
        'havePlayerInfo').subscribe(async res => {
          console.log(res, 'nba stat leaders')

          this.myData = res['playerStats'].playerStatsTotals
          this.nbaRookies = res['playerStats'].rookies ? res['playerStats'].rookies : []
          this.fgPlayers = res['playerStats'].playerStatsTotals.filter(player => player.stats != null && nbabig[player.player['primaryPosition']] != null && player.stats.fieldGoals.fgAtt > (this.nbaSeason ? 250 : 8))
          this.smPlayers = res['playerStats'].playerStatsTotals.filter(player => player.stats != null && nbasmall[player.player['primaryPosition']] != null && player.stats.fieldGoals.fgAtt > (this.nbaSeason ? 250 : 8))
          this.nbaInfo(this.myData)
          this.nbaInfo(this.nbaRookies)
            
          //this.util.updatePlayers(res['players'], this.myData, nbaTeamsArray);

          if (this.timeSpan != 'full')
            this.spanGames()       
    }) 
  }

  public playerFp(player) {
    player.stats.offense.fp = this.util.round(player.stats.offense.pts + (player.stats.offense.ast * 1.5) + (player.stats.rebounds.reb * 1.2) + (player.stats.defense.stl * 3) + (player.stats.defense.blk * 3) - player.stats.defense.tov, 1);
    player.stats.offense.fpa = Math.floor(player.stats.offense.fp / player.stats.gamesPlayed);
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

  public resetSpanOpp() {
      for (let wl of this.wlPlayers) {
        if (wl.spanOpponents != null)
          wl.spanOpponents = null
      }
  }

  ngOnInit() {
    if (this.testBrowser) {
      if (window.innerWidth < 700) {
        this.mobile = true
        this.util.mobile = this.mobile
      }
      if (this.myData === undefined) {
        //default load get watchlist 
        let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][new Date().getDay()]
        this.wlPlayers = this.ls.get('watchList')
        this.resetSpanOpp()
        this.favorites = this.ls.get('nflFavorites')
        console.log(this.favorites)
        console.log('reset localStorage schedules temp')
        //delete last year local storage
        this.ls.delete('nflSchedules')
        //this.ls.delete('nflSchedulesDiff')
        this.ls.delete('favorites')
        this.nflSchedules = this.ls.get('nflSchedulesDiff')
        this.gamesByID = this.ls.get('gamesByID')
        //temparary to save player info before season starts
        this.getSelectedPlayerInfo(this.nflPosition)
        //temparary to save player info before season starts
        //this.deletePlayerInfo(this.nflPosition)
        
        if (this.nflSchedules.length != 0) {
          console.log(weekday, 'weekday', this.nflSchedules[0].weekSet, 'week set', this.util.nflWeek, 'nfl week')
          console.log('is the set week behind current nfl week?', parseInt(this.nflSchedules[0].weekSet) < parseInt(this.util.nflWeek))
        }
        
        this.nflSchedules = (this.nflSchedules.length < 32 || this.nflSchedules[0].weekSet == null || weekday === 'Thu' && parseInt(this.nflSchedules[0].weekSet) < parseInt(this.util.nflWeek)) ? [] : this.nflSchedules

        console.log(this.nflSchedules, 'after condition check loading nfl data ...')
        console.log(this.nflTeams, 'nflTeams')
        this.loadNFL() //this.loadMLB()
        console.log('fetch data on init...')
      } else {
          this.loading = false
      }
    }
  }

  public loadMLB() {
    
    this.nbaSection = false
    this.nhlSection = false
    this.mlbSection = true
    this.mlbHittingSection = false
    this.nhlGoalies = false
    this.nflSection = false
    this.nflDefenseSection = false
    this.nflDraftKit = false
    this.sport = 'mlb'
    this.mlbPitchingLoading = true
    this.mlbWl = this.wlPlayers.filter(x => x.sport === 'mlb' && x.player.primaryPosition == 'P')
    

      this.nhlService.myStats(
        'mlb', 
        this.mlbSeasonType, 
        'player_gamelogs', 
        'team_stats_totals', 
        'player_stats_totals', 
        'playerString', 
        'P', 
        '',
        this.tsDate, 
        'isToday',
        'stats',
        'statLeaders',
        'all',
        'noUpdate',
        'none',
        'haveSchedules',
        'havePlayerInfo').subscribe(async res => {
          console.log(res, 'mlb pitchers stat leaders')

          this.mlbPitchingData = res['playerStats'].playerStatsTotals.filter(player => player.stats != null && player.stats.pitching.inningsPitched > (this.mlbSeason ? 4 : 0) || (player.stats.pitching.saves > 0 || player.stats.pitching.wins > 0)) // && player.stats.pitching.pitcherStrikeouts > 6
          this.pitcherRookies = res['playerStats'].rookies ? res['playerStats'].rookies : []
          this.pitcherERA = this.mlbPitchingData.filter(player => player.stats.miscellaneous['gamesStarted'] > 2 && this.timeSpan == 'full' || player.stats.miscellaneous['gamesStarted'] > 0 && this.timeSpan != 'full' && player.stats.pitching.inningsPitched > (this.mlbSeason ? 2 : 0))
          this.closerERA = this.mlbPitchingData.filter(player => player.stats.pitching.pitcherStrikeouts > (this.mlbSeason ? 6 : 0) && player.stats.pitching.holds > (this.mlbSeason ? 3 : 0) || player.stats.pitching.saves > 0)

          this.pitcherInfo(this.mlbPitchingData)
          this.pitcherInfo(this.pitcherRookies)

         //this.util.updatePlayers(res['playerInfo'].players, this.mlbPitchingData, this.mlbTeams)
          
          if (this.timeSpan != 'full') {
            this.spanGames();
          } else {
            this.mlbPitchingLoading = false;
          }
      })
  }

  public loadHitters() {
    this.sport = 'mlb';
    this.mlbSection = false;
    this.mlbHittingSection = true
    this.mlbHittingLoading = true
    this.mlbHitWl = this.wlPlayers.filter(x => x.sport === 'mlb' && x.player.primaryPosition != 'P')

      this.nhlService.myStats(
        'mlb', 
        this.mlbSeasonType, 
        'player_gamelogs', 
        'team_stats_totals', 
        'player_stats_totals', 
        'playerString', 
        this.hitterPosition, 
        '',
        this.tsDate, 
        'isToday',
        'stats',
        'statLeaders',
        'all',
        'noUpdate',
        'none',
        'haveSchedules',
        'havePlayerInfo').subscribe(async res => {
        
         this.mlbHittingData = res['playerStats'].playerStatsTotals.filter(player => player.stats != null && player.stats.gamesPlayed > (this.timeSpan == 'full' ? 5 : 2) && player.stats.batting.atBats > (this.timeSpan == 'full' ? 16 : 8) || player.stats.batting.homeruns > (this.timeSpan == 'full' ? 2 : 0)) //player.stats.gamesPlayed > 4 && player.stats.batting.atBats > 15
         this.hitterRookies = res['playerStats'].rookies ? res['playerStats'].rookies : []
         this.hitterInfo(this.mlbHittingData)
         this.hitterInfo(this.hitterRookies)
         
        if (this.timeSpan != 'full') {
          this.spanGames();
        } else {
          this.mlbHittingLoading = false;
        }
     })
  }

  public nhlInfo(stuff) {
    const nhlTeamsArray = Object.values(this.nhlTeams)
    for (let team of nhlTeamsArray) {
      for (let data of stuff) { 
        if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
          data.team.logo = team['officialLogoImageSrc'];
          data.team.city = team['city'];
          data.team.name = team['name'];
          
          data.stats.scoring.fanDuelFP = this.util.round(this.nhlUtil.skaterSLFP(data),1);
          data.stats.scoring.fanDuelFPA = this.util.round(this.nhlUtil.skaterSLFPA(data),1);
          data.stats.scoring.iceTimeAvg = this.nhlService.iceTimeAvg(data.stats.shifts.timeOnIceSeconds, data.stats.gamesPlayed);
        }

        if (data.player.officialImageSrc == null) {
          data.player.officialImageSrc = this.nhlplayerImages[data.player.id] != null ? this.nhlplayerImages[data.player.id].image : null;
        }
        
      }  
    }
  }

  public nbaInfo(stuff) {
    const nbaTeamsArray = Object.values(this.nbaTeams)
    for (let team of nbaTeamsArray) {
      for (let data of stuff) { 
        if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
          data.team.logo = team['officialLogoImageSrc'];
          data.team.city = team['city'];
          data.team.name = team['name'];
          this.playerFp(data);
          this.loading = false;
        }

        if (data.player.officialImageSrc == null) {
          data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
        }
        
      }  
    }
  }

  public hitterInfo(stuff) {
    for (let team of this.mlbTeams) {
      for (let data of stuff) { 
        if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
          data.team.logo = team['officialLogoImageSrc'];
          data.team.city = team['city'];
          data.team.name = team['name'];
          data.team.twitter = team['twitter'];
          data.stats.batting.battingAvg = data.stats.batting.battingAvg.toFixed(3) 
      
          this.mlbUtil.fantasyPoints(data,'b')
       
         if (data.player.officialImageSrc != null) {
           data.player.officialImageSrc = this.mlbService.imageSwap(data.player.officialImageSrc);
         }

         if (data.player.officialImageSrc == null) {
           data.player.officialImageSrc = this.mlbplayerImages[data.player.id] != null ? this.mlbplayerImages[data.player.id].image : null;
         }
           
        }
      }  
    }
  }

  public pitcherInfo(stuff) {
    for (let team of this.mlbTeams) {
      for (let data of stuff) { 
        if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
          data.team.logo = team['officialLogoImageSrc']
          data.team.city = team['city']
          data.team.name = team['name']
          data.team.twitter = team['twitter']
          //this.pitcherFp(data);
          this.mlbUtil.fantasyPoints(data,'p')
          if (data.stats.pitching.earnedRunAvg == null)
            console.log(data, 'players')
          data.stats.pitching.earnedRunAvg = data.stats.pitching.earnedRunAvg != null ? data.stats.pitching.earnedRunAvg.toFixed(2) : null
          //this.loading = false;

          if (data.player.officialImageSrc != null) {
            data.player.officialImageSrc = this.mlbService.imageSwap(data.player.officialImageSrc);
          }

          if (data.player.officialImageSrc == null) {
            data.player.officialImageSrc = this.mlbplayerImages[data.player.id] != null ? this.mlbplayerImages[data.player.id].image : null;
          }
          
        } 
        
      }  
    }
  }

  public rookieInfo(array, teams) {
    console.log('nfl rookie info')
    for (let data of array) {
      data.stats = {
        drafted: {
          overallPick: data.player.drafted.overallPick
        },
        passing: {
          passYards: 0,
          passTD: 0,
          totalYards: 0
        },
        rushing: {
          rushYards: 0,
          rushTD: 0,
          totalYards: 0
        },
        receiving: {
          recYards: 0,
          recTD: 0,
          totalYards: 0
        }
      }

      if (data.player != null && data.player.id != null && nflplayerImages[data.player.id] != null) {
        data.player.officialImageSrc = nflplayerImages[data.player.id].image
      } else {
        data.player.officialImageSrc = 'https://cdn.nba.com/headshots/nba/latest/260x190/fallback.png'
      }
      
    }

    for (let team of teams) {
      for (let data of array) { 
        if (data.teamAsOfDate != null && team['id'] === data.teamAsOfDate.id) {
          data.team = {}
          data.team.logo = team['officialLogoImageSrc']
          data.team.city = team['city']
          data.team.name = team['name']
          data.team.twitter = team['twitter']
          data.team.dtr = team['dtr']
          data.team.dfh = team['dfh']
          data.team.dsh = team['dsh']
          data.team.abbreviation = team['abbreviation']
          data.team.scheduleTicker = team['scheduleTicker']
          data.team.weekOpponent = team['weekOpponent']
        }
      }
    }
  }

  public teamInfoRookie(array, teams, type, week, pos) {
    console.log('team info rookie data')
    for (let team of teams) {
      for (let data of array) { 
        if (data.team != null && data.player != null && data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && week === 'all' ||
        data.team != null && week != 'all' && team['id'] === data.team.id) {
          data.team = {}
          data.team.logo = team['officialLogoImageSrc'];
          data.team.city = team['city'];
          data.team.name = team['name'];
          data.team.twitter = team['twitter'];

          if (type === 'o') {
            data.team.dtr = team['dtr'];
            data.team.dfh = team['dfh'];
            data.team.dsh = team['dsh'];
          }

          if (type === 'd') {
            data.team.otr = team['otr'];
            data.team.ofh = team['ofh'];
            data.team.osh = team['osh'];
          }
          
          data.team.abbreviation = team['abbreviation'];
          data.team.scheduleTicker = team['scheduleTicker'];
          data.team.weekOpponent = team['weekOpponent'];
          data.playerType = type
        }
      }
    }
  }

  public teamInfo(array, teams, type, week) {
    console.log('sort defense data and team data')
    for (let team of teams) {
      for (let data of array) { 
        if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id && week === 'all' ||
        week != 'all' && team['id'] === data.team.id) {
          data.team.logo = team['officialLogoImageSrc'];
          data.team.city = team['city'];
          data.team.name = team['name'];
          data.team.twitter = team['twitter'];
          data.team.otr = team['otr'];
          data.team.ofh = team['ofh'];
          data.team.osh = team['osh'];
          data.team.abbreviation = team['abbreviation'];
          data.team.scheduleTicker = team['scheduleTicker'];
          data.team.weekOpponent = team['weekOpponent'];
          data.playerType = type
          this.nflUtil.defenseFp(data)
          data.stats.interceptions.defSnapPct = Math.floor(data.stats.snapCounts.defenseSnaps / team.plays * 100)
        }
        if (nflplayerImages[data.player.id] != null) {
          data.player.officialImageSrc = nflplayerImages[data.player.id].image
          data.player.rookie = nflplayerImages[data.player.id].rookie
        } else {
          data.player.officialImageSrc = 'https://cdn.nba.com/headshots/nba/latest/260x190/fallback.png'
        }

        
      }  
    }
  }

  public async loadNFL() {
    if (this.week === 'three-weeks') {
      // load 3 weeks of nfl games
      this.nflOffenseLoading = true
      this.spanGames()
    } else {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    this.nflOffenseLoading = true
    this.nbaSection = false
    this.nhlSection = false
    this.mlbSection = false
    this.nhlGoalies = false
    this.mlbHittingSection = false
    this.nflSection = true
    this.sport = 'nfl'
    console.log(this.teamSchedules, 'this.teamSchedules', this.nflTeams, 'this.nflTeams')
    if (this.teamSchedules.length === 0) {
      this.haveNflSchedules = (this.nflSchedules.length > 0 ? true : false)
      //console.log('local storage nfl schedules', this.ls.get('nflSchedules'))
    } else {
      this.haveNflSchedules = true
    }
    
    console.log(this.haveNflSchedules, 'have nflSchedules? this should true')

    console.log(this.selectedPlayerInfo, 'this.selectedPlayerInfo')
    //after season starts
    //this.havePlayerInfo = true
    //after season starts
    //temparary
    this.havePlayerInfo = (this.selectedPlayerInfo?.players != null ? true : false)
    //temparary
    
    console.log(this.havePlayerInfo, `have ${this.nflPosition} player info?`)
    //this.wlPlayers = this.ls.get('watchList')

    //TODO move this to update stats first and then set it to ls
    this.nflWl = this.wlPlayers.filter(x => x.sport === 'nfl')
    console.log(this.nflWl, 'watchlist')
    //TODO move this to update stats first and then set it to ls

    this.nhlService.myStats(
      'nfl', 
      this.nflSeasonType, 
      'player_gamelogs', 
      'team_stats_totals', 
      'player_stats_totals', 
      'player', 
      this.nflPosition, 
      this.nflTeams,
      this.tsDate, 
      'isToday',
      'stats',
      'nflOffense',
      this.week,
      'noUpdate',
      'none',
      this.haveNflSchedules,
      this.havePlayerInfo).subscribe(async res => {
        console.log(res, 'nfl stats data')

        if (this.nflTeamStats == null) {
          //TODO apply def points against before getting team fp
          // check nflschedules with nflteams and apply paDefFP
          
          this.nflUtil.teamFp(this.nflTeams, res['teamStats'].teamStatsTotals)
          this.nflUtil.rank(this.nflTeams, res['teamStats'].teamStatsTotals, this.nflWeek)
          this.nflUtil.updateTeamStats(res['teamStats'].teamStatsTotals)
          this.nflTeamStats = res['teamStats'].teamStatsTotals

          if (res['scheduleGames'].length > 32) {
            console.log('server added too many schedule objects, truncate')
            res['scheduleGames'].length = 32
            console.log(res['scheduleGames'], 'after truncate')
            console.log('udate byes before storage')
            this.nflUtil.updateBye(res['scheduleGames'])
            res['scheduleGames'][0].weekSet = this.util.nflWeek
            this.ls.set('nflSchedulesDiff', res['scheduleGames'])
          } else if (res['scheduleGames'].length == 32) {

          }

          if (res['scheduleGames'].length === 0) { 
            console.log('udate byes after storage')
            this.nflUtil.updateBye(this.nflSchedules)
            console.log('use nfl schedule from local storage if length ', this.nflSchedules.length)
            res['scheduleGames'] = this.nflSchedules
            this.nflUtil.statsToSched(this.nflSchedules, this.gamesByID)
          } else {
            console.log('udate byes before storage')
            this.nflUtil.updateBye(res['scheduleGames'])
            console.log('set nfl schedules', res['scheduleGames'])
            res['scheduleGames'][0].weekSet = this.util.nflWeek
            this.ls.set('nflSchedulesDiff', res['scheduleGames'])
            this.nflUtil.statsToSched(res['scheduleGames'], this.gamesByID)
          }

          if (this.teamSchedules.length === 0) 
            this.nflUtil.sortSchedules(this.teamSchedules, this.nflWeek, res['scheduleGames'])

          this.sortToughest()
          this.nflTeamLoading = false
        } else {
          if (this.timeSpan != 'full') {
            this.nflUtil.updateTeamWeek(res['team'].gamelogs)
          }
          this.nflTeamLoading = false
        }
        
        if (res['dailyStats'].gamelogs != null && res['dailyStats'].gamelogs.length > 0) {
          console.log(res['dailyStats'].gamelogs, 'daily stats, game logs')
          for (let data of this.nflData) {
            for (let wstats of res['dailyStats'].gamelogs) {
              wstats.player.primaryPosition = wstats.player.position
              if (data.player.id === wstats.player.id && data.player.officialImageSrc != null) {
                wstats.player.officialImageSrc = data.player.officialImageSrc
                wstats.player.primaryPosition = data.player.primaryPosition
              }
            }
          }
        }

        //Temparary function to handle player info before season starts
        if (this.havePlayerInfo === true) {
          console.log('use player info from local storage')
          res['playerInfo'] = this.selectedPlayerInfo
        } else {
          console.log('set player info', res['playerInfo'].players)
          this.ls.set(this.nflPosition+'Info', res['playerInfo'])
        }

        let stats = (this.week === 'all' ? res['playerStats'].playerStatsTotals.filter(x => x.stats.gamesPlayed > 0) : res['dailyStats'].gamelogs)
        this.nflData = stats

        if (this.teamSchedules.length > 0) {
          console.log('first time getRank is called with this.teamSchedules', this.teamSchedules)
          this.nflUtil.getRank(this.teamSchedules)
        }
          
        //temporary before season start
        this.nfl22Rookies = res['playerInfo'].rookies ? res['playerInfo'].rookies : []
        this.rookieInfo(this.nfl22Rookies, this.nflTeams)
        console.log('nfl22Rookies', this.nfl22Rookies)
        //temporary before season start

        this.nflRookies = res['playerStats'].rookies ? res['playerStats'].rookies.filter(item => nflplayerImages[item.player.id]?.rookie === true ||  nflplayerImages[item.player.id] === undefined) : []
        console.log('rookies', this.nflRookies)
        
        console.log(res['playerInfo'], 'nfl player info')
        //temporary before season start
        console.log('temporary before season start, update players')
        this.util.updatePlayers(res['playerInfo'].players, this.nflData, this.nflTeams)
        this.util.updatePlayers(res['playerInfo'].players, this.nflRookies, this.nflTeams)
        //temporary before season start
        this.teamInfoRookie(this.nflRookies, this.nflTeams, 'o', this.week, 'rookie')   
        this.nflRookies = this.nflRookies.filter(x => x.player.actualRookie === true)
        //Udate all the defense rank after getting the very difficult calculation of pointsAgainst fantasy points
        this.nflUtil.teamNflDefFp(this.nflTeams, res['teamStats'].teamStatsTotals)
        this.nflUtil.rankD(this.nflTeams, res['teamStats'].teamStatsTotals, this.nflWeek)
        this.nflUtil.updateDefRank(res['teamStats'].teamStatsTotals)
        this.nflUtil.updateTicker(res['teamStats'].teamStatsTotals)
        //update week opponent
        this.nflUtil.updateWop(res['teamStats'].teamStatsTotals)
        this.nflUtil.superUpdater(this.teamSchedules)
        console.log('update players sched ranks after the super rank udater')
        this.nflTeamInfo(this.nflData, this.nflTeams, 'o', this.week, this.nflPosition)
        this.nflTeamInfo(this.nflRookies, this.nflTeams, 'o', this.week, this.nflPosition)
        
         //Udate all the defense rank after getting the very difficult calculation of pointsAgainst fantasy points
        
          //TODO turn this into a function that updates all wl stats by player id and set the new watchlist
          if (this.nflWl != null && this.nflWl.length > 0) {
         
            for (let data of this.nflData) {
              for (let wl of this.wlPlayers) {
                //TODO create a player string to fetch updated stats, use full watchlist not the nflwl
                if (data.player.id === wl.player.id && wl.player.primaryPosition === this.nflPosition.toUpperCase()) {
                  wl.statsUpdated = this.util.nflWeek
                  wl.stats = data.stats
                  wl.type = 'wl'
                  wl.player.officialImageSrc = data.player.officialImageSrc
                  //wl.spanOpponents = null
                }
              }
            }
        }
        this.nflOffenseLoading = false 
        console.log(this.teamSchedules, 'this.teamSchedules should persist now')  

        })
    }
  }

  public defensePlayers() {
    if (this.week === 'three-weeks') {
      // load 3 weeks of nfl games
      this.nflDefenseLoading = true
      this.spanGames()
    } else {
      this.nflSection = false
      this.nflDefenseSection = true
      this.haveNflSchedules = (this.teamSchedules.length > 0 != null ? true : false)
      this.sortToughest()
      //temparary to save player info before season starts
      this.getSelectedPlayerInfo(this.nflDPosition)
      //this.deletePlayerInfo(this.nflPosition)
      //temparary to save player info before season starts
      console.log(this.selectedPlayerInfo, 'this.selectedPlayerInfo')
      //this.havePlayerInfo = true
      this.havePlayerInfo = (this.selectedPlayerInfo?.players != null ? true : false)
      console.log(this.havePlayerInfo, `have ${this.nflPosition} player info?`)
     
        this.nflDefenseLoading = true

        this.nhlService.myStats(
          'nfl', 
          this.nflSeasonType, 
          'player_gamelogs', 
          'team_stats_totals', 
          'player_stats_totals', 
          'player', 
          this.nflDPosition, 
          this.nflTeams,
          this.tsDate, 
          'isToday',
          'stats',
          'nflDefense',
          this.week,
          'noUpdate',
          'none',
          this.haveNflSchedules,
          this.havePlayerInfo).subscribe(async res => {
            console.log(res, 'nfl defense stats data')

          if (res['dailyStats'].gamelogs != null && res['dailyStats'].gamelogs.length > 0) {
            for (let data of this.nflDefenseData) {
              for (let wstats of res['dailyStats'].gamelogs) {
                wstats.player.primaryPosition = wstats.player.position;
                if (data.player.id === wstats.player.id && data.player.officialImageSrc != null) {
                  wstats.player.officialImageSrc = data.player.officialImageSrc;
                  wstats.player.primaryPosition = data.player.primaryPosition;
                }
              }
            }
          }
         
          let stats = (this.week === 'all' ? res['playerStats'].playerStatsTotals.filter(player => player.stats != null && (player.stats.tackles.tackleTotal > 0 || player.stats.interceptions.passesDefended > 0)) : res['dailyStats'].gamelogs)
          this.nflDefenseData = stats

          this.defenseRookies = res['playerStats'].rookies ? res['playerStats'].rookies : [] //this.nflDefenseData.filter(player => player.player.rookie === true) 
          this.teamInfo(this.nflDefenseData, this.nflTeams, 'd', this.week)
          this.teamInfo(this.defenseRookies, this.nflTeams, 'd', this.week)
          //this.util.updatePlayers(res['playerInfo'].players, this.nflDefenseData, this.nflTeams)
          this.teamInfoRookie(this.defenseRookies, this.nflTeams, 'd', this.week, 'rookie');

          this.nflDefenseLoading = false
      })
      
    }
  }

  public nflTeamInfo(array, teams, type, week, pos) {
    console.log('sort team info for nfl offense')
    for (let team of teams) {
      for (let data of array) { 
        if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id && week === 'all' ||
        week != 'all' && team['id'] === data.team.id) {
          data.team.logo = team['officialLogoImageSrc'];
          data.team.city = team['city'];
          data.team.name = team['name'];
          data.team.twitter = team['twitter'];
          data.team.dtr = team['dtr'];
          data.team.dfh = team['dfh'];
          data.team.dsh = team['dsh'];
          data.team.abbreviation = team['abbreviation'];
          data.team.scheduleTicker = team['scheduleTicker'];
          data.team.weekOpponent = team['weekOpponent'];
          data.playerType = type;
          this.nflUtil.offenseFp(data)
        }
        //data.player['currentTeam'].lastYearTeamId
        if (week === 'all' && data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.stats.rushing || 
        week != 'all' && team['id'] === data.team.id && data.stats.rushing) {
          data.stats.passing.totalPassYards = data.stats.rushing.rushYards + data.stats.passing.passYards
          data.stats.passing.totalPassTd = data.stats.rushing.rushTD + data.stats.passing.passTD

          data.stats.receiving.totalYards = data.stats.rushing.rushYards + data.stats.receiving.recYards
          data.stats.receiving.totalTd = data.stats.rushing.rushTD + data.stats.receiving.recTD

          data.stats.receiving.totalTouches = data.stats.rushing.rushAttempts + data.stats.receiving.targets
          data.stats.receiving.totalTouchPct = Math.floor(data.stats.receiving.totalTouches / team.snaps * 100)
          data.stats.receiving.totalTeamSnaps = team.snaps
          data.stats.rushing.touchRunPct = Math.floor(data.stats.rushing.rushAttempts / team.runPlays * 100)
          data.stats.rushing.teamRunPlays = team.runPlays
          data.stats.receiving.touchCatchPct = Math.floor(data.stats.receiving.targets / team.passPlays * 100)
          data.stats.receiving.teamPassPlays = team.passPlays
          data.stats.passing.totalPassPct = Math.floor(data.stats.passing.passAttempts / team.snaps * 100)
          data.stats.passing.offSnapPct = Math.floor(data.stats.snapCounts.offenseSnaps / team.snaps * 100)
          
        }

        if (nflplayerImages[data.player.id] != null) {
          data.player.officialImageSrc = nflplayerImages[data.player.id].image
          data.player.rookie = nflplayerImages[data.player.id].rookie
        } else {
          data.player.officialImageSrc = 'https://cdn.nba.com/headshots/nba/latest/260x190/fallback.png'
        }


        if (data.player.id === 16494 || data.player.id === 8100) {
          data.player.unsigned = true
        }

        if (pos === 'k') {
          data.stats.fieldGoals.longFgMade = data.stats.fieldGoals.fgMade40_49 + data.stats.fieldGoals.fgMade50Plus
        }
        
      }  
    }
  }

  public sortToughest() {
    if (this.nflDefenseSection) {
      this.seasonLengthD = 'otr'
    } else if (!this.nflDefenseSection) {
      this.seasonLength = 'dtr'
    }
  }

  public seasonChange(sl) {
    console.log(sl, 'season length changed');
    this.seasonLength = sl;
  }

  public sortStats(games, sport, type) {
    let s = sport;
    let skateSec;
    let gSec;
    let pSec;
    let bSec;
    
    if (s === 'nhl' && this.nhlSection && type === 'skaters') {
      skateSec = true;
      gSec = false;
    }

    if (s === 'nhl' && this.nhlGoalies && type === 'goalies') {
      gSec = true;
      skateSec = false;
    }

    if (s === 'mlb' && this.mlbSection && type === 'pitchers') {
      bSec = false;
      pSec = true;
    }

    if (s === 'mlb' && this.mlbHittingSection && type === 'batters') {
      bSec = true;
      skateSec = false;
    }
  
    
            let i: number;
            let home;
            let away;
            let homeTeam;
            let awayTeam;
            let res = games

            res.forEach((item, index) => {
              i = index;
              if (res[i] != null) {
                home = res[i]['stats'].home.players;
                away = res[i]['stats'].away.players;
                
                homeTeam = res[i]['game'].homeTeam.abbreviation;
                awayTeam = res[i]['game'].awayTeam.abbreviation;

                away.forEach((item, index) => {
                  away[index].opponent = {abb: homeTeam, print: `@${homeTeam}`, 
                  stat: s === 'mlb' && away[index]['playerStats'][0].pitching != null ? 
                  away[index]['playerStats'][0].pitching.pitcherStrikeouts :
                  s === 'mlb' && away[index]['playerStats'][0].batting != null ? 
                  away[index]['playerStats'][0].batting.hits : null}
                  this.combined.push(away[index]);
                })

                home.forEach((item, index) => {
                  home[index].opponent = {abb: awayTeam, print: `vs${awayTeam}`, 
                  stat: s === 'mlb' && home[index]['playerStats'][0].pitching != null ? 
                  home[index]['playerStats'][0].pitching.pitcherStrikeouts :
                  s === 'mlb' && home[index]['playerStats'][0].batting != null ? 
                  home[index]['playerStats'][0].batting.hits : null};
                  this.combined.push(home[index]);
                })
            
                //console.log(this.combined, 'combined');
                this.reduced = this.combined.reduce(function(hash) {
                  //console.log(hash, 'hash');
                  return function(r, a) {
                    //console.log(a, 'this is a');
                    let key = a.player.id;
                    if (!hash[key]) {
                      hash[key] = { id: key, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': []};
                      r.push(hash[key]);
                    }


                    hash[key]['1'] += s === 'nba' ? a.playerStats[0].offense.pts : 
                    s === 'nhl' && skateSec ? a.playerStats[0].scoring.goals :
                    s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.saves : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.pitcherStrikeouts : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.runsBattedIn : 0;
                    
                    hash[key]['2'] += s === 'nba' ?  a.playerStats[0].offense.ast  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].scoring.assists 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.wins : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.wins : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.homeruns : 0;

                    hash[key]['3'] += s === 'nba' ?  a.playerStats[0].rebounds.reb  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].scoring.powerplayGoals 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.shutouts : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.earnedRunsAllowed : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.hits : 0;

                    hash[key]['4'] += s === 'nba' ?  a.playerStats[0].defense.stl  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].scoring.powerplayAssists 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.losses : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.saves : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.runs : 0;

                    hash[key]['5'] += s === 'nba' ?  a.playerStats[0].defense.blk  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].scoring.points 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.overtimeWins : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.pitchesThrown : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.secondBaseHits : 0;

                    hash[key]['6'] += s === 'nba' ?  a.playerStats[0].defense.tov  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].scoring.gameWinningGoals 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.overtimeLosses : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.hitsAllowed : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.stolenBases : 0;

                    hash[key]['7'] += 1;

                    hash[key]['8'] += s === 'nba' ?  a.playerStats[0].fieldGoals.fg3PtMade  : 
                    s === 'nhl' && skateSec && a.player['position'] != 'G' ? a.playerStats[0].skating.shots 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.saves : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.pitcherWalks : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.plateAppearances : 0;

                    hash[key]['9'] += s === 'nba'  ? a.playerStats[0].fieldGoals.fgAtt  : 
                    s === 'nhl' && skateSec && a.player['position'] != 'G' ? a.playerStats[0].skating.blockedShots 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.saves : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.inningsPitched : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.extraBaseHits : 0;

                    hash[key]['10'] += s === 'nba' ? a.playerStats[0].fieldGoals.fgMade  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].shifts.timeOnIceSeconds 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.saves : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.pitcherWalks : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.thirdBaseHits : 0;

                    hash[key]['11'] += s === 'nba' ? a.playerStats[0].rebounds.rebPerGame  : 
                    s === 'nhl' && skateSec && a.player['position'] != 'G' ? a.playerStats[0].skating.hits 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.goalsAgainst : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.hitsAllowed : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.batterWalks : 0;

                    hash[key]['12'] += s === 'nba' ? a.playerStats[0].fieldGoals.fgMade  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].shifts.timeOnIceSeconds 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.shotsAgainst : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.hitsAllowed : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.hitByPitch : 0;

                    hash[key]['13'] += s === 'nba' ? a.playerStats[0].fieldGoals.fgMade  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].shifts.timeOnIceSeconds 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].shifts.timeOnIceSeconds : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? (a.playerStats[0].pitching.inningsPitched >= 6 && a.playerStats[0].pitching.earnedRunsAllowed < 4 ? 1 : 0) : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.plateAppearances : 0;
                    
                    if (hash[key]['14'].length > 0){
                      if (hash[key]['14'][0].abb === a.opponent.abb) {
                        // hash[key]['14'][0].stat += a.opponent.stat
                      } else if (hash[key]['14'][1] != null && hash[key]['14'][1].abb === a.opponent.abb) {
                        // hash[key]['14'][1].stat += a.opponent.stat
                      } else if (hash[key]['14'][2] != null && hash[key]['14'][2].abb === a.opponent.abb) {
                        // hash[key]['14'][2].stat += a.opponent.stat
                      } else if (hash[key]['14'][3] != null && hash[key]['14'][3].abb === a.opponent.abb) {
                        // hash[key]['14'][3].stat += a.opponent.stat
                      } else if (hash[key]['14'][4] != null && hash[key]['14'][4].abb === a.opponent.abb) {
                        // hash[key]['14'][4].stat += a.opponent.stat
                      } else if (hash[key]['14'][5] != null && hash[key]['14'][5].abb === a.opponent.abb) {
                        // hash[key]['14'][4].stat += a.opponent.stat
                      } else if (hash[key]['14'][6] != null && hash[key]['14'][6].abb === a.opponent.abb) {
                        // hash[key]['14'][4].stat += a.opponent.stat
                      } else {
                        hash[key]['14'].push(a.opponent);
                      }
                    } else {
                      hash[key]['14'].push(a.opponent);
                    }

                    return r;
                  };

                }(Object.create(null)), []);


                for (let info of s === 'nba' ? this.myData : s === 'nhl' && this.nhlSection ? this.nhlSkaters : s === 'nhl' && this.nhlGoalies ? this.nhlGoaltenders : s === 'mlb' && this.mlbSection ? this.mlbPitchingData : s === 'mlb' && this.mlbHittingSection ? this.mlbHittingData : []) {
                  for (let data of this.reduced) {
                    //info.player.span = false;
                    if (info.player.id === data.id) { 
                      if (this.sport === 'nba') {
                        info.stats.offense.pts = data['1'];
                        info.stats.offense.ast = data['2'];
                        info.stats.rebounds.reb = data['3'];
                        info.stats.defense.stl = data['4'];               
                        info.stats.defense.blk = data['5'];
                        info.stats.defense.tov = data['6'];
                        info.stats.offense.ptsPerGame = Math.floor(data['1'] / data['7']);
                        info.stats.fieldGoals.fg3PtMade = data['8'];
                        info.stats.fieldGoals.fgAtt = data['9'];
                        info.stats.fieldGoals.fgPct = Math.floor(data['10'] / data['9'] * 100);
                        info.stats.rebounds.rebPerGame =  Math.floor(data['3'] / data['7']);
                        info.stats.sl = this.timeSpan
                        this.playerFp(info);
                      }
                      
                      if (s === 'nhl' && this.nhlSection) {
                        info.stats.scoring.goals = data['1'];
                        info.stats.scoring.assists = data['2'];
                        info.stats.scoring.powerplayGoals = data['3'];
                        info.stats.scoring.powerplayAssists = data['4'];               
                        info.stats.scoring.points = data['5'];
                        info.stats.scoring.gameWinningGoals = data['6'];
                        info.stats.gamesPlayed = data['7'];
                        info.stats.skating.shots = data['8'];
                        info.stats.skating.blockedShots = data['9']; 
                        info.stats.skating.hits = data['11'];  
                        info.stats.scoring.iceTimeAvg = this.nhlService.iceTimeAvg(data['10'], data['7']);   
                        //this.skaterFp(info);
                        info.stats.scoring.fanDuelFP = this.util.round(this.nhlUtil.skaterSLFP(info),1);
                        info.stats.scoring.fanDuelFPA = this.util.round(this.nhlUtil.skaterSLFPA(info),1);
                        info.stats.sl = this.timeSpan
                        
                      }

                      if (s === 'nhl' && this.nhlGoalies) {
                        info.stats.goaltending.saves = data['1'];
                        info.stats.goaltending.wins = data['2'];
                        info.stats.goaltending.shutouts = data['3'];
                        info.stats.goaltending.losses = data['4'];               
                        info.stats.goaltending.overtimeWins = data['5'];
                        info.stats.goaltending.overtimeLosses = data['6'];
                        info.stats.gamesPlayed = data['7'];
                        info.stats.goaltending.goalsAgainst = data['11'];
                        info.stats.goaltending.shotsAgainst = data['12'];
                        info.stats.goaltending.goalsAgainstAverage = this.util.round(Math.floor(data['11'] * 60) / Math.floor(data['13'] / 60), 3);  
                        info.stats.sl = this.timeSpan
                        //this.util.round(this.nhlUtil.goalieFp(info),1);
                        info.stats.goaltending.fanDuelFP = this.util.round(this.nhlUtil.goalieSLFP(info),1);
                        info.stats.goaltending.fanDuelFPA = this.util.round(this.nhlUtil.goalieSLFPA(info),1);
                      }

                      if (s === 'mlb' && this.mlbSection) {
                        info.stats.pitching.pitcherStrikeouts = data['1'];
                        info.stats.pitching.wins = data['2'];
                        info.stats.pitching.earnedRunAvg = ((data['3'] / data['9']) * 9).toFixed(2);
                        info.stats.pitching.saves = data['4'];               
                        info.stats.pitching.pitchesThrown = data['5'];
                        info.stats.pitching.hitsAllowed = data['6'];
                        info.stats.gamesPlayed = data['7'];
                        info.stats.pitching.walksAllowedPer9Innings = ((data['8'] / data['9']) * 9).toFixed(2);
                        info.stats.pitching.inningsPitched = data['9'];
                        info.stats.pitching.pitcherWalks = data['10'];
                        info.stats.pitching.qs = data['13'];
                        info.stats.pitching.earnedRunsAllowed = data['3']
                        info.stats.sl = this.timeSpan   
                        //this.pitcherFp(info);
                        this.mlbUtil.fantasyPoints(info,'p')
                      }

                      if (s === 'mlb' && this.mlbHittingSection) {
                        info.stats.batting.battingAvg = (data['3'] / data['8']).toFixed(3);
                        info.stats.batting.runsBattedIn = data['1'];
                        info.stats.batting.homeruns = data['2'];
                        info.stats.batting.hits = data['3'];               
                        info.stats.batting.runs = data['4'];
                        info.stats.batting.secondBaseHits = data['5'];
                        info.stats.batting.stolenBases = data['6'];
                        info.stats.gamesPlayed = data['7'];
                        info.stats.batting.plateAppearances = data['8'];
                        info.stats.batting.extraBaseHits = data['9'];
                        info.stats.batting.thirdBaseHits = data['10'];
                        info.stats.batting.batterWalks = data['11'];
                        info.stats.batting.hitByPitch = data['12'];
                        info.stats.sl = this.timeSpan
                        //this.batterFp(info);
                        this.mlbUtil.fantasyPoints(info,'b')
                      }

                      info.mlbSpanOpponents = data['14']
                      info.player.span = this.timeSpan
                    }
                  }
                }
              }
            });

            if (s === 'mlb' && this.mlbSection) {
              this.crunched = this.mlbPitchingData.filter(player => player.player.span === this.timeSpan && player.stats.pitching.inningsPitched > 0)
              this.mlbPitchingData = this.crunched

              let pRookies = []
              for(let pd of this.mlbPitchingData) {
                for(let r of this.pitcherRookies) {
                  if(pd.player.id === r.player.id) {
                    pRookies.push(pd)
                  }
                }
              }
              this.pitcherRookies = pRookies

              this.pitcherERA = this.mlbPitchingData.filter(player => player.stats.miscellaneous['gamesStarted'] > 0 && player.stats.pitching.inningsPitched > 5);
              this.closerERA = this.mlbPitchingData.filter(player => player.stats.pitching.pitcherStrikeouts > 3 && player.stats.pitching.holds > 2 && player.stats.pitching.inningsPitched > 3 ||  player.stats.pitching.saves > 0)

              let bRookies = []
              for(let pd of this.mlbPitchingData) {
                for(let r of this.hitterRookies) {
                  if(pd.player.id === r.player.id) {
                    bRookies.push(pd)
                  }
                }
              }
              this.hitterRookies = bRookies
                  
              this.mlbPitchingLoading = false;
            }

            if (s === 'mlb' && this.mlbHittingSection) {
              this.crunched = this.mlbHittingData.filter(player => player.player.span === this.timeSpan && player.stats.batting.plateAppearances > (this.timeSpan === ('today' || 'yesterday') ? 2 : 4));
              this.mlbHittingData = this.crunched;
                  
              this.mlbHittingLoading = false;
            }

            if (s === 'nhl' && this.nhlGoalies) {
              this.crunched = this.nhlGoaltenders.filter(player => player.player.span === this.timeSpan);
              this.nhlGoaltenders = this.crunched;
              this.gaaGoalies = this.nhlGoaltenders.filter(player => player.stats.goaltending['gamesStarted'] > 0 || player.stats.goaltending.saves > (this.timeSpan === 'two-weeks' ? 25 : 15));
                  
              this.nhlGoalieloading = false;
            }

            if (s === 'nhl' && this.nhlSection) {
              this.crunched = this.nhlSkaters.filter(player => player.player.span === this.timeSpan);
              this.nhlSkaters = this.crunched;
              // console.log(this.nhlSkaters, 'crunched nhl');
              this.dSkaters = this.nhlSkaters.filter(player => player.player.primaryPosition === 'D');
              this.fSkaters = this.nhlSkaters.filter(player => player.player.primaryPosition != 'D');
              this.nhlSkaterloading = false;
            }

            if (s === 'nba') {
              this.crunched = this.myData.filter(player => player.player.span === this.timeSpan);
              this.myData = this.crunched;
              this.fgPlayers = this.myData.filter(player => nbabig[player.player['primaryPosition']] != null && player.stats.fieldGoals.fgAtt > (this.timeSpan === ('today' || 'yesterday') ? 5 : 18));
              this.smPlayers = this.myData.filter(player => nbasmall[player.player['primaryPosition']] != null && player.stats.fieldGoals.fgAtt > (this.timeSpan === ('today' || 'yesterday') ? 5 : 18));
              // console.log(this.myData, 'crunched nba');
              this.loading = false; 
            }
                 
          //});
  }
  
  public sortNFLStats(games, sport, type, nflTeams) {
    let oPos = {
      'QB':'QB',
      'WR':'WR',
      'RB':'RB',
      'TE':'TE'
    }

    let dPos = {
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
  
            let i: number;
            let home;
            let away;
            let homeTotalPlays;
            let awayTotalPlays;
            let homePassPlays;
            let awayPassPlays;
            let homeRushPlays;
            let awayRushPlays;
            let awayOpponent;
            let homeOpponent;
            let awayTeam;
            let homeTeam;
            let res = games
            let week


            function findRank(team, print, player, week) {
              let info;
              for (let t of nflTeams) {
                
                  if (team === t.abbreviation) {
                    info = {
                       printName: print,
                       oRank: t.offenseRankLs, 
                       dRank: t.defenseRankLs, 
                       name: t.abbreviation, 
                       gamePY: oPos[player['player'].position] ? player['playerStats'][0].passing.passYards : 0,
                       gamePA: oPos[player['player'].position] ? player['playerStats'][0].passing.passAttempts : 0, 
                       gamePI: oPos[player['player'].position] ? player['playerStats'][0].passing.passInt : 0,
                       gamePTD: oPos[player['player'].position] ? player['playerStats'][0].passing.passTD : 0,
                       gameRY: oPos[player['player'].position] ? player['playerStats'][0].rushing.rushYards : 0, 
                       gameRA: oPos[player['player'].position] ? player['playerStats'][0].rushing.rushAttempts : 0,
                       gameRTD: oPos[player['player'].position] ? player['playerStats'][0].rushing.rushTD : 0,
                       gameFUM: oPos[player['player'].position] ? player['playerStats'][0].fumbles.fumLost : 0,
                       gameRecF: oPos[player['player'].position] ? player['playerStats'][0].fumbles.fumLost : 0,
                       gameRecY: oPos[player['player'].position] ? player['playerStats'][0].receiving.recYards : 0,
                       gameRecR: oPos[player['player'].position] ? player['playerStats'][0].receiving.receptions : 0,
                       gameRecTD: oPos[player['player'].position] ? player['playerStats'][0].receiving.recTD : 0,
                       gameFGM: player['player'].position === 'K' ? player['playerStats'][0].fieldGoals.fgMade : 0,
                       gameLFGM: player['player'].position === 'K' ? player['playerStats'][0].fieldGoals.fgMade40_49 + player['playerStats'][0].fieldGoals.fgMade50Plus : 0,
                       gameFP: oPos[player['player'].position] ? ((player['playerStats'][0].twoPointAttempts.twoPtPassMade + player['playerStats'][0].twoPointAttempts.twoPtPassRec + player['playerStats'][0].twoPointAttempts.twoPtRushMade * 2) - (player['playerStats'][0].fumbles.fumLost * 2) + (player['playerStats'][0].fumbles.fumTD * 6) - (player['playerStats'][0].interceptions.interceptions) + (player['playerStats'][0].kickoffReturns.krTD * 6) + (player['playerStats'][0].puntReturns.prTD * 6) + (player['playerStats'][0].passing.passTD * 4) + (player['playerStats'][0].passing.passYards * 0.04) + (player['playerStats'][0].receiving.receptions * 0.5) + (player['playerStats'][0].receiving.recTD * 6) + (player['playerStats'][0].receiving.recYards * 0.1) + (player['playerStats'][0].rushing.rushTD * 6) + (player['playerStats'][0].rushing.rushYards * 0.1)).toFixed(2) : 
                       player['player'].position === 'K' ? ((player['playerStats'][0].extraPointAttempts.xpMade) + (player['playerStats'][0].fieldGoals.fgMade1_19 + player['playerStats'][0].fieldGoals.fgMade20_29 + player['playerStats'][0].fieldGoals.fgMade30_39 * 3) + (player['playerStats'][0].fieldGoals.fgMade40_49 * 4) + (player['playerStats'][0].fieldGoals.fgMade50Plus * 5)).toFixed(2) : 0,
                       playerName: player.player['firstName'],
                       playerId: player.player.id,
                       week: week
                    }
                    return info
                  }
               
              }
            }

            res.forEach((item, index) => {
              i = index;
              if (res[i] != null) {
                //console.log(res[i], 'boxscore')
                home = res[i]['stats'].home.players;
                away = res[i]['stats'].away.players;
                awayTotalPlays = res[i]['stats'].away.teamStats[0].miscellaneous.offensePlays;
                homeTotalPlays = res[i]['stats'].home.teamStats[0].miscellaneous.offensePlays;
                awayPassPlays = res[i]['stats'].away.teamStats[0].passing.passAttempts;
                homePassPlays = res[i]['stats'].home.teamStats[0].passing.passAttempts;
                awayRushPlays = res[i]['stats'].away.teamStats[0].rushing.rushAttempts;
                homeRushPlays = res[i]['stats'].home.teamStats[0].rushing.rushAttempts;
                homeTeam = res[i]['game'].homeTeam.abbreviation
                awayTeam = res[i]['game'].awayTeam.abbreviation
                week = res[i]['game'].week

                //homeOpponent = findRank(res[i]['game'].awayTeam.abbreviation, `vs${res[i]['game'].awayTeam.abbreviation}`);
                //awayOpponent = findRank(res[i]['game'].homeTeam.abbreviation, `@${res[i]['game'].homeTeam.abbreviation}`);

                away.forEach((item, index) => {
                  away[index].tp = awayTotalPlays;
                  away[index].pp = awayPassPlays;
                  away[index].rp = awayRushPlays;
                  away[index].opponent = findRank(homeTeam, `@${homeTeam}`, away[index], week)
                  this.combined.push(away[index]);
                })

                home.forEach((item, index) => {
                  home[index].tp = homeTotalPlays;
                  home[index].pp = homePassPlays;
                  home[index].rp = homeRushPlays;
                  home[index].opponent = findRank(awayTeam, `vs${awayTeam}`, home[index], week)
                  this.combined.push(home[index]);
                })
            
                //console.log(this.combined, 'combined');
                this.reduced = this.combined.reduce(function(hash) {
                  //console.log(hash, 'hash');
                  return function(r, a) {
                    //console.log(a, 'this is a');
                    let key = a.player.id;
                    if (!hash[key]) {
                      hash[key] = { id: key, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': [], '18': 0, '19': 0, '20': 0, '21': 0, '22': 0, '23': 0, '24': 0, '25': 0, '26': 0, '27': 0, '28': 0, '29': 0, '30': 0, '31': 0};
                      r.push(hash[key]);
                    }


                    hash[key]['1'] += oPos[a.player['position']] != null ? a.playerStats[0].passing.passYards : 0;
                    hash[key]['2'] += oPos[a.player['position']] != null ? a.playerStats[0].passing.passTD : 0;
                    hash[key]['3'] += oPos[a.player['position']] != null ? a.playerStats[0].rushing.rushYards : 0;
                    hash[key]['4'] += oPos[a.player['position']] != null ? a.playerStats[0].receiving.receptions : 0;
                    hash[key]['5'] += oPos[a.player['position']] != null ? a.playerStats[0].receiving.recTD : 0;
                    hash[key]['6'] += oPos[a.player['position']] != null ? a.playerStats[0].rushing.rushTD : 0;
                    hash[key]['7'] += 1;
                    hash[key]['8'] += oPos[a.player['position']] != null ? a.playerStats[0].receiving.recYards : 0;
                    hash[key]['9'] += a.player['position'] === 'K' ? a.playerStats[0].fieldGoals.fgMade : 0;
                    hash[key]['10'] += a.player['position'] === 'K' ? a.playerStats[0].fieldGoals.fgMade40_49 + a.playerStats[0].fieldGoals.fgMade50Plus  : 0;
                    hash[key]['11'] += oPos[a.player['position']] != null ? a.playerStats[0].passing.passAttempts : 0;
                    hash[key]['12'] += oPos[a.player['position']] != null ? a.playerStats[0].rushing.rushAttempts : 0;
                    hash[key]['13'] += oPos[a.player['position']] != null ? a.playerStats[0].receiving.targets : 0;
                    hash[key]['14'] += oPos[a.player['position']] != null ? a.tp : 0;
                    hash[key]['15'] += oPos[a.player['position']] != null ? a.pp : 0;
                    hash[key]['16'] += oPos[a.player['position']] != null ? a.rp : 0;

                    hash[key]['18'] += oPos[a.player['position']] != null ? a.playerStats[0].twoPointAttempts.twoPtPassMade : 0;
                    hash[key]['19'] += oPos[a.player['position']] != null ? a.playerStats[0].twoPointAttempts.twoPtPassRec : 0;
                    hash[key]['20'] += oPos[a.player['position']] != null ? a.playerStats[0].twoPointAttempts.twoPtRushMade : 0;
                    hash[key]['21'] += oPos[a.player['position']] != null ? a.playerStats[0].fumbles.fumLost : 0;
                    hash[key]['22'] += oPos[a.player['position']] != null ? a.playerStats[0].fumbles.fumTD : 0;
                    hash[key]['23'] += oPos[a.player['position']] != null ? a.playerStats[0].kickoffReturns.krTD : 0;
                    hash[key]['24'] += oPos[a.player['position']] != null ? a.playerStats[0].puntReturns.prTD : 0;
                    hash[key]['25'] += oPos[a.player['position']] != null ? a.playerStats[0].passing.passInt : 0;
                    hash[key]['26'] += a.player['position'] === 'K' ? a.playerStats[0].extraPointAttempts.xpMade : 0;
                    hash[key]['27'] += a.player['position'] === 'K' ? a.playerStats[0].fieldGoals.fgMade1_19 : 0;
                    hash[key]['28'] += a.player['position'] === 'K' ? a.playerStats[0].fieldGoals.fgMade20_29 : 0;
                    hash[key]['29'] += a.player['position'] === 'K' ? a.playerStats[0].fieldGoals.fgMade30_39 : 0;
                    hash[key]['30'] += a.player['position'] === 'K' ? a.playerStats[0].fieldGoals.fgMade40_49 : 0;
                    hash[key]['31'] += a.player['position'] === 'K' ? a.playerStats[0].fieldGoals.fgMade50Plus : 0;
                    
                    hash[key]['17'].push(a.opponent);
                    return r;
                  };

                }(Object.create(null)), []);

                for (let info of this.nflData) {
                  for (let data of this.reduced) {
                    //info.player.span = false;
                    if (info.player.id === data.id) {
                      info.stats.gamesPlayed = data['7']
                      info.spanOpponents = data['17']
                      info.spanOpponents.sort((a, b) =>(a.week - b.week))
                      if (info.player['primaryPosition'] != 'K') {
                        //qb 
                        info.stats.passing.passYards = data['1'];
                        info.stats.passing.totalPassYards = data['1'] + data['3'];
                        info.stats.passing.passTD = data['2'];
                        info.stats.passing.totalPassTd = data['2'] + data['5'] + data['6'];
                        info.stats.rushing.rushYards = data['3'];
                        info.stats.receiving.receptions = data['4'];
                        info.stats.receiving.totalYards = data['3'] + data['8'];  
                        info.stats.receiving.totalTd = data['2'] + data['5'] + data['6'];           
                        info.stats.receiving.recTD = data['5'];
                        info.stats.rushing.rushTD = data['6'];
                        info.stats.passing.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                        info.stats.receiving.recYards = data['8'];
                        info.stats.passing.totalPassPct = Math.floor(data['11'] / data['14'] * 100);
                        
                        
                        //rb
                        info.stats.rushing.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                        info.stats.rushing.touchRunPct = Math.floor(data['12'] / data['16'] * 100);
                        info.stats.receiving.touchCatchPct = Math.floor(data['13'] / data['15'] * 100);
                        //wr te
                        info.stats.receiving.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7'])
      
                        //fantasy point stuff
                        info.stats.twoPointAttempts.twoPtPassMade = data['18']
                        info.stats.twoPointAttempts.twoPtPassRec = data['19']
                        info.stats.twoPointAttempts.twoPtRushMade = data['20']
                        info.stats.fumbles.fumLost = data['21']
                        info.stats.fumbles.fumTD = data['22']
                        info.stats.kickoffReturns.krTD = data['23']
                        info.stats.puntReturns.prTD = data['24']
                        info.stats.passing.passInt = data['25']

                        this.nflUtil.offenseFp(info)
                        info.stats.receiving.fanDuelFPA = Math.floor(parseInt(info.stats.receiving.fanDuelFP) / data['7'])

                      } else {
                        info.stats.fieldGoals.fgMade = data['9'];
                        info.stats.fieldGoals.longFgMade = data['10'];
                        info.spanOpponents = data['17']
                        
                        //fantasy point stuff
                        info.stats.extraPointAttempts.xpMade = data['26']
                        info.stats.fieldGoals.fgMade1_19 = data['27']
                        info.stats.fieldGoals.fgMade20_29 = data['28']
                        info.stats.fieldGoals.fgMade30_39 = data['29']
                        info.stats.fieldGoals.fgMade40_49 = data['30']
                        info.stats.fieldGoals.fgMade50Plus = data['31']

                        this.nflUtil.offenseFp(info)
                        info.stats.fieldGoals.fanDuelFPA = Math.floor(parseInt(info.stats.fieldGoals.fanDuelFP) / data['7'])
                      }
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan
                    }
                  }
                }

              }
            });

              this.crunched = this.nflData.filter(player => player.player.span === this.timeSpan)
              this.nflData = this.crunched

              for (let data of this.nflData) {
                for (let item of this.favorites) {
                  if (data.player.id === item.player.id && item.dateAdded === this.week) {
                    //item.statsUpdated = this.util.nflWeek
                    item.stats = data.stats
                    //item.player.officialImageSrc = data.player.officialImageSrc
                  }
                }
                for (let item of this.nflWl) {
                  if (data.player.id === item.player.id) {
                    //item.statsUpdated = this.util.nflWeek
                    item.spanOpponents = data.spanOpponents
                    //item.player.officialImageSrc = data.player.officialImageSrc
                  }
                }
              }

              // console.log(this.nhlGoaltenders, 'crunched nhl');
              this.nflOffenseLoading = false;
                 
          //});
  } 
  
  public sortNFLDStats(games, sport, type, nflTeams) {
    let oPos = {
      'QB':'QB',
      'WR':'WR',
      'RB':'RB',
      'TE':'TE'
    }

    let dPos = {
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
      // 'FB':'n',
      'T':'d',
      // 'OT':'n',
      // 'G':'n',
    }
  
            let i: number;
            let home;
            let away;
            // let awayOpponent = {'yds': 0, 'passYds': 0, 'rushYds': 0, 'passTD': 0, 'rushTD': 0, 'passOver20': 0, 'rushOver20': 0}
            // let homeOpponent = {'yds': 0, 'passYds': 0, 'rushYds': 0, 'passTD': 0, 'rushTD': 0, 'passOver20': 0, 'rushOver20': 0}
            let week
            let awayTeamStats
            let homeTeamStats
            let awayTeam;
            let homeTeam;
            let opponentYdsArr = [];
            let res = games


            function applyOY(team, print, opponent, week) {  
              
              for (let t of nflTeams) {
               if (team === t.abbreviation) { 
                  opponentYdsArr.push({owner: team, game: print, oy: opponent.yds, opponentStats: opponent, week: week});
                  t.opponentYdsArr = opponentYdsArr
                  // t.opponentYdsArr.sort((a, b) =>(a.week - b.week))
                }
                
              }
            }

            function findRank(team, print, player, opponent, week) {
              let info;
              
              for (let t of nflTeams) {
                  
                  if (team === t.abbreviation && dPos[player['player'].position]) {
                    
                    info = {
                       printName: print,
                       oRank: t.offenseRankLs, 
                       dRank: t.defenseRankLs, 
                       name: t.abbreviation, 
                       opponentYds: opponent.yds,
                       opponentStats: opponent,
                       gameTackles: player['playerStats'][0].tackles.tackleTotal, 
                       gameSacks: player['playerStats'][0].tackles.sacks, 
                       gameInt: player['playerStats'][0].interceptions.interceptions, 
                       gameTD: player['playerStats'][0].interceptions.intTD + player['playerStats'][0].fumbles.fumTD,
                       playerName: player.player['firstName'],
                       playerId: player.player.id,
                       week: week
                    }
                    return info
                  }
               
              }
            }

            res.forEach((item, index) => {
              let awayOpponent = {'yds': 0, 'passYds': 0, 'rushYds': 0, 'passTD': 0, 'rushTD': 0, 'passOver20': 0, 'rushOver20': 0}
              let homeOpponent = {'yds': 0, 'passYds': 0, 'rushYds': 0, 'passTD': 0, 'rushTD': 0, 'passOver20': 0, 'rushOver20': 0}
              i = index;
              if (res[i] != null) {

                //console.log(res[i], 'boxscore')
                home = res[i]['stats'].home.players
                away = res[i]['stats'].away.players
                homeTeamStats = res[i]['stats'].home.teamStats
                awayTeamStats = res[i]['stats'].away.teamStats
                homeTeam = res[i]['game'].homeTeam.abbreviation
                awayTeam = res[i]['game'].awayTeam.abbreviation
                week = res[i]['game'].week
                //console.log(away, 'away players')
                awayOpponent.yds = res[i]['stats'].home.teamStats[0].miscellaneous ? res[i]['stats'].home.teamStats[0].miscellaneous.offenseYds : 0
                homeOpponent.yds = res[i]['stats'].away.teamStats[0].miscellaneous ? res[i]['stats'].away.teamStats[0].miscellaneous.offenseYds : 0

                homeOpponent.passYds = res[i]['stats'].away.teamStats[0].passing.passNetYards
                awayOpponent.passYds = res[i]['stats'].home.teamStats[0].passing.passNetYards
                homeOpponent.rushYds = res[i]['stats'].away.teamStats[0].rushing.rushYards
                awayOpponent.rushYds = res[i]['stats'].home.teamStats[0].rushing.rushYards

                homeOpponent.passTD = res[i]['stats'].away.teamStats[0].passing.passTD
                awayOpponent.passTD = res[i]['stats'].home.teamStats[0].passing.passTD
                homeOpponent.rushTD = res[i]['stats'].away.teamStats[0].rushing.rushTD
                awayOpponent.rushTD = res[i]['stats'].home.teamStats[0].rushing.rushTD

                homeOpponent.passOver20 = res[i]['stats'].away.teamStats[0].passing.pass20Plus + res[i]['stats'].away.teamStats[0].passing.pass40Plus
                awayOpponent.passOver20 = res[i]['stats'].home.teamStats[0].passing.pass20Plus + res[i]['stats'].home.teamStats[0].passing.pass40Plus
                homeOpponent.rushOver20 = res[i]['stats'].away.teamStats[0].rushing.rush20Plus + res[i]['stats'].away.teamStats[0].rushing.rush40Plus
                awayOpponent.rushOver20 = res[i]['stats'].home.teamStats[0].rushing.rush20Plus + res[i]['stats'].home.teamStats[0].rushing.rush40Plus
                applyOY(awayTeam, `@${homeTeam}`, awayOpponent, week)
                applyOY(homeTeam, `vs${awayTeam}`, homeOpponent, week)
                //homeOpponent = findRank(awayTeam, `vs${awayTeam}`, home, homeOpponentYds);
                //awayOpponent = findRank(homeTeam, `@${homeTeam}`, away, awayOpponentYds);

                away.forEach((item, index) => {
                  away[index].opponent = findRank(homeTeam, `@${homeTeam}`, away[index], awayOpponent, week);
                  this.combined.push(away[index]);
                })

                home.forEach((item, index) => {  
                  home[index].opponent = findRank(awayTeam, `vs${awayTeam}`, home[index], homeOpponent, week); 
                  this.combined.push(home[index]);
                })
            
                //console.log(this.combined, 'combined');
                this.reduced = this.combined.reduce(function(hash) {
                  //console.log(hash, 'hash');
                  return function(r, a) {
                    //console.log(a, 'this is a');
                    let key = a.player.id;
                    if (!hash[key]) {
                      hash[key] = { id: key, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': []};
                      r.push(hash[key]);
                    }


                    hash[key]['1'] += dPos[a.player['position']] != null ? a.playerStats[0].tackles.tackleTotal : 0;
                    hash[key]['2'] += dPos[a.player['position']] != null ? a.playerStats[0].interceptions.interceptions : 0;
                    hash[key]['3'] += dPos[a.player['position']] != null ? a.playerStats[0].tackles.sacks : 0;
                    hash[key]['4'] += dPos[a.player['position']] != null ? a.playerStats[0].interceptions.passesDefended : 0;
                    hash[key]['5'] += 1;
                    hash[key]['6'].push(a.opponent);
                    return r;
                  };

                }(Object.create(null)), []);

               

                for (let info of this.nflDefenseData) {
                  for (let data of this.reduced) {
     
                    if (info.player.id === data.id) { 
                        info.stats.tackles.tackleTotal = data['1'];
                        info.stats.interceptions.interceptions = data['2'];
                        info.stats.tackles.sacks = data['3'];
                        info.stats.interceptions.passesDefended = data['4'];               
                        info.stats.tackles.tacklesPerGame = Math.floor(data['1'] / data['5']);
                        info.spanOpponents = data['6']
                        info.spanOpponents.sort((a, b) =>(a.week - b.week))
                        
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan
                    }
                  }
                }

              }
            });

              this.crunchedDef = this.nflDefenseData.filter(player => player.player.span === this.timeSpan);
              this.nflDefenseData = this.crunchedDef;
              
              this.nflDefenseLoading = false;
                 
         // });
  } 
}

