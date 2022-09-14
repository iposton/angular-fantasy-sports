import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { UtilService } from 'src/app/services'

@Component({
  selector: 'app-team-rank',
  templateUrl: './team-rank.component.html',
  styleUrls: ['./team-rank.component.scss']
})
export class TeamRankComponent implements OnInit {
  @Input('data')
  public data              :Array<any>;
  @Input('teams')
  public teams             :Array<any>;
  @Input('title')
  public title             :any;
  @Input('week')
  public week              :any;
  @Input('seasonLength')
  public seasonLength      :any;
  @Output() seasonChange = new EventEmitter();
  @Output() seasonChangeD = new EventEmitter();

  public oRank            :Array<any> = [];
  public tRank            :Array<any> = [];
  // public seasonLength: string = 'dtr';
  public loading: boolean = true;
  public hoveredItem: string = '';

  constructor(public util: UtilService) { }

  public getRank(d, teams, title, sl, week) {
    this.loading = true;
    let rank = [];
    let tRank = [];
    let statTypeO = '';
    statTypeO = sl;
    let statTypeD = '';
    statTypeD = sl;
    //  console.log(sl, 'season length', title, 'title');
    if (title === 'Defense Team Rank') {

      tRank = teams.slice().sort((a: any, b: any) => {
        if (a.defenseRankLs <= b.defenseRankLs) {
          return -1;
        } else if (a.defenseRankLs >= b.defenseRankLs) {
          return 1;
        } else {
          return 0;
        }
      });
      
      this.tRank = tRank;
      this.loading = false;
      return this.tRank;

    } else if (title === 'Offense Team Rank') {

      tRank = teams.slice().sort((a: any, b: any) => {
        if (a.offenseRankLs <= b.offenseRankLs) {
          return -1;
        } else if (a.offenseRankLs >= b.offenseRankLs) {
          return 1;
        } else {
          return 0;
        }
      });

      this.tRank = tRank;
      this.loading = false;
      return this.tRank;

    } else if (title === 'Toughest Defense Schedule 2022') {
      this.seasonChange.emit(sl);
      rank = teams.slice().sort((a: any, b: any) => {    
        if (a[statTypeD] 
         <= b[statTypeD]) {
          return -1;
        } else if (a[statTypeD]
         >= b[statTypeD]) {
          return 1;
        } else {
          return 0;
        }
      });

      this.tRank = rank;
      this.loading = false;
      return this.tRank;
    }  else if (title === 'Toughest Offense Schedule 2022') {
      this.seasonChangeD.emit(sl);
      rank = teams.slice().sort((a: any, b: any) => {
        // console.log('rank PA');
        if (a[statTypeO] 
         <= b[statTypeO]) {
          return -1;
        } else if (a[statTypeO]
         >= b[statTypeO]) {
          return 1;
        } else {
          return 0;
        }
      });

      this.tRank = rank;
      this.loading = false;
      return this.tRank;
    }
  
  }
  ngOnInit(): void {
  }
}
