import React from "react";

const Toggle = ({
  active,
  handleToggleClick,
  leftText,
  rightText,
}: {
  active: boolean;
  handleToggleClick: () => void;
  leftText: string;
  rightText: string;
}) => {
  return (
    <div className="flex justify-center items-center">
      <span className="text-base font-medium">{leftText}</span>
      <div
        role="button"
        className={`w-14 h-7 flex items-center rounded-full mx-3 px-1 ${
          active ? "bg-blue-500" : "bg-gray-300"
        }`}
        onClick={handleToggleClick}
      >
        <div
          className={`bg-white w-5 h-5 rounded-full shadow-md transform transition-transform ${
            active ? "translate-x-7" : ""
          }`}
        ></div>
      </div>
      <span className="text-base font-medium">{rightText}</span>
    </div>
  );
};

export default Toggle;
