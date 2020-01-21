import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { NFLDataService, UtilService } from '../../services/index';
import { DatePipe, PercentPipe, DecimalPipe } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable, interval, forkJoin } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { OrderBy } from '../../pipes/orderby.pipe';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

let headers = null;
let playerString = null;
let today = new Date();
let teamRef = [];
let weekTimes = null;

@Component({
  selector: 'app-starting-line',
  templateUrl: './starting-line.component.html',
  styleUrls: ['./starting-line.component.scss'],
  animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(180deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ],
})
export class StartingLineComponent implements OnInit {

  public dailySchedule: Array <any>;
  public teamRef: Array <any>;
  public previousGames: Array <any>;
  public players: Array <any>;
  public teamStats: Array <any>;
  public pitcherSpeed: Array <any>;
  public starterIdData: Array <any> = [];
  public isPremiumRank: boolean = false;
  public gameDate: any;
  public apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-2020-regular";
  public serviceRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-2020-regular";
  public showData: Array <any> = [];
  public playerInfo: Array <any>;
  public groups: Array <any>;
  public tsGroups: Array <any>;
  public schedGroups: Array <any>;
  public lineGroups: Array <any>;
  public myData: Array <any>;
  public dailyStats: Array <any>;
  public weekStats: Array <any>;
  public score: Array <any>;
  public gamesToday: boolean = false;
  public noGamesToday: boolean = false;
  public loading: boolean = true;
  public loadingPrevious: boolean = true;
  public liveGames: boolean = false;
  public gameover: boolean = false;
  public postponed: boolean = false;
  public noGamesMsg: string = '';
  public errMessage: string = '';
  public teamSchedule: { team: string, schedule: [] };
  public pitcherspeed: { pitcher: string, pitchspeedStart: string, lastName: string };
  public teamSchedules: Array <any> = [];
  public teamsCompletedPlayingToday: Array <any> = [];
  public selectedWeek: string;
  public tsDate: any;
  public byes: any;
  public dRank: Array <any> = [];
  public oRank: Array <any> = [];
  public tRank: Array <any> = [];
  public winRank: Array <any> = [];
  public win500Rank: Array <any> = [];
  public myRanks: Array <any> = [];
  public mobile: boolean = false;
  public allSentData: Array <any>;
  public isPlayoff: boolean = false;
  public playoffStats: boolean = false;

  constructor(private dataService: NFLDataService, 
              private http: HttpClient,
              private sanitizer: DomSanitizer,
              private util: UtilService) {

    this.allSentData = this.dataService.getSentStats(); 
    console.log(this.allSentData, 'all data');  
    if (this.allSentData.length > 0) {
      this.players = this.allSentData[0];
      this.dRank = this.allSentData[1][0];
      this.oRank = this.allSentData[1][1];
      this.tRank = this.allSentData[1][2];
      this.dailySchedule = this.allSentData[2];
    }

    this.selectedWeek = '1';
    
    weekTimes = this.util.getWeekTimes();
    this.byes = this.util.getByes();

    for (let week of weekTimes) {
      let date = new Date();
      if (date > new Date(week.dateBeg) && date < new Date(week.dateEnd)) {
        this.selectedWeek = week.week;
         
        if (date > new Date('Tue Dec 31 2019 00:00:00 GMT-0700 (Pacific Daylight Time)')) {
          //this.selectedWeek = '17';
          this.isPlayoff = true;
          this.apiRoot = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-playoff"; //2019-2020-regular";
          let utcDate = new Date('Mon Dec 30 2019 00:00:00 GMT-0700 (Pacific Daylight Time)');
          utcDate.setHours(utcDate.getHours() - 8);
          let myDate = new Date(utcDate);
          let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
          this.tsDate = dailyDate;
        } else {
          let utcDate = new Date(week.dateBeg);
          utcDate.setHours(utcDate.getHours() - 8);
          let myDate = new Date(utcDate);
          let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
          this.tsDate = dailyDate; 
        }
      }
    } 
  }

  public getSelectedDate(sWeek) {
    if (sWeek > 17 && this.isPlayoff) {
      this.apiRoot = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-playoff";
      this.loadData();
    } else if (sWeek <= 17 && this.isPlayoff) {
      //this.tsDate = null;
      this.apiRoot = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-2020-regular";
      this.serviceRoot = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2019-2020-regular";
      let utcDate = new Date('Mon Dec 30 2019 00:00:00 GMT-0700 (Pacific Daylight Time)');
      utcDate.setHours(utcDate.getHours() - 8);
      let myDate = new Date(utcDate);
      let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
      this.tsDate = dailyDate;
      this.teamSchedules = [];
      this.loadData();
    }
  }

