import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/configs/config';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form: FormGroup;
  isValidForm = false;

  constructor(private formBuilder: FormBuilder) { }

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
