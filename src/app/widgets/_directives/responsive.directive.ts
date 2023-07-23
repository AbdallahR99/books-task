import { Directive, ElementRef, HostListener, inject } from '@angular/core';

@Directive({
  selector: '[appResponsive]',
  standalone: true,
  exportAs: 'responsive'
})
export class ResponsiveDirective {
  private elementRef = inject(ElementRef);
  private breakpoints = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
  };

  breakpoint = '';

  constructor() {
    this.updateBreakpoint(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateBreakpoint(this.elementRef.nativeElement.clientWidth);
    // this.updateBreakpoint((event.target as Window).innerWidth);
  }

  private updateBreakpoint(width: number) {
    let newBreakpoint = '';
    for (const [breakpoint, breakpointValue] of Object.entries(this.breakpoints)) {
      if (width >= breakpointValue) {
        newBreakpoint = breakpoint;
      }
    }
    this.breakpoint = newBreakpoint;
  }

  get isXS(): boolean {
    return this.breakpoint === 'xs';
  }

  get isSM(): boolean {
    return this.breakpoint === 'xs' || this.breakpoint === 'sm';
  }

  get isMD(): boolean {
    return this.breakpoint === 'xs' || this.breakpoint === 'sm' || this.breakpoint === 'md';
  }

  get isLG(): boolean {
    return this.breakpoint === 'lg';
  }

  get isXL(): boolean {
    return this.breakpoint === 'xl';
  }
}
