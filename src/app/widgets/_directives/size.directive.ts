import { Directive, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appSize]',
  standalone: true
})
export class SizeDirective {
  @Input() appSize?: number;
  @HostBinding('style.width') get width() {
    return this.appSize + 'px';
  }
  @HostBinding('style.height') get height() {
    return this.appSize + 'px';
  }
  @HostBinding('style.fontSize') get fontSize() {
    return this.appSize + 'px';
  }

}
