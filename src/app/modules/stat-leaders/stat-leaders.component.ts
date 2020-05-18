import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NBADataService, 
  NHLDataService, 
  DataService,
  UtilService, 
  GoogleAnalyticsService,
  NFLDataService } from '../../services/index';
import { DatePipe, PercentPipe, DecimalPipe } from '@angular/common';
import { interval, forkJoin } from 'rxjs';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
  
  constructor(private nbaService: NBADataService,
              private nhlService: NHLDataService,
              private mlbService: DataService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private util: UtilService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
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

  public authorize(player, type) {
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('/authorize', {headers}).subscribe((res) => {
      this.openModal(player, headers, type);
    });
  }

  public openModal(player, headers, type) {
    this.type = type;
    this.isOpen = true;
    this.submitting = true;
    this.selectedPlayer = null;
    this.noPosts = '';
    this.selectedPlayer = player;
    console.log(player, 'data passed in');
    //this.gaService.eventEmitter("nba player info "+(data.playerObj ? data.playerObj.player.lastName : data.player.lastName), "nbatwitter", "tweet", "click", 10);

    //let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');
    //let searchterm = 'query=#startingGoalies #nhl ' + player.player.FirstName + ' ' + player.player.LastName;
    let twitter = null;
    twitter = type === 'nba' ? this.nbaTeams[player.player['currentTeam'].abbreviation].twitter : type === 'nhl' ? this.nhlTeams[player.player['currentTeam'].abbreviation].twitter : player.team.twitter;
    let searchterm = null;
    searchterm = 'query=' + player.player.lastName + ' ' + twitter;
    console.log(searchterm, 'search term');
    this.http.post('/search', searchterm, {headers}).subscribe((res) => {
      console.log(res['data'].statuses, 'twitter stuff');
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
          console.log(res, 'nhl goalies player info');
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

        console.log(res, 'nhl skaters player info');
        const nhlTeamsArray = Object.values(this.nhlTeams);

        this.nhlSkaters = 
res['playerStatsTotals'].filter(
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
          console.log(res, 'player info');
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
  
          // for (let team of this.teamStats) {
          //   for (let data of this.myData) { 
          //      if (data.team.opponentId != null && 
          //        data.team.id === team.team.id) {
          //        data.win = team.stats.standings.wins;
          //        data.loss = team.stats.standings.losses;
          //      } else if (data.player.lineupTeam === team.team.abbreviation) { 
          //        data.win = team.stats.standings.wins;
          //        data.loss = team.stats.standings.losses;
          //      }
          //    }  
          // }
       
         
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

  openSnackBar() {
    // this.snackBar.openFromComponent(NBAInfo, {
    //   // duration: 500,
    // });
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
    this.nhlGoalies = false;
    this.nflSection = false;
    this.nflDefenseSection = false;

    if (this.mlbPitchingData == null) {

    this.mlbPitchingLoading = true;
    this.mlbHittingLoading = true;

    this.mlbService
       .getAllStats().subscribe(res => {

          console.log(res, 'MLB player info');
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

         console.log(res, 'player info');
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
    this.nflSection = true;

    if (this.mlbPitchingData == null) {

    this.nflOffenseLoading = true;
    this.nflDefenseLoading = true;

    this.nflService
       .getAllOffense().subscribe(res => {

          console.log(res, 'NFL of player info');
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

         console.log(res, 'nfl def player info');
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
  }

}


// @Component({
//   selector: 'nba-info',
//   template: `<i (click)="close()" class="material-icons close">close</i><br />
//   <span style="color: orange;"><i class="material-icons md-18" style="background: #fff; border-radius: 50%;">check_circle</i></span> = Expected Starter <br />
//   <span style="color: #2ecc71;"><i class="material-icons md-18" style="background: #fff; border-radius: 50%;">check_circle</i></span> = Confirmed Starter <br />
// <span>Click on player image for twitter updates!</span> <br />
// <span>Click on player stats for MORE stats!</span>`,
//   styles: [`.close { float:right; cursor:pointer; font-size: 20px; } .green-dot { height: 10px; width: 10px; background:#2ecc71; border-radius: 50%; display: inline-block; }`]
// })

// export class NBAInfo {
//   constructor(public snackBar: MatSnackBar) {}
//   close() {
//     this.snackBar.dismiss();
//   }
// }
