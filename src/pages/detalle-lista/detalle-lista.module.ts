import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleListaPage } from './detalle-lista';

@NgModule({
  declarations: [
    DetalleListaPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleListaPage),
  ],
})
export class DetalleListaPageModule {}
