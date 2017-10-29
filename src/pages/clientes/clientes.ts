import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DetalleGrupoPage} from "../detalle-grupo/detalle-grupo";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

  initializeItems(){
    this.newMembers=[
      {name:'Alejandro'},
      {name:'Ariel'},
      {name:'Lily'},
      {name:'Luisa'},
      {name:'Martin'},
      {name:'Sergio'},
      {name:'Valeria'},
      {name:'Walter'},
    ]
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

  newMemberSelected(){
    // hacer un INSERT a la lista de miembros actual del grupo
    this.navCtrl.pop(DetalleGrupoPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientesPage');
  }

}
