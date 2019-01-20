import { SizeService } from './../size.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-interface',
  templateUrl: './interface.component.html',
  styleUrls: ['./interface.component.scss']
})
export class InterfaceComponent {

  displayMenu = true;

  width: number;
  heigth: number;

  active: boolean;

  minBorn: number;
  maxBorn: number;

  minLive : number;
  maxLive: number;

  tempo: number;


  constructor(private sizeService: SizeService) {
      this.active = this.sizeService.active;
      this.tempo = this.sizeService.tempo;
      this.heigth = this.sizeService.heigth;
      this.width = this.sizeService.width;
      this.minLive = this.sizeService.minLive;
      this.maxLive = this.sizeService.maxLive;
      this.minBorn = this.sizeService.minBorn;
      this.maxBorn = this.sizeService.maxBorn;
   }


  start() {
    this.active = !this.active;
    this.sizeService.active = this.active;
  }

  randomize() {
    this.sizeService.randomness = true;
  }

  clear() {
    this.sizeService.alive = false;
  }

  setSimSpeed(event: any) {
    console.log(event.target.value);
    this.tempo = event.target.value;
    this.sizeService.tempo = event.target.value;
    
  }

  setMinCellsBorn(event: any) {
    this.minBorn = event.target.value;
    this.sizeService.minBorn = event.target.value;
  }

  setMaxCellsBorn(event: any) {
    this.maxBorn = event.target.value;
    this.sizeService.maxBorn = event.target.value;
  }

  setMinCellsAlive(event: any) {
    this.minLive = event.target.value;
    this.sizeService.minLive = event.target.value;
  }

  setMaxCellsAlive(event: any) {
    this.maxLive = event.target.value;
    this.sizeService.maxLive = event.target.value;
  }

  setWidth(event: any) {
    this.width = event.target.value;
    this.sizeService.width = event.target.value;
  }

  setHeigth(event: any) {
    this.heigth = event.target.value;
    this.sizeService.heigth = event.target.value;
  }
  
}
