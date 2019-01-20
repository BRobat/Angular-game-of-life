import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  table = [];

  width = 25;
  heigth = 25;

  active = false;
  alive = true;

  minBorn = 3;
  maxBorn = 3;

  minLive = 2;
  maxLive = 3;

  tempo = 500;

  randomness = false;

  constructor() { }

  getBoard() {
    this.table = []
    for(let i = 0; i < this.width; i++) {
      let row = [];
      for (let j = 0; j < this.heigth; j++) {
        row.push(false);
      }
      this.table.push(row);
    }
    return this.table;
  }
}
