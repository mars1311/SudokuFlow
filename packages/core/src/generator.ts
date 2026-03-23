interface SudokuApiResponse {
  newboard: NewBoard;
}

interface NewBoard {
  grids: Grid[],
  results: number,
  message: string;
}

interface Grid {
  value: number[][];
  solution: number[][];
  difficulty: 'Hard' | 'Medium' | 'Easy'
}

const url = 'https://sudoku-api.vercel.app/api/dosuku';
export const generateBoard = async () => {

  try {
    const response = await fetch(url);

    if (!response.ok) {
      console.error(response.status)
    }

    const result: SudokuApiResponse = await response.json();
    const grid = result.newboard.grids[0];

    parseBoard(grid.value)
    return grid.value;
  }
  catch (error) {
    console.error(error)
  }
}


export const parseBoard = (value: number[][]) => {
  const parsedBoard = value.map(row => {
    return row.map(el => (
        {
        value: el === 0 ? null : el,
        isReadonly: el > 0,
        isWrong: false,
        isFocused: false,
        isHighlighted: false
      })
    )
  });

  console.log(parsedBoard)

  return parsedBoard;
}
  
