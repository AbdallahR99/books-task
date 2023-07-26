import { Component, HostBinding, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { LayoutModule } from '@widgets/layout/layout.module';
import { SharedModule } from '@core/shared/shared.module';
import { RouterModule } from '@angular/router';
@Component({
  imports: [
    RouterModule,
    LayoutModule,
    SharedModule,
  ],
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      :host {
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: center;
      }
    `
  ],
  standalone: true,
})
export class AppComponent {
  matIconRegistry = inject(MatIconRegistry)
  domSanitizer = inject(DomSanitizer)
  constructor() {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/icons/logo.svg'
      )
    );
  }
}
