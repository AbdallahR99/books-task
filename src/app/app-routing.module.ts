import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Routes as AppRoutes } from '@core/constants/routes';
import { Constants } from '@core/constants/constants';

const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadComponent: () => import('@pages/home/home.component').then(m => m.HomeComponent),
    title: `${Constants.APP_NAME} | Home Page`
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
