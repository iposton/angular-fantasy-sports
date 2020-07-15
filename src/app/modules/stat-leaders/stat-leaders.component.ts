import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NBADataService, 
  NHLDataService, 
  DataService,
  UtilService, 
  GoogleAnalyticsService,
  NFLDataService } from '../../services/index';
import { DomSanitizer } from '@angular/platform-browser';
import * as CryptoJS from 'crypto-js';
import { forkJoin } from 'rxjs';

let headers = null;
let today = new Date();

@Component({
  selector: 'app-stat-leaders',
  templateUrl: './stat-leaders.component.html',
  styleUrls: ['./stat-leaders.component.scss']
})
export class StatLeadersComponent implements OnInit {

  public teamRef: Array <any>;
  public allSentData: Array <any>;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nba/2019-2020-regular";
  public nflApiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-2021-regular";
  public myData: Array <any>;
  public mlbPitchingData: Array <any>;
  public mlbHittingData: Array <any>;
  public nflOffenseData: Array <any>;

  public nflQBData: Array <any>;
  public nflRushData: Array <any>;
  public nflRecData: Array <any>;
  public nflDefenseData: Array <any>;
  public nflKickerData: Array <any>;
  public newKickerData: Array <any>;
  public newQBData: Array <any>;
  public newRushData: Array <any>;
  public newRecData: Array <any>;
  public newDefenseData: Array <any>;

  public nhlSkaters: Array <any>;
  public nhlGoaltenders: Array <any>;
  public loading: boolean = true;
  public nhlSkaterloading: boolean;
  public nhlGoalieloading: boolean;
  public mlbPitchingLoading: boolean;
  public mlbHittingLoading: boolean;
  public nflOffenseLoading: boolean;
  public nflDefenseLoading: boolean;
  public noGamesMsg: string = '';
  public errMessage: string = '';
  public tsDate: any;
  public nbaTeams: any;
  public nhlTeams: any;
  public mlbTeams: any;
  public nflTeams: any;
  public mobile: boolean = false;
  public stats: any = '1';
  public twitter: boolean = false;
  public selected: any;
  public playerImages: any;
  public tomorrowDate: any;
  public mlbSection: boolean = false;
  public mlbHittingSection: boolean = false;
  public nbaSection: boolean = true;
  public nhlSection: boolean = false;
  public nflSection: boolean = false;
  public nflDefenseSection: boolean = false;
  public nflTeamLoading: boolean = true;
  public nhlGoalies: boolean = false;
  public weekResults: boolean = false;
  public page: number = 19;
  public amount: number = -1;
  public getAll: boolean = true;
  public isOpen: boolean = false;
  public tweetsData: Array <any> = [];
  public noPosts: any;
  public submitting: boolean = false;
  public selectedPlayer: any;
  public type: any;
  public nflTeamStats: any;
  public name: any;
  public image: any;
  public teamSchedules: Array <any> = [];
  public nflPlayers: Array <any> = [];
  public nflDPlayers: Array <any> = [];
  public nflDraftKit: boolean = false;
  public seasonLength   : string = 'full';
  public seasonLengthD  : string = 'full';
  
  constructor(private nbaService: NBADataService,
              private nhlService: NHLDataService,
              private mlbService: DataService,
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private util: UtilService,
              public gaService: GoogleAnalyticsService,
              public nflService: NFLDataService) {
    //this.allSentData = this.nbaService.getSentStats();
    //this.players = this.allSentData[0];
    //this.myData = this.allSentData[1];
    //this.dailySchedule = this.allSentData[2];
    this.stats = '1';
    this.nbaTeams = this.util.getNBATeams();
    this.nhlTeams = this.util.getNHLTeams();
    this.mlbTeams = this.util.getMLBTeams();
    this.nflTeams = this.util.getNFLTeams();
    this.playerImages = this.util.getNBAImages();
    
    let thisDate = new Date();
    this.tomorrowDate = new Date(thisDate.getTime() + (48 * 60 * 60 * 1000));
  }

  public authorize(event: object) {
    this.isOpen = true;
    this.submitting = true;
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('/authorize', {headers}).subscribe((res) => {
      this.openModal(event['player'], headers, event['type']);
    });
  }

