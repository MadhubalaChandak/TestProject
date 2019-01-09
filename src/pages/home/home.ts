import { Component } from '@angular/core';
import { NavController, AlertController, ToastController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { DashboardPage } from '../dashboard/dashboard';
import { Validators, FormBuilder, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public loginUser = {
    email: '',
    password: ''
  };
  private authlogin: FormGroup;

  constructor(
    private toastController: ToastController,
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    private fb: FormBuilder) {
    this.authlogin = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(12)])],
    });
  }
  register() {
    this.navCtrl.push(RegisterPage)
  }
  login() {
    if (this.loginUser.email == "user@gmail.com" && this.loginUser.password == "123456") {
      this.navCtrl.push(DashboardPage)
      this.showToast('You have successfully Logged In !');
    }
  }
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
