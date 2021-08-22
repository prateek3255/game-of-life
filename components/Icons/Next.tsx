const Next = ({ additonalStyles = "" }: { additonalStyles?: string }) => (
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
    className={`feather feather-skip-forward ${additonalStyles}`}
  >
    <polygon fill="#ffffff" points="5 4 15 12 5 20 5 4"></polygon>
    <line x1="19" y1="5" x2="19" y2="19"></line>
  </svg>
);

export default Next;