  public getPlayoffStats() {
    this.serviceRoot = "https://api.mysportsfeeds.com/v2.1/pull/nfl/2020-playoff";
    for (let week of weekTimes) {
      let date = new Date();
      if (date > new Date(week.dateBeg) && date < new Date(week.dateEnd)) {
        this.selectedWeek = week.week;
         
        if (date > new Date('Tue Dec 31 2019 00:00:00 GMT-0700 (Pacific Daylight Time)')) {
          //this.selectedWeek = '17';
          this.isPlayoff = true;
          let utcDate = new Date(week.dateBeg);
          utcDate.setHours(utcDate.getHours() - 8);
          let myDate = new Date(utcDate);
          let dailyDate = myDate.toISOString().slice(0, 10).replace(/-/g, "");
          this.tsDate = dailyDate; 
          this.playoffStats = true;
        }
      } 
    }
    this.onChange(this.selectedWeek);
  }

  public getBackground(color) {
    let lighter = this.util.colorLuminance(color, 0.6);
    if (color === "#c4ced4" || color === "#d3bc8d") {
      color = "#000000";
      lighter = "#555555";
    }    
    if (color === "#000000")
      lighter = "#555555";

    return this.sanitizer.bypassSecurityTrustStyle(`linear-gradient(${color}, ${lighter})`);
  }

  public onChange(week) {
    
    if (week > 17) {
      console.log(week, (week > 17), 'is week greater than 17?');
      this.isPlayoff = true;
      this.getSelectedDate(week);
    } else {
      console.log(week, (week < 17), 'is week less than 17?');
      //
      this.getSelectedDate(week);
    }
   this.loading = true;
   this.selectedWeek = week;
   this.dailySchedule = [];
   this.starterIdData = [];
   playerString = null;
   this.dailyStats = [];
   this.myData = [];
   this.showData = [];
   this.weekStats = [];
  //  this.specificFastballData = [];
   this.teamsCompletedPlayingToday = [];
   this.previousGames = [];
   this.score = [];
   this.players = [];
   this.teamSchedules = [];
  //  this.speedResults = [];
   this.liveGames = false;
   this.gameover = false;
   this.postponed = false;
   this.gamesToday = false;
   this.noGamesMsg = '';
   //this.loadData();
  }

