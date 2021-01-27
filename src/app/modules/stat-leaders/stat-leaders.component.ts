import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { NBADataService, 
  NHLDataService, 
  DataService,
  UtilService, 
  GoogleAnalyticsService,
  NFLDataService,
  RankService,
  NhlUtilService,
  NbaUtilService } from '../../services/index';
import { DomSanitizer } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';
import { forkJoin } from 'rxjs';

let headers = null;
let today = new Date();
let repImg = null;
let nflplayerImages = null;
let promiseTwo;

@Component({
  selector: 'app-stat-leaders',
  templateUrl: './stat-leaders.component.html',
  styleUrls: ['./stat-leaders.component.scss']
})
export class StatLeadersComponent implements OnInit {

  public teamRef: Array <any>;
  public allSentData: Array <any>;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nba/2020-regular";
  public mlbApiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-playoff";
  public nflApiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular";
  public nhlApiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2020-2021-regular";
  public myData: Array <any>;
  public mlbPitchingData: Array <any>;
  public mlbHittingData: Array <any>;
  public nflOffenseData: Array <any>;
  public nflTEData: Array <any>;
  public nflQBData: Array <any>;
  public nflRushData: Array <any>;
  public nflRecData: Array <any>;
  public nflDefenseData: Array <any>;
  public nflKickerData: Array <any>;
  public newKickerData: Array <any>;
  public newQBData: Array <any>;
  public newRushData: Array <any>;
  public newRecData: Array <any>;
  public newDefenseData: Array <any>;
  public newGoalieData: Array <any>;
  public nhlSkaters: Array <any>;
  public dSkaters: Array <any>;
  public fSkaters: Array <any>;
  public nhlGoaltenders: Array <any>;
  public loading: boolean = false;
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
  public nflDraftKit: boolean = false;
  public seasonLength   : string = 'full';
  public seasonLengthD  : string = 'full';
  public testBrowser: boolean;
  public timeSpan: string = 'full';
  public nbaSpanGames: Array <any> = [];
  public reduced: Array <any> = [];
  public crunched: Array <any> = [];
  public combined: Array <any> = [];
  public sport: string = 'nba';
  public nflWeek: any;
  public week: any = 'all';
  public crunchedQB: Array <any> = [];
  public crunchedRB: Array <any> = [];
  public crunchedWR: Array <any> = [];
  public crunchedTE: Array <any> = [];
  public crunchedKicker: Array <any> = [];
  public crunchedDef: Array <any> = [];
  public nhlSeason: boolean = false;
  public mlbSeason: boolean = false;
  
