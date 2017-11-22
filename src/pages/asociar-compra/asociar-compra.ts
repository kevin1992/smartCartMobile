import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";
import {ApiService} from "../../services/api.service";
import {API} from "../../app/app.component";

import {HomeTabsPage} from "../home-tabs/home-tabs";

/**
 * Generated class for the AsociarCompraPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-asociar-compra',
  templateUrl: 'asociar-compra.html',
})
export class AsociarCompraPage {

  options: BarcodeScannerOptions;
  encodeData: string;
  encodedData: {};
  scanData: {};
  grupo;
  loadedData=false;

  constructor(public navCtrl: NavController,public apiService:ApiService, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {

    console.log(this.navParams.get('grupo'));
    this.grupo = this.navParams.get('group');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AsociarCompraPage');
  }

  scan() {
    this.options = {
      prompt: "Scan your barcode "
    }
    this.barcodeScanner.scan(this.options).then((barcodeData) => {

      //text contiene lo que leyo, cancelled contiene si cancelo
      console.log(barcodeData);
      this.scanData = barcodeData.text;
      this.apiService.post(API.URL + "groups/"+this.grupo.id+"/purchases/"+this.scanData+"/associate",{}, {successMsg:'La compra fue asociada correctamente!'}).subscribe((_)=>{
        this.loadedData = true;
        this.navCtrl.setRoot(HomeTabsPage);
      });

    }, (err) => {
      console.log("Error occured : " + err);
    });
  }

  encodeText() {
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeData).then((encodedData) => {

      console.log(encodedData);
      this.encodedData = encodedData;

    }, (err) => {
      console.log("Error occured : " + err);
    });
  }

}
