import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public weekTimes: Array<any> = []; 
  public byes: any; 
  public nbaTeams: any;
  public nflTeams: any;
  public NBAImages: any;
  public NHLImages: any;

  constructor() {
    this.weekTimes = [
      {
        dateBeg: 'Tue Sep 6 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Sep 11 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '1'
      },
      {
        dateBeg: 'Tue Sep 11 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Sep 18 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '2'
      },
      {
        dateBeg: 'Tue Sep 18 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Sep 25 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '3'
      },
      {
        dateBeg: 'Tue Sep 25 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Oct 01 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '4'
      },
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
      },
      {
        dateBeg: 'Tue Dec 31 2019 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Jan 07 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '18'
      },
      {
        dateBeg: 'Tue Jan 07 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Jan 14 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '19'
      },
      {
        dateBeg: 'Tue Jan 14 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Jan 21 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '20' //afc nfc final 4
      },
      {
        dateBeg: 'Tue Jan 21 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        dateEnd: 'Tue Feb 04 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        week: '22' //super bowl
      }
    ]

    this.NHLImages = {
      "17374": {
        firstName: "Igor",
        lastName: "Shesterkin",
        image: "https://nhl.bamcontent.com/images/headshots/current/168x168/8478048@2x.jpg"
      },
      "17380": {
        firstName: "Jonas",
        lastName: "Johansson",
        image: "https://nhl.bamcontent.com/images/headshots/current/168x168/8477992@2x.jpg"
      },
      "15384": {
        firstName: "Calvin",
        lastName: "Petersen",
        image: "https://nhl.bamcontent.com/images/headshots/current/168x168/8477361@2x.jpg"
      },
      "17341": {
        firstName: "Matiss",
        lastName: "Kivlenieks",
        image: "https://nhl.bamcontent.com/images/headshots/current/168x168/8480162@2x.jpg"
      },
      // "17374": {
      //   firstName: "Igor",
      //   lastName: "Shesterkin",
      //   image: "https://nhl.bamcontent.com/images/headshots/current/168x168/8478048@2x.jpg"
      // }
    }

    this.NBAImages = {
      "16958": {
        firstName: "Zion",
        lastName: "Williamson",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612740/2019/260x190/1629627.png"
      },
      "17189": {
        firstName: "Ja",
        lastName: "Morant",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612763/2019/260x190/1629630.png"
      },
      "17191": {
        firstName: "Darius",
        lastName: "Garland",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612739/2019/260x190/1629636.png"
      },
      "17273": {
        firstName: "P.J.",
        lastName: "Washington",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612766/2019/260x190/1629023.png"
      },
      "15252": {
        firstName: "Kendrick",
        lastName: "Nunn",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612748/2019/260x190/1629134.png"
      },
      "17181": {
        firstName: "RJ",
        lastName: "Barrett",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612752/2019/260x190/1629628.png"
      },
      "17196": {
        firstName: "Cam",
        lastName: "Reddish",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612737/2019/260x190/1629629.png"
      },
      "17192": {
        firstName: "Jarett",
        lastName: "Culver",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612750/2019/260x190/1629633.png"
      },
      "17190": {
        firstName: "De'Andre",
        lastName: "Hunter",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612737/2019/260x190/1629631.png"
      },
      "17195": {
        firstName: "Rui",
        lastName: "Hachimura",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612764/2019/260x190/1629060.png"
      },
      "17286": {
        firstName: "Kevin",
        lastName: "Porter Jr.",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612739/2019/260x190/1629645.png"
      },
      "17331": {
        firstName: "Ky",
        lastName: "Bowman",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612744/2019/260x190/1629065.png"
      },
      "17197": {
        firstName: "Cameron",
        lastName: "Johnson",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612756/2019/260x190/1629661.png"
      },
      "17251": {
        firstName: "Brandon",
        lastName: "Clarke",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612763/2019/260x190/1629634.png"
      },
      "17256": {
        firstName: "Sekou",
        lastName: "Doumbouya",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612765/2019/260x190/1629635.png"
      },
      "17216": {
        firstName: "Terence",
        lastName: "Davis",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/1610612761/2019/260x190/1629056.png"
      },
      // "111": {
      //   firstName: "Kevin",
      //   lastName: "Porter Jr.",
      //   image: "png"
      // },
      // "111": {
      //   firstName: "Kevin",
      //   lastName: "Porter Jr.",
      //   image: "png"
      // },
      // "111": {
      //   firstName: "Kevin",
      //   lastName: "Porter Jr.",
      //   image: "png"
      // },
      // "111": {
      //   firstName: "Kevin",
      //   lastName: "Porter Jr.",
      //   image: "png"
      // }
    }

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

     this.nflTeams = [
      {
      id: 48,
      city: "Buffalo",
      name: "Bills",
      abbreviation: "BUF",
      homeVenue: {
      id: 46,
      name: "New Era Field"
      },
      teamColoursHex: [
      "#00338d",
      "#c60c30"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "BuffaloBills"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/giphcy6ie9mxbnldntsf"
      },
      {
      id: 49,
      city: "Miami",
      name: "Dolphins",
      abbreviation: "MIA",
      homeVenue: {
      id: 59,
      name: "Hard Rock Stadium"
      },
      teamColoursHex: [
      "#008e97",
      "#fc4c02",
      "#005778"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "MiamiDolphins"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/lits6p8ycthy9to70bnt"
      },
      {
      id: 50,
      city: "New England",
      name: "Patriots",
      abbreviation: "NE",
      homeVenue: {
      id: 61,
      name: "Gillette Stadium"
      },
      teamColoursHex: [
      "#002244",
      "#c60c30",
      "#b0b7bc"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Patriots"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/moyfxx3dq5pio4aiftnc"
      },
      {
      id: 51,
      city: "New York",
      name: "Jets",
      abbreviation: "NYJ",
      homeVenue: {
      id: 63,
      name: "MetLife Stadium"
      },
      teamColoursHex: [
      "#125740",
      "#000000",
      "#ffffff"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "nyjets"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ekijosiae96gektbo4iw"
      },
      {
      id: 52,
      city: "Dallas",
      name: "Cowboys",
      abbreviation: "DAL",
      homeVenue: {
      id: 51,
      name: "AT&T Stadium"
      },
      teamColoursHex: [
      "#003594",
      "#041e42",
      "#869397",
      "#7f9695",
      "#ffffff"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "dallascowboys"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ieid8hoygzdlmzo0tnf6"
      },
      {
      id: 53,
      city: "New York",
      name: "Giants",
      abbreviation: "NYG",
      homeVenue: {
      id: 63,
      name: "MetLife Stadium"
      },
      teamColoursHex: [
      "#0b2265",
      "#a71930",
      "#a5acaf"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Ginats"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/t6mhdmgizi6qhndh8b9p"
      },
      {
      id: 54,
      city: "Philadelphia",
      name: "Eagles",
      abbreviation: "PHI",
      homeVenue: {
      id: 65,
      name: "Lincoln Financial Field"
      },
      teamColoursHex: [
      "#004c54",
      "#a5acaf",
      "#acc0c6",
      "#000000",
      "#565a5c"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Eagles"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/puhrqgj71gobgdkdo6uq"
      },
      {
      id: 55,
      city: "Washington",
      name: "Redskins",
      abbreviation: "WAS",
      homeVenue: {
      id: 73,
      name: "FedEx Field"
      },
      teamColoursHex: [
      "#773141",
      "#ffb612"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Redskins"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/haxrowry8puwbrixjdmc"
      },
      {
      id: 56,
      city: "Baltimore",
      name: "Ravens",
      abbreviation: "BAL",
      homeVenue: {
      id: 45,
      name: "M&T Bank Stadium"
      },
      teamColoursHex: [
      "#241773",
      "#000000",
      "#9e7c0c",
      "#c60c30"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Ravens"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ucsdijmddsqcj1i9tddd"
      },
      {
      id: 57,
      city: "Cincinnati",
      name: "Bengals",
      abbreviation: "CIN",
      homeVenue: {
      id: 49,
      name: "Paul Brown Stadium"
      },
      teamColoursHex: [
      "#fb4f14",
      "#000000"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Bengals"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/okxpteoliyayufypqalq"
      },
      {
      id: 58,
      city: "Cleveland",
      name: "Browns",
      abbreviation: "CLE",
      homeVenue: {
      id: 50,
      name: "FirstEnergy Stadium"
      },
      teamColoursHex: [
      "#311d00",
      "#ff3c00",
      "#ffffff"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Browns"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/grxy59mqoflnksp2kocc"
      },
      {
      id: 59,
      city: "Pittsburgh",
      name: "Steelers",
      abbreviation: "PIT",
      homeVenue: {
      id: 66,
      name: "Heinz Field"
      },
      teamColoursHex: [
      "#ffb612",
      "#101820",
      "#003087",
      "#c60c30",
      "#a5acaf"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "steelers"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/xujg9t3t4u5nmjgr54wx"
      },
      {
      id: 60,
      city: "Chicago",
      name: "Bears",
      abbreviation: "CHI",
      homeVenue: {
      id: 48,
      name: "Soldier Field"
      },
      teamColoursHex: [
      "#0b162a",
      "#c83803"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "ChicagoBears"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ra0poq2ivwyahbaq86d2"
      },
      {
      id: 61,
      city: "Detroit",
      name: "Lions",
      abbreviation: "DET",
      homeVenue: {
      id: 53,
      name: "Ford Field"
      },
      teamColoursHex: [
      "#0076b6",
      "#b0b7bc",
      "#000000",
      "#ffffff"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Lions"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ocvxwnapdvwevupe4tpr"
      },
      {
      id: 62,
      city: "Green Bay",
      name: "Packers",
      abbreviation: "GB",
      homeVenue: {
      id: 54,
      name: "Lambeau Field"
      },
      teamColoursHex: [
      "#203731",
      "#ffb612"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "packers"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gppfvr7n8gljgjaqux2x"
      },
      {
      id: 63,
      city: "Minnesota",
      name: "Vikings",
      abbreviation: "MIN",
      homeVenue: {
      id: 141,
      name: "US Bank Stadium"
      },
      teamColoursHex: [
      "#4f2683",
      "#ffc62f"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Vikings"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/teguylrnqqmfcwxvcmmz"
      },
      {
      id: 64,
      city: "Houston",
      name: "Texans",
      abbreviation: "HOU",
      homeVenue: {
      id: 55,
      name: "NRG Stadium"
      },
      teamColoursHex: [
      "#03202f",
      "#a71930"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "HoustonTexans"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/bpx88i8nw4nnabuq0oob"
      },
      {
      id: 65,
      city: "Indianapolis",
      name: "Colts",
      abbreviation: "IND",
      homeVenue: {
      id: 56,
      name: "Lucas Oil Stadium"
      },
      teamColoursHex: [
      "#002c5f",
      "#a2aaad"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Colts"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ketwqeuschqzjsllbid5"
      },
      {
      id: 66,
      city: "Jacksonville",
      name: "Jaguars",
      abbreviation: "JAX",
      homeVenue: {
      id: 57,
      name: "TIAA Bank Field"
      },
      teamColoursHex: [
      "#101820",
      "#d7a22a",
      "#9f792c",
      "#006778"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Jaguars"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/qycbib6ivrm9dqaexryk"
      },
      {
      id: 67,
      city: "Tennessee",
      name: "Titans",
      abbreviation: "TEN",
      homeVenue: {
      id: 72,
      name: "Nissan Stadium"
      },
      teamColoursHex: [
      "#0c2340",
      "#418fde",
      "#c8102e",
      "#8a8d8f",
      "#a2aaad",
      "#54585a"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Titans"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/pln44vuzugjgipyidsre"
      },
      {
      id: 68,
      city: "Atlanta",
      name: "Falcons",
      abbreviation: "ATL",
      homeVenue: {
      id: 62,
      name: "Mercedes-Benz Stadium"
      },
      teamColoursHex: [
      "#a71930",
      "#000000",
      "#a5acaf"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "AtlantaFalcons"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/d8m7hzpsbrl6pnqht8op"
      },
      {
      id: 69,
      city: "Carolina",
      name: "Panthers",
      abbreviation: "CAR",
      homeVenue: {
      id: 47,
      name: "Bank of America Stadium"
      },
      teamColoursHex: [
      "#0085ca",
      "#101820",
      "#bfc0bf"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Panthers"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ervfzgrqdpnc7lh5gqwq"
      },
      {
      id: 70,
      city: "New Orleans",
      name: "Saints",
      abbreviation: "NO",
      homeVenue: {
      id: 142,
      name: "Mercedes-Benz Superdome"
      },
      teamColoursHex: [
      "#d3bc8d",
      "#101820"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Saints"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/grhjkahghjkk17v43hdx"
      },
      {
      id: 71,
      city: "Tampa Bay",
      name: "Buccaneers",
      abbreviation: "TB",
      homeVenue: {
      id: 71,
      name: "Raymond James Stadium"
      },
      teamColoursHex: [
      "#d50a0a",
      "#ff7900",
      "#0a0a08",
      "#b1babf",
      "#34302b"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Buccaneers"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/szwmxcasfizlkkfn5zwq"
      },
      {
      id: 72,
      city: "Denver",
      name: "Broncos",
      abbreviation: "DEN",
      homeVenue: {
      id: 52,
      name: "Broncos Stadium at Mile High"
      },
      teamColoursHex: [
      "#fb4f14",
      "#002244"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Broncos"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/t0p7m5cjdjy18rnzzqbx"
      },
      {
      id: 73,
      city: "Kansas City",
      name: "Chiefs",
      abbreviation: "KC",
      homeVenue: {
      id: 58,
      name: "Arrowhead Stadium"
      },
      teamColoursHex: [
      "#e31837",
      "#ffb81c"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Chiefs"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/ujshjqvmnxce8m4obmvs"
      },
      {
      id: 74,
      city: "Oakland",
      name: "Raiders",
      abbreviation: "OAK",
      homeVenue: {
      id: 64,
      name: "RingCentral Coliseum"
      },
      teamColoursHex: [
      "#000000",
      "#a5acaf"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Raiders"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gzcojbzcyjgubgyb6xf2"
      },
      {
      id: 75,
      city: "Los Angeles",
      name: "Chargers",
      abbreviation: "LAC",
      homeVenue: {
      id: 140,
      name: "StubHub Center"
      },
      teamColoursHex: [
      "#002a5e",
      "#ffc20e",
      "#0080c6"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Chargers"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/lu22ddatqbdknq4wuazd"
      },
      {
      id: 76,
      city: "Arizona",
      name: "Cardinals",
      abbreviation: "ARI",
      homeVenue: {
      id: 43,
      name: "State Farm Stadium"
      },
      teamColoursHex: [
      "#97233f",
      "#000000",
      "#ffb612"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "AZCardinals"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/u9fltoslqdsyao8cpm0k"
      },
      {
      id: 77,
      city: "Los Angeles",
      name: "Rams",
      abbreviation: "LA",
      homeVenue: {
      id: 74,
      name: "Los Angeles Memorial Coliseum"
      },
      teamColoursHex: [
      "#002244",
      "#866d4b",
      "#ffffff"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "RamsNFL"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/rvmujtvvqlhlviuwafzg"
      },
      {
      id: 78,
      city: "San Francisco",
      name: "49ers",
      abbreviation: "SF",
      homeVenue: {
      id: 68,
      name: "Levi's Stadium"
      },
      teamColoursHex: [
      "#aa0000",
      "#b3995d"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "49ers"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/dxibuyxbk0b9ua5ih9hn"
      },
      {
      id: 79,
      city: "Seattle",
      name: "Seahawks",
      abbreviation: "SEA",
      homeVenue: {
      id: 69,
      name: "CenturyLink Field"
      },
      teamColoursHex: [
      "#002244",
      "#69be28",
      "#a5acaf"
      ],
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "Seahawks"
      }
      ],
      officialLogoImageSrc: "https://static.www.nfl.com/image/private/t_q-best/league/gcytzwpjdzbpwnwxincg"
      }
      ]

     this.nbaTeams = {
      "TOR": {
      id: 81,
      city: "Toronto",
      name: "Raptors",
      abbreviation: "TOR",
      twitter: "#WeTheNorth",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/TOR_logo.svg"
      },
      "BOS": {
      id: 82,
      city: "Boston",
      name: "Celtics",
      abbreviation: "BOS",
      twitter: "#Celtics",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/BOS_logo.svg"
      },
      "NYK": {
      id: 83,
      city: "New York",
      name: "Knicks",
      abbreviation: "NYK",
      twitter: "#NewYorkForever",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/NYK_logo.svg"
      },
      "BRO": {
      id: 84,
      city: "Brooklyn",
      name: "Nets",
      abbreviation: "BRO",
      twitter: "#WeGoHard",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/BKN_logo.svg"
      },
      "PHI": {
      id: 85,
      city: "Philadelphia",
      name: "76ers",
      abbreviation: "PHI",
      twitter: "#PhilaUnite",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/PHI_logo.svg"
      },
      "CLE": {
      id: 86,
      city: "Cleveland",
      name: "Cavaliers",
      abbreviation: "CLE",
      twitter: "#BeTheFight",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/CLE_logo.svg"
      },
      "IND": {
      id: 87,
      city: "Indiana",
      name: "Pacers",
      abbreviation: "IND",
      twitter: "#IndianaStyle",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/IND_logo.svg"
      },
      "DET": {
      id: 88,
      city: "Detroit",
      name: "Pistons",
      abbreviation: "DET",
      twitter: "#DetroitBasketball",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/DET_logo.svg"
      },
      "CHI": {
      id: 89,
      city: "Chicago",
      name: "Bulls",
      abbreviation: "CHI",
      twitter: "#BullsNation",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/CHI_logo.svg"
      },
      "MIL": {
      id: 90,
      city: "Milwaukee",
      name: "Bucks",
      abbreviation: "MIL",
      twitter: "#FearTheDeer",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/MIL_logo.svg"
      },
      "ATL": {
      id: 91,
      city: "Atlanta",
      name: "Hawks",
      abbreviation: "ATL",
      twitter: "#TrueToAtlanta",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/ATL_logo.svg"
      },
      "MIA": {
      id: 92,
      city: "Miami",
      name: "Heat",
      abbreviation: "MIA",
      twitter: "#HeatTwitter",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/MIA_logo.svg"
      },
      "CHA": {
      id: 93,
      city: "Charlotte",
      name: "Hornets",
      abbreviation: "CHA",
      twitter: "#AllFly",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/CHA_logo.svg"
      },
      "WAS": {
      id: 94,
      city: "Washington",
      name: "Wizards",
      abbreviation: "WAS",
      twitter: "#RepTheDistrict",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/WAS_logo.svg"
      },
      "ORL": {
      id: 95,
      city: "Orlando",
      name: "Magic",
      abbreviation: "ORL",
      twitter: "#MagicAboveAll",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/ORL_logo.svg"
      },
      "OKL": {
      id: 96,
      city: "Oklahoma City",
      name: "Thunder",
      abbreviation: "OKL",
      twitter: "#ThunderUp",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/OKC_logo.svg"
      },
      "POR": {
      id: 97,
      city: "Portland",
      name: "Trail Blazers",
      abbreviation: "POR",
      twitter: "#RipCity",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/POR_logo.svg"
      },
      "UTA": {
      id: 98,
      city: "Utah",
      name: "Jazz",
      abbreviation: "UTA",
      twitter: "#TakeNote",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/UTA_logo.svg"
      },
      "DEN": {
      id: 99,
      city: "Denver",
      name: "Nuggets",
      abbreviation: "DEN",
      twitter: "#MileHighBasketball",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/DEN_logo.svg"
      },
      "MIN": {
      id: 100,
      city: "Minnesota",
      name: "Timberwolves",
      abbreviation: "MIN",
      twitter: "#Timberwolves",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/MIN_logo.svg"
      },
      "GSW": {
      id: 101,
      city: "Golden State",
      name: "Warriors",
      abbreviation: "GSW",
      twitter: "#DubNation",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/GSW_logo.svg"
      },
      "LAC": {
      id: 102,
      city: "Los Angeles",
      name: "Clippers",
      abbreviation: "LAC",
      twitter: "#ClipperNation",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/LAC_logo.svg"
      },
      "SAC": {
      id: 103,
      city: "Sacramento",
      name: "Kings",
      abbreviation: "SAC",
      twitter: "#SacramentoProud",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/SAC_logo.svg"
      },
      "PHX": {
      id: 104,
      city: "Phoenix",
      name: "Suns",
      abbreviation: "PHX",
      twitter: "#RisePHX",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/PHX_logo.svg"
      },
      "LAL": {
      id: 105,
      city: "Los Angeles",
      name: "Lakers",
      abbreviation: "LAL",
      twitter: "#LakeShow",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/LAL_logo.svg"
      },
      "SAS": {
      id: 106,
      city: "San Antonio",
      name: "Spurs",
      abbreviation: "SAS",
      twitter: "#GoSpursGo",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/SAS_logo.svg"
      },
      "MEM": {
      id: 107,
      city: "Memphis",
      name: "Grizzlies",
      abbreviation: "MEM",
      twitter: "#GrindCity",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/MEM_logo.svg"
      },
      "DAL": {
      id: 108,
      city: "Dallas",
      name: "Mavericks",
      abbreviation: "DAL",
      twitter: "#MFFL",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/DAL_logo.svg"
      },
      "HOU": {
      id: 109,
      city: "Houston",
      name: "Rockets",
      abbreviation: "HOU",
      twitter: "#OneMission",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/HOU_logo.svg"
      },
      "NOP": {
      id: 110,
      city: "New Orleans",
      name: "Pelicans",
      abbreviation: "NOP",
      twitter: "#WontBowDown",
      officialLogoImageSrc: "https://global.nba.com/media/img/teams/00/logos/NOP_logo.svg"
      }
    }
  }

  public getWeekTimes() {
    return this.weekTimes;
  }

  public getByes() {
    return this.byes;
  }

  public getNBATeams() {
    return this.nbaTeams;
  }

  public getNBAImages() {
    return this.NBAImages;
  }

  public getNHLImages() {
    return this.NHLImages;
  }

  public getNFLTeams() {
    return this.nflTeams;
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
