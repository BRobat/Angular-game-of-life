import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeService {

  board = [];

  width = 100;
  heigth = 100;

  active = false;


  constructor() { }

  getBoard() {
    for(let i = 0; i < this.width; i++) {
      let row = [];
      for (let j = 0; j < this.heigth; j++) {
        row.push(false);
      }
      this.board.push(row);
    }
    return this.board;
  }
}
