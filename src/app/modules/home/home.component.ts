import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { interval } from 'rxjs';
import { Router } from '@angular/router';
import { Meta } from '@angular/platform-browser';
import { 
  NBADataService,
  DataService,
  NHLDataService,
  NFLDataService,
  UtilService,
  NbaUtilService,
  MlbUtilService,
  NflUtilService } from '../../services/index';
import * as CryptoJS from 'crypto-js';

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK

let headers = null;
let thisDate = new Date();
let utcDate = new Date(thisDate.toUTCString());
utcDate.setHours(utcDate.getHours() - 8);
let myDate = new Date(utcDate);
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
let playedStatuses = {'COMPLETED': 'COMPLETED', 'COMPLETED_PENDING_REVIEW': 'COMPLETED_PENDING_REVIEW', 'LIVE' : 'LIVE'}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  //public starters: Array <any>;
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

  public nbaGameDate: string = ''
  public noNbaGamesToday: boolean
  public nbaGamesToday: boolean
  public noNbaGamesMsg: any
  public nbaLoading: boolean = false
  public loading: boolean = false

  public nflGameDate: string = '';
  public noNflGamesToday: boolean;
  public nflGamesToday: boolean;
  public noNflGamesMsg: any;
  public nflLoading: boolean = false;

  public showLink: boolean = false;
  public liveGames: boolean = false;
  public nbaSched: boolean = false;
  public nhlSched: boolean = false;
  public nflSched: boolean = false;
  public mlbSched: boolean = false;
  public selectedWeek: any;
  public tomorrowDate: any;
  public testBrowser: boolean;
  public nhlSelectedDate: any;
  public nbaSelectedDate: any;
  public mlbSelectedDate: any;
  public nhlPlayoffDate: string;
  public isNHLPlayoffs: boolean = false;
  public nhlSeason: string;
  public nbaPlayoffDate: string;
  public isNBAPlayoffs: boolean = false;
  public nbaSeason: string;
  public mlbPlayoffDate: string;
  public isMLBPlayoffs: boolean = false;
  public mlbSeason: string;
  public nhlGames: Array <any>
  public nhlTeamRefs: Array <any>
  public nbaGames: Array <any>
  public mlbGames: Array <any>
  public nflGames: Array <any>
  public load: any

  //tweetDay: any
  //apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2020-regular";

  constructor(
     public router: Router,
     public dataService: DataService,
     public nhlDataService: NHLDataService,
     public nbaDataService: NBADataService,
     public nflDataService: NFLDataService,
     public util: UtilService,
     public nbaUtil: NbaUtilService,
     public mlbUtil: MlbUtilService,
     public nflUtil: NflUtilService,
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
    this.mlbTeams = this.mlbUtil.getMLBTeams();
    this.nflTeams = this.nflUtil.getNFLTeams();
    this.nbaTeams = this.nbaUtil.getNBATeams();
    this.nbaDataService.selectedDate(dailyDate);
    this.nhlDataService.selectedDate(dailyDate);
    this.selectedWeek = '1';
    let weekTimes = this.nflUtil.getWeekTimes();
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
    this.mlbSelectedDate = new Date();

    // if (date > new Date('Tue Dec 31 2019 00:00:00 GMT-0700 (Pacific Daylight Time)')) {
    //   this.apiRoot = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-playoff"; //2019-2020-regular";
    // }

    this.nhlPlayoffDate = 'Fri May 14 2022 00:00:00 GMT-0700 (Pacific Daylight Time)'
    this.nbaPlayoffDate = 'Mon May 17 2022 00:00:00 GMT-0700 (Pacific Daylight Time)'
    this.mlbPlayoffDate = 'Mon Oct 7 2022 00:00:00 GMT-0700 (Pacific Daylight Time)'
    this.checkPlayoffs(new Date(this.nhlSelectedDate), 'nhl')
    this.checkPlayoffs(new Date(this.nbaSelectedDate), 'nba')
    this.checkPlayoffs(new Date(this.mlbSelectedDate), 'mlb')

    this.testBrowser = isPlatformBrowser(platformId);
    this.nflSched = true
    //this.nhlSched = true
    // this.mlbSched = true
    this.load = 'loadNFL' //'loadMLB'

  }

  public checkPlayoffs(date, type) {
    if (type === 'nhl') {
      if (date > new Date(this.nhlPlayoffDate))
        this.isNHLPlayoffs = true;
      else
        this.isNHLPlayoffs = false;

      this.nhlDataService.isPlayoffs = this.isNHLPlayoffs;
      if (this.isNHLPlayoffs)
        this.nhlSeason = '2022-playoff'
    }

    if (type === 'nba') {
      if (date > new Date(this.nbaPlayoffDate))
        this.isNBAPlayoffs = true;
      else
        this.isNBAPlayoffs = false;

      this.nbaDataService.isPlayoffs = this.isNBAPlayoffs;
      if (this.isNBAPlayoffs)
        this.nbaSeason = '2022-playoff'
    }

    if (type === 'mlb') {
      if (date > new Date(this.mlbPlayoffDate))
        this.isMLBPlayoffs = true;
      else
        this.isMLBPlayoffs = false;

      this.dataService.isPlayoffs = this.isMLBPlayoffs;
      if (this.isMLBPlayoffs)
        this.mlbSeason = '2022-playoff'
    }  
  }

  public getByDate(event) {
    if (this.nbaSched) {
      this.loading = true
      this.nbaDataService.selectedDate(event)
      this.nhlDataService.selectedDate(event)
      this.nbaSelectedDate = event.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      this.checkPlayoffs(new Date(this.nbaSelectedDate), 'nba')
      this.nbaDataService.checkDay();
      this.nbaSchedule = [];
      this.load = 'loadNBA'
      this.loadData()
      //this.loadNBA();
    }

    if (this.nhlSched) {
      //this.nhlLoading = true;
      this.loading = true
      this.nhlDataService.selectedDate(event)
      this.nhlSelectedDate = event.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      this.checkPlayoffs(new Date(this.nhlSelectedDate), 'nhl')
      this.nhlDataService.checkDay();
      this.nhlSchedule = [];
      this.load = 'loadNHL'
      this.loadData()
      //this.loadNHL();
    }

    if (this.mlbSched) {
      //this.mlbLoading = true
      this.loading = true
      this.dataService.selectedDate(event)
      this.nhlDataService.selectedDate(event)
      this.mlbSelectedDate = event.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3');
      this.checkPlayoffs(new Date(this.mlbSelectedDate), 'nhl')
      this.dataService.checkDay();
      this.mlbSchedule = [];
      this.load = 'loadMLB'
      this.loadData()
      //this.loadMLB();
    }
    
  }

