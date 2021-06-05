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
  NflUtilService } from '../../services/index';
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

  public teamRef: Array <any>;
  public allSentData: Array <any>;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nba/2020-regular";
  public mlbApiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular";
  public nflApiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2021-2022-regular";
  public nbaSeasonType: string = "2021-playoff";
  public nflSeasonType: string = "2020-2021-regular";
  public nhlSeasonType: string = "2021-playoff";
  public mlbSeasonType: string = "2021-regular";
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

  public st1: any; //passing
  public st2: any;
  public st3: any;
  public sf1: any; //passYards
  public sf2: any;
  public sf3: any;
  public t1: any; //Passing Yards
  public t2: any;
  public t3: any;
  public tag1: any; //PY
  public tag2: any;
  public tag3: any;

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
  public page: number = 19;
  public amount: number = -1;
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
  public teamSchedules: Array <any> = [];
  public nflPlayers: Array <any> = [];
  public nflDPlayers: Array <any> = [];
  public nflDraftKit: boolean;
  public seasonLength   : string = 'full';
  public seasonLengthD  : string = 'full';
  public testBrowser: boolean;
  public timeSpan: string = 'full';
  public nbaSpanGames: Array <any> = [];
  public reduced: Array <any> = [];
  public crunched: Array <any> = [];
  public combined: Array <any> = [];
  public sport: string;
  public nflWeek: any;
  public week: any = 'all';


  public crunchedDef: Array <any> = [];
  public nhlSeason: boolean = false;
  public nbaSeason: boolean = false;
  public mlbSeason: boolean = true;
  public nflPosition: string;
  public nflDPosition: string;
  
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
              @Inject(PLATFORM_ID) platformId: string) {
    //default sport load
    this.nflSection = true
    this.sport = 'nfl'
    this.nflDraftKit = true
    this.nflWeek = '1'
    this.nflPosition = 'qb'
    this.nflDPosition = 'LB,DT,DE,OLB,ILB,MLB';

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
    //default sport load
    
    this.stats = '1';
    this.nbaTeams = this.nbaUtil.getNBATeams();
    this.nhlTeams = this.nhlUtil.getNHLTeams();
    this.mlbTeams = this.mlbUtil.getMLBTeams();
    this.nflTeams = this.nflUtil.getNFLTeams();
    this.playerImages = this.nbaUtil.getNBAImages();
    nflplayerImages = this.nflUtil.getNFLImages();
    this.mlbplayerImages = this.mlbUtil.getMLBImages();
    this.nhlplayerImages = this.nhlUtil.getNHLImages();
    
    let thisDate = new Date();
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
    this.testBrowser = isPlatformBrowser(platformId);
    let weekTimes = this.nflUtil.getWeekTimes();

    for (let week of weekTimes) {
      let date = new Date();
      if (date > new Date(week.dateBeg) && date < new Date(week.dateEnd)) {
        this.nflWeek = week.week; 

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

  public updateEndpoint() {
    if (this.sport === 'nba') {
      this.nbaSeasonType = this.nbaSeason ? "2020-2021-regular" : "2021-playoff";
      //get nhl playoffs
      if (this.nbaSection) { 
        this.sortNBA();
      }
    }

    if (this.sport === 'nhl') {
        this.nhlSeasonType = this.nhlSeason ? "2021-regular" : "2021-playoff";
        //get nhl playoffs
        if (this.nhlSection) { 
          this.sortNHL();
        } else {
          this.goalies();
        }
    }

    if (this.sport === 'mlb') {
      this.mlbApiRoot = this.mlbSeason ? "https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular" : 
      "https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular";

      this.mlbSeasonType = this.mlbSeason ? "2021-regular" : "2021-playoff";
      
      if (this.mlbSection) { 
        this.loadMLB();
      } else {
        this.loadHitters();
      }
    }
  }

  public authorize(event: object) {
    this.isOpen = true;
    this.submitting = true;
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('/authorize', {headers}).subscribe((res) => {
      this.openModal(event['player'], headers, event['type']);
    });
  }

  public openModal(player, headers, type) {
    this.type = type;
    this.selectedPlayer = null;
    this.noPosts = '';
    this.selectedPlayer = player;
    //this.gaService.eventEmitter("nba player info "+(data.playerObj ? data.playerObj.player.lastName : data.player.lastName), "nbatwitter", "tweet", "click", 10);
    let twitter = null;
    twitter = type === 'nba' ? this.nbaTeams[player.player['currentTeam'].abbreviation].twitter : type === 'nhl' ? this.nhlTeams[player.player['currentTeam'].abbreviation].twitter : player.team.twitter;
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

  public getByDate(event, type) {
    console.log('trying to get stats for', event, type);
    this.sport = type;
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
    this.timeSpan = event;
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
    this.week = week;
    this.timeSpan = week;
    this.combined = [];
    this.reduced = [];
    if (this.nflDefenseSection) {
      this.defensePlayers();
    } else if (this.nflSection) {
      this.loadNFL();
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

  
    this.nflPosition = p;
    this.loadNFL();
  }

  public onPosDChange(p) {
    this.nflDPosition = p;
    this.defensePlayers();
  }

  public spanGames() {
    let type = null;
    let season= null;
    if (this.sport === 'nba' && this.nbaSection) {
      this.loading = true;
      season = this.nbaSeasonType;
    }
      

    if (this.sport === 'nhl' && this.nhlSection) {
      this.nhlSkaterloading = true;
      season = this.nhlSeasonType;
      type = 'skaters';
    }
      
    if (this.sport === 'nhl' && this.nhlGoalies) {
      this.nhlGoalieloading = true;
      season = this.nhlSeasonType;
      type = 'goalies';
    }

    if (this.sport === 'mlb' && this.mlbSection) {
      this.mlbPitchingLoading = true;
      season = this.mlbSeasonType;
      type = 'pitchers';
    }
      
    if (this.sport === 'mlb' && this.mlbHittingSection) {
      this.mlbHittingLoading = true;
      season = this.mlbSeasonType;
      type = 'batters';
    }
      
    let root;
    this.nhlService
      .getGames(this.timeSpan, this.sport, this.tsDate, season).subscribe(res => {
      //console.log(res['games'], "scheduled games per selected time span...");
      //this.nbaSpanGames = res['games'];

      if (this.sport != 'nfl') {
        root = `https://api.mysportsfeeds.com/v2.1/pull/${this.sport}/2020-regular`;
        this.sortStats(root, res['games'], this.sport, type)
      } else if (this.sport === 'nfl' && this.nflSection) {
        root = `https://api.mysportsfeeds.com/v2.1/pull/${this.sport}/2020-2021-regular`;
        this.sortNFLStats(root, res['games'], this.sport, type, this.nflTeams);
      } else if (this.sport === 'nfl' && this.nflDefenseSection) {
        root = `https://api.mysportsfeeds.com/v2.1/pull/${this.sport}/2020-2021-regular`;
        this.sortNFLDStats(root, res['games'], this.sport, type, this.nflTeams);
      }
      
    })
  }

  loadData() {

    this.nbaService
      .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));
        let nflRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-regular";
        this.nbaService
          .sendHeaderOptions(headers);
        this.nhlService
          .sendHeaderOptions(headers);
        this.mlbService
          .sendHeaderOptions(headers);
        this.nflService
          .sendHeaderOptions(headers, '1', nflRoot);

       this.loadNFL(); // this.sortNBA();
        
      });

  }

  public sortNHL() {
    this.nbaSection = false; 
    this.nhlSection = true; 
    this.mlbSection = false;
    this.mlbHittingSection = false;
    this.nhlGoalies = false;
    this.nflSection = false;
    this.nflDefenseSection = false;
    this.nflDraftKit = false;
    this.sport = 'nhl';
    this.nhlSkaterloading = true;

    this.nhlService
       .getAllStats('skaters', this.nhlSeasonType).subscribe(res => {

        const nhlTeamsArray = Object.values(this.nhlTeams);
        //let specialImgNum = null;

        this.nhlSkaters = res['playerStatsTotals'].filter(
          player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 1);

          for (let team of nhlTeamsArray) {
            for (let data of this.nhlSkaters) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                //this.skaterFp(data);
                data.stats.scoring.fanDuelFP = this.util.round(this.nhlUtil.skaterSLFP(data),1);
                data.stats.scoring.fanDuelFPA = this.util.round(this.nhlUtil.skaterSLFPA(data),1);
                data.stats.scoring.iceTimeAvg = this.nhlService.iceTimeAvg(data.stats.shifts.timeOnIceSeconds, data.stats.gamesPlayed);
              }

              if (data.player.officialImageSrc == null) {
                data.player.officialImageSrc = this.nhlplayerImages[data.player.id] != null ? this.nhlplayerImages[data.player.id].image : null;
              }
              
            }  
          }

        //   this.nhlService
        //   .getInfoSkaters().subscribe(res => {
            
        //     this.newGoalieData = res['players'];
        //     for (let n of this.newGoalieData) {
        //       for (let old of this.nhlSkaters) {
        //         if (old.player['currentTeam'] != null)
        //           old.player['currentTeam'].lastYearTeamId = old.player['currentTeam'] != null ? old.player['currentTeam'].id : 0;
        //         if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
        //           old.player['currentTeam'].id = n['teamAsOfDate'].id;
        //           old.team.id = n['teamAsOfDate'].id;
        //         } 
                
        //       }
        //     }
        //     this.util.teamInfo(this.nhlSkaters, nhlTeamsArray);
            
        // });

        if (this.timeSpan === 'full') {
          this.dSkaters = this.nhlSkaters.filter(player => player.player.primaryPosition === 'D');
          this.fSkaters = this.nhlSkaters.filter(player => player.player.primaryPosition != 'D');
        }
          
        if (this.timeSpan != 'full') {
          this.spanGames();
        } else {
          this.nhlSkaterloading = false;
        } 
    })
  }

  public goalies() {

    this.nhlGoalieloading = true;
    this.nhlService
      .getAllStats('goalies', this.nhlSeasonType).subscribe(res => {
      //let specialImgNum = null;
      const nhlTeamsArray = Object.values(this.nhlTeams);
      this.nhlGoaltenders = res['playerStatsTotals'].filter(
        player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > (this.nhlSeason ? 2 : 0)); 
      this.gaaGoalies = this.nhlGoaltenders.filter(player => player.stats.goaltending['gamesStarted'] > (this.nhlSeason ? 2 : 0) && player.stats.goaltending.saves > (this.nhlSeason ? 50 : 15)); 

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

        // this.nhlService
        //   .getInfo().subscribe(res => {
            
        //     this.newGoalieData = res['players'];
        //     for (let n of this.newGoalieData) {
        //       for (let old of this.nhlGoaltenders) {
        //         if (old.player['currentTeam'] != null)
        //           old.player['currentTeam'].lastYearTeamId = old.player['currentTeam'] != null ? old.player['currentTeam'].id : 0;
        //         if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
        //           old.player['currentTeam'].id = n['teamAsOfDate'].id;
        //           old.team.id = n['teamAsOfDate'].id;
        //         } 
                
        //       }
        //     }
        //     this.util.teamInfo(this.nhlGoaltenders, nhlTeamsArray);
        //     // this.nflOffenseLoading = false;
        // });

        
        if (this.timeSpan != 'full') {
          this.spanGames();
        } else {
          this.nhlGoalieloading = false;
        }
        
    })
  }
  public async sortNBA() {
      this.loading = true;
      this.nbaSection = true; 
      this.nhlSection = false; 
      this.mlbHittingSection = false; 
      this.mlbSection = false; 
      this.nhlGoalies = false; 
      this.nflSection = false; 
      this.nflDefenseSection = false; 
      this.nflDraftKit = false;
      this.sport = 'nba';
      this.nbaService
       .getAllStats(this.timeSpan, this.nbaSeasonType).subscribe(res => {
          const nbaTeamsArray = Object.values(this.nbaTeams);

          this.myData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null);

          this.fgPlayers = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && nbabig[player.player['primaryPosition']] != null && player.stats.fieldGoals.fgAtt > (this.nbaSeason ? 150 : 8));
          this.smPlayers = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && nbasmall[player.player['primaryPosition']] != null && player.stats.fieldGoals.fgAtt > (this.nbaSeason ? 150 : 8));
            

          for (let team of nbaTeamsArray) {
            for (let data of this.myData) { 
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
          if (this.timeSpan != 'full')
            this.spanGames();
          
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

  ngOnInit() {
    if (this.testBrowser) {
      if (window.innerWidth < 700) { // 768px portrait
        this.mobile = true;
      }
      if (this.myData === undefined) {
        this.loadData();
        console.log('fetch data on init...');
      } else {
          this.loading = false;
      }
    }
  }

  public loadMLB() {
    
    this.nbaSection = false; 
    this.nhlSection = false; 
    this.mlbSection = true;
    this.mlbHittingSection = false; 
    this.nhlGoalies = false;
    this.nflSection = false;
    this.nflDefenseSection = false;
    this.nflDraftKit = false;
    this.sport = 'mlb';

    this.mlbPitchingLoading = true;
    

    this.mlbService
       .getAllStats(this.mlbApiRoot).subscribe(res => {
        

          this.mlbPitchingData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.pitching.inningsPitched > (this.mlbSeason ? 1 : 0)); // && player.stats.pitching.pitcherStrikeouts > 6
         
          this.pitcherERA = this.mlbPitchingData.filter(player => player.stats.miscellaneous['gamesStarted'] > 0 && player.stats.pitching.inningsPitched > (this.mlbSeason ? 5 : 0));
          this.closerERA = this.mlbPitchingData.filter(player => player.stats.pitching.pitcherStrikeouts > (this.mlbSeason ? 10 : 0) && player.stats.pitching.holds > (this.mlbSeason ? 7 : 0) || player.stats.pitching.saves > 0);

          for (let team of this.mlbTeams) {
            for (let data of this.mlbPitchingData) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                data.team.twitter = team['twitter'];
                this.pitcherFp(data);
                data.stats.pitching.earnedRunAvg = data.stats.pitching.earnedRunAvg.toFixed(2)
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

        // this.mlbService
        //   .getInfo().subscribe(res => {
        //     this.util.updatePlayers(res['players'], this.mlbPitchingData, this.mlbTeams);
        // });
          
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
    this.mlbHittingSection = true;
    this.mlbHittingLoading = true;

    this.mlbService
        .getAllHitters(this.mlbApiRoot).subscribe(res => {
        
         this.mlbHittingData = res['playerStatsTotals'].filter(
           player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.batting.atBats > (this.mlbSeason ? 15 : 0)); //player.stats.gamesPlayed > 4 && player.stats.batting.atBats > 15

         for (let team of this.mlbTeams) {
           for (let data of this.mlbHittingData) { 
             if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
               data.team.logo = team['officialLogoImageSrc'];
               data.team.city = team['city'];
               data.team.name = team['name'];
               data.team.twitter = team['twitter'];
               data.stats.batting.battingAvg = data.stats.batting.battingAvg.toFixed(3) 
               this.batterFp(data);
              // this.loading = false;
              if (data.player.officialImageSrc != null) {
                data.player.officialImageSrc = this.mlbService.imageSwap(data.player.officialImageSrc);
              }

              if (data.player.officialImageSrc == null) {
                data.player.officialImageSrc = this.mlbplayerImages[data.player.id] != null ? this.mlbplayerImages[data.player.id].image : null;
              }
                
             }
           }  
         }

         this.mlbService
          .getHitterInfo().subscribe(res => {
            this.util.updatePlayers(res['players'], this.mlbHittingData, this.mlbTeams);
        });
         
        if (this.timeSpan != 'full') {
          this.spanGames();
        } else {
          this.mlbHittingLoading = false;
        }
     })
  }

  public pitcherFp(player) {
    player.stats.pitching.fp = (player.stats.pitching.earnedRunsAllowed * -3) + player.stats.pitching.pitcherStrikeouts + player.stats.pitching.pickoffs + player.stats.pitching.pitcherFlyOuts + player.stats.pitching.pitcherGroundOuts;
    player.stats.pitching.fpa = Math.floor(player.stats.pitching.fp / player.stats.gamesPlayed);
    player.stats.pitching.pca = Math.floor(player.stats.pitching.pitchesThrown / player.stats.gamesPlayed); 
  }

  public batterFp(player) {
    player.stats.batting.fp = (player.stats.batting.hits - player.stats.batting.extraBaseHits) + (player.stats.batting.secondBaseHits * 2) + (player.stats.batting.thirdBaseHits * 3) + (player.stats.batting.homeruns * 4) + player.stats.batting.runs + player.stats.batting.runsBattedIn + player.stats.batting.batterWalks + player.stats.batting.stolenBases + player.stats.batting.hitByPitch;
    player.stats.batting.fpa = Math.floor(player.stats.batting.fp / player.stats.gamesPlayed);
  }

  public async loadNFL() {
    if (this.week === 'three-weeks') {
      // load 3 weeks of nfl games
      this.nflOffenseLoading = true;
      this.spanGames();
    } else {
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
    this.nflOffenseLoading = true;
    this.nbaSection = false; 
    this.nhlSection = false; 
    this.mlbSection = false; 
    this.nhlGoalies = false;
    this.mlbHittingSection = false;
    this.nflSection = true;
    this.sport = 'nfl';
if (this.nflTeamStats == null) {

    this.nflService.getTeamStats(this.tsDate).subscribe(res => {
      this.nflUtil.rank(this.nflTeams, res['teamStatsTotals'], this.nflWeek)
      this.nflUtil.updateTeamStats(res['teamStatsTotals'])
      this.nflTeamStats = res['teamStatsTotals'];
      this.nflUtil.sortSchedules(this.teamSchedules, this.nflWeek, headers);
      this.sortToughest();
      this.nflTeamLoading = false;
    })

  } else {
    this.nflTeamLoading = false;
}
  
    function teamInfo(array, teams, type, week, pos) {
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
            }
            //data.player['currentTeam'].lastYearTeamId
            if (week === 'all' && data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.stats.rushing || 
            week != 'all' && team['id'] === data.team.id && data.stats.rushing) {
              data.stats.receiving.totalTouches = data.stats.rushing.rushAttempts + data.stats.receiving.targets;
              data.stats.receiving.totalTouchPct = Math.floor(data.stats.receiving.totalTouches / team.plays * 100);
              data.stats.rushing.touchRunPct = Math.floor(data.stats.rushing.rushAttempts / team.runPlays * 100);
              data.stats.receiving.touchCatchPct = Math.floor(data.stats.receiving.targets / team.passPlays * 100);
              data.stats.passing.totalPassPct = Math.floor(data.stats.passing.passAttempts / team.plays * 100);
            }

            if (nflplayerImages[data.player.id] != null) {
              data.player.officialImageSrc = nflplayerImages[data.player.id].image;
            }

            if (data.player.id === 16494) {
              data.player.unsigned = true;
            }

            if (pos === 'k') {
              data.stats.fieldGoals.longFgMade = data.stats.fieldGoals.fgMade40_49 + data.stats.fieldGoals.fgMade50Plus
            }
            
          }  
        }
      }
      await sleep(500);
      this.nflService
        .getAllOffense(this.nflPosition, 'stats', this.week).subscribe(res => {
          if (res['gamelogs'] != null) {
            for (let data of this.nflData) {
              for (let wstats of res['gamelogs']) {
                wstats.player.primaryPosition = wstats.player.position;
                if (data.player.id === wstats.player.id && data.player.officialImageSrc != null) {
                  wstats.player.officialImageSrc = data.player.officialImageSrc;
                  wstats.player.primaryPosition = data.player.primaryPosition;
                }
              }
            }
          }
          let stats = res['playerStatsTotals'] != null ? res['playerStatsTotals'] : res['gamelogs'];
          this.nflData = stats
          // .filter(
            // player => player.stats != null && player.stats.passing.passYards > 80);
            // console.log(this.nflData, 'qb data')
          teamInfo(this.nflData, this.nflTeams, 'o', this.week, this.nflPosition);
          this.nflService
            .getAllOffense(this.nflPosition, 'info', this.week).subscribe(res => {
          
              this.util.updatePlayers(res['players'], this.nflData, this.nflTeams);
              this.nflOffenseLoading = false;
              
          })
      });

                }
              }

  public defensePlayers() {
    if (this.week === 'three-weeks') {
      // load 3 weeks of nfl games
      this.nflDefenseLoading = true;
      this.spanGames();
    } else {
      this.nflSection = false; 
      this.nflDefenseSection = true;
      this.sortToughest();
      function teamInfo(array, teams, type, week) {
        
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
              data.playerType = type;
            }
            if (nflplayerImages[data.player.id] != null) {
              data.player.officialImageSrc = nflplayerImages[data.player.id].image;
            }
          }  
        }
      }
      // if (this.nflDefenseData == null || this.week != 'all') {
        this.nflDefenseLoading = true;

        this.nflService.getAllDefense(this.nflDPosition, 'stats', this.week).subscribe(res => {

          if (res['gamelogs'] != null) {
            for (let data of this.nflDefenseData) {
              for (let wstats of res['gamelogs']) {
                wstats.player.primaryPosition = wstats.player.position;
                if (data.player.id === wstats.player.id && data.player.officialImageSrc != null) {
                  wstats.player.officialImageSrc = data.player.officialImageSrc;
                  wstats.player.primaryPosition = data.player.primaryPosition;
                }
              }
            }
          }
          let stats = res['playerStatsTotals'] != null ? res['playerStatsTotals'] : res['gamelogs'];
          this.nflDefenseData = stats.filter(
            player => player.stats != null && (player.stats.tackles.tackleTotal > 0 || player.stats.interceptions.passesDefended > 0));
          teamInfo(this.nflDefenseData, this.nflTeams, 'd', this.week);
          this.nflService
            .getAllDefense(this.nflDPosition, 'info', this.week).subscribe(res => {
              
              this.util.updatePlayers(res['players'], this.nflDefenseData, this.nflTeams);
          })

        this.nflDefenseLoading = false;
      });
      
    }
  }

  public sortToughest() {
    if (this.nflDefenseSection) {
      this.seasonLengthD = 'otr'
      // this.showDef = false;
    } else if (!this.nflDefenseSection) {
      this.seasonLength = 'dtr'
      // this.showDef = true;
    }
  }

  public seasonChange(sl) {
    console.log(sl, 'season length changed');
    this.seasonLength = sl;
  }

  public sortStats(root, games, sport, type) {
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
  
        forkJoin(
            games.map(
              g =>
              this.http.get(`${root}/games/`+ g.schedule.id +`/boxscore.json`, {headers})
              //.map(response => response.json())
            )
          )
          .subscribe(res => {
            let i: number;
            let home;
            let away;

            res.forEach((item, index) => {
              i = index;
              if (res[i] != null) {
                home = res[i]['stats'].away.players;
                away = res[i]['stats'].home.players;

                away.forEach((item, index) => {
                  this.combined.push(away[index]);
                })

                home.forEach((item, index) => {
                  this.combined.push(home[index]);
                })
            
                //console.log(this.combined, 'combined');
                this.reduced = this.combined.reduce(function(hash) {
                  //console.log(hash, 'hash');
                  return function(r, a) {
                    //console.log(a, 'this is a');
                    let key = a.player.id;
                    if (!hash[key]) {
                      hash[key] = { id: key, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0};
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
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.plateAppearances : 0;

                    hash[key]['10'] += s === 'nba' ? a.playerStats[0].fieldGoals.fgMade  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].shifts.timeOnIceSeconds 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.saves : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.pitcherWalks : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.plateAppearances : 0;

                    hash[key]['11'] += s === 'nba' ? a.playerStats[0].fieldGoals.fgMade  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].shifts.timeOnIceSeconds 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.goalsAgainst : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.hitsAllowed : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.plateAppearances : 0;

                    hash[key]['12'] += s === 'nba' ? a.playerStats[0].fieldGoals.fgMade  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].shifts.timeOnIceSeconds 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].goaltending.shotsAgainst : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.hitsAllowed : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.plateAppearances : 0;

                    hash[key]['13'] += s === 'nba' ? a.playerStats[0].fieldGoals.fgMade  : 
                    s === 'nhl' && skateSec ? a.playerStats[0].shifts.timeOnIceSeconds 
                    : s === 'nhl' && gSec && a.playerStats[0].goaltending != null ? a.playerStats[0].shifts.timeOnIceSeconds : 
                    s === 'mlb' && pSec && a.playerStats[0].pitching != null ? a.playerStats[0].pitching.hitsAllowed : 
                    s === 'mlb' && bSec && a.playerStats[0].batting != null ? a.playerStats[0].batting.plateAppearances : 0;

                    
                    //hash[key].svpercent = Math.round((hash[key].sv * 100) / hash[key].sa);
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
                        info.stats.scoring.iceTimeAvg = this.nhlService.iceTimeAvg(data['10'], data['7']);   
                        //this.skaterFp(info);
                        info.stats.scoring.fanDuelFP = this.util.round(this.nhlUtil.skaterSLFP(info),1);
                        info.stats.scoring.fanDuelFPA = this.util.round(this.nhlUtil.skaterSLFPA(info),1);
                        
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
                             
                        this.pitcherFp(info);
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
                         
                        this.batterFp(info);
                      }
                      
                      info.player.span = this.timeSpan;
                    }
                  }
                }
              }
            });

            if (s === 'mlb' && this.mlbSection) {
              this.crunched = this.mlbPitchingData.filter(player => player.player.span === this.timeSpan && player.stats.pitching.inningsPitched > 0);
              this.mlbPitchingData = this.crunched;

              this.pitcherERA = this.mlbPitchingData.filter(player => player.stats.miscellaneous['gamesStarted'] > 0 && player.stats.pitching.inningsPitched > 5);
              this.closerERA = this.mlbPitchingData.filter(player => player.stats.pitching.pitcherStrikeouts > 3 && player.stats.pitching.holds > 2 && player.stats.pitching.inningsPitched > 3 ||  player.stats.pitching.saves > 0);
                  
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
              this.fgPlayers = this.myData.filter(player => nbabig[player.player['primaryPosition']] != null && player.stats.fieldGoals.fgAtt > (this.timeSpan === ('today' || 'yesterday') ? 5 : 15));
              this.smPlayers = this.myData.filter(player => nbasmall[player.player['primaryPosition']] != null && player.stats.fieldGoals.fgAtt > (this.timeSpan === ('today' || 'yesterday') ? 5 : 15));
              // console.log(this.myData, 'crunched nba');
              this.loading = false; 
            }
                 
          });
  }
  
  public sortNFLStats(root, games, sport, type, nflTeams) {
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
  
        forkJoin(
            games.map(
              g =>
              this.http.get(`${root}/games/`+ g.schedule.id +`/boxscore.json`, {headers})
            )
          )
          .subscribe(res => {
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

            // function findRank(team, print) {
            //   let info;
            //   for (let t of nflTeams) {
            //      if (team === t.abbreviation) {
            //        info = {printName: print, oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation};
            //        return info; 
            //      }
            //   }
            // }

            function findRank(team, print, player) {
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
                       gameRY: oPos[player['player'].position] ? player['playerStats'][0].rushing.rushYards : 0, 
                       gameRA: oPos[player['player'].position] ? player['playerStats'][0].rushing.rushAttempts : 0, 
                       gameRecY: oPos[player['player'].position] ? player['playerStats'][0].receiving.recYards : 0,
                       gameRecR: oPos[player['player'].position] ? player['playerStats'][0].receiving.receptions : 0,
                       gameFGM: player['player'].position === 'K' ? player['playerStats'][0].fieldGoals.fgMade : 0,
                       gameLFGM: player['player'].position === 'K' ? player['playerStats'][0].fieldGoals.fgMade40_49 + player['playerStats'][0].fieldGoals.fgMade50Plus : 0,
                       playerName: player.player['firstName'],
                       playerId: player.player.id
                      };
                    return info; 
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
                homeTeam = res[i]['game'].homeTeam.abbreviation;
                awayTeam = res[i]['game'].awayTeam.abbreviation;

                //homeOpponent = findRank(res[i]['game'].awayTeam.abbreviation, `vs${res[i]['game'].awayTeam.abbreviation}`);
                //awayOpponent = findRank(res[i]['game'].homeTeam.abbreviation, `@${res[i]['game'].homeTeam.abbreviation}`);

                away.forEach((item, index) => {
                  away[index].tp = awayTotalPlays;
                  away[index].pp = awayPassPlays;
                  away[index].rp = awayRushPlays;
                  away[index].opponent = findRank(homeTeam, `@${homeTeam}`, away[index]);
                  this.combined.push(away[index]);
                })

                home.forEach((item, index) => {
                  home[index].tp = homeTotalPlays;
                  home[index].pp = homePassPlays;
                  home[index].rp = homeRushPlays;
                  home[index].opponent = findRank(awayTeam, `vs${awayTeam}`, home[index]);
                  this.combined.push(home[index]);
                })
            
                //console.log(this.combined, 'combined');
                this.reduced = this.combined.reduce(function(hash) {
                  //console.log(hash, 'hash');
                  return function(r, a) {
                    //console.log(a, 'this is a');
                    let key = a.player.id;
                    if (!hash[key]) {
                      hash[key] = { id: key, '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0, '7': 0, '8': 0, '9': 0, '10': 0, '11': 0, '12': 0, '13': 0, '14': 0, '15': 0, '16': 0, '17': []};
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
                    hash[key]['17'].push(a.opponent);
                    return r;
                  };

                }(Object.create(null)), []);

               

                for (let info of this.nflData) {
                  for (let data of this.reduced) {
                    //info.player.span = false;
                    if (info.player.id === data.id) {
                        //qb 
                        info.stats.passing.passYards = data['1'];
                        info.stats.passing.passTD = data['2'];
                        info.stats.rushing.rushYards = data['3'];
                        info.stats.receiving.receptions = data['4'];               
                        info.stats.receiving.recTD = data['5'];
                        info.stats.rushing.rushTD = data['6'];
                        info.stats.passing.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                        info.stats.receiving.recYards = data['8'];
                        info.stats.passing.totalPassPct = Math.floor(data['11'] / data['14'] * 100);
                        info.spanOpponents = data['17'];
                        
                        //rb
                        info.stats.rushing.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                        
                        info.stats.rushing.touchRunPct = Math.floor(data['12'] / data['16'] * 100);
                        info.stats.receiving.touchCatchPct = Math.floor(data['13'] / data['15'] * 100);

                        //wr te
                        
                        info.stats.receiving.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                        
                        // k
                        info.stats.fieldGoals.fgMade = data['9'];
                        info.stats.fieldGoals.longFgMade = data['10'];
                       
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan;
                    }
                  }
                }

                // for (let info of this.nflRushData) {
                //   for (let data of this.reduced) {
                //     //info.player.span = false;
                //     if (info.player.id === data.id) { 
                //         info.stats.passing.passYards = data['1'];
                //         info.stats.passing.passTD = data['2'];
                //         info.stats.rushing.rushYards = data['3'];
                //         info.stats.receiving.receptions = data['4'];               
                //         info.stats.receiving.recTD = data['5'];
                //         info.stats.rushing.rushTD = data['6'];
                //         info.stats.rushing.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                //         info.stats.receiving.recYards = data['8'];
                        
                //         info.stats.rushing.touchRunPct = Math.floor(data['12'] / data['16'] * 100);
                       
                //         info.stats.receiving.touchCatchPct = Math.floor(data['13'] / data['15'] * 100);
                //         info.spanOpponents = data['17'];
                       
                //         //TODO: Get toughness rank per 3 week span
                //         info.player.span = this.timeSpan;
                //     }
                //   }
                // }

                // for (let info of this.nflRecData) {
                //   for (let data of this.reduced) {
                //     //info.player.span = false;
                //     if (info.player.id === data.id) { 
                //         info.stats.passing.passYards = data['1'];
                //         info.stats.passing.passTD = data['2'];
                //         info.stats.rushing.rushYards = data['3'];
                //         info.stats.receiving.receptions = data['4'];               
                //         info.stats.receiving.recTD = data['5'];
                //         info.stats.rushing.rushTD = data['6'];
                //         info.stats.receiving.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                //         info.stats.receiving.recYards = data['8'];

                //         info.stats.rushing.touchRunPct = Math.floor(data['12'] / data['16'] * 100);
                //         info.stats.receiving.touchCatchPct = Math.floor(data['13'] / data['15'] * 100);
                //         info.spanOpponents = data['17'];
                       
                //         //TODO: Get toughness rank per 3 week span
                //         info.player.span = this.timeSpan;
                //     }
                //   }
                // }

                // for (let info of this.nflTEData) {
                //   for (let data of this.reduced) {
                //     //info.player.span = false;
                //     if (info.player.id === data.id) { 
                //         info.stats.passing.passYards = data['1'];
                //         info.stats.passing.passTD = data['2'];
                //         info.stats.rushing.rushYards = data['3'];
                //         info.stats.receiving.receptions = data['4'];               
                //         info.stats.receiving.recTD = data['5'];
                //         info.stats.rushing.rushTD = data['6'];
                //         info.stats.receiving.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                //         info.stats.receiving.recYards = data['8'];

                //         info.stats.rushing.touchRunPct = Math.floor(data['12'] / data['16'] * 100);
                //         info.stats.receiving.touchCatchPct = Math.floor(data['13'] / data['15'] * 100);
                //         info.spanOpponents = data['17'];
                       
                //         //TODO: Get toughness rank per 3 week span
                //         info.player.span = this.timeSpan;
                //     }
                //   }
                // }

                // for (let info of this.nflKickerData) {
                //   for (let data of this.reduced) {
                //     //info.player.span = false;
                //     if (info.player.id === data.id) { 
                //         info.stats.fieldGoals.fgMade = data['9'];
                //         info.stats.fieldGoals.longFgMade = data['10'];
                //         info.spanOpponents = data['17'];
                //         //TODO: Get toughness rank per 3 week span
                //         info.player.span = this.timeSpan;
                //     }
                //   }
                // }

              }
            });

              this.crunched = this.nflData.filter(player => player.player.span === this.timeSpan);
              this.nflData = this.crunched;
               
              // console.log(this.nhlGoaltenders, 'crunched nhl');
              this.nflOffenseLoading = false;
                 
          });
  } 
  
  public sortNFLDStats(root, games, sport, type, nflTeams) {
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
  
        forkJoin(
            games.map(
              g =>
              this.http.get(`${root}/games/`+ g.schedule.id +`/boxscore.json`, {headers})
            )
          )
          .subscribe(res => {
            let i: number;
            let home;
            let away;
            let awayOpponent;
            let homeOpponent;
            let awayOpponentYds;
            let homeOpponentYds;
            let awayTeam;
            let homeTeam;
            let opponentYdsArr = [];

            function applyOY(team, print, oy) {  
              
              for (let t of nflTeams) {
               if (team === t.abbreviation) { 
                  opponentYdsArr.push({owner: team, game: print, oy: oy});
                  t.opponentYdsArr = opponentYdsArr;
                }
              }
            }

            function findRank(team, print, player, oy) {
              let info;
              
              for (let t of nflTeams) {
                  
                  if (team === t.abbreviation && dPos[player['player'].position]) {
                    
                    info = {
                       printName: print,
                       oRank: t.offenseRankLs, 
                       dRank: t.defenseRankLs, 
                       name: t.abbreviation, 
                       opponentYds: oy, 
                       gameTackles: player['playerStats'][0].tackles.tackleTotal, 
                       gameSacks: player['playerStats'][0].tackles.sacks, 
                       gameInt: player['playerStats'][0].interceptions.interceptions, 
                       gameTD: player['playerStats'][0].interceptions.intTD + player['playerStats'][0].fumbles.fumTD,
                       playerName: player.player['firstName'],
                       playerId: player.player.id
                      };
                    return info; 
                  }
               
              }
            }

            res.forEach((item, index) => {
              i = index;
              if (res[i] != null) {
                //console.log(res[i], 'boxscore')
                home = res[i]['stats'].home.players;
                away = res[i]['stats'].away.players;
                homeTeam = res[i]['game'].homeTeam.abbreviation;
                awayTeam = res[i]['game'].awayTeam.abbreviation;
                //console.log(away, 'away players')
                awayOpponentYds = res[i]['stats'].home.teamStats[0].miscellaneous ? res[i]['stats'].home.teamStats[0].miscellaneous.offenseYds : 0;
                homeOpponentYds = res[i]['stats'].away.teamStats[0].miscellaneous ? res[i]['stats'].away.teamStats[0].miscellaneous.offenseYds : 0;
                applyOY(awayTeam, `@${homeTeam}`, awayOpponentYds);
                applyOY(homeTeam, `vs${awayTeam}`, homeOpponentYds);
                //homeOpponent = findRank(awayTeam, `vs${awayTeam}`, home, homeOpponentYds);
                //awayOpponent = findRank(homeTeam, `@${homeTeam}`, away, awayOpponentYds);

                away.forEach((item, index) => {
                  away[index].opponent = findRank(homeTeam, `@${homeTeam}`, away[index], awayOpponentYds);
                  this.combined.push(away[index]);
                })

                home.forEach((item, index) => {  
                  home[index].opponent = findRank(awayTeam, `vs${awayTeam}`, home[index], homeOpponentYds); 
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
                        info.spanOpponents = data['6'];
                        
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan;
                    }
                  }
                }

              }
            });

              this.crunchedDef = this.nflDefenseData.filter(player => player.player.span === this.timeSpan);
              this.nflDefenseData = this.crunchedDef;
              
              this.nflDefenseLoading = false;
                 
          });
  } 
}

