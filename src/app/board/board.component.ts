import { SizeService } from './../size.service';
import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnDestroy {

  board: any[];
  astral: any[];

  columns: any[];
  rows: any[];

  a: number;

  minBorn: number;
  maxBorn: number;

  minLive: number;
  maxLive: number;

  tempo: number;

  gameActive: boolean;

  constructor(private sizeService: SizeService) {
    console.log("dwa");
    this.board = this.sizeService.getBoard();

    this.rows = Array(this.board[0].length).fill(0,0,this.board.length).map((x,i) => i);
    this.columns = Array(this.board.length).fill(0,0,this.board.length).map((x,i) => i);

    this.minBorn = this.sizeService.minBorn;
    this.maxBorn = this.sizeService.maxBorn;

    this.minLive = this.sizeService.minLive + 1;
    this.maxLive = this.sizeService.maxLive + 1;

    this.tempo = this.sizeService.tempo;

    this.gameActive = this.sizeService.active;
    //console.log(this.rows);
    //console.log(this.columns);

     setInterval(() => {
      this.gameActive = this.sizeService.active;
      this.minLive = this.sizeService.minLive + 1;
      this.maxLive = this.sizeService.maxLive + 1;
      this.minBorn = this.sizeService.minBorn;
      this.maxBorn = this.sizeService.maxBorn;
       if(this.gameActive) {
         this.updateCells()
       };
       if(this.sizeService.randomness) {
         this.randomize(0.5);
         this.sizeService.randomness = false;
       }
     }, this.tempo);
   }

   ngOnDestroy(): void {
     //Called once, before the instance is destroyed.
     //Add 'implements OnDestroy' to the class.
     
   }

  updateCells() {
    let astral = []
    
    for(let i = 0; i < this.rows.length; i++) {
      for(let j = 0; j < this.columns.length; j++) {
        this.a = this.noActvCells(i,j);
        
        if((this.board[i][j] == false) && (this.a >= this.minBorn) && (this.a <= this.maxBorn)) {
          astral.push([i,j]);
          //console.log("breed",i,j,this.a);
        } 
        else if ((this.board[i][j] == true) && (this.a <= this.maxLive) && (this.a >= this.minLive)){
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

  randomize(rand: number) {
    for(let i = 0; i < this.rows.length; i++) {
      for(let j = 0; j < this.columns.length; j++) {
        let w = Math.random();
        if (w < rand) {
          this.board[i][j] = true;
        } else {
          this.board[i][j] = false;
        }
      }
    }
  }

  checkCell(i,j) {
    this.board[i][j] = !this.board[i][j];
    console.log(this.noActvCells(i,j),i,j);
  }
}
