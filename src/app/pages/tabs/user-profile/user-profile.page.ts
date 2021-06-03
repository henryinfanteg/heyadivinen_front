import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/configs/config';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  form: FormGroup;
  validatorComponent = ValidatorComponentUtil;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      email: ['henryinfanteg@gmail.com', Validators.compose([Validators.required, Validators.pattern(Config.validEmail)])]
    });
  }

  save() {

  }


}
