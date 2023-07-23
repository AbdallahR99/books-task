import { Component, HostBinding, inject } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @HostBinding('class') class = 'd-flex flex-column h-100';
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
