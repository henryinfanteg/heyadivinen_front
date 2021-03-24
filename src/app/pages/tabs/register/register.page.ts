import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Config } from 'src/app/configs/config';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';
import { ToastService } from 'src/app/core/services/_service-util/toast.service';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { FirestoreService } from 'src/app/services/firebase/firestore.service';
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
  user = this.storageService.getDataUser();

  constructor(
    private formBuilder: FormBuilder,
    private fireauth: FirebaseauthService,
    private firestore: FirestoreService,
    private router: Router,
    private toastService: ToastService,
    private storageService: StorageService) { }

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
        this.user.uid = resp.user.uid;
        this.user.country = this.form.controls.country.value;
        this.user.birthDate = this.form.controls.birthDate.value;
        this.user.username = this.form.controls.email.value;
        this.user.modifyDate = new Date();
        this.createUser(this.user);
      }).catch(err => {
        if (err) {
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
      this.storageService.setDataUser(this.user)
      this.router.navigate(['/home']);
    }).catch(err => {
      if (err) {
        this.toastService.presentToast(Parameters.createUserErrorService, Parameters.durationToastThree, Parameters.colorError);
        console.error('Ha ocurrido un error al momento de registrar la autenticación');
      }
    });
  }

}
