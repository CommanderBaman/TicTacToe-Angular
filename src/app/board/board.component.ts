import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] = Array(9).fill(undefined)
  xIsNext = true
  winner = ''
  moves = 0
  playWithComputer = false

  constructor() {}

  ngOnInit(): void {
    this.newGame()
  }

  newGame(): void {
    this.squares = Array(9).fill(undefined)
    this.winner = ''
    this.xIsNext = true
    this.moves = 0
  }

  get player(): string {
    return this.finished ? '' : this.xIsNext ? 'X' : 'O'
  }

  get finished(): boolean {
    return this.winner !== '' || this.moves >= 9
  }

  makeMove(clickedIndex: number): void {
    if (!this.finished) {
      if (!this.squares[clickedIndex]) {
        this.squares.splice(clickedIndex, 1, this.player)
        this.xIsNext = !this.xIsNext
      }

      this.winner = this.calculateWinner()
    }
    this.moves += 1
  }

  calculateWinner(): string {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]

    let winner = ''

    lines.forEach((line) => {
      const [index1, index2, index3] = line
      if (
        this.squares[index1] &&
        this.squares[index1] === this.squares[index2] &&
        this.squares[index1] === this.squares[index3]
      ) {
        winner = this.squares[index1]
      }
    })
    return winner
  }

  // for checkbox 
  toggleComputerPlay(willPlayWithAI: boolean): void {
    this.playWithComputer = willPlayWithAI
    console.log(this.playWithComputer ? 'Will Play' : "Won't play")
  }
}
