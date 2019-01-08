import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  table = [];

  width = 30;
  heigth = 30;

  active = false;


  constructor() { }

  getBoard() {
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
