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

  ngOnInit(): void {
  }

}
