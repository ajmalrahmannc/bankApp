import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  constructor(private el:ElementRef) {
    console.log(el);
    el.nativeElement.style.backgroundColor="#FFC312"
    
   }

}
