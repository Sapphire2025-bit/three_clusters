import React from 'react'
import ButtonFunctionProps from '../types/buttonFunctionProps';
import CardActionsProps from '../types/cardActionProps';

const CardActions: React.FC<CardActionsProps> = ({allButtons}) => {
  const baseButtonStyle = "px-4 py-2 text-white rounded-full m-2";
  return (
    <div className="flex justify-end m-4">
      {allButtons.map((buttonObj, index) => (
        <button
          key={index}
          onClick={buttonObj.buttonFunc}
          className={`${baseButtonStyle} ${buttonObj.buttonColor}`}>
          {buttonObj.buttonText}
        </button>
      ))}
    </div>
  )
}

export default CardActions;