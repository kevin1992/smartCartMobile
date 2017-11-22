import {Injectable} from '@angular/core';
import {Http, RequestOptions, Response, Headers} from '@angular/http';
import * as _ from 'lodash';
import {Observable} from "rxjs";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {LoadingController, ToastController} from "ionic-angular";
/**
 * Created by Kevin on 22/9/2017.
 */
@Injectable()
export class ApiService {

  constructor(private http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

  }


  private call(method, url, data?, options?) {

    if (!data) {
      data = {};
    }


    let loader = this.loadingCtrl.create({
      content: "Cargando..."
    });

    if (!options.noLoading) {


      loader.present();

    }


    const headers = new Headers();

    if (window.localStorage.getItem('smartCart-auth')) {
      headers.append('Authorization', window.localStorage.getItem('smartCart-auth'));
    }

    if (method === 'get' || method === 'delete') {
      data.headers = headers;
    }


    if (options.mock) {
      return Observable.of(options.mock).delay(2000).do(()=>{
        loader.dismiss().then((_) => {

          if (options.successMsg) {
            let toast = this.toastCtrl.create({
              message: options.successMsg,
              duration: 3000
            });
            toast.present();
          }

        });
      });
    }

    return this.http[method](url, data, {'headers': headers}).map((res: Response) => {

      if(options.successMsg){


        let toastObj = {
          message: options.successMsg,
          duration: 3000
        };

        let toast = this.toastCtrl.create(toastObj);
        toast.present();

      }

      loader.dismiss().then((_) => {
      });

      if (!res || !res['_body'] || res['_body'] === '') {
        return {};
      }

      return res.json()
    }).catch((err) => {


      loader.dismiss().then((_) => {
      });
      let errorBody:any = {};
      try{
       errorBody = JSON.parse(err._body);
      }catch(e){

      }


      if (err.status == 401) {
        let toast = this.toastCtrl.create({
          message: "Credenciales invalidas",
          duration: 3000
        });
        toast.present();
      } else {
        if (errorBody.error) {

          let toastObj = {
            message: "Ocurrio un error",
            duration: 3000
          };

          if(errorBody.message){
            toastObj.message = errorBody.message;
          }

          if(errorBody.data){
            let key = Object.keys(errorBody.data)[0]
            toastObj.message = errorBody.data[key];
          }

          let toast = this.toastCtrl.create(toastObj);
          toast.present();
        }
      }

      return Observable.throw('Internal server error');
    });

  }

  post(url, data?, options?) {
    return this.call('post', url, data, options);
  }

  get(url, data?, options?) {

    const requestParams = new RequestOptions();

    _.forEach(data, (value, key) => {
      requestParams[key] = value;
    });

    return this.call('get', url, requestParams, options);
  }

  put(url, data?, options?) {
    return this.call('put', url, data, options);
  }

  delete(url, data?, options?) {

    const requestParams = new RequestOptions();

    _.forEach(data, (value, key) => {
      requestParams[key] = value;
    });

    return this.call('delete', url, requestParams, options);
  }

}
