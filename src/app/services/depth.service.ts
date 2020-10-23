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
          'gdate': 'Thu Oct 22 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        'Defense-CB-1' : {
          firstName: 'Ja Whaun',
          lastName: 'Bentley',
          id: 15000,
          status: 'Starter',
          abbreviation: 'NE',
          position: 'LB'
        },
      }
    ],
    '53': [
      {
        'gdate': 'Thu Oct 22 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
      'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
        'Defense-CB-1' : {
          firstName: 'Aldon',
          lastName: 'Smith',
          id: 8441,
          status: 'Starter',
          abbreviation: 'DAL',
          position: 'LB'
        },
        
        
      }
    ],
    '51': [
      {
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
        'gdate': 'Sun Oct 25 2020 00:00:00 GMT-0700 (Pacific Daylight Time)',
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
