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
  public hitterinfo: Observable <any> = null;
  public starterInfo: Observable <any> = null;
  public env: Observable < any > = null;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/mlb/2020-regular";
  public dailyDate: any;
  public isToday: boolean = false;

  //https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,T,C,TE

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate;
  }

  public selectedDate(d) {
    dailyDate = d;
  }

  public checkDay() {
    console.log(dailyDate, this.dailyDate)
    if (dailyDate === this.dailyDate || dailyDate < this.dailyDate) {
      this.isToday = true;
    } else {
      this.isToday = false;
    }
    console.log('is Today?', this.isToday, 'mlb day checked');
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

  public getDailySchedule() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular/date/${dailyDate}/games.json`;
    this.schedule = this.http.get(url, {headers})
    return this.schedule;
  }

  public getBatStats(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular/player_stats_totals.json?player=${players}`;
    this.stats = this.http.get(url, {headers})
    return this.stats;
  }

  public getStats(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular/player_stats_totals.json?position=P&player=${players}`;
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

  public getInfo() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/players.json?position=P`;
    console.log('getting active player data from API...');
    this.info = this.http.get(url, {headers})
    return this.info;
  }

  public getHitterInfo() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/players.json?position=OF,1B,2B,3B,C,SS,CF,LF,RF,DH`;
    console.log('getting active player data from API...');
    this.hitterinfo = this.http.get(url, {headers})
    return this.hitterinfo;
  }

  public getStarterInfo(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/players.json?position=P&player=${players}`;
    this.starterInfo = this.http.get(url, {headers})
    return this.starterInfo;
  }

   public getDaily(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular/date/${dailyDate}/player_gamelogs.json?&player=${players}` //position=P`;
    this.daily = this.http.get(url, {headers})
    return this.daily;
  }

  public getDailyBatters(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/mlb/2021-regular/date/${dailyDate}/player_gamelogs.json?&player=${players}` //position=OF,1B,2B,3B,C,SS,CF,LF,RF,DH`;
    this.dailyBatters = this.http.get(url, {headers})
    return this.dailyBatters;
  }

  public getScore(data) {
    let id = null;
    id = data
    let url = `${this.apiRoot}/games/`+id+`/boxscore.json`;
    //let url = `${this.apiRoot}/date/${dailyDate}/team_gamelogs.json`;
    this.score = this.http.get(url, {headers})
    return this.score;
  }

  public imageSwap(src) {
    let specialImgNum = null;
    specialImgNum = src.substring(
      src.lastIndexOf("/") + 1, 
      src.lastIndexOf(".")
    );
    return `https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_100/v1/people/${specialImgNum}/headshot/67/current`;
  }
}
