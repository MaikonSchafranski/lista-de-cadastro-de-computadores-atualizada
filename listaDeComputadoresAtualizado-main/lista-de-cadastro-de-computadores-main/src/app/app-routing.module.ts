import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CadastroPage } from './view/cadastro/cadastro.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./view/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'cadastro',
    loadChildren: () =>
      import('./view/cadastro/cadastro.module').then(
        (m) => m.CadastroPageModule
      ),
  },
  {
    path: 'cadastrado/:indice',
    loadChildren: () =>
      import('./view/cadastrado/cadastrado.module').then(
        (m) => m.CadastradoPageModule
      ),
  },
  {
    path: 'excluir',
    loadChildren: () =>
      import('./view/excluir/excluir.module').then((m) => m.ExcluirPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