  public openModal(player, headers, type) {
    this.type = type;
    this.selectedPlayer = null;
    this.noPosts = '';
    this.selectedPlayer = player;
    //this.gaService.eventEmitter("nba player info "+(data.playerObj ? data.playerObj.player.lastName : data.player.lastName), "nbatwitter", "tweet", "click", 10);
    let twitter = null;
    twitter = type === 'nba' ? this.nbaTeams[player.player['currentTeam'].abbreviation].twitter : type === 'nhl' ? this.nhlTeams[player.player['currentTeam'].abbreviation].twitter : player.team.twitter;
    let searchterm = null;
    searchterm = 'query=' + player.player.lastName + ' ' + twitter;
    this.image = player.player.officialImageSrc;
    this.name = player.player.firstName + ' ' + player.player.lastName +' - '+ player.player.primaryPosition +' | #'+ player.player.jerseyNumber;
    this.http.post('/search', searchterm, {headers}).subscribe((res) => {
      this.submitting = false;
      this.tweetsData = res['data'].statuses;
      if (this.tweetsData.length === 0) {
        this.noPosts = "No Tweets.";
      }
    });
  }

  public getByDate(event) {
    this.loading = true;
    this.getAll = event;
    this.myData = [];
    this.nhlSkaters = [];
    this.nhlGoaltenders = [];
    this.loadData();
  }

