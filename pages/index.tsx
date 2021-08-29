import React from "react";
import debounce from "lodash/debounce";
import { Play, Pause, Next, Reset, Dice, Info } from "@components/Icons";
import { Button } from "@components/Button";
import { Toggle } from "@components/Toggle";
import { InfoModal } from "@components/InfoModal";

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

type CellState = { cells: number[][]; count: number };

type Action =
  | { type: "initialize"; random?: boolean }
  | { type: "cell_clicked"; row: number; col: number }
  | { type: "generate_next_state" };

function generateBoard(random?: boolean): CellState {
  const rows = Math.floor(
    Math.min(window.innerHeight - 250, 1200) / getCellSize()
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

  return { cells: state, count: 0 };
}

function getAliveNeighbours(
  state: CellState["cells"],
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
    case "cell_clicked": {
      const { cells } = state;
      const newCellState = cells[action.row][action.col] === 0 ? 1 : 0;
      const updatedState = [
        ...cells.slice(0, action.row),
        [
          ...cells[action.row].slice(0, action.col),
          newCellState,
          ...cells[action.row].slice(action.col + 1),
        ],
        ...cells.slice(action.row + 1),
      ];
      return { ...state, cells: updatedState };
    }
    case "generate_next_state": {
      const nextState = generateBoard();
      const { cells, count } = state;
      const totalRows = cells.length;
      const totalCols = cells[0].length;
      // Using for loop here for simplicity and readability
      // can change later if a more readable way is found
      for (let i = 0; i < totalRows; i++) {
        for (let j = 0; j < totalCols; j++) {
          const cellState = cells[i][j];
          const aliveNeighbours = getAliveNeighbours(
            cells,
            i,
            j,
            totalRows,
            totalCols
          );

          if (cellState === 0 && aliveNeighbours === 3) {
            nextState.cells[i][j] = 1;
          } else if (
            cellState === 1 &&
            (aliveNeighbours < 2 || aliveNeighbours > 3)
          ) {
            nextState.cells[i][j] = 0;
          } else {
            nextState.cells[i][j] = cellState;
          }
        }
      }

      nextState.count = count + 1;
      return nextState;
    }
    default:
      return state;
  }
}

const areAllCellsDead = (cells: CellState["cells"]): boolean => {
  return cells.every((row) => row.every((cell) => cell === 0));
};

