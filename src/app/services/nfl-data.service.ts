import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

let headers = null;
let sWeek = null;
let apiRoot = null;

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
  public dailyT: Observable <any> = null;
  public weekly: Observable <any> = null;
  public score: Observable <any> = null;
  public allstats: Observable <any> = null;
  public offenseStats: Observable <any> = null;
  public defenseStats: Observable <any> = null;
  public teamstats: Observable <any> = null;
  public lastweekgameid: Observable <any> = null;
  public gameid: Observable <any> = null;
  public info: Observable <any> = null;
  public starterInfo: Observable <any> = null;
  public env: Observable < any > = null;
  public apiRoot2021: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular";
  public apiRoot2020: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl";
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular"; 
  public apiRootPO: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-playoff"; //2019-regular"
  public dailyDate: any;
  public touchTeamRanks: any;
  public lineTeamRanks: any;
  public premiumRanks: any;

  //https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,C,OT,NT,DT,DE

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate;
  }

  public selectedDate(d) {
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

  sendHeaderOptions(h, week, root) {
    headers = h;
    sWeek = week;
    apiRoot = root;
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
    let url = `${this.apiRoot}/games.json?date=from-7-days-ago-to-5-days-ago`;
    this.gameid = this.http.get(url, {headers})
    return this.gameid;
  }

  getSchedule(selected) {
    //console.log('getting nfl schedule for today from api...', dailyDate);
    let url = null
    if (parseInt(selected) > 17) {
      url = `${this.apiRootPO}/week/${selected}/games.json`;
    } else {
      //url = `${this.apiRoot}/week/${selected}/games.json`;
      url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular/week/${selected}/games.json`;
    }
    this.schedule = this.http.get(url, {headers})
    return this.schedule;

  }

  getStats(players) {

    //if (!this.stats) {
      //console.log('getting cumulative_player_stats by player ID from API...', players);
      //let url = `${this.apiRoot}/cumulative_player_stats.json?position=G,C,OT,NT,DT,DE&player=`+playerID;
     // let url = null;
      // if (parseInt(sWeek) > 17) {
      //   url = `${this.apiRootPO}/player_stats_totals.json?position=G,C,OT,NT,DT,DE`;
      // } else {
      //   url = `${this.apiRoot}/player_stats_totals.json?position=G,C,OT,NT,DT,DE`;
      // }
      let url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular/player_stats_totals.json?player=${players}`;
      this.stats = this.http.get(url, {headers})
      
    //}
    return this.stats;
  }

  getAllStats() {

    //if (!this.allstats) {

      //console.log('getting total player stats from API...');
      // let url = null;
      // if (parseInt(sWeek) > 17) {
      //   url = `${this.apiRootPO}/player_stats_totals.json?position=G,C,OT,NT,DT,DE`;
      // } else {
      //   url = `${this.apiRoot}/player_stats_totals.json?position=G,C,OT,NT,DT,DE`;
      // }
      //cumulative_player_stats.json?position=G,C,OT,NT,DT,DE&sort=STATS.Miscellaneous-GS.D&limit=180
      let url = `${apiRoot}/player_stats_totals.json?position=G,C,OT,NT,DT,DE`;
      this.allstats = this.http.get(url, {headers})
      
    //}
    return this.allstats;
  }

  getAllOffense(position, season) {

      if (position === 'qb' && season === '20') {
        let url = `${this.apiRoot2020}/players.json?position=QB`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      } else if (position === 'qb' && season === '19') {
        let url = `${this.apiRoot2021}/player_stats_totals.json?position=QB`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      }

      if (position === 'run' && season === '20') {
        let url = `${this.apiRoot2020}/players.json?position=RB`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      } else if (position === 'run' && season === '19') {
        let url = `${this.apiRoot2021}/player_stats_totals.json?position=RB`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      }

      if (position === 'rec' && season === '20') {
        let url = `${this.apiRoot2020}/players.json?position=WR`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      } else if (position === 'rec' && season === '19') {
        let url = `${this.apiRoot2021}/player_stats_totals.json?position=WR`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      }

      if (position === 'te' && season === '19') {
        let url = `${this.apiRoot2021}/player_stats_totals.json?position=TE`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      }

      if (position === 'k' && season === '20') {
        let url = `${this.apiRoot2020}/players.json?position=K`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      } else if (position === 'k' && season === '19') {
        let url = `${this.apiRoot2021}/player_stats_totals.json?position=K`;
        this.offenseStats = this.http.get(url, {headers})
        return this.offenseStats;
      }
  }

  getAllDefense(position, season) {

    if (position === 'all' && season === '20') {
      let url = `${this.apiRoot2020}/players.json?position=CB,S,LB,DT,DE,SS,FS,OLB,ILB,MLB`;
      this.defenseStats = this.http.get(url, {headers})
      return this.defenseStats;
    } else if (position === 'all' && season === '19') {
      let url = `${this.apiRoot2021}/player_stats_totals.json?position=CB,S,LB,DT,DE,FS,SS,OLB,ILB,MLB`;
      this.defenseStats = this.http.get(url, {headers})
      return this.defenseStats;
    }
      
  }

  getTeamStats(date) {
      //console.log('getting total team stats from API...');
      // let url = null;
      // if (parseInt(sWeek) > 17) {
      //   url = `${this.apiRootPO}/team_stats_totals.json?date=${date}`;
      // } else {
      //   url = `${this.apiRoot}/team_stats_totals.json?date=${date}`;
      // }
      let url = null;
      if (date != null) {
        url = `${this.apiRoot2021}/team_stats_totals.json?date=${date}`;
      } else {
        url = `${this.apiRoot2021}/team_stats_totals.json`;
      }
      this.teamstats = this.http.get(url, {headers})
      return this.teamstats;
  }

  getInfo() {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,C,OT,NT,DT,DE`;
    //console.log('getting active player data from API...');
    this.info = this.http.get(url, {headers})
    return this.info;
  }

  getStarterInfo(players) {
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/players.json?position=G,C,OT,NT,DT,DE&player=${players}`;
    //console.log('getting active player data from API...');
    this.starterInfo = this.http.get(url, {headers})
    return this.starterInfo;
  }

   getDaily(selected, players) {
   // pass in week
   // if (!this.daily) {
      //let url = `${this.apiRoot}/daily_player_stats.json?fordate=`+dailyDate+`&position=P`;
      // let url = null;
      // if (parseInt(sWeek) > 17) {
      //   url = `${this.apiRootPO}/week/${selected}/player_gamelogs.json?position=G,C,OT,NT,DT,DE`;
      // } else {
      //   url = `${this.apiRoot}/week/${selected}/player_gamelogs.json?position=G,C,OT,NT,DT,DE`;
      // }
      let url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular/week/${selected}/player_gamelogs.json?player=${players}`;
      this.daily = this.http.get(url, {headers})
      return this.daily;
  }

  public dailyTeams(selected) {  
    let url = `https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular/week/${selected}/team_gamelogs.json?`;
    this.dailyT = this.http.get(url, {headers})
    return this.dailyT;
  }

  getDailyTouches(selected) {
    // pass in week
    // if (!this.daily) {
       //let url = `${this.apiRoot}/daily_player_stats.json?fordate=`+dailyDate+`&position=P`;
      // let url = null;
      // if (parseInt(sWeek) > 17) {
      //   url = `${this.apiRootPO}/week/${selected}/player_gamelogs.json?position=WR,TE,RB,QB`;
      // } else {
      //   url = `${this.apiRoot}/week/${selected}/player_gamelogs.json?position=WR,TE,RB,QB`;
      // }
       let url = `${apiRoot}/week/${selected}/player_gamelogs.json?position=WR,TE,RB,QB`;
       this.daily = this.http.get(url, {headers})
       return this.daily;
   }

  getWeek(selected) {
      // let url = null;
      // if (parseInt(sWeek) > 17) {
      //   url = `${this.apiRootPO}/week/${selected}/team_gamelogs.json`;
      // } else {
      //   url = `${this.apiRoot}/week/${selected}/team_gamelogs.json`;
      // }
       let url = `${apiRoot}/week/${selected}/team_gamelogs.json`;
       this.weekly = this.http.get(url, {headers})
       return this.weekly;
   }

  getScore(data) {
      let id = null;
      id = data
      // let url = null;
      // if (parseInt(sWeek) > 17) {
      //   url = `${this.apiRootPO}/games/`+id+`/boxscore.json`;
      // } else {
      //   url = `${this.apiRoot}/games/`+id+`/boxscore.json`;
      // }
    //if (!this.score) {
      //console.log(`${this.apiRoot}/games/`+id+`/boxscore.json`, 'getting daily scores of todays games from API...');
      let url = `${apiRoot}/games/`+id+`/boxscore.json`;
      this.score = this.http.get(url, {headers})
      return this.score;
  }

  getLastweekGameId() {

    if (!this.lastweekgameid) {
      console.log('getting 1 week of games from API...');
      // let url = null;
      // if (parseInt(sWeek) > 17) {
      //   url = `${this.apiRootPO}/games.json?date=from-`+lastweekDailyDate+`-to-`+yesterdayDailyDate;
      // } else {
      //   url = `${this.apiRoot}/games.json?date=from-`+lastweekDailyDate+`-to-`+yesterdayDailyDate;
      // }
      let url = `${apiRoot}/games.json?date=from-`+lastweekDailyDate+`-to-`+yesterdayDailyDate;
      this.lastweekgameid = this.http.get(url, {headers})
        
    }
    return this.lastweekgameid;
  }
}
