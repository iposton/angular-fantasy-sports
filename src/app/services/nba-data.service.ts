import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

let sending;
let sent;
let sendingMyData;
let sendingSched;
let sentMyData;
let sentSched;
let sendingAll;
let sentAll;
let thisDate = new Date();
let utcDate = new Date(thisDate.toUTCString());
utcDate.setHours(utcDate.getHours() - 8);
let myDate = new Date(utcDate);
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");

let tomorrowDate = new Date(thisDate.getTime() + (24 * 60 * 60 * 1000));
let tutcDate = new Date(tomorrowDate.toUTCString());
tutcDate.setHours(tutcDate.getHours() - 8);
let tmyDate = new Date(tutcDate);
let tomorrowDailyDate = tmyDate.toISOString().slice(0, 10).replace(/-/g, "");

@Injectable({
  providedIn: 'root'
})

export class NBADataService {

  public dailyDate: any;
  public isTomorrow: boolean = false;
  public isToday: boolean = false;
  public isPlayoffs: boolean = false;

  constructor(private http: HttpClient) {
    this.dailyDate = dailyDate
  }

  public selectedDate(d) {
    dailyDate = d
  }

  public checkDay() {
    if (dailyDate === tomorrowDailyDate) {
      this.isTomorrow = true;
    } else {
      this.isTomorrow = false;
    }
    
    if (dailyDate === this.dailyDate) {
      this.isToday = true;
    } else {
      this.isToday = false;
    }

  }

  sendStats(statsArray, myData, schedule) {
    sending = statsArray;
    sendingMyData = myData;
    sendingSched = schedule;
  }

  getSentStats() {
    let allDataArr = [];
    sent = sending
    sentMyData = sendingMyData
    sentSched = sendingSched
    allDataArr.push(sent, sentMyData, sentSched)
    return allDataArr
  }

  sendAllStats(allstatsArray) {
    sendingAll = allstatsArray
  }

  getAllSentStats() {
    sentAll = sendingAll
    return sentAll
  }

}
