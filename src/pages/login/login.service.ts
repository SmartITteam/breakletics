import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import {ConfigService} from "../config.service";

@Injectable()
export class LoginService {

  constructor(public http: HttpClient) {}

  login(data): Observable<any> {
    console.log('*************** 2 ',ConfigService.CONFIG.url);

    return this.http.post(`${ConfigService.CONFIG.url}jwt-auth/v1/token`, data)
      .catch(err =>  Observable.throw(err.json() || 'Server error'))
  }
}
