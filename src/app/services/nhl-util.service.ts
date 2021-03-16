import { Injectable } from '@angular/core';
let nhlImageRoot = 'https://cms.nhl.bamgrid.com/images/headshots/current/168x168/';

@Injectable({
  providedIn: 'root'
})
export class NhlUtilService {
  public startingGoalies: any;
  public NHLImages: any;
  public nhlTeams: any;
  
  constructor() {

    this.startingGoalies = {
      '5617':{
        id: 5617,
        firstName: "Ilya",
        lastName: "Samsonov",
        teamId: 5,
        abbreviation: "WSH",
        active: true,
        numberOne: false,
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
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      }, 
      '757': {
        id: 757,
        firstName: "Craig",
        lastName: "Anderson",
        teamId: 5,
        abbreviation: "WSH",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8467950.jpg',
        new: false
      },
      '4863':{
        id: 4863,
        firstName: "Braden",
        lastName: "Holtby",
        teamId: 21,
        abbreviation: "VAN",
        active: true,
        numberOne: false,
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
      '13661': {
        id: 13661,
        firstName: "Ville",
        lastName: "Husso",
        teamId: 17,
        abbreviation: "STL",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8478024.jpg',
        new: false
      },
      '5033': {
        id: 5033,
        firstName: "Anders",
        lastName: "Nilsson",
        teamId: 1,
        abbreviation: "TBL",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8475195.jpg',
        new: false
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
      '4950': {
        id: 4950,
        firstName: "Mikko",
        lastName: "Koskinen",
        teamId: 24,
        abbreviation: "EDM",
        active: true,
        numberOne: false,
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
        numberOne: true,
        img: nhlImageRoot+'8469608.jpg',
        new: false
      },
      '17353': {
        id: 17353,
        firstName: "Stuart",
        lastName: "Skinner",
        teamId: 24,
        abbreviation: "EDM",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8479973.jpg',
        new: false
      },
      '10074': {
        id: 10074,
        firstName: "Aaron",
        lastName: "Dell",
        teamId: 20,
        abbreviation: "NJD",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8477180.jpg',
        new: true
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
      '28469': {
        id: 28469,
        firstName: "Alexei",
        lastName: "Melnichuk",
        teamId: 26,
        abbreviation: "SJS",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5528': {
        id: 5528,
        firstName: "Malcolm",
        lastName: "Subban",
        teamId: 20,
        abbreviation: "CHI",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '17354': {
        id: 17354,
        firstName: "Kevin",
        lastName: "Lankinen",
        teamId: 20,
        abbreviation: "CHI",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8480947.jpg',
        new: false
      },
      '14350': {
        id: 14350,
        firstName: "Collin",
        lastName: "Delia",
        teamId: 20,
        abbreviation: "CHI",
        active: false,
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
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5366': {
        id: 5366,
        firstName: "Michael",
        lastName: "Hutchinson",
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
        new: false
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
        new: false
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
        img: nhlImageRoot+'8476316.jpg',
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
        numberOne: true,
        img: nhlImageRoot+'8480382.jpg',
        new: false
      },
      '17374': {
        id: 17374,
        firstName: "Igor",
        lastName: "Shesterkin",
        teamId: 9,
        abbreviation: "NYR",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5180': {
        id: 5180,
        firstName: "Keith",
        lastName: "Kinkaid",
        teamId: 9,
        abbreviation: "NYR",
        active: true,
        numberOne: false,
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
        active: false,
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
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5894': {
        id: 5894,
        firstName: "Matt",
        lastName: "Murray",
        teamId: 13,
        abbreviation: "OTT",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5794': {
        id: 5794,
        firstName: "Joey",
        lastName: "Daccord",
        teamId: 13,
        abbreviation: "OTT",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8478916.jpg',
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
      '11721': {
        id: 11721,
        firstName: "Maxime",
        lastName: "Lagace",
        teamId: 10,
        abbreviation: "PIT",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8476509.jpg',
        new: true
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
        new: false
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
        numberOne: true,
        img: nhlImageRoot+'8473503.jpg',
        new: false
      },
      '5163': {
        id: 5163,
        firstName: "Petr",
        lastName: "Mrazek",
        teamId: 3,
        abbreviation: "CAR",
        active: false,
        numberOne: false,
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
        new: false
      },
      '4947': {
        id: 4947,
        firstName: "Alex",
        lastName: "Stalock",
        teamId: 24,
        abbreviation: "EDM",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8471774.jpg',
        new: true
      },
      '5277': {
        id: 5277,
        firstName: "Cam",
        lastName: "Talbot",
        teamId:  23,
        abbreviation: "MIN",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '17333': {
        id: 17333,
        firstName: "Kaapo",
        lastName: "Kahkonen",
        teamId: 25,
        abbreviation: "MIN",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8478039.jpg',
        new: false
      },
      '5335': {
        id: 5335,
        firstName: "Andrew",
        lastName: "Hammond",
        teamId: 25,
        abbreviation: "MIN",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8477202.jpg',
        new: true
      },
      '3810': {
        id: 3810,
        firstName: "Pekka",
        lastName: "Rinne",
        teamId: 18,
        abbreviation: "NSH",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8471469.jpg',
        new: false
      },
      '5877': {
        id: 5877,
        firstName: "Juuse",
        lastName: "Saros",
        teamId: 18,
        abbreviation: "NSH",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '13660': {
        id: 13660,
        firstName: "Kasimir",
        lastName: "Kaskisuo",
        teamId: 18,
        abbreviation: "NSH",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8479288.jpg',
        new: true
      },
      '4235': {
        id: 4235,
        firstName: "Jaroslav",
        lastName: "Halak",
        teamId: 11,
        abbreviation: "BOS",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8470860.jpg',
        new: false
      },
      '4326': {
        id: 4326,
        firstName: "Tuukka",
        lastName: "Rask",
        teamId: 11,
        abbreviation: "BOS",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '14444': {
        id: 14444,
        firstName: "Dan",
        lastName: "Vladar",
        teamId: 11,
        abbreviation: "BOS",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8478435.jpg',
        new: true
      },
      '4561': {
        id: 4561,
        firstName: "Ben",
        lastName: "Bishop",
        teamId: 27,
        abbreviation: "DAL",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8471750.jpg',
        new: true
      },
      '18035': {
        id: 18035,
        firstName: "Jake",
        lastName: "Oettinger",
        teamId: 27,
        abbreviation: "DAL",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8479979.jpg',
        new: false
      },
      '4763': {
        id: 4763,
        firstName: "Anton",
        lastName: "Khudobin",
        teamId: 27,
        abbreviation: "DAL",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8471418.jpg',
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
      '11724': {
        id: 11724,
        firstName: "David",
        lastName: "Rittich",
        teamId:  23,
        abbreviation: "CGY",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8479496.jpg',
        new: false
      },
      '17974': {
        id: 17974,
        firstName: "Artyom",
        lastName: "Zagidulin",
        teamId:  23,
        abbreviation: "CGY",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8481501.jpg',
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
      '13951': {
        id: 13951,
        firstName: "Hunter",
        lastName: "Miska",
        teamId: 22,
        abbreviation: "COL",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8480112.jpg',
        new: false
      },
      '15442': {
        id: 15442,
        firstName: "Pavel",
        lastName: "Francouz",
        teamId: 22,
        abbreviation: "COL",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8480925.jpg',
        new: true
      },
      '5168': {
        id: 5168,
        firstName: "Darcy",
        lastName: "Kuemper",
        teamId: 30,
        abbreviation: "ARI",
        active: false,
        numberOne: false,
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
        numberOne: true,
        img: nhlImageRoot+'8477293.jpg',
        new: false
      },
      '5671': {
        id: 5671,
        firstName: "Adin",
        lastName: "Hill",
        teamId: 30,
        abbreviation: "ARI",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
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
        id: 178,
        firstName: "Ryan",
        lastName: "Miller",
        teamId: 29,
        abbreviation: "ANA",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8468011.jpg',
        new: true
      },
      '4310': {
        id: 4310,
        firstName: "Curtis",
        lastName: "McElhinney",
        teamId: 1,
        abbreviation: "TBL",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8470147.jpg',
        new: true
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
      '483': {
        id: 483,
        firstName: "Marc-Andre",
        lastName: "Fleury",
        teamId: 142,
        abbreviation: "VGK",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8470594.jpg',
        new: false
      },
      '4867': {
        id: 4867,
        firstName: "Robin",
        lastName: "Lehner",
        teamId: 142,
        abbreviation: "VGK",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '12477': {
        id: 12477,
        firstName: "Oscar",
        lastName: "Dansk",
        teamId: 142,
        abbreviation: "VGK",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8476861.jpg',
        new: false
      },
      '28493': {
        id: 28493,
        firstName: "Logan",
        lastName: "Thompson",
        teamId: 142,
        abbreviation: "VGK",
        active: true,
        numberOne: false,
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
      '17341': {
        id: 17341,
        firstName: "Matiss",
        lastName: "Kivlenieks",
        teamId: 19,
        abbreviation: "CBJ",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8480162.jpg',
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
        new: false
      },
      '4351': {
        id: 4351,
        firstName: "Thomas",
        lastName: "Greiss",
        teamId: 16,
        abbreviation: "DET",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '5467': {
        id: 5467,
        firstName: "Calvin",
        lastName: "Pickard",
        teamId: 16,
        abbreviation: "DET",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8475717.jpg',
        new: true
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
      '8952': {
        id: 8952,
        firstName: "Scott",
        lastName: "Wedgewood",
        teamId: 7,
        abbreviation: "NJD",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8475809.jpg',
        new: false
      },
      '12468': {
        id: 12468,
        firstName: "Eric",
        lastName: "Comrie",
        teamId: 2,
        abbreviation: "WPJ",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8477480.jpg',
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
        numberOne: true,
        img: nhlImageRoot+'8473541.jpg',
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
      '15452': {
        id: 15452,
        firstName: "Marcus",
        lastName: "Hogberg",
        teamId: 13,
        abbreviation: "OTT",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8477405.jpg',
        new: false
      },
      '4333': {
        id: 4333,
        firstName: "Jonathan",
        lastName: "Quick",
        teamId: 28,
        abbreviation: "LAK",
        active: true,
        numberOne: false,
        img: nhlImageRoot+'0.jpg',
        new: false
      },
      '15384': {
        id: 15384,
        firstName: "Calvin",
        lastName: "Petersen",
        teamId: 28,
        abbreviation: "LAK",
        active: false,
        numberOne: false,
        img: nhlImageRoot+'8477361.jpg',
        new: false
      },
      '5486': {
        id: 5486,
        firstName: "Troy",
        lastName: "Grosenick",
        teamId: 28,
        abbreviation: "LAK",
        active: true,
        numberOne: true,
        img: nhlImageRoot+'8477234.jpg',
        new: false
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
        active: true,
        numberOne: false,
        img: nhlImageRoot+'8477968.jpg',
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
      "14537": {
        firstName: "Joel",
        lastName: "Farabee",
        image: nhlImageRoot+'8480797.jpg',
      }, 
      "17354": {
        firstName: "Kevin",
        lastName: "Lankinen",
        image: nhlImageRoot+'8480947.jpg',
      },
      "17183": {
        firstName: "Dominik",
        lastName: "Kubalik",
        image: nhlImageRoot+'8477330.jpg',
      },
      "17333": {
        firstName: "Kaapo",
        lastName: "Kahkonen",
        image: nhlImageRoot+'8478039.jpg',
      }, 
      "9644": {
        firstName: "Logan",
        lastName: "Stanley",
        image: nhlImageRoot+'8479378.jpg',
      }, 
      "17186": {
        firstName: "Rhett",
        lastName: "Gardner",
        image: nhlImageRoot+'8479587.jpg',
      }, 
      "15094": {
        firstName: "Pierre",
        lastName: "Engvall",
        image: nhlImageRoot+'8478115.jpg',
      },
      "17364": {
        firstName: "Jordan",
        lastName: "Gross",
        image: nhlImageRoot+'8480913.jpg',
      },
      "17177": {
        firstName: "Carter",
        lastName: "Verhaeghe",
        image: nhlImageRoot+'8477409.jpg',
      },
      "18035": {
        firstName: "Jake",
        lastName: "Oettinger",
        image: nhlImageRoot+'8479979.jpg',
      },
      "28409": {
        firstName: "Drew",
        lastName: "O'Connor",
        image: nhlImageRoot+'8482055.jpg',
      },
      "18107": {
        firstName: "Yegor",
        lastName: "Sharangovich",
        image: nhlImageRoot+'8481068.jpg',
      },
      "17185": {
        firstName: "Connor",
        lastName: "Bunnaman",
        image: nhlImageRoot+'8479382.jpg',
      },
      "13634": {
        firstName: "Josh",
        lastName: "Norris",
        image: nhlImageRoot+'8480064.jpg',
      },
      "17353": {
        firstName: "Stuart",
        lastName: "Skinner",
        image: nhlImageRoot+'8479973.jpg',
      },
      "15383": {
        firstName: "Jalen",
        lastName: "Chatfield",
        image: nhlImageRoot+'8478970.jpg',
      },
      "15181": {
        firstName: "Connor",
        lastName: "Timmins",
        image: nhlImageRoot+'8479982.jpg',
      },
      "13713": {
        firstName: "Alexander",
        lastName: "Volkov",
        image: nhlImageRoot+'8480186.jpg',
      },
      "28325": {
        firstName: "Pius",
        lastName: "Suter",
        image: nhlImageRoot+'8480459.jpg',
      },
      "17175": {
        firstName: "Tobius",
        lastName: "Bjornfot",
        image: nhlImageRoot+'8481600.jpg',
      },
      "14528": {
        firstName: "Barrett",
        lastName: "Hayton",
        image: nhlImageRoot+'8480849.jpg',
      },
      "17198": {
        firstName: "Julien",
        lastName: "Gauthier",
        image: nhlImageRoot+'8479328.jpg',
      },
      "17974": {
        firstName: "Artyom",
        lastName: "Zagidulin",
        image: nhlImageRoot+'8481501.jpg',
      },
      "13660": {
        firstName: "Kasimir",
        lastName: "Kaskisuo",
        image: nhlImageRoot+'8479288.jpg',
      },
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
        twitter: "#AnytimeAnywhere",
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
        twitter: "#NYR",
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
        twitter: "#GoHabsGo",
        officialLogoImageSrc: "https://www-league.nhlstatic.com/images/logos/teams-current-primary-light/8.svg"
      },
      "BUF": {
        id: 15,
        city: "Buffalo",
        name: "Sabres",
        abbreviation: "BUF",
        twitter: "#LetsGoBuffalo",
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
        twitter: "#CofRed",
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
        twitter: "#MNWild",
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
        twitter: "#GoStars",
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
        twitter: "#FlyTogether",
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

  public getNHLTeams() {
    return this.nhlTeams;
  }

  public goalieFp (player) {
    player.stats.fp = player.stats.goaltending.saves > 0 ? ((player.stats.goaltending.saves * 0.2) - player.stats.goaltending.goalsAgainst).toFixed(2) : 0;
    player.stats.fpa = player.stats.goaltending.saves > 0 ? Math.floor(player.stats.fp / player.stats.gamesPlayed) : 0;
    player.stats.goaltending.fp = player.stats.fp;
    player.stats.goaltending.fpa = player.stats.fpa;

    player.stats.fanDuelFP = player.stats.goaltending.saves > 0 ? (player.stats.goaltending.saves * 0.8) + (player.stats.goaltending.shutouts * 8) + (player.stats.goaltending.wins * 12) - (player.stats.goaltending.goalsAgainst * 4) : 0;
    player.stats.fanDuelFPA = player.stats.goaltending.saves > 0 ? Math.floor(player.stats.fanDuelFP / player.stats.gamesPlayed) : 0;
    player.stats.goaltending.fanDuelFP = player.stats.fanDuelFP;
    player.stats.goaltending.fanDuelFPA = player.stats.fanDuelFPA;
  }

  public goalieDailyFp (player) {
    //player.stats.fp = player.stats.goaltending.saves > 0 ? ((player.stats.goaltending.saves * 0.2) - player.stats.goaltending.goalsAgainst).toFixed(2) : 0; //MKF
    return player.stats.goaltending.saves > 0 ? ((player.stats.goaltending.saves * 0.8) - (player.stats.goaltending.goalsAgainst * 4)).toFixed(2) + (player.stats.goaltending.shutouts * 8) + (player.stats.goaltending.wins * 12) : 0;  
  }

  public goalieSLFP (player) {
    return player.stats.goaltending.saves > 0 ? (player.stats.goaltending.saves * 0.8) + (player.stats.goaltending.shutouts * 8) + (player.stats.goaltending.wins * 12) - (player.stats.goaltending.goalsAgainst * 4) : 0;
  }

  public goalieSLFPA (player) {
    let fp = player.stats.goaltending.saves > 0 ? (player.stats.goaltending.saves * 0.8) + (player.stats.goaltending.shutouts * 8) + (player.stats.goaltending.wins * 12) - (player.stats.goaltending.goalsAgainst * 4) : 0;
    return player.stats.goaltending.saves > 0 ? Math.floor(fp / player.stats.gamesPlayed) : 0;
  }

  public skaterFp (player) {
    player.stats.hits = player.stats.skating.hits; 
    player.stats.sog = player.stats.skating.shots ? player.stats.skating.shots : 0;
    player.stats.blocks = player.stats.skating.blockedShots ? player.stats.skating.blockedShots : 0;
    player.stats.fp = (player.stats.scoring.goals * 3 + player.stats.scoring.assists * 2) + (player.stats.sog + player.stats.blocks);
    player.stats.fpa = Math.floor(player.stats.fp / player.stats.gamesPlayed);

    player.stats.fanDuelFP = (player.stats.scoring.goals * 12) + (player.stats.scoring.assists * 8) + ((player.stats.blocks + player.stats.sog) * 1.6) + ((player.stats.scoring.powerplayGoals + player.stats.scoring.powerplayAssists ) * .5) + ((player.stats.scoring.shorthandedGoals + player.stats.scoring.shorthandedAssists ) * 2);
    player.stats.fanDuelFPA = Math.floor(player.stats.fanDuelFP / player.stats.gamesPlayed);
  }

  public skaterDailyFp (mdata, daily) {
    mdata.gameId = daily.game.id;
    mdata.stats.assistsToday = daily.stats.scoring.assists ? daily.stats.scoring.assists : 0;
    mdata.stats.goalsToday = daily.stats.scoring.goals ? daily.stats.scoring.goals : 0;
    
    mdata.stats.sogToday = daily.stats.skating.shots ? daily.stats.skating.shots : 0;
    mdata.stats.blocksToday = daily.stats.skating.blockedShots ? daily.stats.skating.blockedShots : 0;
    mdata.stats.hitsToday = daily.stats.skating.hits ? daily.stats.skating.hits : 0;
    mdata.stats.ppgToday = daily.stats.scoring.powerplayGoals ? daily.stats.scoring.powerplayGoals : 0;
    mdata.stats.ppaToday = daily.stats.scoring.powerplayAssists ? daily.stats.scoring.powerplayAssists : 0;
    mdata.stats.shgToday = daily.stats.scoring.shorthandedGoals ? daily.stats.scoring.shorthandedGoals : 0;
    mdata.stats.shaToday =  daily.stats.scoring.shorthandedAssists ? daily.stats.scoring.shorthandedAssists : 0; 
    mdata.stats.fpToday = (mdata.stats.goalsToday * 12) + (mdata.stats.assistsToday * 8) + ((mdata.stats.sogToday + mdata.stats.blocksToday) * 1.6) + ((mdata.stats.ppgToday + mdata.stats.ppaToday ) * .5) + ((mdata.stats.shgToday + mdata.stats.shaToday ) * 2);
  }

  public skaterSLFP (player) {
    return (player.stats.scoring.goals * 12) + (player.stats.scoring.assists * 8) + ((player.stats.skating.blockedShots + player.stats.skating.shots) * 1.6) + ((player.stats.scoring.powerplayGoals + player.stats.scoring.powerplayAssists ) * .5) + ((player.stats.scoring.shorthandedGoals + player.stats.scoring.shorthandedAssists ) * 2); 
  }

  public skaterSLFPA (player) {
    let fp = (player.stats.scoring.goals * 12) + (player.stats.scoring.assists * 8) + ((player.stats.skating.blockedShots + player.stats.skating.shots) * 1.6) + ((player.stats.scoring.powerplayGoals + player.stats.scoring.powerplayAssists ) * .5) + ((player.stats.scoring.shorthandedGoals + player.stats.scoring.shorthandedAssists ) * 2);
    return Math.floor(fp / player.stats.gamesPlayed);
  }

  
}
