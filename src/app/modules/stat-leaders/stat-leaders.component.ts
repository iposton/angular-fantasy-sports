import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NBADataService, NHLDataService, UtilService, GoogleAnalyticsService } from '../../services/index';
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
  public nhlData: Array <any>;
  public loading: boolean = true;
  public nhlloading: boolean = true;
  public noGamesMsg: string = '';
  public errMessage: string = '';
  public tsDate: any;
  public nbaTeams: any;
  public nhlTeams: any;
  public mobile: boolean = false;
  public stats: any = '1';
  public twitter: boolean = false;
  public selected: any;
  public playerImages: any;
  public tomorrowDate: any;
  public mlbSection: boolean = false;
  public nbaSection: boolean = true;
  public nhlSection: boolean = false;
  public weekResults: boolean = false;
  public page: number = 19;
  public amount: number = -1;
  public getAll: boolean = true;
  
  constructor(private dataService: NBADataService,
              private nhlService: NHLDataService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private util: UtilService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public gaService: GoogleAnalyticsService) {
    //this.allSentData = this.dataService.getSentStats();
    //this.players = this.allSentData[0];
    //this.myData = this.allSentData[1];
    //this.dailySchedule = this.allSentData[2];
    this.stats = '1';
    this.nbaTeams = this.util.getNBATeams();
    this.nhlTeams = this.util.getNHLTeams();
    this.playerImages = this.util.getNBAImages();
    
    let thisDate = new Date();
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
  }

  public getByDate(event) {
    this.loading = true;
    this.getAll = event;
    this.myData = [];
    this.nhlData = [];
    this.loadData();
  }

  loadData() {

    this.dataService
      .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));

        this.dataService
          .sendHeaderOptions(headers);
        this.nhlService
          .sendHeaderOptions(headers);

        this.sortData();
        this.sortNHL();
      });

  }

  public sortNHL() {
    this.nhlService
       .getAllStats().subscribe(res => {

        console.log(res, 'nhl player info');
        this.nhlloading = false;
        const nhlTeamsArray = Object.values(this.nhlTeams);

        this.nhlData = res['playerStatsTotals'].filter(
          player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5);

          for (let team of nhlTeamsArray) {
            for (let data of this.nhlData) { 
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

    })
  }

  public async sortData() {
      this.dataService
       .getAllStats(this.getAll).subscribe(res => {

          console.log(res, 'player info');
          this.loading = false;
          const nbaTeamsArray = Object.values(this.nbaTeams);

          this.myData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5 && player.stats.offense.pts > 200);

          for (let team of nbaTeamsArray) {
            for (let data of this.myData) { 
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


  public open(event, data, type) {
    this.gaService.eventEmitter("nba player info "+(data.playerObj ? data.playerObj.player.lastName : data.player.lastName), "nbatwitter", "tweet", "click", 10);
    data.area = type;
    this.selected = data;
    console.log(data, 'ok you clicked on player img...');
    // this.dialog.open(NBATodayDialog, {
    //   data: data,
    //   width: '600px',
    // });
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

}

// @Component({
//   selector: 'nba-today-dialog',
//   template: `<i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
//   <span style="color:#00aced;">Twitter Updates!</span> 
//   <mat-dialog-content>
//   <span style="font-size: 26px; font-weight: light; color: #555; text-align: center;">{{ noPosts }}</span>
//   <ul *ngFor="let item of tweetsData" style="font-size:14px">
//     <li>{{item.text}} <span style="color:#6740B4; font-weight: bold;">{{item.created_at | date:'fullDate'}}</span></li>
// </ul>
// </mat-dialog-content>`,
// })

// export class NBATodayDialog implements OnInit {
//   noPosts: any;
//   tweetsData: any;
//   constructor(public dialogRef: MatDialogRef < NBATodayDialog > , @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

//   }

//   loadStuff() {
//     let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');

//     this.http.post('/authorize', {headers}).subscribe((res) => {
//       this.searchCall();
//     })


//   }

//   searchCall() {
//     console.log(this.data, 'data passed in');

//     let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');
//     //let searchterm = 'query=#startingGoalies #nhl ' + this.data.player.FirstName + ' ' + this.data.player.LastName;
//     let searchterm = null;
//     if (this.data.area === 'top') {
//       searchterm = 'query=' + this.data.playerObj.player.lastName + ' ' + teams[this.data.playerObj.player['currentTeam'].abbreviation].twitter;
//     } else {
//       searchterm = 'query=' + this.data.player.lastName + ' ' + teams[this.data.player['currentTeam'].abbreviation].twitter;
//     }


//     this.http.post('/search', searchterm, {headers}).subscribe((res) => {
//        console.log(res['data'].statuses, 'twitter stuff');
//       this.tweetsData = res['data'].statuses;
//       if (this.tweetsData.length === 0) {
//         this.noPosts = "No Tweets.";
//       }
//     });
//   }

//   ngOnInit() {
//     this.loadStuff();
//   }
// }

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
