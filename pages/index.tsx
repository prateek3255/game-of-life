import React from "react";
import debounce from "lodash/debounce";

const getCellSize = () =>
  typeof window !== "undefined" && window.innerWidth >= 500 ? 24 : 20;

const Cell = React.memo(
  ({
    alive,
    handleClick,
    row,
    col,
  }: {
    alive: boolean;
    handleClick: (row: number, col: number) => void;
    row: number;
    col: number;
  }) => {
    const onClick = () => {
      handleClick(row, col);
    };
    return (
      <button
        onClick={onClick}
        style={{ height: getCellSize(), width: getCellSize() }}
        className={`border-[1px] border-blue-200 ${
          alive ? "bg-blue-400" : "bg-white"
        }`}
      />
    );
  }
);

type CellState = number[][];

type Action =
  | { type: "initialize"; random?: boolean }
  | { type: "cell_clicked"; row: number; col: number }
  | { type: "generate_next_state" };

function generateBoard(random?: boolean): CellState {
  const rows = Math.floor(
    Math.min(window.innerHeight - 200, 1200) / getCellSize()
  );
  const columns = Math.floor(Math.min(window.innerWidth, 1200) / getCellSize());
  const state = new Array(rows).fill(0).map((i) => new Array(columns).fill(0));

  if (random) {
    // Create a random board where each cell has
    // a 30% chance of being alive
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < columns; col++) {
        state[row][col] = Math.random() < 0.7 ? 0 : 1;
      }
    }
  }

  return state;
}

function getAliveNeighbours(
  state: CellState,
  x: number,
  y: number,
  rows: number,
  cols: number
): number {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      // Use the modulus operator to handles the
      // edge cases where cells are on the  edge
      // of the board, it will wrap the cell around
      // the board. Inspired by the coding train's solution
      // https://www.youtube.com/watch?v=FWSR_7kZuYg
      const xPos = (x + i + rows) % rows;
      const yPos = (y + j + cols) % cols;
      sum += state[xPos][yPos];
    }
  }

  sum = sum - state[x][y];

  return sum;
}

function reducer(state: CellState, action: Action): CellState {
  switch (action.type) {
    case "initialize":
      return generateBoard(action.random);
    case "cell_clicked":
      const newCellState = state[action.row][action.col] === 0 ? 1 : 0;
      const updatedState = [
        ...state.slice(0, action.row),
        [
          ...state[action.row].slice(0, action.col),
          newCellState,
          ...state[action.row].slice(action.col + 1),
        ],
        ...state.slice(action.row + 1),
      ];
      return updatedState;
    case "generate_next_state":
      const nextState = generateBoard();
      const totalRows = state.length;
      const totalCols = state[0].length;
      // Using for loop here for simplicity and readability
      // can change later if a more readable way is found
      for (let i = 0; i < totalRows; i++) {
        for (let j = 0; j < totalCols; j++) {
          const cellState = state[i][j];
          const aliveNeighbours = getAliveNeighbours(
            state,
            i,
            j,
            totalRows,
            totalCols
          );

          if (cellState === 0 && aliveNeighbours === 3) {
            nextState[i][j] = 1;
          } else if (
            cellState === 1 &&
            (aliveNeighbours < 2 || aliveNeighbours > 3)
          ) {
            nextState[i][j] = 0;
          } else {
            nextState[i][j] = cellState;
          }
        }
      }
      return nextState;
    default:
      return state;
  }
}

export default function Home() {
  const [cells, dispatch] = React.useReducer(reducer, []);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>();

  const clearCurrentInterval = React.useCallback(() => {
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      dispatch({ type: "initialize" });
    };
    setIsMounted(true);
    handleResize();
    window.addEventListener("resize", debounce(handleResize, 200));

    return () => {
      clearCurrentInterval();
      window.removeEventListener("resize", handleResize);
    };
  }, [clearCurrentInterval]);

  const handleCellClick = React.useCallback((row: number, col: number) => {
    dispatch({ type: "cell_clicked", row, col });
  }, []);

  const playOrPause = React.useCallback(() => {
    if (isPlaying) {
      setIsPlaying(false);
      clearCurrentInterval();
    } else {
      setIsPlaying(true);
      clearCurrentInterval();
      intervalRef.current = setInterval(() => {
        dispatch({ type: "generate_next_state" });
      }, 100);
    }
  }, [isPlaying, clearCurrentInterval]);

  const generateNextFrame = React.useCallback(() => {
    dispatch({ type: "generate_next_state" });
  }, []);

  const reset = (random = false) => {
    dispatch({ type: "initialize", random });
    clearCurrentInterval();
  };

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-blue-100">
      <div className="min-h-[80px] sm:min-h-[100px] text-center flex items-center">
        <h1 className="font-sans font-black text-4xl sm:text-5xl text-blue-500">
          Game of Life
        </h1>
      </div>
      <div className="flex flex-col border-[1px] border-blue-200">
        {cells.map((row, i) => (
          <div key={i} className="flex flex-row">
            {row.map((cell, j) => (
              <Cell
                key={`${i}-${j}`}
                row={i}
                col={j}
                alive={cell === 1}
                handleClick={handleCellClick}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex h-full w-full justify-evenly">
        <PlayButton
          isPlaying={isPlaying}
          playOrPause={playOrPause}
          generateNextFrame={generateNextFrame}
          isManual={false}
        />
        <button onClick={() => reset()}>Reset</button>
        <button onClick={() => reset(true)}>Random</button>
      </div>
    </div>
  );
}

const PlayButton = React.memo(
  ({
    isPlaying,
    playOrPause,
    isManual,
    generateNextFrame,
  }: {
    isPlaying: boolean;
    isManual: boolean;
    playOrPause: () => void;
    generateNextFrame: () => void;
  }) => {
    const handleClick = () => {
      if (isManual) {
        generateNextFrame();
      } else {
        playOrPause();
      }
    };

    const getButtonText = () => {
      if (isManual) {
        return "Next";
      }

      if (isPlaying) {
        return "Pause";
      } else {
        return "Play";
      }
    };

    return <button onClick={handleClick}>{getButtonText()}</button>;
  }
);
