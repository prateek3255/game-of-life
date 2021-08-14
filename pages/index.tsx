import React from "react";


const Cell = ({ alive }: {alive: boolean}) => {
  return (
    <div role="button" className={`h-8 w-8 border-[1px] border-black ${alive ? 'bg-black' : 'bg-white'}`} />
  )
}

type CellState = boolean[][];

type Action = { type: 'initialize', rows: number; columns: number };

function reducer(state: CellState, action: Action): CellState {
  switch (action.type) {
    case 'initialize':
      return new Array(action.columns).fill(false).map(i => new Array(action.rows).fill(false));
    default:
    return state;
  }
}


export default function Home() {

  const [cells, dispatch] = React.useReducer(reducer, []);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);

    const columns = Math.floor((window.innerHeight - 200) / 32);
    const rows = Math.floor(window.innerWidth / 32);
    dispatch({ type: 'initialize', rows, columns });

  }, []);

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
              <Cell key={`${i}-${j}`} alive={cell} />
            ))}
          </div>
        ))}
      </div>
    </div>  
  )
}
