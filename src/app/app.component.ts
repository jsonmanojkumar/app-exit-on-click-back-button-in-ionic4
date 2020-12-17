import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'List',
      url: '/list',
      icon: 'list'
    }
  ];


  counter: number = 0;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public router: Router,
    public alertController: AlertController,
    public toastController: ToastController
  ) {
    this.initializeApp();


    this.platform.backButton.subscribe(async () => {
      if (this.router.isActive('/home', true) && this.router.url === '/home')
       this.Toast();
    });
    this.statusBar.overlaysWebView(true);
    this.statusBar.backgroundColorByHexString('#057b13');
  }



  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  async Toast() {
    const toast = await this.toastController.create({
      //header: 'Toast header',
      message: 'Do You Want To Close The App',
      position: 'bottom',
      duration: 2500,
      mode: 'ios',
      buttons: [
        {
          side: 'start',
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          side: 'end',
          //icon: 'star',
          text: 'Ok',
          handler: () => {
            console.log('Favorite clicked');
            navigator['app'].exitApp();
          }
        }

      ]
    });
    toast.present();
  }

}
