import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UtilService } from '../../services/index';

@Component({
  selector: 'app-stat-card',
  templateUrl: './stat-card.component.html',
  styleUrls: ['./stat-card.component.scss']
})
export class StatCardComponent implements OnInit {
  @Input('data')
  public data             :Array<any>;
  @Input('statType')
  public statType         :string;
  @Input('statField')
  public statField        :string;
  @Input('order')
  public order            :string;
  @Input('page')
  public page             :any;
  @Input('amount')
  public amount           :any;
  @Input('title')
  public title            :any;
  @Input('twitter')
  public twitter          :any;
  @Input('gameDate')
  public gameDate         :any;
  @Input('statTag')
  public statTag          :string;
  @Input('sport')
  public sport            :string;
  @Input('teams')
  public teams            :any;
  @Input('position')
  public position         :any;
  @Input('seasonLength')
  public seasonLength     :any;
  @Input('eliteStat')
  public eliteStat     :any;
  @Input('ndk')
  public ndk              :boolean;
  @Output() open = new EventEmitter<object>();

  public type           :any;
  public begin          :any;
  public end            :any;
  public mobile         :any;
  public hoveredItem    :string = '';
  public hoveredItem2   :string = '';
  public sortedStats: Array<any>;

  constructor(private util: UtilService) { }

  public authorize(player, type) {
    //console.log('trying to emit', player)
    this.open.emit({player: player, type: type}); 
  }

  public sortStats(array, field1, field2, order, dk, sl, es) {
    //console.log('sort the data', array);
    //this.sortedStats = array;
    array.sort((a: any, b: any) => {
        if (order === 'ASC') {
          if (this.util.round(a['stats'][field1][field2],1) <= this.util.round(b['stats'][field1][field2],1)) {
            return -1;
          } else if (this.util.round(a['stats'][field1][field2],1) >= this.util.round(b['stats'][field1][field2],1)) {
            return 1;
          } else {
            return 0;
          }
        } else if (order === 'DESC') {
          if (this.util.round(a['stats'][field1][field2],1) >= this.util.round(b['stats'][field1][field2],1)) {
            return -1;
          } else if (this.util.round(a['stats'][field1][field2],1) <= this.util.round(b['stats'][field1][field2],1)) {
            return 1;
          } else {
            return 0;
          }
        }   
    });
    return array;
  }

  ngOnInit(): void {
    if (window.innerWidth < 700) {
      this.mobile = true;
    }
  }

}
