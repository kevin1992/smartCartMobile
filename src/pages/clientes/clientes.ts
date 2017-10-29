import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {DetalleGrupoPage} from "../detalle-grupo/detalle-grupo";
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";
import * as _ from 'lodash'

/**
 * Generated class for the ClientesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {

  newMembers = [];
  searchName = '';
  grupo;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService: ApiService,public toastCtrl: ToastController
  ) {
    this.initializeItems();
    this.grupo = navParams.get('grupo');
  }

  initializeItems() {
    this.newMembers = [];
    this.apiService.get(API.URL + "search/clients?name=" + this.searchName + "&last_name=" + this.searchName, {}, {noLoading: true}).subscribe((data) => {
      this.newMembers = data;
    })
  }

  getItems(member: any) {
    // Reset items back to all of the items
    this.initializeItems();

    // set val to the value of the searchbar
    var val = member.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.newMembers = this.newMembers.filter((newMember) => {
        return (newMember.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
  }

  newMemberSelected(member) {
    // hacer un INSERT a la lista de miembros actual del grupo
    let index = _.findIndex(this.grupo.members, (m) => {
      return m.id == member.id;
    });
    if (index != -1) {
      let toast = {
        message: 'Ese miembro ya fue agregado anteriormente!',
        duration: 3000
      };
       let toastObj = this.toastCtrl.create(toast);
       toastObj.present();
    }
    else {
      this.grupo.members.push(member);
      this.navCtrl.pop();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientesPage');
  }

}
