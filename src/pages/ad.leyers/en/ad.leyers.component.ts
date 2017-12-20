import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {NavController, NavParams, ViewController} from 'ionic-angular';

@Component({
  selector: 'en-ad-leyers',
  templateUrl: 'ad.leyers.html',
  styleUrls: ['/ad.leyers.scss']
})
export class EnADLeyersComponent implements OnInit {
  @Output() showPlus = new EventEmitter<boolean>();

  constructor(public navCtrl: NavController,
              private viewCtrl: ViewController,
              ) {}

  ngOnInit(){
  }

  plusmember() {
    this.showPlus.emit();
  }

  close() {
    this.viewCtrl.dismiss();
  }
}