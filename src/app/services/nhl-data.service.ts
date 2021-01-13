import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'

let thisDate = new Date();
let tomorrowDate = new Date(thisDate.getTime() + (24 * 60 * 60 * 1000));
let daTomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
let yesterdayDate = new Date(thisDate.getTime() - (24 * 60 * 60 * 1000));
let lastweekDate = new Date(thisDate.getTime() - (168 * 60 * 60 * 1000));
let twoWeekDate = new Date(thisDate.getTime() - (336 * 60 * 60 * 1000));
let threeWeekDate = new Date(thisDate.getTime() - (552 * 60 * 60 * 1000));

let utcDate = new Date(thisDate.toUTCString());
let tomorrowUtcDate = new Date(tomorrowDate.toUTCString());
let daTomorrowUtcDate = new Date(daTomorrowDate.toUTCString());
let yesterdayUtcDate = new Date(yesterdayDate.toUTCString());
let lastweekUtcDate = new Date(lastweekDate.toUTCString());
let twoWeekUtcDate = new Date(twoWeekDate.toUTCString());
let threeWeekUtcDate = new Date(threeWeekDate.toUTCString());

utcDate.setHours(utcDate.getHours() - 8);
tomorrowUtcDate.setHours(tomorrowUtcDate.getHours() - 8);
daTomorrowUtcDate.setHours(daTomorrowUtcDate.getHours() - 8);
yesterdayUtcDate.setHours(yesterdayUtcDate.getHours() - 8);
lastweekUtcDate.setHours(lastweekUtcDate.getHours() - 8);
twoWeekUtcDate.setHours(twoWeekUtcDate.getHours() - 8);
threeWeekUtcDate.setHours(threeWeekUtcDate.getHours() - 8);

let myDate = new Date(utcDate);
let tomorrowMyDate = new Date(tomorrowUtcDate);
let daTomorrowMyDate = new Date(daTomorrowUtcDate);
let yesterdayMyDate = new Date(yesterdayUtcDate);
let lastweekMyDate = new Date(lastweekUtcDate);
let twoWeekMyDate = new Date(twoWeekUtcDate);
let threeWeekMyDate = new Date(threeWeekUtcDate);

//DATE FORMAT FOR DAILY SCHEDULE API
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
let tomorrowDailyDate = tomorrowMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let dayAfterTomorrow = daTomorrowMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let yesterdayDailyDate = yesterdayMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let lastweekDailyDate = lastweekMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let twoWeekDailyDate = twoWeekMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let threeWeekDailyDate = threeWeekMyDate.toISOString().slice(0, 10).replace(/-/g, "");

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK
let today = myDate.toISOString().slice(0, 10);
let tomorrow = tomorrowMyDate.toISOString().slice(0, 10);
let afterTomorrow = daTomorrowMyDate.toISOString().slice(0, 10); 
let yesterday = yesterdayMyDate.toISOString().slice(0, 10);
let lastweek = lastweekMyDate.toISOString().slice(0, 10);

let headers = null;

let sending;
let sent;
let sendingHot;
let sentHot;
let sendingAll;
let sentAll;

//console.log(dailyDate, 'today\'s date');

@Injectable({ providedIn: 'root' }) 
export class NHLDataService {

  public info: Observable <any> = null;
  public infoSkaters: Observable <any> = null;
  public gToday: Observable <any> = null;
  public sToday: Observable <any> = null;
  public stats: Observable <any> = null;
  public skateStats: Observable <any> = null;
  public allstats: Observable <any> = null;
  public uStats: Observable <any> = null;
  public env: Observable <any> = null;
  public gameid: Observable <any> = null;
  public lastweekgameid: Observable <any> = null;
  public daily: Observable <any> = null;
  public schedule: Observable <any> = null;
  public score: Observable <any> = null;
  public play: Observable <any> = null;
  public injured: Observable <any> = null;
  public teamstats: Observable <any> = null;
  public dailySkaters: Observable <any> = null;
  public games: Observable <any> = null;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2020-playoff";
  public headers: any;
  public dailyDate: string = '';
  public isToday: boolean = false;
  public isTomorrow: boolean = false;

  constructor(private http: HttpClient) {
     this.dailyDate = dailyDate;
  }

  public selectedDate(d) {
    dailyDate = d;
  }

  public checkDay() {
    if (dailyDate === tomorrowDailyDate) {
      this.isTomorrow = true;
    } else {
      this.isTomorrow = false;
    }
    
    if (dailyDate === this.dailyDate) {
      this.isToday = true;
    } else {
      this.isToday = false;
    }
  }

  sendHeaderOptions(h) {
    headers = h;
  }


