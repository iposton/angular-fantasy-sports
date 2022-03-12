import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  public dailyDate: any;
  public isToday: boolean = false;
  public isPlayoffs: boolean = false;

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate
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

  // getPrevGameId() {
  //   let url = `/games.json?date=from-8-days-ago-to-5-days-ago`;
  //   this.gameid = this.http.get(url, {headers})
  //   return this.gameid;
  // }


  public imageSwap(src) {
    let specialImgNum = null;
    specialImgNum = src.substring(
      src.lastIndexOf("/") + 1, 
      src.lastIndexOf(".")
    );
    return `https://img.mlbstatic.com/mlb-photos/image/upload/w_213,q_100/v1/people/${specialImgNum}/headshot/67/current`;
  }
}