public onChange(week) {
  this.loading = true
  this.selectedWeek = week;
  this.load = 'loadNFL'
  this.loadData()
  //this.loadNFL();
}

public compareDate (start) {
  if (new Date(start) < this.tomorrowDate) {
    return true;
  } else {
    return false;
  }
}

loadData() {
  this.loading = true
  this.nhlDataService.serverInfo(
          'nhl', 
          '2022-2023-regular', 
          'games', 
          'dateB', 
          'dateE', 
          'player', 
          '', 
          '',
          '', 
          this.dataService.isToday,
          'games',
          '',
          this.selectedWeek).subscribe(res => {
            console.log(res, 'games')
            this.nhlGames = res['nhl'].games
            this.nhlTeamRefs = res['nhl'].references
            this.nbaGames = res['nba'].games
            this.mlbGames = res['mlb'].games
            this.nflGames = res['nfl'].games
            this[this.load]()
          })
}

public loadNFL() {
        if (this.nflGames.length === 0) {
          //this.nflLoading = false;
          this.loading = false
          this.noNflGamesToday = true;
          this.noNflGamesMsg = "No Games Scheduled"
          console.log('There are no NFL games being played today.');
        } else {
          //this.nflLoading = false
          this.loading = false
          this.nflGamesToday = true;
          this.nflSchedule = this.nflGames;
          this.nflTeamRef = this.nflTeams;
          this.noNflGamesMsg = '';
          this.nflGameDate = this.nflGames[0].schedule.startTime ? this.nflGames[0].schedule.startTime : this.nflGames[1].schedule.startTime;
          if (this.nflTeamRef != null)
            this.getTeamInfo(this.nflSchedule, this.nflTeamRef);
        }
    //});
}

