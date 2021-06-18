import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'src/app/configs/config';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { LoggerService } from 'src/app/services/logger.service';
import { Parameters } from 'src/app/shared/parameters';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form: FormGroup;
  validatorComponent = ValidatorComponentUtil;

  constructor(
    private formBuilder: FormBuilder,
    private fireauth: FirebaseauthService,
    private toastService: ToastService,
    private router: Router,
    private loggerService: LoggerService) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(Config.validEmail)])],
    }
    );
  }

  recoverPass() {
    const user = this.form.controls.email.value;
    this.fireauth.recoverPass(user).then(res => {
      // this.loggerService.logResponse(user, Parameters.methodNameRecoverPass, user, user, Parameters.logsMessageEmailRecoverSent, Parameters.statusCodeSuccess, user, Parameters.pathAuth);
      this.router.navigateByUrl('/login');
      this.toastService.presentToast(Parameters.msgMailRecoverSentSuccess, Parameters.durationToastThree, Parameters.colorSuccess);
    },
      err => {
        // this.loggerService.loggerError(user, Parameters.methodNameRecoverPass, this.form.controls.email.value, null, err, Parameters.pathAuth);
        this.toastService.presentToast(Parameters.sendMessageErrorService, Parameters.durationToastThree, Parameters.colorError);
      });
  }

}
