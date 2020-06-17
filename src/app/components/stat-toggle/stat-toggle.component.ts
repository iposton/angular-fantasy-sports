import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stat-toggle',
  templateUrl: './stat-toggle.component.html',
  styleUrls: ['./stat-toggle.component.scss']
})
export class StatToggleComponent implements OnInit {
  @Input('item')
  public item            :any;
  @Input('position')
  public position        :any;
  @Input('status')
  public status          :boolean;
  @Input('stats')
  public stats           :any;
  public statArr: Array <any> = [];

  constructor() { }

  public getData(item, status, pos, s) {
    if (s === '1') {
      if (pos != 'ALL') {
        this.statArr = status ? [`${item.player.pts} Pts`, `${item.player.min} Min`, `${item.player.reb} Reb`] :
        [`${item.stats.offense.ptsPerGame} Pts`, `${(item.stats.miscellaneous.minSecondsPerGame / 60)} Min`, `${item.stats.rebounds.rebPerGame} Reb`];    
      } else if (pos === 'ALL') {
        this.statArr = status ? [`${item.playerObj.player.pts} Pts`, `${item.playerObj.player.min} Min`] :
        [`${item.playerObj.stats.offense.ptsPerGame} Pts`, `${(item.playerObj.stats.miscellaneous.minSecondsPerGame / 60)} Min`];
      } 

    } else if (s === '2') {
      if (pos != 'ALL') { 
        this.statArr[1] = status ? `${item.player.reb} Reb` : `${item.stats.rebounds.rebPerGame} Reb`;
        this.statArr[2] = status ? `${item.player.ast} Ast` : `${item.stats.offense.astPerGame} Ast`;
      } else if (pos === 'ALL') {
        this.statArr[1] = status ? `${item.playerObj.player.reb} Reb` : 
        `${item.playerObj.stats.rebounds.rebPerGame} Reb`;  
      } 

    } else if (s === '3') {
      if (pos != 'ALL') {
        this.statArr[1] = status ? `${item.player.ast} Ast` : `${item.stats.offense.astPerGame} Ast`;    
        this.statArr[2] = status ? `${item.player.stl} Stl` : `${item.stats.defense.stlPerGame} Stl`;
      } else if (pos === 'ALL') {
        this.statArr[1] = status ? `${item.playerObj.player.ast} Ast` :
        `${item.playerObj.stats.offense.astPerGame} Ast`;  
      }

    } else if (s === '4') {
      if (pos != 'ALL') {
        this.statArr[1] = status ? `${item.player.stl} Stl` : `${item.stats.defense.stlPerGame} Stl`;          
        this.statArr[2] = status ? `${item.player.blk} Blk` : `${item.stats.defense.blkPerGame} Blk`;
      } else if (pos === 'ALL') {
        this.statArr[1] = status ? `${item.playerObj.player.stl} Stl` :
        `${item.playerObj.stats.defense.stlPerGame} Stl`;  
      }
    } else if (s === '5') {
      if (pos != 'ALL') {
        this.statArr[1] = status ? `${item.player.ast} Ast` : `${item.stats.offense.astPerGame} Ast`;         
        this.statArr[2] = status ? `${item.player.stl} Stl` : `${item.stats.defense.stlPerGame} Stl`;
      } else if (pos === 'ALL') {
        this.statArr[1] = status ? `${item.playerObj.player.blk} Blk` :
        `${item.playerObj.stats.defense.blkPerGame} Blk`;
      }
      
    } else if (s === '6') {
      if (pos != 'ALL') {
        this.statArr[1] = status ? `${item.player.ast} Ast` : `${item.stats.offense.astPerGame} Ast`;         
        this.statArr[2] = status ? `${item.player.tpm} TPM` : `${item.stats.fieldGoals.fg3PtMadePerGame} TPM`;
      } else if (pos === 'ALL') {
        this.statArr[1] = status ? `${item.playerObj.player.tpm} TPM` : 
        `${item.playerObj.stats.fieldGoals.fg3PtMadePerGame} TPM`;
      }

    } else if (s === '7') {
      if (pos != 'ALL') {          
        this.statArr[2] = status ? `${item.player.fga} FGA` :    
        `${item.stats.fieldGoals.fgAttPerGame} FGA`;  
      } else if (pos === 'ALL') {
        this.statArr[1] = status ? `${item.playerObj.player.fga} FGA` :
        this.statArr[1] = `${item.playerObj.stats.fieldGoals.fgAttPerGame} FGA`; 
      }  
    } else if (s === '8') {
      if (pos != 'ALL') {
         this.statArr = [`Likely Start ${(item.stats.miscellaneous.gamesStarted / item.stats.gamesPlayed * 100).toFixed()}%`];
      }  else if (pos === 'ALL') {
         this.statArr = [`Likely Start ${(item.playerObj.stats.miscellaneous.gamesStarted / item.playerObj.stats.gamesPlayed * 100).toFixed()}%`];
      }
    } else if (s === '9') {
      if (pos != 'ALL') {
         this.statArr = [`${item.team.gamesThisWeek} Games This Week`];
      } else if (pos === 'ALL') {
         this.statArr = [`${item.playerObj.team.gamesThisWeek} Games This Week`];
      }
    }
    return this.statArr;
  }

  ngOnInit(): void {
  }

}
