import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { 
  NBADataService,
  DataService,
  NHLDataService,
  NFLDataService,
  UtilService,
  NbaUtilService } from '../../services/index';
import * as CryptoJS from 'crypto-js';

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK
let today = null;
let tomorrow = null;
let yesterday = null;
let teamRef = [];
let headers = null;
let thisDate = new Date();
let utcDate = new Date(thisDate.toUTCString());
utcDate.setHours(utcDate.getHours() - 8);
let myDate = new Date(utcDate);
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");

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
  public mobile: boolean = false;
  public mlbTeams: any;
  public nflTeams: any;
  public nbaTeams: any;

  public mlbGameDate: string = '';
  public noMlbGamesToday: boolean;
  public mlbGamesToday: boolean;
  public noMlbGamesMsg: any;
  public mlbLoading: boolean = false;

  public nhlGameDate: string = '';
  public noNhlGamesToday: boolean;
  public nhlGamesToday: boolean;
  public noNhlGamesMsg: any;
  public nhlLoading: boolean = false;

  public nbaGameDate: string = '';
  public noNbaGamesToday: boolean;
  public nbaGamesToday: boolean;
  public noNbaGamesMsg: any;
  public nbaLoading: boolean = false;

  public nflGameDate: string = '';
  public noNflGamesToday: boolean;
  public nflGamesToday: boolean;
  public noNflGamesMsg: any;
  public nflLoading: boolean = false;

  public showLink: boolean = false;
  public liveGames: boolean = false;
  public nbaSched: boolean = true;
  public nhlSched: boolean = false;
  public nflSched: boolean = false;
  public mlbSched: boolean = false;
  public selectedWeek: any;
  public tomorrowDate: any;
  public testBrowser: boolean;
  public nhlSelectedDate: any;
  public nbaSelectedDate: any;

  tweetDay: any;
  apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2020-regular";

  constructor(private http: HttpClient,
     public router: Router,
     public dataService: DataService,
     public nhlDataService: NHLDataService,
     public nbaDataService: NBADataService,
     public nflDataService: NFLDataService,
     public util: UtilService,
     public nbaUtil: NbaUtilService,
     private meta: Meta,
     @Inject(PLATFORM_ID) platformId: string) {
      this.meta.addTag({ name: 'twitter:card', content: 'summary_large_image' });
      this.meta.addTag({ name: 'twitter:site', content: '@FanSpRes' });
      this.meta.addTag({ name: 'twitter:title', content: 'NHL and NBA Stats & Starters' });
      this.meta.addTag({ name: 'twitter:description', content: 'NHL Starting Golaies and NBA Starting 5' });
      this.meta.addTag({ name: 'twitter:image', content: 'https://fantasy-sports-resources.com/assets/fsr.png' });
     //this.loading = false;
     //this.getJSON();
    // this.sentYesterdayData = this.yesterdayService.getSentStats();
    this.mlbTeams = this.util.getMLBTeams();
    this.nflTeams = this.util.getNFLTeams();
    this.nbaTeams = this.nbaUtil.getNBATeams();
    this.nbaDataService.selectedDate(dailyDate);
    this.nhlDataService.selectedDate(dailyDate);
    this.selectedWeek = '1';
    let weekTimes = this.util.getWeekTimes();
    let thisDate = new Date();
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));

    for (let week of weekTimes) {
      let date = new Date();
      if (date > new Date(week.dateBeg) && date < new Date(week.dateEnd)) {
        this.selectedWeek = week.week; 
      }
      
    } 
    let date = new Date();
    this.nhlSelectedDate = new Date();
    this.nbaSelectedDate = new Date();
    if (date > new Date('Tue Dec 31 2019 00:00:00 GMT-0700 (Pacific Daylight Time)')) {
      this.apiRoot = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-playoff"; //2019-2020-regular";
    }

    this.testBrowser = isPlatformBrowser(platformId);

  }

  public getByDate(event) {
    if (this.nbaSched) {
      this.nbaLoading = true;
      this.nbaDataService.selectedDate(event);
      this.nbaSelectedDate = event.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      this.loadNBA();
    }

    if (this.nhlSched) {
      this.nhlLoading = true;
      this.nhlDataService.selectedDate(event);
      this.nhlSelectedDate = event.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      this.loadNHL();
    }

    if (this.mlbSched) {
      this.mlbLoading = true;
      this.dataService.selectedDate(event);
      this.loadMLB();
    }
    
  }

  public onChange(week) {
    this.nflLoading = true;
    this.selectedWeek = week;
    this.loadNFL();
  }

public compareDate (start) {
  if (new Date(start) < this.tomorrowDate) {
    return true;
  } else {
    return false;
  }
}

loadData() {

  this.nbaDataService
       .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));
        
        this.dataService
          .sendHeaderOptions(headers);
        this.nbaDataService
          .sendHeaderOptions(headers);
        this.nflDataService
          .sendHeaderOptions(headers, this.selectedWeek, this.apiRoot);
        this.nhlDataService
          .sendHeaderOptions(headers);

        this.loadNBA();

        
      })
}

public loadNFL() {
  this.nflLoading = true;
  this.nflDataService
      .getSchedule(this.selectedWeek).subscribe(res => {
        if (res['games'].length === 0) {
          this.nflLoading = false;
          this.noNflGamesToday = true;
          this.noNflGamesMsg = "No Games Scheduled"
          console.log('There are no NFL games being played today.');
        } else {
          this.nflLoading = false;
          this.nflGamesToday = true;
          this.nflSchedule = res['games'];
          this.nflTeamRef = this.nflTeams;
          this.noNflGamesMsg = '';
          this.nflGameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime;
          if (this.nflTeamRef != null)
            this.getTeamInfo(this.nflSchedule, this.nflTeamRef);
        }
    });
}

