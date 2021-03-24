import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'src/app/configs/config';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { Parameters } from 'src/app/shared/parameters';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  validatorComponent = ValidatorComponentUtil;

  constructor(
    private formBuilder: FormBuilder, 
    private fireauth: FirebaseauthService,
    private router: Router,
    private toastService: ToastService) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.compose([Validators.required, Validators.pattern(Config.emailValido)])],
      password: [null, [Validators.minLength(2)]]
    });
  }

  signIn() {
    if(this.form.valid) {
      this.fireauth.login(this.form.controls.email.value, this.form.controls.password.value).then(res => {
        console.log('___> res sign in: ', res);
        this.router.navigate(['home']);
      }).catch(err => {
        if(err) {
          if(err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
            this.toastService.presentToast(Parameters.passOrUserIncorrectErrorService, Parameters.durationToastThree, Parameters.colorError);
          } else {
            
          }
          console.log('---> err sign in:', err);
        }
      });
    } else {
      this.validatorComponent.validateAllFormFields(this.form);
    }
    
  }

}
