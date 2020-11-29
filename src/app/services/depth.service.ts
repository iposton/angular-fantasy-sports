import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepthService {
  public actualStarters: any;
  public nflDepth: any;

  constructor() {
    this.actualStarters = {
      '122': {
        firstName: 'Lance',
        lastName: 'McCullers Jr.',
        id: 10487,
        status: 'SET',
        gdate: 'Mon Oct 05 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        abbreviation: 'HOU'
      },
      '115': {
        firstName: 'John',
        lastName: 'Curtiss',
        id: 13338,
        status: 'SET',
        gdate: 'Thu Oct 15 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        abbreviation: 'TB'
      },
      '137': {
        firstName: 'Clayton',
        lastName: 'Kershaw',
        id: 10573,
        status: 'SET',
        gdate: 'Tue Oct 20 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        abbreviation: 'LAD'
      }
         
    }

    this.nflDepth = {
      '54': [
        {
          'gdate': 12,
          'Offense-WR-1' : {
            firstName: 'Travis',
            lastName: 'Fulgham',
            id: 16422,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'WR'
          },
          // 'Offense-RB-1' : {
          //   firstName: 'Boston',
          //   lastName: 'Scott',
          //   id: 14716,
          //   status: 'Starter',
          //   abbreviation: 'PHI',
          //   position: 'RB'
          // },
          'Defense-LB-1' : {
            firstName: 'T.J.',
            lastName: 'Edwards',
            id: 16496,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'LB'
          },
          'Defense-CB-1' : {
            firstName: 'Brandon',
            lastName: 'Graham',
            id: 8068,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'DE'
          },
      }
    ],
    '72': [
      {
        'gdate': 12,
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
        'gdate': 12,
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
        'gdate': 12,
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
        //18972 austin mack wr
      }
    ],
    '74': [
      {
        'gdate': 12,
        'Defense-CB-1' : {
          firstName: 'Maxx',
          lastName: 'Crosby',
          id: 17040,
          status: 'Starter',
          abbreviation: 'LV',
          position: 'DE'
        },
        'Defense-DE-1' : {
          firstName: 'Trayvon',
          lastName: 'Mullen',
          id: 16584,
          status: 'Starter',
          abbreviation: 'LV',
          position: 'CB'
        },
      }
    ],
    '78': [
      {
        'gdate': 12,
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
        'Offense-WR-1' : {
          firstName: 'Richie',
          lastName: 'James Jr.',
          id: 14729,
          status: 'Starter',
          abbreviation: 'SF',
          position: 'WR'
        },
    }
  ],
  '79': [
    {
      'gdate': 12,
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
      'Offense-RB-1' : {
        firstName: 'DeeJay',
        lastName: 'Dallas',
        id: 19016,
        status: 'Starter',
        abbreviation: 'SEA',
        position: 'RB'
      },
      // 'Offense-TE-1' : {
      //   firstName: 'DK',
      //   lastName: 'Metcalf',
      //   id: 16123,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'WR'
      // },
      // 'Offense-TE-1' : {
      //   firstName: 'Tyler',
      //   lastName: 'Lockett',
      //   id: 8296,
      //   status: 'Starter',
      //   abbreviation: 'SEA',
      //   position: 'WR'
      // },
      
      }
    ],
    '76': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Budda',
          lastName: 'Baker',
          id: 12685,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'SS'
        },
        'Defense-S-1' : {
          firstName: 'Jordan',
          lastName: 'Hicks',
          id: 8070,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'MLB'
        },
        'Defense-CB-1' : {
          firstName: 'Patrick',
          lastName: 'Peterson',
          id: 6007,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'CB'
        },
        'Defense-LB-1' : {
          firstName: 'De Vondre',
          lastName: 'Campbell',
          id: 9740,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'OLB'
        },
        'Offense-TE-1' : {
          firstName: 'DeAndre',
          lastName: 'Hopkins',
          id: 7013,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'WR'
        },
        'Offense-WR-1' : {
          firstName: 'Christian',
          lastName: 'Kirk',
          id: 14654,
          status: 'Starter',
          abbreviation: 'ARI',
          position: 'WR'
        },
        
      }
    ],
    '55': [
      {
        'gdate': 12,
        'Defense-LB-1' : {
          firstName: 'Jon',
          lastName: 'Bostic',
          id: 6432,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'ILB'
        },
        'Defense-DE-1' : {
          firstName: 'Ryan',
          lastName: 'Kerrigan',
          id: 8794,
          status: 'Starter',
          abbreviation: 'WAS',
          position: 'OLB'
        },
        'Defense-S-1' : {
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
        
      }
    ],
    '52': [
      {
        'gdate': 12,
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
        'gdate': 12,
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
        'Offense-QB-1' : {
          firstName: 'Joe',
          lastName: 'Flacco',
          id: 6114,
          status: 'Starter',
          abbreviation: 'NYJ',
          position: 'QB'
        },
      }
    ],
    '69': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Rasul',
          lastName: 'Douglas',
          id: 13274,
          status: 'Starter',
          abbreviation: 'CAR',
          position: 'CB'
        }, 
        'Defense-CB-1' : {
          firstName: 'Donte',
          lastName: 'Jackson',
          id: 15014,
          status: 'Starter',
          abbreviation: 'CAR',
          position: 'CB'
        }, 
        'Offense-TE-1' : {
          firstName: 'Curtis',
          lastName: 'Samuel',
          id: 12811,
          status: 'Starter',
          abbreviation: 'CAR',
          position: 'WR'
        },
        'Offense-RB-1' : {
          firstName: 'Mike',
          lastName: 'Davis',
          id: 8377,
          status: 'Starter',
          abbreviation: 'CAR',
          position: 'RB'
        }, 
      }
    ],
    '70': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Trey',
          lastName: 'Hendrikson',
          id: 13253,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'DE'
        }, 
        'Defense-CB-1' : {
          firstName: 'Malcom',
          lastName: 'Jenkins',
          id: 8086,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'SS'
        },
        'Defense-LB-1' : {
          firstName: 'Demario',
          lastName: 'Davis',
          id: 7887,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'OLB'
        },
        'Offense-TE-1' : {
          firstName: 'Jared',
          lastName: 'Cook',
          id: 8487,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'TE'
        },
        'Offense-RB-1' : {
          firstName: 'Alvin',
          lastName: 'Kamara',
          id: 13255,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'RB'
        },
        // 'Offense-WR-1' : {
        //   firstName: 'Tre Quan',
        //   lastName: 'Smith',
        //   id: 14717,
        //   status: 'Starter',
        //   abbreviation: 'NO',
        //   position: 'WR'
        // },
      }
    ],
    '48': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Mario',
          lastName: 'Addison',
          id: 6335,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'DE'
        }, 
        'Defense-CB-1' : {
          firstName: 'Taron',
          lastName: 'Johnson',
          id: 16057,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'CB'
        },
        'Defense-S-1' : {
          firstName: 'Jordan',
          lastName: 'Poyer',
          id: 6634,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'FS'
        },
        'Offense-TE-1' : {
          firstName: 'Cole',
          lastName: 'Beasley',
          id: 6657,
          status: 'Starter',
          abbreviation: 'BUF',
          position: 'WR'
        },
      }
    ],
    '62': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Za Darius',
          lastName: 'Smith',
          id: 6160,
          status: 'Starter',
          abbreviation: 'GB',
          position: 'OLB'
        }, 
        'Offense-TE-1' : {
          firstName: 'Robert',
          lastName: 'Tonyan',
          id: 12956,
          status: 'Starter',
          abbreviation: 'GB',
          position: 'TE'
        }, 
        
      }
    ],
    '64': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Zach',
          lastName: 'Cunningham',
          id: 13006,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'ILB'
        }, 
        'Defense-LB-1' : {
          firstName: 'J.J.',
          lastName: 'Watt',
          id: 7051,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'DE'
        },
        'Offense-TE-1' : {
          firstName: 'Brandin',
          lastName: 'Cooks',
          id: 7656,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'WR'
        },
        'Offense-RB-1' : {
          firstName: 'Duke',
          lastName: 'Johnson',
          id: 6560,
          status: 'Starter',
          abbreviation: 'HOU',
          position: 'RB'
        },
      }
    ],
    '58': [
      {
        'gdate': 12,
        'Defense-CB-1' : {
          firstName: 'Myles',
          lastName: 'Garrett',
          id: 12864,
          status: 'Starter',
          abbreviation: 'CLE',
          position: 'DE'
        }, 
        'Defense-LB-1' : {
          firstName: 'Denzel',
          lastName: 'Ward',
          id: 14495,
          status: 'Starter',
          abbreviation: 'CLE',
          position: 'CB'
        },
      }
    ],
    '57': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Carl',
          lastName: 'Lawson',
          id: 12847,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'DE'
        }, 
        'Defense-LB-1' : {
          firstName: 'Josh',
          lastName: 'Bynes',
          id: 6879,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'MLB'
        },
        'Defense-CB-1' : {
          firstName: 'Jessie',
          lastName: 'Bates III',
          id: 14988,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'MLB'
        },
        'Offense-RB-1' : {
          firstName: 'Giovani',
          lastName: 'Bernard',
          id: 6468,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'RB'
        },
        'Offense-TE-1' : {
          firstName: 'Tee',
          lastName: 'Higgins',
          id: 18578,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'WR'
        },
        'Offense-WR-1' : {
          firstName: 'Tyler',
          lastName: 'Boyd',
          id: 9797,
          status: 'Starter',
          abbreviation: 'CIN',
          position: 'WR'
        },
      }
    ],
    '61': [
      {
        'gdate': 12,
        'Defense-CB-1' : {
          firstName: 'Amani',
          lastName: 'Oruwariye',
          id: 16401,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'CB'
        }, 
        'Defense-DE-1' : {
          firstName: 'Duron',
          lastName: 'Harmon',
          id: 7630,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'SS'
        },
        'Defense-LB-1' : {
          firstName: 'Romeo',
          lastName: 'Okwara',
          id: 9958,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'DE'
        },
        'Defense-S-1' : {
          firstName: 'Jamie',
          lastName: 'Collins Sr.',
          id: 7609,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'OLB'
        },
        // 'Offense-RB-1' : {
        //   firstName: 'D Andre',
        //   lastName: 'Swift',
        //   id: 18603,
        //   status: 'Starter',
        //   abbreviation: 'DET',
        //   position: 'RB'
        // },
         'Offense-RB-1' : {
          firstName: 'Adrian',
          lastName: 'Peterson',
          id: 7446,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'RB'
        },
        'Offense-WR-1' : {
          firstName: 'Marvin',
          lastName: 'Jones Jr.',
          id: 6479,
          status: 'Starter',
          abbreviation: 'DET',
          position: 'WR'
        },
        
      }
    ],
    '68': [
      {
        'gdate': 12,
        'Defense-S-1' : {
          firstName: 'Isaiah',
          lastName: 'Oliver',
          id: 15064,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'FS'
        }, 
        'Defense-DE-1' : {
          firstName: 'Foye',
          lastName: 'Oluokun',
          id: 14975,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'LB'
        },
        'Offense-RB-1' : {
          firstName: 'Todd',
          lastName: 'Gurley',
          id: 8469,
          status: 'Starter',
          abbreviation: 'ATL',
          position: 'RB'
        },
        
      }
    ],
    '60': [
      {
        'gdate': 12,
        'Defense-CB-1' : {
          firstName: 'Khalil',
          lastName: 'Mack',
          id: 7981,
          status: 'Starter',
          abbreviation: 'CHI',
          position: 'OLB'
        }, 
        
      }
    ],
    '66': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Joe',
          lastName: 'Schobert',
          id: 9834,
          status: 'Starter',
          abbreviation: 'JAX',
          position: 'MLB'
        }, 
        'Defense-CB-1' : {
          firstName: 'Sidney',
          lastName: 'Jones IV',
          id: 13283,
          status: 'Starter',
          abbreviation: 'JAX',
          position: 'CB'
        },
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
        'gdate': 12,
        // 'Defense-DE-1' : {
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
        'Offense-RB-1' : {
          firstName: 'Joshua',
          lastName: 'Kelley',
          id: 18882,
          status: 'Starter',
          abbreviation: 'LAC',
          position: 'RB'
        },
        'Defense-DE-1' : {
          firstName: 'Michael',
          lastName: 'Davis',
          id: 13377,
          status: 'Starter',
          abbreviation: 'LAC',
          position: 'CB'
        },
        
      }
    ],
    '59': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Bud',
          lastName: 'Dupree',
          id: 8153,
          status: 'Starter',
          abbreviation: 'PIT',
          position: 'OLB'
        }, 
        'Offense-TE-1' : {
          firstName: 'Chase',
          lastName: 'Claypool',
          id: 18672,
          status: 'Starter',
          abbreviation: 'PIT',
          position: 'WR'
        },
        'Offense-WR-1' : {
          firstName: 'JuJu',
          lastName: 'Smith-Schus',
          id: 13203,
          status: 'Starter',
          abbreviation: 'PIT',
          position: 'WR'
        },
        
      }
    ],
    '56': [
      {
        'gdate': 12,
        'Defense-LB-1' : {
          firstName: 'Patrick',
          lastName: 'Queen',
          id: 18566,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'LB'
        }, 
        // 'Defense-DE-1' : {
        //   firstName: 'Calias',
        //   lastName: 'Campbell',
        //   id: 5976,
        //   status: 'Starter',
        //   abbreviation: 'BAL',
        //   position: 'DE'
        // }, 
        'Defense-CB-1' : {
          firstName: 'Marcus',
          lastName: 'Peters',
          id: 7348,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'CB'
        },
        'Offense-TE-1' : {
          firstName: 'Mark',
          lastName: 'Andrews',
          id: 14486,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'TE'
        },
        'Offense-WR-1' : {
          firstName: 'Willie',
          lastName: 'Snead',
          id: 7665,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'WR'
        },
        
        
      }
    ],
    '63': [
      {
        'gdate': 12,
         
        'Offense-RB-1' : {
          firstName: 'Dalvin',
          lastName: 'Cook',
          id: 13132,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'RB'
        },
        'Offense-TE-1' : {
          firstName: 'Justin',
          lastName: 'Jefferson',
          id: 18648,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'WR'
        },
        'Offense-WR-1' : {
          firstName: 'Adam',
          lastName: 'Thielen',
          id: 7478,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'WR'
        },
        'Defense-DE-1' : {
          firstName: 'Eric',
          lastName: 'Kendricks',
          id: 7523,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'MLB'
        },
        'Defense-CB-1' : {
          firstName: 'Eric',
          lastName: 'Wilson',
          id: 13156,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'LB'
        },
        
        
      }
    ],
    '49': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Emmanuel',
          lastName: 'Ogbah',
          id: 9832,
          status: 'Starter',
          abbreviation: 'MIA',
          position: 'DE'
        },
        'Defense-CB-1' : {
          firstName: 'Jerome',
          lastName: 'Baker',
          id: 14993,
          status: 'Starter',
          abbreviation: 'MIA',
          position: 'OLB'
        },
        // 'Offense-TE-1' : {
        //   firstName: 'Jakeem',
        //   lastName: 'Grant',
        //   id: 9929,
        //   status: 'Starter',
        //   abbreviation: 'MIA',
        //   position: 'WR'
        // },
        
        
      }
    ],
    '65': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Bobby',
          lastName: 'Okereke',
          id: 16774,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'ILB'
        },
        'Defense-CB-1' : {
          firstName: 'Denico',
          lastName: 'Autry',
          id: 7962,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'CB'
        },
        'Defense-S-1' : {
          firstName: 'Khari',
          lastName: 'Willis',
          id: 16737,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'FS'
        },
        'Offense-TE-1' : {
          firstName: 'Mo',
          lastName: 'Alie-Cox',
          id: 12672,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'TE'
        },
        'Offense-WR-1' : {
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
        'gdate': 12,
        'Offense-WR-1' : {
          firstName: 'A.J.',
          lastName: 'Brown',
          id: 16786,
          status: 'Starter',
          abbreviation: 'TEN',
          position: 'WR'
        },
        'Offense-TE-1' : {
          firstName: 'Jonnu',
          lastName: 'Smith',
          id: 13529,
          status: 'Starter',
          abbreviation: 'TEN',
          position: 'TE'
        },
        'Defense-CB-1' : {
          firstName: 'Jayon',
          lastName: 'Brown',
          id: 13511,
          status: 'Starter',
          abbreviation: 'TEN',
          position: 'ILB'
        },
        
        
      }
    ],
    '71': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Devin',
          lastName: 'White',
          id: 16242,
          status: 'Starter',
          abbreviation: 'TB',
          position: 'LB'
        }, 
      }
    ],
    '73': [
      {
        'gdate': 12,
        'Defense-DE-1' : {
          firstName: 'Frank',
          lastName: 'Clark',
          id: 8323,
          status: 'Starter',
          abbreviation: 'KC',
          position: 'DE'
        },
        'Defense-S-1' : {
          firstName: 'Damien',
          lastName: 'Wilson',
          id: 6718,
          status: 'Starter',
          abbreviation: 'KC',
          position: 'OLB'
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
}
