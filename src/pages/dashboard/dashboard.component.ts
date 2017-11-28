import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController, ModalController, LoadingController, NavParams, Platform } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';

import { GuideComponent } from '../guide/guide.component';
import { WelcomePageComponent } from '../welcome/welcome';
import { DashbordService } from './dashboard.service';
import { WrapperVideoPlayerComponent } from '../wrapper.video.player/wrapper.video.player.component';
import { VideoWeekInterface } from '../interfaces/VideoWeekInterface';
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
  styleUrls: ['/dashboard.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  private loading: any;
  public user: object;
  public video: VideoWeekInterface;
  public heightDevice: number;
  public weightDevice: number;
  public linkVideo: string;
  private videoWeekObservable: Subscription;

  constructor(public navCtrl: NavController,
              private modalCtrl: ModalController,
              private nativeStorage: NativeStorage,
              private loadingCtrl: LoadingController,
              private navParams: NavParams,
              private service: DashbordService,
              private platform: Platform) {

    this.loading = this.loadingCtrl.create({});
  }

  ngOnInit(){
    this.weightDevice = this.platform.width();
    this.heightDevice = this.platform.height()* 29.5 / 100;
    this.getUser();
    this.handlerLoadVideo();
  }

  /**
   * get user from storage
   */
  getUser() {
    this.user = this.nativeStorage.getItem('user')
      .then(res => {
        this.user = res;
        this.presentGuideModal(this.user)
      })
      .catch(err => {
        this.user = this.navParams.get('user');
        this.presentGuideModal(this.user)
      });
  }

  handlerLoadVideo() {
    this.videoWeekObservable = this.service.videoWeek().subscribe(res => {
      this.video = res;
      this.linkVideo = this.video.video.split('https://vimeo.com/')[1];
    }, err => {
      this.linkVideo = '190821442';
      console.log('err video::: ', err);
    });
  }

  logout() {
    this.loading.present();

    this.nativeStorage.remove('user')
      .then(res => {
        this.navCtrl.setRoot(WelcomePageComponent);
        this.loading.dismiss();
      })
      .catch(err => {
        this.loading.dismiss();
      })
  }

  playVideoModal() {
    if(this.linkVideo) {
      this.modalCtrl.create(WrapperVideoPlayerComponent, {video: this.linkVideo}).present();
    }
  }

  presentGuideModal(user) {
    this.nativeStorage.getItem('guide')
      .then(res => {
        if(!res || res !== this.user['id']){
          this.modalCtrl.create(GuideComponent, {user: user}).present();
        }
      })
      .catch(err => {
        console.log('err ', err);
        this.modalCtrl.create(GuideComponent,{user: user}).present();
      })
  }

  getGuide() {
    this.modalCtrl.create(GuideComponent).present();
  }

  ngOnDestroy() {
    if(this.videoWeekObservable) {
      this.videoWeekObservable.unsubscribe();
    }
  }
}
