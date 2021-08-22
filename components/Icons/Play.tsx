const Play = ({ additonalStyles = "" }: { additonalStyles?: string}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="#ffffff"
    stroke="#ffffff"
    strokeWidth="2"
    stroke-linecap="round"
    strokeLinejoin="round"
    className={`feather feather-play ${additonalStyles}`}
  >
    <polygon fill="#ffffff" points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
);

export default Play;
