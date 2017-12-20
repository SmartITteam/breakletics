import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import { NativeStorage } from '@ionic-native/native-storage';
import { Globalization } from '@ionic-native/globalization';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

import {
  WelcomePageComponent,
  TabsComponent,
  PlusmemberComponent,
} from '../pages/index';

import {AuthorizationService} from "../share/authorization.service";
import {ExtraQuestionsComponent} from "../pages/extra.questions/extra.questions";

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit{
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen,
              private translate: TranslateService,
              private nativeStorage: NativeStorage,
              private screenOrientation: ScreenOrientation,
              private globalization: Globalization,
              private authService: AuthorizationService) {
    this.platform = platform;
    this.initializeApp();
  }

  ngOnInit(){
    this.isAuth();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.screenOrientation.lock(this.screenOrientation.ORIENTATIONS.PORTRAIT);
      this.initTranslate();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }

  /**
   * Set language app
   */
  initTranslate() {
    this.translate.setDefaultLang('de');
    this.translate.use('de');
    /**
     * Get language device
     */
    this.globalization.getPreferredLanguage()
      .then(res => {
        const countryCode = res.value.split('-')[0] !== 'de' ? 'en': 'de';
        this.translate.use(countryCode);

      })
      .catch(e => console.log('language app.component err --> ', e));
  }

  isAuth() {
    this.nativeStorage.getItem('user')
      .then(res => {
        if(res){
          console.log('restore session', res);
          this.authService.session.start(res);
          this.rootPage = TabsComponent;
        } else {
          this.rootPage = WelcomePageComponent;
          // this.rootPage = WelcomePageComponent;
        }

      })
      .catch(err => {
        // this.rootPage = WelcomePageComponent;
        this.rootPage = WelcomePageComponent;
      })
  }
}