public loadMLB() {
  this.mlbLoading = true;
  this.dataService
    .getDailySchedule().subscribe(res => {
      if (res['games'].length === 0) {
        this.mlbLoading = false;
        this.noMlbGamesToday = true;
        this.noMlbGamesMsg = "No Games Scheduled";
        console.log('There are no MLB games being played today.');
      } else {
        // this.noMlbGamesToday = true;
        // this.noMlbGamesMsg = "No Games Scheduled";
        this.mlbLoading = false;
        this.mlbGamesToday = true;
        this.mlbSchedule = res['games'];
        this.noMlbGamesMsg = '';
        this.mlbTeamRef = this.mlbTeams;  //res['references'].teamReferences ? res['references'].teamReferences : null;
        this.mlbGameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime;
        if (this.mlbTeamRef != null)
          this.getTeamInfo(this.mlbSchedule, this.mlbTeamRef);
      }
  });
}

public loadNHL() {
  this.nhlLoading = true;
  this.nhlDataService
  .getDailySchedule().subscribe(res => {
    if (res['games'].length === 0) {
      this.nhlLoading = false;
      this.noNhlGamesToday = true;
      this.noNhlGamesMsg = "No Games Scheduled"
      console.log('There are no NHL games being played today.');
    } else {
      this.nhlLoading = false;
      this.nhlGamesToday = true;
      // this.nhlSchedule = res['games'];
      this.noNhlGamesMsg = '';
      this.nhlTeamRef = res['references'].teamReferences ? res['references'].teamReferences : null;
      this.nhlGameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime;
      if (this.nhlTeamRef != null) {
        this.nhlSchedule = res['games'].filter(item => new Date(item['schedule'].startTime) < this.util.tomorrow(this.nhlSelectedDate));
        this.getTeamInfo(this.nhlSchedule, this.nhlTeamRef);
      }
        
    }
   });
}

public loadNBA() {
  this.nbaLoading = true;
  this.nbaDataService
    .getSchedule().subscribe(res => {
    
    if (res['games'].length === 0) {
      this.nbaLoading = false;
      this.noNbaGamesToday = true;
      this.noNbaGamesMsg = "No Games Scheduled";
      console.log('There are no NBA games being played today.');
    } else {
      this.nbaLoading = false;
      this.nbaGamesToday = true;
      //this.nbaSchedule = res['games'];
      this.noNbaGamesMsg = '';
      this.nbaTeamRef = Object.values(this.nbaTeams); //res['references'].teamReferences ? res['references'].teamReferences : null;
      this.nbaGameDate = res['games'][0].schedule.startTime && res['games'][0].schedule.scheduleStatus != 'POSTPONED' ? res['games'][0].schedule.startTime : new Date();
      if (this.nbaTeamRef != null) {
        this.nbaSchedule = res['games'].filter(item => new Date(item['schedule'].startTime) < this.util.tomorrow(this.nbaSelectedDate));
        this.getTeamInfo(this.nbaSchedule, this.nbaTeamRef);
      }
        
        //console.log(this.nbaSchedule, 'nba sched')
    }
  }, (err: HttpErrorResponse) => {
    this.nbaLoading = false;
    this.noNbaGamesToday = true;
    this.noNbaGamesMsg = 'error fetching schedule';
    console.log(err, 'error getting lineup');

  });
}

public getTeamInfo(sched, teamRef) {
  for (let team of teamRef) {
    for (let data of sched) {   
        if (data.schedule.awayTeam.id === team.id) {
          data.schedule.awayTeam.color = team.teamColoursHex ? team.teamColoursHex[0] : 'black';
          data.schedule.awayTeam.accent = team.teamColoursHex ? team.teamColoursHex[1] : 'black';
          data.schedule.awayTeam.logo = team.officialLogoImageSrc;
          data.schedule.awayTeam.city = team.city;
          data.schedule.awayTeam.name = team.name;
        }
        if (data.schedule.homeTeam.id === team.id) {
            data.schedule.homeTeam.color = team.teamColoursHex ? team.teamColoursHex[0] : 'black';
            data.schedule.homeTeam.accent = team.teamColoursHex ? team.teamColoursHex[1] : 'black';
            data.schedule.homeTeam.logo = team.officialLogoImageSrc;
            data.schedule.homeTeam.city = team.city;
            data.schedule.homeTeam.name = team.name;
        }
        if (data.schedule.playedStatus === "LIVE") {
          this.liveGames = true;
          //console.log('interval set...');
        }
     }  
  }
}

  ngOnInit() {
    if (this.testBrowser) {
      //console.log(window.innerWidth, 'screen width', window, 'window');
      if (window.innerWidth < 700) { // 768px portrait
        this.mobile = true;
      }
      if (this.sentData === undefined) {
        
        console.log(this.testBrowser, 'isBrowser?');
      
        console.log('safe to set interval');
        this.loadData();   
        const MILLISECONDS_IN_TEN_MINUTES = 600000;
        interval(MILLISECONDS_IN_TEN_MINUTES)
          .subscribe(() => {
            if (this.liveGames === true) {
              console.log('games are live get updates...');
              this.loadData(); 
            } else {
              console.log('No games then no daily stats either. :(');
            }
          });
      

      } 
    }
  }

}
