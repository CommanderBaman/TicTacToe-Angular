/**
 * Predicts the move to be made by AI after seeing the current board situation
 * @param squares any[] - current situation of the squares
 * @param myElement string - AI's element
 * @returns number - index that favours the AI
 */
export const getAiMove = (squares: any[], myElement: string): number => {
  const mySquares: number[] = [],
    enemySquares: number[] = [],
    emptySquares: number[] = []

  squares.forEach((element, index) => {
    if (element === myElement) mySquares.push(index)
    else if (!element) emptySquares.push(index)
    else enemySquares.push(index)
  })

  // selection process begins
  const randomIndex = Math.floor(Math.random() * emptySquares.length)

  return emptySquares[randomIndex]
}
