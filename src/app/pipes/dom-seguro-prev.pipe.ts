import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'domSeguroPrev'
})
export class DomSeguroPrevPipe implements PipeTransform {

  constructor(private domSanitizer: DomSanitizer){}

  transform(value: string){
    return this.domSanitizer.bypassSecurityTrustResourceUrl(value);
  }

}
