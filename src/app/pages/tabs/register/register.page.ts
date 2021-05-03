import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'src/app/configs/config';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { LoggerService } from 'src/app/services/logger.service';
import { LoggerGeneral, LoggerResponse } from 'src/app/shared/models/logger';
import { User } from 'src/app/shared/models/user';
import { Parameters } from 'src/app/shared/parameters';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';
import { MustMatch } from 'src/app/shared/util/must-match.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  isValidForm = false;
  validatorComponent = ValidatorComponentUtil;
  logger = new LoggerGeneral();
  loggerResponse = new LoggerResponse();
  user = new User();

  constructor(
    private formBuilder: FormBuilder,
    private fireauth: FirebaseauthService,
    private firestore: FirestoreService,
    private router: Router,
    private toastService: ToastService,
    private storageService: StorageService,
    private loggerService: LoggerService,
    private handlerError: HandlerErrorService) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      country: [null, [Validators.required]],
      birthDate: [null, [Validators.minLength(2)]],
      email: [null, Validators.compose([Validators.required, Validators.pattern(Config.validEmail)])],
      password: [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20), Validators.pattern(Config.validPassword)])],
      confirmPassword: [null, [Validators.required]],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    }
    );
  }

  signUp() {
    if (this.form.valid) {
      this.fireauth.register(this.form.controls.email.value, this.form.controls.password.value).then(resp => {
        console.log('signUp resp', resp);
        this.user.uid = resp.user.uid;
        this.user.country = this.form.controls.country.value;
        this.user.birthDate = this.form.controls.birthDate.value;
        this.user.username = this.form.controls.email.value;
        this.user.modifyDate = new Date();
        this.loggerService.logResponse(this.user, Parameters.methodNameSignUp, this.user.username, this.user.uid, Parameters.logsMessageUserCreated, Parameters.statusCodeSuccess, this.user, Parameters.pathAuth);
        this.createUser(this.user);
      }).catch(err => {
        console.error('---> err signUp: ', err);
        this.loggerService.loggerError(this.form.controls.email.value, Parameters.methodNameSignUp, this.form.controls.email.value, null, err, Parameters.pathAuth);
        if (err) {
          this.handlerError.errorAuth(err.code, Parameters.logsMessageUserCreated);
        }
      });
    } else {
      this.validatorComponent.validateAllFormFields(this.form);
    }
  }

  createUser(user: User) {
    this.firestore.createGeneric(user, Parameters.pathUser, user.uid).then(res => {
      console.log('createUser res: ', res);
      this.loggerService.logResponse(user, Parameters.methodNameCreateUser, user.username, user.uid, Parameters.logsMessageUserCreated, Parameters.statusCodeCreate, user, Parameters.pathUser);
      this.router.navigate(['/verify-mail']);
      this.storageService.userEvent.emit(user);
    }).catch(err => {
      console.log('createUser err: ', err);
      this.loggerService.loggerError(user, Parameters.methodNameCreateUser, user.username, user.uid, err, Parameters.pathUser);
      if (err) {
        this.handlerError.errorUser(err.code);
      }
    });
  }
}
