const Pause = ({ additonalStyles = "" }: { additonalStyles?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    stroke-linecap="round"
    strokeLinejoin="round"
    className={`feather feather-pause ${additonalStyles}`}
  >
    <rect fill="#ffffff" x="6" y="4" width="4" height="16"></rect>
    <rect fill="#ffffff" x="14" y="4" width="4" height="16"></rect>
  </svg>
);

export default Pause;
