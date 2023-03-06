import { Directive, Input, ElementRef } from '@angular/core';

@Directive({
  selector: '[highligth]',
})
export class HighligthDirective {
  defaultColor = 'gray';
  @Input('highligth') bgColor = '';

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.backgroundColor = this.defaultColor;
  }

  ngOnChanges(): void {
    this.elementRef.nativeElement.style.backgroundColor =
      this.bgColor || this.defaultColor;
  }
}
