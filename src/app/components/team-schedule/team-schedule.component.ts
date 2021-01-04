import { Component, OnInit, Input } from '@angular/core';

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
  public weekResults               :boolean = false;

  constructor() { }

  public crunch(items, team) {
    //console.log('crunching schedule results...', team);
    let sum = 0;
    let w = 0;
    let l = 0;
    let result = null;
    items.forEach((item, index) => {
      if (team === item.schedule.homeTeam.abbreviation) {
        if (item.score.homeScoreTotal - item.score.awayScoreTotal > 0) {
          w += 1;
        } else {
          l += 1;
        }
        sum += (item.score.homeScoreTotal - item.score.awayScoreTotal);
      } else if (team === item.schedule.awayTeam.abbreviation) {
        if (item.score.awayScoreTotal - item.score.homeScoreTotal > 0) {
          w += 1;
        } else {
          l += 1;
        }
        sum += (item.score.awayScoreTotal - item.score.homeScoreTotal);
      }

      //result = sum+' ('+w+'-'+l+')';
      result = {sum: sum, title: sum+' ('+w+'-'+l+')'};
    });
    return result;
  }

  ngOnInit(): void {
  }

}
