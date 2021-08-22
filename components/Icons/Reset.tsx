const Reset = ({ additonalStyles = "" }: { additonalStyles?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="192"
    height="192"
    fill="#ffffff"
    viewBox="0 0 256 256"
    className={additonalStyles}
  >
    <rect width="256" height="256" fill="none"></rect>
    <polyline
      points="176.167 99.716 224.167 99.716 224.167 51.716"
      fill="none"
      stroke="#ffffff"
      stroke-linecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    ></polyline>
    <path
      d="M190.2254,190.2254a88,88,0,1,1,0-124.4508l33.94112,33.94113"
      fill="none"
      stroke="#ffffff"
      stroke-linecap="round"
      strokeLinejoin="round"
      strokeWidth="32"
    ></path>
  </svg>
);

export default Reset;
