import { Plugins } from "@capacitor/core";
import { Platform } from "@ionic/angular";
import { Component } from '@angular/core';
import { FirebaseauthService } from "./services/firebase/firebaseauth.service";
import { Router } from "@angular/router";
import { Parameters } from "./shared/parameters";
import { HandlerErrorService } from "./services/handler-error.service";


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})

export class AppComponent {

  constructor(
    private platform: Platform,
    private fireauth: FirebaseauthService,
    private router: Router,
    private handlerError: HandlerErrorService
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    const { SplashScreen } = Plugins;
    this.platform.ready().then(async () => {
      SplashScreen.show();
      this.fireauth.signInAnonymously().then(() => {
        this.router.navigate(['home']);
      }, err => {
        this.handlerError.errorCategories(err, Parameters.getAllCategoriesErrorService);
      });
    });
  }
}
