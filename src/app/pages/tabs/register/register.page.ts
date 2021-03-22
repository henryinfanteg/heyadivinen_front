import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/configs/config';
import { FirebaseauthService } from 'src/app/services/firebase/firebaseauth.service';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  form: FormGroup;
  isValidForm = false;

  constructor(private formBuilder: FormBuilder, private fireauth: FirebaseauthService) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      country: [null, [Validators.required]],
      bornDate: [null, [Validators.minLength(2)]],
      email: [null, Validators.compose([Validators.required, Validators.pattern(Config.emailValido)])],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
    });
  }

  async signUp() {
    // falta agregar al usuario en la tabla user de firestore con su uid
    // const resp = await this.fireauth.register('henfante90@hotmail.com', '123456789');
    console.log('PROBANDO SIGN UP !!!!!!!');
  }

  isFieldInvalid(fieldControl: AbstractControl): boolean {
    return ValidatorComponentUtil.isFieldInvalid(fieldControl);
  }

  getFieldError(fieldControl: AbstractControl, fieldType?: string): string {
    return ValidatorComponentUtil.getFieldError(fieldControl, fieldType);
  }

  isRequired(fieldControl: AbstractControl): boolean {
    return ValidatorComponentUtil.isRequired(fieldControl);
  }

}
