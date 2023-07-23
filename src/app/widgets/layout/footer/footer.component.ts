import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <div class="footer p-3 mt-4 text-center">
            <a class="text-black-50 text-decoration-none"
            href="https://github.com/AbdallahR99/covidtracker" target="_blank">
              <span>Source Code - Github</span>

            </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {

}
