import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, LoadingController} from 'ionic-angular';
import {HomeTabsPage} from "../home-tabs/home-tabs";
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: ApiService,public toastCtrl: ToastController, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad LoginPage');

    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      duration: 2000
    });

    loader.present();

    if(window.localStorage.getItem('smartCart-auth')){
      this.goMain();
    }



  }

  goMain() {
    this.navCtrl.setRoot(HomeTabsPage);
  }

  login(){
    this.api.post(API.URL + "login", {email: this.data.user, password: this.data.password},{}).subscribe((data)=>{

      window.localStorage.setItem('smartCart-auth',data.token_type+' '+data.access_token)
      this.goMain();

    });
  }

  register() {

    this.api.post(API.URL + "register", {name: this.data.name, last_name: this.data.last_name,"email": this.data.email,
      "password": this.data.password}, {
      successMsg:"El usuario fue creado correctamente"
    }).subscribe((data)=>{


        this.data = {};
        this.toggleOption();

    });


  }

  toggleOption() {
    if (this.option == 'login') {
      this.option = 'register'
    } else {
      this.option = 'login'
    }

    this.data = {};

  }

}
