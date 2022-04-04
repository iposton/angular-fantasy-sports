import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { HttpClient, HttpHeaders } from '@angular/common/http'

let thisDate = new Date();
let tomorrowDate = new Date(thisDate.getTime() + (24 * 60 * 60 * 1000));
let daTomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
let yesterdayDate = new Date(thisDate.getTime() - (24 * 60 * 60 * 1000));
let lastweekDate = new Date(thisDate.getTime() - (168 * 60 * 60 * 1000));
let twoWeekDate = new Date(thisDate.getTime() - (336 * 60 * 60 * 1000));
let threeWeekDate = new Date(thisDate.getTime() - (552 * 60 * 60 * 1000));

let utcDate = new Date(thisDate.toUTCString());
let tomorrowUtcDate = new Date(tomorrowDate.toUTCString());
let daTomorrowUtcDate = new Date(daTomorrowDate.toUTCString());
let yesterdayUtcDate = new Date(yesterdayDate.toUTCString());
let lastweekUtcDate = new Date(lastweekDate.toUTCString());
let twoWeekUtcDate = new Date(twoWeekDate.toUTCString());
let threeWeekUtcDate = new Date(threeWeekDate.toUTCString());

utcDate.setHours(utcDate.getHours() - 8);
tomorrowUtcDate.setHours(tomorrowUtcDate.getHours() - 8);
daTomorrowUtcDate.setHours(daTomorrowUtcDate.getHours() - 8);
yesterdayUtcDate.setHours(yesterdayUtcDate.getHours() - 8);
lastweekUtcDate.setHours(lastweekUtcDate.getHours() - 8);
twoWeekUtcDate.setHours(twoWeekUtcDate.getHours() - 8);
threeWeekUtcDate.setHours(threeWeekUtcDate.getHours() - 8);

let myDate = new Date(utcDate);
let tomorrowMyDate = new Date(tomorrowUtcDate);
let daTomorrowMyDate = new Date(daTomorrowUtcDate);
let yesterdayMyDate = new Date(yesterdayUtcDate);
let lastweekMyDate = new Date(lastweekUtcDate);
let twoWeekMyDate = new Date(twoWeekUtcDate);
let threeWeekMyDate = new Date(threeWeekUtcDate);

//DATE FORMAT FOR DAILY SCHEDULE API
let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
let tomorrowDailyDate = tomorrowMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let dayAfterTomorrow = daTomorrowMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let yesterdayDailyDate = yesterdayMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let lastweekDailyDate = lastweekMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let twoWeekDailyDate = twoWeekMyDate.toISOString().slice(0, 10).replace(/-/g, "");
let threeWeekDailyDate = threeWeekMyDate.toISOString().slice(0, 10).replace(/-/g, "");

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK
let today = myDate.toISOString().slice(0, 10);
let tomorrow = tomorrowMyDate.toISOString().slice(0, 10);
let afterTomorrow = daTomorrowMyDate.toISOString().slice(0, 10); 
let yesterday = yesterdayMyDate.toISOString().slice(0, 10);
let lastweek = lastweekMyDate.toISOString().slice(0, 10);

let headers = null

let sending;
let sent;
let sendingHot;
let sentHot;
let sendingAll;
let sentAll;


//console.log(dailyDate, 'today\'s date');

@Injectable({ providedIn: 'root' }) 
export class NHLDataService {
  public goalies: any
  
  public headers: any;
  public dailyDate: string = '';
  public isToday: boolean = false;
  public isTomorrow: boolean = false;
  public isPast: boolean = false;
  public nbaTeamsSched: Array <any> = [];
  public nhlTeamsSched: Array <any> = [];
  public isPlayoffs: boolean = false;
  public si: any;

  constructor(private http: HttpClient) {
     this.dailyDate = dailyDate
     //console.log(this.isPlayoffs, 'is playoffs onInit?')
  }

  public selectedDate(d) {
    dailyDate = d;
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

    if (dailyDate < this.dailyDate) {
      this.isPast = true;
    } else {
      this.isPast = false;
    }

    // console.log('is Today?', this.isToday, 'day checked');
    // console.log('is Tomorrow?', this.isTomorrow, 'day checked');
    // console.log('is Past?', this.isPast, 'day checked');
  }

