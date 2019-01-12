import { SizeService } from './../size.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {

  displayMenu: true;

  constructor(private sizeService: SizeService) {

   }


  start() {
    console.log("elo")
    this.sizeService.active = !this.sizeService.active;
  }

  clear() {
    
  }

  randomize() {

  }

  setSimSpeed(event: any) {
    console.log(event.target.value);
    this.sizeService.tempo = event.target.value;
  }
}
