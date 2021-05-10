import { Component, OnInit } from '@angular/core'
import { getAiMove, calculateWinnerOfBoard } from './boardAI'

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  squares: any[] = Array(9).fill(undefined) // represents the board squares
  xIsNext = true // contains if x is next or not
  winner = '' // contains the winner when it comes
  playWithAI = false // contains whether the AI is playing or the computer is
  moves = 0 // contains the number of moves
  makeAiEasy = false // contains the user input of easiness
  easyAI = false // contains the difficulty level of AI

  constructor() {}

  ngOnInit(): void {
    this.newGame()
  }

  /**
   * Resets the game to its default
   * The option of playing against AI is preserved
   * Easy AI option is also preserved
   */
  newGame(): void {
    this.squares = Array(9).fill(undefined)
    this.winner = ''
    this.xIsNext = true
    this.moves = 0
    this.easyAI = false
  }

  /**
   * Gets which of the letter gets placed in the clicked box
   */
  get player(): string {
    return this.finished ? '' : this.xIsNext ? 'X' : 'O'
  }

  /**
   * Gets if the game is finished or not
   */
  get finished(): boolean {
    return this.winner !== '' || this.moves >= 9
  }

  /**
   * Selects the box whose index is present
   * @param index number - which box to select
   */
  selectBox(index: number): void {
    this.squares.splice(index, 1, this.player)
    this.xIsNext = !this.xIsNext
    this.moves += 1
  }

  /**
   * Handles the user click along whether the AI moves or not
   * @param clickedIndex number - index of the box that is clicked
   */
  makeMove(clickedIndex: number): void {
    // check for fairness of move
    if (!this.finished && !this.squares[clickedIndex]) {
      this.selectBox(clickedIndex)

      this.winner = calculateWinnerOfBoard(this.squares)

      // if fair play => computer should play if selected
      if (this.playWithAI && !this.finished) {
        this.selectBox(getAiMove(this.squares, this.player, this.easyAI))
        if (this.makeAiEasy) this.easyAI = !this.easyAI
        this.winner = calculateWinnerOfBoard(this.squares)
      }
    }
  }

  /**
   * Handles the checkbox input
   * @param willPlayWithAI boolean - contains whether the checkbox was clicked or not
   */
  toggleComputerPlay(willPlayWithAI: boolean): void {
    this.playWithAI = willPlayWithAI
    this.easyAI = false
  }

  /**
   * Handles the checkbox input for easy option
   * @param makeAiEasy boolean - contains whether the checkbox was clicked or not
   */
   toggleComputerEasyPlay(makeAiEasy: boolean): void {
    this.makeAiEasy = makeAiEasy
    this.easyAI = false
  }
}
