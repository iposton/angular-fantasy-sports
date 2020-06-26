import { Component, OnInit, Input } from '@angular/core';

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

  public oRank            :Array<any>;
  public tRank            :Array<any>;

  constructor() { }

  public getRank(d, teams, title) {
    let data = [];
    let rank = [];
    let rank2 = [];
    let tRank = [];
    data = d;
    // console.log(d, 'data', teams, 'teams', title, 'title');
    if (title === 'Defense') {
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
         if (rank[index].team.abbreviation === team.abbreviation) { 
           team.dRank = index + 1;
           team.stats = rank[index].stats;
         }
        }
      });

      rank2.forEach(function(item, index){
        for (let team of teams) {
         if (rank2[index].team.abbreviation === team.abbreviation) { 
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
      //console.log('team rank', tRank);
      this.tRank = tRank;
      return this.tRank;
    } else {
      //offense
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
         if (rank[index].team.abbreviation === team.abbreviation) { 
           team.oRank = index + 1;
           team.stats = rank[index].stats;
         }
        }
      });

      rank2.forEach(function(item, index){
        for (let team of teams) {
         if (rank2[index].team.abbreviation === team.abbreviation) { 
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
      console.log('team rank', tRank);
      this.tRank = tRank;
      return this.tRank;
    }
  
  }

  ngOnInit(): void {
  }

}