public loadMLB() {
      if (this.mlbGames.length === 0) {
        //this.mlbLoading = false;
        this.loading = false
        this.noMlbGamesToday = true;
        this.noMlbGamesMsg = "No Games Scheduled";
        console.log('There are no MLB games being played today.');
      } else {
        // this.noMlbGamesToday = true;
        // this.noMlbGamesMsg = "No Games Scheduled";
        //this.mlbLoading = false;
        this.loading = false
        this.mlbGamesToday = true;
        this.mlbSchedule = this.mlbGames;
        this.noMlbGamesMsg = '';
        this.mlbTeamRef = this.mlbTeams;  //res['references'].teamReferences ? res['references'].teamReferences : null;
        this.mlbGameDate = this.mlbGames[0].schedule.startTime ? this.mlbGames[0].schedule.startTime : this.mlbGames[1].schedule.startTime;
        if (this.mlbTeamRef != null)
          this.getTeamInfo(this.mlbSchedule, this.mlbTeamRef);
      }
  //});
}

public loadNHL() {
  this.nhlLoading = true;

    if (this.nhlGames.length === 0) {
      //this.nhlLoading = false;
      this.loading = false
      this.noNhlGamesToday = true;
      this.noNhlGamesMsg = "No Games Scheduled"
      this.nhlGameDate = this.nhlSelectedDate;
      console.log('There are no NHL games being played today.');
    } else {
      //this.nhlLoading = false;
      this.loading = false
      this.nhlGamesToday = true;
      // this.nhlSchedule = games;
      this.noNhlGamesMsg = '';
      this.nhlTeamRef = this.nhlTeamRefs['teamReferences'] ? this.nhlTeamRefs['teamReferences'] : null
      this.nhlGameDate = this.nhlGames[0].schedule.startTime ? this.nhlGames[0].schedule.startTime : this.nhlGames[1].schedule.startTime
      if (this.nhlTeamRef != null) {
        this.nhlSchedule = this.nhlGames.filter(item => new Date(item['schedule'].startTime) < this.util.tomorrow(this.nhlSelectedDate, this.nhlDataService.isToday) || playedStatuses[item['schedule'].playedStatus] != null);
        this.getTeamInfo(this.nhlSchedule, this.nhlTeamRef);
      }
        
    }
}

public loadNBA() {
    
    if (this.nbaGames.length === 0) {
      //this.nbaLoading = false;
      this.loading = false
      this.noNbaGamesToday = true;
      this.noNbaGamesMsg = "No Games Scheduled";
      this.nbaGameDate = this.nbaSelectedDate;
      console.log('There are no NBA games being played today.');
    } else {
      //this.nbaLoading = false;
      this.loading = false
      this.nbaGamesToday = true;
      //this.nbaSchedule = this.nbaGames;
      this.noNbaGamesMsg = '';
      this.nbaTeamRef = Object.values(this.nbaTeams); //res['references'].teamReferences ? res['references'].teamReferences : null;
      this.nbaGameDate = this.nbaGames[0].schedule.startTime && this.nbaGames[0].schedule.scheduleStatus != 'POSTPONED' ? this.nbaGames[0].schedule.startTime : new Date();
      if (this.nbaTeamRef != null) {
        this.nbaSchedule = this.nbaGames.filter(item => new Date(item['schedule'].startTime) < this.util.tomorrow(this.nbaSelectedDate, this.nbaDataService.isToday) || playedStatuses[item['schedule'].playedStatus] != null);
        this.getTeamInfo(this.nbaSchedule, this.nbaTeamRef);
      }
    }
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
        this.loadData() 
        const MILLISECONDS_IN_TEN_MINUTES = 600000;
        interval(MILLISECONDS_IN_TEN_MINUTES)
          .subscribe(() => {
            if (this.liveGames === true) {
              console.log('games are live get updates...');
              this.loadData()
            } else {
              console.log('No games then no daily stats either. :(');
            }
          });
      

      } 
    }
  }

}
