import { SizeService } from './../size.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  board: any[];
  columns: any[];
  rows: any[];

  gameActive = false;

  constructor(private sizeService: SizeService) {
    this.board = this.sizeService.getBoard();
    this.rows = Array(this.board.length).fill(0,0,this.board.length).map((x,i) => i);
    this.columns = Array(this.board.length).fill(0,0,this.board.length).map((x,i) => i);

    
      setInterval(() => {
        if(this.gameActive) {
          this.updateCells()
        }
        }, 1000)
   
   }

  ngOnInit() {
    
  }

  updateCells() {
    console.log(this.board);
    for(let i = 0; i < this.board.length; i++) {
      for(let j = 0; j < this.board[i].length; j++) {
        if(this.board[i][j] == true && this.noActvCells(i,j) == 3) {
          this.board[i][j] = true;
        } else if(this.board[i][j] == true && this.noActvCells(i,j) < 2) {
          this.board[i][j] = false;
        } else if(this.board[i][j] == true && this.noActvCells(i,j) > 3) {
          this.board[i][j] = false;
        } else if(this.board[i][j] == true && this.noActvCells(i,j) == (3 || 2)){
          this.board[i][j] = true;
        }
      }
    }

  }

  noActvCells(x,y) {
    let activeCells = 0;

    for(let i = 0; i < 3; i++) {
      for(let j = 0; j < 3; j++) {
        let a = x + i - 1;
        let b = y + j - 1;
        if ((a > 0) && (b > 0) && (a < this.board.length) && (b < this.board.length)){
          if(this.board[a][b] == true) {
            activeCells++;
          }
        }
      }
    }
    return activeCells - 1;
  }

  checkCell(i,j) {
    this.board[i][j] = !this.board[i][j];
  }

  play(){
    this.gameActive = !this.gameActive;
  }
}