  getDailySchedule() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/2021-regular/date/`+dailyDate+`/games.json`;
    this.schedule = this.http.get(url, {headers})
    return this.schedule;
  }


  getEnv() {
    this.env = this.http.get('/heroku-env')
    return this.env;
  }

  getYesterday() {
    if (tomorrowDailyDate === dailyDate) {
      return today; 
    } else {
      return yesterday;
    } 
  }

  getToday() {
    //console.log("send today..."); 
    if (tomorrowDailyDate === dailyDate) {
      return tomorrow; 
    } else {
      return today;
    }
  }

  getTomorrow() {
    if (tomorrowDailyDate === dailyDate) {
      return afterTomorrow;
    } else {
      return tomorrow;
    }   
  }

  getLastweek() {
    //console.log("send lastweek..."); 
    return lastweek;
  }

  sendStats(statsArray, allStats) {
    sending = statsArray;
    sendingAll = allStats;
  }

 sendHotStats(hotstatsArray) {
    console.log("sending hot stats to service...");
    sendingHot = hotstatsArray;
  }

  getSentStats() {
    sent = sending;
    return sent;
  }

  getSentAllStats() {
    sentAll = sendingAll;
    return sentAll;
  }

  getSentHotStats() {
    sentHot = sendingHot;
    return sentHot;
  }

  public getInfo() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/players.json?position=G`;
    this.info = this.http.get(url, {headers})
    return this.info;
  }

  public getInfoSkaters() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/players.json?position=RW,LW,D,C`;
    this.infoSkaters = this.http.get(url, {headers})
    return this.infoSkaters;
  }

  public getGoaliesToday(teams) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/players.json?position=G&team=`+teams;
    this.gToday = this.http.get(url, {headers})
    return this.gToday;
  }

  public getSkatersToday(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/players.json?player=`+players;
    this.sToday = this.http.get(url, {headers})
    return this.sToday;
  }

  public getStats(teams) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/2019-2020-regular/player_stats_totals.json?position=G`;
    this.stats = this.http.get(url, {headers})
    return this.stats;
  }

  public getSkateStats(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/2019-2020-regular/player_stats_totals.json?player=`+players;
    this.skateStats = this.http.get(url, {headers})
    return this.skateStats;
  }

  getAllStats(type, root) {
      let url = null;
      this.apiRoot = root;
      if (type === 'skaters') {
        url = `${this.apiRoot}/player_stats_totals.json?position=RW,LW,D,C`;
      } else {
        url = `${this.apiRoot}/player_stats_totals.json?position=G`;
      }
      
      this.allstats = this.http.get(url, {headers})
      return this.allstats;
  }

  getTeamStats() {
    let url = `${this.apiRoot}/team_stats_totals.json`;
    this.teamstats = this.http.get(url, {headers})
    return this.teamstats;
  }

  getGameId() {
    let url = null;
    if (tomorrowDailyDate === dailyDate) {
      url = `${this.apiRoot}/games.json?date=from-`+this.dailyDate+`-to-`+dayAfterTomorrow;
    } else {
      url = `${this.apiRoot}/games.json?date=from-`+yesterdayDailyDate+`-to-`+tomorrowDailyDate;
    }
    this.gameid = this.http.get(url, {headers})
    return this.gameid;
  }


  getLastweekGameId() {
    let url = `${this.apiRoot}/games.json?date=from-`+lastweekDailyDate+`-to-`+yesterdayDailyDate;
    this.lastweekgameid = this.http.get(url, {headers})
    return this.lastweekgameid;
  }

  getGames(span, sport, date) {
    let url = null;
    let season = null;
    if (sport != 'nfl' && sport != 'nba')
      season = '2020-playoff';
    else
      season = '2020-2021-regular';
    if (span === 'last-week') {
      //sport === 'mlb' ? twoWeekDailyDate : 
      url = `https://api.mysportsfeeds.com/v2.1/pull/${sport}/${season}/games.json?date=from-${lastweekDailyDate}-to-${dailyDate}`;
    } else if (span === 'yesterday') {
      url = `https://api.mysportsfeeds.com/v2.1/pull/${sport}/${season}/games.json?date=${yesterdayDailyDate}`;
    } else if (span === 'today') {
      url = `https://api.mysportsfeeds.com/v2.1/pull/${sport}/${season}/games.json?date=${dailyDate}`;
    } else if (span === 'two-weeks') {
      url = `https://api.mysportsfeeds.com/v2.1/pull/${sport}/${season}/games.json?date=from-${twoWeekDailyDate}-to-${dailyDate}`;
    } else if (span === 'three-weeks') {
      url = `https://api.mysportsfeeds.com/v2.1/pull/${sport}/${season}/games.json?date=from-${threeWeekDailyDate}-to-${date}`;
    }
    
    this.games = this.http.get(url, {headers})
    return this.games;
  }

  getDaily() {
    let url = `${this.apiRoot}/date/`+dailyDate+`/player_gamelogs.json?position=G`;
    this.daily = this.http.get(url, {headers})  
    return this.daily;
  }

  getDailySkaters() {
    let url = `${this.apiRoot}/date/`+dailyDate+`/player_gamelogs.json?position=RW,LW,D,C`;
    this.dailySkaters = this.http.get(url, {headers})  
    return this.dailySkaters;
  }

   getInjured() {

    if (!this.injured) {
      console.log('getting goalie injuries from api...');

      let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/injuries.json?position=G`;
      this.injured = this.http.get(url, {headers})
        
    }
    return this.injured;
  }


  getScore(id) {
    let url = `${this.apiRoot}/date/${dailyDate}/team_gamelogs.json`;
    this.score = this.http.get(url, {headers})     
    return this.score;
  }

  clearCache() {
    //this.info = null;
  }

  public iceTimeAvg(time, gp) {
    return Math.floor((time / gp) / 60);
  }

}