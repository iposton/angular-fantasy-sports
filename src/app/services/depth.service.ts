import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepthService {
  public actualStarters: any;
  public nflDepth: any;
  public nbaDepth: any;
  public nhlDepth: any;

  constructor() {
    this.actualStarters = {
      // '122': {
      //   firstName: 'Lance',
      //   lastName: 'McCullers Jr.',
      //   id: 10487,
      //   status: 'SET',
      //   gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
      //   abbreviation: 'HOU'
      // },
      // '115': {
      //   firstName: 'John',
      //   lastName: 'Curtiss',
      //   id: 13338,
      //   status: 'SET',
      //   gdate: 'Thu Oct 15 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
      //   abbreviation: 'TB'
      // },
      // '137': {
      //   firstName: 'Clayton',
      //   lastName: 'Kershaw',
      //   id: 10573,
      //   status: 'SET',
      //   gdate: 'Tue Oct 20 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
      //   abbreviation: 'LAD'
      // }
      // id: 22220,
      // firstName: "Luis",
      // lastName: "Garcia",
      // HOU actual starter
         
    }

    this.nflDepth = {
      '54': [
        {
          'gdate': 1,
          'Offense-WR-2' : {
            firstName: 'Travis',
            lastName: 'Fulgham',
            id: 2,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'n'
          },
          // 'Offense-RB-1' : {
          //   firstName: 'Boston',
          //   lastName: 'Scott',
          //   id: 14716,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'RB'
          // },
          // 'Defense-LB-1' : {
          //   firstName: 'T.J.',
          //   lastName: 'Edwards',
          //   id: 16496,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'LB'
          // },
          // 'Defense-CB-1' : {
          //   firstName: 'Brandon',
          //   lastName: 'Graham',
          //   id: 8068,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'DE'
          // },
      }
    ],
    '72': [
      {
        'gdate': 19,
        'Defense-CB-1' : {
          firstName: 'Michael',
          lastName: 'Ojemudia',
          id: 18595,
          status: 'Starter',
          abbreviation: 'DEN',
          position: 'CB'
        },
      }
    ],
    '50': [
      {
        'gdate': 19,
        // 'Defense-LB-1' : {
        //   firstName: 'Ja Whaun',
        //   lastName: 'Bentley',
        //   id: 15000,
        //   status: 'Starter',
        //   abbreviation: 'NE',
        //   position: 'LB'
        // },
        'Defense-CB-1' : {
          firstName: 'J.C.',
          lastName: 'Jackson',
          id: 15082,
          status: 'Starter',
          abbreviation: 'NE',
          position: 'DB'
        },
      }
    ],
    '53': [
      {
        'gdate': 19,
        'Defense-LB-1' : {
          firstName: 'Blake',
          lastName: 'Martinez',
          id: 9878,
          status: 'Starter',
          abbreviation: 'NYG',
          position: 'LB'
        },
        'Offense-TE-1' : {
          firstName: 'Evan',
          lastName: 'Engram',
          id: 13094,
          status: 'Starter',
          abbreviation: 'NYG',
          position: 'TE'
        },
        'Offense-RB-1' : {
          firstName: 'Wayne',
          lastName: 'Gallman',
          id: 13095,
          status: 'Starter',
          abbreviation: 'NYG',
          position: 'RB'
        },
        // 'Offense-QB-1' : {
        //   firstName: 'Colt',
        //   lastName: 'McCoy',
        //   id: 8733,
        //   status: 'Starter',
        //   abbreviation: 'NYG',
        //   position: 'QB'
        // },
        //18972 austin mack wr
      }
    ],
    '74': [
      {
        'gdate': 3,
        // 'Offense-TE-1' : {
        //   firstName: 'Darren',
        //   lastName: 'Waller',
        //   id: 6133,
        //   status: 'Starter',
        //   abbreviation: 'TE',
        //   position: 'TE'
        // },
        'Offense-RB-1' : {
          firstName: 'Kenyan',
          lastName: 'Drake',
          id: 9694,
          status: 'Starter',
          abbreviation: 'LV',
          position: 'RB'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'Hunter',
        //   lastName: 'Renfrow',
        //   id: 16623,
        //   status: 'Starter',
        //   abbreviation: 'LV',
        //   position: 'WR'
        // },
        // 'Offense-WR-2' : {
        //   firstName: 'Henry',
        //   lastName: 'Ruggs',
        //   id: 18624,
        //   status: 'Starter',
        //   abbreviation: 'LV',
        //   position: 'WR'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Dareck',
        //   lastName: 'Carr',
        //   id: 7916,
        //   status: 'Starter',
        //   abbreviation: 'LV',
        //   position: 'QB'
        // },
      }
    ],
    '78': [
      {
        'gdate': 19,
        'Defense-DE-1' : {
          firstName: 'Kerry',
          lastName: 'Hyder',
          id: 6866,
          status: 'Starter',
          abbreviation: 'SF',
          position: 'DE'
        },
        'Defense-CB-1' : {
          firstName: 'Emmanuel',
          lastName: 'Moseley',
          id: 15377,
          status: 'Starter',
          abbreviation: 'SF',
          position: 'DB'
        },
        'Defense-LB-1' : {
          firstName: 'Fred',
          lastName: 'Warner',
          id: 14986,
          status: 'Starter',
          abbreviation: 'SF',
          position: 'LB'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'Richie',
        //   lastName: 'James Jr.',
        //   id: 14729,
        //   status: 'Starter',
        //   abbreviation: 'SF',
        //   position: 'WR'
        // },
    }
  ],
  '79': [
    {
      'gdate': 19,
      'Defense-DE-1' : {
        firstName: 'Bobby',
        lastName: 'Wagner',
        id: 8350,
        status: 'Starter',
        abbreviation: 'SEA',
        position: 'MLB'
      },
      'Defense-LB-1' : {
        firstName: 'Jarran',
        lastName: 'Reed',
        id: 10027,
        status: 'Starter',
        abbreviation: 'SEA',
        position: 'DT'
      },
      'Defense-CB-1' : {
        firstName: 'Jamal',
        lastName: 'Adams',
        id: 13224,
        status: 'Starter',
        abbreviation: 'SEA',
        position: 'SS'
      },
      // 'Offense-RB-1' : {
      //   firstName: 'DeeJay',
      //   lastName: 'Dallas',
      //   id: 19016,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'RB'
      // },
      // 'Offense-TE-1' : {
      //   firstName: 'DK',
      //   lastName: 'Metcalf',
      //   id: 16123,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'WR'
      // },
      'Offense-TE-1' : {
        firstName: 'Tyler',
        lastName: 'Lockett',
        id: 8296,
        status: 'Starter',
        abbreviation: 'SEA',
        position: 'WR'
      },
      
      }
    ],
    '76': [
      {
        'gdate': 3,
        // 'Defense-DE-1' : {
        //   firstName: 'Budda',
        //   lastName: 'Baker',
        //   id: 12685,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'SS'
        // },
        // 'Defense-S-1' : {
        //   firstName: 'Jordan',
        //   lastName: 'Hicks',
        //   id: 8070,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'MLB'
        // },
        // 'Defense-CB-1' : {
        //   firstName: 'Patrick',
        //   lastName: 'Peterson',
        //   id: 6007,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'CB'
        // },
        // 'Defense-LB-1' : {
        //   firstName: 'De Vondre',
        //   lastName: 'Campbell',
        //   id: 9740,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'OLB'
        // },
        'Offense-WR-2' : {
          firstName: 'Rondale',
          lastName: 'Moore',
          id: 30931,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'WR'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'Christian',
        //   lastName: 'Kirk',
        //   id: 14654,
        //   status: 'Starter',
        //   abbreviation: 'ARI',
        //   position: 'WR'
        // },
        
      }
    ],
    '55': [
      {
        'gdate': 19,
        // 'Defense-LB-1' : {
        //   firstName: 'Jon',
        //   lastName: 'Bostic',
        //   id: 6432,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'ILB'
        // },
        // 'Defense-DE-1' : {
        //   firstName: 'Ryan',
        //   lastName: 'Kerrigan',
        //   id: 8794,
        //   status: 'Starter',
        //   abbreviation: 'WAS',
        //   position: 'OLB'
        // },
        'Defense-DE-1' : {
          firstName: 'Chase',
          lastName: 'Young',
          id: 18689,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'DE'
        },
        'Offense-RB-1' : {
          firstName: 'Antonio',
          lastName: 'Gibson',
          id: 18688,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'RB'
        },
        'Offense-WR-1' : {
          firstName: 'Terry',
          lastName: 'McLaurin',
          id: 16490,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'WR'
        },
        'Offense-QB-1' : {
          firstName: 'Taylor',
          lastName: 'Heinicke',
          id: 7459,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'QB'
        },
        
      }
    ],
    '52': [
      {
        'gdate': 19,
        'Defense-CB-1' : {
          firstName: 'Aldon',
          lastName: 'Smith',
          id: 8441,
          status: 'Starter',
          abbreviation: 'DAL',
          position: 'LB'
        },
        'Defense-LB-1' : {
          firstName: 'Jaylon',
          lastName: 'Smith',
          id: 15385,
          status: 'Starter',
          abbreviation: 'DAL',
          position: 'MLB'
        },
        'Defense-DE-1' : {
          firstName: 'Leighton',
          lastName: 'Vander Esch',
          id: 14510,
          status: 'Starter',
          abbreviation: 'DAL',
          position: 'OLB'
        },
        // 'Offense-QB-1' : {
        //   firstName: 'Garett',
        //   lastName: 'Gilbert',
        //   id: 12800,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'QB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Tony',
        //   lastName: 'Pollard',
        //   id: 16589,
        //   status: 'Starter',
        //   abbreviation: 'DAL',
        //   position: 'RB'
        // },
          
      }
    ],
    '51': [
      {
        'gdate': 19,
        'Defense-DE-1' : {
          firstName: 'Neville',
          lastName: 'Hewitt',
          id: 7426,
          status: 'Starter',
          abbreviation: 'NYJ',
          position: 'LB'
        }, 
        // 'Defense-S-1' : {
        //   firstName: 'Brian',
        //   lastName: 'Poole',
        //   id: 9746,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'CB'
        // },
        // 'Offense-QB-1' : {
        //   firstName: 'Joe',
        //   lastName: 'Flacco',
        //   id: 6114,
        //   status: 'Starter',
        //   abbreviation: 'NYJ',
        //   position: 'QB'
        // },
      }
    ],
    '69': [
      {
        'gdate': 3,
        
        'Offense-TE-1' : {
          firstName: 'Tommy',
          lastName: 'Tremble',
          id: 30978,
          status: 'Starter',
          abbreviation: 'CAR',
          position: 'TE'
        },
        // 'Offense-WR-2' : {
        //   firstName: 'Dj',
        //   lastName: 'Moore',
        //   id:  14515,
        //   status: 'Starter',
        //   abbreviation: 'CAR',
        //   position: 'WR'
        // }, 
      }
    ],
    '70': [
      {
        'gdate': 2,
        
        'Offense-TE-1' : {
          firstName: '',
          lastName: '',
          id: 1,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'n'
         },
        'Offense-QB-1' : {
          firstName: 'Jameis',
          lastName: 'Winston',
          id: 8550,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'QB'
        },
        'Offense-RB-1' : {
          firstName: 'Alvin',
          lastName: 'Kamara',
          id: 13255,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'RB'
        },
        'Offense-WR-2' : {
          firstName: 'Marquez',
          lastName: 'Callaway',
          id: 19043,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'WR'
        },
      }
    ],
    '48': [
      {
        'gdate': 1,
        // 'Defense-DE-1' : {
        //   firstName: 'Mario',
        //   lastName: 'Addison',
        //   id: 6335,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'DE'
        // }, 
        // 'Defense-CB-1' : {
        //   firstName: 'Taron',
        //   lastName: 'Johnson',
        //   id: 16057,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'CB'
        // },
        // 'Defense-S-1' : {
        //   firstName: 'Jordan',
        //   lastName: 'Poyer',
        //   id: 6634,
        //   status: 'Starter',
        //   abbreviation: 'BUF',
        //   position: 'FS'
        // },
        'Offense-TE-1' : {
          firstName: 'Stefon',
          lastName: 'Diggs',
          id: 1,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'n'
        },
        'Offense-RB-1' : {
          firstName: 'Devin',
          lastName: 'Singletary',
          id: 16040,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'RB'
        },
      }
    ],
    '62': [
      {
        'gdate': 2,
        'Offense-RB-1' : {
          firstName: 'Aaron',
          lastName: 'Jones',
          id: 12978,
          status: 'Starter',
          abbreviation: 'GB',
          position: 'RB'
        }, 
        // 'Offense-TE-1' : {
        //   firstName: 'Robert',
        //   lastName: 'Tonyan',
        //   id: 12956,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'TE'
        // }, 
        // 'Offense-WR-2' : {
        //   firstName: 'Davante',
        //   lastName: 'Adams',
        //   id: 6924,
        //   status: 'Starter',
        //   abbreviation: 'GB',
        //   position: 'WR'
        // }, 
        
      }
    ],
    '64': [
      {
        'gdate': 3,
        // 'Defense-DE-1' : {
        //   firstName: 'Zach',
        //   lastName: 'Cunningham',
        //   id: 13006,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'ILB'
        // }, 
        // 'Defense-LB-1' : {
        //   firstName: 'J.J.',
        //   lastName: 'Watt',
        //   id: 7051,
        //   status: 'Starter',
        //   abbreviation: 'HOU',
        //   position: 'DE'
        // },
        'Offense-WR-1' : {
          firstName: 'Anthony',
          lastName: 'Miller',
          id: 14665,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'WR'
        },
        'Offense-TE-1' : {
          firstName: 'Jordan',
          lastName: 'Akins',
          id: 14693,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'TE'
        },
      }
    ],
    '58': [
      {
        'gdate': 3,
        // 'Defense-CB-1' : {
        //   firstName: 'Myles',
        //   lastName: 'Garrett',
        //   id: 12864,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'DE'
        // }, 
        // 'Defense-LB-1' : {
        //   firstName: 'Denzel',
        //   lastName: 'Ward',
        //   id: 14495,
        //   status: 'Starter',
        //   abbreviation: 'CLE',
        //   position: 'CB'
        // },
        'Offense-WR-1' : {
          firstName: 'Rashard',
          lastName: 'Higgins',
          id: 9823,
          status: 'Starter',
          abbreviation: 'CLE',
          position: 'WR'
        },
        'Offense-WR-2' : {
          firstName: 'Kareem',
          lastName: 'Hunt',
          id: 13330,
          status: 'Starter',
          abbreviation: 'CLE',
          position: 'RB'
        },
        'Offense-TE-1' : {
          firstName: 'Austin',
          lastName: 'Hooper',
          id: 9741,
          status: 'Starter',
          abbreviation: 'CLE',
          position: 'TE'
        },
      }
    ],
    '57': [
      {
        'gdate': 2,
        
        'Offense-RB-1' : {
          firstName: 'Joe',
          lastName: 'Mixon',
          id: 12843,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'RB'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Tee',
        //   lastName: 'Higgins',
        //   id: 18578,
        //   status: 'Starter',
        //   abbreviation: 'CIN',
        //   position: 'WR'
        // },
        // 'Offense-WR-1' : {
        //   firstName: 'Tyler',
        //   lastName: 'Boyd',
        //   id: 9797,
        //   status: 'Starter',
        //   abbreviation: 'CIN',
        //   position: 'WR'
        // },
      }
    ],
    '61': [
      {
        'gdate': 3,
        // 'Defense-CB-1' : {
        //   firstName: 'Amani',
        //   lastName: 'Oruwariye',
        //   id: 16401,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'CB'
        // }, 
        // 'Defense-DE-1' : {
        //   firstName: 'Duron',
        //   lastName: 'Harmon',
        //   id: 7630,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'SS'
        // },
        // 'Defense-LB-1' : {
        //   firstName: 'Romeo',
        //   lastName: 'Okwara',
        //   id: 9958,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'DE'
        // },
        // 'Defense-S-1' : {
        //   firstName: 'Jamie',
        //   lastName: 'Collins Sr.',
        //   id: 7609,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'OLB'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'D Andre',
        //   lastName: 'Swift',
        //   id: 18603,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
        //  'Offense-RB-1' : {
        //   firstName: 'Adrian',
        //   lastName: 'Peterson',
        //   id: 7466,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
        'Offense-WR-2' : {
          firstName: 'Jamaal',
          lastName: 'Williams',
          id: 12999,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'RB'
        },
        
      }
    ],
    '68': [
      {
        'gdate': 2,
        // 'Defense-CB-1' : {
        //   firstName: 'Isaiah',
        //   lastName: 'Oliver',
        //   id: 15064,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'FS'
        // }, 
        // 'Defense-CB-1' : {
        //   firstName: 'Foye',
        //   lastName: 'Oluokun',
        //   id: 14975,
        //   status: 'Starter',
        //   abbreviation: 'ATL',
        //   position: 'LB'
        // },
        'Offense-WR-2' : {
          firstName: 'Russell',
          lastName: 'Gage',
          id: 14658,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'WR'
        },
        
      }
    ],
    '60': [
      {
        'gdate': 3,
        'Offense-QB-1' : {
          firstName: 'Justin',
          lastName: 'Fields',
          id: 30439,
          status: 'Starter',
          abbreviation: 'CHI',
          position: 'QB'
        },
        // 'Offense-RB-1' : {
        //   firstName: 'David',
        //   lastName: 'Montgomery',
        //   id: 16039,
        //   status: 'Starter',
        //   abbreviation: 'CHI',
        //   position: 'RB'
        // }, 
        
      }
    ],
    '66': [
      {
        'gdate': 19,
        'Defense-DE-1' : {
          firstName: 'Joe',
          lastName: 'Schobert',
          id: 9834,
          status: 'Starter',
          abbreviation: 'JAX',
          position: 'MLB'
        }, 
        // 'Defense-CB-1' : {
        //   firstName: 'Sidney',
        //   lastName: 'Jones IV',
        //   id: 13283,
        //   status: 'Starter',
        //   abbreviation: 'JAX',
        //   position: 'CB'
        // },
        'Offense-TE-1' : {
          firstName: 'Tyler',
          lastName: 'Eifert',
          id: 6486,
          status: 'Starter',
          abbreviation: 'JAX',
          position: 'TE'
        },
        
      }
    ],
    '75': [
      {
        'gdate': 1,
        // 'Defense-CB-1' : {
        //   firstName: 'Joey',
        //   lastName: 'Bosa',
        //   id: 9996,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'DE'
        // }, 
        // 'Defense-CB-1' : {
        //   firstName: 'Melvin',
        //   lastName: 'Ingram III',
        //   id: 8253,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'DE'
        // },
        // 'Offense-RB-1' : {
        //   firstName: 'Joshua',
        //   lastName: 'Kelley',
        //   id: 18882,
        //   status: 'Starter',
        //   abbreviation: 'LAC',
        //   position: 'RB'
        // },
        'Offense-WR-2' : {
          firstName: 'Keenan',
          lastName: 'Allen',
          id: 8199,
          status: 'Starter',
          abbreviation: 'LAC',
          position: 'WR'
        },
        
      }
    ],
    '59': [
      {
        'gdate': 3,
        // 'Defense-DE-1' : {
        //   firstName: 'Bud',
        //   lastName: 'Dupree',
        //   id: 8153,
        //   status: 'Starter',
        //   abbreviation: 'PIT',
        //   position: 'OLB'
        // }, 
        'Offense-WR-1' : {
          firstName: 'Chase',
          lastName: 'Claypool',
          id: 18672,
          status: 'Starter',
          abbreviation: 'PIT',
          position: 'WR'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'JuJu',
        //   lastName: 'Smith-Schus',
        //   id: 13203,
        //   status: 'Starter',
        //   abbreviation: 'PIT',
        //   position: 'WR'
        // },
        
      }
    ],
    '56': [
      {
        'gdate': 2,
        // 'Defense-LB-1' : {
        //   firstName: 'Patrick',
        //   lastName: 'Queen',
        //   id: 18566,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'LB'
        // }, 
        // 'Defense-DE-1' : {
        //   firstName: 'Calias',
        //   lastName: 'Campbell',
        //   id: 5976,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'DE'
        // }, 
        // 'Defense-CB-1' : {
        //   firstName: 'Marcus',
        //   lastName: 'Peters',
        //   id: 7348,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'CB'
        // },
        'Offense-TE-1' : {
          firstName: 'Mark',
          lastName: 'Andrews',
          id: 14486,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'TE'
        },
        'Offense-WR-2' : {
          firstName: 'Hollywood',
          lastName: 'Brown',
          id: 16931,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'WR'
        },
        // 'Offense-QB-1' : {
        //   firstName: 'Lamar',
        //   lastName: 'Jackson',
        //   id: 14523,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'QB'
        // },
        
        
      }
    ],
    '63': [
      {
        'gdate': 1,
         
        'Offense-RB-1' : {
          firstName: 'Dalvin',
          lastName: 'Cook',
          id: 13132,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'RB'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Justin',
        //   lastName: 'Jefferson',
        //   id: 18648,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'WR'
        // },
        'Offense-TE-1' : {
          firstName: 'Adam',
          lastName: 'Thielen',
          id: 7478,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'WR'
        },
        // 'Defense-DE-1' : {
        //   firstName: 'Eric',
        //   lastName: 'Kendricks',
        //   id: 7523,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'MLB'
        // },
        // 'Defense-CB-1' : {
        //   firstName: 'Eric',
        //   lastName: 'Wilson',
        //   id: 13156,
        //   status: 'Starter',
        //   abbreviation: 'MIN',
        //   position: 'LB'
        // },
        
        
      }
    ],
    '49': [
      {
        'gdate': 3,
        // 'Defense-DE-1' : {
        //   firstName: 'Emmanuel',
        //   lastName: 'Ogbah',
        //   id: 9832,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'DE'
        // },
        // 'Defense-CB-1' : {
        //   firstName: 'Jerome',
        //   lastName: 'Baker',
        //   id: 14993,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'OLB'
        // },
        'Offense-WR-2' : {
          firstName: 'Jaylen',
          lastName: 'Waddle',
          id: 30434,
          status: 'Starter',
          abbreviation: 'MIA',
          position: 'WR'
        },
        'Offense-TE-1' : {
          firstName: 'Mike',
          lastName: 'Gesicki',
          id: 14706,
          status: 'Starter',
          abbreviation: 'MIA',
          position: 'TE'
        },
        
        
      }
    ],
    '65': [
      {
        'gdate': 1,
        // 'Defense-DE-1' : {
        //   firstName: 'Bobby',
        //   lastName: 'Okereke',
        //   id: 16774,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'ILB'
        // },
        // 'Defense-CB-1' : {
        //   firstName: 'Denico',
        //   lastName: 'Autry',
        //   id: 7962,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'CB'
        // },
        // 'Defense-S-1' : {
        //   firstName: 'Khari',
        //   lastName: 'Willis',
        //   id: 16737,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'FS'
        // },
        // 'Offense-TE-1' : {
        //   firstName: 'Mo',
        //   lastName: 'Alie-Cox',
        //   id: 12672,
        //   status: 'Starter',
        //   abbreviation: 'IND',
        //   position: 'TE'
        // },
        'Offense-WR-2' : {
          firstName: 'Zach',
          lastName: 'Pascal',
          id: 13173,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'WR'
        },
        
      }
    ],
    '67': [
      {
        'gdate': 2,
        'Offense-WR-2' : {
          firstName: 'A.J.',
          lastName: 'Brown',
          id: 16786,
          status: 'Starter',
          abbreviation: 'TEN',
          position: 'WR'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Jonnu',
        //   lastName: 'Smith',
        //   id: 13529,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'TE'
        // },
        // 'Defense-CB-1' : {
        //   firstName: 'Jayon',
        //   lastName: 'Brown',
        //   id: 13511,
        //   status: 'Starter',
        //   abbreviation: 'TEN',
        //   position: 'ILB'
        // },
        
        
      }
    ],
    '71': [
      {
        'gdate': 19,
        'Defense-DE-1' : {
          firstName: 'Devin',
          lastName: 'White',
          id: 16242,
          status: 'Starter',
          abbreviation: 'TB',
          position: 'LB'
        },
        'Offense-RB-1' : {
          firstName: 'Leonard',
          lastName: 'Fournette',
          id: 12606,
          status: 'Starter',
          abbreviation: 'TB',
          position: 'RB'
        },  
      }
    ],
    '73': [
      {
        'gdate': 1,
        // 'Defense-DE-1' : {
        //   firstName: 'Frank',
        //   lastName: 'Clark',
        //   id: 8323,
        //   status: 'Starter',
        //   abbreviation: 'KC',
        //   position: 'DE'
        // },
        // 'Defense-S-1' : {
        //   firstName: 'Damien',
        //   lastName: 'Wilson',
        //   id: 6718,
        //   status: 'Starter',
        //   abbreviation: 'KC',
        //   position: 'OLB'
        // }, 
        'Offense-WR-1' : {
          firstName: 'Tyreek',
          lastName: 'Hill',
          id: 9910,
          status: 'Starter',
          abbreviation: 'KC',
          position: 'WR'
        }, 
      }
    ],
    '77': [
      {
        'gdate': 1,
        // 'Offense-QB-1' : {
        //   firstName: 'Jared',
        //   lastName: 'Goff',
        //   id: 9919,
        //   status: 'Starter',
        //   abbreviation: 'LA',
        //   position: 'QB'
        // },
        'Offense-WR-2' : {
          firstName: 'Robert',
          lastName: 'Woods',
          id: 6225,
          status: 'Starter',
          abbreviation: 'LA',
          position: 'WR'
        },
          
      }
    ],
         
    }

    this.nbaDepth = {
        '100': [
          {
            'gdate': 'Sun Dec 27 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
            'Starter1' : {
              firstName: 'Anthony',
              lastName: 'Edwards',
              id: 27638,
              status: 'Starter',
              abbreviation: 'MIN',
              position: 'SG'
            },
            'Starter2' : {
              firstName: 'DeAngelo',
              lastName: 'Russell',
              id: 9285,
              status: 'Starter',
              abbreviation: 'MIN',
              position: 'SG'
            },
        }
      ],
      '94': [
        {
          'gdate': 'Wed Feb 3 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
          'Starter5' : {
            firstName: 'Ish',
            lastName: 'Smith',
            id: 9425,
            status: 'Starter',
            abbreviation: 'WAS',
            position: 'PG'
          },
      }
    ],

    }

  this.nhlDepth = {
      '100': [
        {
          'gdate': 'Sun Dec 27 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
          'DefensePair1-R' : {
            firstName: 'Anthony',
            lastName: 'Edwards',
            id: 27638,
            status: 'Starter',
            abbreviation: 'MIN',
            position: 'SG'
          },
          'ForwardLine1-LW' : {
            firstName: 'DeAngelo',
            lastName: 'Russell',
            id: 9285,
            status: 'Starter',
            abbreviation: 'MIN',
            position: 'SG'
          },
      }
    ],
    '94': [
      {
        'gdate': 'Wed Feb 3 2021 00:00:00 GMT-0700 (Pacific Daylight Time)',
        'Starter5' : {
          firstName: 'Ish',
          lastName: 'Smith',
          id: 9425,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'PG'
        },
    }
  ],

  }
}
  
  public getActualStarters() {
    return this.actualStarters;
  }
  public getNFLDepth() {
    return this.nflDepth;
  }
  public getNBADepth() {
    return this.nbaDepth;
  }
  public getNHLDepth() {
    return this.nhlDepth;
  }
}
