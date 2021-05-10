/**
 * Checks who the winner of the game is according to the current situation
 * @param board any[] - contains the current board situation
 * @returns string - which contains the winner name
 */
export const calculateWinnerOfBoard = (board: any[]): string => {
  let winner = ''
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

  lines.forEach((line) => {
    const [index1, index2, index3] = line
    if (
      board[index1] &&
      board[index1] === board[index2] &&
      board[index1] === board[index3]
    ) {
      winner = board[index1]
    }
  })
  return winner
}

/**
 * Puts an element on the board
 * @param squares any[] - current board situation
 * @param elementToPut string - element to put at the index
 * @param indexToMove number - index at which to put the element
 * @returns any[] - board after making the move
 */
const makeMove = (
  squares: any[],
  elementToPut: string,
  indexToMove: number
): any[] => {
  return squares.map((element, index) => {
    return index === indexToMove ? elementToPut : element
  })
}

/**
 * Heuristic function for the minimax algorithm
 * @param squares any[] - Current board situation
 * @param myElement string - element to support
 * @returns number - score of the match (10 for winner, -10 for losing, otherwise 0)
 */
const evaluationFunction = (squares: any[], myElement: string): number => {
  const winner = calculateWinnerOfBoard(squares)
  if (winner === myElement) {
    return 10
  } else if (!winner) {
    return 0
  }
  return -10
}

/**
 * Implementation of the minimax algorithm
 * @param squares any[] - current board situation
 * @param myElement string - element that you want to support
 * @param depth number - depth of the current board
 * @param isMaximizing boolean - want to minimize or maximize the element
 * @returns number - required output
 */
const minimaxAlgorithm = (
  squares: any[],
  myElement: string,
  depth: number,
  isMaximizing: boolean
): number => {
  const currentState = evaluationFunction(squares, myElement)

  // return the score if game is finished
  if (currentState !== 0) {
    return currentState - depth
  }

  // collecting which moves I can make
  const moves = Array.from(squares, (_, index) => index).filter(
    (index) => squares[index] === undefined
  )
  // if no moves left then tie
  if (moves.length === 0) {
    return 0
  }

  const oppositeElement = myElement === 'X' ? 'O' : 'X'

  if (isMaximizing) {
    let bestMoveValue = -1000
    moves.forEach((move) => {
      const newSquares = makeMove(squares, myElement, move)
      const moveValue = minimaxAlgorithm(
        newSquares,
        myElement,
        depth + 1,
        false
      )
      bestMoveValue = bestMoveValue > moveValue ? bestMoveValue : moveValue
    })
    return bestMoveValue
  } else {
    let bestMoveValue = 1000
    moves.forEach((move) => {
      const newSquares = makeMove(squares, oppositeElement, move)
      const moveValue = minimaxAlgorithm(newSquares, myElement, depth + 1, true)
      bestMoveValue = bestMoveValue < moveValue ? bestMoveValue : moveValue
    })
    return bestMoveValue
  }

  return 1
}

/**
 * Predicts the move to be made by AI after seeing the current board situation
 * @param squares any[] - current situation of the squares
 * @param myElement string - AI's element
 * @param returnSecondBest boolean - Return the second best option for easier play
 * @returns number - index that favours the AI
 */
export const getAiMove = (
  squares: any[],
  myElement: string,
  returnSecondBest: boolean
): number => {
  // collecting which moves AI can make
  const moves = Array.from(squares, (_, index) => index).filter(
    (index) => squares[index] === undefined
  )
  let bestMove = moves[0]
  let bestMoveValue = -1000
  let secondBestMove = moves[0]
  let secondBestMoveValue = -1000

  // selection process begins
  moves.forEach((move) => {
    const newSquares = makeMove(squares, myElement, move)
    const moveValue = minimaxAlgorithm(newSquares, myElement, 0, false)

    if (moveValue > bestMoveValue) {
      secondBestMoveValue = bestMoveValue
      secondBestMove = bestMove
      bestMoveValue = moveValue
      bestMove = move
    } else if (moveValue > secondBestMoveValue) {
      secondBestMoveValue = moveValue
      secondBestMove = move
    }
  })
  return returnSecondBest ? secondBestMove : bestMove
}
