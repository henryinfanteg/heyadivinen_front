import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'src/app/configs/config';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { LoggerService } from 'src/app/services/logger.service';
import { LoggerGeneral, LoggerRequest, LoggerResponse } from 'src/app/shared/models/logger';
import { User } from 'src/app/shared/models/user';
import { Parameters } from 'src/app/shared/parameters';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

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
    private loggerService: LoggerService) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      country: [null, [Validators.required]],
      birthDate: [null, [Validators.minLength(2)]],
      email: [null, Validators.compose([Validators.required, Validators.pattern(Config.emailValido)])],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
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
        this.loggerService.loggerCreate(this.user, Parameters.methodNameSignUp, this.user.username, this.user.uid, Parameters.logsMessageUserCreated, Parameters.statusCodeSuccess);
        this.createUser(this.user);
      }).catch(err => {
        if (err) {
          console.log('signUp err', err);
          console.log('signUp err t: ', err.t);
          this.loggerService.loggerError(this.form.controls.email.value, Parameters.methodNameSignUp, this.form.controls.email.value, null, err);
          // AQUI SE DEBE CREAR UN HANDLER ERROR
          if (err.code === 'auth/email-already-in-use') {
            this.toastService.presentToast(Parameters.emailExisteErrorService, Parameters.durationToastThree, Parameters.colorError);
          } else {
            this.toastService.presentToast(Parameters.registerErrorService, Parameters.durationToastThree, Parameters.colorError);
          }
        }
      });
    } else {
      this.validatorComponent.validateAllFormFields(this.form);
    }
  }

  createUser(user: User) {
    this.firestore.createGeneric(user, Parameters.pathUser, user.uid).then(res => {
      console.log('createUser res: ', res);
      this.loggerService.loggerCreate(user, Parameters.methodNameCreateUser, user.username, user.uid, Parameters.logsMessageUserCreated, Parameters.statusCodeCreate);
      this.storageService.userEvent.emit(user);
      this.router.navigate(['/home']);
    }).catch(err => {
      console.log('createUser err: ', err);
      if (err) {
        this.toastService.presentToast(Parameters.createUserErrorService, Parameters.durationToastThree, Parameters.colorError);
        this.loggerService.loggerError(user, Parameters.methodNameCreateUser, user.username, user.uid, err);
        console.error('Ha ocurrido un error al momento de registrar la autenticación');
      }
    });
  }

}
