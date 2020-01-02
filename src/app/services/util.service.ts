import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public weekTimes: Array<any> = []; 
  public byes: any; 

  constructor() {
    this.weekTimes = [
      {
        dateBeg: 'Tue Oct 01 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Oct 08 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '5'
      },
      {
        dateBeg: 'Tue Oct 8 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Oct 15 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '6'
      },
      {
        dateBeg: 'Tue Oct 15 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Oct 22 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '7'
      },
      {
        dateBeg: 'Tue Oct 22 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Oct 29 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '8'
      },
      {
        dateBeg: 'Tue Oct 29 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Nov 05 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '9'
      },
      {
        dateBeg: 'Tue Nov 05 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Nov 12 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '10'
      },
      {
        dateBeg: 'Tue Nov 12 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Nov 19 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '11'
      },
      {
        dateBeg: 'Tue Nov 19 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Nov 26 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '12'
      },
      {
        dateBeg: 'Tue Nov 26 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Dec 03 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '13'
      },
      {
        dateBeg: 'Tue Dec 03 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Dec 10 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '14'
      },
      {
        dateBeg: 'Tue Dec 10 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Dec 17 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '15'
      },
      {
        dateBeg: 'Tue Dec 17 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Dec 24 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '16'
      },
      {
        dateBeg: 'Tue Dec 24 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Dec 31 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '17'
      }
    ]

    this.byes = {
      "ATL": {
        id: 68,
        abbreviation: "ATL",
        bye: 9,
        toughestSchedRank: 6,
        gamesAgainst500Teams: 8,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 6
      }, 
      "CAR": {
        id: 69,
        abbreviation: "CAR",
        bye: 7,
        toughestSchedRank: 25,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 1,
        lossAgainst500Teams: 5
      },
      "NO": {
        id: 70,
        abbreviation: "NO",
        bye: 9,
        ttoughestSchedRank: 21,
        gamesAgainst500Teams: 5,
        winsAgainst500Teams: 3,
        lossAgainst500Teams: 2
      },
      "TB": {
        id: 71,
        abbreviation: "TB",
        bye: 7,
        toughestSchedRank: 10,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 4
      },
      "HOU": {
        id: 64,
        abbreviation: "HOU",
        bye: 10,
        toughestSchedRank: 9,
        gamesAgainst500Teams: 8,
        winsAgainst500Teams: 5,
        lossAgainst500Teams: 3
      },
      "IND": {
        id: 65,
        abbreviation: "IND",
        bye: 6,
        toughestSchedRank: 26,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 4
      },
      "JAX": {
        id: 66,
        abbreviation: "JAX",
        bye: 10,
        toughestSchedRank: 16,
        gamesAgainst500Teams: 5,
        winsAgainst500Teams: 0,
        lossAgainst500Teams: 5
      },
      "TEN": {
        id: 67,
        abbreviation: "TEN",
        bye: 11,
        toughestSchedRank: 28,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 3,
        lossAgainst500Teams: 3
      },
      "ARI": {
        id: 76,
        abbreviation: "ARI",
        bye: 12,
        toughestSchedRank: 17,
        gamesAgainst500Teams: 7,
        winsAgainst500Teams: 0,
        lossAgainst500Teams: 7
      },
      "LA": {
        id: 77,
        abbreviation: "LA",
        bye: 9,
        toughestSchedRank: 27,
        gamesAgainst500Teams: 5,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 3
      },
      "SF": {
        id: 78,
        abbreviation: "SF",
        bye: 4,
        toughestSchedRank: 30,
        gamesAgainst500Teams: 5,
        winsAgainst500Teams: 3,
        lossAgainst500Teams: 2
      },
      "SEA": {
        id: 79,
        abbreviation: "SEA",
        bye: 11,
        toughestSchedRank: 22,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 3,
        lossAgainst500Teams: 3
      },
      "DEN": {
        id: 72,
        abbreviation: "DEN",
        bye: 10,
        toughestSchedRank: 14,
        gamesAgainst500Teams: 8,
        winsAgainst500Teams: 1,
        lossAgainst500Teams: 7
      },
      "KC": {
        id: 73,
        abbreviation: "KC",
        bye: 12,
        toughestSchedRank: 2,
        gamesAgainst500Teams: 8,
        winsAgainst500Teams: 5,
        lossAgainst500Teams: 3
      },
      "OAK": {
        id: 74,
        abbreviation: "OAK",
        bye: 6,
        toughestSchedRank: 12,
        gamesAgainst500Teams: 7,
        winsAgainst500Teams: 1,
        lossAgainst500Teams: 6
      },
      "LAC": {
        id: 75,
        abbreviation: "LAC",
        bye: 12,
        toughestSchedRank: 7,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 4
      },
      "NYJ": {
        id: 51,
        abbreviation: "NYJ",
        bye: 4,
        toughestSchedRank: 24,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 4
      },
      "NE": {
        id: 50,
        abbreviation: "NE",
        bye: 10,
        toughestSchedRank: 31,
        gamesAgainst500Teams: 5,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 3
      },
      "MIA": {
        id: 49,
        abbreviation: "MIA",
        bye: 5,
        toughestSchedRank: 5,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 1,
        lossAgainst500Teams: 5
      },
      "BUF": {
        id: 48,
        abbreviation: "BUF",
        bye: 6,
        toughestSchedRank: 32,
        gamesAgainst500Teams: 4,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 2
      },
      "WAS": {
        id: 55,
        abbreviation: "WAS",
        bye: 10,
        toughestSchedRank: 13,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 0,
        lossAgainst500Teams: 6
      },
      "PHI": {
        id: 54,
        abbreviation: "PHI",
        bye: 10,
        toughestSchedRank: 8,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 4
      },
      "NYG": {
        id: 53,
        abbreviation: "NYG",
        bye: 11,
        toughestSchedRank: 18,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 0,
        lossAgainst500Teams: 6
      },
      "DAL": {
        id: 52,
        abbreviation: "DAL",
        bye: 8,
        toughestSchedRank: 29,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 1,
        lossAgainst500Teams: 5
      },
      "PIT": {
        id: 59,
        abbreviation: "PIT",
        bye: 7,
        toughestSchedRank: 4,
        gamesAgainst500Teams: 7,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 5
      },
      "CLE": {
        id: 58,
        abbreviation: "CLE",
        bye: 7,
        toughestSchedRank: 3,
        gamesAgainst500Teams: 7,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 5
      },
      "CIN": {
        id: 57,
        abbreviation: "CIN",
        bye: 9,
        toughestSchedRank: 1,
        gamesAgainst500Teams: 8,
        winsAgainst500Teams: 0,
        lossAgainst500Teams: 8
      },
      "BAL": {
        id: 56,
        abbreviation: "BAL",
        bye: 8,
        toughestSchedRank: 20,
        gamesAgainst500Teams: 7,
        winsAgainst500Teams: 6,
        lossAgainst500Teams: 1
      },
      "MIN": {
        id: 63,
        abbreviation: "MIN",
        bye: 12,
        toughestSchedRank: 23,
        gamesAgainst500Teams: 5,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 3
      },
      "GB": {
        id: 62,
        abbreviation: "GB",
        bye: 11,
        toughestSchedRank: 19,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 5,
        lossAgainst500Teams: 1
      },
      "DET": {
        id: 61,
        abbreviation: "DET",
        bye: 5,
        toughestSchedRank: 15,
        gamesAgainst500Teams: 6,
        winsAgainst500Teams: 0,
        lossAgainst500Teams: 6
      },
      "CHI": {
        id: 60,
        abbreviation: "CHI",
        bye: 6,
        toughestSchedRank: 11,
        gamesAgainst500Teams: 7,
        winsAgainst500Teams: 2,
        lossAgainst500Teams: 5
      },
     }
  }

  public getWeekTimes() {
    return this.weekTimes;
  }

  public getByes() {
    return this.byes;
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

  
}
