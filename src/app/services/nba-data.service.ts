import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let headers = null;
let sending;
let sent;
let sendingMyData;
let sendingSched;
let sentMyData;
let sentSched;
let sendingT;
let sentT;
let sendingAll;
let sentAll;
let thisDate = new Date();
let utcDate = new Date(thisDate.toUTCString());
utcDate.setHours(utcDate.getHours() - 8);
let myDate = new Date(utcDate);
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");

@Injectable({
  providedIn: 'root'
})

export class NBADataService {

  public schedule: Observable <any> = null;
  public stats: Observable <any> = null;
  public daily: Observable <any> = null;
  public weekly: Observable <any> = null;
  public score: Observable <any> = null;
  public allstats: Observable <any> = null;
  public teamstats: Observable <any> = null;
  public gameid: Observable <any> = null;
  public info: Observable <any> = null;
  public starterInfo: Observable <any> = null;
  public env: Observable < any > = null;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nba/2019-regular";
  public dailyDate: any;

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate;
  }

  public selectedDate(d) {
    dailyDate = d;
    //dailyDate = '20200730';
  }

  sendHeaderOptions(h) {
    headers = h;
  }

  sendTouchStats(statsArray) {
    sendingT = statsArray;
  }

  getSentTouchStats() {
    sentT = sendingT;
    return sentT;
  }

  sendStats(statsArray, myData, schedule) {
    sending = statsArray;
    sendingMyData = myData;
    sendingSched = schedule;
  }

  getSentStats() {
    let allDataArr = [];
    sent = sending;
    sentMyData = sendingMyData;
    sentSched = sendingSched;
    allDataArr.push(sent, sentMyData, sentSched);
    return allDataArr;
  }

  sendAllStats(allstatsArray) {
    sendingAll = allstatsArray;
  }

  getAllSentStats() {
    sentAll = sendingAll;
    return sentAll;
  }

  getEnv() {
    this.env = this.http.get('/heroku-env')
    return this.env;
  }


  getPrevGameId() {
    let url = `${this.apiRoot}/games.json?date=from-7-days-ago-to-5-days-ago`;
    this.gameid = this.http.get(url, {headers})
    return this.gameid;
  }

    getSchedule() {
    //let url = `${this.apiRoot}/daily_game_schedule.json?fordate=`+dailyDate;
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nba/2020-playoff/date/`+dailyDate+`/games.json`;
    //let url = `${this.apiRoot}/games.json`;
    this.schedule = this.http.get(url, {headers})
    return this.schedule;

  }

  getStats(players) {

    //if (!this.stats) {
      //console.log('getting cumulative_player_stats by player ID from API...', players);
      //let url = `${this.apiRoot}/cumulative_player_stats.json?position=PG,SG,SF,PF,C&player=`+playerID;
      //let url = `https://api.mysportsfeeds.com/v2.1/pull/nba/2018-2019-regular/player_stats_totals.json?position=PG,SG,SF,PF,C`; 
      let url = `https://api.mysportsfeeds.com/v2.1/pull/nba/2020-playoff/player_stats_totals.json?player=${players}`;
      this.stats = this.http.get(url, {headers})
      
    //}
    return this.stats;
  }

   getAllStats(span) {
      //cumulative_player_stats.json?position=PG,SG,SF,PF,C&sort=STATS.Miscellaneous-GS.D&limit=180
      let url = null;
      url = `https://api.mysportsfeeds.com/v2.1/pull/nba/2020-playoff/player_stats_totals.json`;
      this.allstats = this.http.get(url, {headers})
      
    //}
    return this.allstats;
  }

  getTeamStats(date) {
    let url = `${this.apiRoot}/team_stats_totals.json`;
    this.teamstats = this.http.get(url, {headers})
    return this.teamstats;
  }

  getInfo(data) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nba/players.json?player=${data}`;
    this.info = this.http.get(url, {headers})
    return this.info;
  }

  getStarterInfo(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nba/players.json?position=PG,SG,SF,PF,C&player=${players}`;
    this.starterInfo = this.http.get(url, {headers})
    return this.starterInfo;
  }

  getDaily(data) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nba/2020-playoff/date/${dailyDate}/player_gamelogs.json?player=${data}`;
    this.daily = this.http.get(url, {headers})
    return this.daily;
  }

  getDailyTouches(selected) {
     let url = `${this.apiRoot}/week/${selected}/player_gamelogs.json?position=PG,SG,SF,PF,C`;
     this.daily = this.http.get(url, {headers})
     return this.daily;
  }

  getTouches(players) {
    let url = `${this.apiRoot}/player_stats_totals.json?position=PG,SG,SF,PF,C`; //&player=${players}`;
    this.stats = this.http.get(url, {headers})
    return this.stats;
  }

  getWeek(selected) {
     let url = `${this.apiRoot}/week/${selected}/team_gamelogs.json`;
     this.weekly = this.http.get(url, {headers})
     return this.weekly;
  }

  getScore(data) {
    let id = null;
    id = data
    let url = `${this.apiRoot}/games/`+id+`/boxscore.json`;
    this.score = this.http.get(url, {headers})
    return this.score;
  }
}