  loadData() {

    this.nbaService
      .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));
        let nflRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-regular";
        this.nbaService
          .sendHeaderOptions(headers);
        this.nhlService
          .sendHeaderOptions(headers);
        this.mlbService
          .sendHeaderOptions(headers);
        this.nflService
          .sendHeaderOptions(headers, '1', nflRoot);

        this.sortNBA();
        
      });

  }

  public sortNHL() {
    this.nbaSection = false; 
    this.nhlSection = true; 
    this.mlbSection = false;
    this.mlbHittingSection = false;
    this.nhlGoalies = false;
    this.nflSection = false;
    this.nflDefenseSection = false;

    if (this.nhlGoaltenders == null) {
      this.nhlGoalieloading = true;
      this.nhlSkaterloading = true;
  
  
      this.nhlService
         .getAllStats('goalies').subscribe(res => {
          const nhlTeamsArray = Object.values(this.nhlTeams);
          this.nhlGoaltenders = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5);
  
            for (let team of nhlTeamsArray) {
              for (let data of this.nhlGoaltenders) { 
                if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                  data.team.logo = team['officialLogoImageSrc'];
                  data.team.city = team['city'];
                  data.team.name = team['name'];
                }
  
                if (data.player.officialImageSrc == null) {
                  data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
                }
                
              }  
            }
            this.nhlGoalieloading = false;
      })
    
    

    this.nhlService
       .getAllStats('skaters').subscribe(res => {
        const nhlTeamsArray = Object.values(this.nhlTeams);

        this.nhlSkaters = res['playerStatsTotals'].filter(
          player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5);

          for (let team of nhlTeamsArray) {
            for (let data of this.nhlSkaters) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
              }

              if (data.player.officialImageSrc == null) {
                data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
              }
              
            }  
          }

       this.nhlSkaterloading = false;
    })

  }
  }

  public async sortNBA() {
      this.nbaService
       .getAllStats(this.getAll).subscribe(res => {
          const nbaTeamsArray = Object.values(this.nbaTeams);

          this.myData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 5 && player.stats.offense.pts > 200);

          for (let team of nbaTeamsArray) {
            for (let data of this.myData) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                this.loading = false;
              }

              if (data.player.officialImageSrc == null) {
                data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
              }
              
            }  
          }
      }) 
  }

  public goAnchor(data) {
    let anchor = "";
    anchor = data;
    if (data === 'top') {
      document.querySelector("div[id="+anchor+"]").scrollIntoView();
    } else {
      document.querySelector("mat-card[id="+anchor+"]").scrollIntoView({behavior: "smooth"});
    } 
  }


  ngOnInit() {
    if (window.innerWidth < 700) { // 768px portrait
      this.mobile = true;
    }
     if (this.myData === undefined) {
      this.loadData();
      console.log('fetch data on init...');
     } else {
        this.loading = false;
     }
  }

  public loadMLB() {
    //this.loading = true;
    this.nbaSection = false; 
    this.nhlSection = false; 
    this.mlbSection = true;
    this.mlbHittingSection = false; 
    this.nhlGoalies = false;
    this.nflSection = false;
    this.nflDefenseSection = false;

    if (this.mlbPitchingData == null) {

    this.mlbPitchingLoading = true;
    this.mlbHittingLoading = true;

    this.mlbService
       .getAllStats().subscribe(res => {
          //this.loading = false;
          //const mlbTeamsArray = Object.values(this.nbaTeams);

          this.mlbPitchingData = res['playerStatsTotals'].filter(
            player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 30 && player.stats.pitching.pitcherStrikeouts > 25);

          for (let team of this.mlbTeams) {
            for (let data of this.mlbPitchingData) { 
              if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
                data.team.logo = team['officialLogoImageSrc'];
                data.team.city = team['city'];
                data.team.name = team['name'];
                data.team.twitter = team['socialMediaAccounts'][0].value;
                //this.loading = false;
                
              }

              // if (data.player.officialImageSrc == null) {
              //   data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
              // }
              
            }  
          }
          this.mlbPitchingLoading = false;
      })

      this.mlbService
        .getAllHitters().subscribe(res => {
         //this.loading = false;
         //const mlbTeamsArray = Object.values(this.nbaTeams);

         this.mlbHittingData = res['playerStatsTotals'].filter(
           player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].abbreviation === player.team.abbreviation && player.stats != null && player.stats.gamesPlayed > 30 && player.stats.batting.atBats > 80);

         for (let team of this.mlbTeams) {
           for (let data of this.mlbHittingData) { 
             if (data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
               data.team.logo = team['officialLogoImageSrc'];
               data.team.city = team['city'];
               data.team.name = team['name'];
               data.team.twitter = team['socialMediaAccounts'][0].value;
              // this.loading = false;
             }

             // if (data.player.officialImageSrc == null) {
             //   data.player.officialImageSrc = this.playerImages[data.player.id] != null ? this.playerImages[data.player.id].image : null;
             // }
             
           }  
         }
         this.mlbHittingLoading = false;
     })
    }
  }

  public loadNFL() {
    //this.loading = true;
    this.nbaSection = false; 
    this.nhlSection = false; 
    this.mlbSection = false; 
    this.nhlGoalies = false;
    this.mlbHittingSection = false;
    this.nflSection = true;

    if (this.nflQBData == null) {

    this.nflOffenseLoading = true;
    this.nflDefenseLoading = true;
    console.log(this.nflTeams, 'nfl teams');

    // function removeDuplicatesBy(keyFn, array) {
    //   var mySet = new Set();
    //   return array.filter(function(x) {  
    //       var key = keyFn(x), isNew = !mySet.has(key);
    //       if (isNew) mySet.add(key);  
    //       return isNew;
    //   });
    // }

    function teamInfo(array, teams, type) {
      for (let team of teams) {
        for (let data of array) { 
          if (type === 'o' && data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
            data.team.logo = team['officialLogoImageSrc'];
            data.team.city = team['city'];
            data.team.name = team['name'];
            data.team.twitter = team['socialMediaAccounts'][0].value;
            data.team.dtr = team['dtr'];
            data.team.dfh = team['dfh'];
            data.team.dsh = team['dsh'];
            data.team.abbreviation = team['abbreviation'];
          }

          if (type === 'd' && data.player['currentTeam'] != null && team['id'] === data.player['currentTeam'].id && data.player['currentTeam'].id === data.team.id) {
            data.team.logo = team['officialLogoImageSrc'];
            data.team.city = team['city'];
            data.team.name = team['name'];
            data.team.twitter = team['socialMediaAccounts'][0].value;
            data.team.otr = team['otr'];
            data.team.ofh = team['ofh'];
            data.team.osh = team['osh'];
            data.team.abbreviation = team['abbreviation'];
          }
        }  
      }
    }

    this.nflService
      .getAllOffense('qb', '19').subscribe(res => {
        this.nflQBData = res['playerStatsTotals'].filter(
          player => player.stats != null && player.stats.gamesPlayed > 6);

      this.nflService
        .getAllOffense('qb', '20').subscribe(res => {
          this.newQBData = res['players'].filter(
            player => player['teamAsOfDate'] != null);;
          for (let n of this.newQBData) {
            for (let old of this.nflQBData) {
              if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
                old.player['currentTeam'].id = n['teamAsOfDate'].id;
                old.team.id = n['teamAsOfDate'].id;
              }
              
              if (old.player.id === 8550) {
                old.player['currentTeam'].id = 70;
                old.team.id = 70;
                old.team.abbreviation = 'NO';
              }

              // if (n.player.id === 18577) {
              //   n['stats'] = {passing: {passYards: 1, passTD: 0}};
              //   n.player['currentTeam'] = {id: n.player.id, abbreviation: n['teamAsOfDate'].abbreviation};
              //   n['team'] = {id: n.player.id, abbreviation: n['teamAsOfDate'].abbreviation};
              //   this.nflQBData.push(n);
              // }
            }
          }
          teamInfo(this.nflQBData, this.nflTeams, 'o');
      });
    });

    this.nflService
      .getAllOffense('run', '19').subscribe(res => {
        this.nflRushData = res['playerStatsTotals'].filter(
          player => player.stats != null && player.stats.gamesPlayed > 6);

      this.nflService
        .getAllOffense('run', '20').subscribe(res => {
          this.newRushData = res['players'];
          for (let n of this.newRushData) {
            for (let old of this.nflRushData) {
              if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
                old.player['currentTeam'].id = n['teamAsOfDate'].id;
                old.team.id = n['teamAsOfDate'].id;
              } 
              
              if (old.player.id === 8550) {
                old.player['currentTeam'].id = 70;
                old.team.id = 70;
                old.team.abbreviation = 'NO';
              }
            }
          }
          teamInfo(this.nflRushData, this.nflTeams, 'o');
          this.nflOffenseLoading = false;
      });
    });

    this.nflService
      .getAllOffense('rec', '19').subscribe(res => {
        this.nflRecData = res['playerStatsTotals'].filter(
          player => player.stats != null && player.stats.gamesPlayed > 6);

      this.nflService
        .getAllOffense('rec', '20').subscribe(res => {
          this.newRecData = res['players'];
          for (let n of this.newRecData ) {
            for (let old of this.nflRecData) {
              if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
                old.player['currentTeam'].id = n['teamAsOfDate'].id;
                old.team.id = n['teamAsOfDate'].id;
              }
            }
          }
          teamInfo(this.nflRecData, this.nflTeams, 'o');
      });
    });


    this.nflService
      .getAllDefense('all', '19').subscribe(res => {
        this.nflDefenseData = res['playerStatsTotals'].filter(
          player => player.stats != null && player.stats.gamesPlayed > 6);
      this.nflService
        .getAllDefense('all', '20').subscribe(res => {
          this.newDefenseData = res['players'];
          for (let n of this.newDefenseData) {
            for (let old of this.nflDefenseData) {
              if (n.player.id === old.player.id && n['teamAsOfDate'] != null) {
                old.player['currentTeam'].id = n['teamAsOfDate'].id;
                old.team.id = n['teamAsOfDate'].id;
              }
            }
          }
          teamInfo(this.nflDefenseData, this.nflTeams, 'd');
          this.nflDefenseLoading = false;
      });
     });
    }

    this.nflService
      .getTeamStats('').subscribe(res => {
        this.nflTeamStats = res['teamStatsTotals'];
        this.nflTeamLoading = false;
    })

    if (this.teamSchedules.length === 0) {
      let team: any;
      let bye: any;
      let abbreviation: any;
      let teamSchedule: { 
        team: any,
        abbreviation: any,
        schedule: any,
        dToughnessRank: any,
        oToughnessRank: any,
        dToughnessFhRank: any,
        oToughnessFhRank: any,
        dToughnessShRank: any,
        oToughnessShRank: any, 
        scheduleTicker: any
      };

      forkJoin(
        this.nflTeams.map(
          g => 
          
           this.http.get(`${this.nflApiRoot}/games.json?team=${g.abbreviation}`, { headers })
          
        )
      )
      .subscribe(res => {
        //console.log(res, 'get team schedules...');
        res.forEach((item, index) => { 
          team = this.nflTeams[index].id;
          bye = this.nflTeams[index].bye;
          abbreviation = this.nflTeams[index].abbreviation;
          teamSchedule = {
            team: team,
            abbreviation: abbreviation,
            schedule: res[index]['games'],
            dToughnessRank: this.getSchedToughness(res[index]['games'], 'd', team, bye),
            oToughnessRank: this.getSchedToughness(res[index]['games'], 'o', team, bye),
            dToughnessFhRank: this.getSchedToughness(res[index]['games'], 'dfh', team, bye),
            oToughnessFhRank: this.getSchedToughness(res[index]['games'], 'ofh', team, bye),
            dToughnessShRank: this.getSchedToughness(res[index]['games'], 'dsh', team, bye),
            oToughnessShRank: this.getSchedToughness(res[index]['games'], 'osh', team, bye),
            scheduleTicker: this.getSchedToughness(res[index]['games'], 't', team, bye)
          }
          this.teamSchedules.push(teamSchedule);
          this.getRank(this.teamSchedules);
        })

      }, (err: HttpErrorResponse) => {       
        console.log(err, 'error getting lineup');
      });
      console.log(this.teamSchedules, 'team schedules ranks', this.nflTeams, 'nfl teams getting schedule rank sort');
      
    }
  }

  public getSchedToughness(sched, type, mainTeam, bye) {
    let halfwayThrough = Math.floor(sched.length / 2);
    let arrayFirstHalf = sched.slice(0, halfwayThrough);
    let arraySecondHalf = sched.slice(halfwayThrough, sched.length);

    if (type === 'd') {
      let sum = 0;
      for (let s of sched) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'o') {
      let sum = 0;
      for (let s of sched) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.offenseRankLs;
          }
        }
      }
      return sum;
    }  else if (type === 't') {
      let sum = [];
      sched.forEach((s, index) => {
        for (let t of this.nflTeams){
          if (s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: '@ '+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          } else if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id) {
            if (index+1 === bye) sum.push({printName: 'BYE ', oRank: 'BYE', dRank: 'BYE', name: bye}); 
            sum.push({printName: 'vs '+t.abbreviation+' ', oRank: t.offenseRankLs, dRank: t.defenseRankLs, name: t.abbreviation});
          }
        }
      })
      return sum;
    } else if (type === 'dfh') {
      let sum = 0;
      for (let s of arrayFirstHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'ofh') {
      let sum = 0;
      for (let s of arrayFirstHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.offenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'dsh') {
      let sum = 0;
      for (let s of arraySecondHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.defenseRankLs;
          }
        }
      }
      return sum;
    } else if (type === 'osh') {
      let sum = 0;
      for (let s of arraySecondHalf) {
        for (let t of this.nflTeams){
          if (s.schedule.awayTeam.id != mainTeam &&
            s.schedule.awayTeam.id === t.id || 
            s.schedule.homeTeam.id != mainTeam &&
            s.schedule.homeTeam.id === t.id) {
            sum += t.offenseRankLs;
          }
        }
      }
      return sum;
    }
  }

  public getRank(schedules) {

    let rank = [];
    let rank2 = [];
    let rankDfh = [];
    let rankOfh = [];
    let rankDsh = [];
    let rankOsh = [];

    if (this.nflTeams && schedules.length > 0) {

      rank = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessRank'] 
        <= b['dToughnessRank']) {
          return -1;
        } else if (a['dToughnessRank']
        >= b['dToughnessRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rank.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rank[index].team === team.id) { 
            team.dtr = index + 1;
          }         
        }
      });

      rank2 = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessRank'] 
        <= b['oToughnessRank']) {
          return -1;
        } else if (a['oToughnessRank']
        >= b['oToughnessRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rank2.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rank2[index].team === team.id) { 
            team.otr = index + 1;
          }         
        }
      });

      rankDfh = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessFhRank'] 
        <= b['dToughnessFhRank']) {
          return -1;
        } else if (a['dToughnessFhRank']
        >= b['dToughnessFhRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankDfh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankDfh[index].team === team.id) { 
            team.dfh = index + 1;
          }         
        }
      });

      rankOfh = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessFhRank'] 
        <= b['oToughnessFhRank']) {
          return -1;
        } else if (a['oToughnessFhRank']
        >= b['oToughnessFhRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankOfh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankOfh[index].team === team.id) { 
            team.ofh = index + 1;
          }         
        }
      });

      rankDsh = schedules.slice().sort((a: any, b: any) => {    
        if (a['dToughnessShRank'] 
        <= b['dToughnessShRank']) {
          return -1;
        } else if (a['dToughnessShRank']
        >= b['dToughnessShRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankDsh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankDsh[index].team === team.id) { 
            team.dsh = index + 1;
          }         
        }
      });

      rankOsh = schedules.slice().sort((a: any, b: any) => {    
        if (a['oToughnessShRank'] 
        <= b['oToughnessShRank']) {
          return -1;
        } else if (a['oToughnessShRank']
        >= b['oToughnessShRank']) {
          return 1;
        } else {
          return 0;
        }
      });

      rankOsh.forEach(async (item, index) => {
        for (let team of this.nflTeams) {
          if (rankOsh[index].team === team.id) { 
            team.osh = index + 1;
          }         
        }
      });

        schedules.forEach((item, index) => {
          for (let team of this.nflTeams) {
            if (schedules[index].team === team.id) { 
              team.dToughnessRank = schedules[index].dToughnessRank;
              team.oToughnessRank = schedules[index].oToughnessRank;
              team.scheduleTicker = schedules[index].scheduleTicker;
              team.dToughnessFhRank = schedules[index].dToughnessFhRank;
              team.oToughnessFhRank = schedules[index].oToughnessFhRank;
              team.dToughnessShRank = schedules[index].dToughnessShRank;
              team.oToughnessShRank = schedules[index].oToughnessShRank;
            }
          }
        });

    }
  }

  public seasonChange(sl) {
    console.log(sl, 'season length changed');
    this.seasonLength = sl;
  }
}

