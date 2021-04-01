import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
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
    private toastService: ToastService) { }

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
      email: ['henryinfanteg@gmail.com', Validators.compose([Validators.required, Validators.pattern(Config.emailValido)])],
      password: ['123456', [Validators.minLength(2)]]
    });
  }

  signIn() {
    if(this.form.valid) {
      this.fireauth.login(this.form.controls.email.value, this.form.controls.password.value).then(res => {
        console.log('___> res sign in: ', res);
        this.getInfoUser(res.user.uid);
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

  getInfoUser(uid: string) {
    console.log('ENTRO AL GET INFO USER');
    this.getGeneric$ = this.firestore.getGeneric(Parameters.pathUser, uid).subscribe((resp: User) => {
      console.log('ENTRO AL GET GENERIC');
      this.storageService.userEvent.emit(resp);
      // this.storageService.setDataUser(resp);
      console.log('----> getInfoUser : ', resp);
      this.router.navigate(['home']);
    });

    this.getGeneric$.unsubscribe();
  }

}
