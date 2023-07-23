import { Directive, ElementRef, HostListener, Input, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appHoverStyle], [appHoverClass]',
  standalone: true,
  exportAs: 'appHover'
})
export class HoverStyleDirective {
  @Input('appHoverClass') hoverClass?: string; // CSS class to apply on hover
  @Input('appHoverStyle') hoverStyles?: { [key: string]: string }; // Inline styles to apply on hover
  elementRef = inject(ElementRef);
  renderer = inject(Renderer2);
  isHovered = false;

  // Apply the hover styles when the mouse enters the element
  @HostListener('mouseenter')
  onMouseEnter() {
    this.isHovered = true;
    if (this.hoverClass)
    this.applyClass(this.hoverClass);
    if (this.hoverStyles)
    this.applyStyles(this.hoverStyles);
  }

  // Remove the hover styles when the mouse leaves the element
  @HostListener('mouseleave')
  onMouseLeave() {
    this.isHovered = false;
    this.applyClass(null);
    this.applyStyles(null);
  }

  private applyClass(className: string | null) {
    if (className) {
      this.renderer.addClass(this.elementRef.nativeElement, className);
    } else {
      if (this.hoverClass)
      this.renderer.removeClass(this.elementRef.nativeElement, this.hoverClass);
    }
  }

  private applyStyles(styles: { [key: string]: string } | null) {
    if (styles) {
      for (const property in styles) {
        if (Object.prototype.hasOwnProperty.call(styles, property)) {
          this.renderer.setStyle(this.elementRef.nativeElement, property, styles[property]);
        }
      }
    } else {
      for (const property in this.hoverStyles) {
        if (Object.prototype.hasOwnProperty.call(this.hoverStyles, property)) {
          this.renderer.removeStyle(this.elementRef.nativeElement, property);
        }
      }
    }
  }
}
