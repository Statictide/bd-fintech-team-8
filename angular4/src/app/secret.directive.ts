import { Directive, ElementRef, HostListener } from '@angular/core';
import { Service } from '../services/service'

@Directive({
  selector: '[secret]'
})
export class SecretDirective {
  private secret;
  private inputsequence;

  @HostListener('document:keydown', ['$event'])
  HandleKeyboardInput(event :KeyboardEvent) {
    if (event.keyCode) {
      this.inputsequence.push(event.keyCode);

      if (this.inputsequence.length > this.secret.length) {
        this.inputsequence.shift();
      }

      if (this.isFound()) {
        this.service.secret().then(
          data => {
            var response = data['response'];
            alert('Cæsar siger: ' + response);
          }
        )
      }
    }
  }

  private isFound(): boolean {
    if(this.secret.length != this.inputsequence.length){
      return false;
    }
    return this.secret.every((element, index) => element === this.inputsequence[index]);
  }

  constructor(private service: Service){
    this.secret = [66,65,78,75,68,65,84,65];
    this.inputsequence = [];

  }
}
