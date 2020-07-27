import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpParams} from '@angular/common/http'

let thisDate = new Date();
let tomorrowDate = new Date(thisDate.getTime() + (24 * 60 * 60 * 1000));
let yesterdayDate = new Date(thisDate.getTime() - (24 * 60 * 60 * 1000));
let lastweekDate = new Date(thisDate.getTime() - (192 * 60 * 60 * 1000));

let utcDate = new Date(thisDate.toUTCString());
let tomorrowUtcDate = new Date(tomorrowDate.toUTCString());
let yesterdayUtcDate = new Date(yesterdayDate.toUTCString());
let lastweekUtcDate = new Date(lastweekDate.toUTCString());

utcDate.setHours(utcDate.getHours() - 8);
tomorrowUtcDate.setHours(tomorrowUtcDate.getHours() - 8);
yesterdayUtcDate.setHours(yesterdayUtcDate.getHours() - 8);
lastweekUtcDate.setHours(lastweekUtcDate.getHours() - 8);

let myDate = new Date(utcDate);
let tomorrowMyDate = new Date(tomorrowUtcDate);
let yesterdayMyDate = new Date(yesterdayUtcDate);
let lastweekMyDate = new Date(lastweekUtcDate);

//DATE FORMAT FOR DAILY SCHEDULE API
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
let tomorrowDailyDate = tomorrowMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let yesterdayDailyDate = yesterdayMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let lastweekDailyDate = lastweekMyDate.toISOString().slice(0, 10).replace(/-/g, "");

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK
let today = myDate.toISOString().slice(0, 10);
let tomorrow = tomorrowMyDate.toISOString().slice(0, 10);
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

  info: Observable < any > = null;
  stats: Observable < any > = null;
  allstats: Observable < any > = null;
  uStats: Observable < any > = null;
  env: Observable < any > = null;
  gameid: Observable < any > = null;
  lastweekgameid: Observable < any > = null;
  daily: Observable < any > = null;
  schedule: Observable < any > = null;
  score: Observable < any > = null;
  play: Observable <any> = null;
  injured: Observable <any> = null;
  teamstats: Observable <any> = null;
  apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2020-playoff";
  headers: any;
  public dailyDate: string = '';

  
  constructor(private http: HttpClient) {
     this.dailyDate = dailyDate;
  }

  public selectedDate(d) {
    dailyDate = d;
  }

  sendHeaderOptions(h) {
    headers = h;
  }


  getDailySchedule() {
    let url = `${this.apiRoot}/date/`+dailyDate+`/games.json`;
    this.schedule = this.http.get(url, {headers})
    return this.schedule;
  }


  getEnv() {
    this.env = this.http.get('/heroku-env')
    return this.env;
  }

  getYesterday() {
    console.log("send yesterday..."); 
    return yesterday; 
  }

  getToday() {
    console.log("send today..."); 
    return today; 
  }

  getTomorrow() {
    console.log("send tomrrow..."); 
    return tomorrow; 
  }

  getLastweek() {
    console.log("send lastweek..."); 
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

  getInfo() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nhl/players.json?position=G`;
    this.info = this.http.get(url, {headers})
    return this.info;
  }

  getStats(teams) {
    let url = `${this.apiRoot}/player_stats_totals.json?position=G&team=`+teams;
    this.stats = this.http.get(url, {headers})
    return this.stats;
  }

  getAllStats(type) {
      let url = null;
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
    let url = `${this.apiRoot}/games.json?date=from-`+yesterdayDailyDate+`-to-`+tomorrowDailyDate;
    this.gameid = this.http.get(url, {headers})
    return this.gameid;
  }


  getLastweekGameId() {
    let url = `${this.apiRoot}/games.json?date=from-`+lastweekDailyDate+`-to-`+yesterdayDailyDate;
    this.lastweekgameid = this.http.get(url, {headers})
    return this.lastweekgameid;
  }

  getDaily() {
    let url = `${this.apiRoot}/date/`+dailyDate+`/player_gamelogs.json?position=G`;
    this.daily = this.http.get(url, {headers})  
    return this.daily;
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

}