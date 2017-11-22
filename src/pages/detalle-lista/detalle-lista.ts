import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ProductosPage} from "../productos/productos";
import {ApiService} from "../../services/api.service";
import * as _ from 'lodash';
import {API} from "../../app/app.component";

/**
 * Generated class for the DetalleListaPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-lista',
  templateUrl: 'detalle-lista.html',
})
export class DetalleListaPage {

  lista;
  isNew;
  groupId;

  constructor(public navCtrl: NavController,public apiService:ApiService, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl:ActionSheetController) {

    this.lista = this.navParams.get('lista');
    this.isNew = this.navParams.get('new');
    this.groupId = this.navParams.get('groupId');

    console.log(this.navParams.get('lista'));
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad DetalleListaPage');
    }

    searchNewProduct() {
      this.navCtrl.push(ProductosPage,{lista:this.lista});
  }

  deleteItem(item){

    _.remove(this.lista.products,(p)=>{
      return p.id === item.id;
    })

  }

  editNameList(){
    let prompt = this.alertCtrl.create({
      title: 'Renombrar Lista',
      message: "Ingrese nuevo nombre de lista",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nuevo nombre de Lista'
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
          text: 'OK',
          handler: data => {
            //1) Update del nombre de lista
            //2) Refrescar pantalla Detalle Lista
            this.lista.name = data.name;
          }
        }
      ]
    });
    prompt.present();
  }

  save(){
    let saveObj = _.cloneDeep({name:this.lista.name,products:this.lista.products.map((m)=>{return {id:m.id,count:m.count}})});

    this.apiService.post(API.URL+"groups/"+this.groupId+"/lists",saveObj,{successMsg:'La lista fue creada satisfactoriamente!'}).subscribe((data)=>{
      this.navCtrl.pop();
    });
  }

  update(){
    let saveObj = _.cloneDeep({name:this.lista.name,products:this.lista.products.map((m)=>{return {id:m.id,count:m.count}})});

    this.apiService.put(API.URL+"groups/"+this.groupId+"/lists/"+this.lista.id,saveObj,{successMsg:'La lista fue modificada satisfactoriamente!'}).subscribe((data)=>{
      this.navCtrl.pop();
    });
  }

  getTotal(){
    return this.lista.products.map((p)=>{return p.price*p.count}).reduce((a, b) => a + b, 0);
  }
  /*  showDelete(member) {
      let actionSheet = this.actionSheetCtrl.create({
        title: member.name,
        buttons: [
          {
            text: 'Eliminar del grupo',
            role: 'destructive',
            handler: () => {
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
  */
}
