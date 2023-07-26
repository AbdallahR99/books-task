import { Routes } from '@angular/router';
import { Routes as AppRoutes } from '@core/constants/routes';
import { Constants } from '@core/constants/constants';

export const routes: Routes = [
  {
    path: AppRoutes.HOME,
    loadComponent: () => import('@pages/home/home.component').then(m => m.HomeComponent),
    title: `${Constants.APP_NAME} | Home Page`
   },
];

