import { SizeService } from './../size.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {

  board: any[];
  astral: any[];

  columns: any[];
  rows: any[];

  a: number;

  minBorn: number;
  maxBorn: number;

  minLive: number;
  maxLive: number;

  gameActive = true;

  constructor(private sizeService: SizeService) {
    this.board = this.sizeService.getBoard();

    this.rows = Array(this.board[0].length).fill(0,0,this.board.length).map((x,i) => i);
    this.columns = Array(this.board.length).fill(0,0,this.board.length).map((x,i) => i);

    //console.log(this.rows);
    //console.log(this.columns);

    this.randomize();

     setInterval(() => {
       if(this.gameActive) {
         this.updateCells()
       }
     }, 250);
   }

  updateCells() {
    let astral = []
    
    for(let i = 0; i < this.rows.length; i++) {
      for(let j = 0; j < this.columns.length; j++) {
        this.a = this.noActvCells(i,j);
        
        if((this.board[i][j] == false) && (this.a <=3) && (this.a >= 3)) {
          astral.push([i,j]);
          //console.log("breed",i,j,this.a);
        } 
        else if ((this.board[i][j] == true) && (this.a <= 4) && (this.a >= 3)){
          astral.push([i,j]);
          //console.log("stagnation",i,j,this.a);
        } 
        
        else if (this.board[i][j] == true){
          //console.log("died",i,j,this.a);
        }
      }
    }

    this.clearBoard()

    for(let i in astral) {
      this.board[astral[i][0]][astral[i][1]] = true;
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

  clearBoard() {

    for(let i = 0; i < this.rows.length; i++) {
      for(let j = 0; j < this.columns.length; j++) {
        this.board[i][j] = false;
      }
    }
  }

  randomize() {
    for(let i = 0; i < this.rows.length; i++) {
      for(let j = 0; j < this.columns.length; j++) {
        let w = Math.random();
        if (w > 0.5) {
          this.board[i][j] = true;
        }
      }
    }

  }

  checkCell(i,j) {
    this.board[i][j] = !this.board[i][j];
    console.log(this.noActvCells(i,j),i,j);
  }



}
