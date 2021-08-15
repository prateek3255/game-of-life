import React from "react";
import debounce from "lodash/debounce";

const getCellSize = () => typeof window !== "undefined" && window.innerWidth >= 1000 ? 24 : 20;

const Cell = React.memo(({ alive, handleClick, row, col }: { alive: boolean, handleClick: (row: number, col: number) => void, row: number, col: number }) => {
  const onClick = () => {
    handleClick(row, col);
  }
  return (
    <div role="button" onClick={onClick} style={{ height: getCellSize(), width: getCellSize() }} className={`border-[1px] border-gray-300 ${alive ? 'bg-black' : 'bg-white'}`} />
  )
});

type CellState = boolean[][];

type Action = { type: 'initialize'} | { type: 'cell_clicked', row: number, col: number };

function reducer(state: CellState, action: Action): CellState {
  switch (action.type) {
    case 'initialize':
      const columns = Math.floor((window.innerHeight - 200) / getCellSize());
      const rows = Math.floor(window.innerWidth / getCellSize());
      return new Array(columns).fill(false).map(i => new Array(rows).fill(false));
    case 'cell_clicked':
      const newCellState = !state[action.row][action.col];
      const updatedState = [
        ...state.slice(0, action.row),
        [...state[action.row].slice(0, action.col), newCellState, ...state[action.row].slice(action.col + 1)],
        ...state.slice(action.row + 1)
      ]
      return updatedState;
    default:
    return state;
  }
}


export default function Home() {

  const [cells, dispatch] = React.useReducer(reducer, []);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      dispatch({ type: 'initialize' });
    }
    setIsMounted(true);
    handleResize();
    window.addEventListener('resize', debounce(handleResize, 200));

    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, []);

  const handleCellClick = React.useCallback((row: number, col: number) => {
    dispatch({ type: 'cell_clicked', row, col });
  },[])

  if (!isMounted) {
    return <div>Loading...</div>
  }

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="min-h-[100px] text-center flex items-center">
          <h1 className="font-sans font-black text-4xl sm:text-5xl">Game of life</h1>
        </div>
      <div className="flex flex-col">
        {cells.map((row, i) => (
          <div key={i} className="flex flex-row">
            {row.map((cell, j) => (
              <Cell key={`${i}-${j}`} row={i} col={j} alive={cell} handleClick={handleCellClick} />
            ))}
          </div>
        ))}
      </div>
    </div>  
  )
}
