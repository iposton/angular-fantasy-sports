import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let headers = null;

let sending;
let sent;
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

export class NFLDataService {

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
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular";
  public dailyDate: any;

  //https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,C,OT,NT,DT,DE

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate;
  }

  public selectedDate(d) {
    console.log(d, 'set new date');
    dailyDate = d;
  }

  sendHeaderOptions(h) {
    console.log('got headers & options in data service...');
    headers = h;
  }

  sendTouchStats(statsArray) {
    console.log("sending stats to service...");
    sendingT = statsArray;
  }

  getSentTouchStats() {
    console.log("stats sent to component...");
    sentT = sendingT;
    return sentT;
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

  sendAllStats(allstatsArray) {
    console.log("sending all stats to service...");
    sendingAll = allstatsArray;
  }

  getAllSentStats() {
    console.log("all stats sent to component...");
    sentAll = sendingAll;
    return sentAll;
  }

  getEnv() {
    console.log("trying to get heroku env...");
    this.env = this.http.get('/heroku-env')
    return this.env;
  }


  getPrevGameId() {

    //if (!this.gameid) {
      console.log('getting pitch speed data from API...');

      let url = `${this.apiRoot}/games.json?date=from-7-days-ago-to-5-days-ago`;
      this.gameid = this.http.get(url, {headers})
        
    //}
    return this.gameid;
  }

    getSchedule(selected) {
      // pass in week
    //get all games for today get game ID and find a pitchers opponent
   // if (!this.schedule) {
      console.log('getting nfl schedule for today from api...', dailyDate);

      //let url = `${this.apiRoot}/daily_game_schedule.json?fordate=`+dailyDate;
      let url = `${this.apiRoot}/week/${selected}/games.json`;
      this.schedule = this.http.get(url, {headers})
       
   // }
    return this.schedule;

  }

  getStats(players) {

    //if (!this.stats) {
      //console.log('getting cumulative_player_stats by player ID from API...', players);
      //let url = `${this.apiRoot}/cumulative_player_stats.json?position=G,C,OT,NT,DT,DE&player=`+playerID;
      let url = `${this.apiRoot}/player_stats_totals.json?position=G,C,OT,NT,DT,DE`; //&player=${players}`;
      this.stats = this.http.get(url, {headers})
      
    //}
    return this.stats;
  }

   getAllStats() {

    //if (!this.allstats) {

      console.log('getting total player stats from API...');
      //cumulative_player_stats.json?position=G,C,OT,NT,DT,DE&sort=STATS.Miscellaneous-GS.D&limit=180
      let url = `${this.apiRoot}/player_stats_totals.json?position=G,C,OT,NT,DT,DE`;
      this.allstats = this.http.get(url, {headers})
      
    //}
    return this.allstats;
  }

  getTeamStats(date) {
      console.log('getting total team stats from API...');
      let url = `${this.apiRoot}/team_stats_totals.json?date=${date}`;
      this.teamstats = this.http.get(url, {headers})

    return this.teamstats;
  }

  getInfo() {

   // if (!this.info) {
      let url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,C,OT,NT,DT,DE`;
      console.log('getting active player data from API...');
      this.info = this.http.get(url, {headers})
        
   // }
    return this.info;
  }

  getStarterInfo(players) {

   // if (!this.info) {
      let url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,C,OT,NT,DT,DE&player=${players}`;
      console.log('getting active player data from API...');
      this.starterInfo = this.http.get(url, {headers})
        
   // }
    return this.starterInfo;
  }

   getDaily(selected) {
   // pass in week
   // if (!this.daily) {
      //let url = `${this.apiRoot}/daily_player_stats.json?fordate=`+dailyDate+`&position=P`;
      let url = `${this.apiRoot}/week/${selected}/player_gamelogs.json?position=G,C,OT,NT,DT,DE`;
      console.log(url, 'url')
      console.log('getting daily stats for pitchers from API...');
      this.daily = this.http.get(url, {headers})
        
  //  }
    return this.daily;
  }

  getDailyTouches(selected) {
    // pass in week
    // if (!this.daily) {
       //let url = `${this.apiRoot}/daily_player_stats.json?fordate=`+dailyDate+`&position=P`;
       let url = `${this.apiRoot}/week/${selected}/player_gamelogs.json?position=WR,TE,RB,QB`;
       console.log(url, 'url')
       console.log('getting daily stats for pitchers from API...');
       this.daily = this.http.get(url, {headers})
         
   //  }
     return this.daily;
   }

  getTouches(players) {

      let url = `${this.apiRoot}/player_stats_totals.json?position=WR,TE,RB,QB`; //&player=${players}`;
      this.stats = this.http.get(url, {headers})
    return this.stats;
  }

  getWeek(selected) {

       let url = `${this.apiRoot}/week/${selected}/team_gamelogs.json`;
       console.log(url, 'url')
       console.log('getting daily stats for pitchers from API...');
       this.weekly = this.http.get(url, {headers})

     return this.weekly;
   }

  getScore(data) {
    let id = null;
    id = data
    //if (!this.score) {
      console.log(`${this.apiRoot}/games/`+id+`/boxscore.json`, 'getting daily scores of todays games from API...');
      let url = `${this.apiRoot}/games/`+id+`/boxscore.json`;
      this.score = this.http.get(url, {headers})
        
    //}
    return this.score;
  }
}
