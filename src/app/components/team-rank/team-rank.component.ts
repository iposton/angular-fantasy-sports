import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-rank',
  templateUrl: './team-rank.component.html',
  styleUrls: ['./team-rank.component.scss']
})
export class TeamRankComponent implements OnInit {
  @Input('data')
  public data             :Array<any>;
  @Input('teams')
  public teams            :Array<any>;
  @Input('title')
  public title            :any;
  @Output() seasonChange = new EventEmitter();
  @Output() seasonChangeD = new EventEmitter();

  public oRank            :Array<any> = [];
  public tRank            :Array<any> = [];
  public seasonLength: string = 'full';
  public loading: boolean = true;
  public hoveredItem: string = '';

  constructor() { }

  public getRank(d, teams, title, sl) {
    this.loading = true;
    let data = [];
    let rank = [];
    let rank2 = [];
    let tRank = [];
    data = d;
    let statTypeO = '';
    statTypeO = sl === 'fh' ? 'ofh' : sl === 'sh' ? 'osh' : 'otr';
    let statTypeD = '';
    statTypeD = sl === 'fh' ? 'dfh' : sl === 'sh' ? 'dsh' : 'dtr';
    // console.log(d, 'data', teams, 'teams', title, 'title');
    if (title === 'Defense Team Rank') {
      rank = data.slice().sort((a: any, b: any) => {
        // console.log('rank PA');
        if (a['stats'].standings.pointsAgainst
         <= b['stats'].standings.pointsAgainst) {
          return -1;
        } else if (a['stats'].standings.pointsAgainst
         >= b['stats'].standings.pointsAgainst) {
          return 1;
        } else {
          return 0;
        }
      });

      rank2 = data.slice().sort((a: any, b: any) => {
        // console.log('rank Sacks and Picks');
        if (a['stats'].tackles.sacks + a['stats'].interceptions.interceptions + a['stats'].interceptions.passesDefended 
         >= b['stats'].tackles.sacks + b['stats'].interceptions.interceptions + b['stats'].interceptions.passesDefended) {
          return -1;
        } else if (a['stats'].tackles.sacks + a['stats'].interceptions.interceptions + a['stats'].interceptions.passesDefended
         <= b['stats'].tackles.sacks + b['stats'].interceptions.interceptions + b['stats'].interceptions.passesDefended) {
          return 1;
        } else {
          return 0;
        }
      });

      rank.forEach(function(item, index){
        for (let team of teams) {
         if (rank[index].team.id === team.id) { 
           team.dRank = index + 1;
           team.stats = rank[index].stats;
         }
        }
      });

      rank2.forEach(function(item, index){
        for (let team of teams) {
         if (rank2[index].team.id === team.id) { 
           team.sackRank = index + 1; 
         }
        }
      });

      tRank = teams.slice().sort((a: any, b: any) => {
        // console.log('rank teams final');
        if ((a.dRank + a.sackRank)
        <= (b.dRank + b.sackRank)) {
          return -1;
        } else if ((a.dRank + a.sackRank)
        >= (b.dRank + b.sackRank)) {
          return 1;
        } else {
          return 0;
        }
      });
      
      this.tRank = tRank;
      this.loading = false;
      return this.tRank;
    } else if (title === 'Offense Team Rank') {
      rank = data.slice().sort((a: any, b: any) => {
          if ((a['stats'].rushing.rushYards + a['stats'].passing.passNetYards)
          >= (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards)) {
            return -1;
          } else if ((a['stats'].rushing.rushYards + a['stats'].passing.passNetYards)
          <= (b['stats'].rushing.rushYards + b['stats'].passing.passNetYards)) {
            return 1;
          } else {
            return 0;
          }
      });

      rank2 = data.slice().sort((a: any, b: any) => {
        // console.log('rank Sacks and Picks');
        if (a['stats'].passing.passTD + a['stats'].rushing.rushTD 
         >= b['stats'].passing.passTD + b['stats'].rushing.rushTD) {
          return -1;
        } else if (a['stats'].passing.passTD + a['stats'].rushing.rushTD
         <= b['stats'].passing.passTD + b['stats'].rushing.rushTD) {
          return 1;
        } else {
          return 0;
        }
      });

      rank.forEach(function(item, index){
        for (let team of teams) {
         if (rank[index].team.id === team.id) { 
           team.oRank = index + 1;
           team.stats = rank[index].stats;
         }
        }
      });

      rank2.forEach(function(item, index){
        for (let team of teams) {
         if (rank2[index].team.id === team.id) { 
           team.tdRank = index + 1; 
         }
        }
      });

      tRank = teams.slice().sort((a: any, b: any) => {
        // console.log('rank teams final');
        if (a.oRank + a.tdRank
        <= b.oRank + b.tdRank) {
          return -1;
        } else if (a.oRank + a.tdRank
        >= b.oRank + b.tdRank) {
          return 1;
        } else {
          return 0;
        }
      });
      //console.log('team rank', tRank);
      this.tRank = tRank;
      this.loading = false;
      return this.tRank;
    } else if (title === 'Toughest Defense Schedule 2020') {
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
    }  else if (title === 'Toughest Offense Schedule 2020') {
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
