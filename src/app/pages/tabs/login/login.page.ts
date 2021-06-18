import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'src/app/configs/config';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { LoggerService } from 'src/app/services/logger.service';
import { User } from 'src/app/shared/models/user';
import { Parameters } from 'src/app/shared/parameters';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  validatorComponent = ValidatorComponentUtil;
  msgResend = false;
  userCredential;
  getGeneric$;

  constructor(
    private formBuilder: FormBuilder,
    private fireauth: FirebaseauthService,
    private firestore: FirestoreService,
    private router: Router,
    private storageService: StorageService,
    private toastService: ToastService,
    private loggerService: LoggerService,
    private handlerError: HandlerErrorService) { }

  ngOnDestroy(): void {
    this.storageService.userEvent.unsubscribe();
    this.getGeneric$.unsubscribe();
  }

  ngOnInit() {
    this.iniatializeForm();
    console.log('USER LOGIN:::: ', this.storageService.getDataUser());
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      email: ['henryinfanteg@gmail.com', Validators.compose([Validators.required, Validators.pattern(Config.validEmail)])],
      password: ['123456', [Validators.minLength(2)]]
    });
  }

  signIn() {
    if (this.form.valid) {
      this.fireauth.login(this.form.controls.email.value, this.form.controls.password.value).then(res => {
        console.log('___> res sign in: ', res);
        if(res.user.emailVerified) {
          let usr = new User();
          usr.uid = res.user.uid;
          this.storageService.userEvent.emit(usr);
        } else {
          console.log('**** EMAIL NO VERIFICADO LOGIN');
          this.handlerError.errorAuth(Parameters.emailNoVerified, Parameters.emailNoVerifiedMsg);
          this.msgResend = true;
          this.userCredential = res;
        }
        
        // this.loggerService.logResponse(res.user, Parameters.methodNameSignIn, res.user.uid, res.user.uid, Parameters.logsMessageUserSignIn, Parameters.statusCodeSuccess, this.form.controls.email.value, Parameters.pathAuth);
      }, err => {
        console.log('---> err sign in:', err);
        // this.loggerService.loggerError(this.form.controls.email.value, Parameters.methodNameSignIn, this.form.controls.email.value, this.form.controls.email.value, err, Parameters.pathAuth);
        if (err) {
          this.handlerError.errorAuth(err.code, Parameters.logsMessageUserSignIn);
        }
      });
    } else {
      this.validatorComponent.validateAllFormFields(this.form);
    }

  }


  reSendMail() {
    this.fireauth.sendEmailVerification(this.userCredential).then(res => {
      this.toastService.presentToast(Parameters.msgMailSentSuccess, Parameters.durationToastThree, Parameters. colorSuccess);
    }, err => {
      this.toastService.presentToast(Parameters.sendMessageErrorService, Parameters.durationToastThree, Parameters.colorError);
    });
  }

  async signInFb(): Promise<void> {
    const FACEBOOK_PERMISSIONS = ['public_profile', 'email'];

    const result = await Plugins.FacebookLogin.login({ permissions: FACEBOOK_PERMISSIONS });
    if (result && result.accessToken) {
      console.log('logueado por fbbbbbb');
      let usr = new User();
      usr.token = result.accessToken.token;
      usr.uid = result.accessToken.userId;
      usr.methodAuth = Parameters.facebookMethodAuth;
      /*let navigationExtras: NavigationExtras = {
        queryParams: {
          userinfo: JSON.stringify(usr)
        }
      };*/
      this.storageService.userEvent.emit(usr);
      // this.router.navigate(["/home"], navigationExtras);
    }
  }

}
