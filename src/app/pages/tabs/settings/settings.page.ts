import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
import { HandlerErrorService } from 'src/app/services/handler-error.service';
import { LoggerService } from 'src/app/services/logger.service';
import { User } from 'src/app/shared/models/user';
import { Parameters } from 'src/app/shared/parameters';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  user = this.storageService.getUser();
  form: FormGroup;
  validatorComponent = ValidatorComponentUtil;
  years = [];

  constructor(public router: Router,
    private fireauth: FirebaseauthService,
    private firestore: FirestoreService,
    private toastService: ToastService,
    private storageService: StorageService,
    private loggerService: LoggerService,
    private handlerError: HandlerErrorService,
    private formBuilder: FormBuilder,
    private activedRoute: ActivatedRoute) {
      this.fillYears();
    this.storageService.userEvent.subscribe((usr: User) => {
      this.user = usr;
      console.log('/// SET: user cambió: ', usr);
    });
  }

  ngOnInit() {
    // this.iniatializeForm();
  }

  ngOnDestroy(): void {
    this.storageService.userEvent.unsubscribe();
  }

  fillYears() {
    for(let i = 1920; i <= 2021; i++) {
      this.years.push(i);
      if(i === 2021) {
        console.log('llegó al 2021');
      }
    }
    this.iniatializeForm();
  }

  iniatializeForm() {
    console.log('$$$ usr in settings: ', this.user.parameters);
    this.form = this.formBuilder.group({
      country: [this.user.parameters.countryPreference, Validators.required],
      yearS: [this.user.parameters.initYear + '', Validators.required],
      yearE: [this.user.parameters.endYear + '', Validators.required],
    });
    console.log('---> form controls: ', this.form.controls);
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

  updateUserParams() {
    if (this.form.valid) {
      this.user.parameters.countryPreference = this.form.controls.country.value;
      this.user.parameters.initYear = this.form.controls.yearS.value;
      this.user.parameters.endYear = this.form.controls.yearE.value;
      this.firestore.updateGeneric(this.user, Parameters.pathUser, this.user.uid).then((resp) => {
        // this.loggerService.logResponse(JSON.stringify(resp) , Parameters.methodNameUpdateUserParams, this.user.username, this.user.uid, Parameters.logsMessageUpdateUserParamsSuccess, Parameters.statusCodeSuccess, null, Parameters.pathUser);
        this.storageService.userEvent.emit(this.user);
        this.handlerError.msgGeneric(Parameters.msgUpdateParamsUserSuccess, Parameters.colorSuccess);
      }).catch(err => {
        // this.loggerService.loggerError(null, Parameters.methodNameUpdateUserParams, this.user.username, this.user.uid, Parameters.genericErrorService, Parameters.pathUser);
        if (err) {
          this.handlerError.errorUser(err.code, Parameters.updateUserErrorService);
        }
      });
    } else {
      this.validatorComponent.validateAllFormFields(this.form);
    }

  }

  prueba() {
    console.log('----> router:: ', this.activedRoute);
  }

}
