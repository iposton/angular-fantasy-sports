
import { Observable, interval, forkJoin } from 'rxjs';
import { Component, ViewChild, Inject, OnInit, ChangeDetectorRef, ViewChildren  } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient, HttpHeaders, HttpErrorResponse} from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { DatePipe, PercentPipe } from '@angular/common';
import * as CryptoJS from 'crypto-js';



import {
  NHLDataService,
  FirebaseService,
  YesterdayService,
  TomorrowService,
  UtilService,
  GoogleAnalyticsService
 } from '../../services/index';

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK
let today = null;
let tomorrow = null;
let yesterday = null;

let headers = null;
let dailyTeams = [];
let teamRef = [];
let teamString = '';
let teams = null;
let startingGoalieArray = null;

@Component({
  selector: 'app-starting-goalies',
  templateUrl: './starting-goalies.component.html',
  styleUrls: ['./starting-goalies.component.scss'],
   animations: [
    trigger('flipState', [
      state('active', style({
        transform: 'rotateY(179deg)'
      })),
      state('inactive', style({
        transform: 'rotateY(0)'
      })),
      transition('active => inactive', animate('500ms ease-out')),
      transition('inactive => active', animate('500ms ease-in'))
    ])
  ]
})
export class StartingGoaliesComponent implements OnInit {

  @ViewChildren('myInput') vc;

  goalies = new FormControl();
  starters: Array < any > ;
  dailySchedule: Array < any > ;
  fullSchedule: Array < any > ;
  starterIdData: Array < any > = [];
  startersData: Array < any > = [];
  dailyStats: Array < any > = [];
  teamRef: Array < any > = [];
  myData: Array < any > ;
  showData: Array < any > ;
  showTomorrow: Array <any> ;
  score: Array < any > ;
  sentData: Array < any > ;
  sentYesterdayData: Array < any > ;
  sentTomorrowData: Array < any > ;
  gameDate: string = '';
  defineToken: string = '';
  statData: Array < any > = [];
  playerInfo: Array < any > ;
  playerInjuries: Array < any > ;
  noGamesToday: boolean;
  gamesToday: boolean;
  twitterHandles: Array < any > ;
  todayStarters: Array < any > ;
  allGoalies: Array < any > ;
  allGoaliesTomorrow: Array < any > ;
  selected: any;
  startingGoaliesToday: Array < any > = [];
  tweetDay: any;
  noGamesMsg: any;
  noScoresMsg: any;
  noScores: any;
  public startersDate: any;
  public startersDateTomorrow: any;
  tomorrowDate: any;
  fullFirebaseResponse: any;
  loading: boolean = true;
  apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2019-2020-regular";
  public teamSchedules: Array <any> = [];
  public stats: boolean = false;
  public weekResults: boolean = false;
  hitCount: any;
  public playerImages: any;
  public teams: any;
  public startingG: any;


  goalieIdSet: boolean = false;
  standIn: string = '';
  goalieID: string = '';

    newGoalie = {
    [this.standIn]: {
      confirmed: false,
      name: null,
      probable: false,
      image: null,
      atHandle: null,
      twitterHandle: null
    }
  };



  constructor(private cdr: ChangeDetectorRef, 
    private http: HttpClient,
    private dataService: NHLDataService, 
    private fbService: FirebaseService, 
    private yesterdayService: YesterdayService, 
    private tomorrowService: TomorrowService, 
    public snackBar: MatSnackBar, 
    public router: Router, 
    public dialog: MatDialog,
    public util: UtilService,
    public gaService: GoogleAnalyticsService) {
    yesterday = this.dataService.getYesterday();
    tomorrow = this.dataService.getTomorrow();
    today = this.dataService.getToday();
    this.tomorrowDate = tomorrow;
    console.log(yesterday + ' yesterday, ' + today + ' today, ' + tomorrow + ' tomorrow, ');
    this.sentData = this.dataService.getSentStats();
    this.sentYesterdayData = this.yesterdayService.getSentStats();
    this.sentTomorrowData = this.tomorrowService.getSentStats();
    this.playerImages = this.util.getNHLImages();
    teams = this.util.getNHLTeams();
    this.startingG = this.util.getStartingGoalies();
    startingGoalieArray = Object.values(this.startingG);
  }


