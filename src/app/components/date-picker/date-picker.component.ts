import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Output() setDate = new EventEmitter();

  constructor() { }

  public changeDate(event) {
    let dailyDate = event.target.value.slice(0, 10).replace(/-/g, "");
    this.setDate.emit(dailyDate); 
  }

  ngOnInit(): void {
  }

}
