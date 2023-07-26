import { provideRouter } from '@angular/router';
import { routes as appRoutes } from './app-routing.module';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '@core/shared/shared.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      appRoutes,
    ),
    importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(SharedModule),
 ],
};
