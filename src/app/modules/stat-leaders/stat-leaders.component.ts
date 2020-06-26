import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NBADataService, 
  NHLDataService, 
  DataService,
  UtilService, 
  GoogleAnalyticsService,
  NFLDataService } from '../../services/index';
import { DomSanitizer } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';

let headers = null;
let today = new Date();

@Component({
  selector: 'app-stat-leaders',
  templateUrl: './stat-leaders.component.html',
  styleUrls: ['./stat-leaders.component.scss']
})
export class StatLeadersComponent implements OnInit {

  public teamRef: Array <any>;
  public allSentData: Array <any>;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nba/2019-2020-regular";
  public myData: Array <any>;
  public mlbPitchingData: Array <any>;
  public mlbHittingData: Array <any>;
  public nflOffenseData: Array <any>;
  public nflQBData: Array <any>;
  public nflRushData: Array <any>;
  public nflRecData: Array <any>;
  public nflDefenseData: Array <any>;
  public nhlSkaters: Array <any>;
  public nhlGoaltenders: Array <any>;
  public loading: boolean = true;
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
  public tomorrowDate: any;
  public mlbSection: boolean = false;
  public mlbHittingSection: boolean = false;
  public nbaSection: boolean = true;
  public nhlSection: boolean = false;
  public nflSection: boolean = false;
  public nflDefenseSection: boolean = false;
  public nflTeamLoading: boolean = true;
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
  
  constructor(private nbaService: NBADataService,
              private nhlService: NHLDataService,
              private mlbService: DataService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private util: UtilService,
              public gaService: GoogleAnalyticsService,
              public nflService: NFLDataService) {
    //this.allSentData = this.nbaService.getSentStats();
    //this.players = this.allSentData[0];
    //this.myData = this.allSentData[1];
    //this.dailySchedule = this.allSentData[2];
    this.stats = '1';
    this.nbaTeams = this.util.getNBATeams();
    this.nhlTeams = this.util.getNHLTeams();
    this.mlbTeams = this.util.getMLBTeams();
    this.nflTeams = this.util.getNFLTeams();
    this.playerImages = this.util.getNBAImages();
    
    let thisDate = new Date();
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
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

  public getByDate(event) {
    this.loading = true;
    this.getAll = event;
    this.myData = [];
    this.nhlSkaters = [];
    this.nhlGoaltenders = [];
    this.loadData();
  }

  loadData() {

    this.nbaService
      .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));
        let nflRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular";
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

