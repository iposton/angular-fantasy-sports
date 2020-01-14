import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let headers = null;

let sending = [];
let sent = [];
let sendingT = [];
let sentT = [];
let sendingAll;
let sentAll;

let sendingHot;
let sentHot;


let thisDate = new Date();
let utcDate = new Date(thisDate.toUTCString());
utcDate.setHours(utcDate.getHours() - 8);
let myDate = new Date(utcDate);
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");

let yesterdayDate = new Date(thisDate.getTime() - (24 * 60 * 60 * 1000));
let lastweekDate = new Date(thisDate.getTime() - (576 * 60 * 60 * 1000));
let yesterdayUtcDate = new Date(yesterdayDate.toUTCString());
let lastweekUtcDate = new Date(lastweekDate.toUTCString());
yesterdayUtcDate.setHours(yesterdayUtcDate.getHours() - 8);
lastweekUtcDate.setHours(lastweekUtcDate.getHours() - 8);
let yesterdayMyDate = new Date(yesterdayUtcDate);
let lastweekMyDate = new Date(lastweekUtcDate);
let yesterdayDailyDate = yesterdayMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let lastweekDailyDate = lastweekMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let yesterday = yesterdayMyDate.toISOString().slice(0, 10);
let lastweek = lastweekMyDate.toISOString().slice(0, 10);

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
  public lastweekgameid: Observable <any> = null;
  public gameid: Observable <any> = null;
  public info: Observable <any> = null;
  public starterInfo: Observable <any> = null;
  public env: Observable < any > = null;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-playoff"; //2019-regular"
  public dailyDate: any;
  public touchTeamRanks: any;
  public lineTeamRanks: any;
  public premiumRanks: any;

  //https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,C,OT,NT,DT,DE

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate;
  }

  public selectedDate(d) {
    console.log(d, 'set new date');
    dailyDate = d;
  }

  sendHotStats(hotstatsArray) {
    console.log("sending hot stats to service...");
    sendingHot = hotstatsArray;
  }


  //  getSentAllStats() {
  //   console.log("stats sent to component...");
  //   sentAll = sendingAll;
  //   return sentAll;
  // }

  getSentHotStats() {
    console.log("stats sent to component...");
    sentHot = sendingHot;
    return sentHot;
  }

  sendHeaderOptions(h) {
    console.log('got headers & options in data service...');
    headers = h;
  }

  sendTouchStats(statsArray) {
    console.log("sending touch stats to service...");
    if (statsArray.length > 0) {
      console.log('save touch team ranks');
      this.touchTeamRanks = statsArray[1][2]; 
    } 
    sendingT = statsArray;
  }

  getSentTouchStats() {
    console.log("stats sent to component...");
    sentT = [];
    sentT = sendingT;
    return sentT;
  }

  sendPremiumRanks(pRanks) {
    this.premiumRanks = pRanks;
  }

  sendStats(statsArray) {
    console.log("sending stats to service...");
    if (statsArray.length > 0) {
      console.log('save line team ranks');
      this.lineTeamRanks = statsArray[1][2]; 
    } 
    sending = statsArray;
  }

  getSentStats() {
    console.log("stats sent to component...");
    sent = [];
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

  getYesterday() {
    console.log("send yesterday..."); 
    return yesterday; 
  }

  getLastweek() {
    console.log("send lastweek..."); 
    return lastweek;
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

      let url = null
      if (parseInt(selected) > 17) {
        url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-playoff/week/${selected}/games.json`;
      } else {
        url = `${this.apiRoot}/week/${selected}/games.json`;
      }
      
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

  getLastweekGameId() {

    if (!this.lastweekgameid) {
      console.log('getting 1 week of games from API...');

      let url = `${this.apiRoot}/games.json?date=from-`+lastweekDailyDate+`-to-`+yesterdayDailyDate;
      this.lastweekgameid = this.http.get(url, {headers})
        
    }
    return this.lastweekgameid;
  }
}
