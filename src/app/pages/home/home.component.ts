import { Component, HostBinding } from '@angular/core';
import { SharedModule } from '@core/shared/shared.module';
import { BooksComponent } from '@widgets/books/books.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SharedModule,
    BooksComponent,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  @HostBinding('class') class = 'h-100 d-flex flex-column justify-content-center';

}
