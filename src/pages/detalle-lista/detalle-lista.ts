import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ActionSheetController} from 'ionic-angular';
import { AlertController } from 'ionic-angular';

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
  products=[
    {name:'Coca Cola 2.25lt'},
    {name:'Arroz 300gr'},
    {name:'Leche 1lt'},
    {name:'Milanesas 1kg'},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public actionSheetCtrl:ActionSheetController) {

    console.log(this.navParams.get('nombreLista'));
    this.nombreDeLista = this.navParams.get('nombreLista');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleListaPage');
  }

  //Boton mas para agregar productos
  //********************************
  //SE TIENE QUE REEMPLAZAR POR UN BUSCADOR
  //********************************
  doPromptNewProduct() {
    let prompt = this.alertCtrl.create({
      title: 'Nuevo Producto',
      message: "Ingrese el nombre del producto para agregarlo a la lista",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nombre del Producto'
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
            //this.navCtrl.push(DetalleListaPage,{nombre:data.name});
            this.products.push({name:data.name});
            console.log('Saved clicked');
          }
        }
      ]
    });
    prompt.present();
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
