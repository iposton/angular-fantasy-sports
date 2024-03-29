import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  public mobile: boolean
  public tb: boolean
  public nflWeek: any
  public weeklyTS: object
  public weeklyPS: object

  constructor() {
    this.mobile = false
    this.tb = false

    this.weeklyTS = {
      pa: 21,
      ty: 300,
      sacks: 2,
      passTD: 1.75,
      rushTD: 1,
      fp: 70,
      int: .5,
      pd: 4,
      defFP: 6,
      fum: .5,
      safe: 0,
      rya: 105
    }

    this.weeklyPS = {
      sacks: .25,
      rbRecTD: .10,
      wrRecTD: .50,
      rushTD: .50,
      passTD: 1,
      totTD: 1,
      fp: 70,
      int: .25,
      pd: 4,
      defFP: 6,
      fum: .5,
      tackles: 6,
      rbTotYds: 50,
      wrTotYds: 75,
      rbRec: 1,
      wrRec: 3.5
    }
  }

  public colorLuminance(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
      hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
      c = parseInt(hex.substr(i*2,2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00"+c).substr(c.length);
    }
    return rgb;
  }

  public teamInfo(array, teams) {
    for (let team of teams) {
      for (let data of array) { 
        if (data.player['currentTeam'] != null 
        && team['id'] === data.player['currentTeam'].id 
        && data.player['currentTeam'].id === data.team.id 
        || data.player['currentTeam'] != null  && team['id'] === data.player['currentTeam'].id) {
          data.team.logo = team['officialLogoImageSrc'];
          data.team.city = team['city'];
          data.team.name = team['name'];
          data.team.abbreviation = team['abbreviation'];
          data.team.twitter = team['twitter'] ? team['twitter'] : '';
          data.player.twitterHandle = team['twitter'] ? team['twitter'] : '';
          //nfl
          if (team['dtr'] != null && data.playerType != null && data.playerType === 'o') {
            data.team.dtr = team['dtr'];
            data.team.dfh = team['dfh'];
            data.team.dsh = team['dsh'];
            data.team.scheduleTicker = team['scheduleTicker'];
            data.team.weekOpponent = team['weekOpponent'];
          }
          if (team['otr'] != null && data.playerType != null && data.playerType === 'd') {
            data.team.otr = team['otr'];
            data.team.ofh = team['ofh'];
            data.team.osh = team['osh'];
            data.team.scheduleTicker = team['scheduleTicker'];
            data.team.weekOpponent = team['weekOpponent'];
          }
              
        }
      }
    }
  }

  public removeDuplicatesBy(keyFn, array) {
    var mySet = new Set();
    return array.filter(function(x) {  
        var key = keyFn(x), isNew = !mySet.has(key);
        if (isNew) mySet.add(key);  
        return isNew;
    });
  }

  public teamRecord(teams, players) {
    for (let team of teams) {
      for (let data of players) { 
        if (data.team.opponentId != null && data.player['currentTeam'] != null && 
        data.player['currentTeam'].id === team.team.id) {
          data.win = team.stats.standings.wins;
          data.loss = team.stats.standings.losses;
          if (team.stats.standings.overtimeLosses != null)
            data.otl = team.stats.standings.overtimeLosses;
        } else if (data.player.lineupTeam === team.team.abbreviation) { 
          data.win = team.stats.standings.wins;
          data.loss = team.stats.standings.losses;
          if (team.stats.standings.overtimeLosses != null)
            data.otl = team.stats.standings.overtimeLosses;
        }
      }  
    }
  }
  
  public round(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  public tomorrow(date, day) {
    let days = 1;
    if (day) {
      date = new Date();
      days = 1;
    } else {
      days = 2;
    }
    const tomorrow = new Date(date);
    tomorrow.setDate(tomorrow.getDate() + days);
    tomorrow.setHours(tomorrow.getHours() - 8);
    return new Date(tomorrow);
  }

  public formatTime(time) {
    let utcDate = null;
    let selectedDate = null
    utcDate = new Date(time);
    selectedDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
    return new Date(selectedDate);
  }

  public updatePlayers(info, players, teams) {
    //console.log(info, 'player info')
    for (let n of info) {
      //console.log(n, 'palyer info item')
      for (let old of players) {
        if (old.player['currentTeam'] != null)
          old.player['currentTeam'].lastYearTeamId = old.player['currentTeam'] != null ? old.player['currentTeam'].id : 0;
        if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
          if (old.player['currentTeam'] != null) {
            old.player['currentTeam'].id = n['teamAsOfDate'].id
            old.player['currentTeam'].abbreviation = n['teamAsOfDate'].abbreviation
          } else if (old.player['currentTeam'] == null) {
            old.player['currentTeam'] = {id: n['teamAsOfDate'].id}
          } 
          old.team.id = n['teamAsOfDate'].id;    
          old.team.abbreviation = n['teamAsOfDate'].abbreviation;

          if (old.player.id === 9712) {
            old.player['currentTeam'].id = 55
            old.team.id = 55
            old.team.abbreviation = 'WAS'
          }

          old.player.unsigned = false
          if (old.player.id === 8100) {
            old.player.unsigned = true
          }

          if (old.player.rookie) {
            old.player.rookie = n.player.drafted != null && n.player.drafted.year == 2022 ? true : false
            old.player.actualRookie = n.player.drafted != null && n.player.drafted.year == 2022 ? true : false
          }

        }

        if (n.player.id === old.player.id && n['teamAsOfDate'] == null) {
          old.player.unsigned = true
        }

        if (n.player.rookie) {
          n.stats = {drafted: {overallPick: n.player.drafted != null ? n.player.drafted.overallPick : 9000}}
        }
        
      }
    }
    this.teamInfo(players, teams)
  }
}
