import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {HomeTabsPage} from "../home-tabs/home-tabs";
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  data: any = {};
  option = 'login';
  private loginForm: FormGroup;
  private registerForm: FormGroup;


  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService, public toastCtrl: ToastController, public loadingCtrl: LoadingController, private formBuilder: FormBuilder) {

    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      name: ['', Validators.required],
      last_name: ['', Validators.required]
    });

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');

    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });

    loader.present();

    if (window.localStorage.getItem('smartCart-auth')) {
      this.goMain();
    }


  }

  goMain() {
    this.navCtrl.setRoot(HomeTabsPage);
  }

  login() {

    this.api.post(API.URL + "login", {
      email: this.loginForm.controls['email'].value,
      password: this.loginForm.controls['password'].value
    }, {}).subscribe((data) => {

      window.localStorage.setItem('smartCart-auth', data.token_type + ' ' + data.access_token)
      this.goMain();

    });
  }

  register() {

    this.api.post(API.URL + "register", {
      name: this.registerForm.get('name').value, last_name: this.registerForm.get('last_name').value, "email": this.registerForm.get('email').value,
      "password": this.registerForm.get('password').value
    }, {
      successMsg: "El usuario fue creado correctamente"
    }).subscribe((data) => {


      this.toggleOption();

    });


  }

  toggleOption() {
    if (this.option == 'login') {
      this.option = 'register'
    } else {
      this.option = 'login'
    }


    this.registerForm.reset();
    this.loginForm.reset();

  }

}
