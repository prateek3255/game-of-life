import React from "react";
import Image from "next/image";
import ReactModal from "react-modal";
import { Button } from "@components/Button";

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
      <p className="sm:mt-8 mt-6">
        Game of Life is a cellular automaton invented by British
        mathematician John Horton Conway in 1970. It consists of a 2-dimensional
        grid of cells, each having an alive or dead (or on or off) state. An
        initial state of the grid can be selected by assigning a state to each
        cell, and with passing time, a new generation of cells is created based
        on the state of the current cells their neighbouring cells based on some
        dead simple rules. It is a zero-player game, which means that its
        evolution is determined by just its initial state, requiring no further
        input.
      </p>
      <h2 className="sm:text-3xl text-xl font-bold sm:mt-12 mt-10">Rules</h2>
      <p className="mt-2">
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
      <h2 className="sm:text-3xl text-xl font-bold sm:mt-12 mt-10">
        The board and controls
      </h2>
      <p className="mt-2">
        Now that you know the rules of the game, let's take a look at how the
        board and the controls work. You can make any cell on the board alive or
        dead by clicking on it, or you can click on the random button to
        randomly make 30% of the cells alive. Once the initial state is ready
        you can then click on the play button which generates a fixed number of
        generations per second depending on the rate. Also the board wraps
        around the edges, so the cells on the left edge have their neighbours on
        the right edge and the cells on the top edge have their neighbours on
        the bottom.
      </p>
      <div className="mt-6 w-full flex justify-center">
        <video controls autoPlay loop width="500">
          <source src="/demo.webm" type="video/webm" />
          <source src="/demo.mp4" type="video/mp4" />
          Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      <h3 className="sm:text-2xl text-lg font-bold sm:mt-10 mt-8">Controls</h3>
      <ul className="sm:text-base text-sm mt-2">
        <ControlItem
          image="/generations-counter.png"
          alt="Generations counter"
          width="117"
          height="70"
        >
          Displays the total number of generations of cells that have been
          generated since the beggining of the game.
        </ControlItem>

        <ControlItem
          image="/play-button.png"
          alt="Play button"
          width="70"
          height="70"
        >
          Lets you play/pause the generation cycle in automatic mode. In manual
          mode it creates a new generation every time you click on it.
        </ControlItem>

        <ControlItem
          image="/reset-button.png"
          alt="Reset button"
          width="50"
          height="50"
        >
          Resets the board by making all cells dead, resetting the genertion
          counter to zero and stopping the active generation cycle.
        </ControlItem>

        <ControlItem
          image="/random-button.png"
          alt="Random button"
          width="50"
          height="50"
        >
          Performs the actions similar to the reset button, except instead of
          making all cells dead it randomly makes 30% of the cells alive.
        </ControlItem>

        <ControlItem
          image="/automatic-toggle.png"
          alt="Manual/Automatic toggle"
          width="528"
          height="100"
        >
          Lets you switch between manual and automatic mode. In manual mode you
          have click on the play button to create the next generation. In
          automatic mode, next generations are created automatically every
          second based on the generations per second value and the play button
          allows you to play or pause the generation cycle.
        </ControlItem>

        <ControlItem
          image="/gps.png"
          alt="Generations per second"
          width="83"
          height="40"
        >
          Let's you control the number of generations per second for automatic
          mode. The default is 10 generations per second.
        </ControlItem>
      </ul>

      <h2 className="sm:text-3xl text-xl font-bold sm:mt-12 mt-10">
        Further Reading
      </h2>
      <p className="mt-2">
        You checkout the{" "}
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        >
          Wikipedia article
        </a>{" "}
        for more information about the game. If you are still confused about the
        rules I would recommend that you checkout this{" "}
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://www.youtube.com/watch?v=ouipbDkwHWA"
        >
          video
        </a>{" "}
        to get a better understanding of the rules. There is also a{" "}
        <a
          rel="noreferrer noopener"
          target="_blank"
          href="https://www.conwaylife.com/wiki/Main_Page"
        >
          whole wiki
        </a>{" "}
        dedicated to some popular patterns and the research related to the game.
      </p>

      <p className="mt-6">
        The main thing that fascinates most people and me about this game is the
        fact that how complexity arises out of simplicity. With these
        dead-simple rules, someone might think that this game should be very
        predictable and boring. The magic begins once you start experimenting
        with it and see the complex patterns emerge out of simple initial
        states. And how slight changes in the initial state can produce a huge
        change in output from complete destruction (no alive cells left) through
        frozen patterns and to patterns that keep moving for eternity. Hope you
        enjoy this as well ✌🏻.
      </p>

      <div className="mt-10 mx-auto w-full flex justify-center">
        <Button onClick={closeModal}>Take me to the game!</Button>
      </div>
      <div></div>
    </ReactModal>
  );
};

const ControlItem = ({
  image,
  alt,
  children,
  width,
  height,
}: {
  image: string;
  alt: string;
  children: React.ReactNode;
  width: string;
  height: string;
}) => (
  <li className="flex sm:flex-row flex-col sm:gap-5 gap-2 items-center mt-6">
    <div className="min-w-[70px] max-w-[200px] flex justify-center items-center">
      <Image src={image} alt={alt} width={width} height={height} />
    </div>
    <p>{children}</p>
  </li>
);

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
    <p className="max-w-[190px] text-center mt-1">{description}</p>
  </div>
);

export default InfoModal;
