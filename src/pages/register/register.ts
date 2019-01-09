import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public user = {
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    mobile_number: '',
    password: '',
    confirmPassword: ''
  };
  private authForm: FormGroup;

  constructor(
    private toastController: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private fb: FormBuilder) {
    this.authForm = this.fb.group({
      firstname: ['', [Validators.required]],
      middlename: [],
      lastname: ['', [Validators.required]],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
      mobile_number: ['', Validators.compose([Validators.maxLength(11), Validators.minLength(10), Validators.pattern('[0-9]*')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
      confirmPassword: ['', [Validators.required, this.equalto('password')]]
    });
  }
  equalto(field_name): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      let input = control.value;
      let isValid = control.root.value[field_name] == input
      if (!isValid)
        return { 'equalTo': { isValid } }
      else
        return null;
    };
  }

  register() {
    this.navCtrl.push(HomePage);
    this.showToast('You have successfully Registered Yourself !!');

  }
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

}
