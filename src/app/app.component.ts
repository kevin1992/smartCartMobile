import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';
import {GruposPage} from "../pages/grupos/grupos";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  rootPage:any = GruposPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private push: Push) {
    platform.ready().then(() => {

      if(platform.is('android')){
        this.push.register().then((t: PushToken) => {
          return this.push.saveToken(t);
        }).then((t: PushToken) => {
          console.log('Token saved:', t.token);
        });

        this.push.rx.notification()
          .subscribe((msg) => {
            alert(msg.title + ': ' + msg.text);
          });
      }



      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }
}

