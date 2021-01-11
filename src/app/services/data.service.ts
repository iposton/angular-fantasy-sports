import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let headers = null;

let sending;
let sent;
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

export class DataService {

  public schedule: Observable <any> = null;
  public stats: Observable <any> = null;
  public daily: Observable <any> = null;
  public dailyBatters: Observable <any> = null;
  public score: Observable <any> = null;
  public allstats: Observable <any> = null;
  public hitstats: Observable <any> = null;
  public gameid: Observable <any> = null;
  public info: Observable <any> = null;
  public starterInfo: Observable <any> = null;
  public env: Observable < any > = null;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-regular";
  public dailyDate: any;

  //https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,T,C,TE

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate;
  }

  public selectedDate(d) {
    dailyDate = d;
  }

  sendHeaderOptions(h) {
    headers = h;
  }

  sendStats(statsArray) {
    //console.log("sending stats to service...");
    sending = statsArray;
  }

  getSentStats() {
    //console.log("stats sent to component...");
    sent = sending;
    return sent;
  }

  sendAllStats(allstatsArray) {
    //console.log("sending all stats to service...");
    sendingAll = allstatsArray;
  }

  getAllSentStats() {
    sentAll = sendingAll;
    return sentAll;
  }

  getEnv() {
    this.env = this.http.get('/heroku-env');
    return this.env;
  }


  getPrevGameId() {
    let url = `${this.apiRoot}/games.json?date=from-8-days-ago-to-5-days-ago`;
    this.gameid = this.http.get(url, {headers})
    return this.gameid;
  }

  getDailySchedule() {

      //let url = `${this.apiRoot}/daily_game_schedule.json?fordate=`+dailyDate;
      let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-playoff/date/${dailyDate}/games.json`;
      this.schedule = this.http.get(url, {headers})
       
   // }
    return this.schedule;

  }

  getBatStats(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-regular/player_stats_totals.json?player=${players}`;
    this.stats = this.http.get(url, {headers})
    return this.stats;
  }

  getStats(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-playoff/player_stats_totals.json?position=P&player=${players}`;
    this.stats = this.http.get(url, {headers})
    return this.stats;
  }

  public getAllStats(root) {
    let url = `${root}/player_stats_totals.json?position=P`;
    this.allstats = this.http.get(url, {headers})
    return this.allstats;
  }

  public getAllHitters(root) {
    let url = `${root}/player_stats_totals.json?position=OF,1B,2B,3B,C,SS,CF,LF,RF,DH`;
    this.hitstats = this.http.get(url, {headers})
    return this.hitstats;
  }

  getInfo() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/players.json?position=P`;
    console.log('getting active player data from API...');
    this.info = this.http.get(url, {headers})
    return this.info;
  }

  getStarterInfo(players) {

   // if (!this.info) {
      let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/players.json?position=P&player=${players}`;
      this.starterInfo = this.http.get(url, {headers})
        
   // }
    return this.starterInfo;
  }

   getDaily() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-playoff/date/${dailyDate}/player_gamelogs.json?position=P`;
    this.daily = this.http.get(url, {headers})
    return this.daily;
  }

  getDailyBatters() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-playoff/date/${dailyDate}/player_gamelogs.json?position=OF,1B,2B,3B,C,SS,CF,LF,RF,DH`;
    this.dailyBatters = this.http.get(url, {headers})
    return this.dailyBatters;
  }

  getScore(data) {
    let id = null;
    id = data
    let url = `${this.apiRoot}/games/`+id+`/boxscore.json`;
    //let url = `${this.apiRoot}/date/${dailyDate}/team_gamelogs.json`;
    this.score = this.http.get(url, {headers})
    return this.score;
  }
}
