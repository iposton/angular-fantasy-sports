import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilService {
  public weekTimes: Array<any> = []; 
  public byes: any; 
  public nbaTeams: any;
  public nflTeams: any;
  public nhlTeams: any;
  public mlbTeams: any;
  public NBAImages: any;
  public NHLImages: any;
  public startingGoalies: any;

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
      "17193": {
        firstName: "Coby",
        lastName: "White",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629632.png"
      },
      "17330": {
        firstName: "Eric",
        lastName: "Paschall",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629672.png"
      },
      "17329": {
        firstName: "Jordan",
        lastName: "Poole",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629673.png"
      },
      "17312": {
        firstName: "Caleb",
        lastName: "Martin",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1628997.png"
      },
      "17255": {
        firstName: "Luguentz",
        lastName: "Dort",
        image: "https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/1629652.png"
      },
      
    }


     this.mlbTeams = [
        {
        id: 111,
        city: "Baltimore",
        name: "Orioles",
        abbreviation: "BAL",
        twitter: "#Birdland",
        homeVenue: {
        id: 123,
        name: "Oriole Park at Camden Yards"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Orioles"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/110.svg"
        },
        {
        id: 112,
        city: "Toronto",
        name: "Blue Jays",
        abbreviation: "TOR",
        twitter: "#BlueJays",
        homeVenue: {
        id: 127,
        name: "Rogers Centre"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "BlueJays"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/141.svg"
        },
        {
        id: 113,
        city: "Boston",
        name: "Red Sox",
        abbreviation: "BOS",
        twitter: "#DirtyWater",
        homeVenue: {
        id: 114,
        name: "Fenway Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "RedSox"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/111.svg"
        },
        {
        id: 114,
        city: "New York",
        name: "Yankees",
        abbreviation: "NYY",
        twitter: "#NYYforNY",
        homeVenue: {
        id: 134,
        name: "Yankee Stadium"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Yankees"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/147.svg"
        },
        {
        id: 115,
        city: "Tampa Bay",
        name: "Rays",
        abbreviation: "TB",
        twitter: "#RaysUp",
        homeVenue: {
        id: 130,
        name: "Tropicana Field"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "RaysBaseball"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/139.svg"
        },
        {
        id: 116,
        city: "Cleveland",
        name: "Indians",
        abbreviation: "CLE",
        twitter: "#OurTribe",
        homeVenue: {
        id: 126,
        name: "Progressive Field"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Indians"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/114.svg"
        },
        {
        id: 117,
        city: "Detroit",
        name: "Tigers",
        abbreviation: "DET",
        twitter: "#DetroitRoots",
        homeVenue: {
        id: 111,
        name: "Comerica Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "tigers"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/116.svg"
        },
        {
        id: 118,
        city: "Kansas City",
        name: "Royals",
        abbreviation: "KC",
        twitter: "#AlwaysRoyal",
        homeVenue: {
        id: 117,
        name: "Kauffman Stadium"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Royals"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/118.svg"
        },
        {
        id: 119,
        city: "Chicago",
        name: "White Sox",
        abbreviation: "CWS",
        twitter: "#ChangetheGame",
        homeVenue: {
        id: 132,
        name: "Guaranteed Rate Field"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "whitesox"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/145.svg"
        },
        {
        id: 120,
        city: "Minnesota",
        name: "Twins",
        abbreviation: "MIN",
        twitter: "#MNTwins",
        homeVenue: {
        id: 129,
        name: "Target Field"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Twins"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/142.svg"
        },
        {
        id: 121,
        city: "Texas",
        name: "Rangers",
        abbreviation: "TEX",
        twitter: "#TogetherWe",
        homeVenue: {
        id: 153,
        name: "Globe Life Field"
        },
        teamColoursHex: [
        "#003278",
        "#c0111f"
        ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Rangers"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/140.svg"
        },
        {
        id: 122,
        city: "Houston",
        name: "Astros",
        abbreviation: "HOU",
        twitter: "#ForTheH",
        homeVenue: {
        id: 120,
        name: "Minute Maid Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "astros"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/117.svg"
        },
        {
        id: 123,
        city: "Seattle",
        name: "Mariners",
        abbreviation: "SEA",
        twitter: "#TrueToTheBlue",
        homeVenue: {
        id: 128,
        name: "T-Mobile Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Mariners"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/136.svg"
        },
        {
        id: 124,
        city: "Los Angeles",
        name: "Angels",
        abbreviation: "LAA",
        twitter: "#GoAngels",
        homeVenue: {
        id: 105,
        name: "Angel Stadium"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Angels"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/108.svg"
        },
        {
        id: 125,
        city: "Oakland",
        name: "Athletics",
        abbreviation: "OAK",
        twitter: "#RootedInOakland",
        homeVenue: {
        id: 64,
        name: "Oakland-Alameda County Coliseum"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Athletics"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/133.svg"
        },
        {
        id: 126,
        city: "Washington",
        name: "Nationals",
        abbreviation: "WAS",
        twitter: "#Natitude",
        homeVenue: {
        id: 121,
        name: "Nationals Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Nationals"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/120.svg"
        },
        {
        id: 127,
        city: "New York",
        name: "Mets",
        abbreviation: "NYM",
        twitter: "#LGM",
        homeVenue: {
        id: 109,
        name: "Citi Field"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Mets"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/121.svg"
        },
        {
        id: 128,
        city: "Miami",
        name: "Marlins",
        abbreviation: "MIA",
        twitter: "#JuntosMiami",
        homeVenue: {
        id: 118,
        name: "Marlins Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Marlins"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/146.svg"
        },
        {
        id: 129,
        city: "Philadelphia",
        name: "Phillies",
        abbreviation: "PHI",
        twitter: "#RingTheBell",
        homeVenue: {
        id: 110,
        name: "Citizens Bank Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Phillies"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/143.svg"
        },
        {
        id: 130,
        city: "Atlanta",
        name: "Braves",
        abbreviation: "ATL",
        twitter: "#ForTheA",
        homeVenue: {
        id: 136,
        name: "SunTrust Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Braves"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/144.svg"
        },
        {
        id: 131,
        city: "Chicago",
        name: "Cubs",
        abbreviation: "CHC",
        twitter: "#WhereStoriesPlay",
        homeVenue: {
        id: 133,
        name: "Wrigley Field"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Cubs"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/112.svg"
        },
        {
        id: 132,
        city: "Pittsburgh",
        name: "Pirates",
        abbreviation: "PIT",
        twitter: "#LetsGoBucs",
        homeVenue: {
        id: 125,
        name: "PNC Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Pirates"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/134.svg"
        },
        {
        id: 133,
        city: "St. Louis",
        name: "Cardinals",
        abbreviation: "STL",
        twitter: "#STLCards",
        homeVenue: {
        id: 107,
        name: "Busch Stadium"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Cardinals"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/138.svg"
        },
        {
        id: 134,
        city: "Milwaukee",
        name: "Brewers",
        abbreviation: "MIL",
        twitter: "#ThisIsMyCrew",
        homeVenue: {
        id: 119,
        name: "Miller Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Brewers"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/158.svg"
        },
        {
        id: 135,
        city: "Cincinnati",
        name: "Reds",
        abbreviation: "CIN",
        twitter: "#TakeTheCentral",
        homeVenue: {
        id: 116,
        name: "Great American Ball Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Reds"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/113.svg"
        },
        {
        id: 136,
        city: "San Francisco",
        name: "Giants",
        abbreviation: "SF",
        twitter: "#SFGiants",
        homeVenue: {
        id: 106,
        name: "AT&T Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "SFGiants"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/137.svg"
        },
        {
        id: 137,
        city: "Los Angeles",
        name: "Dodgers",
        abbreviation: "LAD",
        twitter: "#Dodgers",
        homeVenue: {
        id: 113,
        name: "Dodger Stadium"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Dodgers"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/119.svg"
        },
        {
        id: 138,
        city: "Colorado",
        name: "Rockies",
        abbreviation: "COL",
        twitter: "#Rockies",
        homeVenue: {
        id: 112,
        name: "Coors Field"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Rockies"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/115.svg"
        },
        {
        id: 139,
        city: "San Diego",
        name: "Padres",
        abbreviation: "SD",
        twitter: "#FriarFaithful",
        homeVenue: {
        id: 124,
        name: "Petco Park"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Padres"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/135.svg"
        },
        {
        id: 140,
        city: "Arizona",
        name: "Diamondbacks",
        abbreviation: "ARI",
        twitter: "#RattleOn",
        homeVenue: {
        id: 108,
        name: "Chase Field"
        },
        teamColoursHex: [ ],
        socialMediaAccounts: [
        {
        mediaType: "TWITTER",
        value: "Dbacks"
        }
        ],
        officialLogoImageSrc: "https://www.mlbstatic.com/team-logos/109.svg"
        }
    ]

     this.nflTeams = [
      {
        id: 48,
        bye: 11,
        defenseRankLs: 3,
        offenseRankLs: 25,
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
      bye: 11,
      defenseRankLs: 32,
      offenseRankLs: 26,
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
      bye: 6,
      defenseRankLs: 1,
      offenseRankLs: 14,
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
      bye: 11,
      defenseRankLs: 17,
      offenseRankLs: 32,
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
      bye: 10,
      defenseRankLs: 16,
      offenseRankLs: 4,
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
      bye: 11,
      defenseRankLs: 28,
      offenseRankLs: 18,
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
      bye: 9,
      defenseRankLs: 13,
      offenseRankLs: 13,
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
      bye: 8,
      defenseRankLs: 25,
      offenseRankLs: 30,
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
      bye: 8,
      defenseRankLs: 8,
      offenseRankLs: 1,
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
      bye: 9,
      defenseRankLs: 30,
      offenseRankLs: 28,
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
      bye: 9,
      defenseRankLs: 20,
      offenseRankLs: 23,
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
      bye: 8,
      defenseRankLs: 2,
      offenseRankLs: 31,
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
      bye: 11,
      defenseRankLs: 14,
      offenseRankLs: 27,
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
      bye: 5,
      defenseRankLs: 27,
      offenseRankLs: 21,
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
      bye: 5,
      defenseRankLs: 9,
      offenseRankLs: 15,
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
      bye: 7,
      defenseRankLs: 4,
      offenseRankLs: 12,
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
      bye: 8,
      defenseRankLs: 19,
      offenseRankLs: 11,
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
      bye: 7,
      defenseRankLs: 23,
      offenseRankLs: 22,
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
      bye: 7,
      defenseRankLs: 22,
      offenseRankLs: 24,
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
      bye: 7,
      defenseRankLs: 12,
      offenseRankLs: 8,
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
      bye: 10,
      defenseRankLs: 29,
      offenseRankLs: 10,
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
      bye: 13,
      defenseRankLs: 21,
      offenseRankLs: 20,
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
      bye: 6,
      defenseRankLs: 7,
      offenseRankLs: 6,
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
      bye: 13,
      defenseRankLs: 15,
      offenseRankLs: 3,
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
      bye: 8,
      defenseRankLs: 11,
      offenseRankLs: 29,
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
      bye: 10,
      defenseRankLs: 6,
      offenseRankLs: 5,
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
      bye: 6,
      defenseRankLs: 26,
      offenseRankLs: 17,
      city: "Las Vegas",
      name: "Raiders",
      abbreviation: "LV",
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
      bye: 10,
      defenseRankLs: 24,
      offenseRankLs: 16,
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
      bye: 8,
      defenseRankLs: 31,
      offenseRankLs: 19,
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
      bye: 9,
      defenseRankLs: 10,
      offenseRankLs: 9,
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
      bye: 11,
      defenseRankLs: 5,
      offenseRankLs: 2,
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
          bye: 6,
          defenseRankLs: 18,
          offenseRankLs: 7,
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

    this.nhlTeams = {
      "TBL": {
        id: 1,
        city: "Tampa Bay",
        name: "Lightning",
        abbreviation: "TBL",
        twitter: "#GoBolts",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/14.svg"
      },
      "WPJ": {
        id: 2,
        city: "Winnipeg",
        name: "Jets",
        abbreviation: "WPJ",
        twitter: "#GoJetsGo",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/52.svg"
      },
     "CAR": {
        id: 3,
        city: "Carolina",
        name: "Hurricanes",
        abbreviation: "CAR",
        twitter: "#LetsGoCanes",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/12.svg"
      },
      "FLO": {
        id: 4,
        city: "Florida",
        name: "Panthers",
        abbreviation: "FLO",
        twitter: "#FlaPanthers",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/13.svg"
      },
      "WSH": {
        id: 5,
        city: "Washington",
        name: "Capitals",
        abbreviation: "WSH",
        twitter: "#ALLCAPS",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/15.svg"
      },
      "PHI": {
        id: 6,
        city: "Philadelphia",
        name: "Flyers",
        abbreviation: "PHI",
        twitter: "#NowOrNever",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/4.svg"
      },
      "NJD": {
        id: 7,
        city: "New Jersey",
        name: "Devils",
        abbreviation: "NJD",
        twitter: "#NJDevils",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/1.svg"
      },
      "NYI" : {
        id: 8,
        city: "New York",
        name: "Islanders",
        abbreviation: "NYI",
        twitter: "#Isles",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/2.svg"
      },
      "NYR": {
        id: 9,
        city: "New York",
        name: "Rangers",
        abbreviation: "NYR",
        twitter: "#PlayLikeANewYorker",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/3.svg"
      },
      "PIT": {
        id: 10,
        city: "Pittsburgh",
        name: "Penguins",
        abbreviation: "PIT",
        twitter: "#LetsGoPens",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/5.svg"
      },
      "BOS": {
        id: 11,
        city: "Boston",
        name: "Bruins",
        abbreviation: "BOS",
        twitter: "#NHLBruins",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/6.svg"
      },
      "TOR": {
        id: 12,
        city: "Toronto",
        name: "Maple Leafs",
        abbreviation: "TOR",
        twitter: "#LeafsForever",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/10.svg"
      },
      "OTT": {
        id: 13,
        city: "Ottawa",
        name: "Senators",
        abbreviation: "OTT",
        twitter: "#GoSensGo",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/9.svg"
      },
      "MTL": {
        id: 14,
        city: "Montreal",
        name: "Canadiens",
        abbreviation: "MTL",
        twitter: "#Canadiens",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/8.svg"
      },
      "BUF": {
        id: 15,
        city: "Buffalo",
        name: "Sabres",
        abbreviation: "BUF",
        twitter: "#Sabres50",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/7.svg"
      },
      "DET": {
        id: 16,
        city: "Detroit",
        name: "Red Wings",
        abbreviation: "DET",
        twitter: "#LGRW",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/17.svg"
      },
     "STL": {
        id: 17,
        city: "St. Louis",
        name: "Blues",
        abbreviation: "STL",
        twitter: "#STLBlues",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/19.svg"
      },
      "NSH": {
        id: 18,
        city: "Nashville",
        name: "Predators",
        abbreviation: "NSH",
        twitter: "#Preds",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/18.svg"
      },
      "CBJ": {
        id: 19,
        city: "Columbus",
        name: "Blue Jackets",
        abbreviation: "CBJ",
        twitter: "#CBJ",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/29.svg"
      },
      "CHI": {
        id: 20,
        city: "Chicago",
        name: "Blackhawks",
        abbreviation: "CHI",
        twitter: "#Blackhawks",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/16.svg"
      },
      "VAN": {
        id: 21,
        city: "Vancouver",
        name: "Canucks",
        abbreviation: "VAN",
        twitter: "#Canucks",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/23.svg"
      },
      "COL": {
        id: 22,
        city: "Colorado",
        name: "Avalanche",
        abbreviation: "COL",
        twitter: "#GoAvsGo",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/21.svg"
      },
      "CGY": {
        id: 23,
        city: "Calgary",
        name: "Flames",
        abbreviation: "CGY",
        twitter: "#Flames",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/20.svg"
      },
     "EDM": {
        id: 24,
        city: "Edmonton",
        name: "Oilers",
        abbreviation: "EDM",
        twitter: "#LetsGoOilers",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/22.svg"
      },
      "MIN": {
        id: 25,
        city: "Minnesota",
        name: "Wild",
        abbreviation: "MIN",
        twitter: "#Wild",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/30.svg"
      },
      "SJS": {
        id: 26,
        city: "San Jose",
        name: "Sharks",
        abbreviation: "SJS",
        twitter: "#SJSharks",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/28.svg"
      },
      "DAL": {
        id: 27,
        city: "Dallas",
        name: "Stars",
        abbreviation: "DAL", 
        twitter: "#GoStarsGo",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/25.svg"
      },
      "LAK": {
        id: 28,
        city: "Los Angeles",
        name: "Kings",
        abbreviation: "LAK",
        twitter: "#GoKingsGo",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/26.svg"
      },
      "ANA": {
        id: 29,
        city: "Anaheim",
        name: "Ducks",
        abbreviation: "ANA",
        twitter: "#LetsGoDucks",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/24.svg"
      },
      "ARI": {
        id: 30,
        city: "Arizona",
        name: "Coyotes",
        abbreviation: "ARI",
        twitter: "#Yotes",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/53.svg"
      },
      "VGK": {
        id: 142,
        city: "Vegas",
        name: "Golden Knights",
        abbreviation: "VGK",
        twitter: "#VegasBorn",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/54.svg"
      }
    }

    this.startingGoalies = {
      '5617':{
        id: 5617,
        firstName: "Ilya",
        lastName: "Samsonov",
        teamId: 5,
        active: true,
        abbreviation: "WSH",
        numberOne: false
      }, 
      '4863':{
        id: 4863,
        firstName: "Braden",
        lastName: "Holtby",
        teamId: 5,
        active: true,
        abbreviation: "WSH",
        numberOne: true
      },
      '5107':{
        id: 5107,
        firstName: "Jake",
        lastName: "Allen",
        teamId: 17,
        abbreviation: "STL",
        active: true,
        numberOne: false
      },
      '5908': {
        id: 5908,
        firstName: "Jordan",
        lastName: "Binnington",
        teamId: 17,
        abbreviation: "STL",
        active: true,
        numberOne: true
      },
      '757': {
        id: 757,
        firstName: "Craig",
        lastName: "Anderson",
        teamId: 13,
        abbreviation: "OTT",
        active: true,
        numberOne: false
      },
      '5033': {
        id: 5033,
        firstName: "Anders",
        lastName: "Nilsson",
        teamId: 13,
        abbreviation: "OTT",
        active: false,
        numberOne: false
      },
      '5109': {
        id: 5109,
        firstName: "Frederik",
        lastName: "Andersen",
        teamId: 12,
        abbreviation: "TOR",
        active: true,
        numberOne: true
      },
      '4874': {
        id: 4874,
        firstName: "Jacob",
        lastName: "Markstrom",
        teamId: 21,
        abbreviation: "VAN",
        active: false,
        numberOne: false
      },
      '4950': {
        id: 4950,
        firstName: "Mikko",
        lastName: "Koskinen",
        teamId: 24,
        abbreviation: "EDM",
        active: true,
        numberOne: false
      },
      '3486': {
        id: 3486,
        firstName: "Mike",
        lastName: "Smith",
        teamId: 24,
        abbreviation: "EDM",
        active: true,
        numberOne: true
      },
      '10074': {
        id: 10074,
        firstName: "Aaron",
        lastName: "Dell",
        teamId: 26,
        abbreviation: "SJS",
        active: true,
        numberOne: true
      },
      '5122': {
        id: 5122,
        firstName: "Martin",
        lastName: "Jones",
        teamId: 26,
        abbreviation: "SJS",
        active: true,
        numberOne: false
      },
      '483': {
        id: 483,
        firstName: "Marc-Andre",
        lastName: "Fleury",
        teamId: 142,
        abbreviation: "VGK",
        active: true,
        numberOne: true
      },
      '5528': {
        id: 5528,
        firstName: "Malcolm",
        lastName: "Subban",
        teamId: 20,
        abbreviation: "CHI",
        active: true,
        numberOne: false
      },
      '13876': {
        id: 13876,
        firstName: "Thatcher",
        lastName: "Demko",
        teamId: 21,
        abbreviation: "VAN",
        active: true,
        numberOne: true
      },
      '5366': {
        id: 5366,
        firstName: "Michael",
        lastName: "Hutchinson",
        teamId: 22,
        abbreviation: "COL",
        active: false,
        numberOne: false
      }, 
      '13660': {
        id: 13660,
        firstName: "Kasimir",
        lastName: "Kaskisuo",
        teamId: 12,
        abbreviation: "TOR",
        active: false,
        numberOne: false
      },
      '15525': {
        id: 15525,
        firstName: "Sam",
        lastName: "Montembeault",
        teamId: 4,
        abbreviation: "FLO",
        active: true,
        numberOne: false
      },
      '5540': {
        id: 5540,
        firstName: "Chris",
        lastName: "Driedger",
        teamId: 4,
        abbreviation: "FLO",
        active: false,
        numberOne: false
      },
      '4890': {
        id: 4890,
        firstName: "Sergei",
        lastName: "Bobrovsky",
        teamId: 4,
        abbreviation: "FLO",
        active: true,
        numberOne: true
      },
      '5420': {
        id: 5420,
        firstName: "Andrei",
        lastName: "Vasilevskiy",
        teamId: 1,
        abbreviation: "TBL",
        active: true,
        numberOne: true
      },
      '5873': {
        id: 5873,
        firstName: "Connor",
        lastName: "Hellebuyck",
        teamId: 2,
        abbreviation: "WPJ",
        active: true,
        numberOne: true
      },
      '5552': {
        id: 5552,
        firstName: "Laurent",
        lastName: "Brossoit",
        teamId: 2,
        abbreviation: "WPJ",
        active: true,
        numberOne: false
      },
      '3647': {
        id: 3647,
        firstName: "Henrik",
        lastName: "Lundqvist",
        teamId: 9,
        abbreviation: "NYR",
        active: true,
        numberOne: false
      }, 
      '13934': {
        id: 13934,
        firstName: "Alexandar",
        lastName: "Georgiev",
        teamId: 9,
        abbreviation: "NYR",
        active: false,
        numberOne: false
      },
      '17374': {
        id: 17374,
        firstName: "Igor",
        lastName: "Shesterkin",
        teamId: 9,
        abbreviation: "NYR",
        active: true,
        numberOne: true
      },
      '5224': {
        id: 5224,
        firstName: "Carter",
        lastName: "Hutton",
        teamId: 15,
        abbreviation: "BUF",
        active: true,
        numberOne: true
      },
      '5842': {
        id: 5842,
        firstName: "Linus",
        lastName: "Ullmark",
        teamId: 15,
        abbreviation: "BUF",
        active: false,
        numberOne: false
      }, 
      '17380': {
        id: 17380,
        firstName: "Jonas",
        lastName: "Johansson",
        teamId: 15,
        abbreviation: "BUF",
        active: true,
        numberOne: false
      },
      '5894': {
        id: 5894,
        firstName: "Matt",
        lastName: "Murray",
        teamId: 10,
        abbreviation: "PIT",
        active: true,
        numberOne: false
      },
      '10083': {
        id: 10083,
        firstName: "Tristan",
        lastName: "Jarry",
        teamId: 10,
        abbreviation: "PIT",
        active: true,
        numberOne: true
      },
      '4294': {
        id: 4294,
        firstName: "Carey",
        lastName: "Price",
        teamId: 14,
        abbreviation: "MTL",
        active: true,
        numberOne: true
      },
      '4862': {
        id: 4862,
        firstName: "James",
        lastName: "Reimer",
        teamId: 3,
        abbreviation: "CAR",
        active: true,
        numberOne: false
      },
      '5163': {
        id: 5163,
        firstName: "Petr",
        lastName: "Mrazek",
        teamId: 3,
        abbreviation: "CAR",
        active: true,
        numberOne: true
      },
      '4666': {
        id: 4666,
        firstName: "Devan",
        lastName: "Dubnyk",
        teamId: 25,
        abbreviation: "MIN",
        active: true,
        numberOne: false
      },
      '4947': {
        id: 4947,
        firstName: "Alex",
        lastName: "Stalock",
        teamId: 25,
        abbreviation: "MIN",
        active: true,
        numberOne: true
      },
      '3810': {
        id: 3810,
        firstName: "Pekka",
        lastName: "Rinne",
        teamId: 18,
        abbreviation: "NSH",
        active: true,
        numberOne: false
      },
      '5877': {
        id: 5877,
        firstName: "Juuse",
        lastName: "Saros",
        teamId: 18,
        abbreviation: "NSH",
        active: true,
        numberOne: true
      },
      '4235': {
        id: 4235,
        firstName: "Jaroslav",
        lastName: "Halak",
        teamId: 11,
        abbreviation: "BOS",
        active: true,
        numberOne: false
      },
      '4326': {
        id: 4326,
        firstName: "Tuukka",
        lastName: "Rask",
        teamId: 11,
        abbreviation: "BOS",
        active: true,
        numberOne: true
      },
      '4561': {
        id: 4561,
        firstName: "Ben",
        lastName: "Bishop",
        teamId: 27,
        abbreviation: "DAL",
        active: true,
        numberOne: true
      },
      '4763': {
        id: 4763,
        firstName: "Anton",
        lastName: "Khudobin",
        teamId: 27,
        abbreviation: "DAL",
        active: true,
        numberOne: false
      },
      '11724': {
        id: 11724,
        firstName: "David",
        lastName: "Rittich",
        teamId:  23,
        abbreviation: "CGY",
        active: true,
        numberOne: true
      },
      '5277': {
        id: 5277,
        firstName: "Cam",
        lastName: "Talbot",
        teamId:  23,
        abbreviation: "CGY",
        active: true,
        numberOne: false
      },
      '5176': {
        id: 5176,
        firstName: "Philipp",
        lastName: "Grubauer",
        teamId: 22,
        abbreviation: "COL",
        active: false,
        numberOne: false
      },
      '15442': {
        id: 15442,
        firstName: "Pavel",
        lastName: "Francouz",
        teamId: 22,
        abbreviation: "COL",
        active: true,
        numberOne: true
      },
      '5168': {
        id: 5168,
        firstName: "Darcy",
        lastName: "Kuemper",
        teamId: 30,
        abbreviation: "ARI",
        active: true,
        numberOne: true
      },
      '5296': {
        id: 5296,
        firstName: "Antti",
        lastName: "Raanta",
        teamId: 30,
        abbreviation: "ARI",
        active: true,
        numberOne: false
      },
      '5227': {
        id: 5227,
        firstName: "John",
        lastName: "Gibson",
        teamId: 29,
        abbreviation: "ANA",
        active: true,
        numberOne: true
      },
      '178': {
        d: 178,
        firstName: "Ryan",
        lastName: "Miller",
        teamId: 29,
        abbreviation: "ANA",
        active: true,
        numberOne: false
      },
      '4310': {
        id: 4310,
        firstName: "Curtis",
        lastName: "McElhinney",
        teamId: 1,
        abbreviation: "TBL",
        active: true,
        numberOne: false
      },
      '3855': {
        id: 3855,
        firstName: "Corey",
        lastName: "Crawford",
        teamId: 20,
        abbreviation: "CHI",
        active: true,
        numberOne: true
      },
      '4305': {
        id: 4305,
        firstName: "Brian",
        lastName: "Elliott",
        teamId: 6,
        abbreviation: "PHI",
        active: true,
        numberOne: false
      },
      '4867': {
        id: 4867,
        firstName: "Robin",
        lastName: "Lehner",
        teamId: 142,
        abbreviation: "VGK",
        active: true,
        numberOne: false
      },  
      '5481': {
        id: 5481,
        firstName: "Anton",
        lastName: "Forsberg",
        teamId: 3,
        abbreviation: "CAR",
        active: false,
        numberOne: false
      },
      '15154': {
        id: 15154,
        firstName: "Carter",
        lastName: "Hart",
        teamId: 6,
        abbreviation: "PHI",
        active: true,
        numberOne: true
      },
      '5887': {
        id: 5887,
        firstName: "Joonas",
        lastName: "Korpisalo",
        teamId: 19,
        abbreviation: "CBJ",
        active: true,
        numberOne: true
      },
      '4351': {
        id: 4351,
        firstName: "Thomas",
        lastName: "Greiss",
        teamId: 8,
        abbreviation: "NYI",
        active: true,
        numberOne: false
      },
      '4592': {
        id: 4592,
        firstName: "Semyon",
        lastName: "Varlamov",
        teamId: 8,
        abbreviation: "NYI",
        active: true,
        numberOne: true
      },
      '15438': {
        id: 15438,
        firstName: "Mackenzie",
        lastName: "Blackwood",
        teamId: 7,
        abbreviation: "NJD",
        active: true,
        numberOne: true
      },
      '5518': {
        id: 5518,
        firstName: "Louis",
        lastName: "Domingue",
        teamId: 21,
        abbreviation: "VAN",
        active: true,
        numberOne: false
      }, 
      '4575': {
        id: 4575,
        firstName: "Cory",
        lastName: "Schneider",
        teamId: 7,
        abbreviation: "NJD",
        active: true,
        numberOne: false
      },
      '3793': {
        id: 3793,
        firstName: "Jimmy",
        lastName: "Howard",
        teamId: 16,
        abbreviation: "DET",
        active: true,
        numberOne: false
      }, 
      '4271': {
        id: 4271,
        firstName: "Jonathan",
        lastName: "Bernier",
        teamId: 16,
        abbreviation: "DET",
        active: true,
        numberOne: true
      },
      '5671': {
        id: 5671,
        firstName: "Adin",
        lastName: "Hill",
        teamId: 30,
        abbreviation: "ARI",
        active: false,
        numberOne: false
      },
      '4333': {
        id: 4333,
        firstName: "Jonathan",
        lastName: "Quick",
        teamId: 28,
        abbreviation: "LAK",
        active: true,
        numberOne: true
      },
      '5271': {
        id: 5271,
        firstName: "Jack",
        lastName: "Campbell",
        teamId: 12,
        abbreviation: "TOR",
        active: true,
        numberOne: false
      },
      '15690': {
        id: 15690,
        firstName: "Elvis",
        lastName: "Merzlikins",
        teamId: 19,
        abbreviation: "CBJ",
        active: false,
        numberOne: false
      },
      '15452': {
        id: 15452,
        firstName: "Marcus",
        lastName: "Hogberg",
        teamId: 13,
        abbreviation: "OTT",
        active: true,
        numberOne: true
      },
      '15384': {
        id: 15384,
        firstName: "Calvin",
        lastName: "Petersen",
        teamId: 28,
        abbreviation: "LAK",
        active: true,
        numberOne: false
      },
      '18296': {
        id: 18296,
        firstName: "David",
        lastName: "Ayres",
        teamId: 3,
        abbreviation: "CAR",
        active: false,
        numberOne: false
      },
      '11703': {
        id: 11703,
        firstName: "Alex",
        lastName: "Nedeljkovic",
        teamId: 3,
        abbreviation: "CAR",
        active: false,
        numberOne: false
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

  public getMLBTeams() {
    return this.mlbTeams;
  }

  public getNHLTeams() {
    return this.nhlTeams;
  }

  public getStartingGoalies() {
    return this.startingGoalies;
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
