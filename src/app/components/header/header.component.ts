import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { LoggerService } from 'src/app/services/logger.service';
import { Parameters } from 'src/app/shared/parameters';
import { StringUtil } from 'src/app/shared/util/string-util';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  namePage = 'Bienvenido';
  event$;
  user;

  constructor(
    private location: Location,
    public router: Router,
    private fireauth: FirebaseauthService,
    private storageService: StorageService,
    private loggerService: LoggerService,
    private handlerError: HandlerErrorService) {
      this.event$ = this.location.onUrlChange((val) => {
        this.namePage = StringUtil.translateWord(val.replace('/', ''));
      })
      this.storageService.userEvent.subscribe(resp => {
        this.user = resp;
      });
    }

  ngOnInit() {}

  goToProfile(){
    this.router.navigate(['/user-profile']);
  }

  logOut() {
    const resp = this.fireauth.logout().then(res => {
      // this.loggerService.logResponse(JSON.stringify(resp) , Parameters.methodNameLogOut, this.user.username, this.user.uid, Parameters.logsMessageLogOutSuccess, Parameters.statusCodeSuccess, null, Parameters.pathAuth);
      this.storageService.userEvent.emit(null);
      this.router.navigate(['/login']);
    }, err => {
      //this.loggerService.loggerError(null, Parameters.methodNameLogOut, this.user.username, this.user.uid, Parameters.logOutErrorService, Parameters.pathAuth);
      this.handlerError.errorAuth(null, Parameters.logOutErrorService);
    });
  }

}
