import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let headers = null;

let sending;
let sent;

let thisDate = new Date();
let utcDate = new Date(thisDate.toUTCString());
utcDate.setHours(utcDate.getHours() - 8);
let myDate = new Date(utcDate);
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");

@Injectable({
  providedIn: 'root'
})

export class DataService {

  schedule: Observable <any> = null;
  stats: Observable <any> = null;
  daily: Observable <any> = null;
  score: Observable <any> = null;
  allstats: Observable <any> = null;
  gameid: Observable <any> = null;
  info: Observable <any> = null;
  env: Observable < any > = null;
  apiRoot: string = "https://api.mysportsfeeds.com/v1.2/pull/mlb/2018-regular";

  constructor(private http: HttpClient) { }

  sendHeaderOptions(h) {
    console.log('got headers & options in data service...');
    headers = h;
  }

  sendStats(statsArray) {
    console.log("sending stats to service...");
    sending = statsArray;
  }

  getSentStats() {
    console.log("stats sent to component...");
    sent = sending;
    return sent;
  }

  getEnv() {
    console.log("trying to get heroku env...");
    this.env = this.http.get('/heroku-env')
    return this.env;
  }


  getGameId() {

    if (!this.gameid) {
      console.log('getting pitch speed data from API...');

      let url = `${this.apiRoot}/full_game_schedule.json?date=from-13-days-ago-to-2-days-ago`;
      this.gameid = this.http.get(url, {headers})
        
    }
    return this.gameid;
  }

    getDailySchedule() {
    //get all games for today get game ID and find a pitchers opponent
    if (!this.schedule) {
      console.log('getting mlb schedule for today from api...');

      let url = `${this.apiRoot}/daily_game_schedule.json?fordate=`+dailyDate;
      this.schedule = this.http.get(url, {headers})
       
    }
    return this.schedule;

  }

  getStats(playerID) {

    if (!this.stats) {

      console.log('getting cumulative_player_stats by player ID from API...');

      let url = `${this.apiRoot}/cumulative_player_stats.json?position=P&player=`+playerID;
      this.stats = this.http.get(url, {headers})
      
    }
    return this.stats;
  }

   getAllStats() {

    if (!this.allstats) {

      console.log('getting cumulative_player_stats by player ID from API...');
      //cumulative_player_stats.json?position=P&sort=STATS.Miscellaneous-GS.D&limit=180
      let url = `${this.apiRoot}/cumulative_player_stats.json?position=P&sort=STATS.Pitching-NP.D&limit=180`;
      this.allstats = this.http.get(url, {headers})
      
    }
    return this.allstats;
  }

  getInfo() {

    if (!this.info) {
      let url = `${this.apiRoot}/active_players.json?position=P`;
      console.log('getting active player data from API...');
      this.info = this.http.get(url, {headers})
        
    }
    return this.info;
  }

   getDaily() {

    if (!this.daily) {
      let url = `${this.apiRoot}/daily_player_stats.json?fordate=`+dailyDate+`&position=P`;
      console.log('getting daily stats for pitchers from API...');
      this.daily = this.http.get(url, {headers})
        
    }
    return this.daily;
  }

  getScore() {

    if (!this.score) {
      let url5 = `${this.apiRoot}/scoreboard.json?fordate=`+dailyDate;
      console.log('getting daily scores of todays games from API...');
      this.score = this.http.get(url5, {headers})
        
    }
    return this.score;
  }
}
