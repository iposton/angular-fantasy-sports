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
          'gdate': 8,
          'Offense-WR-1' : {
            firstName: 'Travis',
            lastName: 'Fulgham',
            id: 16422,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'WR'
          },
          'Offense-RB-1' : {
            firstName: 'Boston',
            lastName: 'Scott',
            id: 14716,
            status: 'Starter',
            abbreviation: 'PHI',
            position: 'RB'
          },
          'Defense-LB-1' : {
            firstName: 'Nate',
            lastName: 'Gerry',
            id: 13276,
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
        'gdate': 8,
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
        'gdate': 8,
        'Defense-LB-1' : {
          firstName: 'Ja Whaun',
          lastName: 'Bentley',
          id: 15000,
          status: 'Starter',
          abbreviation: 'NE',
          position: 'LB'
        },
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
        'gdate': 8,
        'Defense-LB-1' : {
          firstName: 'Blake',
          lastName: 'Martinez',
          id: 9878,
          status: 'Starter',
          abbreviation: 'NYG',
          position: 'LB'
        },
      }
    ],
    '74': [
      {
        'gdate': 8,
        'Defense-CB-1' : {
          firstName: 'Maxx',
          lastName: 'Crosby',
          id: 17040,
          status: 'Starter',
          abbreviation: 'LV',
          position: 'DE'
        },
      }
    ],
    '78': [
      {
        'gdate': 8,
        'Defense-DE-1' : {
          firstName: 'Arik',
          lastName: 'Armstead',
          id: 8420,
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
    }
  ],
  '79': [
    {
      'gdate': 8,
      'Defense-DE-1' : {
        firstName: 'Bobby',
        lastName: 'Wagner',
        id: 8350,
        status: 'Starter',
        abbreviation: 'SEA',
        position: 'MLB'
      },
      
      }
    ],
    '76': [
      {
        'gdate': 8,
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
        
      }
    ],
    '55': [
      {
        'gdate': 8,
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
        
      }
    ],
    '52': [
      {
        'gdate': 8,
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
          
      }
    ],
    '51': [
      {
        'gdate': 8,
        'Defense-DE-1' : {
          firstName: 'Neville',
          lastName: 'Hewitt',
          id: 7426,
          status: 'Starter',
          abbreviation: 'NYJ',
          position: 'LB'
        }, 
      }
    ],
    '69': [
      {
        'gdate': 'Thu Oct 29 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        'Defense-DE-1' : {
          firstName: 'Jeremy',
          lastName: 'Chinn',
          id: 18570,
          status: 'Starter',
          abbreviation: 'CAR',
          position: 'SS'
        }, 
      }
    ],
    '70': [
      {
        'gdate': 8,
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
        'Offense-WR-1' : {
          firstName: 'Tre Quan',
          lastName: 'Smith',
          id: 14717,
          status: 'Starter',
          abbreviation: 'NO',
          position: 'WR'
        },
      }
    ],
    '48': [
      {
        'gdate': 8,
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
      }
    ],
    '62': [
      {
        'gdate': 8,
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
        'gdate': 8,
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
      }
    ],
    '58': [
      {
        'gdate': 8,
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
        'gdate': 8,
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
        'gdate': 8,
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
        
      }
    ],
    '68': [
      {
        'gdate': 'Thu Oct 29 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Mon Oct 26 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 8,
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
        
      }
    ],
    '75': [
      {
        'gdate': 8,
        'Defense-DE-1' : {
          firstName: 'Joey',
          lastName: 'Bosa',
          id: 9996,
          status: 'Starter',
          abbreviation: 'LAC',
          position: 'DE'
        }, 
        'Defense-CB-1' : {
          firstName: 'Melvin',
          lastName: 'Ingram III',
          id: 8253,
          status: 'Starter',
          abbreviation: 'LAC',
          position: 'DE'
        },
        
      }
    ],
    '59': [
      {
        'gdate': 8,
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
        
      }
    ],
    '56': [
      {
        'gdate': 8,
        'Defense-LB-1' : {
          firstName: 'Patrick',
          lastName: 'Queen',
          id: 18566,
          status: 'Starter',
          abbreviation: 'BAL',
          position: 'LB'
        }, 
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
        
        
      }
    ],
    '63': [
      {
        'gdate': 8,
         
        'Offense-RB-1' : {
          firstName: 'Dalvin',
          lastName: 'Cook',
          id: 13132,
          status: 'Starter',
          abbreviation: 'MIN',
          position: 'RB'
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
        'gdate': 8,
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
        
        
      }
    ],
    '65': [
      {
        'gdate': 8,
        'Defense-DE-1' : {
          firstName: 'Justin',
          lastName: 'Houston',
          id: 7336,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'OLB'
        },
        'Defense-CB-1' : {
          firstName: 'Xavier',
          lastName: 'Rhodes',
          id: 7535,
          status: 'Starter',
          abbreviation: 'IND',
          position: 'CB'
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
