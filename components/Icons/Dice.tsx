const Dice = ({ additonalStyles = "" }: { additonalStyles?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="192"
    height="192"
    fill="#ffffff"
    viewBox="0 0 256 256"
    className={additonalStyles}
  >
    <rect width="256" height="256" fill="none"></rect>
    <rect
      x="40"
      y="40"
      width="176"
      height="176"
      rx="24"
      strokeWidth="32"
      stroke="#ffffff"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    ></rect>
    <circle cx="92" cy="92" r="16"></circle>
    <circle cx="164" cy="92" r="16"></circle>
    <circle cx="92" cy="164" r="16"></circle>
    <circle cx="128" cy="128" r="16"></circle>
    <circle cx="164" cy="164" r="16"></circle>
  </svg>
);

export default Dice;
