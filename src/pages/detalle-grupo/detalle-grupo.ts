import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController, ToastController} from 'ionic-angular';
import {ListasPage} from "../listas/listas";
import {AlertController} from 'ionic-angular';
import {ClientesPage} from "../clientes/clientes";
import * as _ from 'lodash';
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";

/**
 * Generated class for the DetalleGrupoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-grupo',
  templateUrl: 'detalle-grupo.html',
})
export class DetalleGrupoPage {

  grupo: any;
  isNew: boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,public toastCtrl: ToastController, public alertCtrl: AlertController, public actionSheetCtrl: ActionSheetController,public apiService:ApiService) {

    console.log(this.navParams.get('grupo'));
    this.grupo = this.navParams.get('grupo');
    this.isNew = this.navParams.get('new');


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleGrupoPage');
  }

  showDelete(member) {
    let actionSheet = this.actionSheetCtrl.create({
      title: member.name,
      buttons: [
        {
          text: 'Eliminar del grupo',
          role: 'destructive',
          handler: () => {
            _.remove(this.grupo.members, (m) => {
              return m.id == member.id;
            });
            console.log('Destructive clicked');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  verListas() {
    this.navCtrl.push(ListasPage, {grupo: this.grupo});
  }

  save(){
    let saveObj = _.cloneDeep({name:this.grupo.nombre,members:this.grupo.members.map((m)=>{return m.id;})});

    this.apiService.post(API.URL+"groups",saveObj,{successMsg:'El grupo fue creado satisfactoriamente!'}).subscribe((data)=>{
      this.navCtrl.pop();
    });
  }

  update(){
    let saveObj = _.cloneDeep({id:this.grupo.id,name:this.grupo.name,members:this.grupo.members.map((m)=>{return m.id;})});

    this.apiService.put(API.URL+"groups/"+this.grupo.id,saveObj,{successMsg:'El grupo fue modificado satisfactoriamente!'}).subscribe((data)=>{
      this.navCtrl.pop();
    });
  }

  //verListaGrupo(){
  //  this.navCtrl.push(DetalleListaPage);
  //}

  searchNewMember() {
    this.navCtrl.push(ClientesPage, {grupo: this.grupo});
  }


  editNameGroup(){
    let prompt = this.alertCtrl.create({
      title: 'Renombrar Grupo',
      message: "Ingrese nuevo nombre del grupo",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nuevo nombre del Grupo'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Crear',
          handler: data => {
            //1) Update del nombre de grupo
            //2) Refrescar pantalla Detalle Grupo
            console.log('Saved clicked');
            this.grupo.nombre = data.name;
          }
        }
      ]
    });
    prompt.present();
  }
}