  loadData() {

    this.dataService
      .getEnv().subscribe(res => {
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(res + ":" + 'MYSPORTSFEEDS'));

        this.dataService
          .sendHeaderOptions(headers, this.selectedWeek, this.serviceRoot);

        this.dataService
          .getSchedule(this.selectedWeek).subscribe(res => {
            console.log(res, "schedule...");

            if (res['games'].length === 0) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "There Are No Games Scheduled Today :(";
              console.log('There are no games being played today.');
            } else {

              this.dailySchedule = res['games'];
              this.teamRef = res['references'].teamReferences;
              teamRef = res['references'].teamReferences;
              console.log(this.teamRef, 'tream ref');
              this.gameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime;
              let dPipe = new DatePipe("en-US");

              this.gamesToday = true;
              //console.log(this.dailySchedule, 'sched');
              // let d = new Date();
              // let gd = new Date(this.gameDate);
              if (this.teamSchedules.length === 0) {
                let team;
                let teamSchedule;
                forkJoin(
                  teamRef.map(
                    g => 
                    
                     this.http.get(`${this.apiRoot}/games.json?team=${g.abbreviation}`, { headers })
                    
                  )
                )
                .subscribe(res => {
                  //console.log(res, 'get team schedules...');

                  res.forEach((item, index) => {
                   
                    team = teamRef[index].abbreviation;
                    teamSchedule = {
                      team: team,
                      schedule: res[index]['games']
                    }
                    this.teamSchedules.push(teamSchedule);
                    //console.log(this.teamSchedules, 'schedules array...');

                  })
                  

                  this.sortData();

                }, (err: HttpErrorResponse) => {
                  
                  console.log(err, 'error getting lineup');

              });

              } else {
                this.sortData();
              }

            }
          }, (err: HttpErrorResponse) => {

            console.log(err, 'error getting schedule');

          });

      });

  }

  public getPremiumRank() {
    let touchRank = null;
    let tRank = [];
    touchRank = this.dataService.touchTeamRanks;
    touchRank.forEach(function(item, index){
      for (let team of teamRef) {
       if (touchRank[index].abbreviation === team.abbreviation) { 
         team.touchRank = index + 1; 
       }
      }
     });

     tRank = teamRef.slice().sort((a: any, b: any) => {
      if ((a.teamRank + a.touchRank)
      <= (b.teamRank + b.touchRank)) {
        return -1;
      } else if ((a.teamRank + a.touchRank)
      >= (b.teamRank + b.touchRank)) {
        return 1;
      } else {
        return 0;
      }
    });

    tRank.forEach(function(item, index){
      for (let team of teamRef) {
       if (tRank[index].abbreviation === team.abbreviation) { 
         team.teamRank = index + 1; 
       }
      }
     });

    this.isPremiumRank = true;
    console.log('adjusting rank to include touch rank, Premium Rank');
    this.tRank = tRank;
    this.dataService.sendPremiumRanks(tRank);
    this.myRanks.push(this.dRank, this.oRank, this.tRank);
  }

  public async sortData() {
    if (this.gamesToday === true) {

      let promiseOne;
      promiseOne = new Promise((resolve, reject) => {
        this.dataService
          .getTeamStats(this.tsDate).subscribe(res => {
            console.log(res, 'got team stats!');
            this.teamStats = res['teamStatsTotals'];
            let oSort = [];
            let dSort = [];
            let winSort = [];
            let win500Sort = [];
            let dRank = [];
            let oRank = [];
            let tRank = [];
            let winRank = [];
            let win500Rank = [];
            oSort = res['teamStatsTotals'];
            dSort = res['teamStatsTotals'];
            winSort = res['teamStatsTotals'];
            win500Sort = res['teamStatsTotals'];

            this.dataService
              .getWeek(this.selectedWeek).subscribe(res => {
                console.log(res, "weekly games...");
                this.weekStats = res['gamelogs'];
            });

            winRank = winSort.slice().sort((a: any, b: any) => {

              if (a['stats'].standings.winPct 
               >= b['stats'].standings.winPct) {
                return -1;
              } else if (a['stats'].standings.winPct
               <= b['stats'].standings.winPct) {
                return 1;
              } else {
                return 0;
              }
            });

            winRank.forEach(function(item, index){
              for (let team of teamRef) {
               if (winRank[index].team.abbreviation === team.abbreviation) { 
                 team.winRank = index + 1; 
               }
              }
            });

            //Divide the number of wins by the total number of competitions. 
            //Then multiply the quotient by 100 to calculate the win percentage.

            win500Rank = win500Sort.slice().sort((a: any, b: any) => {

              if ((this.byes[a['team'].abbreviation].winsAgainst500Teams / this.byes[a['team'].abbreviation].gamesAgainst500Teams) * 100
               >= (this.byes[b['team'].abbreviation].winsAgainst500Teams / this.byes[b['team'].abbreviation].gamesAgainst500Teams) * 100) {
                return -1;
              } else if ((this.byes[a['team'].abbreviation].winsAgainst500Teams / this.byes[a['team'].abbreviation].gamesAgainst500Teams) * 100
              <= (this.byes[b['team'].abbreviation].winsAgainst500Teams / this.byes[b['team'].abbreviation].gamesAgainst500Teams) * 100) {
                return 1;
              } else {
                return 0;
              }
            });

            win500Rank.forEach(function(item, index){
              for (let team of teamRef) {
               if (win500Rank[index].team.abbreviation === team.abbreviation) { 
                 team.win500Rank = index + 1; 
               }
              }
            });
            
            dRank = dSort.slice().sort((a: any, b: any) => {

              // if (this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek)) {
              //   console.log(a['team'].abbreviation, 'had a bye');
              //   console.log(a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) + Math.floor(a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)));
              // }
              // if (a['team'].abbreviation === "HOU") {
              //   console.log(a['team'].abbreviation, 'texans');
              //   console.log(a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards));
              // }

              if (a['stats'].standings.pointsAgainst +
              (parseInt(this.selectedWeek) < 13 && this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(a['stats'].standings.pointsAgainst / (parseInt(this.selectedWeek) - 1)) : 0)
               <= b['stats'].standings.pointsAgainst +
               (parseInt(this.selectedWeek) < 13 && this.byes[b['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(b['stats'].standings.pointsAgainst / (parseInt(this.selectedWeek) - 1)) : 0)) {
                return -1;
              } else if (a['stats'].standings.pointsAgainst +
              (parseInt(this.selectedWeek) < 13 && this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(a['stats'].standings.pointsAgainst / (parseInt(this.selectedWeek) - 1)) : 0)
               >= b['stats'].standings.pointsAgainst +
               (parseInt(this.selectedWeek) < 13 && this.byes[b['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(b['stats'].standings.pointsAgainst / (parseInt(this.selectedWeek) - 1)) : 0)) {
                return 1;
              } else {
                return 0;
              }
            });

            dRank.forEach(function(item, index){
              for (let team of teamRef) {
               if (dRank[index].team.abbreviation === team.abbreviation) { 
                 team.dRank = index + 1; 
               }
              }
            });

            oRank = oSort.slice().sort((a: any, b: any) => {
              if (a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) +
              (parseInt(this.selectedWeek) < 13 && this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)) : 0)
              >= b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards) + 
              (parseInt(this.selectedWeek) < 13 && this.byes[b['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)) : 0)) {
                return -1;
              } else if (a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) +
              (parseInt(this.selectedWeek) < 13 && this.byes[a['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(a['stats'].standings.pointsFor + (a['stats'].rushing.rushYards + a['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)) : 0)
              <= b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards) + 
              (parseInt(this.selectedWeek) < 13 && this.byes[b['team'].abbreviation].bye < parseInt(this.selectedWeek) ? Math.floor(b['stats'].standings.pointsFor + (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards) / (parseInt(this.selectedWeek) - 1)) : 0)) {
                return 1;
              } else {
                return 0;
              }
            });
            
           oRank.forEach(function(item, index){
            for (let team of teamRef) {
             if (oRank[index].team.abbreviation === team.abbreviation) { 
               team.oRank = index + 1; 
             }
            }
           });

           tRank = teamRef.slice().sort((a: any, b: any) => {
  
            if ((a.oRank + a.dRank + a.winRank + a.win500Rank)
            <= (b.oRank + b.dRank + b.winRank + b.win500Rank)) {
              return -1;
            } else if ((a.oRank + a.dRank + a.winRank + a.win500Rank)
            >= (b.oRank + b.dRank + b.winRank + b.win500Rank)) {
              return 1;
            } else {
              return 0;
            }
          });
          
         tRank.forEach(function(item, index){
          for (let team of teamRef) {
           if (tRank[index].abbreviation === team.abbreviation) { 
             team.teamRank = index + 1; 
           }
          }
         });
            console.log(tRank, 'first index should be least points against');
            this.dRank = dRank;
            this.oRank = oRank;
            this.tRank = tRank;
            this.winRank = winRank;
            this.win500Rank = win500Rank;
            if (this.dataService.premiumRanks != null) {
              this.tRank = this.dataService.premiumRanks;
              let tRank = [];
              tRank = this.tRank;
              tRank.forEach(function(item, index) {
                for (let team of teamRef) {
                if (tRank[index].abbreviation === team.abbreviation) { 
                  team.teamRank = index + 1; 
                }
                }
              });
              
              this.isPremiumRank = true;
              this.myRanks.push(this.dRank, this.oRank, this.tRank);
              console.log('already have premium ranks no need to get them again.');
            } else if (this.dataService.touchTeamRanks != null) {
              this.getPremiumRank();
            } else if (this.dataService.premiumRanks == null && this.dataService.touchTeamRanks == null) {
              this.myRanks.push(this.dRank, this.oRank, this.tRank);
            }
            resolve();
        });
      });

      let resultOne = await promiseOne;

      this.dataService
        .getDaily(this.selectedWeek).subscribe(res => {
            console.log(res, "Daily stats...");
            this.dailyStats = res['gamelogs'];

            this.dataService
              .getStats(playerString).subscribe(res => {

                  //this.myData = res['playerStatsTotals'];
                  this.myData = res['playerStatsTotals'].filter(
                  player => player.stats.miscellaneous && player.stats.miscellaneous['gamesStarted'] > 0 && (player.player['currentInjury'] == null || player.player['currentInjury'].playingProbability === 'PROBABLE'));

                  if (this.myData) {
                    console.log(this.myData, "cumulative stats...");

                       console.log('start sorting data for real gameID by ID...');
                    
                      if (this.myData && this.dailySchedule) {
                        console.log('start sorting data for daily schedule...');
                        for (let schedule of this.dailySchedule) {

                          for (let sdata of this.myData) {

                            if (schedule.schedule.awayTeam.abbreviation === sdata.team.abbreviation) {

                              sdata.player.gameTime = schedule.schedule.startTime;
                              sdata.team.gameField = schedule.schedule.venue.name;
                              sdata.gameId = schedule.schedule.id;
                              sdata.player.gameLocation = "away";
                              sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;
                              //sdata.team.opponentCity = schedule.schedule.homeTeam.city;
                              sdata.team.opponentId = schedule.schedule.homeTeam.id;
                              if (schedule.score != null) {
                                sdata.teamScore = schedule.score.awayScoreTotal;
                                sdata.opponentScore = schedule.score.homeScoreTotal;
                              }
                              if (schedule.schedule.playedStatus === "COMPLETED") {
                                if (schedule.score.awayScoreTotal > schedule.score.homeScoreTotal) {
                                  sdata.win = 1;
                                }
                                if (schedule.score.awayScoreTotal < schedule.score.homeScoreTotal) {
                                  sdata.loss = 1;
                                }
                                if (schedule.score.awayScoreTotal === schedule.score.homeScoreTotal) {
                                  sdata.tie = 1;
                                }
                              } 
                            }
                            if (schedule.schedule.homeTeam.abbreviation === sdata.team.abbreviation) {

                              sdata.player.gameTime = schedule.schedule.startTime;
                              sdata.team.gameField = schedule.schedule.venue.name;
                              sdata.gameId = schedule.schedule.id;
                              sdata.player.gameLocation = "home";
                              sdata.team.opponent = schedule.schedule.awayTeam.abbreviation;
                              //sdata.team.opponentCity = schedule.schedule.awayTeam.city;
                              sdata.team.opponentId = schedule.schedule.awayTeam.id;
                              if (schedule.score != null) {
                                sdata.teamScore = schedule.score.homeScoreTotal;
                                sdata.opponentScore = schedule.score.awayScoreTotal;
                              }
                              if (schedule.schedule.playedStatus === "COMPLETED") {
                                if (schedule.score.homeScoreTotal > schedule.score.awayScoreTotal) {
                                  sdata.win = 1;
                                }
                                if (schedule.score.homeScoreTotal < schedule.score.awayScoreTotal) {
                                  sdata.loss = 1;
                                }
                                if (schedule.score.homeScoreTotal === schedule.score.awayScoreTotal) {
                                  sdata.tie = 1;
                                }
                              } 
                            }
                          }
                        }
                      }

                       for (let team of teamRef) {
                         for (let data of this.myData) { 
                            if (team.id === data.team.id) {
                              data.team.color = team.teamColoursHex[0];
                              data.team.accent = team.teamColoursHex[1];
                              data.team.logo = team.officialLogoImageSrc;
                              data.team.city = team.city;
                              data.team.name = team.name;
                              data.flip = 'inactive';
                              data.dRank = team.dRank;
                              data.oRank = team.oRank;
                              data.oRank = team.oRank;
                              data.winRank = team.winRank;
                              data.win500Rank = team.win500Rank;
                              data.teamRank = team.teamRank; //Math.floor(((team.dRank*1 + team.oRank*1) /2));
                            } 
                          }  
                       }

                       for (let team of this.teamStats) {
                        for (let data of this.myData) { 
                           if (data.team.opponentId != null && 
                             data.team.opponentId === team.team.id) {
                             data.opponentW = team.stats.standings.wins;
                             data.opponentL = team.stats.standings.losses;
                             data.opponentT = team.stats.standings.ties;
                           }
                         }  
                      }

                      for (let team of this.teamStats) {
                        for (let data of teamRef) { 
                           if (data.id!= null && 
                             data.id === team.team.id) {
                             data.win = team.stats.standings.wins;
                             data.loss = team.stats.standings.losses;
                             data.tie = team.stats.standings.ties;
                           }
                         }  
                      }

                       for (let schedule of this.myData) {
                        for (let sdata of this.myData) {
                          if (sdata.team.opponentId != null && 
                            sdata.team.opponentId === schedule.team.id && 
                            sdata.gameId === schedule.gameId) {
                            sdata.team.opponentLogo = schedule.team.logo;
                            sdata.team.opponentName = schedule.team.name;
                            sdata.opponentDR = schedule.dRank;
                            sdata.opponentOR = schedule.oRank;
                            sdata.opponentTR = schedule.teamRank;
                            sdata.opponentColor = schedule.team.color;
                          }
                        }
                      }

                      for (let schedule of this.dailySchedule) {
                        for (let data of this.myData) {
                          if (schedule.schedule.awayTeam.abbreviation === data.team.abbreviation) {
                              schedule.schedule.awayTeam.color = data.team.color;
                              schedule.schedule.awayTeam.accent = data.team.accent;
                              schedule.schedule.awayTeam.logo = data.team.logo;
                              schedule.schedule.awayTeam.city = data.team.city;
                              schedule.schedule.awayTeam.name = data.team.name;
                              schedule.schedule.awayTeam.dRank = data.dRank;
                              schedule.schedule.awayTeam.oRank = data.oRank;
                              schedule.schedule.awayTeam.teamRank = data.teamRank;
                              
                          }
                          if (schedule.schedule.homeTeam.abbreviation === data.team.abbreviation) {
                              schedule.schedule.homeTeam.color = data.team.color;
                              schedule.schedule.homeTeam.accent = data.team.accent;
                              schedule.schedule.homeTeam.logo = data.team.logo;
                              schedule.schedule.homeTeam.city = data.team.city;
                              schedule.schedule.homeTeam.name = data.team.name;
                              schedule.schedule.homeTeam.dRank = data.dRank;
                              schedule.schedule.homeTeam.oRank = data.oRank;
                              schedule.schedule.homeTeam.teamRank = data.teamRank;
                          }
                          if (schedule.schedule.playedStatus === "LIVE") {
                            this.liveGames = true;
                            console.log('interval set...');
                          }
                        }
                      }

                      // if (this.weekStats.length > 0) {
                      //   for (let week of this.weekStats) {
                      //     for (let data of this.myData) {
                      //       if (data.team.id != null && 
                      //         data.team.id === week.team.id) {
                      //         data.teamScore = week.stats.standings.pointsFor; //.score?.awayScoreTotal
                      //         data.opponentScore = week.stats.standings.pointsAgainst; 
                      //         data.win = week.stats.standings.wins;
                      //         data.loss = week.stats.standings.losses;
                      //         data.tie = week.stats.standings.ties;
                      //         data.otWin = week.stats.standings.otWins;
                      //         data.otLoss = week.stats.standings.otLosses;                  
                      //       }
                      //     }
                      //   } 
                      // }

                     this.groups = this.myData.reduce(function (r, a) {
                      r[a.team.abbreviation] = r[a.team.abbreviation] || [];
                       if (a.player.primaryPosition === 'NT' || a.player.primaryPosition === 'DT' || a.player.primaryPosition === 'DE') {
                         r[a.team.abbreviation].push({'def': 'def', 'playerObj': a});
                         return r;
                       } else {
                         r[a.team.abbreviation].push({'of': 'of', 'playerObj': a});
                        return r;
                       }
                          
                      }, Object.create(null));

                      this.tsGroups = this.teamStats.reduce(function (r, a) {
                        r[a.team.abbreviation] = r[a.team.abbreviation] || [];
                        r[a.team.abbreviation].push(a);
                        return r;
  
                      }, Object.create(null));

                      this.schedGroups = this.teamSchedules.reduce(function (r, a) {
                        r[a.team] = r[a.team] || [];
                        r[a.team].push(a);
                        return r;
  
                      }, Object.create(null));

                      this.lineGroups = Object.keys(this.groups).map((key, index) => {
                        return {team: key, offensePlayers: this.groups[key].filter(item => item.of), defensePlayers: this.groups[key].filter(item => item.def), teamStats: this.tsGroups[key][0].stats, seasonSchedule: this.schedGroups[key] ? this.schedGroups[key][0].schedule : []};
                      });

                     this.showTeams();

                  } else {
                      // this.showData = this.myData;
                      // this.dataService
                      //   .sendStats(this.showData);
                  }

                  this.loading = false;

                },
                (err: HttpErrorResponse) => {
                  if (err instanceof Error) {
                    console.log('api error', err.error.message);
                    // client-side error
                    this.loading = false;
                    this.errMessage = `An error occured ${err.error.message}`;
                  } else {
                    this.loading = false;
                    console.log('api error', err.message);
                    this.errMessage = `${err.status}. Sorry :( Please Try again.`;
                  }
                }
              );
          },
          (err: HttpErrorResponse) => {
            if (err instanceof Error) {
              console.log('api error', err.error.message);
              // client-side error
              this.loading = false;
              this.errMessage = `An error occured ${err.error.message}`;
            } else {
              this.loading = false;
              console.log('api error', err.message);
              this.errMessage = `${err.status}. Sorry :( Please Try again.`;
            }
          }
        );

    } else {
      console.log('No games then no daily stats either. :(');
    }

  }

  public showTeams() {
    this.showData = this.lineGroups;
    console.log(this.showData, 'show data');
    let sendAllData = [];
    sendAllData.push(this.showData, this.myRanks, this.dailySchedule);
    this.dataService
      .sendStats(sendAllData);
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

  flipBack(data) {
    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';
  }

  getPreviousGameStats(data) {

    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';
    this.loadingPrevious = false;
    console.log(data, 'this player has been flipped data...');
    //console.log(this.previousGames, 'previous games find player id');
   // for (let game of this.previousGames) {
     // if (game['schedule'].awayTeam.abbreviation === data.team.abbreviation ||
      ///  game['schedule'].homeTeam.abbreviation === data.team.abbreviation) {

      //  let prevHome = game['schedule'].homeTeam.abbreviation === data.team.abbreviation ? true : false;

        // this.dataService
        //  .getScore(game['schedule'].id).subscribe(res => {

        //    console.log(res, 'score of this previous game');

        //    let players = null;

        //    if (prevHome)
        //      players = res.stats.home.players;
        //    else
        //      players = res.stats.away.players;

        //    for (let item of players) {
        //      if (item.player.id === data.player.id) {
        //         this.getAverages(game['schedule'].id);
        //         let stats = item.playerStats[0].pitching;
        //         console.log(stats, 'stats for', data.player.lastName);
        //         data.pgBlurb1 = (prevHome ? ' vs ' + game['schedule'].awayTeam.abbreviation : ' @ ' +  game['schedule'].homeTeam.abbreviation) + ': ' + stats.pitchesThrown + ' pitches, ' + stats.hitsAllowed + ' hits allowed, sat down ' + stats.pitcherStrikeouts;
        //         data.homeruns1 = stats.homerunsAllowed;
        //         data.previousEra1 = parseFloat(stats.earnedRunAvg).toFixed(2);
        //         data.previousWin1 = stats.wins;
        //         data.previousL1 = stats.losses;
        //         data.previousSO1 = stats.pitcherStrikeouts;
        //         data.walks1 = stats.pitcherWalks;
        //      }
        //    }

        // })

      //  this.http.get(`${this.apiRoot}/games/`+game['schedule'].id+`/playbyplay.json`, { headers })
      // .subscribe(res => {
      //       console.log(res, 'got play by play game data for ' + data.player.lastName);

      //     if (res != null) {}

      //   })
//
   //   }
   // }
   
  }

  // public getAverages(gid) {

  //   this.http.get(`${this.apiRoot}/games/`+gid+`/playbyplay.json`, { headers })
  //     .subscribe(res => {
  //         console.log(res, 'got play by play game data for ');

  //         if (res != null) {

  //         if (res['atBats'] != null) {

  //         res['atBats'].forEach((item2, index) => {

  //            if (item2 != null && item2.atBatPlay.length > 0)
  //              item2.atBatPlay.forEach((item3, index) => {
  //              let f = item3;

  //              if (f.pitch != undefined && f.pitch.ballStartSpeed != undefined) {
  //                //console.log(f.pitch);
  //                this.pitcherspeed = {
  //                  pitcher: f.pitch.pitchingPlayer.id,
  //                  pitchspeedStart: f.pitch.ballStartSpeed,
  //                  lastName: f.pitch.pitchingPlayer.lastName,
  //                }
  //                this.specificFastballData.push(this.pitcherspeed);

     
  //              }

  //            })
  //          })

  //          this.speedResults = this.specificFastballData.reduce(function(r, a) {
  //            r[a.pitcher] = r[a.pitcher] || [];
  //            r[a.pitcher].push(a.pitchspeedStart);
  //            return r
  //          }, Object.create(null));
  //          console.log('made groups of pichers pitch speeds by ID...');

  //        }
  //        this.myData.forEach((data, index) => {


  //          if (this.speedResults[data.player.id]) {
  //            let avg = this.speedResults[data.player.id].reduce((r, a) => {

  //              return r + parseInt(a);

  //            }, 0) / this.speedResults[data.player.id].length;

  //            let max = this.speedResults[data.player.id].reduce(function(a, b) {
  //              return Math.max(a, b);
  //            });

  //            data.player.pitchSpeedAvg = Math.floor(avg);
  //            data.player.fastestPitch = max;

  //            }

  //         });

  //       }
  //      }, (err: HttpErrorResponse) => {

  //           console.log(err, 'error getting playbyplay');

  //      });

  // }


  public getGameStats(data, gid) {
    console.log(data, 'whats going on');

    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';
   
    this.dataService
      .getScore(gid).subscribe(res => {
       
          if (res != null) {
            console.log(res, "Score, Game...");
            this.score = res['scoring'];
            let game = null;
            // game = res['game'].playedStatus; //"COMPLETED" playedStatus: "COMPLETED_PENDING_REVIEW"

            // if (data.player.gameLocation === 'home') {
            //   data.team.teamScore = this.score['homeScoreTotal'];
            //   data.team.opponentScore = this.score['awayScoreTotal'];
            // } else if (data.player.gameLocation === 'away') {
            //   data.team.teamScore = this.score['awayScoreTotal'];
            //   data.team.opponentScore = this.score['homeScoreTotal'];
            // }

            // data.team.currentInning = this.score['currentInning'];
            // data.team.currentInningHalf = this.score['currentInningHalf'];
            // data.gameStatus = game;
            // //console.log(game, 'is game over?');
            // if (game === "COMPLETED" || game === "COMPLETED_PENDING_REVIEW") {
            //   data.team.isGameOver = true;
            //   data.team.isGameInProgress = false;
            //   data.team.isGameUnplayed = false;
            // } else {
            //   data.team.isGameInProgress = true;
            //   data.team.isGameUnplayed = true;
            //   data.team.isGameOver = false;
            // }

        }

   }, (err: HttpErrorResponse) => {

     console.log(err, 'error getting boxscore');

   });
    console.log(`${this.apiRoot}/games/`+gid+`/playbyplay.json`);
    this.http.get(`${this.apiRoot}/games/`+gid+`/playbyplay.json`, { headers })
      .subscribe(res => {
            console.log(res, 'got play by play game data for ' + data.player.lastName);

        //  if (res != null) {

         // if (res['atBats'] != null) {

         //  res['atBats'].forEach((item2, index) => {

         //     //console.log(item2, 'atbatplay items...');
         //     if (data.team.abbreviation === item2.battingTeam.abbreviation)
         //      data.isTeamPitching = false;
         //     else 
         //       data.isTeamPitching = true;
         //     data.battingTeam = item2.battingTeam.abbreviation;
         //     if (item2 != null && item2.atBatPlay.length > 0)
         //       item2.atBatPlay.forEach((item3, index) => {
         //       let f = item3;

         //       if (f.pitch != undefined && f.pitch.ballStartSpeed != undefined) {
         //         //console.log(f.pitch);
         //         this.pitcherspeed = {
         //           pitcher: f.pitch.pitchingPlayer.id,
         //           pitchspeedStart: f.pitch.ballStartSpeed,
         //           lastName: f.pitch.pitchingPlayer.lastName,
         //         }
         //         this.specificFastballData.push(this.pitcherspeed);

         //         data.batter = f.pitch.battingPlayer.firstName +' '+ f.pitch.battingPlayer.lastName; //id: 16046, firstName: "Tommy", lastName: "Edman", position: "2B", jerseyNumber: 19}
         //         data.pitcher = f.pitch.pitchingPlayer.firstName +' '+ f.pitch.pitchingPlayer.lastName; //id: 12389, firstName: "Josh", lastName: "Hader", position: "P", jerseyNumber: 71}
         //         data.pitchResult = f.pitch.result; //"IN_PLAY_OUTS"
         //         data.throwType = f.pitch.throwType; //"FOUR_SEAM_FASTBALL"
         //         data.throwHand = f.pitch.throwingLeftOrRight; //"L"
         //         data.throwSpeed = f.pitch.ballStartSpeed;

         //         if (data.battingTeam !== data.team.abbreviation 
         //           && data.pitcher !== data.player.firstName + ' ' + data.player.lastName)
         //           data.isPitchingRightNow = false;
         //         else 
         //           data.isPitchingRightNow = true;
     
         //       }

         //       if (f.playStatus  != undefined && f.playStatus != null) {
         //             //console.log(f.playStatus, 'play status');
         //             data.team.ballCount = f.playStatus.ballCount;
         //             data.team.strikeCount = f.playStatus.strikeCount;
         //             data.team.outCount = f.playStatus.outCount;

         //            if (f.playStatus['batter'] != null) {
         //               data.batter = f.playStatus['batter'].firstName + ' ' + f.playStatus['batter'].lastName;
         //            }
         //            if (f.playStatus['firstBaseRunner'] != null) {
         //              data.firstBaseRunner = f.playStatus['firstBaseRunner'].firstName + ' ' + f.playStatus['firstBaseRunner'].lastName;
         //            }
         //            if (f.playStatus['secondBaseRunner'] != null) {
         //              data.secondBaseRunner = f.playStatus['secondBaseRunner'].firstName + ' ' + f.playStatus['secondBaseRunner'].lastName;
         //            }
         //            if (f.playStatus['thirdBaseRunner'] != null) {
         //              data.thirdBaseRunner = f.playStatus['thirdBaseRunner'].firstName + ' ' + f.playStatus['thirdBaseRunner'].lastName;
         //            }
         //            data.pitcher = f.playStatus.pitcher['firstName'] + ' ' + f.playStatus.pitcher['lastName'];
         //       }

         //      if (f.batterUp  != undefined && f.batterUp != null) {
         //       data.battingFrom = f.batterUp.standingLeftOrRight;
         //       data.batResult = f.batterUp.result;  
         //      }

         //     })
         //   })

         //   this.speedResults = this.specificFastballData.reduce(function(r, a) {
         //     r[a.pitcher] = r[a.pitcher] || [];
         //     r[a.pitcher].push(a.pitchspeedStart);
         //     return r
         //   }, Object.create(null));
         //   console.log('made groups of pichers pitch speeds by ID...');

         // }
        //  this.myData.forEach((data, index) => {


        //    if (this.speedResults[data.player.id]) {
        //      let avg = this.speedResults[data.player.id].reduce((r, a) => {

        //        return r + parseInt(a);

        //      }, 0) / this.speedResults[data.player.id].length;

        //      let max = this.speedResults[data.player.id].reduce(function(a, b) {
        //        return Math.max(a, b);
        //      });

        //      data.player.pitchSpeedAvgToday = Math.floor(avg);
        //      data.player.fastestPitchToday = max;

        //      }

        //   });

        // //}
       }, (err: HttpErrorResponse) => {

            console.log(err, 'error getting playbyplay');

       });

  }

  ngOnInit() {
    if (window.innerWidth < 700) { // 768px portrait
      this.mobile = true;
    }
     if (this.players === undefined) {
      this.loadData();
      // get our data every subsequent 10 minutes
      const MILLISECONDS_IN_TEN_MINUTES = 600000;
      interval(MILLISECONDS_IN_TEN_MINUTES)
        .subscribe(() => {
          if (this.gamesToday === true && this.liveGames === true) {
            this.dataService
              .getSchedule(this.selectedWeek).subscribe(res => {
                console.log(res, "schedule...");
                if (res['games'].length === 0) {
                  this.loading = false;
                  this.noGamesToday = true;
                  this.noGamesMsg = "There Are No Games Scheduled Today :(";
                  console.log('There are no games being played today.');
                } else {
                  this.dailySchedule = res['games'];

                  for (let schedule of this.dailySchedule) {
                    for (let data of this.myData) {
                      if (schedule.schedule.awayTeam.abbreviation === data.team.abbreviation) {
                          schedule.schedule.awayTeam.color = data.team.color;
                          schedule.schedule.awayTeam.accent = data.team.accent;
                          schedule.schedule.awayTeam.logo = data.team.logo;
                          schedule.schedule.awayTeam.city = data.team.city;
                          schedule.schedule.awayTeam.name = data.team.name;
                          schedule.schedule.awayTeam.dRank = data.dRank;
                          schedule.schedule.awayTeam.oRank = data.oRank;
                          schedule.schedule.awayTeam.teamRank = data.teamRank;
                      }
                      if (schedule.schedule.homeTeam.abbreviation === data.team.abbreviation) {
                          schedule.schedule.homeTeam.color = data.team.color;
                          schedule.schedule.homeTeam.accent = data.team.accent;
                          schedule.schedule.homeTeam.logo = data.team.logo;
                          schedule.schedule.homeTeam.city = data.team.city;
                          schedule.schedule.homeTeam.name = data.team.name;
                          schedule.schedule.homeTeam.dRank = data.dRank;
                          schedule.schedule.homeTeam.oRank = data.oRank;
                          schedule.schedule.homeTeam.teamRank = data.teamRank;
                      }
                      
                    }
                  }
                }
            })
          } else {
            console.log('No games then no daily stats either. :(');
          }
        });
        
     } else {
      if (this.dataService.premiumRanks != null) {
        this.tRank = this.dataService.premiumRanks;
        this.isPremiumRank = true; 
      }
        
      this.loading = false;
      this.showData = this.players;
      this.gameDate = this.showData[0].gamedate;

      for (let p of this.players) {
        if (p.playingRightNow === true) {
          this.liveGames = true;
        } 

        if (p.playingOver === true) {
          this.gameover = true;
        }
      }
     }
  }

}
