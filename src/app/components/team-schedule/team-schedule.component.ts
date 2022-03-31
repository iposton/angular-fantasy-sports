import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-team-schedule',
  templateUrl: './team-schedule.component.html',
  styleUrls: ['./team-schedule.component.scss']
})
export class TeamScheduleComponent implements OnInit {
  @Input('teamSchedules')
  public teamSchedules             :Array<any>;
  @Input('amount')
  public amount                    :string;
  @Output() week = new EventEmitter();
  public weekResults               :boolean = false;
  public nextWeek                  :boolean = false;

  constructor() { }

  public changeSched() {
    this.week.emit(this.nextWeek); 
  }

  public crunch(items, team) {
    //console.log('crunching schedule results...', team);
    let sum = 0
    let sumGoals = 0
    let w = 0;
    let l = 0;
    let result = null;
    items.forEach((item, index) => {
      if (team === item.schedule.homeTeam.abbreviation) {
        if (item.score.homeScoreTotal - item.score.awayScoreTotal > 0) {
          w += 1;
        } else if (item.score.homeScoreTotal - item.score.awayScoreTotal < 0) {
          l += 1;
        }
        sum += (item.score.homeScoreTotal - item.score.awayScoreTotal)
        sumGoals += item.score.homeScoreTotal
      } else if (team === item.schedule.awayTeam.abbreviation) {
        if (item.score.awayScoreTotal - item.score.homeScoreTotal > 0) {
          w += 1;
        } else if (item.score.awayScoreTotal - item.score.homeScoreTotal < 0)  {
          l += 1;
        }
        sum += (item.score.awayScoreTotal - item.score.homeScoreTotal)
        sumGoals += item.score.awayScoreTotal
      }

      result = {goals: sumGoals, sum: sum, title: sum+' ('+w+'-'+l+')'};
    });
    return result;
  }

  ngOnInit(): void {
  }

}