  constructor(private nbaService: NBADataService,
              private nhlService: NHLDataService,
              private mlbService: DataService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private util: UtilService,
              public gaService: GoogleAnalyticsService,
              public nflService: NFLDataService,
              public rankService: RankService,
              public nhlUtil: NhlUtilService,
              public nbaUtil: NbaUtilService,
              @Inject(PLATFORM_ID) platformId: string) {
    this.nbaSection = true;
    this.loading = true;
    this.stats = '1';
    this.nbaTeams = this.nbaUtil.getNBATeams();
    this.nhlTeams = this.nhlUtil.getNHLTeams();
    this.mlbTeams = this.util.getMLBTeams();
    this.nflTeams = this.util.getNFLTeams();
    this.playerImages = this.nbaUtil.getNBAImages();
    nflplayerImages = this.util.getNFLImages();
    this.mlbplayerImages = this.util.getMLBImages();
    this.nhlplayerImages = this.nhlUtil.getNHLImages();
    repImg = this.util.getRepImages();
    
    let thisDate = new Date();
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
    this.testBrowser = isPlatformBrowser(platformId);
    let weekTimes = this.util.getWeekTimes();

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
    if (this.sport === 'nhl') {
        this.nhlApiRoot = this.nhlSeason ? "https://api.mysportsfeeds.com/v2.1/pull/nhl/2021-regular" : 
        "https://api.mysportsfeeds.com/v2.1/pull/nhl/2021-playoff";
        //get nhl playoffs
        if (this.nhlSection) { 
          this.sortNHL();
        } else {
          this.goalies();
        }
    }

    if (this.sport === 'mlb') {
      this.mlbApiRoot = this.mlbSeason ? "https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-regular" : 
      "https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-playoff";
      
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

  public spanGames() {
    let type = null;
    if (this.sport === 'nba')
      this.loading = true;

    if (this.sport === 'nhl' && this.nhlSection) {
      this.nhlSkaterloading = true;
      type = 'skaters';
    }
      
    if (this.sport === 'nhl' && this.nhlGoalies) {
      this.nhlGoalieloading = true;
      type = 'goalies';
    }

    if (this.sport === 'mlb' && this.mlbSection) {
      this.mlbPitchingLoading = true;
      type = 'pitchers';
    }
      
    if (this.sport === 'mlb' && this.mlbHittingSection) {
      this.mlbHittingLoading = true;
      type = 'batters';
    }
      
    let root;
    this.nhlService
      .getGames(this.timeSpan, this.sport, this.tsDate).subscribe(res => {
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

        this.sortNBA();
        
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
       .getAllStats('skaters', this.nhlApiRoot).subscribe(res => {

        const nhlTeamsArray = Object.values(this.nhlTeams);
        //let specialImgNum = null;

        this.nhlSkaters = res['playerStatsTotals'].filter(
          player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null); //player.stats.gamesPlayed > 3

          for (let team of nhlTeamsArray) {
            for (let data of this.nhlSkaters) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                this.skaterFp(data);
                data.stats.scoring.iceTimeAvg = this.nhlService.iceTimeAvg(data.stats.shifts.timeOnIceSeconds, data.stats.gamesPlayed);
              }

              // if (data.player.officialImageSrc != null) {
              //   specialImgNum = data.player.officialImageSrc.substring(
              //     data.player.officialImageSrc.lastIndexOf("/") + 1, 
              //     data.player.officialImageSrc.lastIndexOf(".")
              //     );
                  
              //   data.player.officialImageSrc = "https://cms.nhl.bamgrid.com/images/headshots/current/168x168/"+specialImgNum+".jpg";
              // }

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
      .getAllStats('goalies', this.nhlApiRoot).subscribe(res => {
      //let specialImgNum = null;
      const nhlTeamsArray = Object.values(this.nhlTeams);
      this.nhlGoaltenders = res['playerStatsTotals'].filter(
        player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null); //player.stats.gamesPlayed > 3

        for (let team of nhlTeamsArray) {
          for (let data of this.nhlGoaltenders) { 
            if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
              data.team.logo = team['officialLogoImageSrc'];
              data.team.city = team['city'];
              data.team.name = team['name'];
              this.goalieFp(data);
              
            }

            // if (data.player.officialImageSrc != null) {
            //   specialImgNum = data.player.officialImageSrc.substring(
            //     data.player.officialImageSrc.lastIndexOf("/") + 1, 
            //     data.player.officialImageSrc.lastIndexOf(".")
            //     );
                
            //   data.player.officialImageSrc = "https://cms.nhl.bamgrid.com/images/headshots/current/168x168/"+specialImgNum+".jpg";
            // }

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

  public skaterFp (player) {
    player.stats.sog = player.stats.skating.shots ? player.stats.skating.shots : 0;
    player.stats.blocks = player.stats.skating.blockedShots ? player.stats.skating.blockedShots : 0;
    player.stats.scoring.fp = (player.stats.scoring.goals * 3 + player.stats.scoring.assists * 2) + (player.stats.sog + player.stats.blocks);
    player.stats.scoring.fpa = Math.floor(player.stats.scoring.fp / player.stats.gamesPlayed);
  }

  public goalieFp (player) {
    player.stats.goaltending.fp = ((player.stats.goaltending.saves * 0.2) - player.stats.goaltending.goalsAgainst).toFixed(2);
    player.stats.goaltending.fpa = Math.floor(player.stats.goaltending.fp / player.stats.gamesPlayed);
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
       .getAllStats(this.timeSpan).subscribe(res => {
          const nbaTeamsArray = Object.values(this.nbaTeams);

          this.myData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null);

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
    player.stats.offense.fp = Math.floor(player.stats.offense.pts + (player.stats.offense.ast * 1.5) + (player.stats.rebounds.reb * 1.2) + (player.stats.defense.stl * 3) + (player.stats.defense.blk * 3) - player.stats.defense.tov);
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
          let specialImgNum = null;
          //this.loading = false;
          //const mlbTeamsArray = Object.values(this.nbaTeams);

          this.mlbPitchingData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.pitching.inningsPitched > 0); // && player.stats.pitching.pitcherStrikeouts > 6

          for (let team of this.mlbTeams) {
            for (let data of this.mlbPitchingData) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                data.team.twitter = team['twitter'];
                this.pitcherFp(data);
                //this.loading = false;

                if (data.player.officialImageSrc != null) {
                  specialImgNum = data.player.officialImageSrc.substring(
                    data.player.officialImageSrc.lastIndexOf("/") + 1, 
                    data.player.officialImageSrc.lastIndexOf(".")
                    );
                    
                  data.player.officialImageSrc = `https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_100/v1/people/${specialImgNum}/headshot/67/current`;
                }

                if (data.player.officialImageSrc == null) {
                  data.player.officialImageSrc = this.mlbplayerImages[data.player.id] != null ? this.mlbplayerImages[data.player.id].image : null;
                }
                
              } 
              
            }  
          }

        this.mlbService
          .getInfo().subscribe(res => {
            
            for (let n of res['players']) {
              for (let old of this.mlbPitchingData) {
                if (old.player['currentTeam'] != null)
                  old.player['currentTeam'].lastYearTeamId = old.player['currentTeam'] != null ? old.player['currentTeam'].id : 0;
                if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
                  old.player['currentTeam'].id = n['teamAsOfDate'].id;
                  old.team.id = n['teamAsOfDate'].id;
                } 
                
              }
            }
            this.util.teamInfo(this.mlbPitchingData, this.mlbTeams);
        });
          
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
        
         let specialImgNum = null;

         this.mlbHittingData = res['playerStatsTotals'].filter(
           player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.batting.atBats > 0); //player.stats.gamesPlayed > 4 && player.stats.batting.atBats > 15

         for (let team of this.mlbTeams) {
           for (let data of this.mlbHittingData) { 
             if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
               data.team.logo = team['officialLogoImageSrc'];
               data.team.city = team['city'];
               data.team.name = team['name'];
               data.team.twitter = team['twitter'];
               this.batterFp(data);
              // this.loading = false;
              if (data.player.officialImageSrc != null) {
                specialImgNum = data.player.officialImageSrc.substring(
                  data.player.officialImageSrc.lastIndexOf("/") + 1, 
                  data.player.officialImageSrc.lastIndexOf(".")
                  );
                
                data.player.officialImageSrc = `https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_100/v1/people/${specialImgNum}/headshot/67/current`;
              }

              if (data.player.officialImageSrc == null) {
                data.player.officialImageSrc = this.mlbplayerImages[data.player.id] != null ? this.mlbplayerImages[data.player.id].image : null;
              }
                
             }
           }  
         }

         this.mlbService
          .getHitterInfo().subscribe(res => {
            
            for (let n of res['players']) {
              for (let old of this.mlbHittingData) {
                if (old.player['currentTeam'] != null)
                  old.player['currentTeam'].lastYearTeamId = old.player['currentTeam'] != null ? old.player['currentTeam'].id : 0;
                if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
                  old.player['currentTeam'].id = n['teamAsOfDate'].id;
                  old.team.id = n['teamAsOfDate'].id;
                } 
                
              }
            }
            this.util.teamInfo(this.mlbHittingData, this.mlbTeams);
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
    //this.loading = true;
    this.nbaSection = false; 
    this.nhlSection = false; 
    this.mlbSection = false; 
    this.nhlGoalies = false;
    this.mlbHittingSection = false;
    this.nflSection = true;
    this.sport = 'nfl';

    this.nflService.getTeamStats(this.tsDate).subscribe(async res => {
      for (let stats of res['teamStatsTotals']) {
        for (let team of this.nflTeams) {
          if (stats.team.id === team.id) {
            stats.bye = team.bye;
          }
        }
      }

      let promiseOne;
      promiseOne = new Promise((resolve, reject) => {
        this.nflTeams = this.rankService.rankOffense(res['teamStatsTotals'], this.nflTeams, this.nflWeek);
        this.nflTeams = this.rankService.rankDefense(res['teamStatsTotals'], this.nflTeams, this.nflWeek); 
        resolve();
      })
    
      let resultOne = await promiseOne;

      this.nflTeamStats = res['teamStatsTotals'];
      await sleep(2000);
      this.nflTeamLoading = false;
      for (let teamStats of this.nflTeamStats) {
        for (let team of this.nflTeams) {
          if (team.id === teamStats.team.id) {
            team.plays = teamStats.stats.rushing.rushAttempts + teamStats.stats.passing.passAttempts;
            team.passPlays = teamStats.stats.passing.passAttempts;
            team.runPlays = teamStats.stats.rushing.rushAttempts;
            teamStats.upDefRank = team.defenseRankLs;
            teamStats.upOffRank = team.offenseRankLs;
          }
        }
      }
  })
  
  if (this.teamSchedules.length === 0) {
    let team: any;
    let bye: any;
    let abbreviation: any;
    let teamSchedule: { 
      team: any,
      abbreviation: any,
      schedule: any,
      dToughnessRank: any,
      oToughnessRank: any,
      dToughnessFhRank: any,
      oToughnessFhRank: any,
      dToughnessShRank: any,
      oToughnessShRank: any, 
      scheduleTicker: any,
      weekOpponent: any
    };

    forkJoin(
      this.nflTeams.map(
        g => 
        
         this.http.get(`${this.nflApiRoot}/games.json?team=${g.abbreviation}`, { headers })
        
      )
    )
    .subscribe( async res => {
      //console.log(res, 'get team schedules...');
      res.forEach((item, index) => { 
        team = this.nflTeams[index].id;
        bye = this.nflTeams[index].bye;
        abbreviation = this.nflTeams[index].abbreviation;
        teamSchedule = {
          team: team,
          abbreviation: abbreviation,
          schedule: res[index]['games'],
          dToughnessRank: this.getSchedToughness(res[index]['games'], 'd', team, bye),
          oToughnessRank: this.getSchedToughness(res[index]['games'], 'o', team, bye),
          dToughnessFhRank: this.getSchedToughness(res[index]['games'], 'dfh', team, bye),
          oToughnessFhRank: this.getSchedToughness(res[index]['games'], 'ofh', team, bye),
          dToughnessShRank: this.getSchedToughness(res[index]['games'], 'dsh', team, bye),
          oToughnessShRank: this.getSchedToughness(res[index]['games'], 'osh', team, bye),
          scheduleTicker: this.getSchedToughness(res[index]['games'], 't', team, bye),
          weekOpponent: this.getSchedToughness(res[index]['games'], 'wop', team, bye)
        }
        this.teamSchedules.push(teamSchedule);
        
        promiseTwo = new Promise((resolve, reject) => {
          this.getRank(this.teamSchedules);
          resolve();
        })
      })

    }, (err: HttpErrorResponse) => {       
      console.log(err, 'error getting lineup');
    });
    //console.log(this.teamSchedules, 'team schedules ranks', this.nflTeams, 'nfl teams getting schedule rank sort');
    
  }

      this.nflOffenseLoading = true;
     
      //this.nflDefenseLoading = true;
      //console.log(this.nflTeams, 'nfl teams');

      function teamInfo(array, teams, type, week) {
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

            if (repImg[data.player.id] != null) {
              data.player.officialImageSrc = repImg[data.player.id] ? repImg[data.player.id].new : data.player.officialImageSrc;
            }
            
            if (data.player.officialImageSrc == null) {
              data.player.officialImageSrc = nflplayerImages[data.player.id] != null ? nflplayerImages[data.player.id].image : null;
            }
            
          }  
        }
      }
      //let resultTwo = await promiseTwo;
      await sleep(2500);
      this.nflService
        .getAllOffense('qb', '19', this.week).subscribe(res => {
          if (res['gamelogs'] != null) {
            for (let data of this.nflQBData) {
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
          this.nflQBData = stats.filter(
            player => player.stats != null && player.stats.passing.passYards > 80);

        // this.nflService
        //   .getAllOffense('qb', '20').subscribe(res => {
        //     this.newQBData = res['players'].filter(
        //       player => player['teamAsOfDate'] != null);;
        //     for (let n of this.newQBData) {
        //     for (let old of this.nflQBData) {
        // //         if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
        // //           old.player['currentTeam'].id = n['teamAsOfDate'].id;
        // //           old.team.id = n['teamAsOfDate'].id;
        // //         }
                
        // //         if (old.player.id === 8550) {
        // //           old.player['currentTeam'].id = 70;
        // //           old.team.id = 70;
        // //           old.team.abbreviation = 'NO';
        // //         }

            
        // //       }
        //         if (old.player.officialImageSrc == null) {
        //           old.player.officialImageSrc = this.playerImages[old.player.id] != null ? this.playerImages[old.player.id].image : null;
        //         }
        //     }
        //     teamInfo(this.nflQBData, this.nflTeams, 'o', this.week);
        
            
        // });
        // for (let data of this.nflQBData) {
        //   if (data.player.officialImageSrc == null) {
        //     data.player.officialImageSrc = this.nflplayerImages[data.player.id] != null ? this.nflplayerImages[data.player.id].image : null;
        //   }

        // }
        teamInfo(this.nflQBData, this.nflTeams, 'o', this.week);
        //console.log(this.nflQBData, 'qb data')
      });

      this.nflService
        .getAllOffense('run', '19', this.week).subscribe(res => {
          if (res['gamelogs'] != null) {
            for (let data of this.nflRushData) {
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
          this.nflRushData = stats.filter(
            player => player.stats != null && player.stats.rushing.rushYards > 10);

        // this.nflService
        //   .getAllOffense('run', '20').subscribe(res => {
        //     console.log(this.nflRushData, 'rush data')
        //     this.newRushData = res['players'];
        //     for (let n of this.newRushData) {
        //       for (let data of this.nflRushData) {
        //         if (old.player['currentTeam'] != null)
        //           old.player['currentTeam'].lastYearTeamId = old.player['currentTeam'] != null ? old.player['currentTeam'].id : 0;
        //         if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
        //           old.player['currentTeam'].id = n['teamAsOfDate'].id;
        //           old.team.id = n['teamAsOfDate'].id;
        //         } 
                
        //         if (old.player.id === 8550) {
        //           old.player['currentTeam'].id = 70;
        //           old.team.id = 70;
        //           old.team.abbreviation = 'NO';
        //         }
        //       }
        //     }
        //     teamInfo(this.nflRushData, this.nflTeams, 'o', this.week);
        //     this.nflOffenseLoading = false;
        // });
        // for (let data of this.nflRushData) {
        //   if (data.player.officialImageSrc == null) {
        //     data.player.officialImageSrc = this.nflplayerImages[data.player.id] != null ? this.nflplayerImages[data.player.id].image : null;
        //   }
        // }
        teamInfo(this.nflRushData, this.nflTeams, 'o', this.week);
        this.nflOffenseLoading = false;
      });

      this.nflService
        .getAllOffense('rec', '19', this.week).subscribe(res => {
          if (res['gamelogs'] != null) {
            for (let data of this.nflRecData) {
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
          this.nflRecData = stats.filter(
            player => player.stats != null && player.stats.receiving.receptions > 0);

        // this.nflService
        //   .getAllOffense('rec', '20').subscribe(res => {
        //     this.newRecData = res['players'];
        //     for (let n of this.newRecData ) {
        //       for (let old of this.nflRecData) {
        //         old.player['currentTeam'].lastYearTeamId = old.player['currentTeam'].id;
        //         if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
        //           old.player['currentTeam'].id = n['teamAsOfDate'].id;
        //           old.team.id = n['teamAsOfDate'].id;
        //         }
        //       }
        //     }
            
        // });
        // for (let data of this.nflRecData) {
        //   if (data.player.officialImageSrc == null) {
        //     data.player.officialImageSrc = this.nflplayerImages[data.player.id] != null ? this.nflplayerImages[data.player.id].image : null;
        //   }
        // }
        teamInfo(this.nflRecData, this.nflTeams, 'o', this.week);
      });

      this.nflService
        .getAllOffense('te', '19', this.week).subscribe(res => {
          if (res['gamelogs'] != null) {
            for (let data of this.nflTEData) {
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
          this.nflTEData = stats.filter(
            player => player.stats != null && player.stats.receiving.receptions > 0);

        // for (let data of this.nflTEData) {
        //   if (data.player.officialImageSrc == null) {
        //     data.player.officialImageSrc = this.nflplayerImages[data.player.id] != null ? this.nflplayerImages[data.player.id].image : null;
        //   }
        // }
        // for (let data of this.nflTEData) {
        //   if (data.player.officialImageSrc == null) {
        //     data.player.officialImageSrc = this.nflplayerImages[data.player.id] != null ? this.nflplayerImages[data.player.id].image : null;
        //   }
        // }
        teamInfo(this.nflTEData, this.nflTeams, 'o', this.week);
      });

      this.nflService
        .getAllOffense('k', '19', this.week).subscribe(res => {
          if (res['gamelogs'] != null) {
            for (let data of this.nflKickerData) {
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
          this.nflKickerData = stats.filter(
            player => player.stats != null && player.stats.fieldGoals.fgMade > 0);

            for (let old of this.nflKickerData) {
              // if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
              //   old.player['currentTeam'].id = n['teamAsOfDate'].id;
              //   old.team.id = n['teamAsOfDate'].id;
                old.stats.fieldGoals.longFgMade = old.stats.fieldGoals.fgMade40_49 + old.stats.fieldGoals.fgMade50Plus;
              //}
            }

        // this.nflService
        //   .getAllOffense('k', '20').subscribe(res => {
        //     this.newKickerData = res['players'];
        //     //for (let n of this.newKickerData ) {
              
        //     //}
        //     // for (let data of this.nflKickerData) {
        //     //   if (data.player.officialImageSrc == null) {
        //     //     data.player.officialImageSrc = this.nflplayerImages[data.player.id] != null ? this.nflplayerImages[data.player.id].image : null;
        //     //   }
        //     // }
        //     teamInfo(this.nflKickerData, this.nflTeams, 'o', this.week);
        // });
        teamInfo(this.nflKickerData, this.nflTeams, 'o', this.week);
      });
    }
  }

  public getSchedToughness(sched, type, mainTeam, bye) {
    let halfwayThrough = Math.floor(sched.length / 2);
    let arrayFirstHalf = sched.slice(0, halfwayThrough);
    let arraySecondHalf = sched.slice(halfwayThrough, sched.length);

    if (type === 'd') {
      let sum = 0;
      for (let s of sched) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'o') {
      let sum = 0;
      for (let s of sched) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.offenseRankLs;
          }
        }
      }
      return sum;
    }  else if (type === 't') {
      let sum = [];
      sched.forEach((s, index) => {
        for (let t of this.nflTeams){
          if (s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: '@'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          } else if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id) {
            if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: 'vs'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          }
        }
      })
      return sum;
    }  else if (type === 'wop') {
      let sum = [];
      sched.forEach((s, index) => {
        for (let t of this.nflTeams){
          if (s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id && s.schedule.week == this.nflWeek) {
            //if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: '@'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          } else if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id && s.schedule.week == this.nflWeek) {
            //if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: 'vs'+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          } else if (index+1 === bye && bye === parseInt(this.nflWeek)){ 
            sum.push({printName: 'BYE ', oRank: 1, dRank: 1, name: bye});
          }
        }
      })
      return sum;
    } else if (type === 'dfh') {
      let sum = 0;
      for (let s of arrayFirstHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'ofh') {
      let sum = 0;
      for (let s of arrayFirstHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.offenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'dsh') {
      let sum = 0;
      for (let s of arraySecondHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'osh') {
      let sum = 0;
      for (let s of arraySecondHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.offenseRankLs;
          }
        }
      }
      return sum;
    }
  }

  public getRank(schedules) {

    let rank = [];
    let rank2 = [];
    let rankDfh = [];
    let rankOfh = [];
    let rankDsh = [];
    let rankOsh = [];

    if (this.nflTeams && schedules.length > 0) {

      rank = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessRank'] 
        <= b['dToughnessRank']) {
          return -1;
        } else if (a['dToughnessRank']
        >= b['dToughnessRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rank.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rank[index].team === team.id) { 
            team.dtr = index + 1;
          }         
        }
      });

      rank2 = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessRank'] 
        <= b['oToughnessRank']) {
          return -1;
        } else if (a['oToughnessRank']
        >= b['oToughnessRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rank2.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rank2[index].team === team.id) { 
            team.otr = index + 1;
          }         
        }
      });

      rankDfh = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessFhRank'] 
        <= b['dToughnessFhRank']) {
          return -1;
        } else if (a['dToughnessFhRank']
        >= b['dToughnessFhRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankDfh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankDfh[index].team === team.id) { 
            team.dfh = index + 1;
          }         
        }
      });

      rankOfh = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessFhRank'] 
        <= b['oToughnessFhRank']) {
          return -1;
        } else if (a['oToughnessFhRank']
        >= b['oToughnessFhRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankOfh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankOfh[index].team === team.id) { 
            team.ofh = index + 1;
          }         
        }
      });

      rankDsh = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessShRank'] 
        <= b['dToughnessShRank']) {
          return -1;
        } else if (a['dToughnessShRank']
        >= b['dToughnessShRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankDsh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankDsh[index].team === team.id) { 
            team.dsh = index + 1;
          }         
        }
      });

      rankOsh = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessShRank'] 
        <= b['oToughnessShRank']) {
          return -1;
        } else if (a['oToughnessShRank']
        >= b['oToughnessShRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankOsh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankOsh[index].team === team.id) { 
            team.osh = index + 1;
          }         
        }
      });

        schedules.forEach((item, index) => {
          for (let team of this.nflTeams) {
            if (schedules[index].team === team.id) { 
              team.dToughnessRank = schedules[index].dToughnessRank;
              team.oToughnessRank = schedules[index].oToughnessRank;
              team.scheduleTicker = schedules[index].scheduleTicker;
              team.dToughnessFhRank = schedules[index].dToughnessFhRank;
              team.oToughnessFhRank = schedules[index].oToughnessFhRank;
              team.dToughnessShRank = schedules[index].dToughnessShRank;
              team.oToughnessShRank = schedules[index].oToughnessShRank;
              team.weekOpponent = schedules[index].weekOpponent;
            }
          }
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
            }
            if (repImg[data.player.id] != null) {
              data.player.officialImageSrc = repImg[data.player.id] ? repImg[data.player.id].new : data.player.officialImageSrc;
            }
            
            if (data.player.officialImageSrc == null) {
              data.player.officialImageSrc = nflplayerImages[data.player.id] != null ? nflplayerImages[data.player.id].image : null;
            }
          }  
        }
      }
      // if (this.nflDefenseData == null || this.week != 'all') {
        this.nflDefenseLoading = true;

        this.nflService.getAllDefense('all', '19', this.week).subscribe(res => {

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
        // this.nflService
        //   .getAllDefense('all', '20').subscribe(res => {
        //     this.newDefenseData = res['players'];
        //     for (let n of this.newDefenseData) {
        //       for (let old of this.nflDefenseData) {
        //         if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
        //           old.player['currentTeam'].id = n['teamAsOfDate'].id;
        //           old.team.id = n['teamAsOfDate'].id;
        //         }
        //       }
        //     }
        //     teamInfo(this.nflDefenseData, this.nflTeams, 'd');
        //     this.nflDefenseLoading = false;
        // });
        teamInfo(this.nflDefenseData, this.nflTeams, 'd', this.week);
        this.nflDefenseLoading = false;
      });
      
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
                        this.skaterFp(info);
                        
                      }

                      if (s === 'nhl' && this.nhlGoalies) {
                        info.stats.goaltending.saves = data['1'];
                        info.stats.goaltending.wins = data['2'];
                        info.stats.goaltending.shutouts = data['3'];
                        info.stats.goaltending.losses = data['4'];               
                        info.stats.goaltending.overtimeWins = data['5'];
                        info.stats.goaltending.overtimeLosses = data['6'];
                        info.stats.gamesPlayed = data['7'];
                             
                        this.goalieFp(info);
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
                  
              this.mlbPitchingLoading = false;
            }

            if (s === 'mlb' && this.mlbHittingSection) {
              this.crunched = this.mlbHittingData.filter(player => player.player.span === this.timeSpan && player.stats.batting.plateAppearances > 0);
              this.mlbHittingData = this.crunched;
                  
              this.mlbHittingLoading = false;
            }

            if (s === 'nhl' && this.nhlGoalies) {
              this.crunched = this.nhlGoaltenders.filter(player => player.player.span === this.timeSpan);
              this.nhlGoaltenders = this.crunched;
                  
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

               

                for (let info of this.nflQBData) {
                  for (let data of this.reduced) {
                    //info.player.span = false;
                    if (info.player.id === data.id) { 
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
                       
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan;
                    }
                  }
                }

                for (let info of this.nflRushData) {
                  for (let data of this.reduced) {
                    //info.player.span = false;
                    if (info.player.id === data.id) { 
                        info.stats.passing.passYards = data['1'];
                        info.stats.passing.passTD = data['2'];
                        info.stats.rushing.rushYards = data['3'];
                        info.stats.receiving.receptions = data['4'];               
                        info.stats.receiving.recTD = data['5'];
                        info.stats.rushing.rushTD = data['6'];
                        info.stats.rushing.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                        info.stats.receiving.recYards = data['8'];
                        
                        info.stats.rushing.touchRunPct = Math.floor(data['12'] / data['16'] * 100);
                        // if (info.stats.rushing.touchRunPct > 100) {
                        //   console.log(info, 'player', data['12'], 'player rush attemps', data['16'], 'team rush att', data['17'], 'opponent');
                        // }
                        info.stats.receiving.touchCatchPct = Math.floor(data['13'] / data['15'] * 100);
                        info.spanOpponents = data['17'];
                       
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan;
                    }
                  }
                }

                for (let info of this.nflRecData) {
                  for (let data of this.reduced) {
                    //info.player.span = false;
                    if (info.player.id === data.id) { 
                        info.stats.passing.passYards = data['1'];
                        info.stats.passing.passTD = data['2'];
                        info.stats.rushing.rushYards = data['3'];
                        info.stats.receiving.receptions = data['4'];               
                        info.stats.receiving.recTD = data['5'];
                        info.stats.rushing.rushTD = data['6'];
                        info.stats.receiving.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                        info.stats.receiving.recYards = data['8'];

                        info.stats.rushing.touchRunPct = Math.floor(data['12'] / data['16'] * 100);
                        info.stats.receiving.touchCatchPct = Math.floor(data['13'] / data['15'] * 100);
                        info.spanOpponents = data['17'];
                       
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan;
                    }
                  }
                }

                for (let info of this.nflTEData) {
                  for (let data of this.reduced) {
                    //info.player.span = false;
                    if (info.player.id === data.id) { 
                        info.stats.passing.passYards = data['1'];
                        info.stats.passing.passTD = data['2'];
                        info.stats.rushing.rushYards = data['3'];
                        info.stats.receiving.receptions = data['4'];               
                        info.stats.receiving.recTD = data['5'];
                        info.stats.rushing.rushTD = data['6'];
                        info.stats.receiving.ydsPerGame = Math.floor((data['1'] + data['3'] + data['8']) / data['7']);
                        info.stats.receiving.recYards = data['8'];

                        info.stats.rushing.touchRunPct = Math.floor(data['12'] / data['16'] * 100);
                        info.stats.receiving.touchCatchPct = Math.floor(data['13'] / data['15'] * 100);
                        info.spanOpponents = data['17'];
                       
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan;
                    }
                  }
                }

                for (let info of this.nflKickerData) {
                  for (let data of this.reduced) {
                    //info.player.span = false;
                    if (info.player.id === data.id) { 
                        info.stats.fieldGoals.fgMade = data['9'];
                        info.stats.fieldGoals.longFgMade = data['10'];
                        info.spanOpponents = data['17'];
                        //TODO: Get toughness rank per 3 week span
                        info.player.span = this.timeSpan;
                    }
                  }
                }

              }
            });

              this.crunchedQB = this.nflQBData.filter(player => player.player.span === this.timeSpan);
              this.nflQBData = this.crunchedQB;
               
              this.crunchedRB = this.nflRushData.filter(player => player.player.span === this.timeSpan);
              this.nflRushData = this.crunchedRB;
               
              this.crunchedWR = this.nflRecData.filter(player => player.player.span === this.timeSpan);
              this.nflRecData = this.crunchedWR;
              
              this.crunchedTE = this.nflTEData.filter(player => player.player.span === this.timeSpan);
              this.nflTEData = this.crunchedTE;
              
              this.crunchedKicker = this.nflKickerData.filter(player => player.player.span === this.timeSpan);
              this.nflKickerData = this.crunchedKicker;
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

