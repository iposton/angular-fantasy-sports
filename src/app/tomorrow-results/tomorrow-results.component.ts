import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs/Observable';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router, ActivatedRouteSnapshot } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TomorrowService } from '../tomorrow.service';
import { NHLDataService } from '../nhl-data.service';
import { FirebaseService } from '../firebase.service';
import { MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

//DATE FORMAT FOR FULL SCHEDULE API COMPARE DATES FOR BACK TO BACK
let today = null;
let tomorrow = null;
let yesterday = null;
let dailyTeams = [];
let teamString = '';
let teamRef = [];
let headers = null;




@Component({
  selector: 'app-tomorrow-results',
  templateUrl: './tomorrow-results.component.html',
  styleUrls: ['./tomorrow-results.component.css']
})
export class TomorrowResultsComponent implements OnInit {

  starters: Array < any > ;
  dailySchedule: Array < any > ;
  fullSchedule: Array < any > ;
  starterIdData: Array < any > = [];
  startersData: Array < any > = [];
  myData: Array < any > ;
  showDataTomorrow: Array < any > ;
  sentDataTomorrow: Array < any > ;
  sentDataToday: Array < any > ;
  gameDate: string = '';
  defineToken: string = '';
  statData: Array < any > = [];
  playerInfo: Array < any > ;
  playerInjuries: Array < any > ;
  noGamesToday: boolean;
  gamesToday: boolean;
  twitterHandles: Array < any > ;
  tomorrowStarters: Array < any > ;
  tweetDay: any;
  noGamesMsg: any;
  selected: any;
  startersDate: any;
  loading: boolean = true;
  fullFirebaseResponse: any;
  apiRoot: string = "https://api.mysportsfeeds.com/v2.1/pull/nhl/2019-2020-regular";

  public startingG = {
    '5571':'5571',
    '4863':'4863',
    '5107':'5107',
    '5908':'5908',
    '757':'757',
    '5033':'5033',
    '5109':'5109',
    '4874':'4874',
    '4950':'4950',
    '3486':'3486',
    '10074':'10074',
    '5122':'5122',
    '483':'483',
    '5528':'5528',
    '13876':'13876',
    '5366':'5366',
    '4890':'4890',
    '15525':'15525',
    '5420':'5420',
    '5873':'5873',
    '5552':'5552',
    '3647':'3647',
    '13934':'13934',
    '5224':'5224',
    '5842':'5842',
    '5894':'5894',
    '10083':'10083',
    '4294':'4294',
    '5180':'5180',
    '4862':'4862',
    '5163':'5163',
    '4666':'4666',
    '4947':'4947',
    '3810':'3810',
    '5877':'5877',
    '4235':'4235',
    '4326':'4326',
    '4561':'4561',
    '4763':'4763',
    '11724':'11724',
    '5277':'5277',
    '5176':'5176',
    '15442':'15442',
    '5168':'5168',
    '5296':'5296',
    '5227':'5227',
    '178':'178',
    '5518':'5518',
    '3855':'3855',
    '4305':'4305',
    '5481':'5481',
    '15154':'15154',
    '5887':'5887',
    '4351':'4351',
    '4592':'4592',
    '15438':'15438',
    '4575':'4575'
  }

  constructor(private http: HttpClient, private tomorrowService: TomorrowService, private todayService: NHLDataService, private fbService: FirebaseService, public snackBar: MatSnackBar, public router: Router, public dialog: MatDialog) { 
    yesterday = this.tomorrowService.getYesterday();
    tomorrow = this.tomorrowService.getTomorrow();
    today = this.tomorrowService.getToday();
    console.log(yesterday + ' yesterday, ' + today + ' today, ' + tomorrow + ' tomorrow, ');
    this.sentDataTomorrow = this.tomorrowService.getSentStats();
    this.sentDataToday = this.todayService.getSentStats();
  }


    public updateShowData() {
    for (let show of this.showDataTomorrow) {
      for (let rep of this.myData) {
      

        if (show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[0].player.id] != null && this.fullFirebaseResponse[3][rep.player.id] != null && rep.team.id === show.team.matchup[0].team.id && this.fullFirebaseResponse[3][show.team.matchup[0].player.id].probable === false && this.fullFirebaseResponse[3][rep.player.id].confirmed === true ) {
            // Found all confirmed goalies
            // if any of these confirmed goalies don't match ID's then check if same team id and swap 
           console.log(rep, 'update me into the view right now!');
           console.log(show.team.matchup[0], 'I have been changed, replace me with new goalie...');
           show.team.matchup[0] = rep; 
        }
        if (show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[1].player.id] != null && this.fullFirebaseResponse[3][rep.player.id] != null && rep.team.id === show.team.matchup[1].team.id && this.fullFirebaseResponse[3][show.team.matchup[1].player.id].probable === false && this.fullFirebaseResponse[3][rep.player.id].confirmed === true ) {
            // Found all confirmed goalies
            // if any of these confirmed goalies don't match ID's then check if same team id and swap 
           console.log(rep, 'update me into the view right now!');
           console.log(show.team.matchup[1], 'I have been changed, replace me with new goalie...');
           show.team.matchup[1] = rep; 
        }
      }
    }
  }

  async loadData() {
    let promiseOne;
    promiseOne = new Promise((resolve, reject) => {
    this.fbService
        .getStarterData()
          .subscribe(res => {
            if (res[0] != null) {
              this.fullFirebaseResponse = res[0];
              console.log(res[0][1], 'got response from firebase...');
              this.startersDate = res[0][2]['tomorrowDate'];
              this.tomorrowStarters = res[0][3];
              // This is to change a goalie in view without refresh
              if(this.showDataTomorrow != null && this.myData != null) {

                  for (let show of this.showDataTomorrow) {
                    for (let rep of this.myData) {
                  
                      if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[0].player.id] != null && this.fullFirebaseResponse[3][rep.player.id] != null && rep.team.id === show.team.matchup[0].team.id && this.fullFirebaseResponse[3][show.team.matchup[0].player.id].probable === false && this.fullFirebaseResponse[3][rep.player.id].confirmed === true ) {
                          // Found all confirmed goalies
                          // if any of these confirmed goalies don't match ID's then check if same team id and swap 
                        console.log(rep, 'update me into the view right now!');
                        console.log(show.team.matchup[0], 'I have been changed, replace me with new goalie...');
                        show.team.matchup[0] = rep; 
                      } else if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[0].player.id] != null && this.fullFirebaseResponse[3][rep.player.id] != null && rep.team.id === show.team.matchup[0].team.id && this.fullFirebaseResponse[3][show.team.matchup[0].player.id].probable === false && this.fullFirebaseResponse[3][rep.player.id].confirmed === false && this.fullFirebaseResponse[3][rep.player.id].probable === true && rep.player.probable === false) {
                        rep.player.probable = true;
                        console.log(rep, 'update me into the view right now! I am probable to start.');
                        console.log(show.team.matchup[0], 'I have been changed, replace me with probable goalie.');
                        show.team.matchup[0] = rep;
                      }
                      if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[1].player.id] != null && this.fullFirebaseResponse[3][rep.player.id] != null && rep.team.id === show.team.matchup[1].team.id && this.fullFirebaseResponse[3][show.team.matchup[1].player.id].probable === false && this.fullFirebaseResponse[3][rep.player.id].confirmed === true ) {
                          // Found all confirmed goalies
                          // if any of these confirmed goalies don't match ID's then check if same team id and swap 
                        console.log(rep, 'update me into the view right now!');
                        console.log(show.team.matchup[1], 'I have been changed, replace me with new goalie...');
                        show.team.matchup[1] = rep; 
                      } else if (this.startersDate === show.team.today && show.team.matchup != null && this.fullFirebaseResponse[3][show.team.matchup[1].player.id] != null && this.fullFirebaseResponse[3][rep.player.id] != null && rep.team.id === show.team.matchup[1].team.id && this.fullFirebaseResponse[3][show.team.matchup[1].player.id].probable === false && this.fullFirebaseResponse[3][rep.player.id].confirmed === false && this.fullFirebaseResponse[3][rep.player.id].probable === true && rep.player.probable === false) {
                        rep.player.probable = true;
                        console.log(rep, 'update me into the view right now! I am probable to start.');
                        console.log(show.team.matchup[1], 'I have been changed, replace me with probable goalie.');
                        show.team.matchup[1] = rep;
                      }
                    }
                  }

              }   
              
            }  
            resolve();
          });
        });
  
    let resultOne = await promiseOne;

    this.tomorrowService
      .getEnv().subscribe(res => {
        headers = new HttpHeaders().set("Authorization", "Basic " + btoa(res + ":" + 'MYSPORTSFEEDS'));
        //headers = new HttpHeaders().set("Authorization", "Basic " + btoa('ianposton' + ":" + res));
   
        this.tomorrowService
          .sendHeaderOptions(headers);

        this.tomorrowService
          .getDailySchedule().subscribe(res => {

            console.log(res, "schedule...");

            if (res['games'].length === 0) {
              this.loading = false;
              this.noGamesToday = true;
              this.noGamesMsg = "No Games Scheduled Tomorrow :("
              console.log('There are no games being played today.');
            } else {

              let postponed;

              res['games'].forEach((item, index) => {

                //console.log(item, 'item')
                dailyTeams.push(item.schedule.homeTeam.abbreviation, item.schedule.awayTeam.abbreviation); 
                teamString = dailyTeams.join();
                
                // postponed = index;
                // if (res['games'][postponed].id === '41392') {
                //   console.log(res['games'][postponed], "hi, iam postponed and causing trouble...");
                //   res['games'].splice(postponed, 1);
                // }
              });

              this.gamesToday = true;
              this.dailySchedule = res['games'];
              teamRef = res['references'].teamReferences;
              this.gameDate = res['games'][0].schedule.startTime ? res['games'][0].schedule.startTime : res['games'][1].schedule.startTime; //res['games'][0].date;

              let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.gameDate, 'EEEE');

              Observable.forkJoin(
                  res['games'].map(
                    g =>
                    this.http.get(`${this.apiRoot}/games/`+g['schedule'].id+`/lineup.json?position=Goalie-starter`, {headers})
                    
                  )
                )
                .subscribe(res => {
                  console.log(res, 'making several calls by GAME ID for starting lineups...');

                  let i;
                  let i2;
                  let res2;
                  res.forEach((item, index) => {
                    i = index;
                    //console.log(res[i]['gamestartinglineup'].teamLineup, 'got starting lineups data!');
                    res2 = res[i]['teamLineups'];
                    //this.gameTime =  res[i]['gamestartinglineup'].game.date;
                    res2.forEach((item, index) => {

                      i2 = index;
                      if (res2[i2].actual != null && res2[i2].expected != null) {
                        //console.log(res2[i2].actual.starter[0].player.id, 'got player ID for goalie actualy starting!');
                        this.starterIdData.push(res2[i2].actual.starter[0].player.id);

                      } else if (res2[i2].actual == null && res2[i2].expected != null) {
                        //console.log(res2[i2].expected.starter[0].player.id, 'got player ID for goalie expected to start!');
                        this.starterIdData.push(res2[i2].expected.starter[0].player.id);
                      } else {
                        //console.log(res2[i2].team.City + " " + res2[i2].team.Name, 'no starters yet!');
                        this.starterIdData.push(res2[i2].team.id);
                        //this.starterIdData.push(res2[i2].expected.starter[0].player.id);
                        //console.log(this.starterIdData, 'this array has ALL the IDs of todays starters');

                      }

                    });
                  });

                  this.sortData();

                });

            }

          })

        this.tomorrowService
          .getInjured().subscribe(res => {
            console.log(res, "injured players...");
            this.playerInjuries = res;
          })

        // this.tomorrowService
        //   .getInfo().subscribe(res => {
        //     console.log(res['activeplayers'].playerentry, "active players stats...");
        //     this.playerInfo = res['activeplayers'].playerentry;
        //   })

        this.tomorrowService
          .getGameId().subscribe(res => {
            console.log(res['games'], "scheduled games for yesterday today and tomorrow...");

            //this removed a postponed game from api to avoid errors
          //   if (res['games'] > 0) {
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

  sortData() {

    this.tomorrowService
      .getStats(teamString).subscribe(res => {
        console.log(res['playerStatsTotals'], "cumulative stats...");
        this.myData = res['playerStatsTotals'];

        if (this.myData && this.dailySchedule) {
          console.log('start sorting data for daily schedule...');
          for (let schedule of this.dailySchedule) {

            for (let sdata of this.myData) {

              if (schedule.schedule.awayTeam.abbreviation === sdata.team.abbreviation) {
                
                sdata.player.gameTime = schedule.schedule.startTime;
                sdata.team.gameIce = schedule.schedule.venue.name;

                // if (schedule.schedule.location === 'Nassau Coliseum') {
                //   sdata.team.gameIce = 'Barclays Center';
                // } else if (schedule.schedule.location === 'Verizon Center') {
                //   sdata.team.gameIce = 'Capital One Arena';
                // } else if (schedule.schedule.location === 'Joe Louis Arena') {
                //   sdata.team.gameIce = 'Little Caesars Arena';
                // } else if (schedule.schedule.location === 'Consol Energy Center') {
                //   sdata.team.gameIce = 'PPG Paints Arena';
                // } else {
                //   sdata.team.gameIce = schedule.schedule.location;
                // }

                sdata.team.gameId = schedule.schedule.id;
                sdata.player.gameLocation = "away";
                sdata.team.opponent = schedule.schedule.homeTeam.abbreviation;
                sdata.team.opponentId = schedule.schedule.homeTeam.id;
                //sdata.team.opponentCity = schedule.schedule.homeTeam.City;
                sdata.team.opponentName = schedule.schedule.homeTeam.abbreviation;
                sdata.team.today = today;
                sdata.team.tomorrow = tomorrow;
                sdata.team.yesterday = yesterday;
                sdata.team.day = this.tweetDay;
                sdata.player.injured = false;
                sdata.player.injury = '';
                sdata.player.playedYesterday = false;
                sdata.player.savesYesterday = '0';
                sdata.player.winsYesterday = '0';
                sdata.player.lossesYesterday = '0';
                sdata.player.saYesterday = '0';
                sdata.player.olYesterday = '0';
                sdata.player.shYesterday = '0';


              }
              if (schedule.schedule.homeTeam.abbreviation === sdata.team.abbreviation) {
                sdata.player.gameTime = schedule.schedule.startTime;
                sdata.team.gameIce = schedule.schedule.venue.name;

                // if (schedule.schedule.location === 'Nassau Coliseum') {
                //   sdata.team.gameIce = 'Barclays Center';
                // } else if (schedule.schedule.location === 'Verizon Center') {
                //   sdata.team.gameIce = 'Capital One Arena';
                // } else if (schedule.schedule.location === 'Joe Louis Arena') {
                //   sdata.team.gameIce = 'Little Caesars Arena';
                // } else if (schedule.schedule.location === 'Consol Energy Center') {
                //   sdata.team.gameIce = 'PPG Paints Arena';
                // } else {
                //   sdata.team.gameIce = schedule.schedule.location;
                // }

                sdata.team.gameId = schedule.schedule.id;
                sdata.player.gameLocation = "home";
                sdata.team.opponent = schedule.schedule.awayTeam.abbreviation;
                sdata.team.opponentId = schedule.schedule.awayTeam.id;
                //sdata.team.opponentCity = schedule.schedule.awayTeam.City;
                sdata.team.opponentName = schedule.schedule.awayTeam.abbreviation;
                sdata.team.today = today;
                sdata.team.tomorrow = tomorrow;
                sdata.team.yesterday = yesterday;
                sdata.team.day = this.tweetDay;
                sdata.player.injured = false;
                sdata.player.injury = '';
                sdata.player.playedYesterday = false;
                sdata.player.savesYesterday = '0';
                sdata.player.winsYesterday = '0';
                sdata.player.lossesYesterday = '0';
                sdata.player.saYesterday = '0';
                sdata.player.olYesterday = '0';
                sdata.player.shYesterday = '0';
              }
            }
          }
        }

        if (this.myData && this.fullSchedule) {
          console.log('start sorting data for full schedule...');
          let dPipe = new DatePipe("en-US");
              this.tweetDay = dPipe.transform(this.gameDate, 'EEEE');
          for (let full of this.fullSchedule) {

            for (let btb of this.myData) {

              if (full['schedule'].awayTeam.id === btb.team.id) {

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
              if (full.schedule.homeTeam.id === btb.team.id) {


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
              //console.log(data, 'start sorting data for goalie images...');
              data.player.savePercent = data.stats.goaltending.savePercentage;


              if (this.tomorrowStarters && this.tomorrowStarters[data.player.id] != null) {
                   data.player.image = this.tomorrowStarters[data.player.id].image;
                   data.player.atHandle = this.tomorrowStarters[data.player.id].atHandle;
                   data.player.twitterHandle = this.tomorrowStarters[data.player.id].twitterHandle;
                } 

              if (this.tomorrowStarters && this.tomorrowStarters[data.player.id] != null && this.startersDate === data.team.today && this.tomorrowStarters[data.player.id].probable === true) {

                data.player.startingToday = false;
                data.player.likelyStartingToday = true;
                data.player.confirmed = this.tomorrowStarters[data.player.id].confirmed;
                data.player.probable = this.tomorrowStarters[data.player.id].probable;
                this.startersData.push(data);

              }

              if (data.team.hadGameYesterday === true) {
                //console.log(data, 'game yesterday');
                if (data.team.haveGameToday === true) {
                  data.team.secondBacktoBack = " 2nd game of Back-to-Back ";
                } else {
                  data.team.secondBacktoBack = "";
                }
              } else {
                data.team.secondBacktoBack = "";
              }

              if (data.team.haveGameToday === true) {
                //console.log(data, 'game today');
                if (data.team.haveGameTomorrow === true) {
                  data.team.firstBacktoBack = " 1st game of Back-to-Back ";
                } else {
                  data.team.firstBacktoBack = "";
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
               } 
             }  
          }

          for (let schedule of this.myData) {
            for (let sdata of this.myData) {
              if (sdata.team.opponentId != null && 
                sdata.team.opponentId === schedule.team.id && 
                sdata.gameId === schedule.gameId) {
                sdata.team.opponentLogo = schedule.team.logo;
                sdata.team.opponentCity = schedule.team.city;
                sdata.team.opponentName = schedule.team.name;
                sdata.opponentColor = schedule.team.color;
              }
            }
          }
        

        if (this.sentDataToday != null) {
          console.log('start sorting data from yesterday...');
          for (let today of this.sentDataToday) {

            for (let tomdata of this.myData) {

              if (today.player.saves > 1 && today.player.id === tomdata.player.id) {

                tomdata.player.finishedYesterday = false;
                tomdata.player.playedYesterday = true;
                tomdata.player.savesYesterday = today.player.saves;
                tomdata.player.winsYesterday = today.player.wins;
                tomdata.player.lossesYesterday = today.player.losses;
                tomdata.player.saYesterday = today.player.shotsFaced;
                tomdata.player.olYesterday = today.player.OvertimeLosses;
                tomdata.player.shYesterday = today.player.Shutouts;
                if (today.player.wins === 1) {
                  tomdata.player.resultYesterday = today.player.FirstName + ' ' + today.player.LastName + ' got the Win tonight with ' + today.player.saves + ' saves against ' + today.player.shotsFaced + ' shots.'
                } else if (today.player.losses === 1 || today.player.OvertimeLosses === 1) {
                  tomdata.player.resultYesterday = today.player.FirstName + ' ' + today.player.LastName + ' got the Loss tonight with ' + today.player.saves + ' saves against ' + today.player.shotsFaced + ' shots.'
                }

              }

            }
          }
        }

       if (this.playerInjuries && this.myData) {
          console.log('start sorting data for starters matchups...');
          for (let inj of this.playerInjuries) {

            for (let injdata of this.myData) {

              if (inj.player.id === injdata.player.id) {
                //console.log(inj.injury, "injuries...");

                injdata.player.injured = true;
                injdata.player.injury = ' ' + inj.injury;

                if (inj.injury.substr(inj.injury.length - 5) === '(Out)') {
                  console.log(inj.injury.substr(inj.injury.length - 5), 'injuries that say OUT!');
                  injdata.player.injuryOut = true;
                }

              }

            }
          }
        }



        if (this.myData && this.gamesToday === true) {

          if (this.starterIdData.length > 0) {
            console.log('start sorting data for starters matchups...');
            for (let startid of this.starterIdData) {

              for (let startdata of this.myData) {

                if (startid === startdata.team.id) {
                  //4449 Jeff Glass is blocked //9072 Lindgren //11721 Lagace //Sateri 13871 //Brossoit 5552 //8952 Wedgewood //9072 Lindgren //13873 DeSmith //10083 Jarry //Lyon 13662
                  //&& startdata.player.injuryOut == null && startdata.player.id != '11721' && startdata.player.id != '13871' && startdata.player.id != '4449' && startdata.player.id != '5552' && startdata.player.id != '8952' && startdata.player.id != '9072' && startdata.player.id != '10083' && startdata.player.id != '13662'
                  //startdata.stats.goaltending.gamesStarted > 1
                  if (this.startersDate != startdata.team.today && startdata.player.currentRosterStatus === "ROSTER" && this.startingG[startdata.player.id] != null) {
              
                    startdata.player.startingToday = false;
                    startdata.player.likelyStartingToday = true;
                    //console.log(startdata.player.FirstName + " " + startdata.player.LastName, "this goalie is not starting yet. but he might start.");
                    this.startersData.push(startdata);


                  }
                } else if (startid === startdata.player.id && startdata.player.currentRosterStatus === "ROSTER" && this.startingG[startdata.player.id] != null) {
                  startdata.player.startingToday = true;
                  //console.log(startdata, 'player data');
                  this.startersData.push(startdata);

                } else {
                  //console.log('other goalies');
                }

              }
            }
          }


          //MAKE MATCHUPS BY GAME ID OF STARTERS AND NON STARTERS
          if (this.startersData.length > 0) {
            console.log(this.startersData, 'starters');
            this.statData = this.startersData.reduce(function(r, a) {
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
      //console.log(data, 'start data');
      if (data.player.gameLocation === 'home') {
       
        //console.log(this.statData[data.team.gameId], 'checking statData');

        data.team.matchup = this.statData[data.team.gameId]; 
        data.matchup = true;
        this.statData[data.team.gameId][0].player.twoPossibleStarters = false;
        this.statData[data.team.gameId][1].player.twoPossibleStarters = false;

        if (this.statData[data.team.gameId].length > 2) {
          //console.log(this.statData[data.team.gameId][0].team.abbreviation + ' ' + this.statData[data.team.gameId][1].team.abbreviation + ' ' + this.statData[data.team.gameId][2].team.Name, 'possible starters...');
          if (this.statData[data.team.gameId][0].team.id === this.statData[data.team.gameId][1].team.id) {
            this.statData[data.team.gameId][1].twoPossibleStarters = true;
            if (this.statData[data.team.gameId][0].player.resultYesterday != null) {
              this.statData[data.team.gameId][0].player.finishedYesterday = true;
            }
            if (this.statData[data.team.gameId][1].player.resultYesterday != null) {
              this.statData[data.team.gameId][1].player.finishedYesterday = true;
            }
          } else {
            this.statData[data.team.gameId][1].twoPossibleStarters = false;
          }
          if (this.statData[data.team.gameId][1].team.id === this.statData[data.team.gameId][2].team.id) {
            this.statData[data.team.gameId][1].twoPossibleStarters = true;


            this.statData[data.team.gameId][2].player.twoPossibleStarters = true;
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
            if (this.statData[data.team.gameId][2].team.id === this.statData[data.team.gameId][3].team.id) {
              this.statData[data.team.gameId][2].twoPossibleStarters = true;
              this.statData[data.team.gameId][3].twoPossibleStarters = true;
              if (this.statData[data.team.gameId][2].player.resultYesterday != null) {
                this.statData[data.team.gameId][2].player.finishedYesterday = true;
              }
              if (this.statData[data.team.gameId][3].player.resultYesterday != null) {
                this.statData[data.team.gameId][3].player.finishedYesterday = true;
              }
            } else {
              this.statData[data.team.gameId][2].twoPossibleStarters = false;
              this.statData[data.team.gameId][3].twoPossibleStarters = false;
            }
          }

        }


        this.loading = false;
        this.showDataTomorrow = this.startersData;
        //console.log(this.showDataTomorrow, 'show this.')
      }

    })

    this.tomorrowService
      .sendStats(this.showDataTomorrow);
  }

  ngOnInit() {
    if (this.sentDataTomorrow === undefined) {
      this.loadData();
    } else {
        this.loading = false;  
        this.showDataTomorrow = this.sentDataTomorrow;
        this.gameDate = this.showDataTomorrow["0"].team.today;     
    }

  }

  public isVisibleOnDesktop() {
    // console.log('width over 600px');
  }

  openSnackBar() {
    this.snackBar.openFromComponent(InfoTomorrow, {
      // duration: 500,
    });
  }


  public open(event, data) {
    this.selected = data;
    console.log(data, 'ok you clicked on player img...');
    this.dialog.open(TomorrowDialog, {
      data: data,
      width: '600px',
    });
  }


}

@Component({
  selector: 'tomorrow-dialog',
  template: `<i (click)="dialogRef.close()" style="float:right; cursor:pointer;" class="material-icons">close</i>
  <span style="color:#00aced;">Twitter Updates!</span> 
  <mat-dialog-content>
  <span style="font-size: 26px; font-weight: light; color: #555; text-align: center;">{{ noPosts }}</span>
  <ul *ngFor="let item of tweetsData" style="font-size:14px">
    <li>{{item.text}} <span style="color:#6740B4; font-weight: bold;">{{item.created_at | date:'fullDate'}}</span></li>
</ul>
</mat-dialog-content>`,
})

export class TomorrowDialog implements OnInit {
  test: any;
  noPosts: any;
  tweetsData: any;
  constructor(public dialogRef: MatDialogRef < TomorrowDialog > , @Inject(MAT_DIALOG_DATA) public data: any, private http: HttpClient) {

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
  selector: 'info-tomorrow',
  template: `<i (click)="close()" class="material-icons close">close</i><br />
<span style="color: #e74c3c;">back</span><span style="color: #ccc;"> to back</span><span> = The first game of a back to back scheduled game.</span><br />
<span style="color: #ccc;">back to </span><span style="color: #e74c3c;">back</span><span> = The second game of a back to back scheduled game.</span> <br />
<span>Click on player image for twitter updates!</span>`,
  styles: [`.close { float:right; cursor:pointer; font-size: 20px;}`]
})

export class InfoTomorrow {
  constructor(public snackBar: MatSnackBar) {}
  close() {
    this.snackBar.dismiss();
  }
}
