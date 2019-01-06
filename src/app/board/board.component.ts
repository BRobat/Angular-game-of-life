import { SizeService } from './../size.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  board: any[];

  columns: any[];
  rows: any[];

  a: number;

  gameActive = false;

  constructor(private sizeService: SizeService) {
    this.board = this.sizeService.getBoard();
    this.rows = Array(this.board[0].length).fill(0,0,this.board.length).map((x,i) => i);
    this.columns = Array(this.board.length).fill(0,0,this.board.length).map((x,i) => i);

     setInterval(() => {
       if(this.gameActive) {
         this.updateCells()
       }
     }, 1000)
   }

  updateCells() {
    console.log(this.board);
    
    let astral = this.board;
    
    for(let i = 0; i < this.rows.length; i++) {
      for(let j = 0; j < this.columns.length; j++) {
        this.a = this.noActvCells(i,j);

        if((this.board[i][j] == false) && (this.a == 3)) {
          astral[i][j] = true;
          console.log("breed",i,j);
        } else if((this.board[i][j] == true) && (this.a < 3)) {
          astral[i][j] = false;
          console.log("underpopulation",i,j);
        } else if((this.board[i][j] == true) && (this.a > 4)) {
          astral[i][j] = false;
          console.log("overpopulation",i,j);
        } else if((this.board[i][j] == true) && (this.a == (4 || 3))){
          astral[i][j] = true;
          console.log("stagnation",i,j);
        } else {
          astral[i][j] = false;
        }

      }
    }

    // this never happens
    if(this.board != astral) {
      console.log("update")
      this.board = astral;
    }
    
  }

  noActvCells(x,y) {
    let activeCells = 0;

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        let a = x + j - 1;
        let b = y + i - 1;
        if ((a >= 0) && (b >= 0) && (a < this.board.length) && (b < this.board.length)){
          if(this.board[a][b] == true) {
            activeCells++;
          }
        }
      }
    }
    if (activeCells == 0) {
      return 0;
    } else {
      return activeCells;
    }
  }

  checkCell(i,j) {
    this.board[i][j] = !this.board[i][j];
    console.log(this.noActvCells(i,j),i,j);
  }

  play(){
    this.gameActive = !this.gameActive;
  }

  
}
