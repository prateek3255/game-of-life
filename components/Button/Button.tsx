import React from "react";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: "large" | "small";
  rounded?: boolean;
  additionalStyles?: string;
}

const TextSize: Record<NonNullable<ButtonProps['size']>, string> = {
 "large": "text-base",
 "small": "text-sm"
}


const getSizeStyles = (size: NonNullable<ButtonProps['size']>, rounded?: boolean): string => {
  let padding = '';
  if (size==='small' && rounded) {
    padding = 'py-2 px-2'
  } else if (size==='small' && !rounded) {
    padding = 'py-1 px-2'
  } else if (size==='large' && rounded) {
    padding = 'py-4 px-4'
  } else if (size==='large' && !rounded) {
    padding = 'py-2 px-4'
  }

  return `${TextSize[size]} ${padding}`;

}


const Button = ({ size = "large", rounded, additionalStyles = '', ...rest }: ButtonProps) => {
  return (
    <button
      className={`bg-blue-500 text- hover:bg-blue-700 text-white font-bold border border-blue-700 ${getSizeStyles(size, rounded)} ${rounded ? 'rounded-full' : 'rounded'} ${additionalStyles}`}
      {...rest}
    />
  );
};

export default Button;