  sendHeaderOptions(h) {
    headers = h;
  }

  public serverInfo(sport, season, feedType, dateBegin, dateEnd, player, position, team, selectedDate, isToday, dataType, haveSchedules, selectedWeek) {
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded')
    let fromTo = tomorrowDailyDate === dailyDate ? `from-${this.dailyDate}-to-${dayAfterTomorrow}` : `from-${yesterdayDailyDate}-to-${tomorrowDailyDate}`
    let fromToWeek = `from-20220328-to-20220403`
    let fromToNext = `from-20220404-to-20220410`
    let strTeam = JSON.stringify(team)
    let data = `query=${sport}&dailyDate=${dailyDate}&season=${season}&feedType=${feedType}&position=${position}&selectedDate=${selectedDate}&isToday=${isToday}&dataType=${dataType}&fromTo=${fromTo}&fromToWeek=${fromToWeek}&fromToNext=${fromToNext}&team=${strTeam}&haveSchedules=${haveSchedules}&player=${player}&selectedWeek=${selectedWeek}`
    try {
      this.si = this.http.post('/info', data, {headers})
      return this.si
    } catch (e) {
      console.log(e, 'error')
    }
  }

  public myStats(sport, season, feedType, feedType2, feedType3, player, position, team, selectedDate, isToday, dataType, playerType, nflWeek, liveUpdate, span, haveSchedules) {
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded')
    let fromTo = tomorrowDailyDate === dailyDate ? `from-${this.dailyDate}-to-${dayAfterTomorrow}` : `from-${yesterdayDailyDate}-to-${tomorrowDailyDate}`
    let strTeam = JSON.stringify(team)
    let spanDate = ''
    if (span === 'last-week') {
      spanDate = `from-${lastweekDailyDate}-to-${dailyDate}`
    } else if (span === 'yesterday') {
      spanDate = `${yesterdayDailyDate}`
    } else if (span === 'today') {
      spanDate = `${dailyDate}`
    } else if (span === 'two-weeks') {
      spanDate = `from-${twoWeekDailyDate}-to-${dailyDate}`
    } else if (span === 'three-weeks') {
      spanDate = `from-${threeWeekDailyDate}-to-${dailyDate}`
    }
    let data = `query=${sport}&dailyDate=${dailyDate}&season=${season}&feedType=${feedType}&feedType2=${feedType2}&feedType3=${feedType3}&position=${position}&selectedDate=${selectedDate}&isToday=${isToday}&dataType=${dataType}&fromTo=${fromTo}&team=${strTeam}&player=${player}&playerType=${playerType}&nflWeek=${nflWeek}&liveUpdate=${liveUpdate}&spanDate=${spanDate}&haveSchedules=${haveSchedules}`
    try {
      this.si = this.http.post('/stats', data, {headers})
      return this.si
    } catch (e) {
      console.log(e, 'error')
    }
  }



  getYesterday() {
    if (tomorrowDailyDate === dailyDate) {
      return today; 
    } else {
      return yesterday;
    } 
  }

  getToday() {
    //console.log("send today..."); 
    if (tomorrowDailyDate === dailyDate) {
      return tomorrow; 
    } else {
      return today;
    }
  }

  getTomorrow() {
    if (tomorrowDailyDate === dailyDate) {
      return afterTomorrow;
    } else {
      return tomorrow;
    }   
  }

  getLastweek() {
    //console.log("send lastweek..."); 
    return lastweek;
  }

  sendStats(statsArray, allStats) {
    sending = statsArray;
    sendingAll = allStats;
  }

 sendHotStats(hotstatsArray) {
    console.log("sending hot stats to service...");
    sendingHot = hotstatsArray;
  }

  getSentStats() {
    sent = sending;
    return sent;
  }

  getSentAllStats() {
    sentAll = sendingAll;
    return sentAll;
  }

  getSentHotStats() {
    sentHot = sendingHot;
    return sentHot;
  }

  // public getGoalies() {
  //   let url = `https://ejs-ssr.herokuapp.com/nhlgoalies`
  //   this.goalies = this.http.get(url)
  //   return this.goalies;
  // }

  public iceTimeAvg(time, gp) {
    return Math.floor((time / gp) / 60);
  }

}