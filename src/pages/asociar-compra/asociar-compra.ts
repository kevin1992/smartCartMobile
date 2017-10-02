import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {BarcodeScanner, BarcodeScannerOptions} from "@ionic-native/barcode-scanner";

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
  loadedData=false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private barcodeScanner: BarcodeScanner) {
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
      this.scanData = barcodeData;

      this.loadedData = true;
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
