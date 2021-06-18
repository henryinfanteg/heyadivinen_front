import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Config } from 'src/app/configs/config';
import { StorageService } from 'src/app/core/services/_service-util/storage.service';
import { ValidatorComponentUtil } from 'src/app/shared/util/validator-component-util';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  form: FormGroup;
  validatorComponent = ValidatorComponentUtil;
  user = this.storageService.getUser();

  constructor(
    private formBuilder: FormBuilder,
    private storageService: StorageService) { }

  ngOnInit() {
    this.iniatializeForm();
  }

  iniatializeForm() {
    this.form = this.formBuilder.group({
      birthDate: [this.user.birthDate, [Validators.minLength(2)]],
      email: [this.user.username, Validators.compose([Validators.required, Validators.pattern(Config.validEmail)])]
    });
  }

  save() {

  }


}
