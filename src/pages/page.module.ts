import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { TranslateModule } from '@ngx-translate/core';
import { StreamingMedia } from '@ionic-native/streaming-media';

import {
  LoginPageComponent,
  DashboardComponent,
  TabsComponent,
  RegisterPageComponent,
  WelcomePageComponent,
  GuideComponent,
  WorkoutComponent,
  ExtraQuestionsComponent,
  ExercisesComponent,
  WarmupComponent,
  MenuSideComponent
} from './index';

import { RegisterService } from './register/register.service';
import { LoginService } from './login/login.service';
import { DashbordService } from './dashboard/dashboard.service';
import { ExtraQuestionsService } from './extra.questions/extra.qustetions.service';
import { ConfigService } from './config.service';

const components = [
  DashboardComponent,
  LoginPageComponent,
  WelcomePageComponent,
  RegisterPageComponent,
  GuideComponent,
  ExtraQuestionsComponent,
  TabsComponent,
  WorkoutComponent,
  ExercisesComponent,
  WarmupComponent,
  MenuSideComponent
];

console.log('components ', components);

@NgModule({
  declarations: components,
  imports: [
    IonicModule,
    TranslateModule.forChild()
  ],
  entryComponents: components,
  providers: [
    LoginService,
    RegisterService,
    ExtraQuestionsService,
    ConfigService,
    DashbordService,
    StreamingMedia
  ]
})

export class PageModule {}