    if (this.nhlGoaltenders == null) {
      this.nhlGoalieloading = true;
      this.nhlSkaterloading = true;
  
  
      this.nhlService
         .getAllStats('goalies').subscribe(res => {
          const nhlTeamsArray = Object.values(this.nhlTeams);
          this.nhlGoaltenders = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5);
  
            for (let team of nhlTeamsArray) {
              for (let data of this.nhlGoaltenders) { 
                if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                  data.team.logo = team['officialLogoImageSrc'];
                  data.team.city = team['city'];
                  data.team.name = team['name'];
                }
  
                if (data.player.officialImageSrc == null) {
                  data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
                }
                
              }  
            }
            this.nhlGoalieloading = false;
      })
    
    

    this.nhlService
       .getAllStats('skaters').subscribe(res => {
        const nhlTeamsArray = Object.values(this.nhlTeams);

        this.nhlSkaters = res['playerStatsTotals'].filter(
          player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5);

          for (let team of nhlTeamsArray) {
            for (let data of this.nhlSkaters) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
              }

              if (data.player.officialImageSrc == null) {
                data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
              }
              
            }  
          }

       this.nhlSkaterloading = false;
    })

  }
  }

  public async sortNBA() {
      this.nbaService
       .getAllStats(this.getAll).subscribe(res => {
          const nbaTeamsArray = Object.values(this.nbaTeams);

          this.myData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5 && player.stats.offense.pts > 200);

          for (let team of nbaTeamsArray) {
            for (let data of this.myData) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                this.loading = false;
              }

              if (data.player.officialImageSrc == null) {
                data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
              }
              
            }  
          }
      }) 
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

  public loadMLB() {
    //this.loading = true;
    this.nbaSection = false; 
    this.nhlSection = false; 
    this.mlbSection = true;
    this.mlbHittingSection = false; 
    this.nhlGoalies = false;
    this.nflSection = false;
    this.nflDefenseSection = false;

    if (this.mlbPitchingData == null) {

    this.mlbPitchingLoading = true;
    this.mlbHittingLoading = true;

    this.mlbService
       .getAllStats().subscribe(res => {
          //this.loading = false;
          //const mlbTeamsArray = Object.values(this.nbaTeams);

          this.mlbPitchingData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 30 && player.stats.pitching.pitcherStrikeouts > 25);

          for (let team of this.mlbTeams) {
            for (let data of this.mlbPitchingData) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                data.team.twitter = team['socialMediaAccounts'][0].value;
                //this.loading = false;
                
              }

              // if (data.player.officialImageSrc == null) {
              //   data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
              // }
              
            }  
          }
          this.mlbPitchingLoading = false;
      })

      this.mlbService
        .getAllHitters().subscribe(res => {
         //this.loading = false;
         //const mlbTeamsArray = Object.values(this.nbaTeams);

         this.mlbHittingData = res['playerStatsTotals'].filter(
           player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 30 && player.stats.batting.atBats > 80);

         for (let team of this.mlbTeams) {
           for (let data of this.mlbHittingData) { 
             if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
               data.team.logo = team['officialLogoImageSrc'];
               data.team.city = team['city'];
               data.team.name = team['name'];
               data.team.twitter = team['socialMediaAccounts'][0].value;
              // this.loading = false;
             }

             // if (data.player.officialImageSrc == null) {
             //   data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
             // }
             
           }  
         }
         this.mlbHittingLoading = false;
     })
    }
  }

  public loadNFL() {
    //this.loading = true;
    this.nbaSection = false; 
    this.nhlSection = false; 
    this.mlbSection = false; 
    this.nhlGoalies = false;
    this.mlbHittingSection = false;
    this.nflSection = true;

    if (this.nflQBData == null) {

    this.nflOffenseLoading = true;
    this.nflDefenseLoading = true;

    this.nflService
       .getAllOffense().subscribe(res => {
          //this.loading = false;
          //const mlbTeamsArray = Object.values(this.nbaTeams);

          this.nflQBData = res['playerStatsTotals'].filter(
            player => player.stats != null && player.stats.gamesPlayed > 6 && player.player.primaryPosition === 'QB');

          this.nflRushData = res['playerStatsTotals'].filter(
              player => player.stats != null && player.stats.gamesPlayed > 6 && (player.player.primaryPosition === 'QB' || player.player.primaryPosition === 'RB'));

          this.nflRecData = res['playerStatsTotals'].filter(
                player => player.stats != null && player.stats.gamesPlayed > 6 && (player.player.primaryPosition === 'WR' || player.player.primaryPosition === 'TE' || player.player.primaryPosition === 'RB'));

          for (let team of this.nflTeams) {
            for (let data of res['playerStatsTotals']) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                data.team.twitter = team['socialMediaAccounts'][0].value;
                //this.loading = false;
                
              }

              // if (data.player.officialImageSrc == null) {
              //   data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
              // }
              
            }  
          }
          this.nflOffenseLoading = false;
      })

      this.nflService
        .getAllDefense().subscribe(res => {
         //this.loading = false;
         //const mlbTeamsArray = Object.values(this.nbaTeams);

         this.nflDefenseData = res['playerStatsTotals'].filter(
           player => player.stats != null && player.stats.gamesPlayed > 6);

         for (let team of this.nflTeams) {
           for (let data of res['playerStatsTotals']) { 
             if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
               data.team.logo = team['officialLogoImageSrc'];
               data.team.city = team['city'];
               data.team.name = team['name'];
               data.team.twitter = team['socialMediaAccounts'][0].value;
              // this.loading = false;
             }

             // if (data.player.officialImageSrc == null) {
             //   data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
             // }
             
           }  
         }
         this.nflDefenseLoading = false;
     })
    }

    this.nflService
      .getTeamStats('').subscribe(res => {
        this.nflTeamStats = res['teamStatsTotals'];
        this.nflTeamLoading = false;
    })

  }

}

