import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import {ProductosPage} from "../productos/productos";

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

  nombreDeLista:string;
  producto: string = "1";
  products=[
    {name:'Coca Cola 2.25lt',precio:38},
    {name:'Arroz 300gr',precio:15},
    {name:'Leche 1lt', precio:14},
    {name:'Milanesas 1kg',precio:70},
    {name:'Pack Oreos',precio:53},
    {name:'Esponja',precio:10},
    {name:'Detergente 250ml',precio:42},
    {name:'Salsa 300ml',precio:18},
    {name:'Fideos Tallarin 300g',precio:16},
    {name:'Pan Lactal 500g',precio:65},
    {name:'Cafe 500g',precio:58},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl:ActionSheetController) {

    console.log(this.navParams.get('nombreLista'));
    this.nombreDeLista = this.navParams.get('nombreLista');
  }

    ionViewDidLoad() {
      console.log('ionViewDidLoad DetalleListaPage');
    }

    searchNewProduct() {
      this.navCtrl.push(ProductosPage);
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
          text: 'Crear',
          handler: data => {
            //1) Update del nombre de lista
            //2) Refrescar pantalla Detalle Lista
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
  }

  getTotal(){
    return this.products.map((p)=>{return p.precio}).reduce((a, b) => a + b, 0);
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
