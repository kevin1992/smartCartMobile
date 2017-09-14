import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ListasGrupoPage } from './listas-grupo';

@NgModule({
  declarations: [
    ListasGrupoPage,
  ],
  imports: [
    IonicPageModule.forChild(ListasGrupoPage),
  ],
})
export class ListasGrupoPageModule {}
