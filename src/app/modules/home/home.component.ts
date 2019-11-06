import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { 
  NBADataService,
  DataService,
  NHLDataService,
  NFLDataService } from '../../services/index';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK
let today = null;
let tomorrow = null;
let yesterday = null;
let teamRef = [];
let headers = null;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public starters: Array <any>;
  public score: Array <any>;
  public mlbSchedule: Array <any>;
  public mlbTeamRef: Array <any>;
  public nbaSchedule: Array <any>;
  public nbaTeamRef: Array <any>;
  public nflSchedule: Array <any>;
  public nflTeamRef: Array <any>;
  public nhlSchedule: Array <any>;
  public nhlTeamRef: Array <any>;
  public sentData: Array <any>;
  public defineToken: string = '';
  public statData: Array <any> = [];
  public playerInfo: Array <any>;

  mlbGameDate: string = '';
  noMlbGamesToday: boolean;
  mlbGamesToday: boolean;
  noMlbGamesMsg: any;
  mlbLoading: boolean = true;

  nhlGameDate: string = '';
  noNhlGamesToday: boolean;
  nhlGamesToday: boolean;
  noNhlGamesMsg: any;
  nhlLoading: boolean = true;

  nbaGameDate: string = '';
  noNbaGamesToday: boolean;
  nbaGamesToday: boolean;
  noNbaGamesMsg: any;
  nbaLoading: boolean = true;

  nflGameDate: string = '';
  noNflGamesToday: boolean;
  nflGamesToday: boolean;
  noNflGamesMsg: any;
  nflLoading: boolean = true;

  public showLink: boolean = false;

  tweetDay: any;
  apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2019-2020-regular";

  constructor(private http: HttpClient,
     public snackBar: MatSnackBar, 
     public router: Router,
     public dataService: DataService,
     public nhlDataService: NHLDataService,
     public nbaDataService: NBADataService,
     public nflDataService: NFLDataService) {
     //this.loading = false;
     //this.getJSON();
    // this.sentYesterdayData = this.yesterdayService.getSentStats();

  }

  // public getJSON() {
  //   this.http.get("./assets/twitter.json")
     
  //     .subscribe(res => {
  //       console.log(res['twitterHandles']["0"], 'twitter handles');
  //       this.twitterHandles = res['twitterHandles']["0"];
  //     })

  // }

loadData() {

     this.dataService
       .getEnv().subscribe(res => {
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(res + ":" + 'MYSPORTSFEEDS'));
        
        this.dataService
          .sendHeaderOptions(headers);
        this.nbaDataService
          .sendHeaderOptions(headers);
        this.nflDataService
          .sendHeaderOptions(headers);
        this.nhlDataService
          .sendHeaderOptions(headers);

        this.dataService
          .getDailySchedule().subscribe(res => {
            console.log(res, "schedule...");
            if (res['games'].length === 0) {
              this.mlbLoading = false;
              this.noMlbGamesToday = true;
              this.noMlbGamesMsg = "No Games Scheduled"
              console.log('There are no MLB games being played today.');
            } else {
              this.mlbLoading = false;
              this.mlbGamesToday = true;
              this.mlbSchedule = res['games'];
              this.mlbTeamRef = res['references'].teamReferences;
              this.mlbGameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime; //res['dailygameschedule'].gameentry[0].date;
              let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.mlbGameDate, 'EEEE');
            }
        });

        this.nbaDataService
          .getSchedule().subscribe(res => {
            console.log(res, "schedule...");
            if (res['games'].length === 0) {
              this.nbaLoading = false;
              this.noNbaGamesToday = true;
              this.noNbaGamesMsg = "No Games Scheduled Yesterday :("
              console.log('There are no MLB games being played today.');
            } else {
              this.nbaLoading = false;
              this.nbaGamesToday = true;
              this.nbaSchedule = res['games'];
              teamRef = res['references'].teamReferences;
              this.nbaGameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime; //res['dailygameschedule'].gameentry[0].date;
              let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.nbaGameDate, 'EEEE');
            }
        });

        this.nhlDataService
          .getDailySchedule().subscribe(res => {
            console.log(res, "schedule...");
            if (res['games'].length === 0) {
              this.nhlLoading = false;
              this.noNhlGamesToday = true;
              this.noNhlGamesMsg = "No Games Scheduled Yesterday :("
              console.log('There are no MLB games being played today.');
            } else {
              this.nhlLoading = false;
              this.nhlGamesToday = true;
              this.nhlSchedule = res['games'];
              teamRef = res['references'].teamReferences;
              this.nhlGameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime; //res['dailygameschedule'].gameentry[0].date;
              let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.nhlGameDate, 'EEEE');
            }
        });

        this.nflDataService
          .getSchedule(10).subscribe(res => {
            console.log(res, "schedule...");
            if (res['games'].length === 0) {
              this.nflLoading = false;
              this.noNflGamesToday = true;
              this.noNflGamesMsg = "No Games Scheduled Yesterday :("
              console.log('There are no MLB games being played today.');
            } else {
              this.nflLoading = false;
              this.nflGamesToday = true;
              this.nflSchedule = res['games'];
              teamRef = res['references'].teamReferences;
              this.nflGameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime; //res['dailygameschedule'].gameentry[0].date;
              let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.nflGameDate, 'EEEE');
            }
        });
      })
}

  ngOnInit() {
    if (this.sentData === undefined) {
      this.loadData();

    } else {
     
        // this.loading = false;
        // this.showDataYesterday = this.sentYesterdayData;
        // this.gameDate = this.showDataYesterday["0"].team.today;
      
    }
  }

  public isVisibleOnDesktop() {
    // console.log('width over 600px');
  }


  // openSnackBar() {
  //   this.snackBar.openFromComponent(InfoYesterday, {
  //     // duration: 500,
  //   });
  // }

}

// @Component({
//   selector: 'info-yesterday',
//   template: `<i (click)="close()" class="material-icons close">close</i><br />
// <span style="color: #e74c3c;">back</span><span style="color: #ccc;"> to back</span><span> = The first game of a back to back scheduled game.</span><br />
// <span style="color: #ccc;">back to </span><span style="color: #e74c3c;">back</span><span> = The second game of a back to back scheduled game.</span>`,
//   styles: [`.close { float:right; cursor:pointer; font-size: 20px;}`]
// })

// export class InfoYesterday {
//   constructor(public snackBar: MatSnackBar) {}
//   close() {
//     this.snackBar.dismiss();
//   }
// }
