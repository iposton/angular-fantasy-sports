import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-position-card',
  templateUrl: './position-card.component.html',
  styleUrls: ['./position-card.component.scss']
})
export class PositionCardComponent implements OnInit {
  @Input('myData')
  public myData             :Array<any>;
  @Input('teams')
  public teams              :Array<any>;
  @Input('position')
  public position           :string;
  @Input('title')
  public title              :string;
  @Input('mobile')
  public mobile             :boolean;
  @Input('twitter')
  public twitter            :boolean;
  @Input('gameDate')
  public gameDate           :string;
  public stats: any = '1';
  @Output() open = new EventEmitter<object>();

  constructor() { }

  public changeStats() {
    if (this.stats === '1') {
      this.stats = '2';
    } else if (this.stats === '2') {
      this.stats = '3';
    } else if (this.stats === '3') {
      this.stats = '4';
    } else if (this.stats === '4') {
      this.stats = '5';
    } else if (this.stats === '5') {
      this.stats = '6';
    } else if (this.stats === '6') {
      this.stats = '7';
    } else if (this.stats === '7') {
      this.stats = '8';
    } else if (this.stats === '8') {
      this.stats = '9';
    } else if (this.stats === '9') {
      this.stats = '10';
    } else if (this.stats === '10') {
      this.stats = '1';
    }
  }

  public authorize(player, area) {
    console.log('trying to emit', player)
    this.open.emit({player: player, area: area}); 
  }

  ngOnInit(): void {
  }

}
