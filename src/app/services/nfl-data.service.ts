import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

let sending = [];
let sent = [];
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

  public dailyDate: any;
  public touchTeamRanks: any;
  public lineTeamRanks: any;
  public premiumRanks: any;

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate
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

  getYesterday() {
    console.log("send yesterday..."); 
    return yesterday; 
  }

  getLastweek() {
    console.log("send lastweek..."); 
    return lastweek;
  }

}
