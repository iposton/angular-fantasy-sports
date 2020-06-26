import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  @Input('tweetsData')
  public tweetsData         :Array<any>;
  @Input('teams')
  public teams              :Array<any>;
  @Input('title')
  public title              :string;
  @Input('type')
  public type               :string;
  @Input('modalType')
  public modalType          :string;
  @Input('area')
  public area               :string;
  @Input('noPosts')
  public noPosts            :any;
  @Input('submitting')
  public submitting         :any;
  @Input('name')
  public name               :any;
  @Input('image')
  public image              :any;
  @Input('isOpen')
  public isOpen             :any;
  @Output() close = new EventEmitter();

  constructor() { }

  public closeModal() {
    this.isOpen = false;
    this.close.emit(); 
  }

  ngOnInit(): void {
  }

}
