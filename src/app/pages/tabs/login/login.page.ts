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

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit, OnDestroy {

  form: FormGroup;
  validatorComponent = ValidatorComponentUtil;

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
    ;
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
        this.getInfoUser(res.user.uid);
        this.loggerService.logResponse(res.user, Parameters.methodNameSignIn, res.user.uid, res.user.uid, Parameters.logsMessageUserSignIn, Parameters.statusCodeSuccess, this.form.controls.email.value, Parameters.pathAuth);
      }, err => {
        console.log('---> err sign in:', err);
        this.loggerService.loggerError(this.form.controls.email.value, Parameters.methodNameSignIn, this.form.controls.email.value, this.form.controls.email.value, err, Parameters.pathAuth);
        if (err) {
          this.handlerError.errorAuth(err.code, Parameters.logsMessageUserSignIn);
        }
      });
    } else {
      this.validatorComponent.validateAllFormFields(this.form);
    }

  }

  getInfoUser(uid) {
    this.getGeneric$ = this.firestore.getGeneric(Parameters.pathUser, uid).subscribe((resp: User) => {
      console.log('----> getInfoUser : ', resp);
      this.loggerService.logResponse(resp, Parameters.methodNameGetInfoUser, resp.username, resp.uid, Parameters.logsMessageUserSignIn, Parameters.statusCodeSuccess, this.form.controls.email.value, Parameters.pathUser);
      this.storageService.userEvent.emit(resp);
      this.router.navigate(['home']);
    }, err => {
      this.loggerService.loggerError(this.form.controls.email.value, Parameters.methodNameGetInfoUser, this.form.controls.email.value, uid, err, Parameters.pathUser);
    });

    this.getGeneric$.unsubscribe();
  }

}
