import { Plugins, registerWebPlugin, StatusBarStyle } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { Component } from '@angular/core';
import { FirebaseauthService } from "./services/firebase/firebaseauth.service";
import { Router } from "@angular/router";
import { StorageService } from "./core/services/_service-util/storage.service";
import { User } from "./shared/models/user";
import { FirestoreService } from "./services/firebase/firestore.service";
import { Parameters } from "./shared/parameters";
import { HandlerErrorService } from "./services/handler-error.service";
import { FacebookLogin } from "@rdlabo/capacitor-facebook-login";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  user = new User();

  constructor(
    private platform: Platform,
    private fireauth: FirebaseauthService,
    private router: Router,
    private storageService: StorageService,
    private firestore: FirestoreService,
    private handlerError: HandlerErrorService
  ) {
    registerWebPlugin(FacebookLogin);
    this.initializeApp();
  }

  ngOnDestroy(): void {
    console.log('SE DESTRUYÓOOOOOOO');
    this.storageService.userEvent.unsubscribe();
    this.getGeneric$.unsubscribe();
  }

  getGeneric$;

  async initializeApp() {
    const { SplashScreen, StatusBar } = Plugins;
    this.platform.ready().then(async () => {
      SplashScreen.show();
      // StatusBar.setStyle({ style: StatusBarStyle.Light });
      this.fireauth.stateAuth().subscribe(res => {
        this.storageService.userEvent.subscribe((user: User) => {
          console.log('**** APP: el usuario cambió -> ', user);
        });
        console.log('**** res stateAuth: ', res);
        if (res !== null) {
          if (res.emailVerified) {
            console.log('**** APP: User autenticado y email verificado');
            const methoAuth = this.storageService.getUser().methodAuth;
            if (methoAuth === Parameters.facebookMethodAuth) {
              // this.getUserInfo();
              console.log('logueado con fbbb !!!!');
            } else if (methoAuth === Parameters.googleMethodAuth) {
              console.log('OBTENER USUARIO DE ACCOUNT OF GOOGLE');
            } else {
              this.getInfoUser(res.uid);
            }




            /*const user = new User();
            user.uid = res.uid;
            user.username = res.email;
            this.storageService.userEvent.emit(user);
            */
            // this.storageService.setDataUser(user);
            //this.router.navigate(['/home']);
          } else {
            console.log('**** EMAIL NO VERIFICADO');
          }
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
  }

  getInfoUser(uid) {
    this.getGeneric$ = this.firestore.getGeneric(Parameters.pathUser, uid).subscribe((resp: User) => {
      console.log('----> APP: getInfoUser : ', resp);
      this.storageService.setUser(resp);
      // this.loggerService.logResponse(resp, Parameters.methodNameGetInfoUser, resp.username, resp.uid, Parameters.logsMessageUserSignIn, Parameters.statusCodeSuccess, this.form.controls.email.value, Parameters.pathUser);
      this.storageService.userEvent.emit(resp);
      this.router.navigate(['home']);
    }, err => {
      this.handlerError.errorUser(err.code, Parameters.logsMessageGetCreated);
      // this.loggerService.loggerError(this.form.controls.email.value, Parameters.methodNameGetInfoUser, this.form.controls.email.value, uid, err, Parameters.pathUser);
    });
  }

  /*async getUserInfo() {
    const response = await fetch(`https://graph.facebook.com/${this.logininfo.userId}?fields=id,name,gender,link,picture&type=large&access_token=${this.logininfo.token}`);
    const myJson = await response.json();
    console.log('-----> myjson: ', myJson);
    this.user = myJson;
  }*/
}
