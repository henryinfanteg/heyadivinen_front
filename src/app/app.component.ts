import { Plugins, StatusBarStyle } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { Component } from '@angular/core';
import { FirebaseauthService } from "./services/firebase/firebaseauth.service";
import { Router } from "@angular/router";
import { StorageService } from "./core/services/_service-util/storage.service";
import { User } from "./shared/models/user";
import { FirestoreService } from "./services/firebase/firestore.service";
import { Parameters } from "./shared/parameters";
import { HandlerErrorService } from "./services/handler-error.service";


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
            this.getInfoUser(res.uid);



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
}