export default function Home() {
  const [isInfoModalOpen, setIsInfoModalOpen] = React.useState(false);
  const [hasOpenedInfoModal, setHasOpenedInfoModal] = React.useState(false);

  React.useEffect(()=>{
    setHasOpenedInfoModal(localStorage.getItem("hasOpenedInfoModal") === "true");
  },[])

  const handleModalToggle = () => {
    setIsInfoModalOpen(!isInfoModalOpen);
    if (!hasOpenedInfoModal) {
      setHasOpenedInfoModal(true);
      localStorage.setItem("hasOpenedInfoModal", "true");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-b from-blue-50 to-blue-200 font-sans">
      <div className="min-h-[80px] sm:min-h-[100px] text-center flex items-center">
        <h1 className="font-sans font-black text-4xl sm:text-5xl text-blue-500 flex items-center">
          Game of Life{" "}
          <div role="button" onClick={handleModalToggle}>
            <Info
              additonalStyles={`sm:h-6 sm:w-6 h-5 w-5 sm:ml-4 ml-3 ${
                !hasOpenedInfoModal ? "animate-pulse" : ""
              }`}
            />
          </div>
        </h1>
      </div>
      <InfoModal isOpen={isInfoModalOpen} closeModal={handleModalToggle} />
      <GameBoard />
    </div>
  );
}

function GameBoard() {
  const [{ cells, count }, dispatch] = React.useReducer(reducer, {
    cells: [],
    count: 0,
  });
  const [isMounted, setIsMounted] = React.useState(false);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isManual, setIsManual] = React.useState(false);
  const [regenerationInterval, setRegenerationInterval] = React.useState(100);
  const intervalRef = React.useRef<NodeJS.Timeout | undefined>();

  const clearCurrentInterval = React.useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current !== undefined) {
      clearInterval(intervalRef.current);
    }
  }, []);

  React.useEffect(() => {
    const handleResize = () => {
      clearCurrentInterval();
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

  const playOrPause = () => {
    if (isPlaying) {
      clearCurrentInterval();
      return;
    }
    if (areAllCellsDead(cells)) {
      alert(
        "There are no alive cells on board right now. You can either click on cells on the board to make them alive or use the random generator button to randomly make some of the cells alive. You can also click on the info icon to learn more about how this works."
      );
      return;
    }
    setIsPlaying(true);
    intervalRef.current = setInterval(generateNextFrame, regenerationInterval);
  };

  const generateNextFrame = React.useCallback(() => {
    dispatch({ type: "generate_next_state" });
  }, []);

  const reset = React.useCallback(
    (random = false) => {
      dispatch({ type: "initialize", random });
      clearCurrentInterval();
    },
    [clearCurrentInterval]
  );

  const handleManualToggle = React.useCallback(() => {
    setIsManual((prevIsManual) => !prevIsManual);
    clearCurrentInterval();
  }, [clearCurrentInterval]);

  const handleRegenerationIntervalChange = React.useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      const newInterval = parseInt(event.target.value, 10);
      setRegenerationInterval(newInterval);
      if (isPlaying) {
        clearCurrentInterval();
      }
    },
    [isPlaying, generateNextFrame, clearCurrentInterval]
  );

  return (
    <>
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
      <div className="flex w-full max-w-[1200px] mt-8 items-center justify-center flex-wrap gap-5 sm:gap-10">
        <div className="flex flex-col relative">
          <span className="text-base absolute top-[-22px] left-[2px] font-semibold">
            Generation
          </span>
          <div className="bg-blue-50 p-3 rounded-lg w-28 h-8 flex items-center mt-1">
            {count}
          </div>
        </div>
        <PlayButton
          isPlaying={isPlaying}
          playOrPause={playOrPause}
          generateNextFrame={generateNextFrame}
          isManual={isManual}
        />
        <OtherControls
          isManual={isManual}
          handleManualToggle={handleManualToggle}
          handleRegenerationIntervalChange={handleRegenerationIntervalChange}
          regenerationInterval={regenerationInterval}
          reset={reset}
        />
      </div>
    </>
  );
}

const PlayButton = ({
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

  const getButtonIcon = () => {
    if (isManual) {
      return { icon: <Next />, text: "Next frame" };
    }

    if (isPlaying) {
      return { icon: <Pause />, text: "Pause" };
    } else {
      return {
        icon: <Play additonalStyles="ml-[2px] mr-[-2px]" />,
        text: "Play",
      };
    }
  };

  const { icon, text } = getButtonIcon();

  return (
    <Button aria-label={text} rounded onClick={handleClick}>
      {icon}
    </Button>
  );
};

const OtherControls = React.memo(
  ({
    isManual,
    handleManualToggle,
    handleRegenerationIntervalChange,
    regenerationInterval,
    reset,
  }: {
    isManual: boolean;
    handleManualToggle: () => void;
    handleRegenerationIntervalChange: (
      event: React.ChangeEvent<HTMLSelectElement>
    ) => void;
    reset: (random?: boolean) => void;
    regenerationInterval: number;
  }) => {
    return (
      <>
        <Button aria-label="Reset" size="small" rounded onClick={() => reset()}>
          <Reset additonalStyles="h-5 w-5" />{" "}
        </Button>
        <Button
          aria-label="Random"
          size="small"
          rounded
          onClick={() => reset(true)}
        >
          <Dice additonalStyles="h-5 w-5" />
        </Button>
        <div>
          <Toggle
            active={!isManual}
            leftText="Manual"
            rightText="Automatic"
            handleToggleClick={handleManualToggle}
          />
        </div>

        <select
          aria-label="Frames per second"
          value={regenerationInterval}
          onChange={handleRegenerationIntervalChange}
          className=" p-2 rounded-lg appearance-none"
          disabled={isManual}
        >
          <option value={66}>15 gps</option>
          <option value={100}>10 gps</option>
          <option value={200}>5 gps</option>
          <option value={1000}>1 gps</option>
        </select>
      </>
    );
  }
);
