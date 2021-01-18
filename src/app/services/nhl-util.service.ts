import { Injectable } from '@angular/core';
let nhlImageRoot = 'https://cms.nhl.bamgrid.com/images/headshots/current/168x168/';

@Injectable({
  providedIn: 'root'
})
export class NhlUtilService {
  public startingGoalies: any;
  public NHLImages: any;
  
  constructor() {

    this.startingGoalies = {
      '5617':{
        id: 5617,
        firstName: "Ilya",
        lastName: "Samsonov",
        teamId: 5,
        abbreviation: "WSH",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      }, 
      '14365':{
        id: 14365,
        firstName: "Vitek",
        lastName: "Vanecek",
        teamId: 5,
        abbreviation: "WSH",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      }, 
      '4863':{
        id: 4863,
        firstName: "Braden",
        lastName: "Holtby",
        teamId: 21,
        abbreviation: "VAN",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5107':{
        id: 5107,
        firstName: "Jake",
        lastName: "Allen",
        teamId: 14,
        abbreviation: "MTL",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8474596.jpg',
        new: true
      },
      '5908': {
        id: 5908,
        firstName: "Jordan",
        lastName: "Binnington",
        teamId: 17,
        abbreviation: "STL",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '757': {
        id: 757,
        firstName: "Craig",
        lastName: "Anderson",
        teamId: 13,
        abbreviation: "OTT",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5033': {
        id: 5033,
        firstName: "Anders",
        lastName: "Nilsson",
        teamId: 1,
        abbreviation: "TBL",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: true
      },
      '5109': {
        id: 5109,
        firstName: "Frederik",
        lastName: "Andersen",
        teamId: 12,
        abbreviation: "TOR",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4874': {
        id: 4874,
        firstName: "Jacob",
        lastName: "Markstrom",
        teamId: 23,
        abbreviation: "CGY",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4950': {
        id: 4950,
        firstName: "Mikko",
        lastName: "Koskinen",
        teamId: 24,
        abbreviation: "EDM",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '3486': {
        id: 3486,
        firstName: "Mike",
        lastName: "Smith",
        teamId: 24,
        abbreviation: "EDM",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8469608.jpg',
        new: true
      },
      '10074': {
        id: 10074,
        firstName: "Aaron",
        lastName: "Dell",
        teamId: 12,
        abbreviation: "TOR",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8477180.jpg',
        new: false
      },
      '5122': {
        id: 5122,
        firstName: "Martin",
        lastName: "Jones",
        teamId: 26,
        abbreviation: "SJS",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '483': {
        id: 483,
        firstName: "Marc-Andre",
        lastName: "Fleury",
        teamId: 142,
        abbreviation: "VGK",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8470594.jpg',
        new: true
      },
      '5528': {
        id: 5528,
        firstName: "Malcolm",
        lastName: "Subban",
        teamId: 20,
        abbreviation: "CHI",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '14350': {
        id: 14350,
        firstName: "Collin",
        lastName: "Delia",
        teamId: 20,
        abbreviation: "CHI",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '13876': {
        id: 13876,
        firstName: "Thatcher",
        lastName: "Demko",
        teamId: 21,
        abbreviation: "VAN",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5366': {
        id: 5366,
        firstName: "Michael",
        lastName: "Hutchinson",
        teamId: 22,
        abbreviation: "COL",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      }, 
      '13660': {
        id: 13660,
        firstName: "Kasimir",
        lastName: "Kaskisuo",
        teamId: 12,
        abbreviation: "TOR",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '15525': {
        id: 15525,
        firstName: "Sam",
        lastName: "Montembeault",
        teamId: 4,
        abbreviation: "FLO",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5540': {
        id: 5540,
        firstName: "Chris",
        lastName: "Driedger",
        teamId: 4,
        abbreviation: "FLO",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8476904.jpg',
        new: true
      },
      '4890': {
        id: 4890,
        firstName: "Sergei",
        lastName: "Bobrovsky",
        teamId: 4,
        abbreviation: "FLO",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8475683.jpg',
        new: true
      },
      '5420': {
        id: 5420,
        firstName: "Andrei",
        lastName: "Vasilevskiy",
        teamId: 1,
        abbreviation: "TBL",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5873': {
        id: 5873,
        firstName: "Connor",
        lastName: "Hellebuyck",
        teamId: 2,
        abbreviation: "WPJ",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5552': {
        id: 5552,
        firstName: "Laurent",
        lastName: "Brossoit",
        teamId: 2,
        abbreviation: "WPJ",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '3647': {
        id: 3647,
        firstName: "Henrik",
        lastName: "Lundqvist",
        teamId: 5,
        abbreviation: "WSH",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      }, 
      '13934': {
        id: 13934,
        firstName: "Alexandar",
        lastName: "Georgiev",
        teamId: 9,
        abbreviation: "NYR",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8480382.jpg',
        new: true
      },
      '17374': {
        id: 17374,
        firstName: "Igor",
        lastName: "Shesterkin",
        teamId: 9,
        abbreviation: "NYR",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5224': {
        id: 5224,
        firstName: "Carter",
        lastName: "Hutton",
        teamId: 15,
        abbreviation: "BUF",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5842': {
        id: 5842,
        firstName: "Linus",
        lastName: "Ullmark",
        teamId: 15,
        abbreviation: "BUF",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      }, 
      '17380': {
        id: 17380,
        firstName: "Jonas",
        lastName: "Johansson",
        teamId: 15,
        abbreviation: "BUF",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5894': {
        id: 5894,
        firstName: "Matt",
        lastName: "Murray",
        teamId: 10,
        abbreviation: "OTT",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '10083': {
        id: 10083,
        firstName: "Tristan",
        lastName: "Jarry",
        teamId: 10,
        abbreviation: "PIT",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '13873': {
        id: 13873,
        firstName: "Casey",
        lastName: "DeSmith",
        teamId: 10,
        abbreviation: "PIT",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8479193.jpg',
        new: true
      },
      '4294': {
        id: 4294,
        firstName: "Carey",
        lastName: "Price",
        teamId: 14,
        abbreviation: "MTL",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4862': {
        id: 4862,
        firstName: "James",
        lastName: "Reimer",
        teamId: 3,
        abbreviation: "CAR",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8473503.jpg',
        new: true
      },
      '5163': {
        id: 5163,
        firstName: "Petr",
        lastName: "Mrazek",
        teamId: 3,
        abbreviation: "CAR",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4666': {
        id: 4666,
        firstName: "Devan",
        lastName: "Dubnyk",
        teamId: 26,
        abbreviation: "SJS",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: true
      },
      '4947': {
        id: 4947,
        firstName: "Alex",
        lastName: "Stalock",
        teamId: 25,
        abbreviation: "MIN",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8471774.jpg',
        new: true
      },
      '3810': {
        id: 3810,
        firstName: "Pekka",
        lastName: "Rinne",
        teamId: 18,
        abbreviation: "NSH",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8471469.jpg',
        new: true
      },
      '5877': {
        id: 5877,
        firstName: "Juuse",
        lastName: "Saros",
        teamId: 18,
        abbreviation: "NSH",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4235': {
        id: 4235,
        firstName: "Jaroslav",
        lastName: "Halak",
        teamId: 11,
        abbreviation: "BOS",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8470860.jpg',
        new: false
      },
      '4326': {
        id: 4326,
        firstName: "Tuukka",
        lastName: "Rask",
        teamId: 11,
        abbreviation: "BOS",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4561': {
        id: 4561,
        firstName: "Ben",
        lastName: "Bishop",
        teamId: 27,
        abbreviation: "DAL",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8471750.jpg',
        new: true
      },
      '4763': {
        id: 4763,
        firstName: "Anton",
        lastName: "Khudobin",
        teamId: 27,
        abbreviation: "DAL",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8471418.jpg',
        new: true
      },
      '11724': {
        id: 11724,
        firstName: "David",
        lastName: "Rittich",
        teamId:  23,
        abbreviation: "CGY",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8479496.jpg',
        new: true
      },
      '5277': {
        id: 5277,
        firstName: "Cam",
        lastName: "Talbot",
        teamId:  23,
        abbreviation: "MIN",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5176': {
        id: 5176,
        firstName: "Philipp",
        lastName: "Grubauer",
        teamId: 22,
        abbreviation: "COL",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '15442': {
        id: 15442,
        firstName: "Pavel",
        lastName: "Francouz",
        teamId: 22,
        abbreviation: "COL",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: true
      },
      '5168': {
        id: 5168,
        firstName: "Darcy",
        lastName: "Kuemper",
        teamId: 30,
        abbreviation: "ARI",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5296': {
        id: 5296,
        firstName: "Antti",
        lastName: "Raanta",
        teamId: 30,
        abbreviation: "ARI",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8477293.jpg',
        new: false
      },
      '5227': {
        id: 5227,
        firstName: "John",
        lastName: "Gibson",
        teamId: 29,
        abbreviation: "ANA",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '178': {
        d: 178,
        firstName: "Ryan",
        lastName: "Miller",
        teamId: 29,
        abbreviation: "ANA",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: true
      },
      '4310': {
        id: 4310,
        firstName: "Curtis",
        lastName: "McElhinney",
        teamId: 1,
        abbreviation: "TBL",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '3855': {
        id: 3855,
        firstName: "Corey",
        lastName: "Crawford",
        teamId: 20,
        abbreviation: "NJD",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4305': {
        id: 4305,
        firstName: "Brian",
        lastName: "Elliott",
        teamId: 6,
        abbreviation: "PHI",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8470880.jpg',
        new: true
      },
      '4867': {
        id: 4867,
        firstName: "Robin",
        lastName: "Lehner",
        teamId: 142,
        abbreviation: "VGK",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },  
      '5481': {
        id: 5481,
        firstName: "Anton",
        lastName: "Forsberg",
        teamId: 3,
        abbreviation: "CAR",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '15154': {
        id: 15154,
        firstName: "Carter",
        lastName: "Hart",
        teamId: 6,
        abbreviation: "PHI",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5887': {
        id: 5887,
        firstName: "Joonas",
        lastName: "Korpisalo",
        teamId: 19,
        abbreviation: "CBJ",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4351': {
        id: 4351,
        firstName: "Thomas",
        lastName: "Greiss",
        teamId: 16,
        abbreviation: "DET",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4592': {
        id: 4592,
        firstName: "Semyon",
        lastName: "Varlamov",
        teamId: 8,
        abbreviation: "NYI",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '28379': {
        id: 28379,
        firstName: "Ilya",
        lastName: "Sorokin",
        teamId: 8,
        abbreviation: "NYI",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8478009.jpg',
        new: false
      },
      '15438': {
        id: 15438,
        firstName: "Mackenzie",
        lastName: "Blackwood",
        teamId: 7,
        abbreviation: "NJD",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5518': {
        id: 5518,
        firstName: "Louis",
        lastName: "Domingue",
        teamId: 23,
        abbreviation: "CGY",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      }, 
      '4575': {
        id: 4575,
        firstName: "Cory",
        lastName: "Schneider",
        teamId: 7,
        abbreviation: "NJD",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '3793': {
        id: 3793,
        firstName: "Jimmy",
        lastName: "Howard",
        teamId: 16,
        abbreviation: "DET",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      }, 
      '4271': {
        id: 4271,
        firstName: "Jonathan",
        lastName: "Bernier",
        teamId: 16,
        abbreviation: "DET",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8473541.jpg',
        new: true
      },
      '5671': {
        id: 5671,
        firstName: "Adin",
        lastName: "Hill",
        teamId: 30,
        abbreviation: "ARI",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '4333': {
        id: 4333,
        firstName: "Jonathan",
        lastName: "Quick",
        teamId: 28,
        abbreviation: "LAK",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5271': {
        id: 5271,
        firstName: "Jack",
        lastName: "Campbell",
        teamId: 12,
        abbreviation: "TOR",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8475789.jpg',
        new: false
      },
      '15690': {
        id: 15690,
        firstName: "Elvis",
        lastName: "Merzlikins",
        teamId: 19,
        abbreviation: "CBJ",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8478007.jpg',
        new: true
      },
      '15452': {
        id: 15452,
        firstName: "Marcus",
        lastName: "Hogberg",
        teamId: 13,
        abbreviation: "OTT",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8477405.jpg',
        new: true
      },
      '15384': {
        id: 15384,
        firstName: "Calvin",
        lastName: "Petersen",
        teamId: 28,
        abbreviation: "LAK",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8477361.jpg',
        new: true
      },
      '18296': {
        id: 18296,
        firstName: "David",
        lastName: "Ayres",
        teamId: 3,
        abbreviation: "CAR",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '11703': {
        id: 11703,
        firstName: "Alex",
        lastName: "Nedeljkovic",
        teamId: 3,
        abbreviation: "CAR",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      }
    }

    this.NHLImages = {
      "17374": {
        firstName: "Igor",
        lastName: "Shesterkin",
        image: nhlImageRoot+"8478048.jpg"
      },
      "17380": {
        firstName: "Jonas",
        lastName: "Johansson",
        image: nhlImageRoot+"8477992.jpg"
      },
      "15384": {
        firstName: "Calvin",
        lastName: "Petersen",
        image: nhlImageRoot+"8477361.jpg"
      },
      "17341": {
        firstName: "Matiss",
        lastName: "Kivlenieks",
        image: nhlImageRoot+"8480162.jpg"
      },
      "28379": {
        firstName: "Ilya",
        lastName: "Sorokin",
        image: nhlImageRoot+'8478009.jpg',
      },
      "17125": {
        firstName: "Jack",
        lastName: "Hughes",
        image: nhlImageRoot+'8481559.jpg',
      },
      "17179": {
        firstName: "Adam",
        lastName: "Fox",
        image: nhlImageRoot+'8479323.jpg',
      },
      
      
    }
    
   }

  public getNewGoalie() {
    let newGoalie = null;
    newGoalie = {
      player: {
      id: 0,
      firstName: "none",
      lastName: "none",
      primaryPosition: "G",
      jerseyNumber: 0,
      currentTeam: {
      id: 0,
      abbreviation: "None"
      },
      currentRosterStatus: "ROSTER",
      currentInjury: null,
      height: "0",
      weight: 0,
      birthDate: "none",
      age: 0,
      birthCity: "none",
      birthCountry: "none",
      rookie: false,
      highSchool: null,
      college: null,
      handedness: {
      catches: "none"
      },
      officialImageSrc: "none",
      socialMediaAccounts: [
      {
      mediaType: "TWITTER",
      value: "none"
      }
      ]
      },
      team: {
      id: null,
      abbreviation: "None"
      },
      stats: {
      gamesPlayed: 0,
      scoring: {
      goals: 0,
      assists: 0,
      primaryAssists: 0,
      powerplayPrimaryAssists: 0,
      shorthandedPrimaryAssists: 0,
      secondaryAssists: 0,
      powerplaySecondaryAssists: 0,
      shorthandedSecondaryAssists: 0,
      points: 0,
      hatTricks: 0,
      powerplayGoals: 0,
      powerplayAssists: 0,
      powerplayPoints: 0,
      shorthandedGoals: 0,
      shorthandedAssists: 0,
      shorthandedPoints: 0,
      gameWinningGoals: 0,
      gameTyingGoals: 0,
      overtimeGoals: 0,
      shootoutAttempts: 0,
      shootoutMisses: 0,
      shootoutGoals: 0,
      shootoutGoalPercent: 0
      },
      penalties: {
      penalties: 0,
      penaltyMinutes: 0,
      minorPenalties: 0,
      minorPenaltyMinutes: 0,
      majorPenalties: 0,
      majorPenaltyMinutes: 0,
      doubleMinorPenalties: 0,
      doubleMinorPenaltyMinutes: 0,
      matchPenalties: 0,
      misconductPenalties: 0,
      misconductPenaltyMinutes: 0,
      penaltiesDrawn: 0,
      penaltyMinutesDrawn: 0,
      fights: 0
      },
      goaltending: {
      wins: 0,
      losses: 0,
      overtimeWins: 0,
      overtimeLosses: 0,
      shootoutWins: 0,
      shootoutLosses: 0,
      goalsAgainst: 0,
      evenStrengthGoalsAgainst: 0,
      powerplayGoalsAgainst: 0,
      shorthandedGoalsAgainst: 0,
      shotsAgainst: 0,
      evenStrengthShotsAgainst: 0,
      powerplayShotsAgainst: 0,
      shorthandedShotsAgainst: 0,
      overtimeGoalsAgainst: 0,
      saves: 0,
      evenStrengthSaves: 0,
      powerplaySaves: 0,
      shorthandedSaves: 0,
      goalsAgainstAverage: 0,
      savePercentage: 0,
      shutouts: 0,
      gamesStarted: 0,
      creditForGame: 0,
      shootoutDefences: 0,
      shootoutSaves: 0,
      shootoutSavePercent: 0,
      shootoutGoalsAgainst: 0,
      minutesPlayed: 0
      },
      shifts: {
      shifts: 0,
      evenStrengthShifts: 0,
      powerplayShifts: 0,
      shorthandedShifts: 0,
      timeOnIceSeconds: 0,
      evenStrengthTimeOnIceSeconds: 0,
      powerplayTimeOnIceSeconds: 0,
      shorthandedTimeOnIceSeconds: 0
      }
      }
      }
    return newGoalie;
  }

  public getStartingGoalies() {
    return this.startingGoalies;
  }

  public getNHLImages() {
    return this.NHLImages;
  }

  
}
