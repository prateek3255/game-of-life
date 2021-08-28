import React from "react";
import Image from "next/image";
import ReactModal from "react-modal";

const InfoModal = ({
  isOpen,
  closeModal,
}: {
  isOpen: boolean;
  closeModal: () => void;
}) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="What is Game of Life?"
      style={{
        content: { maxWidth: "1000px", margin: "auto", padding: "32px" },
        overlay: { backgroundColor: "rgba(255, 255, 255, 0.5)" },
      }}
      closeTimeoutMS={250}
      shouldCloseOnOverlayClick
      shouldCloseOnEsc
    >
      <h1 className="sm:text-4xl text-2xl font-bold text-center">
        What is Game of Life?
      </h1>
      <p className="sm:text-base text-sm sm:mt-8 mt-6">
        John Conway's Game of Life is a cellular automaton invented by the
        British mathematician John Horton Conway in 1970. It consists of a
        2-dimensional grid of cells, each having an alive or dead (or on or off)
        state. An initial state of the grid can be selected by assigning a state
        to each cell, and with passing time, a new generation of cells is
        created based on the state of the current cell and its neighbor cells
        based on some dead simple rules. It is a zero-player game, which means
        that its evolution is determined by just its initial state, requiring no
        further input.
      </p>
      <h2 className="sm:text-3xl text-xl font-bold sm:mt-12 mt-10">Rules</h2>
      <p className="sm:text-base text-sm mt-2">
        It has 3 pretty straightforward rules, which dictate the evolution of
        one generation of cells to another. But before we dive into the rules,
        let's look at some basic terminology that would be required for
        understanding the rules.
      </p>
      <div className="flex sm:flex-row flex-col mt-6 w-full sm:justify-around sm:gap-0 gap-6">
        <TerminologyItem
          text="Alive cell"
          image="/alive-cell.png"
          size="33"
          description="A cell with blue background is considered alive"
        />
        <TerminologyItem
          text="Dead cell"
          image="/dead-cell.png"
          size="33"
          description="A cell with white background is considered dead"
        />
        <TerminologyItem
          text="Cell neighbours"
          image="/cell-neighbours.png"
          size="100"
          description="The 8 cells surrounding a cell are called its neighbours"
        />
      </div>
      <div className="sm:text-base text-sm mt-8">
        Here are the rules for going from one generation to the next:
        <ol className="list-decimal px-6 mt-3">
          <li>
            <div>
              A <b>dead cell</b> with exactly <b>three alive neighbors</b>{" "}
              becomes alive.
            </div>
            <div
              className="mx-auto my-6 w-auto"
              style={{ width: "fit-content" }}
            >
              <Image
                src="/dead-to-alive.png"
                width="311"
                height="100"
                alt="A dead cell with exactly three alive neighbors becomes alive"
                className="mx-auto"
              />
            </div>
          </li>
          <li>
            <div>
              An <b>alive cell</b> with <b>zero or one neighbor dies</b> as if
              by underpopulation, and an alive cell with{" "}
              <b>four or more neighbors dies</b> as by overcrowding.
            </div>
            <div className="flex sm:flex-row flex-col my-6 w-full justify-around sm:gap-0 gap-6">
              <Image
                src="/underpopulation-die.png"
                width="311"
                height="100"
                alt="An alive cell with <b>zero or one neighbor dies"
                className="mx-auto"
              />
              <Image
                src="/overpopulation-die.png"
                width="311"
                height="100"
                alt="An alive cell with four or more neighbors dies"
                className="mx-auto"
              />
            </div>
          </li>
          <li>
            <div>
              An <b>alive cell</b> with{" "}
              <b>two or three neighbors continues to live</b>.
            </div>
            <div
              className="mx-auto my-6 w-auto"
              style={{ width: "fit-content" }}
            >
              <Image
                src="/stay-alive.png"
                width="311"
                height="100"
                alt="An alive cell with two or three neighbors continues to live"
              />
            </div>
          </li>
        </ol>
      </div>
    </ReactModal>
  );
};

const TerminologyItem = ({
  image,
  text,
  size,
  description,
}: {
  image: string;
  text: string;
  size: string;
  description: string;
}) => (
  <div className="flex flex-col justify-center items-center">
    <Image src={image} height={size} width={size} alt={text} />
    <div className="text-base font-bold mt-2">{text}</div>
    <div className="sm:text-sm text-xs max-w-[190px] text-center mt-1">
      {description}
    </div>
  </div>
);

export default InfoModal;