  async loadData() {
    let promiseOne;
    promiseOne = new Promise((resolve, reject) => {
    this.fbService
      .getStarterData()
        .subscribe(res => {

        if (res[0] != null) {
          console.log(res, 'got response from firebase...');
          this.fullFirebaseResponse = res[0];
          this.startersDate = res[0][0]['todayDate'];
          this.startersDateTomorrow = res[0][2]['tomorrowDate'];
          this.todayStarters = res[0][1];
          this.allGoalies = Array.of(res[0][1]);
          this.allGoaliesTomorrow = Array.of(res[0][3]);
      

          // This is to change a goalie in view without refresh
          if (this.showData != null && this.myData != null) {
            for (let show of this.showData) {
              for (let rep of this.myData) {
                //console.log(show, 'showData items...');
                if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[1][show.team.matchup[0].player.id] != null && this.fullFirebaseResponse[1][rep.player.id] != null && rep.team.ID === show.team.matchup[0].team.id && this.fullFirebaseResponse[1][show.team.matchup[0].player.id].probable === false && this.fullFirebaseResponse[1][rep.player.id].confirmed === true) {
                  // Find goalies with the same team ID
                  // if the view has a goalie that is probable false swap with goalie from firebase that is confirmed
                  console.log(rep, 'update me into the view right now! I am confirmed to start.');
                  console.log(show.team.matchup[0], 'I have been changed, replace me with confirmed goalie.');
                  show.team.matchup[0] = rep;
                } else if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[1][show.team.matchup[0].player.id] != null && this.fullFirebaseResponse[1][rep.player.id] != null && rep.team.id === show.team.matchup[0].team.id && this.fullFirebaseResponse[1][show.team.matchup[0].player.id].probable === false && this.fullFirebaseResponse[1][rep.player.id].confirmed === false && this.fullFirebaseResponse[1][rep.player.id].probable === true && rep.player.probable === false) {
                  rep.player.probable = true;
                  console.log(rep, 'update me into the view right now! I am probable to start.');
                  console.log(show.team.matchup[0], 'I have been changed, replace me with probable goalie.');
                  show.team.matchup[0] = rep;
                }
                if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[1][show.team.matchup[1].player.id] != null && this.fullFirebaseResponse[1][rep.player.id] != null && rep.team.id === show.team.matchup[1].team.id && this.fullFirebaseResponse[1][show.team.matchup[1].player.id].probable === false && this.fullFirebaseResponse[1][rep.player.id].confirmed === true) {
                  // same thing
                  // now check against the 2nd item in the view matchup array
                  console.log(rep, 'update me into the view right now! I am confirmed to start.');
                  console.log(show.team.matchup[1], 'I have been changed, replace me with new goalie...');
                  show.team.matchup[1] = rep;
                } else if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[1][show.team.matchup[1].player.id] != null && this.fullFirebaseResponse[1][rep.player.id] != null && rep.team.id === show.team.matchup[1].team.id && this.fullFirebaseResponse[1][show.team.matchup[1].player.id].probable === false && this.fullFirebaseResponse[1][rep.player.id].confirmed === false && this.fullFirebaseResponse[1][rep.player.id].probable === true && rep.player.probable === false) {
                  rep.player.probable = true;
                  console.log(rep, 'update me into the view right now! I am probable to start.');
                  console.log(show.team.matchup[1], 'I have been changed, replace me with probable goalie.');
                  show.team.matchup[1] = rep;
                }

              }
            }
          }


        } else {

          console.log('removed db fb callback was undefined, go get goalie data again please...')

          this.fbService
            .getStarterData()
            .subscribe(res => {

              if (res[0] != null) {
                console.log(res, 'got response from firebase...');
                this.fullFirebaseResponse = res[0];
                this.startersDate = res[0][0]['todayDate'];
                this.todayStarters = res[0][1];
                this.allGoalies = Array.of(res[0][1]);
                this.allGoaliesTomorrow = Array.of(res[0][3]);
              }

            });
        }

        resolve();
    });
  });

  let resultOne = await promiseOne;

    this.dataService
      .getEnv().subscribe(res => {
        let bytes  = CryptoJS.AES.decrypt(res, 'footballSack');
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(originalText + ":" + 'MYSPORTSFEEDS'));
       
        this.dataService
          .sendHeaderOptions(headers);

        this.dataService
          .getDailySchedule().subscribe(res => {

            console.log(res, "schedule...");

            if (res['games'].length === 0) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "There Are No Games Scheduled Today :(";
              console.log('There are no games being played today.');
            } else {
              let postponed;
              res['games'].forEach((item, index) => {

                if(this.fbService.userDetails === null) {
                 
                  dailyTeams.push(item['schedule'].homeTeam.abbreviation, item['schedule'].awayTeam.abbreviation); 
                  teamString = dailyTeams.join();
                }
                
                // postponed = index;
                // if (res['games'][postponed].id === '41392') {
                //   console.log(res['games'][postponed], "hi, iam postponed and causing trouble...");
                //   res['games'].splice(postponed, 1);
                // }
              });
              this.dailySchedule = res['games'];
              teamRef = res['references'] ? res['references'].teamReferences : [];
              this.gameDate = res['games'][0] != null ? res['games'][0].schedule.startTime : res['games'][1] != null ? res['games'][1].schedule.startTime : new Date(); //res['games'][0].date;
              let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.gameDate, 'EEEE');
              this.gamesToday = true;
              //this.sortData(); //work around when no games

              if (this.teamSchedules.length === 0) {
                let team;
                let teamSchedule;
                const nhlTeamsArray = Object.values(teams);
                forkJoin(
                  nhlTeamsArray.map(
                    g => 
                    
                     this.http.get(`${this.apiRoot}/games.json?team=${g['abbreviation']}&date=from-20200309-to-20200315`, { headers })
                    
                  )
                )
                .subscribe(res => {
                  //console.log(res, 'get team schedules...');

                  res.forEach((item, index) => {
                    team = nhlTeamsArray[index]['abbreviation'];
                    //team = teamRef[index].abbreviation;
                    teamSchedule = {
                      team: team,
                      schedule: res[index]['games'],
                      teamInfo: nhlTeamsArray[index]
                    }
                    this.teamSchedules.push(teamSchedule);
                    //console.log(this.teamSchedules, 'schedules array...');

                  })
                  

                 // this.sortData();

                }, (err: HttpErrorResponse) => {
                  
                  console.log(err, 'error getting schedule');

              });

              } else {
                //this.sortData();
              }

              forkJoin(
                  res['games'].map(
                    g =>  this.http.get(`${this.apiRoot}/games/`+g['schedule'].id+`/lineup.json?position=Goalie-starter`, {headers})
                  )
                )
                .subscribe(res => {
                  console.log(res, 'making several calls by GAME ID for starting lineups...');

                  let i;
                  let i2;
                  let res2;
                  res.forEach((item, index) => {
                    i = index;
                    //console.log(res[i]['teamLineups'], 'got starting lineups data!');
                    res2 = res[i]['teamLineups'];
                    
                    res2.forEach((item, index) => {

                      i2 = index;
                      if (res2[i2].actual != null && res2[i2].expected != null) {
                        
                        //console.log(res2[i2].actual.starter[0].player, 'got player ID for goalie actualy starting!');
                        this.starterIdData.push(res2[i2].actual.lineupPositions[0].player.id);

                      } else if (res2[i2].actual == null && res2[i2].expected != null) {
                        //console.log(res2[i2].expected.starter[0].player.ID, 'got player ID for goalie expected to start!');
                        this.starterIdData.push(res2[i2].expected.lineupPositions[0].player.id);
                      } else {
                        //console.log(res2[i2].team.City + " " + res2[i2].team.Name, 'no starters yet!');
                        this.starterIdData.push(res2[i2].team.id);
                      
                        //console.log(this.starterIdData, 'this array has ALL the team IDs of todays starters');

                      }

                    });
                  });

                  this.sortData();

                });
                //this.sortData();
            }

          })


        this.dataService
          .getGameId().subscribe(res => {
            console.log(res['games'], "scheduled games for yesterday today and tomorrow...");

            //this removed a postponed game from api to avoid errors
            // if (res['games'] > 0) {
            //   let postponed;
            //   res['games'].forEach((item, index) => {
            //     postponed = index;
            //     if (res['games'][postponed].id === '41392') {
            //       console.log(res['games'][postponed], "hi, iam postponed and causing trouble...");
            //       res['games'].splice(postponed, 1);
            //     }
            //   });
            // }

            this.fullSchedule = res['games'];
          })

      })

  }


 async sortData() {
  
    let promiseOne;
    promiseOne = new Promise((resolve, reject) => {
    if (this.gamesToday === true) {
      this.dataService
        .getDaily().subscribe(res => {
          console.log(res, "Daily stats...");
          this.dailyStats = res['gamelogs'];
          resolve();
        })
    } else {
      console.log('No games then no daily stats either. :(');
      resolve();
    }
  })

  let resultOne = await promiseOne;

  // this.dataService
  //     .getUnusualStats().subscribe(res => {
  //       console.log(res, 'u stats...')
  //     })

    this.dataService
      .getStats(teamString).subscribe(res => {
        console.log(res['playerStatsTotals'], "cumulative stats...");
    
        this.myData = res['playerStatsTotals'].filter(
          player => player.team != null && player.player['currentTeam'] != null && player.player['currentTeam'].id === player.team.id || player.player.lastName === 'Miska' && player.team != null); 

        if (this.myData && this.dailySchedule) {
          if (this.startersDate != today && this.startersDateTomorrow != tomorrow) {
            //reset firebase probable and confirms
            this.reset();
          }
          if (this.startersDateTomorrow != tomorrow) {
             //reset firebase probable and confirms
             this.selectAll();
          }
          console.log('start sorting data for daily schedule...');
          // for (let data of startingGoalieArray) {
          //   data.tormorrow = tomorrow;
          // }
          for (let schedule of this.dailySchedule) {

              //console.log(this.myData, 'filtered myData')

            for (let sdata of this.myData) {

              for (let team of teamRef) {
                 
              
              sdata.player.lastweekWins = 0;
              sdata.player.lastweekLosses = 0;
              sdata.player.lastweekOtl = 0;

              if (schedule['schedule'].awayTeam.abbreviation === sdata.player.currentTeam.abbreviation) {
                sdata.player.gameTime = schedule['schedule'].startTime;
                sdata.team.gameIce = schedule['schedule'].venue.name;

                //  if (schedule['schedule'].venue.name === 'Nassau Coliseum') {
                //   sdata.team.gameIce = 'Barclays Center';
                // } else if (schedule['schedule'].venue.name === 'Verizon Center') {
                //   sdata.team.gameIce = 'Capital One Arena';
                // } else if (schedule['schedule'].venue.name === 'Joe Louis Arena') {
                //   sdata.team.gameIce = 'Little Caesars Arena';
                // } else if (schedule['schedule'].venue.name === 'Consol Energy Center') {
                //   sdata.team.gameIce = 'PPG Paints Arena';
                // } else {
                //   sdata.team.gameIce = schedule['schedule'].venue.name;
                // }

                sdata.team.gameId = schedule['schedule'].id;
                sdata.player.gameLocation = "away";
                sdata.team.day = this.tweetDay;
                sdata.team.opponentId = schedule['schedule'].homeTeam.id;
                sdata.team.opponentAbbreviation = schedule['schedule'].homeTeam.abbreviation;
                sdata.team.today = today;
                sdata.team.tomorrow = tomorrow;
                sdata.team.yesterday = yesterday;
                sdata.player.confirmed = false;
                sdata.player.probable = false;
                sdata.player.startstatus = '';
                sdata.flip = 'inactive';

                if(sdata.player.currentTeam.id === team.id) {
                  sdata.team.teamFull = team.city +' '+ team.name;   
                  sdata.team.teamCity = team.city;
                  sdata.team.teamName = team.name;
                } 
                if (sdata.team.opponentId === team.id) {
                  sdata.team.opponent = team.city +' '+ team.name;   
                  sdata.team.opponentCity = team.city;
                  sdata.team.opponentName = team.name;
                }

              }
              if (schedule['schedule'].homeTeam.abbreviation === sdata.player.currentTeam.abbreviation) {
                sdata.player.gameTime = schedule['schedule'].startTime;
                sdata.team.gameIce = schedule['schedule'].venue.name;

                // if (schedule['schedule'].venue.name === 'Nassau Coliseum') {
                //   sdata.team.gameIce = 'Barclays Center';
                // } else if (schedule['schedule'].venue.name === 'Verizon Center') {
                //   sdata.team.gameIce = 'Capital One Arena';
                // } else if (schedule['schedule'].venue.name === 'Joe Louis Arena') {
                //   sdata.team.gameIce = 'Little Caesars Arena';
                // } else if (schedule['schedule'].venue.name === 'Consol Energy Center') {
                //   sdata.team.gameIce = 'PPG Paints Arena';
                // } else {
                //   sdata.team.gameIce = schedule['schedule'].venue.name;
                // }

                sdata.team.gameId = schedule['schedule'].id;
                sdata.player.gameLocation = "home";
                sdata.team.day = this.tweetDay;
                sdata.team.opponentId = schedule['schedule'].awayTeam.id;
                sdata.team.opponentAbbreviation = schedule['schedule'].awayTeam.abbreviation;
                sdata.team.today = today;
                sdata.team.tomorrow = tomorrow;
                sdata.team.yesterday = yesterday;
                sdata.player.confirmed = false;
                sdata.player.probable = false;
                sdata.player.startstatus = '';
                sdata.flip = 'inactive';

                if(sdata.player.currentTeam.id === team.id) {
                  sdata.team.teamFull = team.city +' '+ team.name;   
                  sdata.team.teamCity = team.city;
                  sdata.team.teamName = team.name;
                }
                if (sdata.team.opponentId === team.id) {
                  sdata.team.opponent = team.city +' '+ team.name;   
                  sdata.team.opponentCity = team.city;
                  sdata.team.opponentName = team.name;
                }

              }

              if (sdata.player.officialImageSrc == null) {
                sdata.player.officialImageSrc = this.playerImages[sdata.player.id] != null ? this.playerImages[sdata.player.id].image : null;
              }

            }
           }
          }
        }

        for (let team of teamRef) {
          for (let data of this.myData) { 
             if (team.id === data.player.currentTeam.id) {
               data.team.color = team.teamColoursHex[0];
               data.team.accent = team.teamColoursHex[1];
               data.team.logo = team.officialLogoImageSrc;
               data.team.city = team.city;
               data.team.name = team.name;
             } 
           }  
        }

        for (let schedule of this.myData) {
          for (let sdata of this.myData) {
            if (sdata.team.opponentId != null && 
              sdata.team.opponentId === schedule.player.currentTeam.id && 
              sdata.gameId === schedule.gameId) {
              sdata.team.opponentLogo = schedule.team.logo;
              sdata.team.opponentCity = schedule.team.city;
              sdata.team.opponentName = schedule.team.name;
              sdata.opponentColor = schedule.team.color;
            }
          }
        }

        if (this.myData && this.dailyStats) {
          console.log('start sorting data for daily stats...');
          for (let daily of this.dailyStats) {
            for (let mdata of this.myData) {

              if (daily.player.id === mdata.player.id) {
          
                mdata.player.saves = daily.stats.goaltending.saves;
                mdata.player.shotsFaced = daily.stats.goaltending.shotsAgainst;
                mdata.player.wins = daily.stats.goaltending.wins;
                mdata.player.losses = daily.stats.goaltending.losses;
                mdata.player.OvertimeLosses = daily.stats.goaltending.overtimeLosses;
                mdata.player.Shutouts = daily.stats.goaltending.shutouts;
                mdata.player.ga = daily.stats.goaltending.goalsAgainst;

                if (daily.stats.goaltending.saves > 0 || daily.stats.goaltending.wins === 1) {
                  // this.starterIdData.push(daily.player.ID);
                  this.startingGoaliesToday.push(daily.player.id);
                }

                if (daily.stats.goaltending.goalsAgainst === 1) {
                  mdata.player.GoalsAgainst = daily.stats.goaltending.goalsAgainst + ' goal';
                } else {
                  mdata.player.GoalsAgainst = daily.stats.goaltending.goalsAgainst + ' goals';
                }

                if (parseInt(daily.stats.goaltending.saves) > 20 && daily.stats.goaltending.goalsAgainst == '0') {
                  mdata.player.twentySavesPlus = true;
                  mdata.player.twentySavesPlusResult = mdata.player.FirstName + ' ' + mdata.player.LastName + ' has ' + daily.stats.goaltending.saves + ' saves and has not given up a goal to the ' + mdata.team.opponentCity + ' ' + mdata.team.opponentName + '!';
                } else if (parseInt(daily.stats.goaltending.saves) > 20 && daily.stats.goaltending.goalsAgainst > '0') {
                  mdata.player.twentySavesPlus = true;
                  mdata.player.twentySavesPlusShutout = false;
                  mdata.player.twentySavesPlusResult = mdata.player.FirstName + ' ' + mdata.player.LastName + ' has ' + daily.stats.goaltending.saves + ' saves against ' + daily.stats.goaltending.shotsAgainst + ' shots fired by ' + mdata.team.opponentCity + ' ' + mdata.team.opponentName + ' offense and let ' + mdata.player.GoalsAgainst + ' light the lamp!';
                }


              }

            }
          }
        }

        if (this.myData && this.fullSchedule) {
          // const startingGoalieArray = Object.values(this.startingG);
          
          console.log('start sorting data for full schedule...');
          let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.gameDate, 'EEEE');
              for (let fs of this.fullSchedule) {
                for (let sg of startingGoalieArray) {
                  if (this.startersDateTomorrow != tomorrow && tomorrow === dPipe.transform(fs['schedule'].startTime, 'yyyy-MM-dd')) {
                    if (fs['schedule'].awayTeam.id == sg['teamId'] || fs['schedule'].homeTeam.id == sg['teamId']) {
                      if (sg['numberOne']) {
                        this.fullFirebaseResponse[3][sg['id']].probable = true;
                      }
                    }
    
                  }
                }
              }
          for (let full of this.fullSchedule) {

            for (let btb of this.myData) {

             

              if (full['schedule'].awayTeam.id === btb.player.currentTeam.id) {
              
                if (btb.team.yesterday === dPipe.transform(full['schedule'].startTime, 'yyyy-MM-dd')) {

                  btb.team.hadGameYesterday = true;

                }
                if (btb.team.today === dPipe.transform(full['schedule'].startTime, 'yyyy-MM-dd')) {
                  btb.team.haveGameToday = true;
                }


                if (btb.team.tomorrow === dPipe.transform(full['schedule'].startTime, 'yyyy-MM-dd')) {
                  console.log(btb.team.tomorrow, dPipe.transform(full['schedule'].startTime, 'yyyy-MM-dd'), btb.team.tomorrow === dPipe.transform(full['schedule'].startTime, 'yyyy-MM-dd'))
                  btb.team.haveGameTomorrow = true;
                  // let starterWins = [];
                  // starterWins.push(btb.player.stats.goaltending.wins);
                  // btb.team.starterWins = starterWins;
                  // btb.team.starterWinsMax = Math.max(...starterWins);
                }

              }
              if (full['schedule'].homeTeam.id === btb.player.currentTeam.id) {


                if (btb.team.yesterday === dPipe.transform(full['schedule'].startTime, 'yyyy-MM-dd')) {

                  btb.team.hadGameYesterday = true;


                }
                if (btb.team.today === dPipe.transform(full['schedule'].startTime, 'yyyy-MM-dd')) {
                  btb.team.haveGameToday = true;
                }


                if (btb.team.tomorrow === dPipe.transform(full['schedule'].startTime, 'yyyy-MM-dd')) {

                  btb.team.haveGameTomorrow = true;
                }

              }
            }
          }
        }



        for (let data of this.myData) {
          //console.log(data, 'start sorting data for goalie images and back to back...');
          //stats.goaltending.savePercentage
          data.player.savePercent = data.stats.goaltending.savePercentage;

          if (this.todayStarters != null) {

            if (this.todayStarters[data.player.id] != null) {
              data.player.image = this.todayStarters[data.player.id].image;
              data.player.atHandle = this.todayStarters[data.player.id].atHandle;
              data.player.twitterHandle = this.todayStarters[data.player.id].twitterHandle;
            }

            if (this.startersDate === data.team.today && this.todayStarters[data.player.id] != null && data.player.saves == null && data.player.shotsFaced == null && this.todayStarters[data.player.id].probable === true || this.startersDate === data.team.today && this.todayStarters[data.player.id] != null && data.player.saves == '0' && data.player.shotsFaced == '0' && this.todayStarters[data.player.id].probable === true) {
              data.player.confirmed = this.todayStarters[data.player.id].confirmed;
              data.player.probable = this.todayStarters[data.player.id].probable;
              data.player.startingToday = true;
              data.player.startingTodayNow = false;

              //console.log(data.player, 'confirmed or probable');

              this.startersData.push(data);
            }
          } else {
            console.log('firebase res not returned yet....');
          }


          if (data.team.hadGameYesterday === true) {
            //console.log(data, 'game yesterday');
            if (data.team.haveGameToday === true) {
              data.team.secondBacktoBack = " 2nd game of a Back-to-Back ";
            } else {
              data.team.secondBacktoBack = "";
            }
          } else {
            data.team.secondBacktoBack = "";
          }

          if (data.team.haveGameToday === true) {
            //console.log(data, 'game today');
            if (data.team.haveGameTomorrow === true) {
              data.team.firstBacktoBack = " 1st game of a Back-to-Back ";
            } else {
              data.team.firstBacktoBack = "";
            }
          }

        }


        if (this.sentYesterdayData != null) {
          console.log('start sorting data from yesterday...');
          for (let yesterday of this.sentYesterdayData) {

            for (let tomdata of this.myData) {

              if (yesterday.player.saves > 1 && yesterday.player.ID === tomdata.player.ID) {

                console.log(yesterday.player, "played yesterday...");

                tomdata.player.finishedYesterday = false;
                tomdata.player.playedYesterday = true;
                tomdata.player.savesYesterday = yesterday.player.saves;
                tomdata.player.winsYesterday = yesterday.player.wins;
                tomdata.player.lossesYesterday = yesterday.player.losses;
                tomdata.player.saYesterday = yesterday.player.ShotsAgainst;
                tomdata.player.olYesterday = yesterday.player.OvertimeLosses;
                tomdata.player.shYesterday = yesterday.player.Shutouts;
                tomdata.player.yday = yesterday.team.day;

                if (yesterday.player.wins === 1) {
                  tomdata.player.resultYesterday = yesterday.player.FirstName + ' ' + yesterday.player.LastName + ' got the Win ' + yesterday.team.day + ' with ' + yesterday.player.saves + ' saves against ' + yesterday.player.ShotsAgainst + ' shots.'
                } else if (yesterday.player.losses === 1 || yesterday.player.OvertimeLosses === 1) {
                  tomdata.player.resultYesterday = yesterday.player.FirstName + ' ' + yesterday.player.LastName + ' got the Loss ' + yesterday.team.day + ' with ' + yesterday.player.saves + ' saves against ' + yesterday.player.ShotsAgainst + ' shots.'
                }

              }

            }
          }
        }

       

        if (this.myData && this.gamesToday === true) {
          if (this.startingGoaliesToday.length > 0) {
            console.log('start sorting data for starters of games in progress...');
            for (let startinprogress of this.startingGoaliesToday) {

              for (let progressdata of this.myData) {

                if (startinprogress === progressdata.player.id) {
                  console.log('starters of games that have started');
                  progressdata.player.startingToday = true;
                  progressdata.player.startingTodayNow = true;
                  this.startersData.push(progressdata);
                  //progressdata.player.startingGoalieTruth = startinprogress;

                }


              }
            }
          }


          if (this.starterIdData.length > 0) {
            console.log('start sorting data for starters matchups...');
            for (let startid of this.starterIdData) {

              for (let startdata of this.myData) {
                //startdata.stats.goaltending.gamesStarted > 1
                if (startid === startdata.player.currentTeam.id) {
                  if (this.startersDate != startdata.team.today) {

                    startdata.player.startingToday = false;
                    startdata.player.likelyStartingToday = true;
                    //console.log(startdata.player.FirstName + " " + startdata.player.LastName, "this goalie is not starting yet. but he might start.");
                    this.startersData.push(startdata);


                  }
                } else if (this.startersDate != startdata.team.today && startid === startdata.player.id) {
                  if (startdata.player.saves == null || startdata.player.saves == '0') {
                    console.log(startdata.player, 'expected goalies from api');
                    startdata.player.startingToday = true;
                    startdata.player.startingTodayNow = false;
                    if (this.fullFirebaseResponse[1][startdata.player.id] != null) {
                      this.fullFirebaseResponse[1][startdata.player.id].probable = true;
                    }
     
                    this.startersData.push(startdata);
                  }

                } 
                // if (this.startersDateTomorrow != startdata.team.tomorrow && startdata.team.haveGameTomorrow === true) {
                 
                //   if (this.fullFirebaseResponse[3][startdata.player.id] != null && this.startingG[startdata.player.id] != null) {
                //    if (startdata.stats.goaltending != null && startdata.stats.goaltending.wins > 10)
                //      this.fullFirebaseResponse[3][startdata.player.id].probable = true;
                //    }
                // }

              }
            }
          }


          //MAKE MATCHUPS BY GAME ID OF STARTERS AND NON STARTERS

          if (this.startersData.length > 0) {
            this.statData = this.startersData.reduce(function(r, a) {
              // I need to store game ID for home player on team
              // Store game ID for away team somewhere else if away push but dont make a

              r[a.team.gameId] = r[a.team.gameId] || [];
   
              r[a.team.gameId].push(a);
            
              return r
            }, Object.create(null));

            //console.log(this.statData, 'made matchups of starting goalies by game ID...');

            this.showMatchups();
          }

        }

      })

  }

  showMatchups() {

 console.log(this.statData, 'show this');
    //THIS FOR LOOP GETS HOME STARTING HOCKEY GOALIES AND THERE STARTING OPPONENT 
    this.startersData.forEach((data) => {
      if (data.player.gameLocation === 'home') {
        data.team.matchup = this.statData[data.team.gameId];
       
        this.statData[data.team.gameId][0].player.twoPossibleStarters = false;
        if (this.statData[data.team.gameId][1] != null) 
          this.statData[data.team.gameId][1].player.twoPossibleStarters = false;

        if (this.statData[data.team.gameId].length > 2) {
          //console.log(this.statData[data.team.gameId][0].team.Name + ' ' + this.statData[data.team.gameId][1].team.Name + ' ' + this.statData[data.team.gameId][2].team.Name, 'possible starters...');
          if (this.statData[data.team.gameId][0].player.currentTeam.id === this.statData[data.team.gameId][1].player.currentTeam.id) {
            this.statData[data.team.gameId][1].player.twoPossibleStarters = true;
            this.statData[data.team.gameId][1].twoPossibleStarters = true;
            if (this.statData[data.team.gameId][0].player.saves == null && this.statData[data.team.gameId][1].player.saves > '0') {
              console.log(this.statData[data.team.gameId][0].player, 'this is not a starter. api got it wrong');
              this.statData[data.team.gameId][0].player.wrongStarter = true;
            } else if ((this.statData[data.team.gameId][0].player.saves == '0' || this.statData[data.team.gameId][0].player.saves === 1) && this.statData[data.team.gameId][1].player.saves > '0') {
              console.log(this.statData[data.team.gameId][0].player, 'this is not a starter. api got it wrong');
              this.statData[data.team.gameId][0].player.wrongStarter = true;
            }
          } else {
            this.statData[data.team.gameId][1].twoPossibleStarters = false;
          }
          if (this.statData[data.team.gameId][0].player.currentTeam.id === this.statData[data.team.gameId][2].player.currentTeam.id) {
            this.statData[data.team.gameId][0].player.twoPossibleStarters = true;
            this.statData[data.team.gameId][0].twoPossibleStarters = true;
            if (this.statData[data.team.gameId][2].player.saves == null && this.statData[data.team.gameId][0].player.saves > '0') {
              console.log(this.statData[data.team.gameId][2].player, 'this is not a starter. api got it wrong');
              this.statData[data.team.gameId][2].player.wrongStarter = true;
            } else if (this.statData[data.team.gameId][2].player.saves == '0' && this.statData[data.team.gameId][0].player.saves > '0') {
              console.log(this.statData[data.team.gameId][2].player, 'this is not a starter. api got it wrong');
              this.statData[data.team.gameId][2].player.wrongStarter = true;
            }
          } else {
            this.statData[data.team.gameId][0].twoPossibleStarters = false;
          }
          if (this.statData[data.team.gameId][1].player.currentTeam.id === this.statData[data.team.gameId][2].player.currentTeam.id) {
            this.statData[data.team.gameId][1].twoPossibleStarters = true;
            this.statData[data.team.gameId][2].player.twoPossibleStarters = true;
            if (this.statData[data.team.gameId][2].player.saves == null && this.statData[data.team.gameId][1].player.saves > '0') {
              console.log(this.statData[data.team.gameId][2].player, 'this is not a starter. api got it wrong');
              this.statData[data.team.gameId][2].player.wrongStarter = true;
            } else if ((this.statData[data.team.gameId][2].player.saves == '0' || this.statData[data.team.gameId][2].player.saves === 1) && this.statData[data.team.gameId][1].player.saves > '0') {
              console.log(this.statData[data.team.gameId][1].player, 'this is not a starter. api got it wrong');
              this.statData[data.team.gameId][2].player.wrongStarter = true;
            }
            if (this.statData[data.team.gameId][2].player.resultYesterday != null) {
              this.statData[data.team.gameId][2].player.finishedYesterday = true;
            }
            if (this.statData[data.team.gameId][1].player.resultYesterday != null) {
              this.statData[data.team.gameId][1].player.finishedYesterday = true;
            }
          } else {
            // this.statData[data.team.gameId][1].twoPossibleStarters = false;
            this.statData[data.team.gameId][2].player.twoPossibleStarters = false;
          }
          if (this.statData[data.team.gameId][3] != null) {
            if (this.statData[data.team.gameId][2].player.currentTeam.id === this.statData[data.team.gameId][3].player.currentTeam.id) {
              this.statData[data.team.gameId][2].twoPossibleStarters = true;
              this.statData[data.team.gameId][3].twoPossibleStarters = true;
            } else {
              this.statData[data.team.gameId][2].twoPossibleStarters = false;
              this.statData[data.team.gameId][3].twoPossibleStarters = false;
            }
          }

        }


        this.loading = false;
        this.showData = this.startersData;
        
      }

    })

     if (this.hitCount != null && this.fbService.userDetails === null) {
        this.fbService.updateCounter(this.hitCount);
     }

     this.dataService
      .sendStats(this.showData, this.myData);
     }


  ngOnInit() {
    
    if (this.sentData === undefined) {
      this.loadData();
      this.cdr.detectChanges();
      this.fbService.getHits()
        .subscribe(res => {
            console.log(res[0]['hits'], 'ngOnInit hit count...');
            this.hitCount = res[0]['hits'];
        });

      // get our data every subsequent 10 minutes
      const MILLISECONDS_IN_TEN_MINUTES = 600000;
      interval(MILLISECONDS_IN_TEN_MINUTES)
        .subscribe(() => {
          if (this.gamesToday === true) {
            this.dataService
              .getDaily().subscribe(res => {
                console.log(res, "Daily stats updated!");
                this.dailyStats = res['gamelogs'];

                if (this.myData && this.dailyStats) {
                  console.log('start sorting data for daily stats...');
                  for (let daily of this.dailyStats) {
                    for (let mdata of this.myData) {

                      if (daily.player.id === mdata.player.id) {

                        mdata.player.saves = daily.stats.goaltending.saves;
                        mdata.player.shotsFaced = daily.stats.goaltending.shotsAgainst;
                        mdata.player.wins = daily.stats.goaltending.wins;
                        mdata.player.losses = daily.stats.goaltending.losses;
                        mdata.player.OvertimeLosses = daily.stats.goaltending.overtimeLosses;
                        mdata.player.Shutouts = daily.stats.goaltending.shutouts;
                        mdata.player.ga = daily.stats.goaltending.goalsAgainst;

                        if (daily.stats.goaltending.saves > 0 || daily.stats.goaltending.wins === 1) {
                          // this.starterIdData.push(daily.player.ID);
                          this.startingGoaliesToday.push(daily.player.id);
                        }

                        if (daily.stats.goaltending.goalsAgainst === 1) {
                          mdata.player.GoalsAgainst = daily.stats.goaltending.goalsAgainst + ' goal';
                        } else {
                          mdata.player.GoalsAgainst = daily.stats.goaltending.goalsAgainst + ' goals';
                        }

                        if (parseInt(daily.stats.goaltending.saves) > 20 && daily.stats.goaltending.goalsAgainst == '0') {
                          mdata.player.twentySavesPlus = true;
                          mdata.player.twentySavesPlusResult = mdata.player.FirstName + ' ' + mdata.player.LastName + ' has ' + daily.stats.goaltending.saves + ' saves and has not given up a goal to the ' + mdata.team.opponentCity + ' ' + mdata.team.opponentName + '!';
                        } else if (parseInt(daily.stats.goaltending.saves) > 20 && daily.stats.goaltending.goalsAgainst > '0') {
                          mdata.player.twentySavesPlus = true;
                          mdata.player.twentySavesPlusShutout = false;
                          mdata.player.twentySavesPlusResult = mdata.player.FirstName + ' ' + mdata.player.LastName + ' has ' + daily.stats.goaltending.saves + ' saves against ' + daily.stats.goaltending.shotsAgainst + ' shots fired by ' + mdata.team.opponentCity + ' ' + mdata.team.opponentName + ' offense and let ' + mdata.player.GoalsAgainst + ' light the lamp!';
                        }


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

    
        this.loading = false;
        this.showTomorrow = this.sentTomorrowData;
        this.showData = this.sentData;
        console.log(this.showTomorrow, "show tomorrow");
        this.gameDate = this.showData["0"].team.today;
    

    }

  }

  ngAfterViewInit() {            
    this.vc.first.nativeElement.focus();
  }


  public saveStarts() {
    if (this.stats === false) {
      console.log('This a good state to save!!');
      console.log(this.fullFirebaseResponse, 'the full firebase response to send back to fb for update...');
      this.fbService
        .addData(this.fullFirebaseResponse);
    } else {
      console.log('you need to refresh the goalies before saving... Important');
    }
  }

  public setGoalieId() {
     this.newGoalie = {
      [this.goalieID]: {
        confirmed: false,
        name: null,
        probable: false,
        image: null,
        atHandle: null,
        twitterHandle: null
      }
    };

    console.log(this.newGoalie, 'save this goalie');
    this.goalieIdSet = true;
  }

  public addGoalie() {
    this.fullFirebaseResponse[1][this.goalieID] = this.newGoalie[this.goalieID];
    this.fullFirebaseResponse[3][this.goalieID] = this.newGoalie[this.goalieID];
    console.log(this.newGoalie, 'goalie updated');
    console.log(this.fullFirebaseResponse, 'added new goalie ready to save to fb....');   
  }

  public updateTodayStarters() {
    this.fullFirebaseResponse[0]['todayDate'] = this.fullFirebaseResponse[2]['tomorrowDate'];
    this.fullFirebaseResponse[1] = this.fullFirebaseResponse[3];
    console.log(this.fullFirebaseResponse, 'moved tomorrow starts to today...');
  }

  public showTodayStarters() {
    this.stats = true;
    for (let info of this.myData) {
      if (this.fullFirebaseResponse[1][info.player.id] != null) {
        if (this.fullFirebaseResponse[1][info.player.id].confirmed === false && this.fullFirebaseResponse[1][info.player.id].probable === false) {

          this.fullFirebaseResponse[1][info.player.id].filterOutStarters = true;
          //console.log(this.fullFirebaseResponse[1][info.player.id], "not starting today...");
        }
      }

      if (this.fullFirebaseResponse[3][info.player.id] != null) {
        if (this.fullFirebaseResponse[3][info.player.id].confirmed === false && this.fullFirebaseResponse[3][info.player.id].probable === false) {

          this.fullFirebaseResponse[3][info.player.id].filterOutStarters = true;
          //console.log(this.fullFirebaseResponse[3][info.player.ID], "not starting tomorrow...");
        }
      }
    }
  }

  public selectAll() {
    for (let info of this.myData) {
      if (this.fullFirebaseResponse[3][info.player.id] != null) {
        this.fullFirebaseResponse[3][info.player.id].confirmed = false;
        this.fullFirebaseResponse[3][info.player.id].probable = false;
        //console.log(this.fullFirebaseResponse, "make all starters false");
      }
    }
  }

  public reset() {
    for (let info of this.myData) {
      if (this.fullFirebaseResponse[1][info.player.id] != null) {
        this.fullFirebaseResponse[1][info.player.id].confirmed = false;
        this.fullFirebaseResponse[1][info.player.id].probable = false;
        //console.log(this.fullFirebaseResponse, "make all starters false");
      }
    }
  }


  public toggleFlip(data, gid) {
    this.gaService.eventEmitter("flip nhl score", "startinggoalie", "score", "click", 10);
    data.flip = (data.flip == 'inactive') ? 'active' : 'inactive';

    this.dataService
          .getScore(gid).subscribe(res => {
            console.log(res, "Score...");
            this.score = res['gamelogs'];

            // if (res != null) {
            //   console.log(res, "Score, Game...");
            //   this.score = res['scoring'];
            //   let game = null;
            //   game = res['game'].playedStatus; //"COMPLETED" playedStatus: "COMPLETED_PENDING_REVIEW"
  
            //   if (data.player.gameLocation === 'home') {
            //     data.team.teamScore = this.score['homeScoreTotal'];
            //     data.team.opponentScore = this.score['awayScoreTotal'];
            //   } else if (data.player.gameLocation === 'away') {
            //     data.team.teamScore = this.score['awayScoreTotal'];
            //     data.team.opponentScore = this.score['homeScoreTotal'];
            //   }

            //   data.gameStatus = game;

            if (this.myData && this.score) {
              console.log('start sorting data for scoreboard stats...');
              for (let sc of this.score) {
                for (let pdata of this.myData) {
                  //console.log(sc, 'score items');
                  // if (sc.game.awayTeamAbbreviation === pdata.player.currentTeam.abbreviation) {
                  //   pdata.team.awayGoalie = pdata.player.firstName + ' ' + pdata.player.lastName;
  
                  // }
                  // if (sc.game.homeTeamAbbreviation === pdata.player.currentTeam.abbreviation) {
                  //   pdata.team.homeGoalie = pdata.player.firstName + ' ' + pdata.player.lastName;
  
                  // }
                  if (sc.team.id === pdata.player.currentTeam.id) {
                    pdata.team.teamScore = sc.stats.miscellaneous.goalsFor;
                    pdata.team.opponentScore = sc.stats.miscellaneous.goalsAgainst;
                  }
                  
  
                }
              }
            }
            //this.awayScore = this.score.awayScoreTotal;
            //this.homeScore = this.score.homeScoreTotal;

          //   if (res == null) {
              
          //     this.noScores = true;
          //     this.noScoresMsg = "The game is not live yet."
          //     console.log('There are no games in progress at the moment.');
          //   } else {

          //   console.log('start sorting data for scoreboard stats...');
          //   for (let sc of this.score) {
          //     for (let pdata of this.showData) {

          //       if (sc.game.homeTeam.abbreviation === pdata.player.currentTeam.abbreviation) {
          //         pdata.team.homeGoalie = pdata.player.firstName + ' ' + pdata.player.lastName;
          //         pdata.team.opponentAbbreviation = sc.game.awayTeam.abbreviation;
          //         pdata.team.opponentScore = sc.scoring.awayScoreTotal;
          //         pdata.team.teamScore = sc.scoring.homeScoreTotal;
          //       }

          //     }
          //   }
           //}

          })
  }


  public isVisibleOnDesktop() {
    // console.log('width over 600px');
  }

  public isVisibleOnMobile() {
    // console.log('width under 600px');
  }

  public open(event, data) {
    this.gaService.eventEmitter("nhl goalie player info "+data.player.lastName, "nhltwitter", "tweets", "click", 10);
    this.selected = data;
    console.log(data, 'ok you clicked on player img...');
    this.dialog.open(TodayDialog, {
      data: data,
      width: '600px',
    });
  }

  public openLastweek(event, data) {
    
    this.dialog.open(LastweekDialog, {
      data: data,
      width: '1025px',
    });
  }

  public openLogin(event) {
    console.log(event, 'key code');
    if (event.keyCode === 65 && event.ctrlKey) {
      this.dialog.open(LoginDialog, {
        width: '1025px'
      });
    } else {
      //console.log('wrong key...');
    }

    this.dialog.open(LoginDialog, {
      width: '1025px'
    });

  }

  openSnackBar() {
    this.snackBar.openFromComponent(Info, {
      // duration: 500,
    });
  }

  public goYesterday() {
    this.router.navigateByUrl('starting-goalies/yesterday');
  }

  public goTomorrow() {
    this.router.navigateByUrl('starting-goalies/tomorrow');
  }

}


@Component({
  selector: 'login-dialog',
  template: `<i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
  <span *ngIf="fbService.userDetails == null">Login to Edit</span>  <span *ngIf="fbService.userDetails != null">Logout after edit is saved</span>
  <mat-dialog-content>
  <div  *ngIf="fbService.userDetails == null">
    
      <div class="login-container">
        <div>
          <input type="email" class="form-control" [(ngModel)]="user.email" placeholder="Email" required />
        </div>

        <div>
          <input type="password" class="form-control" [(ngModel)]="user.password" placeholder="Password" required />
        </div>

        <button mat-raised-button class="mat-raised-button" (click)="signInWithEmail()">Login</button>

      </div>  
    
  </div>
 
<div *ngIf="fbService.userDetails != null">
 <button mat-raised-button class="mat-raised-button" color="warn"  (click)="fbService.logout()">Logout</button>
</div>
  </mat-dialog-content>`,
})

export class LoginDialog implements OnInit {

  user = {
    email: '',
    password: ''
  };

  signedIn: any;

  constructor(public dialogRef: MatDialogRef < LastweekDialog > , private fbService: FirebaseService) {}


   public signInWithEmail() {
    this.fbService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        //console.log(res);
        this.signedIn = res;
      })
      .catch((err) => console.log('error: ' + err));
  }



  ngOnInit() {


  }

}

@Component({
  selector: 'lastweek-dialog',
  template: `<i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
  <span style="color:#f44336; font-size: 18px;">NHL Starting Goalies | The Hot List! | {{sentLastweek | date:'shortDate'}} - {{sentYesterday | date:'shortDate'}}</span>
  <mat-dialog-content>
  <div class="spinner-msg" *ngIf="loading" style="background: #fff;">
  Fetching goalie stats...
  <mat-spinner></mat-spinner>
  </div>
  <ul *ngFor="let data of showData"><li *ngIf="data.wins &gt; 1 && data.hot === true"><span class="player"><img src="{{ data.image}}" alt="" /></span><span style="font-weight: bold;" class="last-week"> {{ data.name }} <img src="../assets/nhl-logos/{{ data.team }}.jpg" alt="" /></span><span style="font-weight: bold;"> ({{ data.wins + '-' + data.losses + '-' + data.otl }})</span> <span *ngIf="data.opponents[0] != null"> - <span style="color:#6740B4">{{data.opponents[0].date}}</span> {{data.opponents[0].desc}}</span><span *ngIf="data.opponents[1] != null">, <span style="color:#6740B4">{{data.opponents[1].date}}</span> {{data.opponents[1].desc}}</span><span *ngIf="data.opponents[2] != null">, <span style="color:#6740B4">{{data.opponents[2].date}}</span> {{data.opponents[2].desc}}</span> <span *ngIf="data.opponents[3] != null">, <span style="color:#6740B4">{{data.opponents[3].date}}</span> {{data.opponents[3].desc}}</span> - <span style="font-weight: bold;">Total Saves: {{data.sv}} Total Shots: {{data.sa}}</span></li></ul>
  </mat-dialog-content>`,
})

export class LastweekDialog implements OnInit {

  starterStatData: Array < any > = [];
  showData: Array < any > ;
  sentHotData: Array < any > ;
  sentAllData: Array < any > ;
  sentYesterday: any;
  sentLastweek: any;
  loading: boolean = true;

  constructor(public dialogRef: MatDialogRef < LastweekDialog > , @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient, private dataService: NHLDataService) {
    this.sentHotData = this.dataService.getSentHotStats();
    this.sentAllData = this.dataService.getSentAllStats();
    this.sentYesterday = this.dataService.getYesterday();
    this.sentLastweek = this.dataService.getLastweek();

  }

  loadLastweek() {

    this.dataService
      .getLastweekGameId().subscribe(res => {
        console.log(res['games'], "scheduled games for lastweek...");
        //this.lastweekSchedule = res['games'];


        forkJoin(
            res['games'].map(
              g =>
              this.http.get('https://api.mysportsfeeds.com/v2.1/pull/nhl/2019-2020-regular/games/'+ g.schedule.id +'/boxscore.json?playerstats=Sv,GA,GAA,GS,SO,MIN,W,L,SA,OTL,OTW', {headers})
              //.map(response => response.json())
            )
          )
          .subscribe(res => {
            //console.log(res, 'making several calls by GAME ID for starting lineups...');

            let i;
            let i2;
            let i3;
            let res2;
            let res3;
            let myDate;

            res.forEach((item, index) => {
              i = index;
              //console.log(res[i], 'got box score data for away team!');
              //console.log(res[i]['games'].game.date, 'looking for date...');
             if (res[i] != null) {

             
              res2 = res[i]['stats'].away.players;
              res3 = res[i]['stats'].home.players;

              //this.gameTime =  res[i]['gamestartinglineup'].game.date;
              res2.forEach((item, index) => {

                i2 = index;
                res2[i2].player.city = res[i]['game'].awayTeam.abbreviation;
                //res2[i2].player.team = res[i]['game'].awayTeam.name;
                res2[i2].player.teamId = res[i]['game'].awayTeam.id;
                //console.log(res[i]['games'], 'game score data');
                let dPipe = new DatePipe("en-US");
                myDate = dPipe.transform(res[i]['game'].startTime, 'MMM d');

                if (res2[i2].playerStats.length > 0 && res2[i2].playerStats[0].goaltending.wins === 1) {
         
                  res2[i2].player.opponent = {date: myDate, desc: '(W) @ ' + res[i]['game'].homeTeam.abbreviation + ' GA: ' + res2[i2].playerStats[0].goaltending.goalsAgainst}
                  
                }
                if (res2[i2].playerStats.length > 0 && res2[i2].playerStats[0].goaltending.losses === 1) {
                  
                  res2[i2].player.opponent = {date: myDate, desc: '(L) @ ' + res[i]['game'].homeTeam.abbreviation + ' GA: ' + res2[i2].playerStats[0].goaltending.goalsAgainst}
               
                }
                if (res2[i2].playerStats.length > 0 && res2[i2].playerStats[0].goaltending.overtimeLosses === 1) {
                  
                  res2[i2].player.opponent = {date: myDate, desc: '(L) @ ' + res[i]['game'].homeTeam.abbreviation + ' GA: ' + res2[i2].playerStats[0].goaltending.goalsAgainst}
                 
                }

                if (res2[i2].playerStats.length > 0 && res2[i2].playerStats[0].goaltending.wins > 0 && res2[i2].player.id != '9072' || res2[i2].playerStats.length > 0 && res2[i2].playerStats[0].goaltending.losses > 0 && res2[i2].player.id != '9072' || res2[i2].playerStats.length > 0 && res2[i2].playerStats[0].goaltending.overtimeLosses > 0 && res2[i2].player.id != '9072') {
                  this.starterStatData.push(res2[i2]);
                  //console.log(res2[i2], 'got player stats for away goalie stats!'); 

                }


              });

              res3.forEach((item, index) => {

                i3 = index;
                
                res3[i3].player.city = res[i]['game'].homeTeam.abbreviation;
                //res3[i3].player.team = res[i]['game'].homeTeam.name;
                res3[i3].player.teamId = res[i]['game'].homeTeam.id;
                if (res3[i3].playerStats.length > 0 && res3[i3].playerStats[0].goaltending.wins === 1) {
                  
                  res3[i3].player.opponent = {date: myDate, desc: '(W) ' + res[i]['game'].awayTeam.abbreviation+ ' GA: ' + res3[i3].playerStats[0].goaltending.goalsAgainst}
                  
                }
                if (res3[i3].playerStats.length > 0 && res3[i3].playerStats[0].goaltending.losses === 1) {
                  
                  res3[i3].player.opponent = {date: myDate, desc: '(L) ' + res[i]['game'].awayTeam.abbreviation+ ' GA: ' + res3[i3].playerStats[0].goaltending.goalsAgainst}
                 
                }
                if (res3[i3].playerStats.length > 0 && res3[i3].playerStats[0].goaltending.overtimeLosses === 1) {
                  
                  res3[i3].player.opponent = {date: myDate, desc: '(L) ' + res[i]['game'].awayTeam.abbreviation+ ' GA: ' + res3[i3].playerStats[0].goaltending.goalsAgainst}
                  
                }

                //res3[i3].player.opponent = res[i]['games'].game.awayTeam.Abbreviation;
                if (res3[i3].playerStats.length > 0 && res3[i3].playerStats[0].goaltending.wins > '0' && res3[i3].player.id != '9072' || res3[i3].playerStats.length > 0 && res3[i3].playerStats[0].goaltending.losses > '0' && res3[i3].player.id != '9072' || res3[i3].playerStats.length > 0 && res3[i3].playerStats[0].goaltending.overtimeLosses > '0' && res3[i3].player.id != '9072') {
                  this.starterStatData.push(res3[i3]);
                  //console.log(res3[i3], 'got player stats for home goalie!');
                }

              });
            }
            });

            this.sortData();

          });
      })

  }

  sortData() {

    for (let info of this.sentAllData) {

      for (let data of this.starterStatData) {
        //console.log(info, 'looking for image');

        if (info.player.id === data.player.id) {
          //console.log(info, 'looking for image IDS Match!!')
          data.player.image = info.player.image;
        }

      }
    }
    let opponents = [];
    this.showData = this.starterStatData.reduce(function(hash) {
      //console.log(hash, 'hash');
      return function(r, a) {
        //console.log(a, 'this is a');
        let key = a.player.id;
        if (!hash[key]) {
          hash[key] = { wins: 0, losses: 0, otl: 0, name: a.player.firstName + ' ' + a.player.lastName, id: a.player.id, opponents: [], team: a.player.teamId, ga: 0, sa: 0, sv: 0, svpercent: 0, hot: false, image: a.player.image };
          r.push(hash[key]);
        }
        hash[key].wins += parseInt(a.playerStats[0].goaltending.wins);
        hash[key].losses += parseInt(a.playerStats[0].goaltending.losses);
        hash[key].otl += parseInt(a.playerStats[0].goaltending.overtimeLosses);
        hash[key].ga += parseInt(a.playerStats[0].goaltending.goalsAgainst);
        hash[key].sa += parseInt(a.playerStats[0].goaltending.shotsAgainst);
        hash[key].sv += parseInt(a.playerStats[0].goaltending.saves);
        hash[key].svpercent = Math.round((hash[key].sv * 100) / hash[key].sa);

        if (hash[key].svpercent < 95) {
          hash[key].hot = false;
        } else {
          hash[key].hot = true;
        }

        hash[key].opponents.push(a.player.opponent);

        return r;
      };

    }(Object.create(null)), []);
    this.loading = false;
    console.log(this.showData, 'show reduce array!');
    this.dataService
      .sendHotStats(this.showData);
  }



  ngOnInit() {
    if (this.sentHotData === undefined) {

      this.loadLastweek();

    } else {
      console.log('using saved hot list data :)')
      setInterval(() => {
        this.loading = false;
        this.showData = this.sentHotData;

      }, 300)

    }

  }

}

@Component({
  selector: 'today-dialog',
  template: `<i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
  <span style="color:#00aced;">Twitter Updates!</span> 
  <mat-dialog-content>
  <span style="font-size: 26px; font-weight: light; color: #555; text-align: center;">{{ noPosts }}</span>
  <ul *ngFor="let item of tweetsData" style="font-size:14px">
    <li>{{item.text}} <span style="color:#6740B4; font-weight: bold;">{{item.created_at | date:'fullDate'}}</span></li>
</ul>
</mat-dialog-content>`,
})

export class TodayDialog implements OnInit {
  noPosts: any;
  tweetsData: any;
  constructor(public dialogRef: MatDialogRef < TodayDialog > , @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

  }

  loadStuff() {
    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');

    this.http.post('/authorize', {headers}).subscribe((res) => {
      this.searchCall();
    })


  }


  searchCall() {
    console.log(this.data, 'data passed in');

    let headers = new HttpHeaders().set('Content-Type', 'application/X-www-form-urlencoded');
    //let searchterm = 'query=#startingGoalies #nhl ' + this.data.player.FirstName + ' ' + this.data.player.LastName;
    let searchterm = 'query=' + this.data.player.lastName + ' ' + this.data.player.twitterHandle;


    this.http.post('/search', searchterm, {headers}).subscribe((res) => {
       console.log(res['data'].statuses, 'twitter stuff');
      this.tweetsData = res['data'].statuses;
      if (this.tweetsData.length === 0) {
        this.noPosts = "No Tweets.";
      }
    });
  }

  ngOnInit() {
    this.loadStuff();
  }
}

@Component({
  selector: 'info',
  template: `<i (click)="close()" class="material-icons close">close</i><br />
<span style="color: #e74c3c;">back</span><span style="color: #ccc;"> to back</span><span> = The first game of a back to back scheduled game.</span><br />
<span style="color: #ccc;">back to </span><span style="color: #e74c3c;">back</span><span> = The second game of a back to back scheduled game.</span> <br />
<span class="green-dot"></span> = This game is in progress. <br />
<span>Click on player image for twitter updates!</span>`,
  styles: [`.close { float:right; cursor:pointer; font-size: 20px; } .green-dot { height: 10px; width: 10px; background:#2ecc71; border-radius: 50%; display: inline-block; }`]
})

export class Info {
  constructor(public snackBar: MatSnackBar) {}
  close() {
    this.snackBar.dismiss();
  }
}
